////////////// GTM EVENTS /////////
$(function(){gtmSet()});

//GTM EVENTS
function gaPush(d){
    let dd = {
        eventAction: d.eventAction,
        eventLabel:d.eventLabel,
        eventLocation:d.eventLocation || null,  //data-section
        eventContext:d.eventContext || null,
        eventCategory:d.eventCategory,
        eventContent:d.eventContent || null,
        eventValue:d.eventValue || null,

        eventStream:'flight',
        event : 'event',

        hitsTime: Date.now(),
        requestId: generateId(7),
        ecommerce:null,
        ecommerceAction:false,
        noninteraction: false,
        firingOptions:'onesPerEvent'};

    dataLayer.push(dd);
    console.log(dd);
}

let gtmSet = function (){
    //click event
    $('.js-gtm-event').on('click touch',function(e){
       // e.preventDefault();
        let $self = $(this),
            dataClick ={eventAction : 'click',
                eventLabel : $self.data('event') || null,
                eventLocation : $self.data('section') || null,
                eventContext : $self.data('context') || null,
                eventCategory: $self.data('event-category') || 'Interactions',
            };
        gaPush(dataClick);
    });


    ///scroll event
    let posScrollGTM={'25':'','50':'','75':'','100':''};
    $(window).on('scroll',function (e) {scrollEvt()});

    function scrollEvt(){
        let scrollPos = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
        let vw = 'viewed';

        if(scrollPos >=25 && posScrollGTM['25'] != vw){
            posScrollGTM['25'] = vw; scrollGTMpush(25)
        }
        if(scrollPos >=50 && posScrollGTM['50'] != vw){
            posScrollGTM['50'] = vw; scrollGTMpush(50)
        }
        if(scrollPos >=75 && posScrollGTM['75'] != vw){
            posScrollGTM['75'] = vw; scrollGTMpush(75)
        }
        if(scrollPos >=96 && posScrollGTM['100'] != vw){
            posScrollGTM['100'] = vw; scrollGTMpush(100)
        }
    }
    function scrollGTMpush(pp) {
        let dlDATA = {
            'eventAction': 'scroll',
            'eventLabel':'scrollPage',
            'eventCategory':'Interactions',
            'eventContext': pp+'%',
        };
        gaPush(dlDATA);
    }
};

/// Unique ID
function generateId(len){let arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('')
}
function dec2hex(dec){
    return ('0' + dec.toString(16)).substr(-2)
}
