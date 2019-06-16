$(".container-arrow").click(function(){
   $([document.documentElement, document.body]).animate({
      scrollTop: $("#content-start").offset().top
   }, 1500);
});

function onLoad () {
   $(".headline").delay(250).animate({"opacity": "1"}, 1550);
}

onLoad();

var src = $('#test').css('background-image');
var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

var img = new Image();
img.onload = function() {
   alert('image loaded');
};
img.src = url;
if (img.complete) img.onload();