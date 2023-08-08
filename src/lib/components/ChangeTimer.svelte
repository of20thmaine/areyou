<script lang="ts">
    import { TimerOpts, CurrentTimerOpt } from "$lib/scripts/runtime-store";

    let showOpts = false;
</script>

<div class="opts">
    <div class="timer-btn" role="button" tabindex="0" title="Select Timer (minutes)"
            on:click={() => {showOpts = !showOpts}}
            on:keypress={() => {showOpts = !showOpts}}>
        <i class="bi bi-stopwatch-fill"></i>
    </div>
    {#if showOpts}
        {#each $TimerOpts as timerOpt}
            <div class="opt" class:selected-opt={timerOpt === $CurrentTimerOpt} role="button" tabindex="0"
                    on:click={() => {CurrentTimerOpt.set(timerOpt)}}
                    on:keypress={() => {CurrentTimerOpt.set(timerOpt)}}>
                {timerOpt.time}
            </div>
        {/each}
    {/if}
</div>

<style>
    .timer-btn {
        user-select: none;
        cursor: pointer;
    }

    .opts {
        position: absolute;
        z-index: 3;
        display: flex;
        bottom: 0;
        left: 0;
        margin: 1.0rem;
    }

    .opt {
        user-select: none;
        cursor: pointer;
        margin-left: 1.0rem;
        font-weight: 200;
    }

    .selected-opt {
        font-weight: 900;
    }
</style>
