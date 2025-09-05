#!/usr/bin/env node

import { setTimeout } from "node:timers/promises";
import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs";
import path from "path";

const TEMPLATE_ASCII = `
 ██████╗██╗     ██╗    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔════╝██║     ██║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██║     ██║     ██║    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██║     ██║     ██║    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
╚██████╗███████╗██║    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═════╝╚══════╝╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
                                                                                               
                              GENERATOR
`;

async function collectUserInfo() {
  const userInfo = {};

  p.intro(`${color.bgMagenta(color.white(" 🚀 CLI Portfolio Generator "))}`);

  await setTimeout(500);

  userInfo.name = await p.text({
    message: "What's your full name?",
    placeholder: "e.g., John Doe",
    validate(value) {
      if (!value) return "Please enter your name";
    },
  });

  if (p.isCancel(userInfo.name)) return null;

  userInfo.asciiName = await p.text({
    message:
      "What should appear in ASCII art? (usually first name or username)",
    placeholder: "e.g., JOHN or JOHNDOE",
    defaultValue: userInfo.name.split(" ")[0].toUpperCase(),
  });

  if (p.isCancel(userInfo.asciiName)) return null;

  userInfo.role = await p.text({
    message: "What's your professional role/title?",
    placeholder: "e.g., Full Stack Developer, Data Scientist, etc.",
    validate(value) {
      if (!value) return "Please enter your role";
    },
  });

  if (p.isCancel(userInfo.role)) return null;

  userInfo.education = await p.text({
    message: "What's your education background?",
    placeholder: "e.g., Computer Science at XYZ University",
  });

  if (p.isCancel(userInfo.education)) return null;

  userInfo.location = await p.text({
    message: "Where are you located?",
    placeholder: "e.g., San Francisco, CA",
  });

  if (p.isCancel(userInfo.location)) return null;

  userInfo.email = await p.text({
    message: "What's your email address?",
    placeholder: "e.g., john@example.com",
    validate(value) {
      if (!value) return "Please enter your email";
      if (!value.includes("@")) return "Please enter a valid email";
    },
  });

  if (p.isCancel(userInfo.email)) return null;

  userInfo.github = await p.text({
    message: "What's your GitHub username?",
    placeholder: "e.g., johndoe",
  });

  if (p.isCancel(userInfo.github)) return null;

  userInfo.linkedin = await p.text({
    message: "What's your LinkedIn profile URL or username?",
    placeholder: "e.g., linkedin.com/in/johndoe or just johndoe",
  });

  if (p.isCancel(userInfo.linkedin)) return null;

  userInfo.portfolio = await p.text({
    message: "Do you have a portfolio website? (optional)",
    placeholder: "e.g., https://johndoe.dev",
  });

  if (p.isCancel(userInfo.portfolio)) return null;

  return userInfo;
}

async function collectProjects() {
  const projects = [];

  const addProjects = await p.confirm({
    message: "Would you like to add some projects to showcase?",
    initialValue: true,
  });

  if (p.isCancel(addProjects) || !addProjects) return projects;

  let addingProjects = true;
  let projectCount = 1;

  while (addingProjects && projectCount <= 5) {
    p.note(`Adding project ${projectCount}/5`, "Project Information");

    const project = {};

    project.name = await p.text({
      message: `Project ${projectCount} name:`,
      placeholder: "e.g., My Awesome App",
      validate(value) {
        if (!value) return "Please enter a project name";
      },
    });

    if (p.isCancel(project.name)) break;

    project.description = await p.text({
      message: "Brief description:",
      placeholder:
        "e.g., A web app that helps users manage their tasks efficiently",
      validate(value) {
        if (!value) return "Please enter a description";
      },
    });

    if (p.isCancel(project.description)) break;

    project.tech = await p.text({
      message: "Tech stack used:",
      placeholder: "e.g., React, Node.js, MongoDB, Express",
      validate(value) {
        if (!value) return "Please enter the tech stack";
      },
    });

    if (p.isCancel(project.tech)) break;

    project.github = await p.text({
      message: "GitHub repository URL: (optional)",
      placeholder: "e.g., https://github.com/username/project",
    });

    if (p.isCancel(project.github)) break;

    project.demo = await p.text({
      message: "Live demo URL: (optional)",
      placeholder: "e.g., https://myproject.vercel.app",
    });

    if (p.isCancel(project.demo)) break;

    projects.push(project);
    projectCount++;

    if (projectCount <= 5) {
      const continueAdding = await p.confirm({
        message: "Would you like to add another project?",
        initialValue: false,
      });

      if (p.isCancel(continueAdding) || !continueAdding) {
        addingProjects = false;
      }
    }
  }

  return projects;
}

