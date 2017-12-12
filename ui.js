/*Mobile Navigation*/

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}


//Init hide
$(".fa-play-circle").hide();

/* Onscroll change properties/styles */

 document.body.addEventListener('scroll', function () {
     var hT = $('.fa-arrow-down').offset().top,
         hH = $('.fa-arrow-down').outerHeight(),
         wH = $(window).height(),
         wS = $(this).scrollTop();
     if (wS > (hT + hH - wH)) {
         $("#logo").addClass("fadeOutUp");
         $(".desktopmenu").removeClass("under");
         $(".desktopmenu").addClass("ontop");
         $(".fa-play-circle").show();

     }
 });
/*Animation menu */
$(".fa-arrow-down, .events_point ").click(function() {
    $('html,body').animate({
        scrollTop: $(".shows").offset().top},
        'slow');
});
$(".about_point ").click(function() {
    $('html,body').animate({
        scrollTop: $(".about").offset().top},
        'slow');
});

$(".news_point ").click(function() {
    $('html,body').animate({
        scrollTop: $(".news").offset().top},
        'slow');
});
$(".video_point ").click(function() {
    $('html,body').animate({
        scrollTop: $(".video").offset().top},
        'slow');
});
$(".book_point ").click(function() {
    $('html,body').animate({
        scrollTop: $(".bookme").offset().top},
        'slow');
});

/* Toggle spotify Player */
document.querySelector(".fa-play-circle").addEventListener("click",function() {
    var player = document.querySelector("#spotify_player");
    if (player.style.display ==="none") {
        player.style.display = "block";
        document.querySelector(".fa-play-circle").style.bottom = "80px";
    }
    else {
        player.style.display = "none";
        document.querySelector(".fa-play-circle").style.bottom = "0";
    }
});
