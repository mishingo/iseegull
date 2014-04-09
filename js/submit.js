var $, document, navigator, console, activity;

function displayVals() {
    activity = $("#bird_activity").val();
    console.log(activity); 
    return activity; // idk what this does lol
}
$("select").change(displayVals); //sees if the dropdown changed and runs the function
displayVals();

var $demo = $("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $demo.html = "Geolocation is not supported by this browser.";
    }

} //end


//var activity = 'mojito';

function showPosition(position) {
    $demo.html = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    var longg = position.coords.latitude;
    var latt = position.coords.longitude;

    $.ajax({
        type: 'POST',
        url: 'http://migueleramos.com/iseegull/is/test_db.php',
        data: {
            'latt': latt,
            'longg': longg,
            'activity': activity
        }
    });
}


//Listener for button
$("#try").click(function () {
   // Get the location
    getLocation();
});