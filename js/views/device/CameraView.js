define(['jquery', 'underscore', 'backbone', 'nestService', 'text!templates/device/camera.html'],
    function ($, _, Backbone, nestService, deviceTemplate) {
        var CameraView = Backbone.View.extend({
            el: $("#page"),
            render: function (id) {
                var that = this;
                nestService.tryAuthorise()
                    .done(function () {
                        nestService.getHomeData().done(function () {
                            var camera = nestService.getCameraById(id);
                            if (camera) {
                                var template = _.template(deviceTemplate, {
                                    camera: camera
                                });
                                that.$el.html(template);
                            } else {
                                alert('Camera was not found');
                            }

                            that.$el.find('input#cameraswitch').change(function () {
                                camera.set('is_streaming', !camera.get('is_streaming'));
                                nestService.updateModel(camera);
                            });
                        }).fail(function (message) {
                            alert(message);
                        });

                    })
                    .fail(function () {
                        alert('Failed to authorize. Please check Nest token.');
                    });

            }
        });
        return CameraView;
    });