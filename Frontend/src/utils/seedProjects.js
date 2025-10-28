import Project from "../models/Project.js";

const defaultProjects = [
  {
    title: "NYDev Startup",
    description: "Startup I co-founded focusing on MERN and web solutions.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    liveLink: "https://nydev.com",
    githubLink: "https://github.com/YNDev/nydev",
    imageUrl: "https://link-to-nydev-image.png"
  },
  {
    title: "BNS Bed Notification System",
    description: "Live bed notification system with payment integration.",
    techStack: ["React", "Node.js", "MongoDB"],
    liveLink: "",
    githubLink: "",
    imageUrl: "https://link-to-bns-image.png"
  },
  {
    title: "ABC Bakery & Cake",
    description: "Delivery and online bakery system.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveLink: "",
    githubLink: "",
    imageUrl: "https://link-to-abc-image.png"
  },
  {
    title: "ProcedureNotifier",
    description: "Hospital and procedure tracking system.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveLink: "",
    githubLink: "",
    imageUrl: "https://link-to-procedure-image.png"
  },
  {
    title: "NNMKC Church Website",
    description: "Dynamic church website built with MERN stack.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveLink: "",
    githubLink: "",
    imageUrl: "https://link-to-church-image.png"
  }
];

export const seedProjects = async () => {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(defaultProjects);
    console.log("Default projects seeded successfully!");
  }
};
