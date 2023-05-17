'use strict';
var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-mqtt').Mqtt;

var connectionString = 'HostName=may-2023.azure-devices.net;DeviceId=flowmeter-1;SharedAccessKey=N2F1g+bxyyaosA659mC1wwUqU3c9dbYX2bvvGKyp5LI=';
var client = Client.fromConnectionString(connectionString, Protocol);

client.open(function(err) {
if (err) {
    console.error('could not open IotHub client');
}  else {
    console.log('client opened');

    client.getTwin(function(err, twin) {
        console.log("TWIN IS ", twin)

    if (err) {
        console.error('could not get twin');
    } else {
        var patch = {
            connectivity: {
                type: 'cellular',
                sim: '98888832323'
            },
            measurement: {
                unit: "ltr/min",
                totalUnit: "KL" // kilo litter 
            }
        };

        twin.properties.reported.update(patch, function(err) {
            if (err) {
                console.error('could not update twin');
            } else {
                console.log('twin state reported');
                process.exit();
            }
        });
    }
    });
}
});