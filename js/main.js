//Main Javascript


var $, alert, console, document, navigator, activity, window;

console.log("Running");

//Document ready
/*$(document).ready(function () {



});*/


//Get JSON list of birds
$.getJSON("data/data.json", function (response) {
    //Send response to function
    setData(response);
});


//List birds from json file for both bird pages
function setData(data) {
    var result = data;
    console.log(result);

    var $row = $("<div>", { //Create the row
        class: "row text-center"
    });

    //For localization.html
    for (var i = 0; i < result.birds.length; i++) {

        var $col = $("<div>", { //create the column
            class: "col-xs-4"
        });

        var $title = $("<h5>", { //Create the heading
            class: " "
        });

        var $img = $("<img>", { //Create img
            class: "img-circle img-responsive bird " + result.birds[i].id,
            id: result.birds[i].id,
            src: "../iseegull/img/birds/" + result.birds[i].img + ".jpg",
            alt: result.birds[i].name
        });

        //Adding the name to the column
        $title.html(result.birds[i].name);
        $col.append($img);
        $col.append($title);


        //Adding the names to the row
        $row.append($col);

        //Appending to container div after 3 items inside row
        if (((i + 1) % 3) === 0) {

            $('#list-birds').append($row);
            //$('#test').append($row);

            //Reset the row
            $row = $("<div>", {
                class: "row text-center"
            });

        }

    } // end for loop

    //---------------------------------------------------

    //For birds.html

    var $row2 = $("<div>", { //Create the row
        class: "row"
    });
    var $col2 = $("<div>", { //create the column
        class: "col-md-6 bumper-top"
    });

    for (var x = 0; x < result.birds.length; x++) {

        //Adding the name to the div


        var $media = $("<div>", {
            class: "media"
        });
        var $a = $("<a>", {
            class: "pull-left",
            src: "#"
        });
        var $img2 = $("<img>", { //Create img
            class: "media-object img-responsive",
            src: "../iseegull/img/birds/" + result.birds[x].img + ".jpg",
            alt: result.birds[x].name
        });
        var $div2 = $("<div>", {
            class: "media-body"
        });
        var $title2 = $("<h4>", { //Create the heading
            class: " "
        });

        $title2.html(result.birds[x].name);
        $div2.append($title2);
        $a.append($img2);
        $media.append($a);
        $media.append($div2);

        $col2.append($media);

        if (((x + 1) % 10) === 0) {

            $row2.append($col2);
            $("#bird-info").append($row2);

            //$('#list-birds').append($row2);
            //$('#test').append($row);

            //Reset the col
            $col2 = $("<div>", { //create the column
                class: "col-md-6 bumper-top"
            });

        }


    } //end for loop



    //Listener for bird
    $(".bird").click(function () {
        var id = $(this).attr('id');
        console.log('id is ' + id);


        //Hide entire list
        $("#list-birds").css("display", "none");



        //Go to bird activity
        $.getJSON("data/data.json", function (response) {
            aboutBird(id, response); //Working
        });


    });
}









/* Activity page with correct bird info
================================
*/

function aboutBird(index, response) {

    var bird;
    var id = index - 1; //Because the json index doesnt start at 0
    var data = response;


    $("#datbird").html(data.birds[id].name); //Working
    var $img = $("<img>", { //Create img
        src: "../iseegull/img/birds/" + data.birds[id].img + ".jpg",
        alt: data.birds[id].name
    });
    $("#datbird").append($img);

    bird = data.birds[id].name;

    //Show activities
    $("#gps").css("display", "block");

    function displayVals() {
        activity = $("#bird_activity").val();
        console.log(activity);
        return activity; // idk what this does lol
    }
    $("select").change(displayVals); //sees if the dropdown changed and runs the function
    displayVals();

    var $demo = $("demo");

    function getLocation() { //Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $demo.html = "Geolocation is not supported by this browser.";
        }

    } //end

    function showPosition(position) { //Send location and bird
        $demo.html = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;

        var latt = position.coords.latitude;
        var longg = position.coords.longitude;
        console.log(longg);
        $.ajax({
            type: 'POST',
            url: 'http://migueleramos.com/iseegull/is/test_db.php',
            data: {
                'bird': bird,
                'latt': latt,
                'longg': longg,
                'activity': activity
            },
            beforeSend:function(){
               // this is where we append a loading image
               $('#gps').html('<div><img src="img/processing.gif" alt="Loading..." /></div>');
             },
            success: function (data) {
                window.location.href = "localization.html";
                $('#list-birds').html('<h4> Thank you </h4>');
            }


        });
    }




    $(document).ready(function () {
        //Listener for button
        $(".try").click(function () {
            console.log(bird);
            // Get the location
            getLocation();
        });

    });






}

//Make map json
var track = 'go';

$.ajax({
    url: 'is/track.php',
    type: "post",
    data: {
        'track': track
    },
    success: function () {
        console.log('track.json written');
    }
});

//Send data to research database from form

//Run php
/*
var start = 'go';
$.ajax({
    url: 'is/data.php',
    type: "post",
    data: {
        'start': start
    }
});
*/