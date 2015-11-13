    
function trimet() {
    var url = "https://developer.trimet.org/ws/v2/vehicles/appID=" 
    $.post(url + APPID, function(data) {
    console.log(data);
    });
};

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(45.5200,-122.6819),
    zoom:11,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
      
trimet();

