const PACKAGE3_ACTIVITY_REGISTRY={
  stations:{name:'Učební stanoviště',icon:'▦',description:'Sada samostatných stanovišť s úkoly, časem a odpovědním archem.',tag:'SKUPINY · STANOVIŠTĚ',pack:'collaboration',help:'Každý řádek: název | instrukce | úkol | správná odpověď | minuty',defaultInstruction:'Postupně projděte stanoviště a zapisujte odpovědi do odpovědního archu.'},
  jigsaw:{name:'Skládankové učení',icon:'✣',description:'Rozdělené zdroje pro domovské a expertní skupiny se společnou syntézou.',tag:'SKUPINY · JIGSAW',pack:'collaboration',help:'Řádek skupiny: SKUPINA | označení | zdroj | otázka :: odpověď ;; další otázka :: odpověď. Poslední řádek: SPOLEČNÝ ÚKOL | zadání',defaultInstruction:'Nejprve zpracujte přidělenou část, poté ji představte domovské skupině a společně vyřešte závěrečný úkol.'},
  expertgroups:{name:'Expertní skupiny',icon:'◆',description:'Role, oborové zaměření, pracovní podklady a očekávaný výstup.',tag:'SKUPINY · EXPERTI',pack:'collaboration',help:'Každý řádek: role | zaměření | podklad | výstup. Poslední řádek může být SYNTÉZA | společný úkol',defaultInstruction:'V expertní skupině připravte výstup a následně jej propojte s poznatky ostatních skupin.'},
  escaperoom:{name:'Papírová úniková hra',icon:'⌑',description:'Navazující zámky, nápovědy a finální kód bez telefonu.',tag:'SKUPINY · ÚNIKOVKA',pack:'collaboration',help:'První řádek: ÚVOD | příběh. Další: ZÁMEK | název | úkol | odpověď | kód | nápověda. Poslední: FINÁLNÍ KÓD | kód',defaultInstruction:'Vyřešte jednotlivé zámky. Každé správné řešení poskytne část finálního kódu.'},
  boardgame:{name:'Tisknutelná desková hra',icon:'▤',description:'Hrací plán s otázkami, výzvami, bonusy a řešením pro učitele.',tag:'SKUPINY · HRA',pack:'collaboration',help:'První řádek: PRAVIDLA | text. Další: číslo | typ OTÁZKA/VÝZVA/BONUS | zadání | odpověď',defaultInstruction:'Postupujte po herním plánu podle pravidel a plňte úkoly na jednotlivých polích.'},
  rolecards:{name:'Rolové kartičky',icon:'♙',description:'Rozdílné role, cíle a neveřejné informace pro modelovou situaci.',tag:'SKUPINY · ROLE',pack:'collaboration',help:'První řádek: SITUACE | text. Další: role | cíl | neveřejná informace | úkol',defaultInstruction:'Přečtěte si pouze svou roli a jednejte podle uvedeného cíle a informací.'},
  casestudy:{name:'Případová studie',icon:'§',description:'Komplexní situace, rozhodnutí, důkazy a závěrečná reflexe.',tag:'SKUPINY · PŘÍPAD',pack:'collaboration',help:'První řádek: PŘÍPAD | text. Další: otázka | modelová odpověď. Poslední: ROZHODNUTÍ | zadání',defaultInstruction:'Analyzujte případ, pracujte s důkazy a formulujte doporučené řešení.'},
  debatecards:{name:'Debatní sada',icon:'⇌',description:'Teze, argumentační strany, role a reflexní otázky.',tag:'SKUPINY · DEBATA',pack:'collaboration',help:'První řádek: TEZE | text. Řádky: PRO/PROTI | argument. ROLE | role | úkol. REFLEXE | otázka',defaultInstruction:'Připravte argumenty pro přidělenou stranu, reagujte na protiargumenty a dodržujte svou roli.'},
  imageannotation:{name:'Popis obrázku',icon:'◫',description:'Vlastní fotografie nebo ilustrace s očíslovanými aktivními body.',tag:'VIZUÁLNÍ · OBRÁZEK',pack:'visual',help:'Každý řádek: číslo | popisek otázky | správná odpověď | x % | y %. Obrázek nahrajte v mediálním panelu.',defaultInstruction:'Pojmenujte nebo vysvětlete očíslované části obrázku.'},
  diagramlabels:{name:'Doplňování diagramu',icon:'⌬',description:'Schéma s popisky, funkcemi a přehledným řešením.',tag:'VIZUÁLNÍ · DIAGRAM',pack:'visual',help:'Každý řádek: číslo | požadovaný popisek | správná odpověď | funkce / vysvětlení | x % | y %. Obrázek nahrajte v mediálním panelu.',defaultInstruction:'Doplňte názvy označených částí a podle zadání vysvětlete jejich funkci.'},
  blankmap:{name:'Slepá mapa',icon:'⌖',description:'Vlastní mapa s body, oblastmi, legendou a řešením.',tag:'VIZUÁLNÍ · MAPA',pack:'visual',help:'BOD | číslo | zadání | odpověď | x % | y %. LEGENDA | symbol | význam. Mapu nahrajte v mediálním panelu.',defaultInstruction:'Doplňte názvy označených míst nebo oblastí a pracujte s legendou.'},
  datagraph:{name:'Graf z dat',icon:'▥',description:'Automatický sloupcový nebo spojnicový graf s otázkami k interpretaci.',tag:'VIZUÁLNÍ · DATA',pack:'visual',help:'NASTAVENÍ | název | osa X | osa Y | BAR/LINE. DATA | popisek | hodnota. OTÁZKA | otázka | odpověď',defaultInstruction:'Prostudujte graf a odpovězte na otázky s využitím konkrétních hodnot.'},
  timelinecards:{name:'Časová osa a kartičky',icon:'↦',description:'Události k řazení, vystřižení a sestavení časové osy.',tag:'VIZUÁLNÍ · ČAS',pack:'visual',help:'Každý řádek: datum / pořadí | událost | stručný popis',defaultInstruction:'Seřaďte kartičky chronologicky a sestavte z nich časovou osu.'}
};

