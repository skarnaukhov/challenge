define([
    'jquery',
    'underscore',
    'backbone',
    'views/token/TokenView',
    'views/device/DeviceView',
    'views/device/ThermostatView',
    'views/device/CameraView'
], function ($, _, Backbone, TokenView, DeviceView, ThermostatView, CameraView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'token': 'tokenInput',
            'devices/:deviceType/:id(/)': 'deviceRoute',
            // Default
            '*actions': 'defaultAction'
        }
    });

    var app_router = new AppRouter;

    var initialize = function () {

        app_router.on('route:tokenInput', function () {
            var tokenView = new TokenView();
            tokenView.render();
        });

        app_router.on('route:deviceRoute', function (deviceType, id) {
            var deviceView;
            if (deviceType == 'cameras') {
                deviceView = new CameraView();
            } else if (deviceType == 'thermostats') {
                deviceView = new ThermostatView();
            }
            deviceView.render(id);
        });

        app_router.on('route:defaultAction', function () {
            var deviceView = new DeviceView();
            deviceView.render();
        });

        Backbone.history.start();
    };

    var showTokenView = function () {
        app_router.navigate('#token', true);
    };
    var showDeviceView = function () {
        app_router.navigate('#', true);
    };
    return {
        initialize: initialize,
        showTokenView: showTokenView,
        showDeviceView: showDeviceView
    };
});