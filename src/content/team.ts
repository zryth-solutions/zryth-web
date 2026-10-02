/**
 * Team listing for the About page.
 *
 * Photos live under /public/team. `linkedin` is optional and only rendered
 * if present. Entries without an `image` render the empty avatar state.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public. Leave undefined to render the empty avatar state. */
  image?: string;
  linkedin?: string;
  placeholder?: boolean;
};

export const TEAM: TeamMember[] = [
  {
    name: "Kushagra Agarwal",
    role: "Co-founder & CEO",
    image: "/team/kushagra.png",
    linkedin: "https://www.linkedin.com/in/codewithkushagra/",
  },
  {
    name: "Manas Dewari",
    role: "Co-founder & CTO",
    image: "/team/manas.jpeg",
    linkedin: "https://www.linkedin.com/in/manas-dewari/",
  },
];
