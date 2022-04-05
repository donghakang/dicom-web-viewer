// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA
import { Workbox } from "workbox-window";

export function registerServiceWorker() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if ("serviceWorker" in navigator) {
    const swUrl = `service-worker.js`;
    const wb = new Workbox(swUrl);

    console.log("service worker activated")
    wb.addEventListener("installed", (event) => {
      // if app has been updated. Pop up will show up
      if (event.isUpdate) {
        if (confirm("New app update is available, Click OK to refresh")) {
          // reload and update cache
          window.location.reload();
        }
      }
    });

    // register한다.
    wb.register();

  }
}
