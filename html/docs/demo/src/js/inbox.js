(function($) {
  "use strict";

  var Mail = {
    Constants: {
      STICKY_DIRECTION: 'down',
      STICKY_WRAPPER: false,
    },
    CssClasses: {
      MAIL_TOOLBAR: 'mail-toolbar',
      MAIL_LIST: 'mail-list',
      MAIL_LIST_ITEM: 'mail-list-item',
      MAIL_LIST_LINK: 'mail-list-link',
      MAIL_CONTENT: 'mail-content',
      STICKY_STUCK: 'sticky',
      ACTIVE: 'active',
      HOVER: 'hover',
      SELECTED: 'selected'
    },
    init: function() {
      this.$window       = $(window);
      this.$toolbars     = $('.' + this.CssClasses.MAIL_TOOLBAR);
      this.$mainToolbar  = this.$toolbars.first();
      this.$list         = $('.' + this.CssClasses.MAIL_LIST);
      this.$items        = $('.' + this.CssClasses.MAIL_LIST_ITEM);
      this.$checkboxes   = this.$items.find(':checkbox');
      this.$links        = $('.' + this.CssClasses.MAIL_LIST_LINK);
      this.$content      = $('.' + this.CssClasses.MAIL_CONTENT);
      this.$backBtns     = this.$content.find('[data-toggle="tab"]');
      this.stickyToolbar = null;

      this.createStickyToolbar()
        .bindEvents();
    },
    bindEvents: function() {
      this.$items.on('mouseenter.e.mail', this.handleItemMouseEnter.bind(this));
      this.$items.on('mouseleave.e.mail', this.handleItemMouseLeave.bind(this));

      this.$links.on('click.e.mail', this.handleLinkClick.bind(this));
      this.$links.add(this.$backBtns).on('shown.bs.tab', this.handleTabShown.bind(this));

      this.$checkboxes.on('change.e.mail', this.handleCheckboxChange.bind(this));
    },
    handleItemMouseEnter: function(evt) {
      $(evt.currentTarget).addClass(this.CssClasses.HOVER);
    },
    handleItemMouseLeave: function(evt) {
      $(evt.currentTarget).removeClass(this.CssClasses.HOVER);
    },
    handleCheckboxChange: function(evt) {
      var $checkbox = $(evt.currentTarget);
      this.selectItem($checkbox);

      this.toggleToolbar();
    },
    handleLinkClick: function(evt) {
      var $link = $(evt.currentTarget),
          $item = $link.closest('.' + this.CssClasses.MAIL_LIST_ITEM);

      if ($item.hasClass(this.CssClasses.ACTIVE))
        $item.removeClass(this.CssClasses.ACTIVE);

      this.rememberScrollbarPos();
    },
    handleTabShown: function(evt) {
      var $trigger  = $(evt.currentTarget),
        $activeLink = this.getActiveLink();

      if (!$trigger.is($activeLink)) {
        this.createStickyToolbar();
        this.scrollTo(this.rememberedScrollbarPos());
      } else {
        this.destroyStickyToolbar();
        this.scrollTo(0);
      }
    },
    selectItem: function($checkbox) {
      var $item = $checkbox.closest('.' + this.CssClasses.MAIL_LIST_ITEM),
          state = $checkbox.is(':checked');

      $item.toggleClass(this.CssClasses.SELECTED, state);
    },
    rememberScrollbarPos: function() {
      this.ypos = this.$window.scrollTop();
    },
    rememberedScrollbarPos: function() {
      return this.ypos;
    },
    getActiveItem: function() {
      return this.$items.filter('.' + this.CssClasses.ACTIVE);
    },
    getActiveLink: function() {
      var $activeItem = this.getActiveItem();
      return $activeItem.find('[data-toggle="tab"]');
    },
    getSelectedItems: function() {
      return this.$items.filter('.' + this.CssClasses.SELECTED);
    },
    hasSelectedItems: function() {
      return !!this.getSelectedItems().length;
    },
    scrollTo: function(ypos) {
      this.$window.scrollTop(ypos);
    },
    toggleToolbar: function() {
      var state = this.hasSelectedItems();
      this.$mainToolbar.collapse(state ? 'show' : 'hide');
    },
    createStickyToolbar: function() {
      var options = $.extend({},
        this.getStickyOptions(), {
          element: this.$mainToolbar[0]
        });

      this.stickyToolbar = new Waypoint.Sticky(options);
      return this;
    },
    destroyStickyToolbar: function() {
      this.stickyToolbar.destroy();
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
    getStickyOptions: function() {
      return this.getCreateOptions('sticky',
        function(options, prop, key, val) {
          key = prop === 'CssClasses' ? key + 'Class' : key;
          return (options[key] = val);
        });
    },
  };

  Mail.init();

})(jQuery);
