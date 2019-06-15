$(".container-arrow").click(function(){
   $([document.documentElement, document.body]).animate({
      scrollTop: $("#content-start").offset().top
   }, 1500);
});

function onLoad () {
   $(".headline").delay(250).animate({"opacity": "1"}, 1550);
}

onLoad();