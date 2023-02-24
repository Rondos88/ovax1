(function() {
  'use strict';

  //menu fix mobile

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
  
  // poppup

  $('.popup-frame').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	$('.popup-img').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
  });

  $('.popup').magnificPopup({
		type: 'inline',
    preloader: false,
    closeOnContentClick: false,
    fixedContentPos: true,
    mainClass: 'mfp-zoom-in',

    callbacks: {
      open: function() {

      },
    }
  });

  $('.mfp-close').on('click', function(){
    $.magnificPopup.close();
  })

  svg4everybody();
  

  //table
  
  if($('table.responsive').length){
    $('table.responsive').ngResponsiveTables();
  }
	
  //select styler

  var changeSelectInitText = item => {
    let text = item.find('li.selected').data('text');
    let selectText = item.find('.jq-selectbox__select-text');
    let liText = item.find('.jq-selectbox__dropdown li');
    let finalText = item.find('li.selected').text().replace(text, '') + ' <span>' + text  + '</span>';

    if(text !== undefined && selectText.html().replace(' ', '') !== finalText.replace(' ', '')){
      selectText.html(finalText);

      liText.each(function(){
        $(this).html($(this).text() + ' <span>' + $(this).data('text') + '</span>')
      })
    }
  }
  var changeSelectClosedText = item => {
    let text = item.find('li.selected').data('text');
    let selectText = item.find('.jq-selectbox__select-text');
    let finalText = item.find('li.selected').text().replace(text, '') + ' <span>' + text  + '</span>';
    
    if(text !== undefined && selectText.html().replace(' ', '') !== finalText.replace(' ', '')){
      selectText.html(finalText);
    }
  }

  $('select').not('.sel-search').styler({
    onFormStyled: function(){
      $('.jq-selectbox.sel-text').each(function(){
        changeSelectInitText($(this));
      })
    },
    onSelectClosed: function(){
      changeSelectClosedText($(this));
    },
  });

  $('select.sel-search').styler({
    selectSearch: true,
    onFormStyled: function(){
      $('.jq-selectbox.sel-search.sel-text').each(function(){
        changeSelectInitText($(this));
      })
    },
    onSelectClosed: function(){
      changeSelectClosedText($(this));
    },
  });

  //datepicker

  $( "#date" ).datepicker({
    range: true,
    multipleDatesSeparator: ' - '
  });

  // $("#weeklyDatePicker").datetimepicker({
  //   format: 'DD-MM-YYYY'
  // });

  // //Get the value of Start and End of Week
  // $('#weeklyDatePicker').on('dp.change', function (e) {
  //     var value = $("#weeklyDatePicker").val();
  //     var firstDate = moment(value, "DD-MM-YYYY").day(0).format("DD-MM-YYYY");
  //     var lastDate =  moment(value, "DD-MM-YYYY").day(6).format("DD-MM-YYYY");
  //     $("#weeklyDatePicker").val(firstDate + " - " + lastDate);
  // });
   
  if($('#tel').length){
    const inputTel = document.querySelector("#tel");
    intlTelInput(inputTel, {
      utilsScript: "node_modules/intl-tel-input/build/js/utils.js?22",
    });
  }

  //tabs
  $('[data-tabs-btn]').on('click', function() {
    let tabsName = $(this).parent().attr('data-tabs-btns');
    let tabNo = $(this).attr('data-tabs-btn');
    let tabsWrapper = $('[data-tabs-wrapper='+tabsName+']');
    
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    tabsWrapper.children().each(function(i, item) {
      $(item).hide();
      if ($(item).attr('data-tabs-item') === tabNo) {
        $(item).show();
      }
      if($('.nicescroll-box').length !== 0){
        setTimeout(() => {
          $(".nicescroll-box").getNiceScroll().resize();
        }, 1000);
      }

      if($('.cab-table__wrap').length){
        setTimeout(tableSticky(), 1000);
      }
    });
  });

  function tabsInitialization() {
    let btns = $('[data-tabs-btns]');
    let wrapper = $('[data-tabs-wrapper]');

    $(wrapper).children().not(function() {
      if ($(this).attr('data-tabs-item') === '1') {
        return true;
      }
    }).hide();

    $(btns).children().not(function() {
      if ($(this).attr('data-tabs-btn') === '1') {
        return false;
      } else {
        return true;
      }
    }).addClass('active');
  }
  
  tabsInitialization();

  //accordion

  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.accordion__head');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
        $this = $(this),
        $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('active');

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 1000);
    }

    if (!e.data.multiple) {
      $el.find('.accordion__body').not($next).slideUp().parent().removeClass('active');
    };
  }	

  var accordion = new Accordion($('.accordion'), false);
  
  //nicescroll

  $(".nicescroll-box").niceScroll(".wrap",{
    cursorcolor:"#F12A23",
    cursorwidth:"3px",
    cursorborder: "0px solid #fff",
    zindex: 20,
    emulatetouch: true,
    autohidemode: false,
    cursorborderradius: "10px",
    railalign: 'right',
  });
  
  
  // aos

  AOS.init(
    {
      // Global settings
      disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
      offset: 0, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1200, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    }
  );

  setTimeout(AOS.refreshHard, 1000);
	
	//clipboard

  var affil = new Clipboard('.copy-text');

  function affiliatelink(id) {
    id.on('success', function (e) {

      $('.copy-success').fadeIn();
      $('.copy-success').delay(3000).fadeOut();
    });
  }

  affiliatelink(affil);

  // home charts

  if($('.number-list').length !== 0){
    let isScroll = false;
    $(window).on('scroll', function() {

      if ($(this).scrollTop() + $(window).height() >= $('.number-list').offset().top + 50 && !isScroll) {
        isScroll = true;
        $('.number-chart__line').each(function(){
          $(this).animate({
            width: '100%'
          }, 2000);
        })
      }
      // if ($(this).scrollTop() + $(window).height() <= $('.number-list').offset().top + 50) {
      //   isScroll = false;
      //   $('.number-chart__line').each(function(){
      //     $(this).removeAttr('style');
      //   })
      // }
    });
  }

  if($('.tip-trigger').length){
    let tooltips = document.querySelectorAll('.tip-trigger');
    tooltips.forEach(item => {
      let temp = item.querySelector('.tip-wrap')

      tippy(item, {
        content: temp.innerHTML,
        allowHTML: true,
        theme: 'ovax',
      });
    })
  }

  // home charts end

  // numbers
  if($('.dynamicNumber').length !== 0){
    let isScroll = false;

    $('.dynamicNumber').dynamicNumber({
      duration: 2000,
      currency: {
        indicator: '',
        size: 3,
        decimals: '0',
        separator: ' ',
        decimalsPoint: '.'
      },
    }); 

    $(window).on('scroll', function(){
      var scrolltop = $(this).scrollTop();
      $('.dynamicNumber').each(function(){
        if(scrolltop + $(window).height() >= $(this).offset().top + 50) {
          $(this).dynamicNumber('start');
          isScroll = true;
        }
      });

      
    });
  }
  // numbers end

  if($('.svg-animate').length){
    let isScroll = false;
    $(window).on('scroll', function(){
      let scrolltop = $(this).scrollTop();

      $('.svg-animate').each(function(){
        if(scrolltop + $(window).height() >= $(this).offset().top + 50) {
          $(this).find('svg').addClass('animate')
          isScroll = true;
        }else{
          $(this).find('svg').removeClass('animate')
          isScroll = false;
        }
      })
    });
  }

  if($('#road-map').length){
    let isScroll = false;
    $(window).on('scroll', function(){
      let scrolltop = $(this).scrollTop();

      $('.road-map').each(function(){
        if(scrolltop + $(window).height() >= $(this).offset().top + 50) {
          $(this).addClass('animate')
          isScroll = true;
        }else{
          $(this).removeClass('animate')
          isScroll = false;
        }
      })
    });
  }

  

  if($('#text-1').length){
    const typeText = new TypeIt("#text-1", {
      speed: 50,
      startDelay: 0,
      loop: false,
      loopDelay: 15000,
    }).go();

    typeText.is('completed');

    // new TypeIt("#text-2", {
    //   speed: 50,
    //   startDelay: 1800,
    // }).go()
  }

  //parallax

  if($('#call-scene').length !== 0){
    let scene = document.getElementById('call-scene');
    let parallaxInstance = new Parallax(scene, {
      limitX: 1,
    });
  }
  if($('#perk-scene').length !== 0){
    let scene = document.getElementById('perk-scene');
    let parallaxInstance = new Parallax(scene, {
      limitY: 1,
    });
  }

  if($('.header-bot').length){
    // stickyNav

    var stickyNavTop = $('.header-bot').offset().top;
            
    var stickyNav = function(){
      var scrollTop = $(window).scrollTop(); 
      
      if (scrollTop > stickyNavTop) { 
        $('.header-bot').addClass('fixed');
        $('.header-content').addClass('fixed');
        $('.m-nav').addClass('fixed');
      } else {
        $('.header-bot').removeClass('fixed'); 
        $('.header-content').removeClass('fixed'); 
        $('.m-nav').removeClass('fixed'); 
      }
    };

    stickyNav();

    $(window).on('scroll', function() {
      stickyNav();
    });
  }

  

  // Toggle Mob menu

  $('.m-nav .header-menu__item').on('click', function(){
    let toggleMenu = $(this).find('.header-menu__in');
    toggleMenu.slideToggle();
    $(this).siblings('.header-menu__item').find('.header-menu__in').slideUp();

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }
  })

  

  // Main Sidebar 
  
  $('.header-burger').on('click', function(){
    $(this).toggleClass('active');
    $('.m-nav').toggleClass('active');
    
    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }
  })

  $(document).on('mouseup', function (e){ 
    let btn = $('.header-burger');
    let modal = $('.m-nav');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
        !modal.is(e.target) && modal.has(e.target).length === 0) { 
      btn.removeClass('active');
      modal.removeClass('active');
    }
  });

  const handle = $( "#calc-sum" );
  $( "#calc-slider" ).slider({
    range: 'min',
    min: 0,
    max: 1500,
    step: 1,
    value: 500,
    create: function() {
      handle.val( $( this ).slider( "value" ) );
    },
    slide: function( event, ui ) {
      handle.val( ui.value );
    }
  });

  $( "#calc-sum" ).on( "keydown", function() {
    $('#calc-slider').slider("value", $(this).val());
  });

  //pass show/hide

  $('.m-input__show').on('click', function(){
    let input = $(this).parent().find('input');
    $(this).toggleClass('active');

    input.attr('type') == 'text' ? input.attr('type', 'password') : input.attr('type', 'text')
  })

  //table mousemove 

  
  const tableSticky = () => {
    const tableWrap = $('.cab-table__wrap');
    tableWrap.each(function(){
      let table = $(this).find('table');

      $(this).width() < table.width() ? table.addClass('sticky') : table.removeClass('sticky');
    })

    $(window).on('resize', function(){
      tableWrap.each(function(){
        let table = $(this).find('table');
  
        $(this).width() < table.width() ? table.addClass('sticky') : table.removeClass('sticky');
      })
    })
  }

  if($('.cab-table__wrap').length){
    tableSticky();
  }

  if($('.cab-refs-lvls__progress').length){
    const progItems = document.querySelectorAll(".cab-refs-lvls__progress");
    progItems.forEach(item => {
      let totalLength = (item.offsetWidth * 2) + (item.offsetHeight * 2); 
    
      let progressVal = item.dataset.percent;
      let backgroundPos;
      let input = (progressVal > 100) ? 100 : progressVal;
      let borderLen = (input / 100) * totalLength;
      
      if (borderLen <= item.offsetWidth) {
        backgroundPos = `background-position: ` + (-item.offsetWidth + borderLen) + `px 0px, ${item.offsetWidth - 8}px -${item.offsetHeight}px, ${item.offsetWidth}px ${item.offsetHeight - 8}px, 0px ${item.offsetHeight}px`;
        
        item.setAttribute('style', backgroundPos);
      } else if (borderLen <= (item.offsetWidth + item.offsetHeight)) {
        backgroundPos = `background-position: 0px 0px, ${item.offsetWidth - 8}px ` + (-item.offsetHeight + (borderLen - item.offsetHeight)) + `px, ${item.offsetWidth}px ${item.offsetHeight - 8}px, 0px ${item.offsetHeight}px`;
        item.setAttribute('style', backgroundPos);
      } else if (borderLen <= (item.offsetWidth * 2 + item.offsetHeight)) {
        backgroundPos = `background-position: 0px 0px, ${item.offsetWidth - 8}px 0px, ` + (item.offsetWidth - (borderLen - item.offsetWidth - item.offsetWidth)) + `px ${item.offsetHeight - 8}px, 0px ${item.offsetHeight}px`;
        item.setAttribute('style', backgroundPos);
      } else {
        backgroundPos = `background-position: 0px 0px, ${item.offsetWidth - 8}px 0px, 0px ${item.offsetHeight - 8}px, 0px ` + (item.offsetHeight - (borderLen - (item.offsetHeight * 2) - item.offsetHeight)) + 'px';
        item.setAttribute('style', backgroundPos);
      }
    })


  }

  // career links
  function scrollT(){
    if($(window).width() <= 991){
      $('.career-rank-tabs__btn').on('click', function() {
        var $element = $(this);
        var position = $element.position().left;
        $(".career-rank-tabs__wrap .nicescroll-box").getNiceScroll(0).doScrollLeft(position, '1000');

      });
    }
  }
  scrollT();
  // $(window).resize(function () {
  //   scrollT();
  // });


 //  $('.career-rank-tabs__btn').on('click', function(){
 //    let from = $(this).attr('data-tabs-btn');
 //    let to = $('.career-rank-item');
 //
 //    to.each(function(){
 //      let th = $(this);
 //
 //      if($(window).width() <= 991 && th.attr('data-tabs-item') === from){
 //        $('html').animate({scrollTop: th.offset().top - 120}, 1000);
 //        return false;
 //      }
 //    })
 // });
  // inputs pin

  $('#inputs-code input').on('input', function(e) {
    var input = $(this);
    var value = input.val().replace(/\D/g, '');
    input.val(value);

    if (value.length === 1) {
      input.next('input').focus();
    }
  });

  $('.header-lang__btn').on('click', function(){
    let toggleItem = $('.header-lang__hide');

    $(this).parents('.header-lang').toggleClass('active');

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }

    if(toggleItem.length){
      toggleItem.toggleClass('active');
    }
  })

  $(document).on('mouseup', function (e){ 
    let btn = $('.header-lang__btn');
    let modal = $('.header-lang__hide');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
        !modal.is(e.target) && modal.has(e.target).length === 0) { 
      btn.parents('.header-lang').removeClass('active');
      modal.removeClass('active');
    }
  });

  if($('.invest-table').length){
    $('.invest-table__side .invest-table__row .invest-table__title>span').each(function(i){
        let text = $(this).text();
        $('.invest-table__list .invest-table__item').each(function(){
            if($(this).find('.invest-table__content .invest-table__row:nth-child('+(i+1)+') .invest-table__check_red').length){
                $(this).find('.invest-table__content .invest-table__row:nth-child('+(i+1)+')').prepend('<div class="title title_gray">'+text+'</div>');
            }else{
                $(this).find('.invest-table__content .invest-table__row:nth-child('+(i+1)+')').prepend('<div class="title">'+text+'</div>');
            }
        
        });
    });
  }
  
  // cabinet js

  $('.cab-burger').on('click', function(){

    $(this).siblings('.nicescroll-box').delay(100).slideToggle(200);
    $(this).parents('.cab-side').toggleClass('active');

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }

  })

  $('.cab-notify').on('click', function(){
    let toggleItem = $('.cab-notify__modal');

    $(this).toggleClass('active');

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }

    if(toggleItem.length){
      toggleItem.toggleClass('active');
    }
  })

  var closeModal = (btn, modal, e) => {
    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
        !modal.is(e.target) && modal.has(e.target).length === 0) { 
      btn.removeClass('active');
      modal.removeClass('active');
    }
  }
  
  $(document).on('mouseup', function (e){ 
    closeModal($(".cab-notify"), $(".cab-notify__modal"), e);
    closeModal($(".cab-hero"), $(".cab-submenu"), e);
  });

  // hero modal

  $('.cab-hero').on('click', function(){
    let toggleItem = $('.cab-submenu');

    $(this).toggleClass('active');

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }

    if(toggleItem.length){
      toggleItem.toggleClass('active');
    }
  })

  // submenu

  $('#drop-menu .cab-submenu__item').on('click', function(){
    $(this).parent().toggleClass('active');
    $(this).siblings('.cab-submenu__drop-content').slideToggle(300);
    $(this).parent().siblings().removeClass('active').find('.cab-submenu__drop-content').slideUp(300);

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }
  })

  // custom select

  $('.custom-select__btn').on('click', function(){
    let thisSelect = $(this).parent();
    let toggleItem = thisSelect.find('.custom-select__drop');

    $(this).parent().toggleClass('active');

    if($('.nicescroll-box').length !== 0){
      setTimeout(() => {
        $(".nicescroll-box").getNiceScroll().resize();
      }, 500);
    }

    toggleItem.fadeToggle();
    $('.custom-select__drop').not(toggleItem).fadeOut();
    $('.custom-select').not(thisSelect).removeClass('active');
  })

  var customSelectDrop = (btn, modal, e) => {
    if (!btn.is(e.target) && btn.has(e.target).length === 0 && 
        !modal.is(e.target) && modal.has(e.target).length === 0) { 
      btn.parent().removeClass('active');
      modal.fadeOut();
    }
  }
  
  $(document).on('mouseup', function (e){ 
    customSelectDrop($(".custom-select__btn"), $(".custom-select__drop"), e);
  });

  var customSelectChange = (item) => {
    let content = item.html();
    let select = item.parents('.custom-select');
    let btn = select.find('.custom-select__btn');
    let drop = select.find('.custom-select__drop');

    item.addClass('active').siblings().removeClass('active');
    btn.html(content);
    select.removeClass('active');
    drop.fadeOut();
  }

  $('.custom-select__item').on('click', function(){
    customSelectChange($(this));
  })

  // sliders

  var footerCur = new Swiper('.footer-cur .swiper', {
    loop: true,
    slidesPerView: 8,
    spaceBetween: 8,
    speed: 300,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      waitForTransition: true,
    },
    breakpoints: {
      991: {
        slidesPerView: 27,
      },
      767: {
        slidesPerView: 20,
      },
      479: {
        slidesPerView: 14,
      },
    }
  });

  var roadYears = new Swiper('.road-years .swiper', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 35,
    slideToClickedSlide: true,
    allowTouchMove: false,
    speed: 300,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
      waitForTransition: true,
    },
    navigation: {
      nextEl: '.road-years__nav .swiper-button-next',
      prevEl: '.road-years__nav .swiper-button-prev',
    },
    breakpoints: {
      991: {
        slidesPerView: 11,
      },
      767: {
        slidesPerView: 6,
      },
      505: {
        slidesPerView: 4,
      },
    }
  });
  
  roadYears.on('slideChangeTransitionEnd', function(){
    roadYears.update();
  })

  var roadQ = new Swiper('.road-q .swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true
    },
    speed: 300,
  });

  roadYears.on('slideChange', function(){
    roadQ.slideTo(roadYears.realIndex + 1)
  })

  var signRoad = new Swiper('.sign-road .swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.sign-road .swiper-button-next',
      prevEl: '.sign-road .swiper-button-prev',
    },
    pagination: {
      el: '.sign-road .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    speed: 300,
  });

  var aboutReview = new Swiper('.about-review .swiper', {
    loop: true,
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.about-review .swiper-button-next',
      prevEl: '.about-review .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });

  var investDaily1 = new Swiper('#invest-daily-1 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-1 .swiper-button-next',
      prevEl: '#invest-daily-1 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily2 = new Swiper('#invest-daily-2 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-2 .swiper-button-next',
      prevEl: '#invest-daily-2 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily3 = new Swiper('#invest-daily-3 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-3 .swiper-button-next',
      prevEl: '#invest-daily-3 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily4 = new Swiper('#invest-daily-4 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-4 .swiper-button-next',
      prevEl: '#invest-daily-4 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily5 = new Swiper('#invest-daily-5 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-5 .swiper-button-next',
      prevEl: '#invest-daily-5 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily6 = new Swiper('#invest-daily-6 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-6 .swiper-button-next',
      prevEl: '#invest-daily-6 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily7 = new Swiper('#invest-daily-7 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-7 .swiper-button-next',
      prevEl: '#invest-daily-7 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily8 = new Swiper('#invest-daily-8 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-8 .swiper-button-next',
      prevEl: '#invest-daily-8 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily9 = new Swiper('#invest-daily-9 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-9 .swiper-button-next',
      prevEl: '#invest-daily-9 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investDaily10 = new Swiper('#invest-daily-10 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-daily-10 .swiper-button-next',
      prevEl: '#invest-daily-10 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly1 = new Swiper('#invest-weekly-1 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-1 .swiper-button-next',
      prevEl: '#invest-weekly-1 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly2 = new Swiper('#invest-weekly-2 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-2 .swiper-button-next',
      prevEl: '#invest-weekly-2 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly3 = new Swiper('#invest-weekly-3 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-3 .swiper-button-next',
      prevEl: '#invest-weekly-3 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly4 = new Swiper('#invest-weekly-4 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-4 .swiper-button-next',
      prevEl: '#invest-weekly-4 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly5 = new Swiper('#invest-weekly-5 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-5 .swiper-button-next',
      prevEl: '#invest-weekly-5 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly6 = new Swiper('#invest-weekly-6 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-6 .swiper-button-next',
      prevEl: '#invest-weekly-6 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly7 = new Swiper('#invest-weekly-7 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-7 .swiper-button-next',
      prevEl: '#invest-weekly-7 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly8 = new Swiper('#invest-weekly-8 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-8 .swiper-button-next',
      prevEl: '#invest-weekly-8 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly9 = new Swiper('#invest-weekly-9 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-9 .swiper-button-next',
      prevEl: '#invest-weekly-9 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });
  var investWeekly10 = new Swiper('#invest-weekly-10 .swiper', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '#invest-weekly-10 .swiper-button-next',
      prevEl: '#invest-weekly-10 .swiper-button-prev',
    },
    speed: 300,
    breakpoints: {
      767: {
        slidesPerView: 10,
        
      }
    }
  });

  $('.footer-lang').click(function () {
    $(this).toggleClass('open');
  });
  $(document).on('click', function(event) {
    if (!$(event.target).closest('.footer-lang').length) {
      $('.footer-lang').removeClass('open');
    }
  });

})();
