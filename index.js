import { setTimeout } from "node:timers/promises";
import * as p from "@clack/prompts";
import color from "picocolors";

const ASCII_ART = `
██████╗  ██████╗ ███╗   ███╗██╗████████╗
██╔══██╗██╔═══██╗████╗ ████║██║╚══██╔══╝
██████╔╝██║   ██║██╔████╔██║██║   ██║   
██╔══██╗██║   ██║██║╚██╔╝██║██║   ██║   
██║  ██║╚██████╔╝██║ ╚═╝ ██║██║   ██║   
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝   ╚═╝   
`;

const PROJECTS = [
  {
    name: "🎉 Evencio",
    description:
      "Comprehensive event management platform with Kanban-style project boards, AI-powered budget optimization, and secure user authentication",
    tech: "Next.js, React.js, TypeScript, OpenAI API, PostgreSQL, Prisma",
    status: "✅ Completed",
    github: "https://github.com/romit77dey/evencio",
    highlights: [
      "Organization-based chat systems with real-time collaboration",
      "AI-powered automated poster generation",
      "Interactive budget tracking with data visualization",
      "Streamlined workflow management for events",
    ],
  },
  {
    name: "💰 TresorX",
    description:
      "Comprehensive Solana blockchain web application for token management and wallet operations",
    tech: "Next.js, React.js, TailwindCSS, Solana-wallet-adapter, solana/web3.js, SPL token library",
    status: "✅ Completed",
    github: "https://github.com/romit77dey/tresorx",
    highlights: [
      "Token creation with metadata management",
      "SOL airdrop and transfer functionality",
      "Wallet balance checking and monitoring",
      "Responsive UI for seamless blockchain interaction",
    ],
  },
  {
    name: "🏆 Award-Winning Hackathon Projects",
    description:
      "Multiple hackathon projects including turf booking platform, GenAI education tools, and event management systems",
    tech: "Next.js, AI/ML, Web3, Various cutting-edge technologies",
    status: "🏅 Multiple Awards Won",
    highlights: [
      "🥈 Odoo Hackathon 2025 Finalist (Top 10 out of 300+ teams)",
      "🥇 VIT Unplugged Hackathon Winner (2nd place out of 110+ teams)",
      "🥉 HackXplore 2025 Runner-Up (Top 10 out of 325 teams)",
      "Built turf booking platform and GenAI educational assistance tools",
    ],
  },
];

const SKILLS = {
  "Languages & Technologies": [
    "C++",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "HTML5/CSS3",
    "TailwindCSS",
  ],
  "Backend & Databases": [
    "Node.js",
    "Express.js",
    "Socket.IO",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Prisma",
    "Mongoose",
  ],
  "Cloud & DevOps": [
    "AWS (EC2, S3)",
    "Docker",
    "CI/CD",
    "Vercel",
    "Cloudflare Workers",
  ],
  Blockchain: [
    "Solana (Web3.js)",
    "Ethers.js",
    "SPL token library",
    "Solana-wallet-adapter",
  ],
  "Tools & Others": [
    "Git",
    "Linux",
    "AI/ML Integration",
    "Real-time Systems",
    "OpenAI API",
  ],
};

async function showAbout() {
  const aboutText = `
${color.cyan("👋 Hey there! I'm Romit Dey")}

${color.white(
  "I'm a passionate Computer Science student and Software Engineer"
)}
${color.white(
  "who loves building innovative solutions with cutting-edge technologies."
)}

${color.yellow("🎓 Education:")}
• Bachelor of Technology in Computer Science
• Vellore Institute of Technology (2022-2026)
• CGPA: 8.92/10

${color.yellow("💼 Experience:")}
• Software Engineering Intern at Jindal Steel and Power
• Developed night surveillance applications serving 5,000+ users
• Led web development teams and built award-winning projects

${color.yellow("🏆 Recent Achievements:")}
• 🥈 Odoo Hackathon 2025 Finalist (Top 10/300+ teams)
• 🥇 VIT Unplugged Hackathon Winner (2nd place)
• 🥉 HackXplore 2025 Runner-Up (Top 10/325 teams)

${color.green("📍 Location:")} Kolkata, India 🇮🇳
${color.green(
  "💼 Status:"
)} Actively seeking internship & full-time opportunities
${color.green(
  "⚡ Passion:"
)} Building scalable applications & blockchain solutions
  `;

  p.note(aboutText, "About Me");
  await setTimeout(2000);
}

async function showProjects() {
  const selectedProject = await p.select({
    message: "Select a project to learn more about:",
    options: PROJECTS.map((project) => ({
      value: project,
      label: project.name,
      hint: project.status,
    })),
  });

  if (p.isCancel(selectedProject)) return;

  let projectDetails = `
${color.cyan(selectedProject.name)}

${color.white(selectedProject.description)}

${color.yellow("🛠️  Tech Stack:")} ${selectedProject.tech}
${color.yellow("📊 Status:")} ${selectedProject.status}`;

  if (selectedProject.github) {
    projectDetails += `\n${color.yellow("🔗 GitHub:")} ${color.underline(
      selectedProject.github
    )}`;
  }

  if (selectedProject.company) {
    projectDetails += `\n${color.yellow("🏢 Company:")} ${
      selectedProject.company
    }`;
  }

  if (selectedProject.highlights) {
    projectDetails += `\n\n${color.green("✨ Key Highlights:")}`;
    selectedProject.highlights.forEach((highlight) => {
      projectDetails += `\n${color.green("•")} ${highlight}`;
    });
  }

  projectDetails += `\n\n${color.green(
    "Want to see more? Check out my GitHub profile!"
  )}`;

  p.note(projectDetails, "Project Details");
  await setTimeout(2000);
}

