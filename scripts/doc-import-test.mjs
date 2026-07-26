import fs from 'node:fs';

const storage=fs.readFileSync('src/js/30-storage-api.js','utf8');
const ui=fs.readFileSync('src/js/31-source-import-ui.js','utf8');

const required=[
  ['DOCX parser','mammoth.browser.min.js'],
  ['PDF parser','pdf.min.js'],
  ['PDF worker','pdf.worker.min.js'],
  ['DOCX extension',"name.endsWith('.docx')"],
  ['PDF extension',"name.endsWith('.pdf')"],
  ['OCR warning','vyžaduje OCR'],
  ['size limit','SOURCE_FILE_LIMIT'],
  ['privacy scan','scanPrivacy(false)']
];
for(const [label,needle] of required){
  if(!storage.includes(needle)&&!ui.includes(needle))throw new Error(`${label}: chybí ${needle}`);
}
if(!ui.includes('.docx,.pdf,.txt,.md,.csv,.tsv'))throw new Error('Výběr souboru nenabízí DOCX a PDF.');
console.log('[doc-import-test] DOCX, textová PDF, limity, OCR hlášení a anonymizační kontrola jsou zapojeny.');
