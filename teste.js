import metriunweb from "./dist/index.js";

const DevicePerDay = new metriunweb.events.ClientsDevices(
  "de1774e5-d7bc-458c-b819-634bb2e727b1",
  "opnu87ij975dgwh87163h48d6gj8iaowlUyhb&g",
  "day"
);

DevicePerDay.load();

const AccessPerDay = new metriunweb.events.JoinPerDay(
  "33000e80-465f-41c0-9304-260cb3f69b72",
  "opnu87ij975dgwh87163h48d6gj8iaowlUyhb&g"
);

AccessPerDay.load();

const AccessContry = new metriunweb.events.AccessContry(
  "1b98db15-1b2f-4df8-8f4f-cbe775463fac",
  "opnu87ij975dgwh87163h48d6gj8iaowlUyhb&g"
);

AccessContry.load();
