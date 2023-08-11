<script lang="ts">
    import { invoke } from '@tauri-apps/api/tauri';
    import { CurrentTimerOpt } from '$lib/scripts/runtime-store';

    let intervalId: ReturnType<typeof setInterval>;
    let timer: number;
    let timeStr: string = "";
    let timerOn: boolean = true;
    
    // Every time the user changes the timer the timer
    // restarts automatically with the new time.
    CurrentTimerOpt.subscribe((value) => {
        if (value) {
            if (intervalId !== undefined) {
                clearInterval(intervalId);
            }
            timer = value.time * 60;
            timerOn = true;
            intervalId = setInterval(intervalCallback, 1000);
        }
    });

    function startStopTimer() {
        if (timerOn) {
            clearInterval(intervalId);
            timer = $CurrentTimerOpt.time * 60;
            setTimerString();
        } else {
            timer = $CurrentTimerOpt.time * 60;
            intervalId = setInterval(intervalCallback, 1000);
        }
        timerOn = !timerOn;
    }

    function intervalCallback() {
        setTimerString();

        if (--timer < 0) {
            invoke("show_window");
            timer = $CurrentTimerOpt.time * 60;
        }
    }

    function setTimerString() {
        let hours: number | string = Math.floor(timer / 3600);
        let minutes: number | string = Math.floor(timer % 3600 / 60);
        let seconds: number | string = Math.floor(timer % 3600 % 60);

        if (hours < 1) {
            hours = "";
        } else {
            hours = hours + ":";
        }
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        timeStr = hours + "" + minutes + ":" + seconds;
    }
</script>

<div class="timer">
    <div class="time">{timeStr}</div>
    <div class="timer-ctrl-btn" role="button" tabindex="0" title="{timerOn ? "Stop Timer" : "Start Timer"}"
            on:click={() => startStopTimer()}
            on:keypress={() => startStopTimer()}>
        {#if timerOn}
            <i class="bi bi-stop-fill"></i>
        {:else}
            <i class="bi bi-play-fill"></i>
        {/if}
    </div>
</div>

<style>
    .timer {
        position: absolute;
        z-index: 3;
        bottom: 0;
        right: 0;
        margin: 1.0rem;
        display: flex;
        align-items: center;
    }

    .time {
        margin-right: 0.5rem;
        font-size: 0.85rem;
        font-weight: 200;
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    }

    .timer-ctrl-btn {
        font-size: 1.25rem;
        user-select: none;
        cursor: pointer;
    }
</style>
