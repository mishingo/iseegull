<?php 

// This file makes the json to populate the map

require 'db.php';

 error_reporting(E_ALL);
 ini_set('display_errors', '1'); 


if (isset($_POST['track'])) {   //<- Uncomment if going the AJAX route

$query="SELECT latt, longg, activity, bird FROM iseegull";  //Need to add bird too

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
$fp = fopen('../data/track.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);

}
else { echo 'Nothing sent';}

?>