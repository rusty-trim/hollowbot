import { Client, GatewayIntentBits, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import fs from "fs";
import { CLIENT_ID, GUILD_ID, TOKEN } from "../Constants";
import Command from "./Command";
import Event from "./Event";

export default class HollowClient extends Client {

    public commands = new Map<string, Command>();

    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds]
        });

        this.handleEvents();
        this.handleCommands();
    }

    private handleEvents() {
        const files = fs.readdirSync("src/events");

        for(const file of files) {
            const evt: Event = new (require(`../events/${file}`).default);
            evt.once ? this.once(evt.name, evt.execute.bind(null, this)) : this.on(evt.name, evt.execute.bind(null, this));
        }
    }

    private handleCommands() {
        const commandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
        
        const folders = fs.readdirSync("src/commands");

        for(const folder of folders) {
            const files = fs.readdirSync(`src/commands/${folder}`);

            for(const file of files) {
                const command: Command = new (require(`../commands/${folder}/${file}`)).default;
                commandsData.push(command.builder.toJSON());
                this.commands.set(command.builder.name, command);
            }
        }

        const rest = new REST().setToken(TOKEN!);

        (async () => {
            try {
                console.log(`Started refreshing ${commandsData.length} application (/) commands.`);
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                    { body: commandsData },
                );

                console.log(`Successfully reloaded application (/) commands.`);
                
            } catch(err) {
                console.error(err);
            }
        })();
    }
}