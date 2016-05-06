define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var DeviceModel = Backbone.Model.extend({
        defaults: {
            type: ''
        },
        setType: function(type){
            this.type = type;
        },
        getType: function() {
            return this.type;
        },
        update: function(dataRef) {
            var that = this;
            $.each(that.changed, function(key, value){
                var path = 'devices/' + that.getType() + '/' + that.get('device_id') + '/' + key;
                dataRef.child(path).set(value, function(error) {
                    if (error) {
                        console.log('Error while updating the remote device: ' + error);
                    }
                });
            });
        }
    });
    return DeviceModel;
});