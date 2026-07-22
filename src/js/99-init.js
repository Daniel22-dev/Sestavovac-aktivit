function wireCommon(){
  $$('[data-close]').forEach((button)=>button.addEventListener('click',()=>closeModal(button.dataset.close)));
  $$('.modal-layer').forEach((layer)=>layer.addEventListener('click',(event)=>{if(event.target===layer)closeModal(layer.id)}));
  $('#fullscreenBtn')?.addEventListener('click',async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch(error){captureError(error,'fullscreen');toast('Celou obrazovku se nepodařilo zapnout.','error')}});
  $('#diagnosticsBtn')?.addEventListener('click',()=>{refreshDiagnostics();openModal('diagnosticsModal')});
  $$('.context-help, #manualBtn, #testsBtn').forEach((link)=>link.addEventListener('click',()=>{App.lastOperation='open-help'}));
  $('#copyDiagnosticsBtn')?.addEventListener('click',async()=>{refreshDiagnostics();try{await navigator.clipboard.writeText($('#diagnosticsOutput').textContent);toast('Technický protokol byl zkopírován.','success')}catch(error){captureError(error,'copy-diagnostics');toast('Kopírování se nepodařilo.','error')}});
  $('#downloadDiagnosticsBtn')?.addEventListener('click',()=>downloadText(`ACTIVA-diagnostika-${Date.now()}.json`,JSON.stringify(diagnosticSnapshot(),null,2)));
}
function registerPwa(){if('serviceWorker'in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch((error)=>console.warn('ACTIVA service worker',error)),{once:true})}
function init(){document.documentElement.dataset.ghrabAccess='granted';const restored=restoreProject();initApi();wireCommon();wireStorageApi();wireWizard();wireEditor();wirePrintExport();wireLibrary();wireProjection();wireShareExport();syncFormsFromProject();renderActivityCards();if(restored&&App.project.activities.length){setStep('editor');toast('Obnoveno poslední rozpracování.','success')}else setStep('source');registerPwa();refreshDiagnostics()}
init();
