/* ========================================================================
 * Elephant: chart.js v1.4.0
 * http://demo.madebytilde.com/elephant/
 * ======================================================================== */
(function($) {
  'use strict';

  function chart(element, options) {
    var $element = $(element),
        instance = $element.data('bs.chart');

    if (instance) return instance;

    var config = {};

    config.type = options.type || options.chart;
    config.type = $.camelCase(config.type);

    set(config, 'data.labels', options.labels);
    set(config, 'data.datasets',
      $.map(options.values, function(value) {
        if (~$.inArray('points', options.hide)) {
          value.pointBackgroundColor = 'transparent';
          value.pointBorderColor = 'transparent';
        }
        return value;
      }));

    set(config, 'options', options);
    set(config, 'paths', {
      // Hide gridlines, ticks, and labels
      scalesX: 'scales.xAxes[0].display',
      scalesY: 'scales.yAxes[0].display',

      // Hide gridlines only
      gridLinesX: 'scales.xAxes[0].gridLines.display',
      gridLinesY: 'scales.yAxes[0].gridLines.display',

      // Hide tooltips or legend
      tooltips: 'tooltips.enabled',
      legend: 'legend.display'
    });

    $.each(options.hide, function(idx, el) {
      config.paths[el] && config.paths[el].length &&
      set(config.options, config.paths[el], false);
    });

    instance = new Chart($element, config);
    $element.data('bs.chart', instance);
  }

  function parsePath(path, seperator) {
    return path.replace(/\[/g, '.').replace(/]/g, '')
      .split(seperator);
  }

  function set(object, path, value) {
    var keys = parsePath(path, '.'),
      key = keys.shift();

    if (keys.length === 0) {
      return (object[key] = value);
    }

    // If next key is numeric initialize as array
    var isIndex = typeof keys[0] === 'number';
    object[key] || (object[key] = isIndex ? [] : {});

    set(object[key], keys.join('.'), value);
  }

  $.fn.chart = function(options) {
    var returnValue = this;

    this.each(function() {
      var instance = chart(this, options);

      if (options === 'instance') {
        returnValue = instance;
        return false;
      }
    });

    return returnValue;
  };

  $('[data-chart]').each(function() {
    var $this = $(this),
        data  = $this.data();

    $this.chart(data);
  });

})(jQuery);