SUBJECT_PACKS.collaboration={name:'Skupinová práce',icon:'◈',description:'Stanoviště, expertní skupiny, role, debaty a papírové hry.',types:['stations','jigsaw','expertgroups','escaperoom','boardgame','rolecards','casestudy','debatecards']};
SUBJECT_PACKS.visual={name:'Obraz, mapy a data',icon:'▧',description:'Popis obrázků, diagramy, slepé mapy, grafy a časové osy.',types:['imageannotation','diagramlabels','blankmap','datagraph','timelinecards','climatedata','coordinates']};
for(const [type,meta] of Object.entries(PACKAGE3_ACTIVITY_REGISTRY)){ACTIVITY_REGISTRY[type]=meta;if(!TYPE_ORDER.includes(type))TYPE_ORDER.push(type)}
window.PACKAGE3_ACTIVITY_REGISTRY=PACKAGE3_ACTIVITY_REGISTRY;

const package3OriginalPointsFor=pointsFor;
const package3OriginalEmptyData=emptyData;
const package3OriginalNormalizeData=normalizeData;
const package3OriginalValidateActivity=validateActivity;
const package3OriginalRecommendTypes=recommendTypes;
const package3OriginalLocalActivity=localActivity;
const package3OriginalVariantActivity=variantActivity;

function p3Text(value,max=5000){return String(value||'').trim().slice(0,max)}
function p3List(items,mapper,max=24){return (Array.isArray(items)?items:[]).map(mapper).filter(Boolean).slice(0,max)}
function p3Percent(value,fallback=50){const n=Number(value);return Number.isFinite(n)?clamp(n,0,100):fallback}
function p3Image(value){const text=String(value||'');return /^data:image\/(?:png|jpeg|webp);base64,/i.test(text)&&text.length<=1800000?text:''}
function package3Count(type,data){
  if(type==='stations')return data.stations?.length||0;
  if(type==='jigsaw'||type==='expertgroups')return data.groups?.length||0;
  if(type==='escaperoom')return data.locks?.length||0;
  if(type==='boardgame')return data.cells?.length||0;
  if(type==='rolecards')return data.roles?.length||0;
  if(type==='casestudy')return data.questions?.length||0;
  if(type==='debatecards')return (data.proArguments?.length||0)+(data.conArguments?.length||0)+(data.roles?.length||0);
  if(type==='imageannotation'||type==='diagramlabels'||type==='blankmap')return data.markers?.length||0;
  if(type==='datagraph')return data.rows?.length||0;
  if(type==='timelinecards')return data.events?.length||0;
  return 0;
}
pointsFor=function(type,data){return PACKAGE3_ACTIVITY_REGISTRY[type]?clamp(package3Count(type,data)||5,1,40):package3OriginalPointsFor(type,data)};

