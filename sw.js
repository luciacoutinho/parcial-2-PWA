const CACHE_NAME = 'mi-cache-1';

self.addEventListener('install', evento => {
 console.log(evento)
 // En el vento de instalación del SW Guardo el chaché
 const respCache = caches.open(CACHE_NAME).then(cache => {
  //console.log(cache)
  return cache.addAll([
   '/',
   '/index.html',
   '/assets/css/style.css',
   '/img/favicon.png',
   '/assets/img/imagen.png',
   '/js/app.js',
   'https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap',
   'https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pbYF_Oqeef2kg.woff2',
   'https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pbYF_Oreec.woff2'
  ])
 })

 evento.waitUntil(respCache);
})
// Primero la red (Actualizo el caché) y si falla la conexion busco en el caché
self.addEventListener('fetch', evento => {
 const respuesta = fetch(evento.request).then(respNet => { // Si hay conexión
  // Actualizo el caché con lo nuevo que hay en la web
  return caches.open(CACHE_NAME).then(cache => {
   cache.put(evento.request, respNet.clone());
   return respNet;
  })
 }).catch(error => { // Si falla la conexión, buscar en el cache
  console.log(error);
  return caches.match(evento.request);
 })
 evento.respondWith(respuesta);
})