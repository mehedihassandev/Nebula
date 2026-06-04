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
      
      // Replace @shared/ui/components/ and @shared/ui/layout/ with @components/
      content = content.replace(/@shared\/ui\/components\//g, '@components/');
      content = content.replace(/@shared\/ui\/layout\//g, '@components/');
      
      // Replace @features/*/components/ with @components/
      content = content.replace(/@features\/[^\/]+\/components\//g, '@components/');
      
      // Replace models
      content = content.replace(/@shared\/models\//g, '@models/');
      content = content.replace(/@features\/[^\/]+\/models\//g, '@models/');
      
      // Replace constants
      content = content.replace(/@shared\/constants\//g, '@constants/');
      content = content.replace(/@features\/[^\/]+\/constants\//g, '@constants/');
      
      // Also need to handle specific file names if they changed.
      // e.g. projects.constants -> projects
      content = content.replace(/projects\.constants/g, 'projects');
      content = content.replace(/contacts\.constants/g, 'contacts');
      content = content.replace(/education\.constants/g, 'education');
      content = content.replace(/experience\.constants/g, 'experience');
      content = content.replace(/skills\.constants/g, 'skills');
      
      // Replace hooks
      content = content.replace(/@shared\/hooks\//g, '@hooks/');
      
      // Replace utils
      content = content.replace(/@shared\/utils\//g, '@utils/');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src'));
