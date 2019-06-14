$(".container-arrow").click(function(){
   $([document.documentElement, document.body]).animate({
      scrollTop: $("#content-start").offset().top
   }, 2000);
});