import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../structures/Command";
import HollowClient from "../../structures/HollowClient";

export default class PingCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Get the ping of the bot.")
        )
    }

    public async execute(client: HollowClient, interaction: CommandInteraction): Promise<void> {
        await interaction.reply("Hello World!");
    }
}