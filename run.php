<?php 
$output = exec("./myscript.sh");
// $output = exec("forever start --sourceDir /var/www/html/als-api app.js");
echo "<pre>";
print_r($output);
echo "</pre>";
echo "Done";
?>