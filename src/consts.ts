import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Hannah Zhao",
  DESCRIPTION: "Welcome to Astro Sphere, a portfolio and blog for designers and developers.",
  AUTHOR: "Hannah Zhao",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Work", 
    HREF: "/work", 
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "hannahzhaoau@gmail.com",
    HREF: "mailto:hannahzhaoau@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "thehannahzhao",
    HREF: "https://github.com/thehannahzhao"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "Hannah Zhao",
    HREF: "https://www.linkedin.com/in/thehannahzhao/",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "Hannah Zhao",
    HREF: "https://twitter.com/thehannahzhao",
  },
]

