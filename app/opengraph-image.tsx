import { ImageResponse } from "next/og";

// Share image shown when the site link is posted on LinkedIn, WhatsApp, etc.
export const alt = "Inam Ullah, web developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #1b1b1b, #4a4a4a 60%, #8f8f8f)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -2 }}>INAM ULLAH</div>
        <div style={{ marginTop: 16, fontSize: 40, color: "#d1d6d8" }}>Web developer · Lahore, Pakistan</div>
      </div>
    ),
    size
  );
}
