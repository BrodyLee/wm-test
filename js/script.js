$( function() {
        $( "#datepicker" ).selectmenu();
} );

$( function() {
    $( ".checkbox-area input" ).checkboxradio();
} );

$( function() {


    $( "#slider").slider({
        orientation: "horizontal",
        range: "min",
        min:1,
        max: 4,
        value: 3
    });
    $( "#slider" ).slider( "value", 3 );
} );


$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.nav ul li a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active-anchor');
        })
        $(this).addClass('active-anchor');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 100
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.nav ul li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - 100 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav ul li a').removeClass("active-anchor");
            currLink.addClass("active-anchor");
        }
        else{
            currLink.removeClass("active-anchor");
        }
    });
}

$(".burger-icon a").click(function(){
    $(this).toggleClass('active');
    $('.header-outer').toggle(400);
});

$(".nav ul li a").click(function(){
    if($(document).width() < 768){
        $(".header-outer").hide(400);
        $('.burger-icon a').removeClass('active');
    }});

$(window).resize(function(){
    if($(document).width() > 768){
        $(".header-outer").css('display', "flex");
        $('.burger-icon a').removeClass('active');
    }});
