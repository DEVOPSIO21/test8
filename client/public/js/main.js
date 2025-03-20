$(function () {
    "use strict";
    
    /*
    //===venobox js===
    $('.venobox').venobox();

    //======countUp js=========   
    $('.counter').countUp();

    //======slider ranger======
    jQuery(function () {
        jQuery("#slider_range").flatslider({
            min: 0, max: 1000,
            step: 5,
            values: [0, 1000],
            range: true,
            einheit: '$'
        });
    });

    //=======SELECT2======== 
    $(document).ready(function () {
        $('.select_2').select2();
    });


    //======NICE SELECT=======
    $('.select_js').niceSelect();

    //======STICKY SIDEBAR======= 
    $("#sticky_sidebar").stickit({
        top: 70,
    })

    //======PRODUCT ZOOMAR======= 
    if ($("#exzoom").length > 0) {
        $("#exzoom").exzoom({
            autoPlay: true,
            "navItemNum": 4,

            "autoPlayTimeout": 2000
        });
    }


    //=====RELATED SLIDER====== 
    $('.related_slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
        prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                }
            }
        ]
    });

    //=====percircle js=====
    $("[id$='circle']").percircle();

    //=====RELATED TEAM====== 
    $('.related__team_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
        prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                }
            }
        ]
    });

    //=====BEST SELL SLIDER====== 
    $('.best_sell_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
        prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    //=====BEST SELL SLIDER====== 
    $('.testi_slider_2').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
        prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //=====INSTA SLIDER====== 
    $('.insta_slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,

        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });


    //=====CATEGOTY 2 SLIDER====== 
    $('.category_slider_2').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
        prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                }
            }
        ]
    });

    //=====CATEGOTY 2 SLIDER====== 
    $('.team_2_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
        prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //=====TESTIMONIAL 3 SLIDER====== 
    $('.testi_3_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,
    });

    //=====WOW JS====== 
    new WOW().init();

    //=====COMMON BUTTON ANIMATION===== 
    $('.common_btn')
        .on('mouseenter', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX })
        })
        .on('mouseout', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX })
        });
    */
});

let mobileMenuCheckCounter = 0;
window.main_menu_scroll =function(){
    // var navoff = $('.main_menu').offset().top;
    // $(window).scroll(function () {
    //     var scrolling = $(this).scrollTop();
    //     if (scrolling > navoff) {
    //         $('.main_menu').addClass('menu_fix');
    //     } else {
    //         $('.main_menu').removeClass('menu_fix');
    //     }
    // });
    //console.log("menu scroll ", mobileMenuCheckCounter, " Totl ",$("#offcanvasWithBothOptions .inner_menu").length)
    if($("#offcanvasWithBothOptions .inner_menu").length == 0){
        if(mobileMenuCheckCounter < 5){
            setTimeout(function(){window.main_menu_scroll()},2000);
            mobileMenuCheckCounter++;
            return;
        }
    }
    if(mobileMenuCheckCounter == 10)return;
    // //=====MOBILE MENU TOGGLER=====
    const mobile_menu = document.querySelectorAll(".mobile_dropdown");
    mobile_menu.forEach((dropdown) => {
        const innerMenu = dropdown.querySelector("ul.inner_menu");
        dropdown.addEventListener("click", (e) => {
            //e.preventDefault();
            if (innerMenu.style.maxHeight) {
                innerMenu.style.maxHeight = null;
                dropdown.classList.remove("active");
            } else {
                mobile_menu.forEach((item) => {
                    const menu = item.querySelector(".inner_menu");
                    if (menu !== innerMenu) {
                        menu.style.maxHeight = null;
                        item.classList.remove("active");
                    }
                });
                innerMenu.style.maxHeight = innerMenu.scrollHeight + "px";
                dropdown.classList.add("active");
            }
        });
    });
    mobileMenuCheckCounter = 10;

    $(".mobile_menu_item_area a:not(.no-link)").unbind();
    $(".mobile_menu_item_area a:not(.no-link)").click(function(e){
        console.log("menu clicked");
        close_mobile_menu();;
    });
}

window.close_mobile_menu=function(){
    $('#offcanvasWithBothOptions button.btn-close').click();
}

window.banner_slider = function (){
    // if($('.banner_slider').length > 0 && $(".banner_slider").hasClass("slick-initialized") == false){
    //     $('.banner_slider').slick({
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 4000,
    //         dots: true,
    //         arrows: false,
    //     });
    // }
}


window.category_slider = function (){
    if($('.category_slider').length > 0 && $(".category_slider").hasClass("slick-initialized") == false){
        if($('.category_slider > div').length == 0){//React take time to render html
            setTimeout(() => {
                window.category_slider()
            }, 1000);
        }
        else{
            $('.category_slider').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                dots: false,
                arrows: true,
                nextArrow: '<i class="far fa-angle-right nextArrow"></i>',
                prevArrow: '<i class="far fa-angle-left prevArrow"></i>',

                responsive: [
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 6,
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }
    }
}

window.product_filter = function (){
    //======ISOTOPE js========== 
    // $('.product_filter,.product_filter button').unbind();
    // var $grid = $('.grid').isotope({});
    // $('.product_filter').on('click', 'button', function () {
    //     var filterValue = $(this).attr('data-filter');
    //     $grid.isotope({
    //         filter: filterValue
    //     });
    // });
    // //active class
    // $('.product_filter button').on("click", function (event) {

    //     $(this).siblings('.active').removeClass('active');
    //     $(this).addClass('active');
    //     event.preventDefault();

    // });
}

window.marquee_animi = function(){
    //======marquee animi=======
    // if($('.marquee_animi > div.js-marquee-wrapper').length >0)return;
    // $('.marquee_animi').marquee({
    //     speed: 70,
    //     // gap: 100,
    //     delayBeforeStart: 0,
    //     direction: 'left',
    //     duplicated: true,
    //     pauseOnHover: true
    // });
}

window.menu_category = function(){
    $('.menu_category_bar').unbind();
    $('.menu_category_bar').on('click', function () {
        $('.toggle_menu').toggleClass('.show_category');
        $('.menu_category_bar').toggleClass('.ratate_arrow');
    });
}

window.close_addtocart = function(popId){
    $('#'+ popId +' button.btn-close').click();
}

window.close_minicart = function(){
    $('#minicart_modal button.btn-close').click();
}
window.close_orderdetail = function(){
    $('#order_popup_modal button.btn-close').click();
}