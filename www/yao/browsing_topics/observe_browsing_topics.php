<?php
header("Observe-Browsing-Topics: 1");
?>
<body>
<p>The server time is: 

<?php
echo time();
?>
</p>

<button onclick="function1()">Navigate self</button><br>
<button onclick="function2()">Invoke document.browsingTopics()</button><br>

<script>
function function1() {
  window.location.href = 'observe_browsing_topics.php';
}
  
function function2() {
  document.browsingTopics();
}
</script>
  
</body>
