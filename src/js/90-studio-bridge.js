(function(){
  const HANDOFF_KEY='ghrab.handoff.v1';
  function read(){try{return JSON.parse(storageOf('localStorage')?.getItem(HANDOFF_KEY)||'null')}catch(_){return null}}
  function remove(){try{storageOf('localStorage')?.removeItem(HANDOFF_KEY)}catch(_){}}
  function validMaterial(material){return material&&material.schema==='ghrab-material-v1'&&material.content&&typeof material.content==='object'}
  function takeHandoff(){if(new URLSearchParams(location.search).get('studioHandoff')!=='1')return null;const packet=read(),expires=Date.parse(packet?.expiresAt||'');if(!packet||packet.schema!=='ghrab-handoff-v1'||packet.target!==APP_ID||!validMaterial(packet.material)||!Number.isFinite(expires)||expires<=Date.now()){if(packet)remove();return null}remove();return packet}
  function applyHandoff(packet){const material=packet.material;App.project.sourceText=String(material.content?.sourceText||'').slice(0,180000);App.project.title=String(material.title||'Pracovní list');App.project.topic=String(material.title||'');App.project.subject=String(material.subject||App.project.subject);App.project.grade=[material.yearGroup,material.level].filter(Boolean).join(' · ');App.project.goal=(material.objectives||[]).join('; ');syncFormsFromProject();saveProject();toast('Podklad byl převzat z AI Studia.','success')}
  window.addEventListener('load',()=>{const packet=takeHandoff();if(packet)setTimeout(()=>applyHandoff(packet),150)},{once:true});
})();
