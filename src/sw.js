const CACHE_PREFIX='activa-v';
const CACHE='activa-v0.5.0';
const PRECACHE=['./','./index.html','./manifest.webmanifest','./assets/school-logo.png','./assets/activity-builder-icon.svg','./icons/icon-192.png','./icons/icon-512.png','./manual/','./tests/','./school-library/library.json'];
self.addEventListener('install',(event)=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const asset of PRECACHE){const response=await fetch(asset,{cache:'reload'});if(!response.ok)throw new Error(`ACTIVA precache selhal: ${asset} (${response.status})`);await cache.put(asset,response)}await self.skipWaiting()})()));
self.addEventListener('activate',(event)=>event.waitUntil(caches.keys().then((keys)=>Promise.all(keys.filter((key)=>key.startsWith(CACHE_PREFIX)&&key!==CACHE).map((key)=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',(event)=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.pathname.startsWith('/AI-Studio-GHRAB/')||url.hostname==='generativelanguage.googleapis.com')return;
  if(event.request.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(event.request);const cache=await caches.open(CACHE);await cache.put(event.request,response.clone());return response}catch(_){return(await caches.match(event.request))||(await caches.match('./index.html'))}})());return}
  event.respondWith(caches.match(event.request).then((cached)=>cached||fetch(event.request).then(async(response)=>{if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}return response})));
});
