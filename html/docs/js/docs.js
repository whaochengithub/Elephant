(function($) {
  'use strict';

  var Doc = {
    Constants: {
      CUSTOM_SCROLLBAR_DISTANCE: '4px',
      CUSTOM_SCROLLBAR_HEIGHT: '100%',
      CUSTOM_SCROLLBAR_SIZE: '7px',
      CUSTOM_SCROLLBAR_WIDTH: '100%'
    },
    CssClasses: {
      LAYOUT: 'layout',
      LAYOUT_SIDEBAR: 'layout-sidebar',
      LAYOUT_CONTENT: 'layout-content',

      CUSTOM_SCROLLBAR: 'custom-scrollbar',
      CUSTOM_SCROLLBAR_BAR: 'custom-scrollbar-gripper',
      CUSTOM_SCROLLBAR_RAIL: 'custom-scrollbar-track',
      CUSTOM_SCROLLBAR_WRAPPER: 'custom-scrollable-area',

      SIDENAV: 'sidenav',
      SIDENAV_ITEM: 'sidenav-item',
      SIDENAV_LINK: 'sidenav-link'
    },
    init: function() {
      this.$customScrollbar = $('.' + this.CssClasses.CUSTOM_SCROLLBAR);
      this.$sidenavLink     = $('.' + this.CssClasses.SIDENAV_LINK);

      this.bindEvents().createCustomScrollbar();
    },
    bindEvents: function() {
      this.$sidenavLink.on('click.e.doc', this.smoothScroll);

      return this;
    },
    createCustomScrollbar: function() {
      var options = {};

      options.distance = this.Constants.CUSTOM_SCROLLBAR_DISTANCE;
      options.height = this.Constants.CUSTOM_SCROLLBAR_HEIGHT;
      options.size = this.Constants.CUSTOM_SCROLLBAR_SIZE;
      options.width = this.Constants.CUSTOM_SCROLLBAR_WIDTH;

      options.class = this.CssClasses.CUSTOM_SCROLLBAR;
      options.barClass = this.CssClasses.CUSTOM_SCROLLBAR_BAR;
      options.railClass = this.CssClasses.CUSTOM_SCROLLBAR_RAIL;
      options.wrapperClass = this.CssClasses.CUSTOM_SCROLLBAR_WRAPPER;

      this.$customScrollbar.slimScroll(options);
    },
    smoothScroll: function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    }
  };

  Doc.init();

})(jQuery);
