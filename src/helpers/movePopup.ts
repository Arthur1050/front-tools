interface Props {
    popup: HTMLElement
    x: number
    y: number
}

export const movePopup = ({popup, x, y}:Props) => {
    const {width, height} = popup.getBoundingClientRect();
    var {style} = popup

    style.left = `${(width + x + 16) > innerWidth ? x - width - 16 : x + 16}px`;
    style.top = `${(height + y) > innerHeight ? y - height : y}px`;
}