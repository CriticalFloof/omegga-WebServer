import { EventEmitter } from "events";

export default class GlobalStore extends EventEmitter {
    private storage: { [index: string]: any } = {};

    constructor() {
        super();
    }

    public get(key: string): any {
        return this.storage[key];
    }

    public set(key: string, value: any): void {
        this.storage[key] = value;
        this.emit(`key_value_changed:${key}`);
    }

    public onKeyValueChanged(key: string, listener: (...args: any[]) => void) {
        this.on(`key_value_changed:${key}`, listener);
    }

    public onceKeyValueChanged(key: string, listener: (...args: any[]) => void) {
        this.once(`key_value_changed:${key}`, listener);
    }

    public offKeyValueChanged(key: string, listener: (...args: any[]) => void) {
        this.off(`key_value_changed:${key}`, listener);
    }
}
