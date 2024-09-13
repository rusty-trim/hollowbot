import { Interaction } from "discord.js";
import Event from "../structures/Event";
import HollowClient from "../structures/HollowClient";

export default class InteractionCreateEvent extends Event {

    constructor() {
        super("interactionCreate", false);
    }

    public async execute(client: HollowClient, interaction: Interaction): Promise<void> {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            command ? command.execute(client, interaction) : null;
        }
    }
}