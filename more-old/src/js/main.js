//import 'babel-polyfill'
import $ from 'jquery'
import {WOW} from './vendor/wow.min.js'

window.jQuery = window.$ = $;
require('waypoints/lib/jquery.waypoints.js');
require('jquery.easing');

////////// DocReady //////////
$(function () {
    detectDevice();

    let wow = new WOW({animateClass: 'animated', offset: 0, mobile: true});
    wow.init();

    //Кнопка Подробнее
    $('.teaser-caption_more, .teaser-caption').on('click touch', function (e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: $('#exchange-movies').offset().top}, 300);
    });

    $('.js-go-next').on('click touch', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let nextSect = $(this).closest('section').next().get(0);
        goSection(nextSect);
    });


    /// Waypoints
    $('.section-layer').waypoint(function (dir) {
        pointThis(dir, this)
    }, {offset: '20%'});

    function pointThis(d, el) {
        let $el = $(el.element);
        (d === 'down') ? $el.addClass('on_point') : $el.removeClass('on_point');
    }


///New Modal
    let PoP = function () {
        let modal = 'popup-modal',
            hidden = 'popup-modal-hidden',
            box = '.modal-box',
            active = 'modal-box-active',
            modalReady = '  modal-box-ready',
            noscroll = 'modal-box-viewed';

        let animateEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        let $modal = $('.' + modal);

        $('.js-show-modal').on('click touch', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let $box = $($(this).attr('href'));
            $box.addClass(active)
                .find('.close').on('click touch', function () {
                closeModal()
            });

            $('body').addClass(noscroll);
            $box.closest('.' + modal).removeClass(hidden)
                .one(animateEnd, function (event) {//console.warn(2);
                    $box.addClass(modalReady);

                });
        });


        function closeModal() {
            $('body').removeClass(noscroll);
            $modal.addClass(hidden);
            $(event.target).closest(box).removeClass(active + modalReady);
        }

    };
    PoP();

    //GTM EVENTS
    $('.js-gtm-events').on('click touch', function (e) {//e.preventDefault();
        let $self = $(this),
            eventLabel = $self.data('event'),
            event = 'event',
            eventAction = 'click',
            eventCategory = 'Interactions',
            time = Date.now(),
            eventContext = null;

        if (eventLabel === 'become-subs') eventContext = ($self.closest('.modal-box-active').length) ? 'popup' : 'inpage';
        dataLayer.push({
            'event': 'event',
            'eventAction': eventAction,
            'eventCategory': eventCategory,
            'eventContext': eventContext,
            'hitsTime': time,
            'eventLabel': eventLabel
        });

        // console.warn({'event': event, 'eventAction': eventAction,'eventCategory': eventCategory,'eventContext': eventContext, 'hitsTime': time,'eventLabel':eventLabel});
    });
}); //end DocReady
//////////////////////////////



//scroll-to
function goTo(el, time) {
    $("html, body").animate({scrollTop: $(el).offset().top}, time);
}

function goSection(el) {
    let offs = 0;
    let y = el.getBoundingClientRect().top + window.pageYOffset + offs;
    window.scrollTo({top: y, behavior: 'smooth'}); // element.scrollIntoView();
}


/// Detect device
function detectDevice() {
    let deviceOs = getMobileOs();
    document.querySelector('body').classList.add('platform_' + deviceOs);
}

function getMobileOs() {
    let uA = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(uA)) {
        return 'android'
    }
    if (/iPad|iPhone|iPod/.test(uA) && !window.MSStream) {
        return 'ios'
    }
    return 'unknown'
}

function getOrientation() {
    let orientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait"; //  return orientation;
}
