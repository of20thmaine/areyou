import { writable } from "svelte/store";

export const ColorMode = writable<string>("");

export const BackgroundColor = writable<string>("#121212");

export const FontColor = writable<string>("#f9f9f9");

export const Message = writable<string>("Are you on task?");

export const TimerOpts = writable<TimerOption[]>([{time: 10, isDefault: false}, {time: 15, isDefault: true}, 
    {time: 20, isDefault: false}, {time: 30, isDefault: false}, {time: 45, isDefault: false}, {time: 60, isDefault: false}]);

export const CurrentTimerOpt = writable<TimerOption>();
