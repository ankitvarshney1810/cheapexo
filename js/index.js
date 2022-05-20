jQuery(document).ready(function ($) {
    // Get current path and find target link
    var path = window.location.pathname.split("/").pop();
    // Account for home page with empty path
    if (path == '') {
        path = '../';
    }
    var target = $('nav a[href="' + path + '"]');
    
    target.addClass('active');
    $(".btnm").click(function () {
        $("nav").slideToggle();
    });
    window.onload = function () {
        if (window.innerWidth < 998) {
            $("nav").click(function () {
                $("nav").slideToggle();
            });;
        }
    }
});
var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 4 seconds
}
jQuery(function ($) {
    $('.company-promotion').owlCarousel({
        autoplay: true,
        loop: true,
        margin:25,
        dots:false,
        slideTransition:'linear',
        autoplayTimeout:4500,
        autoplayHoverPause:true,
        autoplaySpeed:4500,
        responsive:{
            0:{
                items:2
            },
            500: {
                items:3
            },
            600:{
                items:3
            },
            800:{
                items:6
            },
            1200:{
                items:7
            }
        }
    });
});
$(document).ready(function(){
    $("#dom").click(function(){
        $(".inter").hide();
        $(".dom").show();
        $("#dom").css('border-bottom', '2px solid #FF0007');
        $("#inter").css('border-bottom', '2px solid #F5F5F5');
        $("#all").css('border-bottom', '2px solid #F5F5F5');
    });
    $("#inter").click(function(){
        $(".dom").hide();
        $(".inter").show();
        $("#dom").css('border-bottom', '2px solid #F5F5F5');
        $("#inter").css('border-bottom', '2px solid #FF0007');
        $("#all").css('border-bottom', '2px solid #F5F5F5');
    });
    $("#all").click(function(){
        $(".dom").show();
        $(".inter").show();
        $("#dom").css('border-bottom', '2px solid #F5F5F5');
        $("#inter").css('border-bottom', '2px solid #F5F5F5');
        $("#all").css('border-bottom', '2px solid #FF0007');
    });
});



(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));




  $('#weeks').countdown('2020/01/01', function(event) {
    $(this).html(event.strftime('%w'));
  });
  $('#days').countdown('2020/01/01', function(event) {
    $(this).html(event.strftime('%d'));
  });
  $('#hours').countdown('2020/01/01', function(event) {
    $(this).html(event.strftime('%H'));
  });
  $('#mins').countdown('2020/01/01', function(event) {
    $(this).html(event.strftime('%M'));
  });
  $('#seconds').countdown('2020/01/01', function(event) {
    $(this).html(event.strftime('%S'));
  });