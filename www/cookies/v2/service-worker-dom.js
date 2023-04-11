/**
 * Script executes in DOM and registers service worker.
 * Handles message passing with worker and updating DOM with results.
 */

const root = document.getElementById('service-worker-root');
const statusDiv = document.getElementById('service-worker-status');
const registerBtn = document.getElementById('register-service-worker');
const unregisterBtn = document.getElementById('unregister-service-worker');

setInterval(async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg) {
    statusDiv.textContent = 'Service worker registered';
  } else {
    statusDiv.textContent = 'No service worker';
  }
}, 100);

registerBtn.addEventListener('click', async () => {
  await navigator.serviceWorker.register(
      '/cookies/v2/service-worker.js', {scope: '/cookies/v2/'});
  const reg = await navigator.serviceWorker.ready;
  console.log(reg);
});

unregisterBtn.addEventListener('click', async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  await reg.unregister();
});
