const fs = require('fs');
const files = ['src/app/modulos/modulo1.tsx', 'src/app/modulos/modulo2.tsx', 'src/app/modulos/modulo3.tsx'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content.replace(/\s*nit:\s*".*?",\r?\n\s*expediente:\s*".*?",\r?\n\s*codigoServicio:\s*".*?",\r?\n\s*servicio:\s*".*?",\r?\n\s*regimen:\s*".*?",/g, '');
  fs.writeFileSync(f, newContent);
});
console.log('done');
