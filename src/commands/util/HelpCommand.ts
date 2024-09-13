import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../../structures/Command";
import HollowClient from "../../structures/HollowClient";

export default class HelpCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("help")
            .setDescription("See a list of all the available commands.")
        )
    }

    public async execute(client: HollowClient, interaction: CommandInteraction): Promise<void> {
        let result = "";

        client.commands.forEach(cmd => {
            result += `\`${cmd.builder.name}\` - ${cmd.builder.description}\n`;
        });

        await interaction.reply({embeds: [
            new EmbedBuilder()
            .setTitle("Commands")
            .setDescription(result)
            .setColor("Blue")
        ]});
    }
}