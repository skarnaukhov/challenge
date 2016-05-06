define([
    'jquery',
    'firebase',
    'models/device/DeviceModel'
], function ($, firebase, DeviceModel) {
    var nestToken = "c.K8z8jLo1mqRpADzepM6NQO1IUBlIAFZWEuPlUwJWcO2plXpAnjmFs3RjDscJCOCHI4ktJEqcbBdUeqhtEza3gZB0gbe4uWoXsGAPUcHWJkUHJVsu27C3gu5IU51zjuGCpznUUctYINAuodz9",
        authorized = false,
        dataRef = new Firebase('wss://developer-api.nest.com'),
        dataSnapshot;
    $('#page').on('newToken', function(event, newToken){
        nestToken = newToken;
    });

    dataRef.on('value', function (snapshot) {
        //TODO check snapshot integrity
        dataSnapshot = convertHomeData(snapshot.val());
    });

    var convertHomeData = function(dataSnapshot) {
        var result = {};
        if (!dataSnapshot) {
            return result;
        }
        $.each(dataSnapshot.devices, function(deviceType, deviceById) {
            if (!result[deviceType]) {
                result[deviceType] = [];
            }
            var deviceModel = new DeviceModel(firstChild(deviceById));
            deviceModel.setType(deviceType);
            result[deviceType].push(deviceModel);
        });
        return result;
    };


    var updateModel = function(model) {
        model.update(dataRef);
    };

    var firstChild = function(object) {
        for(var key in object) {
            return object[key];
        }
    };

    return {
        tryAuthorise: function () {
            var deferred = $.Deferred();
            if (authorized) {
                deferred.resolve();
            } else if (nestToken) {
                // Create a reference to the API using the provided token
                dataRef.auth(nestToken, function(error, result) {
                    if (error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve();
                    }
                });

            } else {
                return deferred.reject('No token');
            }
            return deferred.promise();
        },
        getHomeData: function() {
            var deferred = $.Deferred();
            var count = 0;
            var checkSnapshot = function() {
                if (dataSnapshot === undefined) {
                    if (count < 50) {
                        count++;
                        setTimeout(checkSnapshot, 100);
                    } else {
                        deferred.reject('Failed to load home snapshot...');
                    }
                } else {
                    deferred.resolve(dataSnapshot);
                }
            };
            checkSnapshot();

            return deferred.promise();
        },
        getToken: function() {
            return nestToken;
        },
        getCameraById: function(id) {
            var resultCamera = null;
            $.each(dataSnapshot['cameras'], function(i, camera){
                if (camera.get('device_id') === id) {
                    resultCamera = camera;
                    return false;
                }
            });
            return resultCamera;
        },
        getThermostatById: function(id) {
            var resultThermostat = null;
            $.each(dataSnapshot['thermostats'], function(i, thermostat){
                if (thermostat.get('device_id') === id) {
                    resultThermostat = thermostat;
                    return false;
                }
            });
            return resultThermostat;
        },
        updateModel: updateModel
    };
});