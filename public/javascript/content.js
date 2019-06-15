$(".container-arrow").click(function(){
   $([document.documentElement, document.body]).animate({
      scrollTop: $("#content-start").offset().top
   }, 1500);
});

function onLoad () {
   $(".headline").delay(250).animate({"opacity": "1"}, 1550);
   let count = 0;
   let counter = setInterval(function(){
      if(typeof google === 'undefined'){
      }else{
         initialize_gmap();
         clearInterval(counter);
      }
      if(count++ > 4){
         document.getElementById("map").innerHTML="<p>Oops</p>";
         clearInterval(counter);
      }
   }, 1000);
}

onLoad();

var geocoder;
var map;
var address ="42 Silicon Valley";
function initialize_gmap() {
   console.log("trying to init map");
   geocoder = new google.maps.Geocoder();
   var latlng = new google.maps.LatLng(-34.397, 150.644);
   var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeControl: true,
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   map = new google.maps.Map(document.getElementById("map"), myOptions);
   if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
               map.setCenter(results[0].geometry.location);
               map.setZoom(10);

               const styles_map = {
                  default: null,
                  hide: [
                     {
                        featureType: 'poi',
                        stylers: [{visibility: 'off'}]
                     }
                  ]
               };
               map.setOptions({styles: styles_map['hide']});

               var infowindow = new google.maps.InfoWindow(
                   {
                      content: '<b>' + address + '</b>',
                      size: new google.maps.Size(150, 50)
                   });

               var marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: address
               });
               google.maps.event.addListener(marker, 'click', function () {
                  infowindow.open(map, marker);
               });

            }
         }
      });
   }
}