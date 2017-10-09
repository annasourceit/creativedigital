import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';
import './lib/slick';


$(document).foundation();

$(document).ready(function() {
    //----------------------------------------Menu-------------------------------------------------

    $('.hamburger-menu').on('click', function() {
        $(this).toggleClass('animate');
        $('.bar').toggleClass('animate');
        $('.menu__list').toggleClass('menu__list--open');

    });
    //----------------------------------------Show header-------------------------------------------------
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1000) {
            $('.header--show').fadeIn();
        } else {
            $('.header--show').fadeOut();
        }
    });
    //----------------------------------------Active menu item-------------------------------------------------
    $(".list__item").on("click", function(event){
        $(".list__item").removeClass("list__item--active");
        $(this).addClass("list__item--active");
    });

    var menu_items = [
        {offset: 0, id: 'home',    target: "body"},
                   {id: 'about',   target: "About"},
                   {id: 'services',target: "Services"},
                   {id: 'works',   target: "Works"},
                   {id: 'contacts',target: "Contact"},
    ];

    setTimeout(getOffsets, 100);
    setTimeout(highlightMenu, 100);

    var highLightTimeout = false;
    var offsetsTimeout = false;

    $(window).resize(function() {
        if (offsetsTimeout) {
            clearTimeout(offsetsTimeout);
        }
        offsetsTimeout = setTimeout(function() {
            getOffsets();
            highlightMenu();
            offsetsTimeout = false;
        }, 50);
    });
    $(window).scroll(function() {
        if (highLightTimeout) {
            clearTimeout(highLightTimeout);
        }
        highLightTimeout = setTimeout(highlightMenu, 50);
    });

    function highlightMenu() {
        var offset = window.pageYOffset;
        var current_index = 0;

        for (var i = 0; i < menu_items.length; i++) {
            if (offset > menu_items[i].offset) {
                current_index = i;
            }
        }
        $(".list__item--active").removeClass('list__item--active');
        $(".menu_" + menu_items[current_index].id).addClass("list__item--active");

        highLightTimeout = false;
    }

    function getOffsets() {
        for (var i = 1; i < menu_items.length; i++) {
            menu_items[i].offset = $("#" + menu_items[i].target).offset().top - 10;
        }
    }

    //----------------------------------------Smooth scroll---------------------------------------
    $("[data-scrollto]").on("click", function(event) {
        event.preventDefault();
        var el = $(this).data('scrollto');
        var top = $(el).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });

    //----------------------------------------Slider-----------------------------------------------

    $('.firstSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.slick-prev.first'),
        nextArrow: $('.slick-next.first'),
        dots: true,
        infinite: true,
        dotsClass: 'slick-dots',
    });
    $('.secondSlider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.slick-prev.second'),
        nextArrow: $('.slick-next.second'),
        dots: false,
        infinite: true,
        dotsClass: 'slick-dots',
        swipe: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });

    //----------------------------------------Scroll top------------------------------------------
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1000) {
            $('.arrow-top').fadeIn();
        } else {
            $('.arrow-top').fadeOut();
        }
    });

    $('.arrow-top').click(function(){
        $('html, body').animate({scrollTop : 0},1000);
        return false;
    });
});
//----------------------------------------Google Maps------------------------------------------
var uluru = {lat: -7.9314419, lng: 112.6322317}; // координаты

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru,
    disableDefaultUI: true,
});

function initMap() {
    google = window.google;
    var image = '../assets/img/pin.png';
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image,
    });
}
function centerMap() {
    map.setCenter(uluru);
}
initMap();
window.addEventListener('resize', centerMap);

