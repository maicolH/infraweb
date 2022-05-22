$(function() {
    $('.blog-wrap').hover(function() {
        $('.blog-wrap').not(this).addClass('fade');
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
        $('.blog-wrap').removeClass('fade');
    });

    // GALLERY
    $('#gallery').mixItUp({});

    function mixClear() {
        setTimeout(function() { $('#gallery').removeClass('waypoint') }, 2000);
    }

    // SCROLL ANIMATIONS
    function onScrollInit(items, elemTrigger) {
        var offset = $(window).height() / 1.6
        items.each(function() {
            var elem = $(this),
                animationClass = elem.attr('data-animation'),
                animationDelay = elem.attr('data-delay');

            elem.css({
                '-webkit-animation-delay': animationDelay,
                '-moz-animation-delay': animationDelay,
                'animation-delay': animationDelay
            });

            var trigger = (elemTrigger) ? trigger : elem;

            trigger.waypoint(function() {
                elem.addClass('animated').addClass(animationClass);
                if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
            }, {
                triggerOnce: true,
                offset: offset
            });
        });
    }

    setTimeout(function() { onScrollInit($('.waypoint')) }, 10);
});