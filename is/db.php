<?php

$mysqli = new mysqli("localhost", "mishingo_isee", "iseegull407", "mishingo_iseegull");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
?>