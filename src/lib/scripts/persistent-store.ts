import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.dat");

export async function SetColorMode(colorMode: string) {
    return store.set("color-mode", colorMode).then(() => store.save());
}

export async function GetColorMode() {
    return store.get("color-mode");
}

export async function SetBackgroundColor(color: string) {
    return store.set("custom-background-color", color).then(() => store.save());
}

export async function GetBackgroundColor() {
    return store.get("custom-background-color");
}

export async function SetFontColor(color: string) {
    return store.set("custom-font-color", color).then(() => store.save());
}

export async function GetFontColor() {
    return store.get("custom-font-color");
}

export async function SetMessage(message: string) {
    return store.set("message", message).then(() => store.save());
}

export async function GetMessage() {
    return store.get("message");
}

export async function SetTimerOpts(timerOpts: TimerOption[]) {
    return store.set("timer-opts", timerOpts).then(() => store.save());
}

export async function GetTimerOpts() {
    return store.get("timer-opts");
}
