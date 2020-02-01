/*!
 * Elephant v1.2.0 (http://demo.madebytilde.com/elephant)
 * Copyright 2007-2018 Made By Tilde
 */
module.exports = function(grunt) {
  'use strict';

  grunt.util.linefeed = '\n';

  // Time how long tasks take
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    htmllint: 'grunt-html'
  });

  // Bower dependencies
  var dependencies = require('wiredep')();

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * Elephant v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2007-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' */\n',

    jqueryCheck: 'if (typeof jQuery === \'undefined\') {\n' +
      '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\')\n' +
      '}\n\n' +
      '+function ($) {\n' +
      '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')\n' +
      '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {\n' +
      '    throw new Error(\'Bootstrap\\\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0\')\n' +
      '  }\n' +
      '}(jQuery);\n\n',

    // Validate JS files with ESLint
    eslint: {
      target: [
        'Gruntfile.js',
        'js/**/*.js'
      ]
    },

    // Compile ES6 with Babel
    babel: {
      options: {
        presets: ['es2015']
      },
      dist: {
        files: [{
          cwd: 'js',
          dest: 'dist/js',
          dot: true,
          expand: true,
          ext: '.js',
          extDot: 'last',
          src: [
            '**/*.js',
            '!bootstrap/*',
            '!custom/*'
          ]
        }]
      }
    },

    // Concatenate JS files
    concat: {
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.js': [
            'js/bootstrap/transition.js',
            'js/bootstrap/alert.js',
            'js/bootstrap/button.js',
            'js/bootstrap/carousel.js',
            'js/bootstrap/collapse.js',
            'js/bootstrap/dropdown.js',
            'js/bootstrap/modal.js',
            'js/bootstrap/tooltip.js',
            'js/bootstrap/popover.js',
            'js/bootstrap/scrollspy.js',
            'js/bootstrap/tab.js',
            'js/bootstrap/affix.js',

            'js/custom/animation.js',
            'js/custom/input.js',
            'js/custom/chart.js',
            'js/custom/slider.js',
            'js/custom/validate.bootstrap.js',
            'js/custom/validate.material.js'
          ],
          'dist/js/vendor.js': dependencies.js
        }
      }
    },

    // Minify JS files
    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: /^!|@preserve|@license|@cc_on/i
      },
      dist: {
        files: [{
          cwd: 'dist/js',
          dest: 'dist/js',
          expand: true,
          ext: '.min.js',
          extDot: 'last',
          src: [
            '**/*.js',
            '!**/*.min.js'
          ]
        }]
      }
    },

    // Import bower components into the vendor.scss file
    wiredep: {
      sass: {
        src: ['scss/vendor.scss'],
        ignorePath: /^(\.\.\/)+/
      }
    },

    // Compile Sass to CSS
    sass: {
      options: {
        includePaths: ['scss/'],
        outputStyle: 'expanded',
        precision: 6,
        sourceComments: false,
        sourceMap: false
      },
      dist: {
        files: [{
          cwd: 'scss',
          dest: 'dist/css',
          expand: true,
          ext: '.css',
          src: '**/*.scss'
        }]
      }
    },

    // Transform CSS
    postcss: {
      options: {
        map: false,
        processors: [
          // Inline @import rules content
          require('postcss-import')({
            path: '.'
          }),

          // Inline SVG and customize its styles
          require('postcss-inline-svg')({
            path: 'img'
          }),

          // Add vendor prefixed styles
          require('autoprefixer')({
            browsers: [
              'Chrome >= 35',
              'Edge >= 12',
              'Explorer >= 9',
              'iOS >= 8',
              'Safari >= 8',
              'Android 2.3',
              'Android >= 4',
              'Opera >= 12'
            ]
          }),

          // Fix Bootstrap crazy things e.g ($panel-border-radius - 1)
          function(css) {
            css.walkDecls(/radius/, function(decl) {
              if ((/-1/g).test(decl.value)) {
                decl.value = 0;
              }
            });
          }
        ]
      },
      dist: {
        files: [{
          cwd: 'dist/css',
          dest: 'dist/css',
          expand: true,
          src: '**/*.css'
        }]
      }
    },

    // Compress CSS files
    cssmin: {
      options: {
        advanced: false,
        compatibility: 'ie9',
        keepSpecialComments: '*',
        sourceMap: false
      },
      dist: {
        files: [{
          cwd: 'dist/css',
          dest: 'dist/css',
          expand: true,
          ext: '.min.css',
          src: [
            '**/*.css',
            '!**/*.min.css'
          ]
        }]
      }
    },

    // Minify images
    imagemin: {
      dist: {
        files: [{
          cwd: 'dist/img',
          dest: 'dist/img',
          expand: true,
          src: '**/*.{gif,jpeg,jpg,png}'
        }]
      }
    },

    // Minify SVG files
    svgmin: {
      dist: {
        files: [{
          cwd: 'dist/img',
          dest: 'dist/img',
          expand: true,
          src: '**/*.svg'
        }]
      }
    },

    // Process html files at build time
    processhtml: {
      dist: {
        files: [{
          cwd: 'dist',
          dest: 'dist',
          expand: true,
          src: '**/*.html'
        }]
      }
    },

    // Minify HTML files
    htmlmin: {
      options: {
        collapseWhitespace: false,
        preserveLineBreaks: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      dist: {
        files: [{
          cwd: 'dist',
          dest: 'dist',
          expand: true,
          src: '**/*.html'
        }]
      }
    },

    // Validate HTML files
    htmllint: {
      options: {
        ignore: [
          'Attribute "color" not allowed on element "link" at this point.',
          'The "cellspacing" attribute on the “table” element is obsolete. Use CSS instead.',
          'The "width" attribute on the "table" element is obsolete. Use CSS instead.'
        ]
      },
      dist: {
        files: [{
          cwd: 'dist',
          dest: 'dist',
          expand: true,
          src: [
            '**/*.html',
            '!header.html',
            '!sidebar.html',
            '!theme-panel.html',
            '!footer.html'
          ]
        }]
      }
    },

    // Format HTML files
    prettify: {
      options: {
        indent: 2,
        unformatted: [
          'a',
          'code',
          'pre',
          'script'
        ]
      },
      dist: {
        files: [{
          cwd: 'dist',
          dest: 'dist',
          expand: true,
          src: '**/*.html'
        }]
      }
    },

    // Delete all files and folders
    clean: {
      dist: 'dist/*'
    },

    // Copy required files
    copy: {
      dist: {
        files: [{
          cwd: '.',
          dest: 'dist',
          expand: true,
          src: [
            '*.html',
            '*.{ico,png,svg,txt}',
            'manifest.json',
            'browserconfig.xml',
            'fonts/**/*.*',
            'img/**/*.*'
          ]
        }]
      }
    },

    // Compress files and folders
    compress: {
      options: {
        archive: '<%= pkg.name %>-<%= pkg.version %>.zip',
        level: 9,
        mode: 'zip',
        pretty: true
      },
      dist: {
        files: [{
          cwd: 'dist/',
          dest: '.',
          expand: true,
          src: ['**']
        }]
      }
    },

    // Keeping multiple browsers in sync
    browserSync: {
      livereload: {
        options: {
          files: [
            '**/*.html',
            'dist/css/**/*.css',
            'dist/js/**/*.js'
          ],
          notify: false,
          port: 9000,
          watchTask: true,
          server: {
            baseDir: ['.', 'dist']
          }
        }
      }
    },

    // Compile modified files only
    newer: {
      options: {
        override: function(details, include) {
          include(true);
        }
      }
    },

    // Run tasks whenever watched files change
    watch: {
      options: {
        nospawn: true
      },
      babel: {
        files: ['js/**/*.js'],
        tasks: ['newer:babel']
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['newer:sass', 'newer:postcss']
      }
    }
  });

  grunt.registerTask('server', [
    'clean',
    'babel',
    'concat',
    'wiredep',
    'sass',
    'postcss',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'babel',
    'concat',
    'uglify',
    'wiredep',
    'sass',
    'postcss',
    'cssmin',
    'copy',
    'imagemin',
    'svgmin',
    'processhtml',
    'htmlmin',
    'prettify',
    'htmllint',
    'compress'
  ]);

};
