define(['jquery', 'underscore', 'backbone', 'nestService', 'text!templates/device/thermostat.html'],
    function ($, _, Backbone, nestService, deviceTemplate) {
        var ThermostatView = Backbone.View.extend({
            el: $("#page"),
            render: function (id) {
                var that = this;
                nestService.tryAuthorise()
                    .done(function () {
                        nestService.getHomeData().done(function () {
                            var thermostat = nestService.getThermostatById(id);
                            if (thermostat) {
                                var template = _.template(deviceTemplate, {
                                    thermostat: thermostat
                                });
                                that.$el.html(template);
                            } else {
                                alert('Thermostat was not found');
                            }

                            that.$el.find('button#up-button').click(function () {
                                that.updateTemperature(thermostat, 0.5);
                            });
                            that.$el.find('button#down-button').click(function () {
                                that.updateTemperature(thermostat, -0.5);
                            });
                        }).fail(function (message) {
                            alert(message);
                        });

                    })
                    .fail(function () {
                        alert('Failed to authorize. Please check Nest token.');
                    });

            },
            updateTemperature: function (thermostat, delta) {
                //TODO implement a thermostat model
                var scale = thermostat.get('temperature_scale').toLowerCase();
                var temp = thermostat.get('target_temperature_' + scale) + delta;
                thermostat.set('target_temperature_' + scale, temp);
                this.$el.find('div#target-temperature span.temp').html(temp);
                nestService.updateModel(thermostat);
            }
        });
        return ThermostatView;
    });