const { EventHubProducerClient } = require("@azure/event-hubs");

async function main() {
  const producerClient = new EventHubProducerClient("connectionString", "eventHubName");

  const eventDataBatch = await producerClient.createBatch();
  let numberOfEventsToSend = 10;

  while (numberOfEventsToSend > 0) {
    let wasAdded = eventDataBatch.tryAdd({ body: "my-event-body" });
    if (!wasAdded) {
      break;
    }
    numberOfEventsToSend--;
  }

  await producerClient.sendBatch(eventDataBatch);
  await producerClient.close();
}

main();