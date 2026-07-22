const DIFFERENTIATION_LEVELS={
  support:{name:'S podporou',short:'Podpora',badge:'S',description:'Méně položek, nabídky, nápovědy a větší prostor.'},
  standard:{name:'Standardní',short:'Standard',badge:'M',description:'Plný rozsah bez dodatečného vedení.'},
  challenge:{name:'Rozšiřující',short:'Výzva',badge:'V',description:'Plný rozsah, méně nápověd a přidaný úkol vyššího řádu.'}
};
window.DIFFERENTIATION_LEVELS=DIFFERENTIATION_LEVELS;
function trimForSupport(items,min=2,ratio=.7){if(!Array.isArray(items))return items;return items.slice(0,Math.max(min,Math.ceil(items.length*ratio)))}
function differentiateActivity(activity,level='standard'){
  const out=clone(activity);out._level=level;out._levelMeta=DIFFERENTIATION_LEVELS[level]||DIFFERENTIATION_LEVELS.standard;if(level==='standard')return out;const d=out.data||{};
  if(level==='support'){
    for(const key of ['pairs','items','entries','words','steps','nodes','questions'])if(Array.isArray(d[key]))d[key]=trimForSupport(d[key],key==='questions'?1:2);
    if(out.type==='gapfill')d.wordBank=true;
    if(out.type==='multiplechoice')d.items=(d.items||[]).map((item)=>{const correct=(item.options||[])[item.answerIndex],distractors=(item.options||[]).filter((_,i)=>i!==item.answerIndex).slice(0,2),options=[correct,...distractors].filter(Boolean);return{...item,options,answerIndex:0}});
    if(out.type==='shortanswer')d.showKeywords=true;
    if(out.type==='ordering'||out.type==='algorithm')d.firstStepHint=true;
    if(out.type==='sentenceorder')d.items=(d.items||[]).map((item)=>({...item,chunks:item.chunks?.length>5?item.chunks.slice(0,5):item.chunks}));
    if(out.type==='sourceanalysis')d.highlightEvidence=true;
    out.instruction=`${out.instruction} Využijte nabídnutou podporu.`;
    out.layout='spacious';
  }
  if(level==='challenge'){
    if(out.type==='gapfill')d.wordBank=false;
    if(out.type==='multiplechoice')d.hideExplanatoryHints=true;
    if(out.type==='shortanswer')d.requireEvidence=true;
    if(out.type==='truefalse')d.requireCorrectionAll=true;
    if(out.type==='matching'||out.type==='sorting'||out.type==='causeeffect')d.requireJustification=true;
    if(out.type==='calculationchain'||out.type==='unitconversion')d.requireCheck=true;
    out.extensionPrompt=challengePrompt(out.type);
    out.instruction=`${out.instruction} U posledního bodu připojte zdůvodnění nebo přenos poznatku do nové situace.`;
  }
  out.points=Math.max(1,Math.round(Number(activity.points||5)*(level==='support'?.8:1.25)));
  return out
}
function challengePrompt(type){const map={matching:'Vyberte jednu dvojici a vysvětlete vztah mezi oběma položkami.',sorting:'Navrhněte další položku a zdůvodněte její zařazení.',ordering:'Vysvětlete, proč nelze zaměnit dva sousední kroky.',gapfill:'Použijte dva doplněné výrazy v novém odborně správném tvrzení.',truefalse:'Přeformulujte jedno tvrzení tak, aby bylo přesnější.',multiplechoice:'Vysvětlete, proč jsou dvě rušivé možnosti nesprávné.',shortanswer:'Doložte odpověď konkrétním důkazem nebo příkladem.',crossword:'Vytvořte vlastní jednoznačnou nápovědu k jednomu heslu.',wordsearch:'Uspořádejte nalezené pojmy do smysluplných skupin.',secretcode:'Vytvořte doplňující otázku se stejným klíčovým pojmem.',sentenceorder:'Vytvořte významově podobnou větu s jinou strukturou.',wordformation:'Použijte základové slovo v dalším slovním druhu.',errorcorrection:'Formulujte pravidlo a vytvořte vlastní chybný příklad.',infogap:'Shrňte získané informace bez použití původních formulací.',calculationchain:'Ověřte výsledek opačnou operací nebo jiným postupem.',unitconversion:'Vysvětlete převod pomocí vztahu mezi jednotkami.',conceptmap:'Doplňte nový uzel a dva vztahy k existujícím pojmům.',labprotocol:'Navrhněte jednu proměnnou, kterou by bylo možné kontrolovat.',sourceanalysis:'Zvažte jinou možnou interpretaci a porovnejte ji se svou.',causeeffect:'Doplňte nepřímý důsledek druhého řádu.',factopinion:'Převeďte názor na ověřitelné tvrzení nebo naopak.',climatedata:'Formulujte závěr a uveďte, která data jej podporují.',coordinates:'Odvoďte relativní polohu dvou míst bez použití mapy.',algorithm:'Navrhněte testovací vstup, který ověří správnost algoritmu.',debugcode:'Uveďte test, kterým prokážete, že oprava funguje.',safetycase:'Navrhněte preventivní pravidlo použitelné i v jiné situaci.'};return map[type]||'Vysvětlete, jak lze poznatek použít v nové situaci.'}
function activityItemCount(activity){const d=activity?.data||{};for(const key of ['pairs','items','entries','words','steps','nodes','questions'])if(Array.isArray(d[key]))return d[key].length;if(activity?.type==='gapfill')return(d.text?.match(/\{\{/g)||[]).length;if(activity?.type==='labprotocol')return(d.procedure||[]).length;return 1}
function difficultyMetrics(activity,level){const transformed=differentiateActivity(activity,level);return{level,itemCount:activityItemCount(transformed),points:Number(transformed.points||0),wordBank:transformed.data?.wordBank!==false,hintCount:(level==='support'?2:level==='challenge'?0:1),extension:!!transformed.extensionPrompt}}
function auditDifferentiation(project=App.project){const rows=(project.activities||[]).map((activity)=>{const support=difficultyMetrics(activity,'support'),standard=difficultyMetrics(activity,'standard'),challenge=difficultyMetrics(activity,'challenge');const corePreserved=activity.type===differentiateActivity(activity,'support').type&&activity.title===differentiateActivity(activity,'challenge').title;const ordered=support.itemCount<=standard.itemCount&&standard.itemCount<=challenge.itemCount;return{id:activity.id,title:activity.title,type:activity.type,corePreserved,ordered,support,standard,challenge,ok:corePreserved&&ordered}});return{ok:rows.every((row)=>row.ok),rows,checkedAt:nowIso()}}
function levelLabel(level){return DIFFERENTIATION_LEVELS[level]?.name||DIFFERENTIATION_LEVELS.standard.name}
