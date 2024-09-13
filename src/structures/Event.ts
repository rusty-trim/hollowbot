export default class Event {
    constructor(public readonly name: string, public readonly once: boolean) {};

    public async execute(..._args: any[]) {
        throw new Error(`Event ${this.name} is missing the execute method.`);
    }
}