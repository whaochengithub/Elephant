(function($) {
  "use strict";

  var Compose = {
    Constants: {
      TOOLTIP_CONTAINER: 'body',
      TOOLTIP_PLACEMENT: 'bottom',
      TOOLTIP_TRIGGER: 'hover',
      WYSIWYG_SELECTION_COLOR: 'darkgrey'
    },
    CssClasses: {
      COMPOSE_EDITOR: 'compose-editor',
      COMPOSE_TOOLBAR: 'compose-toolbar',
      WYSIWYG_ACTIVE_TOOLBAR: 'btn-default',
      BUTTON: 'btn'
    },
    init: function() {
      this.$editor  = $('.' + this.CssClasses.COMPOSE_EDITOR);
      this.$toolbar = $('.' + this.CssClasses.COMPOSE_TOOLBAR);
      this.$btns    = this.$toolbar.find('.' + this.CssClasses.BUTTON);

      this.addEditorTo(this.$editor);
      this.addTooltipTo(this.$btns);

      this.bindEvents();
    },
    bindEvents: function() {
      // None for now.
    },
    addEditorTo: function($el) {
      var options = this.getWysiwygOptions();
      $el.wysiwyg(options);
    },
    addTooltipTo: function($el) {
      var options = this.getTooltipOptions();
      $el.tooltip(options);
    },
    getWysiwygOptions: function() {
      return this.getCreateOptions('sticky',
        function(options, prop, key, val) {
          key = prop === 'CssClasses' ? key + 'Class' : key;
          return (options[key] = val);
        });
    },
    getTooltipOptions: function() {
      return this.getCreateOptions('tooltip');
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
    }
  };

  Compose.init();

})(jQuery);
