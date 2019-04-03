self.addEventListener("fetch", event => {
    var requestURL = new URL(event.request.url);
    var freshResource = fetch(event.request).then(function (response) {
        return response;
    });
    if (url.pathname.startsWith("/test1.html")) {
      event.respondWith(freshResource);
    }
});
