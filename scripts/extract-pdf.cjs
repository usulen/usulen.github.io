const fs = require('fs');
const pdfParse = require('pdf-parse');

const pdfPath = "C:\\Projects\\TMU\\kitap.pdf";
const buf = fs.readFileSync(pdfPath);

pdfParse(buf).then(data => {
  process.stdout.write(data.text);
}).catch(err => {
  console.error('Error:', err.message);
});
