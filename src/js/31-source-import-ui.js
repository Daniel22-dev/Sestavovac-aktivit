function configureSourceImportUi(){
  const input=document.querySelector('#sourceFile');
  if(!input)return;
  input.accept='.docx,.pdf,.txt,.md,.csv,.tsv,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/plain,text/markdown,text/csv,text/tab-separated-values';
  const label=document.querySelector('label[for="sourceFile"]');
  if(label)label.textContent='Nahrát DOCX, PDF, TXT nebo CSV';
  const note=label?.parentElement?.querySelector('span');
  if(note)note.textContent='DOCX a textová PDF se načtou do editoru. Naskenované PDF bez textové vrstvy vyžaduje OCR. Citlivé údaje před AI anonymizujte.';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',configureSourceImportUi,{once:true});
else configureSourceImportUi();
