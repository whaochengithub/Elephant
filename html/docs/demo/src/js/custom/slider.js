/* ========================================================================
 * Elephant: slider.js v1.4.0
 * http://demo.madebytilde.com/elephant/
 * ======================================================================== */
(function($) {
  'use strict';

  var defaults = {
    connect: 'lower',
    cssPrefix: 'slider-',
    max: 100,
    min: 0,
    range: {},
    slider: 'default',
    start: 0
  };

  function slider(element, options) {
    var $element = $(element),
        instance = $element.data('bs.slider');

    if (instance) return instance;

    options = $.extend({}, defaults, options);

    if ($.isNumeric(options.start)) {
      options.start = [options.start];
    }

    if ($.isEmptyObject(options.range)) {
      options.range = {
        max: options.max,
        min: options.min
      };
    }

    $element.addClass([
      options.cssPrefix.replace(/-$/, ''),
      options.cssPrefix.concat(options.slider)
    ].join(' '));

    instance = noUiSlider.create(element, options);
    $element.data('bs.slider', instance);
  }

  $.fn.slider = function(options) {
    var returnValue = this;

    this.each(function() {
      var instance = slider(this, options);

      if (options === 'instance') {
        returnValue = instance;
        return false;
      }
    });

    return returnValue;
  };

  $('[data-slider]').each(function() {
    var $this = $(this),
        data  = $this.data();

    $this.slider(data);

    if (data.target && data.target.length) {
      var instance = $this.slider('instance'),
          $target  = $(data.target.toString());

      instance.on('update', function(values, idx) {
        $target.eq(idx)[$target.eq(idx).is('input') ?
          'val' : 'text'](values[idx]);
      });
    }
  });

})(jQuery);
