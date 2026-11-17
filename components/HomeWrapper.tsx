import HomeClient from "@/components/HomeClient";

// Rendered on the server so the full page content is in the initial HTML
// (crawlers, link previews, no blank screen while JS loads).
export default function HomeWrapper() {
  return <HomeClient />;
}
