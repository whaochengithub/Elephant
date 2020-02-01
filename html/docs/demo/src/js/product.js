(function($) {
  'use strict';

  var Product = {
    Constants: {
      FLEXSLIDER_ANIMATION: 'slide',
      FLEXSLIDER_CONTROL_NAV: 'thumbnails',
      FLEXSLIDER_DIRECTION_NAV: false
    },
    CssClasses: {
      FLEXSLIDER: 'flexslider'
    },
    init: function() {
      this.$productSlider = $('.' + this.CssClasses.FLEXSLIDER);

      this.createProductSlider();
    },
    createProductSlider: function() {
      var options = this.getFlexsliderOptions();
      this.$productSlider.flexslider(options);
    },
    getCreateOptions: function(prefix, callback) {
      var regex = new RegExp('^' + prefix + '(_)?', 'i'),
        options = {};

      $.each(this, function(prop, obj) {
        if (!$.isPlainObject(obj)) return;

        $.each(obj, function(key, val) {
          if (regex.test(key)) {
            key = key.replace(regex, '').replace(/_/g, '-');
            key = $.camelCase(key.toLowerCase());

            (callback && callback(options, prop, key, val)) ||
            (options[key] = val);
          }
        });
      });

      return options;
    },
    getFlexsliderOptions: function() {
      return this.getCreateOptions('flexslider');
    }
  };

  Product.init();

})(jQuery);
