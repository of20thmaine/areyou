<script lang="ts">
    import ColorSelector from "$lib/components/ColorSelector.svelte";
    import TimerOptsSettings from "$lib/components/TimerOptsSettings.svelte";
    import { ClickOutside } from "$lib/scripts/utils";
    import { ColorMode, BackgroundColor, FontColor, Message } from "$lib/scripts/runtime-store";
    import { SetColorMode, SetBackgroundColor, SetFontColor, SetMessage } from "$lib/scripts/persistent-store";

    let showColorThemeSelect: boolean = false;
    let selectedColorTheme: string = "";

    function changeColorMode(colorMode: string) {
        ColorMode.set(colorMode);
        SetColorMode(colorMode);
    }

    ColorMode.subscribe((value) => {
        if (value === "dark") {
            selectedColorTheme = "Dark Mode";
        } else if (value === "light") {
            selectedColorTheme = "Light Mode";
        } else if (value === "custom") {
            selectedColorTheme = "Custom";
        }
    });

    BackgroundColor.subscribe((value) => {
        SetBackgroundColor(value);
    });

    FontColor.subscribe((value) => {
        SetFontColor(value);
    });

    Message.subscribe((value) => {
        SetMessage(value);
    });
</script>

<div class="header-outer" data-tauri-drag-region>
    <div class="header-inner" data-tauri-drag-region>
        <h1><a href="/" class="back-btn" title="Go Back"><i class="bi bi-arrow-left"></i></a> Settings</h1>
    </div>
</div>
<div class="scroller" data-tauri-drag-region>
    <div class="page" data-tauri-drag-region>
        <h2>Timer:</h2>
        <div class="settings-section p1">
            <TimerOptsSettings />
        </div>
        <h2>Color Mode:</h2>
        <div class="settings-section p2">
            <div class="selectHolder">
                <div class="selector" class:selectorSelected={showColorThemeSelect} role="button" tabindex="0"
                        on:click={() => {showColorThemeSelect = true}}
                        on:keypress={() => {showColorThemeSelect = true}}>
                    <div class="selected">{selectedColorTheme}</div>
                    <i class="bi bi-chevron-down"></i>
                </div>
                {#if showColorThemeSelect}
                    <div class="selectorMenu"
                            use:ClickOutside
                            on:outclick={() => showColorThemeSelect = false}>
                        <div class="opt" role="button" tabindex="0"
                                on:click={() => {
                                    changeColorMode("dark");
                                    showColorThemeSelect = false;
                                }}
                                on:keypress={() => {
                                    changeColorMode("dark");
                                    showColorThemeSelect = false;
                                }}>
                            Dark Mode</div>
                        <div class="opt" role="button" tabindex="0"
                                on:click={() => {
                                    changeColorMode("light");
                                    showColorThemeSelect = false;
                                }}
                                on:keypress={() => {
                                    changeColorMode("light");
                                    showColorThemeSelect = false;
                                }}>
                            Light Mode</div>
                        <div class="opt" role="button" tabindex="0"
                                on:click={() => {
                                    changeColorMode("custom");
                                    showColorThemeSelect = false;
                                }}
                                on:keypress={() => {
                                    changeColorMode("custom");
                                    showColorThemeSelect = false;
                                }}>
                            Custom</div>
                    </div>
                {/if}
            </div>
            {#if selectedColorTheme === "Custom"}
                <div class="custom-colors">
                    <h3>Background Color:</h3>
                    <ColorSelector bind:value={$BackgroundColor} />
                    <h3>Font Color:</h3>
                    <ColorSelector bind:value={$FontColor} />
                </div>
            {/if}
        </div>
        <h2>Message:</h2>
        <div class="settings-section p2">
            <input type="text" class="txtInput" bind:value={$Message} />
        </div>
    </div>
</div>

<style>
    .header-outer {
        width: 100%;
        height: 64px;
        border-bottom: 2px solid var(--fontColor);
    }

    .header-inner {
        margin: 0 auto;
        max-width: 600px;
    }

    .scroller {
        overflow-y: auto;
        height: calc(100vh - 68px);
    }

    .page {
        margin: 0 auto;
        max-width: 600px;
        padding: 1.0rem;
        color: var(--fontColor);
    }

    h1 {
        font-size: 1.5rem;
        padding: 1.0rem 0.5rem;
        width: max-content;
    }

    h2 {
        font-size: 1.15rem;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 1.0rem;
        margin: 1.0rem 0;
        font-weight: 400;
    }

    .back-btn {
        margin: 0 1.0rem;
    }

    .selectHolder {
        position: relative;
    }

    .settings-section {
        border-left: 1px dashed var(--fontColor);
        margin-bottom: 1.0rem;
    }

    .p1 {
        padding: 0 1.0rem 1.0rem 1.0rem;
    }

    .p2 {
        padding: 0.5rem 1.0rem;
    }

    .selector {
        display: flex;
        align-items: center;
        color: var(--fontColor);
        background-color: var(--backgroundColor);
        cursor: pointer;
        user-select: none;
        border: 1px solid var(--fontColor);
        border-radius: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 160px;
        padding: 0.4rem 0.75rem;
    }

    .selected {
        margin-right: auto;
    }

    .selectorSelected {
        border: 1px solid var(--fontColor);
        background-color: var(--fontColor);
        color: var(--backgroundColor);
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .selectorMenu {
        position: absolute;
        z-index: 3;
        color: var(--fontColor);
        border-right: 1px solid;
        border-bottom: 1px solid;
        border-left: 1px solid;
        background-color: var(--backgroundColor);
        cursor: pointer;
        user-select: none;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        width: 160px;
    }

    .opt {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        border-bottom: 1px solid var(--fontColor);
    }

    .opt:hover {
        background-color: #7660ff;
        border-radius: 4px;
    }

    .custom-colors {
        padding: 0 0.75rem;
    }

    .txtInput {
        border: 1px solid var(--fontColor);
        border-radius: 4px;
        padding: 0.3rem 0.5rem 0.35rem 0.5rem;
        background-color: var(--backgroundColor);
        color: var(--fontColor);
        resize: none;
        line-height: 1.6rem;
        max-width: 400px;
        font-family: inherit;
        font-size: inherit;
        white-space: nowrap;
        overflow-x: hidden;
    }
</style>
