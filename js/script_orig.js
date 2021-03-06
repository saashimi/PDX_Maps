//----Global vars for google maps traffic layers to work----------------------//
var map = null;    
var trafficLayer=new google.maps.TrafficLayer();
//----------------------------------------------------------------------------//

function trimet(passRouteInput) {
  //Accesses the TriMet API for live vehicle location info.
  //Input:APPID from hidden file.
  //Output: A coordinate pair in an array. E.g. [45.5200, -122.6819]
 
  var url = "https://developer.trimet.org/ws/v2/vehicles/appID=" 
  var dataOut = []; // This is a list of coordinates.
  var innerData;
  $.post(url + APPID, function(data) {
  data = data.resultSet.vehicle;
    $.each(data, function(index, value) { // Key into the inner JSON
      innerData = data[index];
      $.each(innerData, function(index1, value1) {
        if (index1 === "routeNumber" && value1 === Number(passRouteInput)) { // replace this with the
                                                         // dropdown
          var coord = [innerData.latitude, innerData.longitude];
          dataOut.push(coord);
        }
      });
    });
  google.maps.event.addDomListener(window, 'load', initialize(dataOut));   
  });
};

function check() {
  // Adds checkbox for live google traffic info.
  if (document.getElementById('traffic').checked) {
    trafficLayer.setMap(map);
  } else {
    trafficLayer.setMap(null);
  }
}

function initialize(dataIn) {
  
  var styles = [
    {
       stylers: [
        //{hue : "#084C8D" },
        {saturation : -75}
      ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {lightness : 100}
          //{visibility : "on"}
      ]
    }
  ];

  var mapProp = {
    center:new google.maps.LatLng(45.5200,-122.6819),
    zoom:11,
    mapTypeControlOptions: {  
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'desaturated']
    }
  };
  
  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var mapType=new google.maps.StyledMapType(styles, {name : 'Desaturated'});
  map.mapTypes.set('desaturated', mapType);
  map.setMapTypeId('desaturated');

  var markerData = dataIn;

  // refactor for JQuery later
  for( i = 0; i < markerData.length; i++ ) {
    var position = new google.maps.LatLng(markerData[i][0], markerData[i][1]);
    //bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
  
//map.data.loadGeoJson('https://cdn.rawgit.com/saashimi/PDX_Maps/master/35_route.geojson');

  }
  check();

  $("#mapInput").submit(function(e) {
    var passRouteInput = $("input[name=routeInput]").val();
    console.log(passRouteInput);
    e.preventDefault();
    trimet(passRouteInput);
  })
}; // End initialize()



trimet("x"); //clears out any lingering map markers from cache by entering an 
             //invalid route.



