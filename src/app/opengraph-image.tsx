import { ImageResponse } from "next/og";

export const alt = "The Medical Speaking Academy — Your Expertise Deserves to Be Heard.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#101B2D", padding: 80, color: "#F7F4EE", fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 8, color: "#D6C39D", textTransform: "uppercase" }}>
          <div style={{ width: 60, height: 1, background: "#B69A68" }} />
          The Medical Speaking Academy
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.05, maxWidth: 900 }}>Your Expertise Deserves to Be Heard.</div>
        <div style={{ fontSize: 26, color: "rgba(247,244,238,0.7)" }}>Medical public speaking and professional English communication for doctors</div>
      </div>
    ),
    size,
  );
}
