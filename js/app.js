define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'nestService'
], function ($, _, Backbone, Router) {
    var initialize = function () {
        Router.initialize();
        //TODO: use navigation tool
        $('ul.navbar-nav li').click(function() {
            var clickedLi = $(this);
            clickedLi.addClass('active');
            $.each($(clickedLi).parent().find('li'), function(i, navLi){
                if (navLi != clickedLi) {
                    $(navLi).removeClass('active');
                }
            });
        });
    };

    return {
        initialize: initialize
    };
});
