import { ImageResponse } from "next/og";

export const alt = "Surya Pratap Das — Software & DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.4)",
            }}
          >
            surya.in
          </span>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#7dd3fc",
            }}
          >
            Available for new roles
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.4)",
            }}
          >
            Surya Pratap Das &nbsp;·&nbsp; Bhubaneswar, India
          </span>
          <div
            style={{
              fontSize: 80,
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "#f5f4f0",
            }}
          >
            Software &amp; DevOps
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "rgba(245,244,240,0.5)",
            }}
          >
            Engineer.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.4)",
            }}
          >
            Node.js · Kafka · AWS · Terraform · TypeScript
          </span>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.4)",
            }}
          >
            70K concurrent users
          </span>
        </div>

        {/* Cyan accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "#7dd3fc",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
