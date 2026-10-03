import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlePath = path.resolve(
  __dirname,
  "../content/blog/returning-useful-errors-for-invalid-json.mdx"
);

console.log(
  "Checking JSON API article and running code extraction verification..."
);

assert(fs.existsSync(articlePath), `Article not found at: ${articlePath}`);
const mdxContent = fs.readFileSync(articlePath, "utf-8");

// Extract the runnable snippet under "## Complete runnable server"
const sectionHeader = "## Complete runnable server";
const sectionIndex = mdxContent.indexOf(sectionHeader);
assert(sectionIndex !== -1, "Missing '## Complete runnable server' section");

const afterSection = mdxContent.slice(sectionIndex);
const codeBlockMatch = afterSection.match(
  /```(?:javascript|js)\n([\s\S]*?)```/
);
assert(
  codeBlockMatch,
  "Could not find javascript code block under complete server implementation"
);

const serverCode = codeBlockMatch[1];
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "json-api-test-"));
const tempModulePath = path.join(tempDir, "server.mjs");

fs.writeFileSync(tempModulePath, serverCode, "utf-8");

let server = null;

try {
  const moduleUrl = pathToFileURL(tempModulePath).href;
  const { createJsonServer, MAX_BYTES } = await import(moduleUrl);

  assert.equal(
    typeof createJsonServer,
    "function",
    "createJsonServer must be exported as a function"
  );
  assert.equal(
    typeof MAX_BYTES,
    "number",
    "MAX_BYTES must be exported as a number"
  );

  server = createJsonServer();

  await new Promise((resolve, reject) => {
    const listenTimeout = setTimeout(
      () => reject(new Error("Server listen timed out")),
      3000
    );
    server.listen(0, "127.0.0.1", () => {
      clearTimeout(listenTimeout);
      resolve();
    });
  });

  const address = server.address();
  const port = address.port;
  console.log(`Ephemeral test server running on 127.0.0.1:${port}`);

  function sendRequest({
    method = "POST",
    path = "/api/records",
    headers = {},
    body = null,
    chunks = null,
  }) {
    return new Promise((resolve, reject) => {
      const timeoutMs = 3000;
      let isSettled = false;

      const timer = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          req.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
          reject(new Error(`Request timed out after ${timeoutMs}ms`));
        }
      }, timeoutMs);

      const reqHeaders = { ...headers };

      if (
        chunks &&
        !reqHeaders["Transfer-Encoding"] &&
        !reqHeaders["transfer-encoding"]
      ) {
        reqHeaders["Transfer-Encoding"] = "chunked";
      }

      const req = http.request(
        {
          host: "127.0.0.1",
          port,
          path,
          method,
          headers: reqHeaders,
        },
        (res) => {
          const respChunks = [];
          res.on("data", (c) => respChunks.push(c));
          res.on("end", () => {
            if (isSettled) return;
            isSettled = true;
            clearTimeout(timer);

            const raw = Buffer.concat(respChunks).toString("utf-8");
            let json = null;
            try {
              json = JSON.parse(raw);
            } catch {
              // Not JSON
            }
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              raw,
              json,
            });
          });
        }
      );

      req.on("error", (err) => {
        if (isSettled) return;
        isSettled = true;
        clearTimeout(timer);
        reject(err);
      });

      if (chunks) {
        for (const chunk of chunks) {
          req.write(chunk);
        }
        req.end();
      } else if (body !== null) {
        req.write(body);
        req.end();
      } else {
        req.end();
      }
    });
  }

  // 1. HTTP 415 Missing Content-Type
  {
    const res = await sendRequest({
      body: '{"name":"item"}',
    });
    assert.equal(res.statusCode, 415, "Missing Content-Type must return 415");
    assert.equal(res.json?.error, "Unsupported Media Type");
    console.log("✓ HTTP 415 (Missing Content-Type) verified");
  }

  // 2. HTTP 415 Wrong Content-Type
  {
    const res = await sendRequest({
      headers: { "Content-Type": "text/plain" },
      body: "plain text payload",
    });
    assert.equal(res.statusCode, 415, "Non-JSON media type must return 415");
    assert.equal(res.json?.error, "Unsupported Media Type");
    console.log("✓ HTTP 415 (text/plain) verified");
  }

  // 3. HTTP 415 Spoofed Content-Type
  {
    const res = await sendRequest({
      headers: { "Content-Type": "text/application/json-evil" },
      body: '{"name":"item"}',
    });
    assert.equal(res.statusCode, 415, "Spoofed Content-Type must return 415");
    assert.equal(res.json?.error, "Unsupported Media Type");
    console.log("✓ HTTP 415 (text/application/json-evil) verified");
  }

  // 4. HTTP 200 Valid Content-Type with charset parameter
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ name: "Widget A", quantity: 5 }),
    });
    assert.equal(
      res.statusCode,
      200,
      "application/json; charset=utf-8 must return 200"
    );
    assert.equal(res.json?.success, true);
    assert.equal(res.json?.data?.name, "Widget A");
    assert.equal(res.json?.data?.quantity, 5);
    console.log("✓ HTTP 200 (application/json; charset=utf-8) verified");
  }

  // 5. HTTP 413 Oversized Content-Length
  {
    const largeBody = JSON.stringify({
      name: "Large",
      quantity: 1,
      padding: "x".repeat(MAX_BYTES + 512),
    });

    const res = await sendRequest({
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(largeBody),
      },
      body: largeBody,
    });

    assert.equal(
      res.statusCode,
      413,
      "Content-Length > MAX_BYTES must return 413"
    );
    assert.equal(res.json?.error, "Payload Too Large");
    assert(
      res.json?.message?.includes("exceeds limit"),
      "413 response body must contain expected message"
    );
    console.log("✓ HTTP 413 (Declared Content-Length) verified");
  }

  // 6. HTTP 413 Oversized Chunked Stream (Transfer-Encoding: chunked without Content-Length)
  {
    const chunk1 = Buffer.alloc(MAX_BYTES / 2, "a");
    const chunk2 = Buffer.alloc(MAX_BYTES / 2 + 1024, "b");

    const res = await sendRequest({
      headers: {
        "Content-Type": "application/json",
      },
      chunks: [chunk1, chunk2],
    });

    assert.equal(
      res.statusCode,
      413,
      "Chunked stream > MAX_BYTES must return 413"
    );
    assert.equal(res.json?.error, "Payload Too Large");
    console.log("✓ HTTP 413 (Chunked stream) verified");
  }

  // 7. HTTP 400 Malformed JSON Syntax
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json" },
      body: '{"name": "Broken JSON',
    });
    assert.equal(res.statusCode, 400, "SyntaxError must return 400");
    assert.equal(res.json?.error, "Bad Request");
    assert.equal(res.json?.message, "Malformed JSON payload");
    console.log("✓ HTTP 400 (Malformed JSON) verified");
  }

  // 8. HTTP 422 Missing required field
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 5 }),
    });
    assert.equal(res.statusCode, 422, "Missing name must return 422");
    assert.equal(res.json?.error, "Unprocessable Content");
    console.log("✓ HTTP 422 (Missing field) verified");
  }

  // 9. HTTP 422 Invalid field type / value
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Widget", quantity: -2 }),
    });
    assert.equal(res.statusCode, 422, "Negative quantity must return 422");
    assert.equal(res.json?.error, "Unprocessable Content");
    console.log("✓ HTTP 422 (Invalid value) verified");
  }

  // 10. HTTP 422 Unsafe integer (outside Number.isSafeInteger range)
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Widget",
        quantity: Number.MAX_SAFE_INTEGER + 10,
      }),
    });
    assert.equal(res.statusCode, 422, "Unsafe integer must return 422");
    assert.equal(res.json?.error, "Unprocessable Content");
    console.log("✓ HTTP 422 (Unsafe integer) verified");
  }

  // 11. HTTP 422 Non-object root (Array)
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([1, 2, 3]),
    });
    assert.equal(res.statusCode, 422, "Array root must return 422");
    assert.equal(res.json?.error, "Unprocessable Content");
    console.log("✓ HTTP 422 (Array root) verified");
  }

  // 12. HTTP 422 Non-object root (JSON null)
  {
    const res = await sendRequest({
      headers: { "Content-Type": "application/json" },
      body: "null",
    });
    assert.equal(res.statusCode, 422, "JSON null root must return 422");
    assert.equal(res.json?.error, "Unprocessable Content");
    console.log("✓ HTTP 422 (JSON null root) verified");
  }

  // 13. HTTP 404 Endpoint Not Found
  {
    const res = await sendRequest({
      path: "/api/unknown",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Widget", quantity: 1 }),
    });
    assert.equal(res.statusCode, 404, "Unknown path must return 404");
    console.log("✓ HTTP 404 (Unknown path) verified");
  }

  // 14. HTTP 405 Method Not Allowed with Allow header
  {
    const res = await sendRequest({
      method: "GET",
      path: "/api/records",
    });
    assert.equal(res.statusCode, 405, "GET method must return 405");
    assert.equal(
      res.headers.allow,
      "POST",
      "405 must include Allow: POST header"
    );
    console.log("✓ HTTP 405 (Method Not Allowed) verified");
  }
} finally {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log("Server closed cleanly.");
  }
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

console.log("All JSON API article verification checks passed successfully!");