async function collectSkills() {
  const skills = {};

  const addSkills = await p.confirm({
    message: "Would you like to add your technical skills?",
    initialValue: true,
  });

  if (p.isCancel(addSkills) || !addSkills) return skills;

  const categories = [
    "Languages & Technologies",
    "Frameworks & Libraries",
    "Backend & Databases",
    "Cloud & DevOps",
    "Tools & Others",
  ];

  for (const category of categories) {
    const skillsInput = await p.text({
      message: `${category} (comma-separated):`,
      placeholder: "e.g., JavaScript, Python, React, Node.js",
    });

    if (p.isCancel(skillsInput)) break;

    if (skillsInput && skillsInput.trim()) {
      skills[category] = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
    }
  }

  return skills;
}

function generateASCII(name) {
  // Simple ASCII art generator - you can enhance this
  const letters = {
    A: ["██████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    B: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██████╔╝", "╚═════╝ "],
    C: ["██████╗ ", "██╔════╝", "██║     ", "██║     ", "╚██████╗", " ╚═════╝"],
    D: ["██████╗ ", "██╔══██╗", "██║  ██║", "██║  ██║", "██████╔╝", "╚═════╝ "],
    E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
    F: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "██║     ", "╚═╝     "],
    G: [
      "██████╗ ",
      "██╔════╝",
      "██║ ███╗",
      "██║  ██║",
      "╚██████╔╝",
      " ╚═════╝",
    ],
    H: ["██╗  ██╗", "██║  ██║", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    I: ["██╗", "██║", "██║", "██║", "██║", "╚═╝"],
    J: ["     ██╗", "     ██║", "     ██║", "██   ██║", "╚█████╔╝", " ╚════╝ "],
    K: ["██╗  ██╗", "██║ ██╔╝", "█████╔╝ ", "██╔═██╗ ", "██║  ██╗", "╚═╝  ╚═╝"],
    L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
    M: [
      "███╗   ███╗",
      "████╗ ████║",
      "██╔████╔██║",
      "██║╚██╔╝██║",
      "██║ ╚═╝ ██║",
      "╚═╝     ╚═╝",
    ],
    N: [
      "███╗   ██╗",
      "████╗  ██║",
      "██╔██╗ ██║",
      "██║╚██╗██║",
      "██║ ╚████║",
      "╚═╝  ╚═══╝",
    ],
    O: [
      "██████╗ ",
      "██╔══██╗",
      "██║  ██║",
      "██║  ██║",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    P: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔═══╝ ", "██║     ", "╚═╝     "],
    Q: [
      "██████╗ ",
      "██╔══██╗",
      "██║  ██║",
      "██║ ╚██╗",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    R: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██║  ██║", "╚═╝  ╚═╝"],
    S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
    T: [
      "████████╗",
      "╚══██╔══╝",
      "   ██║   ",
      "   ██║   ",
      "   ██║   ",
      "   ╚═╝   ",
    ],
    U: [
      "██╗  ██╗",
      "██║  ██║",
      "██║  ██║",
      "██║  ██║",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    V: [
      "██╗   ██╗",
      "██║   ██║",
      "██║   ██║",
      "╚██╗ ██╔╝",
      " ╚████╔╝ ",
      "  ╚═══╝  ",
    ],
    W: [
      "██╗    ██╗",
      "██║    ██║",
      "██║ █╗ ██║",
      "██║███╗██║",
      "╚███╔███╔╝",
      " ╚══╝╚══╝ ",
    ],
    X: ["██╗  ██╗", "╚██╗██╔╝", " ╚███╔╝ ", " ██╔██╗ ", "██╔╝ ██╗", "╚═╝  ╚═╝"],
    Y: [
      "██╗   ██╗",
      "╚██╗ ██╔╝",
      " ╚████╔╝ ",
      "  ╚██╔╝  ",
      "   ██║   ",
      "   ╚═╝   ",
    ],
    Z: ["███████╗", "╚══███╔╝", "  ███╔╝ ", " ███╔╝  ", "███████╗", "╚══════╝"],
    " ": ["   ", "   ", "   ", "   ", "   ", "   "],
  };

  const nameArray = name.toUpperCase().split("");
  const lines = ["", "", "", "", "", ""];

  nameArray.forEach((char) => {
    if (letters[char]) {
      letters[char].forEach((line, index) => {
        lines[index] += line + " ";
      });
    }
  });

  return lines.join("\n");
}

function generatePortfolioTemplate(userInfo, projects, skills) {
  const asciiArt = generateASCII(userInfo.asciiName);

  const projectsArray = projects.map((project) => {
    const projectObj = {
      name: project.name,
      description: project.description,
      tech: project.tech,
    };

    if (project.demo) projectObj.Link = project.demo;
    if (project.github) projectObj.github = project.github;

    return projectObj;
  });

  const linkedinUrl = userInfo.linkedin.includes("linkedin.com")
    ? userInfo.linkedin
    : `https://www.linkedin.com/in/${userInfo.linkedin}`;

  const githubUrl = userInfo.github.includes("github.com")
    ? userInfo.github
    : `https://github.com/${userInfo.github}`;

  return `#!/usr/bin/env node

import { setTimeout } from "node:timers/promises";
import * as p from "@clack/prompts";
import color from "picocolors";

const ASCII_ART = \`
${asciiArt}
\`;

const PROJECTS = ${JSON.stringify(projectsArray, null, 2)};

const SKILLS = ${JSON.stringify(skills, null, 2)};

async function showAbout() {
  const aboutText = \`
\${color.cyan("👋 Hey there! I'm ${userInfo.name}")}

\${color.white("I'm a passionate ${userInfo.role}")}
\${color.white("who loves building innovative solutions with cutting-edge technologies.")}

\${color.yellow("🎓 Education:")}
• ${userInfo.education}

\${color.green("📍 Location:")} ${userInfo.location}
\${color.green("💼 Status:")} Open to new opportunities
\${color.green("⚡ Passion:")} Building amazing applications
  \`;

  p.note(aboutText, "About Me");
  await setTimeout(2000);
}

async function showProjects() {
  if (PROJECTS.length === 0) {
    p.note("No projects added yet. Update the PROJECTS array in this file to add your projects!", "Projects");
    return;
  }

  const selectedProject = await p.select({
    message: "Select a project to learn more about:",
    options: PROJECTS.map((project) => ({
      value: project,
      label: project.name,
    })),
  });

  if (p.isCancel(selectedProject)) return;

  let projectDetails = \`
\${color.cyan(selectedProject.name)}

\${color.magenta(selectedProject.description)}

\${color.yellow("🛠️  Tech Stack:")} \${color.blue(selectedProject.tech)}\`;

  if (selectedProject.Link) {
    projectDetails += \`\\n\${color.yellow("🌐 Live Demo:")} \${color.cyan(
      color.underline(selectedProject.Link)
    )}\`;
  }

  if (selectedProject.github) {
    projectDetails += \`\\n\${color.yellow("🔗 GitHub:")} \${color.cyan(
      color.underline(selectedProject.github)
    )}\`;
  }

  projectDetails += \`\\n\\n\${color.green(
    "Want to see more? Check out my GitHub profile!"
  )}\`;

  p.note(projectDetails, "Project Details");
  await setTimeout(2000);
}

async function showSkills() {
  if (Object.keys(SKILLS).length === 0) {
    p.note("No skills added yet. Update the SKILLS object in this file to add your skills!", "Skills");
    return;
  }

  const selectedCategory = await p.select({
    message: "Which skill category interests you?",
    options: Object.keys(SKILLS).map((category) => ({
      value: category,
      label: category,
      hint: \`\${SKILLS[category].length} skills\`,
    })),
  });

  if (p.isCancel(selectedCategory)) return;

  const skillsList = SKILLS[selectedCategory]
    .map((skill) => \`• \${color.cyan(skill)}\`)
    .join("\\n");

  p.note(skillsList, \`\${selectedCategory} Skills\`);
  await setTimeout(2000);
}

async function showContact() {
  const contactInfo = \`
\${color.cyan("📬 Let's connect!")}

\${color.yellow("📧 Email:")} ${userInfo.email}
\${color.yellow("💼 LinkedIn:")} \${color.underline("${linkedinUrl}")}
\${color.yellow("🐙 GitHub:")} \${color.underline("${githubUrl}")}${
    userInfo.portfolio
      ? `\n\${color.yellow("🌐 Portfolio:")} \${color.underline("${userInfo.portfolio}")}`
      : ""
  }

\${color.green("💡 Open to new opportunities and collaborations")}
\${color.green("🚀 Passionate about technology and innovation")}

\${color.cyan('"Building amazing things, one project at a time"')}
  \`;

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
    \`\${color.bgCyan(
      color.black(" Welcome to ${userInfo.name}'s Interactive Portfolio! ")
    )}\`
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
    \`\${color.green("Thanks for exploring my portfolio!")} 
\${color.cyan('💡 "Code is poetry written in logic."')}\`
  );
}

main().catch(console.error);
`;
}

function generatePackageJson(userInfo) {
  const username = userInfo.github.toLowerCase().replace(/[^a-z0-9-]/g, "-");

  return JSON.stringify(
    {
      name: `${username}-portfolio`,
      version: "1.0.0",
      main: "portfolio.js",
      type: "module",
      bin: {
        [username]: "./portfolio.js",
      },
      scripts: {
        start: "node portfolio.js",
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [
        "portfolio",
        "cli",
        "interactive",
        userInfo.name.toLowerCase(),
      ],
      author: userInfo.name,
      license: "MIT",
      description: `Interactive CLI portfolio for ${userInfo.name}`,
      dependencies: {
        "@clack/prompts": "^0.11.0",
        picocolors: "^1.1.1",
      },
    },
    null,
    2
  );
}

function generateReadme(userInfo) {
  const username = userInfo.github.toLowerCase().replace(/[^a-z0-9-]/g, "-");

  return `# 🚀 ${userInfo.name}'s CLI Portfolio

> An interactive command-line portfolio built with modern JavaScript

## ✨ What's This?

This is my personal CLI portfolio - an interactive way to showcase my projects, skills, and experience right in your terminal!

## 🎮 Quick Start

### The Easy Way:

\`\`\`bash
npx ${username}-portfolio
\`\`\`

### Local Development:

1. Clone this repository
2. Install dependencies: \`npm install\`
3. Run: \`npm start\`

## 🛠️ Built With

- **Node.js** - Runtime environment
- **@clack/prompts** - Beautiful CLI prompts
- **picocolors** - Terminal colors

## 📝 Customization

Want to create your own CLI portfolio? This was generated using [CLI Portfolio Generator](https://www.npmjs.com/package/romit77).

To customize this portfolio:

1. Edit the \`PROJECTS\` array to add/modify your projects
2. Update the \`SKILLS\` object with your technical skills
3. Modify the \`showAbout()\` function to reflect your background
4. Update contact information in \`showContact()\`

## 🎨 Features

- 🎨 Beautiful ASCII art
- 🚀 Interactive project showcase
- ⚡ Skills categorization
- 📬 Contact information
- 🎮 WASD navigation support
- 💫 Smooth animations

## 📬 Contact

- **Email:** ${userInfo.email}
- **GitHub:** https://github.com/${userInfo.github}
- **LinkedIn:** ${
    userInfo.linkedin.includes("linkedin.com")
      ? userInfo.linkedin
      : `https://www.linkedin.com/in/${userInfo.linkedin}`
  }

---

⭐ Star this repo if you found it interesting!
`;
}

async function createPortfolioFiles(userInfo, projects, skills, outputDir) {
  const portfolioContent = generatePortfolioTemplate(
    userInfo,
    projects,
    skills
  );
  const packageJsonContent = generatePackageJson(userInfo);
  const readmeContent = generateReadme(userInfo);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write files
  fs.writeFileSync(path.join(outputDir, "portfolio.js"), portfolioContent);
  fs.writeFileSync(path.join(outputDir, "package.json"), packageJsonContent);
  fs.writeFileSync(path.join(outputDir, "README.md"), readmeContent);

  return outputDir;
}

async function main() {
  console.clear();
  await setTimeout(500);
  console.log(color.magenta(TEMPLATE_ASCII));

  // Collect user information
  const userInfo = await collectUserInfo();
  if (!userInfo) {
    p.cancel("Portfolio generation cancelled. Come back anytime! 👋");
    return;
  }

  // Collect projects
  const projects = await collectProjects();

  // Collect skills
  const skills = await collectSkills();

  // Ask for output directory
  const outputDir = await p.text({
    message: "Where should we create your portfolio?",
    placeholder: "./my-cli-portfolio",
    defaultValue: "./my-cli-portfolio",
  });

  if (p.isCancel(outputDir)) {
    p.cancel("Portfolio generation cancelled. Come back anytime! 👋");
    return;
  }

  // Generate files
  const s = p.spinner();
  s.start("Generating your CLI portfolio...");

  try {
    const createdPath = await createPortfolioFiles(
      userInfo,
      projects,
      skills,
      outputDir
    );
    await setTimeout(1500);
    s.stop("Portfolio generated successfully! 🎉");

    p.note(
      `Your portfolio has been created in: ${color.cyan(createdPath)}

${color.yellow("Next steps:")}
1. ${color.green("cd " + outputDir)}
2. ${color.green("npm install")}
3. ${color.green("npm start")} ${color.dim("(to test locally)")}
4. ${color.green("npm publish")} ${color.dim("(to publish to npm)")}

${color.cyan("Your portfolio will be available as:")} ${color.white(
        "npx " +
          userInfo.github.toLowerCase().replace(/[^a-z0-9-]/g, "-") +
          "-portfolio"
      )}`,
      "🎉 Success!"
    );
  } catch (error) {
    s.stop("Failed to generate portfolio");
    p.cancel(`Error: ${error.message}`);
    return;
  }

  p.outro(
    `${color.green("Your CLI portfolio is ready!")} 
${color.cyan(
  '🚀 "Your career is your business. Market it like one!" - Ryan Kahn'
)}`
  );
}

main().catch(console.error);
