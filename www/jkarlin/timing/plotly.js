
function log(msg) {
  var small = document.createElement("small");
  small.appendChild(document.createTextNode(msg));
  document.getElementById("log").appendChild(small);
  document.getElementById("log").appendChild(document.createElement("br");
}

// Creates a link rel=prefetch and times how long the resource load takes.
function timeResourceLoad(size) {
  var link = document.createElement('link');
  link.rel = "prefetch";

  return new Promise(function(resolve, reject) {
    let startTime = window.performance.now();
    link.onerror = function() {
      console.log("OnError");
      let endTime = window.performance.now();
      resolve(endTime - startTime);
    }
    link.onload = function() {
      let endTime = window.performance.now();
      resolve(endTime - startTime);
    }

    link.href = "https://cr2.kungfoo.net/jkarlin/timing/size.php?size=" + size;
    document.body.appendChild(link);
  });
}

(async function() {
  let times = [];
  let numAttemptsPerSize = 10;
  let maxExponent = 20;  // Up to 2^20 (1MB)
  let numGuesses = 20;

  log("Gathering sample timings for this machine...");
  for (let exp = 11; exp <= 20; exp++) {
    let numBytes = Math.pow(2, exp);
    let results = [];
    for (let i = 0; i <= numAttemptsPerSize; i++) {
      let time = await timeResourceLoad(numBytes);
      // Ignore the first attempt, which includes socket and TLS setup.
      if (i > 0)
        results.push(time);
    }

    results.sort(function(a, b){return a - b});
    let median = results[Math.floor(results.length / 2)];
    times.push([ numBytes, median ])
        log("Bytes: " + numBytes + " Median = " + median);
  }

  log("");
  log("Okay, now performing " + numGuesses + " requests of uniformly random sizes between 0 bytes and 100KB");

  for (let i = 0; i < numGuesses; i++) {
    let actualBytes = Math.floor(Math.random() * 1024 * 300);

    let results = [];
    for (let i = 0; i <= numAttemptsPerSize; i++) {
      let time = await timeResourceLoad(actualBytes);
      // Ignore the first attempt, which includes socket and TLS setup.
      if (i > 0) {
        results.push(time);
      }
    }

    results.sort(function(a, b){return a - b});
    let median = results[Math.floor(results.length / 2)];

    // Find the best guess in size for the given timing
    let guessBytes = -1;
    let last = times[0]
    for (let val of times) {
      let size = val[0];
      let time = val[1];
       if (time >= median || val[0] == times[times.length-1][0]) {
        // Guess between the two 
        let upperTime = time
        let lowerTime = last[1]
        if (upperTime == lowerTime) {
          guessBytes = size;
        } else {
          let pos = (median - lowerTime) / (upperTime - lowerTime);
          guessBytes = pos*(size - last[0]) + last[0];
        }
        break;
      }
      last = val;
    }

    // How far off is the guess?
    let delta = Math.abs(guessBytes - actualBytes);
    let diff = delta / actualBytes;
    log(Math.floor(diff*100) + "% off (" + Math.floor(delta / 1024) + "KB off). Actual size: " + Math.floor(actualBytes/1024) + "KB Guessed size: " + Math.floor(guessBytes/1024) + "KB");
  }

})();
