/* ========================================================================
 * Elephant: validate.material.js v1.4.0
 * http://demo.madebytilde.com/elephant/
 * ======================================================================== */
(function($) {
  $.validator.setDefaults({
    errorElement: 'span',
    errorClass: 'has-error',
    validClass: 'has-success',
    errorPlacement: function($error, $element) {
      var $parent = $element.parents('.md-form-group').last();

      $error.addClass('md-help-block')
        .appendTo($parent);
    },
    highlight: function(element, errorClass, validClass) {
      $(element)
        .closest('.md-form-group')
          .addClass(errorClass).removeClass(validClass)

        // Hide help text in order to make room for error message
        .find('.md-help-block').not('.has-error')
          .hide();
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element)
        .closest('.md-form-group')
          .addClass(validClass).removeClass(errorClass)

        // Show help text since there is no error message
        .find('.md-help-block').not('.has-error')
          .show();
    }
  });

  $('[data-toggle="md-validator"]').each(function() {
    var $form = $(this),
      options = $form.data();

    $form.validate(options);
  });

})(jQuery);
