define(['jquery', 'underscore', 'backbone', 'nestService', 'text!templates/device/device.html'],
    function($, _, Backbone, nestService, deviceTemplate) {
    var ListView = Backbone.View.extend({
        el: $("#page"),
        render: function() {
            var that = this;
            nestService.tryAuthorise()
                .done(function(){
                    nestService.getHomeData().done(function(homeData){
                        var template = _.template(deviceTemplate, {
                            devices: homeData
                        });
                        that.$el.html(template);
                    }).fail(function(message) {
                        alert(message);
                    });

                })
                .fail(function(){
                    alert('Failed to authorize. Please check Nest token.');
                });
        }
    });
    return ListView;
});