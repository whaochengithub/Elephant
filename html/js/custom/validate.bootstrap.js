/* ========================================================================
 * Elephant: validate.bootstrap.js v1.4.0
 * http://demo.madebytilde.com/elephant/
 * ======================================================================== */
(function($) {
  $.validator.setDefaults({
    errorElement: 'small',
    errorClass: 'has-error',
    errorIcon: 'icon-times',
    validClass: 'has-success',
    validIcon: 'icon-check',
    errorPlacement: function($error, $element) {
      var $form = $element.closest('form'),
        $parent = $element.parents('.form-group').last();

      if ($form.hasClass('form-horizontal')) {
        $parent = $element.parent();
      }

      $error.addClass('help-block')
        .appendTo($parent);
    },
    highlight: function(element, errorClass, validClass) {
      var options = $.extend({}, this.settings),
          $parent = $(element).closest('.form-group');

      if ($parent.hasClass('has-feedback')) {
        var $icon = $parent.find('.form-control-feedback').children();

        $icon.addClass(options.errorIcon)
          .removeClass(options.validIcon);
      }

      $parent
        .addClass(errorClass).removeClass(validClass)

        // Hide help text in order to create space for the error message
        .find('.help-block').not('.has-error')
          .hide();
    },
    unhighlight: function(element, errorClass, validClass) {
      var options = $.extend({}, this.settings),
          $parent = $(element).closest('.form-group');

      if ($parent.hasClass('has-feedback')) {
        var $icon = $parent.find('.form-control-feedback').children();

        $icon.addClass(options.validIcon)
          .removeClass(options.errorIcon);
      }

      $parent
        .addClass(validClass).removeClass(errorClass)

        // Show help text since there is no error message
        .find('.help-block').not('.has-error')
          .show();
    }
  });

  $('[data-toggle="validator"]').each(function() {
    var $form = $(this),
      options = $form.data();

    $form.validate(options);
  });

})(jQuery);
