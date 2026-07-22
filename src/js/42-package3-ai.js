const package3OriginalAiSchemaGuide=aiSchemaGuide;
aiSchemaGuide=function(types){
  const base=package3OriginalAiSchemaGuide(types.filter(type=>!PACKAGE3_ACTIVITY_REGISTRY[type]));
  const guides={
    stations:'{"stations":[{"title":"Stanoviště 1","instruction":"organizace","task":"úkol","answer":"řešení","minutes":6}],"answerSheetTitle":"Odpovědní arch"}',
    jigsaw:'{"groups":[{"label":"A","source":"dílčí zdroj","questions":[{"question":"otázka","answer":"odpověď"}]}],"finalTask":"společná syntéza"}',
    expertgroups:'{"groups":[{"role":"Expert 1","focus":"hledisko","material":"podklad","deliverable":"výstup"}],"synthesis":"společný úkol"}',
    escaperoom:'{"intro":"příběhový rámec","locks":[{"title":"Zámek 1","task":"úkol","answer":"odpověď","code":"4","clue":"nápověda"}],"finalCode":"472"}',
    boardgame:'{"rules":"pravidla","cells":[{"number":1,"type":"OTÁZKA|VÝZVA|BONUS|VOLNO","prompt":"zadání","answer":"řešení"}]}',
    rolecards:'{"scenario":"situace","roles":[{"role":"role","goal":"cíl","information":"neveřejná informace","prompt":"úkol"}]}',
    casestudy:'{"caseText":"popis případu","questions":[{"question":"otázka","answer":"modelová odpověď"}],"decision":"rozhodovací úkol"}',
    debatecards:'{"motion":"teze","proArguments":["argument"],"conArguments":["argument"],"roles":[{"role":"role","task":"úkol"}],"reflection":"reflexní otázka"}',
    imageannotation:'{"imageDataUrl":"","imageName":"","markers":[{"x":30,"y":40,"label":"1","prompt":"co určit","answer":"správný popisek"}]}',
    diagramlabels:'{"imageDataUrl":"","imageName":"","markers":[{"x":30,"y":40,"label":"1","prompt":"co doplnit","answer":"název","function":"funkce"}]}',
    blankmap:'{"imageDataUrl":"","imageName":"","markers":[{"x":30,"y":40,"label":"1","prompt":"co určit","answer":"místo"}],"legend":[{"symbol":"A","meaning":"význam"}]}',
    datagraph:'{"title":"název","xLabel":"osa X","yLabel":"osa Y","chartType":"bar|line","rows":[{"label":"A","value":12}],"questions":[{"question":"otázka","answer":"odpověď"}]}',
    timelinecards:'{"events":[{"date":"datum nebo pořadí","event":"událost","description":"popis"}]}'
  };
  const extra=types.filter(type=>guides[type]).map(type=>`- ${type}: ${guides[type]}`).join('\n');
  return[base,extra].filter(Boolean).join('\n');
};

const package3OriginalBuildGenerationPrompt=buildGenerationPrompt;
buildGenerationPrompt=function(){
  const base=package3OriginalBuildGenerationPrompt();
  const selected=new Set(App.project.selectedTypes||[]),hasGroup=[...selected].some(type=>ACTIVITY_REGISTRY[type]?.pack==='collaboration'),hasVisual=[...selected].some(type=>ACTIVITY_REGISTRY[type]?.pack==='visual');
  let addon='\n\nPRAVIDLA TŘETÍHO BALÍKU';
  if(hasGroup)addon+='\n9. Skupinové formáty musí obsahovat jasné role, čas, samostatně pochopitelné instrukce, společný výstup a řešení pro učitele. Úniková hra musí mít ověřitelný kód a každý zámek musí být řešitelný nezávisle. Desková hra musí obsahovat nejméně 12 polí.';
  if(hasVisual)addon+='\n10. U obrazových a mapových aktivit negeneruj obrázek ani internetový odkaz. Vrať prázdné imageDataUrl a smysluplné značky s procentuálními souřadnicemi; učitel nahraje vlastní podklad v editoru. U grafu ověř číselná data a odpovědi.';
  addon+='\n11. Kartičky a stanoviště navrhuj tak, aby je bylo možné vytisknout, rozstříhat a použít bez dalšího vysvětlování.';
  return base+addon;
};


// Obrazové aktivity vzniknou s popisky a body, vlastní obrazový podklad ale učitel
// doplní až v editoru. Chybějící obrázek proto nesmí zablokovat převzetí jinak
// platného AI návrhu.
const package3OriginalValidateAiProject=validateAiProject;
validateAiProject=function(data){
  if(!data||typeof data!=='object'||!Array.isArray(data.activities))throw new Error('AI nevrátila seznam aktivit.');
  const expected=App.project.selectedTypes,byType=new Map();
  for(const raw of data.activities)if(raw&&expected.includes(raw.type)&&!byType.has(raw.type))byType.set(raw.type,raw);
  const activities=expected.map((type,index)=>normalizeActivity(byType.get(type)||{},type,index));
  const invalid=activities.map(activity=>{
    const result=validateActivity(activity);
    const blocking=(result.issues||[]).filter(issue=>!(p3IsVisualType(activity.type)&&/Nahrajte (obrázek|mapový podklad|diagram)/i.test(issue)));
    return{activity,blocking};
  }).filter(item=>item.blocking.length);
  if(invalid.length){
    const details=invalid.map(item=>`${formatTypeLabel(item.activity.type)}: ${item.blocking.join(', ')}`).join('; ');
    throw new Error(`Některé aktivity nemají dostatek platných dat. ${details}`);
  }
  const hasPendingVisual=activities.some(activity=>p3IsVisualType(activity.type)&&!activity.data.imageDataUrl);
  return{
    title:cleanAnswer(data.title)||App.project.topic||'Pracovní list',
    teacherNote:[cleanAnswer(data.teacherNote),hasPendingVisual?'U obrazových aktivit nahrajte v editoru vlastní obrázek, diagram nebo mapový podklad.':''].filter(Boolean).join(' '),
    activities
  };
};
