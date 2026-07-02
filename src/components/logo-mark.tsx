/**
 * LogoMark — the MH Studio logo glyph. An isometric cube drawn as an outline
 * (blueprint/technical), with the founder initials M and H painted on the two
 * front faces, each sheared true to its isometric plane. Signals design, depth
 * and precision; the cube reads as the mark on its own, the letters are the
 * reward on closer look.
 *
 * The affine matrices map an upright unit glyph (0..1 box) onto each rhombus
 * face and were derived from the cube's actual corners (32x32 viewBox, centre
 * 16,16); see scratchpad/mh-cube.html. Colours are props so the mark works on
 * light surfaces (nav, favicon) and on a teal field (OG card) without edits.
 */

const HEX = "16 3 27.3 9.5 27.3 22.5 16 29 4.7 22.5 4.7 9.5";
const SPOKES = "M16 3 L16 16 M4.7 9.5 L16 16 M27.3 9.5 L16 16";
const FACE_LEFT = "matrix(11.3,6.5,0,13,4.7,9.5)";
const FACE_RIGHT = "matrix(11.3,-6.5,0,13,16,16)";
// Custom geometric glyphs in a 0..1 box (filled, bold enough to survive small sizes).
const GLYPH_M =
  "0.12,0.86 0.12,0.14 0.30,0.14 0.50,0.50 0.70,0.14 0.88,0.14 0.88,0.86 0.71,0.86 0.71,0.44 0.56,0.68 0.44,0.68 0.29,0.44 0.29,0.86";
const GLYPH_H =
  "0.16,0.14 0.34,0.14 0.34,0.42 0.66,0.42 0.66,0.14 0.84,0.14 0.84,0.86 0.66,0.86 0.66,0.58 0.34,0.58 0.34,0.86 0.16,0.86";

export function LogoMark({
  size = 18,
  className,
  stroke = "var(--primary-deep)",
  letter = "var(--primary)",
}: {
  size?: number;
  className?: string;
  stroke?: string;
  letter?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      style={{ flexShrink: 0 }}
    >
      {/* isometric cube, outline only */}
      <g fill="none" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
        <polygon points={HEX} />
        <path d={SPOKES} />
      </g>
      {/* initials on the two front faces */}
      <g fill={letter}>
        <polygon points={GLYPH_M} transform={FACE_LEFT} />
        <polygon points={GLYPH_H} transform={FACE_RIGHT} />
      </g>
    </svg>
  );
}
