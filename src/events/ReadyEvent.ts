import HollowClient from "../structures/HollowClient";
import Event from "../structures/Event";

export default class ReadyEvent extends Event {

    constructor() {
        super("ready", true);
    }

    public async execute(client: HollowClient): Promise<void> {
        console.log(client.user?.username, "is online!");
    }
}