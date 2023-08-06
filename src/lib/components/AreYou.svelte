<script lang="ts">
    import { Message } from "$lib/scripts/runtime-store";
</script>

<div class="center" data-tauri-drag-region>
    <h1>{$Message}</h1>
</div>

<style>
    .center {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin: auto;
        font-size: 3.0rem;
        text-align: center;
        margin: 1.0rem;
    }
</style>
