const fs = require('fs');
const file = 'src/app/experience/page.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  /className="text-sm lg:text-base text-textColor opacity-90 items-center flex font-saira font-semibold transition-colors hover:text-secondary"/,
  '<h4 key={index} className="text-sm lg:text-base text-textColor opacity-90 items-center flex font-saira font-semibold transition-colors hover:text-secondary"'
);
fs.writeFileSync(file, content);
