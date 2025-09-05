# 🎯 CLI Portfolio Generator Usage Guide

## 🚀 Quick Start

Run this command to create your own CLI portfolio:

```bash
npx romit77 create-cli-portfolio
```

## 📝 What Information You'll Need

Have these ready before starting:

### Personal Information

- Full name
- Professional role/title
- Education background
- Location
- Email address
- GitHub username
- LinkedIn profile
- Portfolio website (optional)

### Projects (up to 5)

For each project:

- Project name
- Description
- Tech stack used
- GitHub repository URL (optional)
- Live demo URL (optional)

### Skills

Technical skills organized by categories:

- Languages & Technologies
- Frameworks & Libraries
- Backend & Databases
- Cloud & DevOps
- Tools & Others

## 🎨 Example Output

After running the generator, you'll get:

```
my-cli-portfolio/
├── portfolio.js          # Your interactive CLI app
├── package.json          # NPM package configuration
└── README.md             # Documentation for your portfolio
```

## 📦 Publishing Your Portfolio

1. **Test locally first:**

   ```bash
   cd my-cli-portfolio
   npm install
   npm start
   ```

2. **Publish to npm:**

   ```bash
   npm login              # Login to npm (create account if needed)
   npm publish            # Publish your package
   ```

3. **Share with the world:**
   ```bash
   npx your-username-portfolio
   ```

## ✨ Customization Tips

After generation, you can customize your portfolio by editing `portfolio.js`:

- **Add more projects** - Update the `PROJECTS` array
- **Modify skills** - Edit the `SKILLS` object
- **Change colors** - Customize the color scheme
- **Add sections** - Create new interactive sections
- **Personal touches** - Add your personality and humor

## 🎯 Best Practices

- **Keep it concise** - Highlight your best work
- **Use emojis wisely** - They make it more engaging
- **Test on different terminals** - Ensure compatibility
- **Update regularly** - Keep your portfolio current
- **Add contact info** - Make it easy to reach you

## 💡 Ideas for Enhancement

- Add a "random fact" section
- Include ASCII art of your tech stack
- Add typing animations
- Create a "journey" timeline
- Include testimonials or quotes

## 🔧 Troubleshooting

**Issue**: Package name already taken on npm
**Solution**: Choose a unique name in package.json

**Issue**: Colors not showing correctly
**Solution**: Use a terminal that supports colors (most modern terminals do)

**Issue**: ASCII art looks broken
**Solution**: Use a monospace font in your terminal

## 📞 Support

If you run into any issues:

1. Check the generated README.md in your portfolio
2. Look at the example portfolio at `npx romit77`
3. Open an issue on the GitHub repository

---

**Happy portfolio building!** 🚀
