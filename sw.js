const CACHE_NAME = 'cache-3';
self.addEventListener('install', function (e) {
 console.log(e);
 const cache = caches.open(CACHE_NAME).then(cache => {
  return cache.addAll([
   'js/app.js',
   'index.html',
   'icons/icon.png',
   'css/style.css'
  ])
 })

 e.waitUntil(cache);
})

self.addEventListener('fetch', e => {
 const respuestaCache = caches.match(e.request).then(res => {
  if (res) {
   return res;
  } else { // Si no está en el cache, busca en la web
   return fetch(e.request).then(respuesta => {
    // Ya que lo tengo de la web, lo guardo en el cache

    caches.open(CACHE_NAME).then(cache => {
     cache.put(e.request, respuesta)
    })

    return respuesta.clone()
   })
  }
 })

 e.respondWith(respuestaCache)
})