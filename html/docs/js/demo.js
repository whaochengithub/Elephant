(function($) {
  'use strict';

  function imageCropperBasicExample() {
    var $cropper, $cropperImg;

    $cropper = $('#demo-cropper');
    $cropper.on('change', 'input', function(evt) {
      var $this = $(this),
        name = $this.attr('name'),
        options = {};

      if ($cropperImg.data('cropper')) {
        options[name] = $this.val();

        $cropperImg.cropper('destroy')
          .cropper(options);
      }
    });

    $cropper.on('click', '[data-method]', function(evt) {
      var $this = $(this),
        data = $this.data();

      if ($cropperImg.data('cropper') && data.method) {
        $cropperImg.cropper(data.method, data.option);

        if (data.method === 'scaleX' || data.method === 'scaleY') {
          $this.data('option', -data.option);
        }
      }
    });

    $cropperImg = $('#demo-cropper-img')
    $cropperImg.cropper();
  }

  function formWizardWithValidationExample() {
    var $formWizard;

    $formWizard = $("#demo-form-wizard");
    $formWizard.validate({
      errorClass: 'has-error',
      validClass: 'has-success',
      errorPlacement: function($error, $element) {},
      highlight: function(element, errorClass, validClass) {
        $(element)
          .closest('.form-group')
          .addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element)
          .closest('.form-group')
          .addClass(validClass).removeClass(errorClass);
      }
    });

    $formWizard.bootstrapWizard({
      nextSelector: '.btn-next',
      tabClass: 'steps',
      onNext: function(tab, navigation, index) {
        return $formWizard.valid();
      },
      onTabClick: function(tab, navigation, index) {
        return $formWizard.valid();
      }
    });
  }

  function sliderWithJavaScriptExample() {
    var $slider;

    $slider = $("#demo-slider");
    $slider.slider({
      slider: 'danger',
      start: 50,
      step: 5,
      tooltips: [wNumb({
        decimals: 2,
        prefix: '$'
      })],
      pips: {
        mode: 'steps',
        filter: function filter(value, type) {
          return value % 10 ? 2 : 1;
        },
        format: wNumb({
          decimals: 2,
          prefix: '$'
        })
      }
    });
  }

  function toastNotificationsExample() {
    var $showToast, $clearToasts;

    $showToast = $('#demo-show-toast');
    $showToast.on('click', function(evt) {
      var options = {},
        messages = [
          'Toastr is a Javascript library for non-blocking notifications.',
          'Progress Bar - Visually indicate how long before a toast expires.',
          'Timeouts - Control how toastr interacts with users by setting timeouts appropriately.',
          'Animation Method - Use the jQuery show/hide method of your choice.',
          'Easings - Optionally override the animation easing to show or hide the toasts.',
          'Callbacks - Define a callback for when the toast is shown/hidden',
          'Close Button - Optionally enable a close button.'
        ];

      $(':input').each(function(index) {
        var input = $(this),
          key = input.attr('id'),
          val = input.val();

        if (input.is("input[type='checkbox']"))
          val = input.prop('checked');

        if (key && val) options[key] = val;
      });

      var title = options.title || '',
        message = options.message || messages[
          Math.floor(Math.random() * messages.length)
        ];

      toastr[options.type](message, title, options);
    });

    $clearToasts = $('#demo-clear-toasts');
    $clearToasts.click(function(evt) {
      toastr.clear();
    });
  }

  imageCropperBasicExample();
  formWizardWithValidationExample();
  sliderWithJavaScriptExample();
  toastNotificationsExample();

})(jQuery);

