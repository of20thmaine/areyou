import { writable } from "svelte/store";

export const ColorMode = writable<string>("");

export const BackgroundColor = writable<string>("#121212");

export const FontColor = writable<string>("#f9f9f9");

export const Message = writable<string>("Are you on task?");
