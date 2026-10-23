import { ImageResponse } from "next/og";

export const alt = "Jubril Elebute — Software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, background: "#0B0F0D", color: "#E9E6DD" }}>
        <div style={{ display: "flex", fontSize: 30, color: "#C6F432" }}>Software engineer · Lagos, Nigeria</div>
        <div style={{ display: "flex", fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Jubril Elebute</div>
      </div>
    ),
    size,
  );
}
