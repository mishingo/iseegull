var alert, document, console, google, window, $;
/*$.getJSON("data/data.json", function (response) {
    setData(response);
});*/



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

    $.getJSON("data/track.json", function (response) {
        //Send response to function
        setData(response);
    });


// Google Map

function setData(data) {
    var result = data;
    console.log(result);


    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(28.602428, -81.20006) //UCF
    };

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    var marker, contentString;

    // Array of markers
    var markers = [];
    // Array of infowindows
    var infos = [];


    for (var i = 0; i < result.birds.length; i++) {

        // Creating the markers
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(result.birds[i].latt, result.birds[i].longg),
            map: map,
            title: result.birds[i].bird
        });



        // Content for infowindow
        contentString = '<div class="info">' +
            '<h1>' + result.birds[i].bird + '</h1>' +
            '<p>' + '<b>Activity: </b>' + result.birds[i].activity + '</p>' +
            '</div>';



        // Creating the infowindow
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Listen for marker click
        google.maps.event.addListener(marker, 'click', function (content) {
            return function () {
                infowindow.setContent(content); //set the content
                infowindow.open(map, this);
            };
        }(contentString));

        // Push info for windows and markers to their arrays
        infos.push(infowindow);
        markers.push(marker);


    } // End of for loop

    // Listen for click of artist name in the list
    $(".names").click(function () {
        $("a.names").removeClass("active");
        var id = $(this).attr('id');
        console.log('id is ' + id);

        infowindow.setContent(infos[id].content);
        infowindow.open(map, markers[id]);
        $(this).addClass("active");
    });


    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

}
// End Google Map