declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:outclick'?: (event: any) => any;
    }
}

interface TimerOption {
    time: number;
    isDefault: boolean;
}
