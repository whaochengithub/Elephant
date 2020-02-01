/* ========================================================================
 * Elephant: input.js v1.4.0
 * http://demo.madebytilde.com/elephant/
 * ======================================================================== */
(function($) {
  'use strict';

  // INPUT CLASS DEFINITION
  // ======================

  var Input = function(element) {
    this.$element = $(element);
    this.$wrapper = null;

    // Initialize input
    this.init();
  };

  Input.VERSION = '1.0.0';

  Input.prototype.checkValue = function() {
    var hasValue = (this.$element.val() || '').length;
    this.$wrapper.toggleClass('has-value', !!hasValue);
  };

  Input.prototype.checkDisabled = function() {
    var isDisabled = this.$element.is(':disabled');
    this.$wrapper.toggleClass('is-disabled', !!isDisabled);
  };

  Input.prototype.updateCssClasses = function() {
    this.checkValue();
    this.checkDisabled();
  };

  Input.prototype._handleInputFocus = function() {
    this.$wrapper.addClass('is-focused');
  };

  Input.prototype._handleInputBlur = function() {
    this.$wrapper.removeClass('is-focused');
  };

  Input.prototype.init = function() {
    this.$wrapper = this.$element.closest('.md-form-group');

    this.$element.on('change.bs.input', $.proxy(this.updateCssClasses, this))
      .on('focus.bs.input', $.proxy(this._handleInputFocus, this))
      .on('blur.bs.input', $.proxy(this._handleInputBlur, this));

    this.updateCssClasses();
  };

  // INPUT PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function() {
      var $this = $(this),
           data = $this.data('bs.input');

      if (!data) $this.data('bs.input', (data = new Input(this)));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.input;

  $.fn.input = Plugin;
  $.fn.input.Constructor = Input;


  // INPUT NO CONFLICT
  // ==================

  $.fn.input.noConflict = function() {
    $.fn.input = old;
    return this;
  };


  // INPUT DATA-API
  // ===============

  $('.md-form-control').each(function() {
    Plugin.call($(this));
  });

})(jQuery);
