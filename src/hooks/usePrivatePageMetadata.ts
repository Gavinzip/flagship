import { useEffect } from "react";

export function usePrivatePageMetadata(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previousRobots = existingRobots?.content;
    const robots = existingRobots ?? document.createElement("meta");

    document.title = title;
    robots.name = "robots";
    robots.content = "noindex, nofollow, noarchive";
    if (!existingRobots) document.head.append(robots);

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== undefined) {
        existingRobots.content = previousRobots;
      } else {
        robots.remove();
      }
    };
  }, [title]);
}
