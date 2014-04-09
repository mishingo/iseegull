<?php 

require 'db.php';

//if (isset($_POST['start'])) {   <- Uncomment if going the AJAX route

$query="SELECT * FROM birds"; 

$result=$mysqli->query($query)
    or die ($mysqli->error);

//store the entire response
$response = array();

//the array that will hold the id, name, subgenre, and origin
$birds = array();


while( $row = $result->fetch_assoc() ) { 
    $birds[] = $row; 
} 

//the artists array goes into the response
$response['birds'] = $birds;

//write to the file
$fp = fopen('data.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);

//}
//else { echo 'Nothing sent';}

?>