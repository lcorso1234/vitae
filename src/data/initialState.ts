import { VitaeData } from "../types/vitae";

export const initialVitaeData: VitaeData = {
  personalInfo: {
    fullName: "Larry Corso",
    targetPosition: "Software Engineer",
    email: "lawrencecorso1@gmail.com",
    phone: "708.932.6851",
    location: "Chicago",
    relocation: "Willing to relocate",
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/lawrence-tech/" },
      { name: "GitHub", url: "https://github.com/lcorso12" },
      { name: "Portfolio", url: "https://yourportfolio.com" }
    ]
  },
  coverLetter: "My company was born in adversity, as I started out with a $1,000 credit card loan. I had to learn how to prospect, sell, design, develop, and host websites by myself.  Through diligent networking and cold calling, I identified several website prospects.  I quickly recognized the need to partner with both a designer and a developer to keep up with the demand.  I met my design partner through a logo design contest.  I then went through several developers to find the one I felt most comfortable with.  He stood out because of his skills and work ethic.  Together, we successfully delivered 40+ client projects across multiple industries over the past 8 years.\n\nThrough this experience, I learned that the hardest part in delivering high quality solutions to our clients was bridging the communications gap between design and development - oil and water; getting them on the same page.  Initially, my role was focused on prospecting, helping clients develop their brand strategies, and selling websites and applications.  But given the critical need to align design and development, I then focused on strengthening my technology and software development skills in order to enhance the communications between our team.  In March of this year, I attained certification as a Software Engineer through a program at TripleTen.  I've learned that I really enjoy software development and am interested in pursuing a position with a development focus that can benefit from my skills and experiences.",
  summary: "Accomplished software engineer with over 15 years of experience in brand strategy, technology, and software development. Expertise in building scalable digital products and managing complex cross-functional projects. Proven track record of delivering high-impact solutions across many industries.",
  skills: {
    technical: [
      "Node/Express JS", "JS React", "CSS", "Tailwind CSS", "HTML 5", "MongoDB", "Docker", "Next JS", "Github", "Digital Ocean", "Google Cloud", "VS Code", "Chat GPT", "Vercel", "Anti-Gravity", "Klaviyo {Built my own}", "Figma", "WordPress", "SEO"
    ],
    soft: []
  },
  projects: [
    {
      id: "1",
      title: "iChat",
      description: "A chat system for those who love privacy and security",
      link: "https://github.com/lcorso12",
      bullets: [
        "Create a chat link, share it with your friends, say whatever is on your mind, then end the chat."
      ]
    },
    {
      id: "2",
      title: "Blur",
      description: "Privacy is key for sophisticated clients, we pioneered a smart way to blur out sensitive information in our videos.",
      link: "https://github.com/lcorso12",
      bullets: [
        "Upload the recorded video and blur out logos and sensitive information in a timeline. Each blur has it's own timeline to make this software user friendly."
      ]
    },
    {
      id: "3",
      title: "Watch Me",
      description: "Screen record your projects to present them in a sophisticated manner.",
      link: "https://github.com/lcorso12",
      bullets: [
        "You can capture your computer's desktop, mobile phone recording screen, and your face at the same time to present applications."
      ]
    },
    {
      id: "4",
      title: "Resume Maker",
      description: "Built a resume builder to apply for jobs ;).",
      link: "https://github.com/lcorso12",
      bullets: [
        "The builder runs through a checklist of essentials needed to qualify for a software engineer position.",
        "You can edit the builder easily like a word doc, yet more simple and download the pdf to share."
      ]
    },
    {
      id: "5",
      title: "Joy Machine",
      description: "An intro, Outro, Lower Thirds and Subtitles video maker",
      link: "https://github.com/lcorso12",
      bullets: [
        "Content is King, so I kept only the best parts in presenting ideas over video to make any video look professional."
      ]
    }
  ],
  experience: [
    {
      id: "6",
      company: "Jung International LLC",
      role: "Software Engineer",
      startDate: "12/2024",
      endDate: "PRESENT",
      link: "https://www.jungthemes.com",
      achievements: [
        "Disrupted the marketing industry with revolutionary field cards, a two way communication achieved through NFC cards to make networking more personal again.",
        "Developed a social media platform that removes the complications of setting up an account before posting, making the backend open source on the front end.",
        "Created slide cards which are a mobile only design that allows users to present disruptive technology combining the traditional method of values, features, benefits with modern tech."
      ]
    },
    {
      id: "7",
      company: "Rumi Design and Technology",
      role: "Entrepreneur, Brand Strategist",
      startDate: "03/2018",
      endDate: "12/2025",
      link: "https://rumi.com",
      achievements: [
        "Created an effective process to streamline communication across design and development.",
        "Built a company, through prospecting and cold calling; then learned how to design, develop and host my own websites to give the client a competitive advantage in their marketplace.",
        "Accomplished successful delivery of 40+ client projects, across many industries.",
        "Sourcing global resources, identified and secured global design and dev resources to assist in each of the projects."
      ]
    }
  ],
  education: [
    {
      id: "9",
      school: "TripleTen",
      degree: "Certificate",
      program: "Computer Software Engineering",
      field: "Software Engineering",
      startDate: "01/2025",
      endDate: "03/2026"
    },
    {
      id: "8",
      school: "Purdue University",
      degree: "Bachelor's Degree",
      program: "Management & Marketing",
      field: "Management & Marketing",
      startDate: "04/2011",
      endDate: "05/2014"
    },
    {
      id: "10",
      school: "Lean Six Sigma",
      degree: "Certificate",
      program: "Black Belt Lean Six Sigma",
      field: "Project Management",
      startDate: "01/2014",
      endDate: "05/2014"
    },
    {
      id: "11",
      school: "Indiana University",
      degree: "Certificate",
      program: "Entrepreneurship",
      field: "Business",
      startDate: "01/2014",
      endDate: "05/2014"
    }
  ]
};
