require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        bootstrap: 'bootstrap',
        firebase: 'libs/firebase/firebase',
        nestService: 'service/nestService'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery': {
            exports: '$'
        },
		'bootstrap': {
            deps: ['jquery'],
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'firebase': {
            exports: 'firebase'
        },
        'nestService': {
            exports: 'nestService'
        }
    }
});
require(['app'], function(App) {
    App.initialize();
});