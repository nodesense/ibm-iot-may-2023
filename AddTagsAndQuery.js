'use strict';
     var iothub = require('azure-iothub');
     var connectionString = 'HostName=may-2023.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=Neks/MAW1RYudScPznrWkHlMC1PN2Z8tEc3DEQiyLJs=';

     var registry = iothub.Registry.fromConnectionString(connectionString);

     registry.getTwin('flowmeter-1', function(err, twin){
        console.log("TWIN IS ", JSON.stringify(twin, null, 4))

         if (err) {
             console.error(err.constructor.name + ': ' + err.message);
         } else {
             var patch = {
                 tags: {
                     location: {
                         region: 'KA',
                         city: 'Bengaluru'
                   }
                 }
             };

             twin.update(patch, function(err) {
               if (err) {
                 console.error('Could not update twin: ' + err.constructor.name + ': ' + err.message);
               } else {
                 console.log(twin.deviceId + ' twin updated successfully');
                 // queryTwins();
               }
             });
         }
     });