emptyData=function(type,index=0){
  if(type==='stations')return{stations:[{title:'Stanoviště 1',instruction:'Pracujte společně.',task:'Vyřešte první úkol.',answer:'Modelová odpověď.',minutes:6},{title:'Stanoviště 2',instruction:'Rozdělte si role.',task:'Vyřešte druhý úkol.',answer:'Modelová odpověď.',minutes:6},{title:'Stanoviště 3',instruction:'Porovnejte výsledky.',task:'Vyřešte třetí úkol.',answer:'Modelová odpověď.',minutes:6}],answerSheetTitle:'Odpovědní arch'};
  if(type==='jigsaw')return{groups:[{label:'A',source:'Podklad pro skupinu A.',questions:[{question:'Jaká je hlavní myšlenka?',answer:'Modelová odpověď.'}]},{label:'B',source:'Podklad pro skupinu B.',questions:[{question:'Jaká je hlavní myšlenka?',answer:'Modelová odpověď.'}]}],finalTask:'Propojte poznatky všech skupin do společného závěru.'};
  if(type==='expertgroups')return{groups:[{role:'Expert 1',focus:'První hledisko',material:'Pracovní podklad.',deliverable:'Připravte tři klíčové body.'},{role:'Expert 2',focus:'Druhé hledisko',material:'Pracovní podklad.',deliverable:'Připravte vysvětlení pro spolužáky.'}],synthesis:'Sestavte společné řešení, které využije výstupy všech expertů.'};
  if(type==='escaperoom')return{intro:'Třída musí vyřešit sérii úloh a získat finální kód.',locks:[{title:'Zámek 1',task:'Vyřešte první úkol.',answer:'ODPOVĚĎ',code:'4',clue:'Zaměřte se na klíčový pojem.'},{title:'Zámek 2',task:'Vyřešte druhý úkol.',answer:'ODPOVĚĎ',code:'7',clue:'Porovnejte informace.'},{title:'Zámek 3',task:'Vyřešte třetí úkol.',answer:'ODPOVĚĎ',code:'2',clue:'Zkontrolujte pořadí.'}],finalCode:'472'};
  if(type==='boardgame')return{rules:'Hráči házejí kostkou. Po vstupu na pole vyřeší úkol. Za správnou odpověď zůstávají na poli.',cells:Array.from({length:20},(_,i)=>({number:i+1,type:i%6===0?'BONUS':i%4===0?'VÝZVA':'OTÁZKA',prompt:`Úkol na poli ${i+1}.`,answer:'Modelová odpověď.'}))};
  if(type==='rolecards')return{scenario:'Modelová situace, ve které mají účastníci rozdílné cíle.',roles:[{role:'Moderátor',goal:'Udržet věcnou diskusi.',information:'Máte přehled pravidel.',prompt:'Shrnujte průběžné závěry.'},{role:'Zastánce',goal:'Prosadit navržené řešení.',information:'Máte podpůrné údaje.',prompt:'Předložte dva argumenty.'},{role:'Oponent',goal:'Prověřit slabá místa řešení.',information:'Znáte možné riziko.',prompt:'Položte dvě kritické otázky.'}]};
  if(type==='casestudy')return{caseText:'Stručný popis případu a dostupných důkazů.',questions:[{question:'Jaký je hlavní problém?',answer:'Modelová odpověď.'},{question:'Které informace jsou pro rozhodnutí zásadní?',answer:'Modelová odpověď.'}],decision:'Navrhněte řešení a uveďte dva důvody.'};
  if(type==='debatecards')return{motion:'Třída diskutuje zadanou tezi.',proArguments:['Argument pro 1','Argument pro 2'],conArguments:['Argument proti 1','Argument proti 2'],roles:[{role:'Úvodní řečník',task:'Vymezte stanovisko.'},{role:'Reagující řečník',task:'Odpovězte na hlavní protiargument.'}],reflection:'Který argument byl nejsilnější a proč?'};
  if(type==='imageannotation')return{imageDataUrl:'',imageName:'',markers:[{x:28,y:34,label:'1',prompt:'Pojmenujte část 1.',answer:'Správný popisek'},{x:66,y:58,label:'2',prompt:'Pojmenujte část 2.',answer:'Správný popisek'}]};
  if(type==='diagramlabels')return{imageDataUrl:'',imageName:'',markers:[{x:30,y:30,label:'1',prompt:'Doplňte název části.',answer:'Část 1',function:'Vysvětlení funkce.'},{x:70,y:62,label:'2',prompt:'Doplňte název části.',answer:'Část 2',function:'Vysvětlení funkce.'}]};
  if(type==='blankmap')return{imageDataUrl:'',imageName:'',markers:[{x:35,y:40,label:'1',prompt:'Určete místo 1.',answer:'Místo 1'},{x:68,y:58,label:'2',prompt:'Určete místo 2.',answer:'Místo 2'}],legend:[{symbol:'A',meaning:'Ukázkový typ oblasti'}]};
  if(type==='datagraph')return{title:'Ukázková data',xLabel:'Kategorie',yLabel:'Hodnota',chartType:'bar',rows:[{label:'A',value:12},{label:'B',value:19},{label:'C',value:8},{label:'D',value:15}],questions:[{question:'Která hodnota je nejvyšší?',answer:'B'}]};
  if(type==='timelinecards')return{events:[{date:'1',event:'První událost',description:'Stručný popis.'},{date:'2',event:'Druhá událost',description:'Stručný popis.'},{date:'3',event:'Třetí událost',description:'Stručný popis.'},{date:'4',event:'Čtvrtá událost',description:'Stručný popis.'}]};
  return package3OriginalEmptyData(type,index);
};

