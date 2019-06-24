let doc_height;

$(".container-arrow").click(function(){
   $([document.documentElement, document.body]).animate({
      scrollTop: $("#content-start").offset().top
   }, 1500);
});
let isMobile = true;

let all_leaves = [];

function onLoad () {
   $(".headline").delay(250).animate({"opacity": "1"}, 1550);

   let retry_counter = 0;
   if(isMobile) retry_counter = 6;
   // console.log(isMobile, retry_counter);

   let retry_interval = setInterval(
       function(){
          if(retry_counter > 5){
             clearInterval(retry_interval);
             return;
          }
          if((typeof TweenLite) === 'undefined'){
               retry_counter ++;
          }else{
             clearInterval(retry_interval);
             // TweenLite.set(".leaf-image",{xPercent:"-50%",yPercent:"-50%"});

             const total = 5;
             let container = document.getElementById("leaf-container"), w = window.innerWidth;
             let h = window.innerHeight;

             makeLeaf();
             makeLeaf();
             for (i=0; i<total; i++){
                setTimeout(function(){
                   makeLeaf();
                }, R(0, 30000));
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
                all_leaves.push(leaf_div);
                if(all_leaves.length > 50){
                   rem(all_leaves[0]);
                }
             }

             setInterval(function(){
                if ( document.hasFocus() ) {
                   makeLeaf();
                }
             }, R(2000,3000));



             function animm(elm){
                TweenMax.to(elm,R(40,80),{y: ((+$(document).height())-55)+'px',ease:Linear.easeNone,onComplete:function(){
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
   $('#genhacks-logo').click(function(){
      $('html,body').animate({
         scrollTop: 0
      }, 1000);
   });
   $(window).resize(checkSize);
   $(document).bind('mousewheel', function(evt) {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = doc_height;
      let scrolled = (winScroll / height) * 100;

      //bottom is around 84
      if(scrolled > 42){
         loadHigherQualityPics();
         $(document).unbind('mousewheel');
      }
   });
   onLoad();
});

async function loadHigherQualityPics(){
   let containers = document.getElementsByTagName("picture");
   for (let i = 0; i < containers.length; i++) {
      let pic_container = containers[i];
      let name = pic_container.id;
      await loadOne(pic_container, name);
   }
}

function loadOne(container, name){
   return new Promise(function(resolve){
      setTimeout(function(){
         let childrens = container.children;
         for (let i = 0; i < childrens.length; i++) {
            if(i === 0){
               childrens[i].srcset = '/res/portraits/' + name + '.webp';
            }else if(i === 1){
               childrens[i].srcset = '/res/portraits/' + name + '.jpg';
            }else{
               childrens[i].src = './res/portraits/' + name + '.jpg';
            }
         }
         resolve(1);
      }, 150)
   });
}

function rem(elm){
   $(elm).animate({"opacity": "0"}, 1999); // 2000 may overlap the second spawn
   $(elm).promise().done(function(){
      elm.parentNode.removeChild(elm);
      all_leaves.shift();
   });
}

//Function to the css rule
function checkSize(){
   doc_height = $(document).height();
   isMobile = $(".not-an-actual-class").css("float") !== "none";
   for (let i = 0; i < all_leaves.length; i++) {
      if(all_leaves[i].getAttribute('removing') == null){
         all_leaves[i].setAttribute('removing', true);
         rem(all_leaves[i]);
      }
   }
}

//TODO: do the blur thing
// var src = $('#test').css('background-image');
// var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
//
// var img = new Image();
// img.onload = function() {
//    alert('image loaded');
// };
// img.src = url;
// if (img.complete) img.onload();