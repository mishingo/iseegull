<?php
 error_reporting(E_ALL);
 ini_set('display_errors', '1'); 

require 'db.php';

//if (isset($_POST['start'])) {   <- Uncomment if going the AJAX route

	$latt= 'latt';
	$longg= 'longg';
	$activity= 'activity';

	 if (isset($_POST['latt'])&&isset($_POST['longg'])&&isset($_POST['activity'])) { 
            addfile($mysqli);
            } else {
            	print 'nah dawg';
            }

function addfile($mysqli)
	{
		
		$bird=$_POST['bird'];
		$lattX=$_POST['latt'];
		$longgX=$_POST['longg'];
		$activityX=$_POST['activity'];
	
		
		// ESSENTIAL cleaning to avoid SQL Injectin Attack
		$latt=$mysqli->real_escape_string($lattX);
		$longg=$mysqli->real_escape_string($longgX);
		$activity=$mysqli->real_escape_string($activityX);
	
		
		// The 'null' in the VALUES list allows the auto-incrementing idnumber to work
		$query="INSERT INTO iseegull (id, latt, longg, activity, weather, bird) VALUES (null,'$latt','$longg','$activity',null, '$bird')";
        $result=$mysqli->query($query) or die ($mysqli->error);

		
	}

?>