normalizeData=function(type,data){
  if(type==='stations')return{stations:p3List(data.stations,x=>{const title=p3Text(x.title,100),task=p3Text(x.task,1000);return title&&task?{title,instruction:p3Text(x.instruction,500),task,answer:p3Text(x.answer,1000),minutes:clamp(Number(x.minutes||5),1,45)}:null},12),answerSheetTitle:p3Text(data.answerSheetTitle,100)||'Odpovědní arch'};
  if(type==='jigsaw')return{groups:p3List(data.groups,x=>{const label=p3Text(x.label,20),source=p3Text(x.source,5000);return label&&source?{label,source,questions:p3List(x.questions,q=>{const question=p3Text(q.question,500);return question?{question,answer:p3Text(q.answer,1000)}:null},8)}:null},8),finalTask:p3Text(data.finalTask,1200)};
  if(type==='expertgroups')return{groups:p3List(data.groups,x=>{const role=p3Text(x.role,100),focus=p3Text(x.focus,200);return role&&focus?{role,focus,material:p3Text(x.material,3000),deliverable:p3Text(x.deliverable,800)}:null},10),synthesis:p3Text(data.synthesis,1200)};
  if(type==='escaperoom')return{intro:p3Text(data.intro,1500),locks:p3List(data.locks,x=>{const title=p3Text(x.title,100),task=p3Text(x.task,1200),code=p3Text(x.code,20);return title&&task&&code?{title,task,answer:p3Text(x.answer,500),code,clue:p3Text(x.clue,500)}:null},10),finalCode:p3Text(data.finalCode,60)};
  if(type==='boardgame')return{rules:p3Text(data.rules,1500),cells:p3List(data.cells,x=>{const number=Number(x.number),prompt=p3Text(x.prompt,500);return Number.isFinite(number)&&prompt?{number:clamp(number,1,60),type:['OTÁZKA','VÝZVA','BONUS','VOLNO'].includes(p3Text(x.type,20).toUpperCase())?p3Text(x.type,20).toUpperCase():'OTÁZKA',prompt,answer:p3Text(x.answer,800)}:null},30).sort((a,b)=>a.number-b.number)};
  if(type==='rolecards')return{scenario:p3Text(data.scenario,1500),roles:p3List(data.roles,x=>{const role=p3Text(x.role,120),goal=p3Text(x.goal,500);return role&&goal?{role,goal,information:p3Text(x.information,1200),prompt:p3Text(x.prompt,700)}:null},12)};
  if(type==='casestudy')return{caseText:p3Text(data.caseText,6000),questions:p3List(data.questions,x=>{const question=p3Text(x.question,600);return question?{question,answer:p3Text(x.answer,1200)}:null},12),decision:p3Text(data.decision,1200)};
  if(type==='debatecards')return{motion:p3Text(data.motion,800),proArguments:(data.proArguments||[]).map(x=>p3Text(x,800)).filter(Boolean).slice(0,12),conArguments:(data.conArguments||[]).map(x=>p3Text(x,800)).filter(Boolean).slice(0,12),roles:p3List(data.roles,x=>{const role=p3Text(x.role,100),task=p3Text(x.task,600);return role&&task?{role,task}:null},8),reflection:p3Text(data.reflection,800)};
  if(type==='imageannotation')return{imageDataUrl:p3Image(data.imageDataUrl),imageName:p3Text(data.imageName,160),markers:p3List(data.markers,(x,i)=>({x:p3Percent(x.x,25+i*12),y:p3Percent(x.y,30+i*8),label:p3Text(x.label,10)||String(i+1),prompt:p3Text(x.prompt,400)||`Pojmenujte část ${i+1}.`,answer:p3Text(x.answer,500)}),20)};
  if(type==='diagramlabels')return{imageDataUrl:p3Image(data.imageDataUrl),imageName:p3Text(data.imageName,160),markers:p3List(data.markers,(x,i)=>({x:p3Percent(x.x,25+i*12),y:p3Percent(x.y,30+i*8),label:p3Text(x.label,10)||String(i+1),prompt:p3Text(x.prompt,400)||`Doplňte část ${i+1}.`,answer:p3Text(x.answer,500),function:p3Text(x.function,700)}),20)};
  if(type==='blankmap')return{imageDataUrl:p3Image(data.imageDataUrl),imageName:p3Text(data.imageName,160),markers:p3List(data.markers,(x,i)=>({x:p3Percent(x.x,25+i*12),y:p3Percent(x.y,30+i*8),label:p3Text(x.label,10)||String(i+1),prompt:p3Text(x.prompt,400)||`Určete bod ${i+1}.`,answer:p3Text(x.answer,500)}),24),legend:p3List(data.legend,x=>{const symbol=p3Text(x.symbol,20),meaning=p3Text(x.meaning,300);return symbol&&meaning?{symbol,meaning}:null},12)};
  if(type==='datagraph')return{title:p3Text(data.title,200),xLabel:p3Text(data.xLabel,100),yLabel:p3Text(data.yLabel,100),chartType:String(data.chartType||'bar').toLowerCase()==='line'?'line':'bar',rows:p3List(data.rows,x=>{const label=p3Text(x.label,80),value=Number(x.value);return label&&Number.isFinite(value)?{label,value}:null},18),questions:p3List(data.questions,x=>{const question=p3Text(x.question,500);return question?{question,answer:p3Text(x.answer,800)}:null},10)};
  if(type==='timelinecards')return{events:p3List(data.events,x=>{const date=p3Text(x.date,60),event=p3Text(x.event,250);return date&&event?{date,event,description:p3Text(x.description,800)}:null},16)};
  return package3OriginalNormalizeData(type,data);
};

