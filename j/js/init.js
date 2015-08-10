$(document).ready(function() {

	$('.wow').removeClass('animated');

  var h = $(window).height();
	var w = $(window).width();
	var pwh = $('.wrapper').height() / 2;

	var PW = h - 60;
  $('.plashkaWrap').css('height', PW);
	$('.plashka').height(pwh);

  if(w <= 767) {
    $('.mobile_animation').addClass('wow');
    $('.mobile_animation').removeClass('mobile_animation');
    $('.slinky').height(h - 60);
    $('.plashkaWrap').height(h - 60);

  }else{
    $('.slinky').height(h - 60);
    $('.plashkaWrap').height(h - 60);

    // var PVarr = [PVheaders];

    // var PVheaders = $('.slinky .section').each(function(){
    //   $(this).find('.header').height();
    // });

    // console.log(PVheaders);
    // $('#pv .slinky .section.no-scroll').css('height', '200%');
  }

  // SLINKY
    var outHeight = 0;
    $('.header').each(function () {
        outHeight += $(this).outerHeight() * 0.7;
    });

    // $('.section').first().css('height', $(window).outerHeight() - outHeight - 20);
    // $('.slinky').slinky();

    var outHeight2 = 0;
    var outHeight3 = 0;
    $('#pv .header').each(function () {
        outHeight3 = outHeight3 + $(this).height() / 2;
    });
    $('#pv .section').first().css('height', $('#pv').outerHeight() - outHeight3);

    $('#mf .header').each(function () {
        outHeight2 = outHeight2 + $(this).height() / 2;
    });
    $('#mf .section').first().css('height', $('#mf').outerHeight() - outHeight2);

    $('.slinky').slinky();

    $(".section > .header").on('click', function () {
        var section = $(this).parent().not('.no-scroll');
        var sections = [];
        var selectSections = section.prevAll('.section');
        for (var i = selectSections.length; i > 0; i--) {
            var sec = $(selectSections[i - 1]);
            var secHeader = sec.find('.header');
            if (secHeader.inlineStyle("position") == "absolute"
                    && secHeader.inlineStyle("top").length == 0) {
                sections.push(sec);
            }
        }
        sections.push(section);

        var scroller = $('.nav');
        for (var j = 0; j < sections.length; j++) {
            if (sections[j] == undefined) {
                return;
            }

            scroller.scrollTo(sections[j], {duration: 200, offsetTop: 0}, function () {
                section.scroll();
            });
        }
    });

    $.fn.scrollTo = function (target, options, callback) {
        if (typeof options == 'function' && arguments.length == 2) {
            callback = options;
            options = target;
        }
        var settings = $.extend({
            scrollTarget: target,
            offsetTop: 50,
            duration: 500,
            easing: 'swing'
        }, options);
        return this.each(function () {
            var scrollPane = $(this);
            var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
            var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
            scrollPane.animate({scrollTop: scrollY}, parseInt(settings.duration), settings.easing, function () {
                if (typeof callback == 'function') {
                    callback.call(this);
                }
            });
        });
    }

    $.fn.inlineStyle = function (prop) {
        return this.prop("style")[$.camelCase(prop)];
    };
});


var h = $(window).height();
console.log(h);
var pwh = $('.wrapper').height() / 2;

$('.slinky').height(h - 60);
$('.plashkaWrap').height(h - 60);
$('.plashka').height(pwh);

(function($) {
  $(window).load(function() {
    $(".sidebar .inner").mCustomScrollbar({
      axis: "yx",
      theme: "minimal-dark",
      scrollbarPosition: "outside",
      autoHideScrollbar: false
    });

    $('.isi-scroll').mCustomScrollbar("scrollTo",".ankor",{
      timeout: 3500
    });
  });
})(jQuery);

// $('#pv').on('click', function(){
// 	$(this).addClass('this');
//   $('body').addClass('pv_opened');
//   $('.wrapper').height(h - 60);
// });

// $('#pv').on('click', function(){
//   $(this).attr('class','plashkaWrap'+' '+'this');
//   $('body').attr('class','pv_opened');
//   // $('body').addClass('pv_opened');
//   $('.wrapper').height(h - 60);
// });

function addclass() {
  $('div.plashkaWrap').addClass('this');
  $('body').addClass('pv_opened');
  $('div.wrapper').height(h - 60);
}

function addclass2() {
  $('div#mf').addClass('this');
  $('body').addClass('mf_opened');
  $('div.wrapper').height(h - 60);
}

function addclassBody() {
  $('div.plashkaWrap').removeClass('this');
  $('body').removeClass('pv_opened');
  $('body').removeClass('mf_opened');
  $('div.wrapper').height('34%');
}


// $('#mf').on('click', function(){
// 	$(this).addClass('this');
// 	$('body').addClass('mf_opened');
//   $('.wrapper').height(h - 60);
// });

// $('.logo').on('click', function(){
// 	$('body').removeClass('pv_opened');
// 	$('body').removeClass('mf_opened');
// 	$('.plashkaWrap').removeClass('this');
//   $('.wrapper').height('34%');
// });

