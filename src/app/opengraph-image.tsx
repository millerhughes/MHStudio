import { ImageResponse } from "next/og";

/**
 * Social link-preview card (1200x630) shown when the URL is pasted into a DM,
 * WhatsApp, LinkedIn, etc. On-brand: deep forest-teal field, the MH-cube mark,
 * wordmark and the headline. The mark is embedded as an SVG data URI so the
 * isometric matrix transforms rasterise correctly under next/og (resvg).
 */

export const alt = "MH Studio — bespoke websites for local businesses, built fast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 32 32'>
  <g fill='none' stroke='#cfeee7' stroke-width='1.5' stroke-linejoin='round' stroke-linecap='round'>
    <polygon points='16 3 27.3 9.5 27.3 22.5 16 29 4.7 22.5 4.7 9.5'/>
    <path d='M16 3 L16 16 M4.7 9.5 L16 16 M27.3 9.5 L16 16'/>
  </g>
  <g fill='#eafaf6'>
    <polygon points='0.12,0.86 0.12,0.14 0.30,0.14 0.50,0.50 0.70,0.14 0.88,0.14 0.88,0.86 0.71,0.86 0.71,0.44 0.56,0.68 0.44,0.68 0.29,0.44 0.29,0.86' transform='matrix(11.3,6.5,0,13,4.7,9.5)'/>
    <polygon points='0.16,0.14 0.34,0.14 0.34,0.42 0.66,0.42 0.66,0.14 0.84,0.14 0.84,0.86 0.66,0.86 0.66,0.58 0.34,0.58 0.34,0.86 0.16,0.86' transform='matrix(11.3,-6.5,0,13,16,16)'/>
  </g>
</svg>`;
const MARK_URI = `data:image/svg+xml,${encodeURIComponent(MARK)}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #10352f 0%, #17524a 60%, #1c6154 100%)",
          padding: "76px 80px",
          color: "#eafaf6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK_URI} width={116} height={116} alt="" />
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.03em" }}>MH</span>
            <span style={{ fontSize: 58, fontWeight: 500, letterSpacing: "-0.03em", color: "#93cfc3", marginLeft: 14 }}>
              Studio
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              maxWidth: 940,
            }}
          >
            Bespoke websites for local businesses, built fast.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a9d8cf", marginTop: 26 }}>
            Designed around your customers · shipped in days · United Kingdom
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