validateActivity=function(activity){
  if(!PACKAGE3_ACTIVITY_REGISTRY[activity?.type])return package3OriginalValidateActivity(activity);
  const issues=[];const d=activity.data||{},count=package3Count(activity.type,d);
  if(!p3Text(activity.title))issues.push('Chybí název aktivity.');
  if(!p3Text(activity.instruction))issues.push('Chybí instrukce.');
  if(activity.type==='stations'&&count<3)issues.push('Sada potřebuje alespoň tři stanoviště.');
  else if((activity.type==='jigsaw'||activity.type==='expertgroups')&&count<2)issues.push('Skupinová aktivita potřebuje alespoň dvě skupiny.');
  else if(activity.type==='escaperoom'){if(count<3)issues.push('Úniková hra potřebuje alespoň tři zámky.');if(!d.finalCode)issues.push('Chybí finální kód.');}
  else if(activity.type==='boardgame'&&count<12)issues.push('Desková hra potřebuje alespoň dvanáct polí.');
  else if(activity.type==='rolecards'&&count<3)issues.push('Rolová aktivita potřebuje alespoň tři role.');
  else if(activity.type==='casestudy'){if(!d.caseText)issues.push('Chybí text případu.');if(count<2)issues.push('Případová studie potřebuje alespoň dvě otázky.');}
  else if(activity.type==='debatecards'){if(!d.motion)issues.push('Chybí debatní teze.');if((d.proArguments?.length||0)<2||(d.conArguments?.length||0)<2)issues.push('Debata potřebuje alespoň dva argumenty pro a dva proti.');}
  else if(['imageannotation','diagramlabels','blankmap'].includes(activity.type)){if(!d.imageDataUrl)issues.push('Nahrajte obrázek nebo mapový podklad v mediálním panelu.');if(count<2)issues.push('Vizuální aktivita potřebuje alespoň dva označené body.');}
  else if(activity.type==='datagraph'){if(count<2)issues.push('Graf potřebuje alespoň dvě datové hodnoty.');if(!d.questions?.length)issues.push('Chybí interpretační otázka.');}
  else if(activity.type==='timelinecards'&&count<3)issues.push('Časová osa potřebuje alespoň tři události.');
  return{ok:issues.length===0,issues:[...new Set(issues)]};
};

