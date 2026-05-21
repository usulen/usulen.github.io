import { readFileSync } from 'fs';
import pdfParse from 'pdf-parse';

const buf = readFileSync("G:\\Drive'ım\\Akademik\\Yayınlarım\\TSMTU Kitap (2).pdf");
const data = await pdfParse(buf);
console.log(data.text);
