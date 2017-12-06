$("#spotify_player").hide(); // hide the fixed navbar initially
$(".fa-arrow-down").click(function() {
    $('html,body').animate({
        scrollTop: $(".shows").offset().top},
        'slow');
    $("#spotify_player").show();
});


