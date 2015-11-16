var map = null;    
var trafficLayer=new google.maps.TrafficLayer();


function trimet() {
  var url = "https://developer.trimet.org/ws/v2/vehicles/appID=" 
  var dataOut = [];
  var innerData;
  $.post(url + APPID, function(data) {
  data = data.resultSet.vehicle;
    $.each(data, function(index, value) {
      innerData = data[index];
      $.each(innerData, function(index1, value1) {
        if (index1 === "routeNumber" && value1 === 35) {
          var coord = [innerData.latitude, innerData.longitude];
          dataOut.push(coord);
        }
      });
    });
  google.maps.event.addDomListener(window, 'load', initialize(dataOut));   
  });
};

function initialize(dataIn) {
  
  var styles = [
    {
       stylers: [
        //{hue : "#084C8D" },
        {saturation : -75}
      ]
    },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {lightness : 100}
          //{visibility : "on"}
        ]
    }/*,{
        featureType: "road",
        elementType: "labels",
        stylers: [
          {visibility : "off"}
        ]
    }*/
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

  var markers = dataIn;
 // trafficLayer.setMap(null);

  // refactor for JQuery later
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
    //bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
  
  map.data.loadGeoJson('https://rawgit.com/saashimi/PDX_Maps/master/35_route.geojson');

  }
  check();
};

function check() {
  if (document.getElementById('traffic').checked) {
    trafficLayer.setMap(map);
  } else {
    trafficLayer.setMap(null);
  }
}

trimet();



