const V='passport-v37';
const SHELL=['./','index.html','countries.json','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','lib/leaflet/leaflet.js','lib/leaflet/leaflet.css','fonts/barlow-condensed-latin-500-normal.woff2','fonts/barlow-condensed-latin-600-normal.woff2','fonts/barlow-condensed-latin-700-normal.woff2','fonts/cormorant-garamond-latin-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.hostname.includes('bigdatacloud')||u.hostname.includes('nominatim')||u.hostname.includes('basemaps.cartocdn.com')||u.hostname.includes('tile.openstreetmap'))return;
 const put=res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
 // 頁面本身：先抓網路上的新版，沒網路才用快取（這樣更新後重開 App 就是新版）
 if(r.mode==='navigate'||u.pathname.endsWith('.html')){e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(c=>c||caches.match('index.html'))));return}
 e.respondWith(caches.match(r).then(c=>c||fetch(r).then(put)))});
