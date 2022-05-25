//Eventos
var Body = new Vue({
    el: '#Body',
    data: {
        isMobile: false,
        navPos: $('nav').position().top,
        lastPos: 0,
        lockTimer: null,
        Message: ' Technological Solutions  ',
        M_Date: new Date().toLocaleString('es-ES', { dateStyle: "full" })
    },
    created() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.isMobile = true;
            // Mobile height fix
            $('.height-fix').each(function() {
                var h = $(this).height();
                $(this).height(h)
            })
        }

        // RESIZE RESETS
        window.addEventListener('resize', this.ResizeWindow);

        // Sticky Nav on Mobile
        if (this.isMobile) {
            $('nav').addClass('fixed');
        } else {
            $('nav').addClass('desk');
        }

        // NAV POSITION
        window.addEventListener('scroll', this.ScrollWindow);

        //PORTAFOLIO LOAD
        this.portfolio("all");
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.ResizeWindow)
        window.removeEventListener("scroll", this.ScrollWindow)
    },
    methods: {
        ResizeWindow: function() {
            this.portfolio("all");
        },
        ScrollWindow: function() {
            var pos = $(window).scrollTop();
            var pos2 = pos + 150;

            if (!this.isMobile) {
                if (pos >= this.navPos + $('nav').height() && this.lastPos < pos) {
                    $('nav').addClass('fixed');
                }
                if (pos < this.navPos && this.lastPos > pos) {
                    $('nav').removeClass('fixed');
                }
                this.lastPos = pos;
            }

            // Link Highlighting
            if (pos2 > $('#home').offset().top) { this.highlight('home'); }
            if (pos2 > $('#about').offset().top) { this.highlight('about'); }
            if (pos2 > $('#portfolio').offset().top) { this.highlight('portfolio'); }
            if (pos2 > $('#blog').offset().top) { this.highlight('blog'); }
            if (pos2 > $('#contact').offset().top ||
                pos + $(window).height() === $(document).height()) {
                this.highlight('contact');
            }

            // Prevent Hover on Scroll
            clearTimeout(this.lockTimer);
            if (!$('body').hasClass('disable-hover')) {
                $('body').addClass('disable-hover')
            }

            this.lockTimer = setTimeout(function() {
                $('body').removeClass('disable-hover')
            }, 500);
        },
        highlight: function(anchor) {
            $('nav .active').removeClass('active');
            $("nav").find('[dest="' + anchor + '"]').addClass('active');
        },
        movement: function(SitePage) {
            $('.link-wrap').removeClass('visible');

            $('nav span').removeClass('active');
            $("nav").find('[dest="' + SitePage + '"]').addClass('active');

            $('html, body').animate({
                scrollTop: $('#' + SitePage).offset().top
            }, 400);

            if (SitePage === "portfolio") {
                this.portfolio("all");
            }
        },
        mdi_menu: function() {
            $('.link-wrap').toggleClass('visible');
        },
        portfolio: function(id) {
            var elem = $("#" + id);
            var origin = $(elem).parent().offset().left;
            var pos = $(elem).offset().left;
            $('.float-bar').css({
                left: pos - origin,
                width: $(elem).innerWidth()
            });
            $('.float-bar .row').css('left', (pos - origin) * -1);
        }
    }
});
