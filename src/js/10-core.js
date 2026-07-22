'use strict';
const ACTIVA_VERSION='__APP_VERSION__';
const APP_ID='activity-builder';
const $=(sel,root=document)=>root.querySelector(sel);
const $$=(sel,root=document)=>[...root.querySelectorAll(sel)];
const esc=(value)=>String(value??'').replace(/[&<>"]/g,(ch)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
const clone=(value)=>JSON.parse(JSON.stringify(value));
const uid=(prefix='id')=>`${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const nowIso=()=>new Date().toISOString();
const downloadText=(name,text,type='application/json')=>{const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500)};
function seededRandom(seed){let h=2166136261>>>0;for(const ch of String(seed))h=Math.imul(h^ch.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function shuffle(items,seed){const out=[...items],rnd=seededRandom(seed);for(let i=out.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
const App={
  version:ACTIVA_VERSION,
  activeStep:'source',
  selectedActivityIndex:0,
  zoom:.82,
  lastOperation:'start',
  lastError:null,
  privacyFindings:[],
  recommendedTypes:[],
  api:{key:'',model:'gemini-3.6-flash',storage:'none'},
  project:{
    schema:'activa-project-v1',version:ACTIVA_VERSION,id:uid('project'),createdAt:nowIso(),updatedAt:nowIso(),
    title:'Nový pracovní list',subject:'Český jazyk a literatura',grade:'',topic:'',goal:'',duration:20,difficulty:'standard',mode:'individual',sourceText:'',
    selectedTypes:[],activities:[],teacherNote:'',variant:'A',activeLevel:'standard',subjectPack:'auto',differentiation:{enabled:true,levels:['support','standard','challenge'],lockedCore:true,balanced:true},print:{logo:true,mono:true,nameLine:true,levelMode:'current',variantMode:'current'}
  }
};
window.ACTIVA=App;
function toast(message,type='info',duration=3200){const region=$('#toastRegion');if(!region)return;const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;region.appendChild(el);setTimeout(()=>el.remove(),duration)}
function setSaveState(status,label){const el=$('#saveState');if(!el)return;el.className=`save-state ${status||''}`;el.innerHTML=`<i></i> ${esc(label||'Uloženo')}`}
function openModal(id){const el=$(`#${id}`);if(!el)return;el.classList.add('open');el.setAttribute('aria-hidden','false')}
function closeModal(id){const el=$(`#${id}`);if(!el)return;el.classList.remove('open');el.setAttribute('aria-hidden','true')}
function setStep(step){if(!['source','activities','generate','editor'].includes(step))return;App.activeStep=step;$$('.screen').forEach((el)=>el.classList.toggle('active',el.dataset.screen===step));$$('.flow-step').forEach((el)=>{const order=['source','activities','generate','editor'];const current=order.indexOf(step),own=order.indexOf(el.dataset.step);el.classList.toggle('active',el.dataset.step===step);el.classList.toggle('done',own<current)});if(step==='activities'&&typeof updateRecommendations==='function')updateRecommendations();if(step==='generate'&&typeof renderGenerationSummary==='function')renderGenerationSummary();if(step==='editor'&&typeof renderEditor==='function')renderEditor();window.scrollTo({top:0,behavior:'smooth'})}
function appRole(){return window.__GHRAB_STUDIO_ACCESS__?.permit?.role||'teacher'}
function diagnosticSnapshot(){return{
  schema:'activa-diagnostic-v1',appId:APP_ID,version:ACTIVA_VERSION,createdAt:nowIso(),role:appRole(),url:location.href,
  userAgent:navigator.userAgent,online:navigator.onLine,activeStep:App.activeStep,lastOperation:App.lastOperation,
  lastError:App.lastError?{name:App.lastError.name||'Error',message:String(App.lastError.message||App.lastError),stack:appRole()==='admin'?String(App.lastError.stack||''):undefined}:null,
  project:{id:App.project.id,activityCount:App.project.activities.length,selectedTypes:[...App.project.selectedTypes],variant:App.project.variant,activeLevel:App.project.activeLevel,subjectPack:App.project.subjectPack,differentiationEnabled:!!App.project.differentiation?.enabled},
  privacyFindingCount:App.privacyFindings.length,api:{model:App.api.model,keyPresent:!!App.api.key,storage:App.api.storage}
}}
function refreshDiagnostics(){const out=$('#diagnosticsOutput');if(out)out.textContent=JSON.stringify(diagnosticSnapshot(),null,2)}
function captureError(error,context='runtime'){App.lastOperation=context;App.lastError=error instanceof Error?error:new Error(String(error));console.error(`[ACTIVA/${context}]`,error);refreshDiagnostics()}
window.addEventListener('error',(event)=>captureError(event.error||new Error(event.message),'window-error'));
window.addEventListener('unhandledrejection',(event)=>captureError(event.reason||new Error('Unhandled rejection'),'unhandled-rejection'));
function setBusy(button,busy,label){if(!button)return;if(busy){button.dataset.original=button.innerHTML;button.disabled=true;button.innerHTML=`<span class="loading-orb"></span>${esc(label||'Pracuji…')}`}else{button.disabled=false;if(button.dataset.original)button.innerHTML=button.dataset.original}}
function formatTypeLabel(type){return window.ACTIVITY_REGISTRY?.[type]?.name||type}
