import { createFileRoute } from "@tanstack/react-router";
import { LamarSite } from "@/components/LamarSite";

export const Route = createFileRoute("/")({
  component: LamarSite,
  head: () => ({
    meta: [
      { title: "LAMAR JACKSON — The Franchise" },
      { name: "description", content: "A cinematic, scroll-driven tribute to Lamar Jackson. Speed. Arm talent. MVP. The Franchise." },
    ],
  }),
});
