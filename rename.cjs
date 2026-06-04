const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const models = ['Contact', 'Education', 'Experience', 'Menu', 'Project', 'Skill', 'SocialLink'];
      for (const m of models) {
        // e.g. from "@models/IProject" to "@models/Project"
        content = content.replace(new RegExp(`@models/I${m}`, 'g'), `@models/${m}`);
        content = content.replace(new RegExp(`\\.\\./models/I${m}`, 'g'), `../models/${m}`);
      }
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src'));
