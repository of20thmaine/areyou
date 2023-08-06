<script lang="ts">
    import { appWindow } from "@tauri-apps/api/window";
    import AreYou from "$lib/components/AreYou.svelte";

    function keyShortCutHandler() {
        appWindow.hide();
    }
</script>

<svelte:window on:keydown={keyShortCutHandler}/>

<a href="settings">
    <div class="settings-btn" title="Settings">
        <i class="bi bi-gear-fill"></i>
    </div>
</a>
<AreYou />
<div class="timer-btn">
    <i class="bi bi-stopwatch-fill"></i>
</div>

<style>
    .settings-btn {
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        margin: 1.0rem;
        user-select: none;
        cursor: pointer;
    }

    .timer-btn {
        position: absolute;
        z-index: 3;
        bottom: 0;
        left: 0;
        margin: 1.0rem;
        user-select: none;
        cursor: pointer;
    }
</style>
