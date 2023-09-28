/**
 * SharedWorker script executes in the worker.
 */

importScripts('./worker-import-script.js')

self.onconnect = ev => {
  const [port] = ev.ports;
  port.addEventListener('message', async () => {
    const msg = {};
    try {
      const res = await fetch('/cookies/v2/echo-cookies.php');
      const cookies = await res.json();
      msg.ok = true;
      msg.cookies = cookies;
    } catch (error) {
      msg.ok = false;
    } finally {
      port.postMessage(msg);
    }
  });
  port.start();
};
