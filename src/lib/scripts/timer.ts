import { invoke } from '@tauri-apps/api/tauri';

/**
 * Executes the invoked "showWindow" function in the Tauri backend
 * after the specified time in milliseconds has passed.
 * Thank you to Scott Price:
 * https://medium.com/@sayes2x/creating-an-accurate-javascript-timer-function-in-react-255f3f5cf50c
 * where I found this timer implementation idea.
 * @param time Time in milliseconds
 * @returns An object containing a method "cancel" which cancels the timer.
 */
export const timer = (time: number) => {
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
};
