import { execFile } from "child_process";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface PublishDraftRequestBody {
  slug?: unknown;
}

/*
 * Development-only endpoint for the Drafts review tab. It is intentionally
 * POST-only: the static export build skips non-GET route handlers, so this
 * endpoint never ships to production.
 */
export async function POST(request: Request): Promise<Response> {
  let body: PublishDraftRequestBody;

  try {
    body = (await request.json()) as PublishDraftRequestBody;
  } catch {
    return Response.json(
      { ok: false, message: "The request body must be JSON." },
      { status: 400 }
    );
  }

  const slug = typeof body.slug === "string" ? body.slug : "";

  if (!SLUG_PATTERN.test(slug)) {
    return Response.json(
      { ok: false, message: `"${slug}" is not a valid draft slug.` },
      { status: 400 }
    );
  }

  const scriptPath = path.join(process.cwd(), "scripts", "publish-draft.mjs");

  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      [scriptPath, slug],
      { timeout: 30000, maxBuffer: 1024 * 1024 }
    );

    return Response.json({ ok: true, message: stdout.trim() });
  } catch (error) {
    const err = error as { stderr?: string; message?: string };
    const detail = (err.stderr || err.message || "").trim();

    return Response.json(
      { ok: false, message: detail || "The publish script failed." },
      { status: 500 }
    );
  }
}
