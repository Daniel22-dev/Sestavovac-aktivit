'use strict';
const productionOriginalDiagnosticSnapshot=diagnosticSnapshot;
diagnosticSnapshot=function(){const snapshot=productionOriginalDiagnosticSnapshot();return{...snapshot,production:{designSystem:'ACTIVA Editorial 1.0',manualVersion:ACTIVA_VERSION,qaStandard:'GHRAB-QA-1.0.2',serverMode:'disabled-ready',persistenceAdapter:window.ACTIVA_PERSISTENCE?.schema||'missing',testsUrl:new URL('./tests/',location.href).href}}};
