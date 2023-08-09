<script lang="ts">
    import "$lib/styles/app.css";
    import "bootstrap-icons/font/bootstrap-icons.css";
    import { onMount } from "svelte";
    import { appWindow } from "@tauri-apps/api/window";
    import Timer from "$lib/components/Timer.svelte";
    import { ColorMode, BackgroundColor, FontColor, Message, TimerOpts, CurrentTimerOpt } from "$lib/scripts/runtime-store";
    import { GetColorMode, GetBackgroundColor, GetFontColor, GetMessage, GetTimerOpts } from "$lib/scripts/persistent-store";

    onMount(() => {
        // Set color mode to user setting if exists, else system setting.
        GetColorMode().then((value) => {
            let colorMode = value as string | null;

            if (colorMode === null) {
                if (window.matchMedia("(prefers-color-scheme: dark)") && true) {
                    ColorMode.set("dark");
                } else {
                    ColorMode.set("light");
                }
            } else {
                ColorMode.set(colorMode);
            }
        });

        GetBackgroundColor().then((value) => {
            if (value !== null) BackgroundColor.set(value as string);
        });
        
        GetFontColor().then((value) => {
            if (value !== null) FontColor.set(value as string);
        });
        // If system color mode changes, change app mode if user setting not set.
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", () => {
            GetColorMode().then((value) => {
                let colorMode = value as string | null;

                if (colorMode === null) {
                    if (window.matchMedia("(prefers-color-scheme: dark)") && true) {
                        ColorMode.set("dark");
                    } else {
                        ColorMode.set("light");
                    }
                }
            });
        });
    });

    // App-wide reactivity to ColorMode change
    ColorMode.subscribe((value) => {
        let root = document.documentElement;

        if (value === "dark") {
            document.documentElement.setAttribute("color-mode", "dark");
            root.style.setProperty("--backgroundColor", "#121212");
            root.style.setProperty("--fontColor", "#f9f9f9");
        } else if (value === "light") {
            document.documentElement.setAttribute("color-mode", "light");
            root.style.setProperty("--backgroundColor", "#f9f9f9");
            root.style.setProperty("--fontColor", "#080808");
        } else if (value === "custom") {
            BackgroundColor.subscribe((value) => {
                root.style.setProperty("--backgroundColor", value);
            });
            FontColor.subscribe((value) => {
                root.style.setProperty("--fontColor", value);
            });
        }
    });

    GetMessage().then((value) => {
        if (value !== null) Message.set(value as string);
    });

    GetTimerOpts().then((value) => {
        if (value !== null) TimerOpts.set(value as TimerOption[]);
        for (let opt of $TimerOpts) {
            if (opt.isDefault) {
                CurrentTimerOpt.set(opt);
                return;
            }
        }
        CurrentTimerOpt.set({time: 15, isDefault: true});
    });
</script>

<div class="outer-page">
    <div class="close-btn" role="button" tabindex="0" title="Close Window"
            on:click={() => {appWindow.hide()}}
            on:keypress={() => {appWindow.hide()}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path stroke="var(--fontColor)" stroke-width="2px" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
    </div>
    <div class="inner-page">
        <slot />
    </div>
    <Timer />
</div>

<style>
    .outer-page {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .inner-page {
        position: fixed;
        top: 2px;
        right: 2px;
        bottom: 2px;
        left: 2px;
    }

    .close-btn {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
        margin: 1.0rem;
        user-select: none;
        cursor: pointer;
    }
</style>
