<?php
echo 'You posted: ' . htmlspecialchars($_POST["say"]) . '!';
?>

<p>The server time is: 

<?php
echo time();
?>
