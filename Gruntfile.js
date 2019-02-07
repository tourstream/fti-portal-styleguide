/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GRUNT
 * The grunt wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/

module.exports = function (grunt) {

  var path = require('path'),
      argv = require('minimist')(process.argv.slice(2));

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  /******************************************************
   * PATTERN LAB CONFIGURATION
  ******************************************************/

  //read all paths from our namespaced config file
  var config = require('./patternlab-config.json'),
    pl = require('patternlab-node')(config);

  function paths() {
    return config.paths;
  }

  function getConfiguredCleanOption() {
    return config.cleanPublic;
  }

  grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {

    if (arguments.length === 0) {
      pl.build(function(){}, getConfiguredCleanOption());
    }

    if (arg && arg === 'version') {
      pl.version();
    }

    if (arg && arg === "patternsonly") {
      pl.patternsonly(function(){},getConfiguredCleanOption());
    }

    if (arg && arg === "help") {
      pl.help();
    }

    if (arg && arg === "liststarterkits") {
      pl.liststarterkits();
    }

    if (arg && arg === "loadstarterkit") {
      pl.loadstarterkit(argv.kit, argv.clean);
    }

    if (arg && (arg !== "version" && arg !== "patternsonly" && arg !== "help" && arg !== "liststarterkits" && arg !== "loadstarterkit")) {
      pl.help();
    }
  });


  grunt.initConfig({
    /******************************************************
     * ALL ABOUT SCSS to CSS incl vendor prefixing stuff
     ******************************************************/
    stylelint: {
      src: [
        path.resolve(paths().source.scss + '**/*.scss')
      ]
    },
    sass: {
      options: {
        // sourceMap: false,
        // sourceComments: false,
        // outputStyle: 'compressed',
        includePaths: ['node_modules/bootstrap/scss']
      },
      production: {
        files: {
          './source/css/style.css': path.resolve(paths().source.scss + 'style.scss'),
          './source/css/style-qs-isolated.css': path.resolve(paths().source.scss + 'style-qs-isolated.scss'),
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: config.browsers
      },
      our_single_file: {
        src: path.resolve(paths().source.css + 'style.css'),
        dest: path.resolve(paths().source.css + 'style.css')
      },
      our_single_file_isolated: {
        src: path.resolve(paths().source.css + 'style-qs-isolated.css'),
        dest: path.resolve(paths().source.css + 'style-qs-isolated.css')
      },
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './source/css/style.min.css': [path.resolve(paths().source.css + 'style.css')],
          './source/css/style-qs-isolated.min.css': [path.resolve(paths().source.css + 'style-qs-isolated.css')],
        }
      }
    },
    compress: {
      css: {
        options: {
          mode: 'gzip'
        },
        files: [{
          expand: true,
          src: ['./source/css/style.min.css', './source/css/style-qs-isolated.min.css'],
          dest: './',
          ext: '.min.gz.css'
        }]
      },
      js: {
        options: {
          mode: 'gzip'
        },
        files: [{
          expand: true,
          src: ['./public/js/bundle.min.js'],
          dest: './',
          ext: '.min.gz.js'
        }]
      }
    },
    /******************************************************
     * COPY TASKS
    ******************************************************/
    copy: {
      main: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.js), src: '**/*.js', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.js), src: '**/*.js.map', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '**/*.css', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '**/*.css.map', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '**/*.css.gz', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.images), src: '**/*', dest: path.resolve(paths().public.images) },
          { expand: true, cwd: path.resolve(paths().source.fonts), src: '**/*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.root), src: 'favicon.ico', dest: path.resolve(paths().public.root) },
          { expand: true, cwd: path.resolve(paths().source.styleguide), src: ['*', '**'], dest: path.resolve(paths().public.root) },
          // TODO slightly inefficient to do this again - I am not a grunt glob master. someone fix
          // Todo It has no effect on the styleguide watcher
          { expand: true, flatten: true, cwd: path.resolve(paths().source.styleguide, 'styleguide', 'css', 'custom'), src: '*.css)', dest: path.resolve(paths().public.styleguide, 'css') }
        ]
      }
    },
    /******************************************************
     * GENERATE THE BUNDLE WITH BROWSERIFY
     ******************************************************/
    browserify: {
      dist: {
        files: { 'public/js/bundle.js' : ['public/js/main.js']}
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'public/js/bundle.min.js': ['public/js/bundle.js']
        }
      }
    },
    /******************************************************
     * SERVER AND WATCH TASKS
    ******************************************************/
    watch: {
      all: {
        files: [
          path.resolve(paths().source.scss + '**/*.scss'),
          path.resolve(paths().source.css + '**/*.css'),
          path.resolve(paths().source.styleguide + 'css/*.css'),
          path.resolve(paths().source.patterns + '**/*'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/*.js'),
          path.resolve(paths().source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    browserSync: {
      dev: {
        options: {
          middleware: [
            {
              route: "/",
              handle: function(req,res,next) {
                res.setHeader('set-cookie', 'debug=1');
                next();
              }
            }
           ],
          server:  path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [
            {
              module: 'bs-html-injector',
              options: {
                files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
              }
            }
          ],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    }
  });

  /******************************************************
   * COMPOUND TASKS
  ******************************************************/

  grunt.registerTask('default', ['patternlab', 'css', 'copy:main', 'buildjs']);
  grunt.registerTask('css', ['stylelint', 'sass', 'autoprefixer', 'cssmin', 'compress:css']);
  grunt.registerTask('buildjs', ['browserify', 'uglify', 'compress:js']);
  grunt.registerTask('patternlab:build', ['default']);
  grunt.registerTask('patternlab:watch', ['default', 'watch:all']);
  grunt.registerTask('patternlab:serve', ['default', 'browserSync', 'watch:all']);
};