async function showSkills() {
  const selectedCategory = await p.select({
    message: "Which skill category interests you?",
    options: Object.keys(SKILLS).map((category) => ({
      value: category,
      label: category,
      hint: `${SKILLS[category].length} skills`,
    })),
  });

  if (p.isCancel(selectedCategory)) return;

  const skillsList = SKILLS[selectedCategory]
    .map((skill) => `• ${color.cyan(skill)}`)
    .join("\n");

  p.note(skillsList, `${selectedCategory} Skills`);
  await setTimeout(2000);
}

async function showExperience() {
  const experienceInfo = `
${color.cyan("💼 Professional Experience & Leadership")}

${color.yellow("🏢 Software Engineering Intern")}
${color.white("Jindal Steel and Power | June 2024 - July 2024")}
• Developed night surveillance application with ReactJS
• Enhanced system performance with reduced response times
• Implemented features scaling to 5,000+ daily users
• Transformed report management workflows

${color.yellow("👨‍💻 Leadership Roles")}
${color.white("Web Team Lead, Linux Club (Jan 2024 - May 2024)")}
• Led team of 5 developers for club's official website
• Improved user engagement and digital presence

${color.white("Web Team Member, FinTech Club (Aug 2024 - Jan 2025)")}
• Collaborated with cross-functional team of 4
• Built dynamic event websites increasing participation

${color.yellow("🏆 Hackathon Achievements")}
• ${color.green(
    "🥈 Odoo Hackathon 2025:"
  )} Top 10/300+ teams - Turf booking platform
• ${color.green(
    "🥇 VIT Unplugged:"
  )} 1st place/110+ teams - GenAI education tool
• ${color.green("🥉 HackXplore 2025:")} Top 10/325 teams - AI event management

${color.cyan("Proven track record of delivering impactful solutions!")}
  `;

  p.note(experienceInfo, "Experience & Achievements");
  await setTimeout(2000);
}

async function showContact() {
  const contactInfo = `
${color.cyan("📬 Let's connect!")}

${color.yellow("📧 Email:")} romit77dey@gmail.com
${color.yellow("💼 LinkedIn:")} ${color.underline(
    "https://www.linkedin.com/in/romit77/"
  )}
${color.yellow("🐙 GitHub:")} ${color.underline("https://github.com/Romit77")}
${color.yellow("🌐 Portfolio:")} ${color.underline("https://bento.me/romit17")}

${color.green("🎓 Currently studying at VIT, graduating in 2026")}
${color.green("💡 Open to internships, full-time roles, and collaborations")}
${color.green("🚀 Passionate about full-stack development and blockchain")}

${color.cyan('"Building tomorrow\'s applications today"')}
  `;

  p.note(contactInfo, "Contact Information");
  await setTimeout(2000);
}

async function main() {
  console.clear();

  p.updateSettings({
    aliases: {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    },
  });

  await setTimeout(500);
  console.log(color.cyan(ASCII_ART));

  p.intro(
    `${color.bgCyan(
      color.black(" Welcome to Romit Dey's Interactive Portfolio! ")
    )}`
  );

  let continueExploring = true;

  while (continueExploring) {
    const choice = await p.select({
      message: "What would you like to explore?",
      initialValue: "about",
      options: [
        { value: "about", label: "👤 About Me", hint: "Get to know me" },
        {
          value: "projects",
          label: "🚀 Projects",
          hint: "See what I've built",
        },
        { value: "skills", label: "⚡ Skills", hint: "Technical expertise" },
        {
          value: "experience",
          label: "💼 Experience",
          hint: "Work & achievements",
        },
        { value: "contact", label: "📬 Contact", hint: "Let's connect" },
        { value: "exit", label: "👋 Exit", hint: "Thanks for visiting!" },
      ],
    });

    if (p.isCancel(choice)) {
      p.cancel("Thanks for visiting! 👋");
      break;
    }

    switch (choice) {
      case "about":
        await showAbout();
        break;
      case "projects":
        await showProjects();
        break;
      case "skills":
        await showSkills();
        break;
      case "experience":
        await showExperience();
        break;
      case "contact":
        await showContact();
        break;
      case "exit":
        continueExploring = false;
        break;
    }

    if (choice !== "exit") {
      const shouldContinue = await p.confirm({
        message: "Would you like to explore more?",
        initialValue: true,
      });

      if (p.isCancel(shouldContinue) || !shouldContinue) {
        continueExploring = false;
      }
    }
  }

  const s = p.spinner();
  s.start("Wrapping up...");
  await setTimeout(1000);
  s.stop("All done!");

  p.outro(
    `${color.green("Thanks for exploring my portfolio!")} 
${color.cyan(
  '💡 Remember: "Code is like humor. When you have to explain it, it\'s bad." - Cory House'
)}`
  );
}

main().catch(console.error);
