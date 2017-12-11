/*$("#spotify_player").hide();
$(".fa-spotify").hide();
$(".fa-arrow-down").click(function() {
    $('html,body').animate({
        scrollTop: $(".shows").offset().top},
        'slow');
});


 document.body.addEventListener('scroll', function () {
     var hT = $('.shows_container').offset().top,
         hH = $('.shows_container').outerHeight(),
         wH = $(window).height(),
         wS = $(this).scrollTop();
     if (wS > (hT + hH - wH)) {
         $(".fa-spotify").show();
     }
 });
*/
//Init hide
$(".fa-spotify").hide();


 document.body.addEventListener('scroll', function () {
     var hT = $('.fa-arrow-down').offset().top,
         hH = $('.fa-arrow-down').outerHeight(),
         wH = $(window).height(),
         wS = $(this).scrollTop();
     if (wS > (hT + hH - wH)) {
         $("#logo").addClass("fadeOutUp");
         $(".desktopmenu").removeClass("under");
         $(".desktopmenu").addClass("ontop");
         $(".fa-spotify").show();

     }
 });
$(".fa-arrow-down, .events_point ").click(function() {
    $('html,body').animate({
        scrollTop: $(".shows").offset().top},
        'slow');
});

document.querySelector(".fa-spotify").addEventListener("click",function() {
    var player = document.querySelector("#spotify_player");
    if (player.style.display ==="none") {
        player.style.display = "block";
        document.querySelector(".fa-spotify").style.bottom = "80px";
    }
    else {
        player.style.display = "none";
        document.querySelector(".fa-spotify").style.bottom = "0";
    }
});
