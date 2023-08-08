declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:outclick'?: (event: any) => any;
    }
}

interface Timer {
    cancel: () => void;
}

interface TimerOption {
    time: number;
    isDefault: boolean;
}
