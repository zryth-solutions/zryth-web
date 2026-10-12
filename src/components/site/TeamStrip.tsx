import Image from "next/image";

const PHOTOS = [
  { src: "/team/team-selfie.jpg", width: 1280, height: 959, alt: "The Zryth team together at an event" },
  { src: "/team/team-event.jpg", width: 1400, height: 1050, alt: "Zryth team members at the Mill Software stand at an event" },
  { src: "/team/team-trek.jpg", width: 810, height: 810, alt: "The Zryth team on a trip in the mountains" },
];

/**
 * Full-width strip of team photos that drifts slowly sideways. The set is
 * repeated twice and translated by exactly half its width, so the loop is
 * seamless. It pauses on hover or focus, and under reduced motion it stops and
 * becomes a normal horizontally scrollable row.
 */
export function TeamStrip() {
  const items = [...PHOTOS, ...PHOTOS];
  return (
    <div
      className="team-strip overflow-hidden motion-reduce:overflow-x-auto"
      role="group"
      aria-label="Photos of the Zryth team"
      tabIndex={0}
    >
      <div className="team-strip-track flex w-max">
        {items.map((photo, i) => (
          <figure key={i} aria-hidden={i >= PHOTOS.length ? true : undefined} className="mr-4 h-60 shrink-0 sm:h-72 lg:h-96">
            <Image
              src={photo.src}
              alt={i >= PHOTOS.length ? "" : photo.alt}
              width={photo.width}
              height={photo.height}
              loading="eager"
              className="h-full w-auto rounded-xl border border-line object-cover"
              sizes="(max-width: 640px) 320px, 520px"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
