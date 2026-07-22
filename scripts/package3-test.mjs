import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT=join(dirname(fileURLToPath(import.meta.url)),'..');
const context={
  console,
  setTimeout,clearTimeout,
  window:{addEventListener(){},scrollTo(){},__GHRAB_STUDIO_ACCESS__:{permit:{role:'admin'}}},
  document:{querySelector(){return null},querySelectorAll(){return[]},createElement(){return{style:{},click(){},remove(){},getContext(){return null}}},body:{appendChild(){}}},
  navigator:{userAgent:'ACTIVA-QA',onLine:true},location:{href:'http://localhost/',protocol:'http:',search:''},CSS:{escape:String},
  Blob:class{},URL:{createObjectURL(){return'blob:test'},revokeObjectURL(){}},Image:class{}
};
context.window.window=context.window;context.window.document=context.document;context.window.navigator=context.navigator;context.globalThis=context;
vm.createContext(context);
const load=['10-core.js','20-activity-registry.js','25-subject-packs.js','27-collaboration-visual-packs.js','30-storage-api.js','40-ai-generation.js','42-package3-ai.js','45-differentiation.js','47-package3-differentiation.js','60-renderers.js','62-package3-renderers.js','70-editor.js','72-package3-editor.js'];
for(const file of load)vm.runInContext(readFileSync(join(ROOT,'src/js',file),'utf8'),context,{filename:file});
const run=(code)=>vm.runInContext(code,context);
const expected=['stations','jigsaw','expertgroups','escaperoom','boardgame','rolecards','casestudy','debatecards','imageannotation','diagramlabels','blankmap','datagraph','timelinecards'];
const failures=[];
for(const type of expected){
  run(`var qaActivity=baseActivity(${JSON.stringify(type)},0);`);
  if(['imageannotation','diagramlabels','blankmap'].includes(type))run(`qaActivity.data.imageDataUrl='data:image/png;base64,QUJDRA==';qaActivity.data.imageName='qa.png';`);
  const valid=run('validateActivity(qaActivity)');if(!valid.ok)failures.push(`${type}: výchozí data nejsou platná: ${valid.issues.join(', ')}`);
  run(`App.project.activities=[qaActivity];App.selectedActivityIndex=0;`);
  const serialized=run('serializeActivityData(qaActivity)');
  run(`var qaParsed=parseActivityData(${JSON.stringify(type)},${JSON.stringify(serialized)});var qaRound=normalizeActivity({...qaActivity,data:qaParsed},${JSON.stringify(type)},0);`);
  const roundValid=run('validateActivity(qaRound)');if(!roundValid.ok)failures.push(`${type}: editorový round-trip selhal: ${roundValid.issues.join(', ')}`);
  for(const level of ['support','standard','challenge']){run(`var qaDiff=differentiateActivity(qaActivity,${JSON.stringify(level)});`);const count=run('activityItemCount(qaDiff)');if(!(count>=1))failures.push(`${type}: úroveň ${level} má neplatný počet položek`)}
  for(const variant of ['A','B','C']){run(`var qaVariant=variantActivity(qaActivity,${JSON.stringify(variant)});`);if(run('qaVariant.type')!==type)failures.push(`${type}: varianta ${variant} změnila typ`)}
  const student=run(`renderActivityContent(qaActivity,'student','A')`),key=run(`renderActivityContent(qaActivity,'key','A')`);if(!student||student.includes('Neznámý typ'))failures.push(`${type}: chybí žákovský renderer`);if(!key||key.includes('Neznámý typ'))failures.push(`${type}: chybí renderer řešení`);
}
const total=run('TYPE_ORDER.length');if(total!==39)failures.push(`Očekáváno 39 typů aktivit, nalezeno ${total}`);
run(`var splitProject=clone(App.project);splitProject.subject='Biologie';splitProject.topic='QA';splitProject.goal='QA';splitProject.variant='A';splitProject.activeLevel='standard';splitProject.differentiation={enabled:true};splitProject.activities=[];`);
for(const [type,count,key] of [['stations',9,'stations'],['jigsaw',3,'groups'],['rolecards',9,'roles'],['timelinecards',12,'events']]){
  run(`var a=baseActivity(${JSON.stringify(type)},0);`);
  run(`while(a.data[${JSON.stringify(key)}].length<${count})a.data[${JSON.stringify(key)}].push(clone(a.data[${JSON.stringify(key)}][0]));splitProject.activities=[a];`);
  const pages=run(`projectPages(splitProject,'A','student',{logo:false,nameLine:false},'standard').length`);
  const expectedPages=type==='stations'?4:type==='jigsaw'?count:type==='rolecards'?3:2;if(pages!==expectedPages)failures.push(`${type}: dělení stran ${pages}, očekáváno ${expectedPages}`);
}

// Stanoviště musí mít samostatný arch se všemi názvy a každá jigsaw/expertní stránka společný úkol.
run(`var stationQa=baseActivity('stations',0);while(stationQa.data.stations.length<9)stationQa.data.stations.push(clone(stationQa.data.stations[0]));var stationExpanded=expandPackage3Activity(stationQa);`);
if(run('stationExpanded.length')!==4||!run('stationExpanded[3].data._answerSheetOnly')||run('stationExpanded[3].data.stations.length')!==9)failures.push('Stanoviště nemají samostatný kompletní odpovědní arch.');
run(`var jigsawQa=baseActivity('jigsaw',0);var jigsawExpanded=expandPackage3Activity(jigsawQa);`);
if(!run('jigsawExpanded.every(x=>Boolean(x.data.finalTask))'))failures.push('Dílčí listy skládankového učení neobsahují společný závěrečný úkol.');
// Chybějící obrázek je při přípravě platný obsahový návrh, ale editor jej dále označí k doplnění.
run(`App.project.selectedTypes=['imageannotation'];App.project.topic='QA obraz';var visualRaw={title:'QA obraz',teacherNote:'',activities:[{type:'imageannotation',title:'Obraz',instruction:'Označte části.',data:{imageDataUrl:'',imageName:'',markers:[{x:25,y:30,label:'1',prompt:'Určete část.',answer:'Část'},{x:70,y:60,label:'2',prompt:'Určete druhou část.',answer:'Druhá část'}]}}]};var visualAccepted=validateAiProject(visualRaw);`);
if(run('visualAccepted.activities.length')!==1||!run(`visualAccepted.teacherNote.includes('nahrajte')`))failures.push('AI převzetí obrazové aktivity čekající na vlastní podklad selhalo.');
const body=readFileSync(join(ROOT,'src/body.html'),'utf8');const ids=[...body.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);const duplicateIds=ids.filter((id,i)=>ids.indexOf(id)!==i);if(duplicateIds.length)failures.push(`Duplicitní HTML ID: ${[...new Set(duplicateIds)].join(', ')}`);
const jsFiles=readdirSync(join(ROOT,'src/js')).filter(x=>x.endsWith('.js'));if(jsFiles.length<17)failures.push(`Očekáváno alespoň 17 JS modulů, nalezeno ${jsFiles.length}`);
if(failures.length){console.error(failures.map(x=>`- ${x}`).join('\n'));process.exit(1)}
console.log(`[package3-test] ${expected.length} nových typů / ${total} celkem; renderery, editor, diferenciace a dělení stran prošly.`);
