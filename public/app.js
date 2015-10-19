console.log("Sanity Check: JS is working!");

$(document).ready(function(){


	$("#postEventForm").submit(function(e){
		e.preventDefault();
		$('#myModal').modal('hide');
		var evnt = $(this).serialize();
		$('#nameOfEvent').empty();

		$.post('/events', evnt, function(){
			console.log(data);
			$('#eventPosts').append('<li>' + data.body + '</li>');
			$('#postEventForm')[0].reset();
		});
	
		var nameOfEvent = $('#nameOfEvent').val();
		var date = $('#date').val();
		var time = $('#time').val();
		var latitude = $('#latitude').val();
		var longitude = $('#longitude').val();
		var description = $('#description').val();
		var image = $('#image').val();
		var coordinates;
		var rawLat = Number(latitude);
		var rawLong = Number(longitude);
	
		if ((latitude + longitude).length>0) {
			coordinates = latitude + ", " + longitude;
		}
		else {
			coordinates = "this is a super-secret event with no location posted!";
		}

		console.log(coordinates);

		//$("#eventPosts").append("<div class='eventPosted' id='" + locations.length + "'><div><strong>" + nameOfEvent + "</strong><a href='#' class='delete pull-right'><sup><i>delete</i></sup></a></div><br><div id='eventDate'>" + date + "  |  " + time + "</div><br><div>Location:</div><div id='eventLocation'>" + coordinates + "</div><div><img class='eventImage' src='" + image + "'></div><br><div>Description:</div><div>" + description + "<p><HR></p><br><div>");
	
		$(this).closest('form').find("input[type=text], textarea").val("");

		locations.push(["<div><strong>" + nameOfEvent + "</strong></div><div>", rawLat, rawLong, "<img class='thumbnail' src='" + image + "'></div>", "<p class='infoParagraph'>" + description + "</p>", date, time]);

		console.log(locations);

		for (i = 0; i < locations.length; i++) {
		  marker = new google.maps.Marker({
		    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		    map: map
		  });
		  markers.push(marker);
		  google.maps.event.addListener(marker, 'click', (function(marker, i) {
		    return function() {
		      infowindow.setContent(locations[i][0] + locations[i][3] + locations[i][4]);
		      infowindow.open(map, marker);
		    };
		  })(marker, i));
		}

		AutoCenter();

		// console.log(locations);
		// console.log(locations.length);

		$(".delete").click(function() {
			var i = $(this).closest(".eventPosted").attr("id");
			console.log(i);
			locations.splice(i);
			$(this).parent().parent().remove();
			markers[i].setMap(null);
			markers.splice(i, 1);
			AutoCenter();
		});



	});

	function AutoCenter() {
	  //  Create a new viewpoint bound
	  var bounds = new google.maps.LatLngBounds();
	  //  Go through each...
	  $.each(markers, function (index, marker) {
	  bounds.extend(marker.position);
	  });
	  //  Fit these bounds to the map
	  map.fitBounds(bounds);
	}

	var locations=[];
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
	  zoom: 10,
	  center: new google.maps.LatLng(-39.92, 151.25),
	  mapTypeId: google.maps.MapTypeId.SATELLITE
	});
	var infowindow = new google.maps.InfoWindow();
	var marker, i;
	var markers = new Array();


});