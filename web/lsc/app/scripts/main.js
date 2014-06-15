$(document).ready(function(){
  var map = L.mapbox.map('map', 'aitor6.iggn3o0g')
            .setView([42.820078, -1.646129], 16);
  var marker;
  var radio = 0;
  var circle_one;

  var julieRef = new Firebase('https://oinez.firebaseio.com/karlos_tarde');

  julieRef.on('child_removed', function(snapshot) {
    window.location.reload();
  });
  julieRef.on('child_added', function(snapshot) {
    var msgData = snapshot.val();
    if(msgData.agudos != 0){
      var circle_options = {
          stroke: true,
          fillOpacity: 0.7,
          color: '#603C90',      // Stroke color
          opacity: 1,         // Stroke opacity
          weight: 0,         // Stroke weight
      };
      radio = msgData.agudos;
    }; 
    if(msgData.graves != 0){
      var circle_options = {
          color: '#C3C100',      // Stroke color
          fillOpacity: 0.7,
          opacity: 1,         // Stroke opacity
          weight: 0,         // Stroke weight
      };
      radio = msgData.graves;
    }; 
    if(msgData.intensidad != 0){
      var circle_options = {
          color: '#5D989F',      // Stroke color
          fillOpacity: 0.7,
          opacity: 1,         // Stroke opacity
          weight: 0,         // Stroke weight
      };
      radio = msgData.intensidad;

    }; 
    circle_one = L.circle([msgData.lat, msgData.lon], radio, circle_options).addTo(map);
    
    // marker= L.marker(new L.LatLng(msgData.lat, msgData.lon), {
    //               icon: L.mapbox.marker.icon({'marker-color': '55BF0A'}),
    //               draggable: true
    //           });
    // marker.bindPopup('numero');
    // marker.addTo(map);
});

function deg2rad(deg) {
  return deg * (Math.PI/180)
}



})
