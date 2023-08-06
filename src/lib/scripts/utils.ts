export function ClickOutside(node: HTMLElement) {
    const clickHandler = (event: Event) => {
        if (!(event.target instanceof HTMLElement && node.contains(event.target))) {
            node.dispatchEvent(new CustomEvent("outclick"));
            event.stopPropagation();
        }
    }
    
    document.addEventListener("click", clickHandler, true);

    return {
        destroy() {
            document.removeEventListener("click", clickHandler, true);
        }
    };
}
