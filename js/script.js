    
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
  //console.log(dataOut);
  google.maps.event.addDomListener(window, 'load', initialize(dataOut));   
  });
};

function initialize(dataIn) {
  var mapProp = {
    center:new google.maps.LatLng(45.5200,-122.6819),
    zoom:11,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
  var markers = dataIn;

  var styles = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        {saturation : -50}
      ]
    }
  ];

  // refactor for JQuery later
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
    //bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
  }
};

trimet();

//google.maps.event.addDomListener(window, 'load', initialize);     

