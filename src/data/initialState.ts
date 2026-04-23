import { VitaeData } from "../types/vitae";

export const initialVitaeData: VitaeData = {
  personalInfo: {
    fullName: "Larry Corso",
    targetPosition: "Software Engineer",
    email: "lawrencecorso1@gmail.com",
    location: "Palos Park, Illinois",
    relocation: "Willing to relocate",
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/lawrence-tech/" },
      { name: "GitHub", url: "https://github.com/lcorso12" },
      { name: "Portfolio", url: "https://yourportfolio.com" }
    ]
  },
  summary: "Accomplished Software Engineer with over 10 years of experience in brand strategy and technology. Expertise in building scalable digital products and managing complex cross-functional projects. Proven track record of delivering high-impact solutions for diverse clients.",
  skills: {
    technical: [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "WordPress", "Mobile App Development", "SEO"
    ],
    soft: []
  },
  projects: [
    {
      id: "1",
      title: "ISP - Driver Safety App",
      description: "A secure, specialized application for cargo logistics and driver safety monitoring.",
      link: "https://github.com/lcorso12",
      bullets: [
        "Architected a real-time tracking system for cargo load security using React Native to solve the business problem of frequent cargo theft.",
        "Conducted spatial data analysis using GPS integration to refine driver routes, gaining insights into optimal travel paths and communicating findings via automated dashboards.",
        "Implemented secure authentication and encrypted data transmission, resulting in 100% compliance with industry security protocols.",
        "Reduced cargo security incidents by 15% through proactive monitoring features and real-time alerts."
      ]
    },
    {
      id: "2",
      title: "Swell Skin - Brand Strategy & E-commerce",
      description: "Comprehensive rebrand and e-commerce platform for a clinical skincare line.",
      link: "https://swellskin.net",
      bullets: [
        "Developed a custom Shopify storefront focused on conversion optimization to solve the business problem of low online sales.",
        "Conducted A/B testing analysis on user flows to identify drop-off points, gaining insights that informed UI updates and communicating results to stakeholders.",
        "Integrated third-party review systems and personalized skincare quiz features to improve customer engagement.",
        "Increased organic traffic by 40% within 6 months through targeted technical SEO improvements and content strategy."
      ]
    }
  ],
  experience: [
    {
      id: "3",
      company: "Jung Themes",
      role: "Brand Strategist & Software Engineer",
      startDate: "12/2018",
      endDate: "present",
      link: "https://www.jungthemes.com",
      achievements: [
        "Accomplished 30% increase in client revenue as evidenced by post-launch analytics by doing strategic brand overhauls and digital optimization.",
        "Accomplished seamless content delivery as evidenced by handling 10k+ daily users by doing custom WordPress theme and plugin engineering.",
        "Accomplished a 50% reduction in page load times as evidenced by Lighthouse scores by doing advanced caching and site performance optimizations."
      ]
    },
    {
      id: "4",
      company: "Rumi Design and Technology",
      role: "Lead Developer",
      startDate: "03/2018",
      endDate: "12/2025",
      link: "https://rumi.com",
      achievements: [
        "Accomplished successful delivery of 40+ client projects as evidenced by client testimonials by doing agile project management and full-stack development.",
        "Accomplished consistent cross-device experiences as evidenced by zero mobile QA bugs by doing responsive and adaptive web design standard pioneering.",
        "Accomplished scalable offshore development as evidenced by 30% faster sprint delivery by doing multinational technical team building and management."
      ]
    }
  ],
  education: [
    {
      id: "5",
      school: "TripleTen",
      degree: "Certificate",
      program: "Computer Software Engineering",
      field: "Software Engineering",
      startDate: "01/2025",
      endDate: "11/2025"
    },
    {
      id: "6",
      school: "Purdue University",
      degree: "Bachelor's Degree",
      program: "Business, Management, Marketing",
      field: "Management & Marketing",
      startDate: "04/2011",
      endDate: "05/2014"
    },
    {
      id: "7",
      school: "Lean Six Sigma",
      degree: "Certificate",
      program: "Black Belt Lean Six Sigma",
      field: "Project Management",
      startDate: "01/2014",
      endDate: "05/2014"
    },
    {
      id: "8",
      school: "Indiana University (IPFW)",
      degree: "Certificate",
      program: "Entrepreneurship",
      field: "Business",
      startDate: "01/2014",
      endDate: "05/2014"
    }
  ]
};
