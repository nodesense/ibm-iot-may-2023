const { EventHubConsumerClient, earliestEventPosition } = require("@azure/event-hubs");
 
const eventHub =  "Endpoint=sb://<<url>>.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=Neks/MAW1RYudScPznrWkHlMC1PN2Z8tEc3DEQiyLJs=;EntityPath=gks-may-2023"
const eventHubName = "gks-may-2023"

async function main() {
  const client = new EventHubConsumerClient(
    "my-consumer-group",
    eventHub,
    eventHubName
  );

  // In this sample, we use the position of earliest available event to start from
  // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
  const subscriptionOptions = {
    startPosition: earliestEventPosition
  };

  const subscription = client.subscribe(
    {
      processEvents: async (events, context) => {
        // event processing code goes here
        console.log(events)
      },
      processError: async (err, context) => {
        // error reporting/handling code here
        console.log("error ", err)
      }
    },
    subscriptionOptions
  );

  // Wait for a few seconds to receive events before closing
//   setTimeout(async () => {
//     await subscription.close();
//     await client.close();
//     console.log(`Exiting sample`);
//   }, 3 * 1000);
}

main();