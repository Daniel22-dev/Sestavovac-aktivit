'use strict';
const productionOriginalDiagnosticSnapshot=diagnosticSnapshot;
function resolveProductionTestsUrl(){
  try{
    const base=(document.baseURI&&document.baseURI!=='about:blank')?document.baseURI:location.href;
    return new URL('./tests/',base).href;
  }catch{
    return './tests/';
  }
}
diagnosticSnapshot=function(){
  const snapshot=productionOriginalDiagnosticSnapshot();
  return{
    ...snapshot,
    production:{
      designSystem:'ACTIVA Editorial 1.0',
      manualVersion:ACTIVA_VERSION,
      qaStandard:'GHRAB-QA-1.0.2',
      serverMode:'disabled-ready',
      persistenceAdapter:window.ACTIVA_PERSISTENCE?.schema||'missing',
      testsUrl:resolveProductionTestsUrl()
    }
  };
};
