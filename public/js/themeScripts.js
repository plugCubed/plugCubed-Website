/* -----------------------------------------------------------------------------

    Mackbeth
    v 1.0
    by ShakespeareThemes
    shakespearethemes@gmail.com

----------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------

    TABLE OF CONTENT

    1.) General Variables
    2.) Typography
    3.) Components
    4.) Various Scripts
    5.) Header
    6.) Main Slider
    7.) Homepage
    8.) Page Types
    9.) Window Resize
    10.) Initialize Page

----------------------------------------------------------------------------- */

(function($) {
    "use strict";
    var ThePage = function() {

        /* ------------------------------------------------------------------

                1.) GENERAL VARIABLES

        ------------------------------------------------------------------ */

        /* ----------------------------------
            PAGE VAR
        ---------------------------------- */

        var thepage = this;

        /* ----------------------------------
            SCREEN WIDTH
        ---------------------------------- */

        thepage.getWindowWidth = function() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        };
        var screenWidth = thepage.getWindowWidth();

        /* -----------------------------------------------------------------------------

                2.) TYPOGRAPHY

        ----------------------------------------------------------------------------- */

        /* ----------------------------------
            CREATE DEFAULT LISTS
        ---------------------------------- */

        thepage.createDefaultLists = function() {
            $('.various-content ul:not(.accordion,.tabs,.tab-content,.check-list,.default-list)').each(function() {
                $(this).addClass('default-list');
                $(this).find('> li').prepend('<i class="ico icon-chevron-right"></i>');
            });
        };
        thepage.createDefaultLists();

        /* -----------------------------------------------------------------------------

                3.) COMPONENTS

        ----------------------------------------------------------------------------- */

        /* ----------------------------------
            ACCORDION
        ---------------------------------- */

        thepage.createAccordions = function() {
            $('.accordion .accordion-item.opened').each(function() {
                $(this).removeClass('active');
                $(this).addClass('opened');
                $(this).find('.accordion-content').show();
            });

            $('.accordion .accordion-toggle').click(function() {
                var item = $(this).parents('.accordion-item');
                var item_content = item.find('.accordion-content');
                item.toggleClass('opened');
                item_content.slideToggle(275);
            });

        };
        thepage.createAccordions();

        /* ----------------------------------
            LIST SLIDER
        ---------------------------------- */

        var ListSlider = function(element) {

            var elem = $(element);

            /* VARIABLES */

            var slider = elem.find('.list-slider-items').first();
            var container = slider.find('> ul').first();
            var prevBtn = elem.find('.list-slider-nav .prev');
            var nextBtn = elem.find('.list-slider-nav .next');
            var activeItem;
            var numberOfItems = container.find('> li').length;
            var itemWidth;
            var visibleItems;

            /* SET HEIGHT */

            var set_height = function() {

                // get height of highest visible item
                var maxHeight = 0;
                var i;
                for (i = activeItem; i < activeItem + visibleItems; i++) {
                    var height = container.find('> li:eq(' + i + ')').height();
                    maxHeight = height > maxHeight ? height : maxHeight;
                }
                slider.css('height', maxHeight);

            };

            /* RESET */

            var reset = function() {

                activeItem = 0;
                prevBtn.addClass('disabled');
                nextBtn.removeClass('disabled');
                itemWidth = container.find('> li').first().width();
                visibleItems = Math.ceil(slider.width() / itemWidth);
                container.css({
                    width: numberOfItems * itemWidth,
                    left: 0
                });
                slider.css('overflow', 'hidden');
                set_height();

            };
            reset();

            /* REFRESH */

            this.refresh = function() {
                reset();
            };

            /* NEXT */

            var next = function() {
                activeItem += 1;
                container.css('left', -(activeItem * itemWidth));
                set_height();
            };
            nextBtn.click(function() {
                if (!$(this).hasClass('disabled')) {

                    // slide next
                    next();

                    // enable prev button
                    if (prevBtn.hasClass('disabled')) {
                        prevBtn.removeClass('disabled');
                    }

                    // check for disabling next button
                    if (activeItem + visibleItems >= numberOfItems) {
                        $(this).addClass('disabled');
                    }
                }
            });

            /* PREV */

            var prev = function() {
                activeItem -= 1;
                container.css('left', -(activeItem * itemWidth));
                set_height();
            };

            prevBtn.click(function() {
                if (!$(this).hasClass('disabled')) {

                    // slide prev
                    prev();

                    // enable next button
                    if (nextBtn.hasClass('disabled')) {
                        nextBtn.removeClass('disabled');
                    }

                    // check for disabling prev button
                    if (activeItem <= 0) {
                        $(this).addClass('disabled');
                    }
                }
            });

        };

        $.fn.listslider = function(options) {
            return this.each(function() {
                var element = $(this);

                // Return early if this element already has a plugin instance
                if (element.data('listslider')) {
                    return;
                }
                // pass options to plugin constructor
                var listslider = new ListSlider(this, options);

                // Store plugin object in this element's data
                element.data('listslider', listslider);
            });

        };

        /* INITIALIZE */

        $('.list-slider').each(function() {
            $('.list-slider').listslider().data('listslider');
        });

        /* ----------------------------------
            PROGRESS BARS
        ---------------------------------- */

        thepage.createProgressBars = function() {
            $('.progressbar').each(function() {
                var inner = $(this).find('.inner');

                inner.append('<span class="percentage">' + $(this).data('percentage') + '</span>');
                $(this).delay(100).fadeIn(100, function() {
                    inner.css('width', $(this).data('percentage'));
                });
            });
        };
        thepage.createProgressBars();

        /* ----------------------------------
            TABS
        ---------------------------------- */

        thepage.createTabs = function() {
            $('.tabs .tab').click(function() {

                /* SET ACTIVE TAB */

                $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                var index = $(this).index();

                /* TOGGLE CONTENT */

                if ($(this).parent().next('.tab-content').length > 0) {

                    var content = $(this).parent().next('.tab-content').first();

                    content.find('.item:visible').hide();
                    content.find('.item:eq(' + index + ')').show();

                }

            });
        };
        thepage.createTabs();

        /* -----------------------------------------------------------------------------

                4.) VARIOUS SCRIPTS

        ----------------------------------------------------------------------------- */

        /* ----------------------------------
            LIGHTBOX
            Initialize Magnific Popup with "lightbox" class
        ---------------------------------- */

        thepage.createLightboxes = function() {
            if ($.fn.magnificPopup) {

                // just one image on page
                if ($('a.lightbox').length > 1) {
                    $('a.lightbox').magnificPopup({
                        type: 'image',
                        gallery: {
                            enabled: true
                        },
                        callbacks: {

                            /* FIREFOX GLITCH FIX */
                            beforeOpen: function() {
                                $('.project-preview .thumb .overlay').hide();
                            },
                            close: function() {
                                setTimeout(function() {
                                    $('.project-preview .thumb .overlay').removeAttr('style');
                                }, 100);
                            }
                        }
                    });
                } else if ($('a.lightbox').length === 1) {

                    // more than one image on page
                    $('a.lightbox').magnificPopup({
                        type: 'image'
                    });
                }

            }
        };
        thepage.createLightboxes();

        /* -----------------------------------------------------------------------------

                5.) HEADER

        ----------------------------------------------------------------------------- */

        /* ----------------------------------
            TOPBAR
        ---------------------------------- */

        /* SEARCH */

        // show input

        $('#topbar .search-form button.submit').click(function() {

            if (screenWidth > 767) {
                if ($(this).is(':not(.active)')) {
                    $(this).addClass('active');
                    $('#topbar .search-form').addClass('active');

                    // show input
                    $('#topbar .search-form .input').fadeIn(275);

                    // hide social icons
                    $('#topbar .social-icons').fadeOut(275);
                    return false;
                }
            }

        });

        // close input

        $('#topbar .search-form button.close').click(function() {

            // hide input
            $('#topbar .search-form .input').fadeOut(275, function() {
                $('#topbar .search-form input').val($('#topbar .search-form input').data('placeholder'));
            });

            // show social icons
            $('#topbar .social-icons').fadeIn(275, function() {
                $('#topbar .search-form, #topbar .search-form button.submit').removeClass('active');
                $(this).removeAttr('style');
            });
            return false;
        });

        // input placeholder

        $('#topbar .search-form input').focus(function() {
            if ($(this).val() === $(this).data('placeholder')) {
                $(this).val('');
            }
        });
        $('#topbar .search-form input').blur(function() {
            if ($(this).val() === '') {
                $(this).val($(this).data('placeholder'));
            }
        });

        /* RESPONSIVE CONTROLS */

        // social icons

        $('#topbar .responsive-controls .social').click(function() {
            $(this).toggleClass('active');
            $('#topbar .social-icons').slideToggle(275);
            if ($('#topbar .search-form').is(':visible')) {
                $('#topbar .search-form').slideUp(275);
                $('#topbar .responsive-controls .search').removeClass('active');
            }
        });

        // search

        $('#topbar .responsive-controls .search').click(function() {
            $(this).toggleClass('active');
            $('#topbar .search-form').slideToggle(275);
            if ($('#topbar .social-icons').is(':visible')) {
                $('#topbar .social-icons').slideUp(275);
                $('#topbar .responsive-controls .social').removeClass('active');
            }
        });

        /* ----------------------------------
            NAVBAR
        ---------------------------------- */

        /* SET INDICATOR */

        var setMainnavIndicator = function(activeItem) {
            var indicator = $('nav.main .indicator');
            var offset = Math.floor(activeItem.position().left) + 27;
            var width = Math.floor(activeItem.find('> a').width());

            indicator.css({
                left: offset,
                width: width
            });
        };

        setMainnavIndicator($('nav.main > ul > li.active').first());

        /* HOVER ACTION */

        $('nav.main > ul > li').hover(function() {

            // set indicator
            setMainnavIndicator($(this));

            // show submenu
            $(this).find('ul').stop(true, true).slideDown(275);

        }, function() {

            // reset indicator
            setMainnavIndicator($('nav.main > ul > li.active'));

            // hide submenu
            $(this).find('ul').slideUp(275);
        });

        /* RESPONSIVE NAV */

        // toggle nav

        $('nav.main > button').click(function() {
            $(this).toggleClass('active');
            $('nav.main > ul').slideToggle(275);
        });

        // toggle submenu

        $('nav.main .arrow').click(function() {
            $(this).toggleClass('active');
            $(this).parent().find('ul').slideToggle(275);
        });

        /* -----------------------------------------------------------------------------

                6.) MAIN SLIDER
                Default slider for homepage

        ----------------------------------------------------------------------------- */

        $('#slider').each(function() {

            var slider = $(this);
            var carousel = $(this).find('.carousel');
            var indicator = slider.find('.indicator .progressbar').length > 0 ? slider.find('.indicator .progressbar') : false;
            var interval = (slider.data('interval') && !isNaN(slider.data('interval'))) ? slider.data('interval') : false;

            /* ----------------------------------
                LOAD IMAGES
            ---------------------------------- */

            var numberOfImages = slider.find('img').length;
            var loadedImages = 0;

            if (numberOfImages > 0) {

                slider.find('img').one('load', function() {
                    loadedImages++;
                    if (numberOfImages === loadedImages) {
                        slider.find('.loading-anim').fadeOut(275);
                    }
                }).each(function() {
                    if (this.complete) { $(this).load(); }
                });
            } else {
                slider.find('.loading-anim').fadeOut(275);
            }

            /* ----------------------------------
                ANIMATE INDICATOR
            ---------------------------------- */

            var sliderIndicatorAnimate = function(progress, time) {

                indicator.stop();

                // set default progress value

                indicator.css('width', progress + '%');

                // animate progressbar

                if (!slider.find('button.pause').hasClass('paused')) {
                    indicator.animate({
                        'width': '100%'
                    }, time, function() {

                        // slide next
                        carousel.carousel('next');

                    });
                }

            };

            /* ----------------------------------
                WITH INTERVAL
            ---------------------------------- */

            if (interval !== false) {

                /* INDICATOR */

                if (indicator !== false) {
                    sliderIndicatorAnimate(0, interval);
                }

                /* INIT */

                carousel.carousel({
                    interval: false,
                    pause: false
                });

                /* SLID EVENT */

                carousel.bind('slid', function() {
                    indicator.attr('data-percentage', 0);
                    indicator.attr('data-time', 0);
                    sliderIndicatorAnimate(0, interval);
                });

            } else {

            /* ----------------------------------
                WITHOUT INTERVAL
            ---------------------------------- */
                carousel.carousel({
                    interval: false
                });

            }

            /* ----------------------------------
                PREV SLIDE
            ---------------------------------- */

            $('#slider .nav.prev button').click(function() {
                if (indicator !== false) {
                    indicator.stop();
                }
                carousel.carousel('prev');
            });

            /* ----------------------------------
                NEXT SLIDE
            ---------------------------------- */

            $('#slider .nav.next button').click(function() {
                if (indicator !== false) {
                    indicator.stop();
                }
                carousel.carousel('next');
            });

            /* ----------------------------------
                PAUSE
            ---------------------------------- */

            if (interval !== false) {
                $('#slider button.pause').click(function() {

                    /* UNPAUSE */

                    if ($(this).hasClass('paused')) {

                        $(this).removeClass('paused');

                        // unpause indicator

                        if (indicator !== false) {
                            sliderIndicatorAnimate(parseInt(indicator.attr('data-percentage'), 10) + 1, interval - indicator.attr('data-time'));
                        }

                    } else {

                        /* PAUSE */

                        $(this).addClass('paused');

                        // pause indicator

                        if (indicator !== false) {
                            indicator.stop();
                            indicator.attr('data-percentage', Math.floor(indicator.width() / (indicator.parent().width() / 100)));
                            indicator.attr('data-time', (interval / 100) * indicator.attr('data-percentage'));
                        }

                    }

                });
            }

        });

        /* -----------------------------------------------------------------------------

                8.) PAGE TYPES

        ----------------------------------------------------------------------------- */

        /* ----------------------------------
            ABOUT PAGE
        ---------------------------------- */

        /* TEAM MEMBER THUMBNAIL */

        thepage.aboutMemberHover = function() {

            $('.about-team .team-member .thumb').hover(function() {
                var self = $(this);

                self.find('.overlay').stop(true, true);
                self.addClass('hover');
                self.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    self.addClass('hovered');
                });
            }, function() {
                var self = $(this);

                self.removeClass('hover');
                self.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    self.removeClass('hovered');
                });
            });

        };
        thepage.aboutMemberHover();

        /* -----------------------------------------------------------------------------

                9.) WINDOW RESIZE

        ----------------------------------------------------------------------------- */

        var screenTransition = false;
        var actualScreenWidth = screenWidth;

        $(window).resize(function() {

            screenWidth = thepage.getWindowWidth();

            /* CHECK FOR SCREEN TRANSITION */

            if (screenWidth !== actualScreenWidth) {
                screenTransition = true;
                actualScreenWidth = screenWidth;
            } else {
                screenTransition = false;
            }

            /* IF TRANSITION */

            if (screenTransition) {
                if (screenWidth > 979) {

                    // topbar
                    $('#topbar .social-icons, #topbar .search-form, #topbar .input').removeAttr('style');
                    $('#topbar .active').removeClass('active');

                    // main nav
                    $('nav.main ul').removeAttr('style');
                    $('nav.main .arrow.active, nav.main > button.active').removeClass('active');
                }

                // list slider

                $('.list-slider').each(function() {
                    $(this).data('listslider').refresh();
                });

            }
        });

        /* -----------------------------------------------------------------------------

                END.

        ----------------------------------------------------------------------------- */

    };

    $.fn.initpage = function(options) {
        return this.each(function() {
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('initpage')) {
                return;
            }

            // pass options to plugin constructor
            var initpage = new ThePage(this, options);

            // Store plugin object in this element's data
            element.data('initpage', initpage);
        });
    };

})(jQuery);

/* -----------------------------------------------------------------------------

        10.) INITIALIZE PAGE

----------------------------------------------------------------------------- */

$(document).ready(function() {

    "use strict";
    $('body').initpage().data('initpage');

});
