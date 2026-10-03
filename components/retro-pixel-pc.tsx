import React from "react";

interface RetroPixelPCProps {
  className?: string;
}

export function RetroPixelPC({ className = "" }: RetroPixelPCProps) {
  return (
    <svg
      aria-describedby="crt-terminal-desc"
      aria-label="Recorded terminal output: $ node --version returns v24.14.1, $ yarn --version returns 1.22.22"
      className={className}
      fill="none"
      role="img"
      shapeRendering="crispEdges"
      viewBox="0 0 160 144"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Recorded terminal output</title>
      <desc id="crt-terminal-desc">
        $ node --version: v24.14.1; $ yarn --version: 1.22.22
      </desc>

      {/* Monitor hard offset shadow */}
      <rect className="fill-retro-ink" height="74" width="106" x="31" y="14" />

      {/* Monitor outer chassis */}
      <rect className="fill-retro-ink" height="74" width="106" x="27" y="10" />
      <rect
        className="fill-retro-paper"
        height="70"
        width="102"
        x="29"
        y="12"
      />

      {/* Monitor top & left highlight bevels */}
      <rect className="fill-retro-sage" height="4" width="102" x="29" y="12" />
      <rect className="fill-retro-sage" height="66" width="4" x="29" y="16" />
      {/* Monitor right & bottom shadow bevels */}
      <rect className="fill-retro-bg" height="66" width="4" x="127" y="16" />
      <rect className="fill-retro-bg" height="4" width="102" x="29" y="78" />

      {/* Monitor ventilation side slits */}
      <rect className="fill-retro-ink" height="4" width="2" x="123" y="21" />
      <rect className="fill-retro-ink" height="4" width="2" x="123" y="29" />
      <rect className="fill-retro-ink" height="4" width="2" x="123" y="37" />

      {/* CRT Screen Bezel (recessed frame) */}
      <rect className="fill-retro-ink" height="54" width="90" x="35" y="17" />
      <rect className="fill-retro-bg" height="50" width="86" x="37" y="19" />

      {/* CRT Screen Glass */}
      <rect className="fill-retro-dark" height="46" width="82" x="39" y="21" />

      {/* CRT Curved Corner Masking (Pixel-art rounded screen) */}
      <rect className="fill-retro-bg" height="3" width="3" x="39" y="21" />
      <rect className="fill-retro-bg" height="3" width="3" x="118" y="21" />
      <rect className="fill-retro-bg" height="3" width="3" x="39" y="64" />
      <rect className="fill-retro-bg" height="3" width="3" x="118" y="64" />

      {/* Recorded Terminal Output (finite one-shot reveal, repository verified) */}
      <g
        fontFamily='ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        fontSize="7.2"
        fontWeight="600"
        textRendering="geometricPrecision"
      >
        <text
          className="fill-retro-sage crt-terminal-line crt-terminal-line-1"
          x="43"
          y="32"
        >
          $ node --version
        </text>
        <text
          className="fill-retro-pink crt-terminal-line crt-terminal-line-2"
          x="43"
          y="42"
        >
          v24.14.1
        </text>
        <text
          className="fill-retro-sage crt-terminal-line crt-terminal-line-3"
          x="43"
          y="52"
        >
          $ yarn --version
        </text>
        <text
          className="fill-retro-pink crt-terminal-line crt-terminal-line-4"
          x="43"
          y="62"
        >
          1.22.22
        </text>
      </g>

      {/* Monitor Chin Controls & Floppy Drive */}
      <rect className="fill-retro-ink" height="3" width="36" x="42" y="74" />
      <rect className="fill-retro-dark" height="1" width="32" x="44" y="75" />
      <rect className="fill-retro-pink" height="2" width="3" x="84" y="74" />
      <rect className="fill-retro-sage" height="4" width="6" x="93" y="73" />
      <rect className="fill-retro-ink" height="2" width="2" x="95" y="74" />
      <rect className="fill-retro-ink" height="4" width="4" x="103" y="73" />

      {/* Monitor Neck / Swivel Stand */}
      <rect className="fill-retro-ink" height="8" width="20" x="70" y="84" />
      <rect className="fill-retro-sage" height="8" width="16" x="70" y="84" />

      {/* Stand Base */}
      <rect className="fill-retro-ink" height="6" width="52" x="56" y="92" />
      <rect className="fill-retro-ink" height="6" width="52" x="54" y="90" />
      <rect className="fill-retro-paper" height="4" width="48" x="56" y="91" />
      <rect className="fill-retro-sage" height="2" width="48" x="56" y="91" />

      {/* Mouse Cable */}
      <rect className="fill-retro-ink" height="2" width="8" x="126" y="95" />
      <rect className="fill-retro-ink" height="8" width="2" x="134" y="95" />
      <rect className="fill-retro-ink" height="2" width="6" x="134" y="103" />
      <rect className="fill-retro-ink" height="6" width="2" x="140" y="103" />

      {/* Keyboard hard offset shadow */}
      <rect className="fill-retro-ink" height="28" width="110" x="18" y="107" />

      {/* Keyboard outer housing */}
      <rect className="fill-retro-ink" height="28" width="110" x="14" y="103" />
      <rect
        className="fill-retro-paper"
        height="24"
        width="106"
        x="16"
        y="105"
      />

      {/* Keyboard bevels */}
      <rect className="fill-retro-sage" height="3" width="106" x="16" y="105" />
      <rect className="fill-retro-bg" height="3" width="106" x="16" y="126" />

      {/* Keyboard Keys Row 1 (Function / top keys) */}
      <rect className="fill-retro-sage" height="2" width="6" x="20" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="28" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="36" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="44" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="54" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="62" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="70" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="78" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="88" y="109" />
      <rect className="fill-retro-sage" height="2" width="6" x="96" y="109" />
      <rect className="fill-retro-pink" height="2" width="12" x="106" y="109" />

      {/* Keyboard Keys Row 2 (Number row) */}
      <rect className="fill-retro-ink" height="2" width="5" x="20" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="27" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="34" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="41" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="48" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="55" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="62" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="69" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="76" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="83" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="90" y="113" />
      <rect className="fill-retro-ink" height="2" width="5" x="97" y="113" />
      <rect className="fill-retro-sage" height="2" width="12" x="104" y="113" />

      {/* Keyboard Keys Row 3 (Typing row) */}
      <rect className="fill-retro-sage" height="2" width="7" x="20" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="29" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="36" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="43" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="50" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="57" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="64" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="71" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="78" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="85" y="117" />
      <rect className="fill-retro-ink" height="2" width="5" x="92" y="117" />
      <rect className="fill-retro-pink" height="2" width="17" x="99" y="117" />

      {/* Keyboard Keys Row 4 (Spacebar & modifiers) */}
      <rect className="fill-retro-sage" height="3" width="9" x="20" y="121" />
      <rect className="fill-retro-ink" height="3" width="6" x="31" y="121" />
      <rect className="fill-retro-sage" height="3" width="6" x="39" y="121" />
      {/* Pink Spacebar */}
      <rect className="fill-retro-pink" height="3" width="46" x="47" y="121" />
      <rect className="fill-retro-sage" height="3" width="6" x="95" y="121" />
      <rect className="fill-retro-ink" height="3" width="7" x="103" y="121" />
      <rect className="fill-retro-sage" height="3" width="6" x="112" y="121" />

      {/* Mouse hard shadow */}
      <rect className="fill-retro-ink" height="20" width="14" x="136" y="111" />

      {/* Mouse body */}
      <rect className="fill-retro-ink" height="20" width="14" x="133" y="108" />
      <rect
        className="fill-retro-paper"
        height="18"
        width="12"
        x="134"
        y="109"
      />

      {/* Mouse buttons & accents */}
      <rect className="fill-retro-pink" height="6" width="5" x="135" y="110" />
      <rect className="fill-retro-sage" height="6" width="5" x="140" y="110" />
      <rect className="fill-retro-ink" height="1" width="10" x="135" y="116" />
      <rect className="fill-retro-bg" height="8" width="10" x="135" y="118" />
    </svg>
  );
}
