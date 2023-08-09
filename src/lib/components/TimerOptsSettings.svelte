<script lang="ts">
    import { TimerOpts } from "$lib/scripts/runtime-store";
    import { SetTimerOpts } from "$lib/scripts/persistent-store";

    let showAddTime: boolean = false;
    let newValueInput: HTMLElement;
    let newTime: string = "";
    let errorStr: string = "";

    $: if (newValueInput) newValueInput.focus();

    function deleteOption(idx: number) {
        if ($TimerOpts[idx].isDefault) {
            if (idx !== 0) {
                $TimerOpts[0].isDefault = true;
            } else {
                $TimerOpts[1].isDefault = true;
            }
        }
        $TimerOpts.splice(idx, 1);
        $TimerOpts = $TimerOpts;
        SetTimerOpts($TimerOpts);
    }

    function createOption() {
        if (!/^\d+$/.test(newTime)) {
            errorStr = "Input must be number between 1 and  1440";
            return;
        }

        let time = Number(newTime);

        if (time < 1 || time > 1440) {
            errorStr = "Input must be number between 1 and  1440";
            return;
        }

        let placeIdx = 0;

        for (let i = 0; i < $TimerOpts.length; ++i) {
            if ($TimerOpts[i].time === time) {
                errorStr = time + " is already an available option";
                return;
            }
            if ($TimerOpts[i].time < time) {
                placeIdx = i+1;
            }
        }

        $TimerOpts.splice(placeIdx, 0, {time: time, isDefault: false});
        $TimerOpts = $TimerOpts;
        SetTimerOpts($TimerOpts);
        newTime = errorStr = "";
        showAddTime = false;
    }

    function keyHandler(event: KeyboardEvent) {
        switch (event.key) {
            case "Enter":
                event.preventDefault();
                createOption();
                break;
        }
    }

    function changeDefault(timerOpt: TimerOption) {
        for (let opt of $TimerOpts) {
            if (opt === timerOpt) {
                opt.isDefault = true;
            } else if (opt.isDefault) {
                opt.isDefault = false;
            }
        }
        $TimerOpts = $TimerOpts;
        SetTimerOpts($TimerOpts);
    }
</script>

<h3>Current Options:</h3>
<div class="opts">
    {#each $TimerOpts as timerOpt, i}
        <div class="opt-btn">
            <div class="opt">{timerOpt.time}</div>
            {#if $TimerOpts.length > 1}
                <div class="delete-btn" role="button" tabindex="0" title="Delete Option"
                        on:click={() => deleteOption(i)}
                        on:keypress={() => deleteOption(i)}>
                    <i class="bi bi-x-circle"></i>
                </div>
            {/if}
        </div>
    {/each}
    <div class="opt-btn" class:usn={!showAddTime} role="button" tabindex="0" title="Add Option"
            on:click={() => showAddTime = true}
            on:keypress={() => showAddTime = true}>
        {#if showAddTime}
            <div class="opt">
                <input type="text" class="txtInput" bind:value={newTime} bind:this={newValueInput}
                    on:focusout={() => {showAddTime = false; errorStr = "";}} on:keydown={keyHandler}/>
            </div>
        {:else}
            <div class="add-btn">
                <i class="bi bi-plus-lg"></i>
            </div>
            <div class="opt">Add</div>
        {/if}
    </div>
    {#if errorStr.length > 0}
        <p>{errorStr}</p>
    {/if}
</div>
<p>(time in minutes)</p>

<h3>Set Default Option:</h3>
<div class="opts">
    {#each $TimerOpts as timerOpt}
        <div class="default-opt" class:selected-default-opt={timerOpt.isDefault} role="button" tabindex="0"
                on:click={() => changeDefault(timerOpt)}
                on:keypress={() => changeDefault(timerOpt)}>
            {timerOpt.time}
        </div>
    {/each}
</div>

<style>
    .opts {
        display: flex;
        flex-wrap: wrap;
    }

    .opt-btn {
        display: flex;
        align-items: center;
        height: 34px;
        padding: 0.25rem 1.0rem;
        background-color: var(--fontColor);
        color: var(--backgroundColor);
        margin: 0 0.25rem 0.25rem 0;
        border-radius: 4px;
    }

    .opt {
        font-size: 1.15rem;
    }

    .delete-btn {
        cursor: pointer;
        user-select: none;
        margin-left: 0.75rem;
    }

    h3 {
        font-size: 1.0rem;
        margin: 1.0rem 0 0.5rem 0;
        font-weight: 500;
    }

    .add-btn {
        margin-right: 0.5rem;
    }

    .usn {
        cursor: pointer;
        user-select: none;
    }

    .txtInput {
        border: 1px solid var(--fontColor);
        border-radius: 4px;
        padding: 0 0.25rem;
        background-color: var(--fontColor);
        color: var(--backgroundColor);
        resize: none;
        width: 60px;
        font-family: inherit;
        font-size: inherit;
        white-space: nowrap;
        overflow-x: hidden;
    }

    .default-opt {
        user-select: none;
        cursor: pointer;
        margin-left: 1.0rem;
        font-weight: 200;
    }

    .selected-default-opt {
        font-weight: 900;
    }
</style>
