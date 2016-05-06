define(['jquery', 'underscore', 'backbone', 'nestService', 'text!templates/token/token.html'], function($, _, Backbone, nestService, tokenTemplate) {
    var DeviceView = Backbone.View.extend({
        el: $("#page"),
        render: function() {
            var that = this;
            var template = _.template(tokenTemplate, {
                token: nestService.getToken()
            });
            that.$el.html(template);
            that.$el.find('input').on('keyup', function(e){
                that.$el.trigger('newToken', e.target.value);
            });
            that.$el.find('input').on('change', function(e){
                that.$el.trigger('newToken', e.target.value);
            });
        }
    });
    return DeviceView;
});