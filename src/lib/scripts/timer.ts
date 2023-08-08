import { invoke } from '@tauri-apps/api/tauri';

/**
 * Executes the invoked "showWindow" function in the Tauri backend
 * after the specified time in milliseconds has passed.
 * https://medium.com/@sayes2x/creating-an-accurate-javascript-timer-function-in-react-255f3f5cf50c
 * Thank you to above article where I found this timer implementation idea.
 * @param time Time in milliseconds
 * @returns An object containing a method "cancel" which cancels the timer.
 */
export function timer(time: number): Timer {
    let timeout: ReturnType<typeof setTimeout>;
    let nextAt: number = new Date().getTime() + time;

    const wrapper = () => {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        invoke("show_window");
    };

    const cancel = () => clearTimeout(timeout);
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());

    return { cancel };
}

export const DefaultTimerOpts: TimerOption[] = [{time: 10, isDefault: false}, {time: 15, isDefault: true}, 
    {time: 20, isDefault: false}, {time: 30, isDefault: false}, {time: 45, isDefault: false}, {time: 60, isDefault: false}];
