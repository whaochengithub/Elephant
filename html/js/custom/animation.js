/* ========================================================================
 * Elephant: animation.js v1.4.0
 * http://demo.madebytilde.com/elephant/
 * ======================================================================== */
(function($) {
  'use strict';

  function animationEnd() {
    var el = document.createElement('bootstrap');

    var animationsEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      msAnimation: 'MSAnimationEnd',
      OAnimation: 'oanimationend',
      animation: 'animationend'
    };

    for (var name in animationsEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: animationsEndEventNames[name]
        };
      }
    }

    return false;
  }

  $.fn.emulateAnimationEnd = function(duration) {
    var $el  = this,
      called = false;

    $(this).one('bsAnimationEnd', function(evt) {
      called = true;
    });

    var callback = function() {
      if (!called) $($el).trigger($.support.animation.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function() {
    $.support.animation = animationEnd();

    if (!$.support.animation) return;

    $.event.special.bsAnimationEnd = {
      bindType: $.support.animation.end,
      delegateType: $.support.animation.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) {
          return e.handleObj.handler.apply(this, arguments);
        }
      }
    };
  });

})(jQuery);
