var NUM_PARALLEL_HASHERS = 40;
var seed = "starting seed for hash";
function doHash() {
    seed = CryptoJS.MD5(seed);
    setTimeout(doHash, 0);
    document.getElementById("hashes").innerHTML = parseInt(document.getElementById("hashes").innerHTML) + 1;
    document.getElementById("hash").innerHTML = seed;
}

for (var i = 0; i < NUM_PARALLEL_HASHERS; i++)
    doHash();
