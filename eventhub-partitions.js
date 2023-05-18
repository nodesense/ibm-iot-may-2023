const { EventHubProducerClient } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubProducerClient("Endpoint=sb://iothub-ns-gks-may-20-25023970-9e4e836cf0.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=Neks/MAW1RYudScPznrWkHlMC1PN2Z8tEc3DEQiyLJs=;EntityPath=gks-may-2023", "gks-may-2023");

  try { 
  const partitionIds = await client.getPartitionIds();
    console.log(partitionIds)
  await client.close();
  }
  catch(e) {
    console.log(e)
  }
}

main();