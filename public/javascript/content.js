$(".container-arrow").click(function(){
   $([document.documentElement, document.body]).animate({
      scrollTop: $("#content-start").offset().top
   }, 1500);
});
let isMobile = true;
function onLoad () {
   $(".headline").delay(250).animate({"opacity": "1"}, 1550);

   let retry_counter = 0;
   if(isMobile) retry_counter = 6;
   let bottom =$(document).height();

   let retry_interval = setInterval(
       function(){
          if(retry_counter > 5){
             clearInterval(retry_interval);
          }
          if((typeof TweenLite) === 'undefined'){
               retry_counter ++;
          }else{
             clearInterval(retry_interval);
             // TweenLite.set(".leaf-image",{xPercent:"-50%",yPercent:"-50%"});

             const total = 15;
             let container = document.getElementById("leaf-container"), w = window.innerWidth;
             let h = window.innerHeight;

             makeLeaf();
             makeLeaf();
             for (i=0; i<total; i++){
                setTimeout(function(){
                   makeLeaf();
                }, R(0, 18000));
             }

             function makeLeaf(){
                let leaf_div = document.createElement('div');
                let ranX = R(0, w);
                let ranY = R(-5, 15);
                let ranZ =R(-200,200);
                TweenLite.set(leaf_div,{attr:{class:'leaf-image'},left: ranX+'px',top: ranY+'px',z:ranZ, rotationZ: R(-45,45)});
                container.appendChild(leaf_div);
                $(leaf_div).animate({"opacity": 1}, {duration:2500});
                setTimeout(function(){
                   animm(leaf_div);
                }, 1000);
             }

             function animm(elm){
                TweenMax.to(elm,R(90,150),{y: (bottom)+'px',ease:Linear.easeNone,onComplete:function(){
                     TweenMax.killTweensOf(elm);
                }});
                TweenMax.to(elm,R(4,8),{x:'+=100',rotationZ:R(-45,45),repeat:-1,yoyo:true,ease:Sine.easeInOut});
                // TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
             }
             function R(min, max) {
                return min + Math.random() * (max - min)
             }
          }
       },
       1000
   );
}
$(document).ready(function() {
   // run test on initial page load
   checkSize();
   // run test on resize of the window
   $(window).resize(checkSize);
   onLoad();
});

//Function to the css rule
function checkSize(){
   isMobile = $(".not-an-actual-class").css("float") === "none";
}

//TODO: do the blur thing
var src = $('#test').css('background-image');
var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

var img = new Image();
img.onload = function() {
   alert('image loaded');
};
img.src = url;
if (img.complete) img.onload();