import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import HollowClient from "./HollowClient";

export default class Command {

    constructor(public readonly builder: SlashCommandBuilder) {}

    public async execute(_client: HollowClient, _interaction: CommandInteraction) {
        throw new Error(`Command ${this.builder.name} is missing the execute method.`);
    }
}