recommendTypes=function(text,subject){
  const base=package3OriginalRecommendTypes(text,subject);const source=String(text||'');const extras=[];
  if(/skupin|stanovišt|tým|spoluprac|role|diskus|deb/i.test(source))extras.push('stations','rolecards','debatecards');
  if(/map|oblast|stát|město|řeka|pohoří|souřadnic/i.test(source))extras.push('blankmap');
  if(/obráz|schéma|diagram|část|orgán|stavba/i.test(source))extras.push('imageannotation','diagramlabels');
  if(/data|tabulk|graf|hodnot|procent|vývoj/i.test(source))extras.push('datagraph');
  if(/[0-9]{3,4}|chronolog|časov|událost/i.test(source))extras.push('timelinecards');
  return[...new Set([...extras,...base])].slice(0,6);
};

function p3SourceSentences(project){return splitSentences(project.sourceText).flatMap(x=>x.split(/\n+/)).map(x=>p3Text(x,700)).filter(x=>x.length>15)}
function p3LocalActivity(type,project,index){
  const topic=project.topic||'Téma',pairs=sourcePairs(project.sourceText),sentences=p3SourceSentences(project);let data=emptyData(type);
  if(type==='stations')data={stations:(pairs.length?pairs:sentences.map((s,i)=>({left:`Stanoviště ${i+1}`,right:s}))).slice(0,6).map((p,i)=>({title:`Stanoviště ${i+1}: ${p.left}`,instruction:i%2?'Pracujte ve dvojici.':'Rozdělte si role ve skupině.',task:`Vysvětlete nebo zpracujte: ${p.right}`,answer:p.right,minutes:clamp(Math.round(Number(project.duration||30)/4),4,12)})),answerSheetTitle:'Odpovědní arch stanovišť'};
  if(type==='jigsaw')data={groups:(pairs.length?pairs:sentences.map((s,i)=>({left:String.fromCharCode(65+i),right:s}))).slice(0,4).map((p,i)=>({label:String.fromCharCode(65+i),source:p.right,questions:[{question:`Co je nejdůležitější informace ve zdroji ${String.fromCharCode(65+i)}?`,answer:p.right}]})),finalTask:`Vytvořte společné shrnutí tématu ${topic}, které propojí všechny dílčí zdroje.`};
  if(type==='expertgroups')data={groups:(pairs.length?pairs:sentences.map((s,i)=>({left:`Hledisko ${i+1}`,right:s}))).slice(0,5).map((p,i)=>({role:`Expert ${i+1}`,focus:p.left,material:p.right,deliverable:'Připravte dva klíčové body a jeden příklad.'})),synthesis:`Propojte expertní výstupy do společného vysvětlení tématu ${topic}.`};
  if(type==='escaperoom'){const locks=(pairs.length?pairs:sentences.map((s,i)=>({left:`Úkol ${i+1}`,right:s}))).slice(0,5).map((p,i)=>({title:`Zámek ${i+1}`,task:`Určete pojem nebo závěr podle informace: ${p.right}`,answer:p.left,code:String((asciiWord(p.left).length+i)%10),clue:'Pracujte pouze se zdrojovým materiálem.'}));data={intro:`Získejte kód k tématu ${topic}.`,locks,finalCode:locks.map(x=>x.code).join('')}}
  if(type==='boardgame')data={rules:'Hráči postupují figurkou. Po vstupu na pole odpovědí na otázku prokáží, že mohou zůstat.',cells:Array.from({length:20},(_,i)=>{const p=(pairs.length?pairs:[{left:topic,right:'Vysvětlete hlavní myšlenku.'}])[i%Math.max(1,pairs.length||1)];return{number:i+1,type:i%7===0?'BONUS':i%5===0?'VÝZVA':'OTÁZKA',prompt:i%5===0?`Uveďte příklad k tématu ${topic}.`:`Vysvětlete „${p?.left||topic}“`,answer:p?.right||'Odpověď podle zdroje.'}})};
  if(type==='rolecards')data={scenario:`Skupina řeší problém související s tématem ${topic}.`,roles:[{role:'Moderátor',goal:'Zajistit zapojení všech členů.',information:'Máte přehled cíle aktivity.',prompt:'Na konci shrňte dohodu.'},{role:'Odborník na fakta',goal:'Hlídání věcné správnosti.',information:(sentences[0]||'Pracujte se zdrojem.'),prompt:'Uveďte konkrétní důkaz.'},{role:'Kritik',goal:'Prověřit slabá místa návrhu.',information:(sentences[1]||'Hledejte alternativu.'),prompt:'Položte dvě ověřovací otázky.'},{role:'Navrhovatel',goal:'Formulovat výsledné řešení.',information:(sentences[2]||'Propojte poznatky.'),prompt:'Předložte návrh skupiny.'}]};
  if(type==='casestudy')data={caseText:(project.sourceText||`Případ k tématu ${topic}.`).slice(0,4000),questions:[{question:'Jaký je hlavní problém nebo otázka případu?',answer:'Odpověď podle zdroje.'},{question:'Které dva důkazy jsou pro řešení nejdůležitější?',answer:'Konkrétní informace ze zdroje.'},{question:'Jaké jsou možné důsledky navrženého řešení?',answer:'Zdůvodněná odpověď.'}],decision:'Navrhněte nejlepší řešení a uveďte alespoň dva důvody.'};
  if(type==='debatecards')data={motion:`Teze: ${topic} má zásadní význam.`,proArguments:(sentences.length?sentences:[`Téma ${topic} přináší důležité přínosy.`,`Existují konkrétní důkazy ve zdroji.`]).slice(0,4),conArguments:['Zvažte omezení nebo rizika tohoto tvrzení.','Prověřte, zda lze zdroj interpretovat jinak.'],roles:[{role:'Úvodní řečník',task:'Vymezte stanovisko a hlavní argument.'},{role:'Reagující řečník',task:'Odpovězte na protiargument.'},{role:'Závěrečný řečník',task:'Shrňte, proč má vaše strana převážit.'}],reflection:'Který argument byl nejlépe podložen zdrojem?'};
  if(type==='imageannotation'||type==='diagramlabels'||type==='blankmap')data=emptyData(type);
  if(type==='datagraph')data={title:`Data k tématu ${topic}`,xLabel:'Kategorie',yLabel:'Hodnota',chartType:'bar',rows:(pairs.length?pairs.slice(0,8):[{left:'A',right:'12'},{left:'B',right:'18'},{left:'C',right:'9'}]).map((p,i)=>({label:p.left,value:Number(String(p.right).match(/-?\d+(?:[.,]\d+)?/)?.[0]?.replace(',','.')||((i+1)*10))})),questions:[{question:'Která kategorie dosahuje nejvyšší hodnoty?',answer:'Určete podle grafu.'},{question:'Jaký je rozdíl mezi nejvyšší a nejnižší hodnotou?',answer:'Vypočítejte z dat.'}]};
  if(type==='timelinecards')data={events:(pairs.length?pairs:sentences.map((s,i)=>({left:String(i+1),right:s}))).slice(0,10).map((p,i)=>({date:p.left||String(i+1),event:(p.right||'Událost').slice(0,120),description:p.right||''}))};
  return normalizeActivity({title:ACTIVITY_REGISTRY[type].name,instruction:ACTIVITY_REGISTRY[type].defaultInstruction,data},type,index);
}
localActivity=function(type,project,index){return PACKAGE3_ACTIVITY_REGISTRY[type]?p3LocalActivity(type,project,index):package3OriginalLocalActivity(type,project,index)};

variantActivity=function(activity,variant){
  if(!PACKAGE3_ACTIVITY_REGISTRY[activity?.type])return package3OriginalVariantActivity(activity,variant);
  if(variant==='A')return clone(activity);const out=clone(activity),seed=`${activity.id}-${variant}`,d=out.data||{};
  for(const key of ['stations','groups','locks','cells','roles','questions','markers','rows','events'])if(Array.isArray(d[key]))d[key]=shuffle(d[key],`${seed}-${key}`);
  if(activity.type==='debatecards'){d.proArguments=shuffle(d.proArguments||[],`${seed}-pro`);d.conArguments=shuffle(d.conArguments||[],`${seed}-con`)}
  return out;
};
