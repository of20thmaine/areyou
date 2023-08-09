<script lang="ts">
    import { appWindow } from "@tauri-apps/api/window";
    import AreYou from "$lib/components/AreYou.svelte";
    import ChangeTimer from "$lib/components/ChangeTimer.svelte";

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
<ChangeTimer />

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
</style>
