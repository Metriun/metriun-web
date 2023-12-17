import JoinPerDay from "./events/JoinPerDay.js";
import ClientsDevices from "./events/ClientsDevices.js";
import AccessContry from "./events/AccessContry.js";
var events = {
    JoinPerDay: JoinPerDay,
    ClientsDevices: ClientsDevices,
    AccessContry: AccessContry,
};
export default {
    events: events,
};
