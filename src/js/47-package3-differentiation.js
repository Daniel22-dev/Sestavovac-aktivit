const package3OriginalDifferentiateActivity=differentiateActivity;
const package3OriginalActivityItemCount=activityItemCount;
const package3OriginalChallengePrompt=challengePrompt;
challengePrompt=function(type){const prompts={stations:'Porovnejte řešení dvou stanovišť a formulujte společný princip.',jigsaw:'Určete, která dílčí informace nejvíce změnila výslednou interpretaci.',expertgroups:'Navrhněte řešení, které propojí alespoň tři expertní pohledy.',escaperoom:'Vytvořte jeden nový zámek se stejně jednoznačným kódem.',boardgame:'Upravte jedno pole tak, aby ověřovalo aplikaci poznatku v nové situaci.',rolecards:'Po aktivitě zhodnoťte, jak neveřejné informace ovlivnily rozhodování.',casestudy:'Uveďte alternativní řešení a porovnejte jeho rizika s původním návrhem.',debatecards:'Formulujte nejsilnější možný protiargument vůči vlastní straně.',imageannotation:'Vyberte dvě označené části a vysvětlete jejich vzájemný vztah.',diagramlabels:'Doplňte k jedné části důsledek její poruchy nebo změny.',blankmap:'Odvoďte jednu prostorovou souvislost, která není přímo vyznačena.',datagraph:'Formulujte závěr, uveďte konkrétní data a upozorněte na omezení interpretace.',timelinecards:'Doplňte jednu chybějící událost a zdůvodněte její umístění.'};return prompts[type]||package3OriginalChallengePrompt(type)};
activityItemCount=function(activity){if(PACKAGE3_ACTIVITY_REGISTRY[activity?.type])return package3Count(activity.type,activity.data||{});return package3OriginalActivityItemCount(activity)};
differentiateActivity=function(activity,level='standard'){
  const out=package3OriginalDifferentiateActivity(activity,level);if(!PACKAGE3_ACTIVITY_REGISTRY[activity?.type])return out;const d=out.data||{};
  if(level==='support'){
    if(Array.isArray(d.stations))d.stations=d.stations.slice(0,Math.max(3,Math.ceil(d.stations.length*.75))).map(x=>({...x,instruction:x.instruction||'Rozdělte si úkol na menší kroky.'}));
    if(Array.isArray(d.groups))d.groups=d.groups.slice(0,Math.max(2,Math.ceil(d.groups.length*.75))).map(x=>({...x,questions:Array.isArray(x.questions)?x.questions.slice(0,2):x.questions}));
    if(Array.isArray(d.locks))d.locks=d.locks.slice(0,Math.max(3,Math.ceil(d.locks.length*.75))).map(x=>({...x,showClue:true}));
    if(Array.isArray(d.roles))d.roles=d.roles.slice(0,Math.max(3,Math.ceil(d.roles.length*.75)));
    if(Array.isArray(d.questions))d.questions=d.questions.slice(0,Math.max(1,Math.ceil(d.questions.length*.7)));
    if(Array.isArray(d.markers))d.markers=d.markers.slice(0,Math.max(2,Math.ceil(d.markers.length*.7)));
    if(Array.isArray(d.events))d.events=d.events.slice(0,Math.max(3,Math.ceil(d.events.length*.7)));
    if(activity.type==='debatecards'){d.proArguments=(d.proArguments||[]).slice(0,2);d.conArguments=(d.conArguments||[]).slice(0,2)}
    d.supportChecklist=['Rozdělte si role.','Začněte údaji přímo ze zadání.','Před odevzdáním porovnejte odpovědi.'];
  }
  if(level==='challenge'){
    if(activity.type==='escaperoom')d.hideClues=true;
    if(activity.type==='casestudy'||activity.type==='debatecards')d.requireEvidence=true;
    if(['imageannotation','diagramlabels','blankmap'].includes(activity.type))d.requireRelationship=true;
    if(activity.type==='datagraph')d.requireLimit=true;
  }
  return out;
};
