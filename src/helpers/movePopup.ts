// import { SystemObj } from "../systemContext";

interface Props {
    popup: HTMLElement
    target: HTMLElement
    moveType: number
    pageX?: number
    pageY?: number
}

export const movePopup = ({popup, target, moveType, pageX = 0, pageY = 0}:Props) => {
    const {x, y, right, bottom} = target.getBoundingClientRect();
    const {width, height} = popup.getBoundingClientRect();
    // const {maxWidth, maxHeight} = SystemObj;

    var {style} = popup

    if (moveType == 1) {
        var position = {left: right + 8, top: y};

        // CASO O POPUP ULTRAPASSE O LADO DIREITO DA TELA -> MOVE PARA BAIXO
        if ((/* maxWidth */width + position.left) > innerWidth) position = {left: (right - width - 8), top: bottom + 8};
        
        // CASO O POPUP ULTRAPASSE O LADO INFERIOR DA TELA -> MOVE PARA CIMA
        if ((/* maxHeight */height + position.top) > innerHeight) position = {left: (right - width - 8), top: (y - height - 8)};
        
        // CASO O POPUP ULTRAPASSE O LADO SUPERIOR DA TELA -> MOVE PRA ESQUERDA
        if (!position.top) position = {left: (x - width - 8), top: y};

        // CASO O POPUP EXCEDA TODOS OS LIMITE DA TELA
        if (!position.left) position = {left: (innerWidth - width - 8), top: (innerHeight - height - 8)};

        style.left = `${position.left}px`;
        style.top = `${position.top}px`;
    } else {
        style.left = `${(width + pageX + 16) > innerWidth ? pageX - width - 16 : pageX + 16}px`;
        style.top = `${(height + pageY) > innerHeight ? pageY - height : pageY}px`;
    }
}

export const updatePosition = (container:HTMLDivElement|null) => {
    if (container) {
        const {height, y} = container.getBoundingClientRect();
        
        if (height + y + 16 > innerHeight) container.style.top = `${scrollY + innerHeight - height - 16}px`;
    }

    /* if (height + y + 16 < innerHeight) container.style.top = `${scrollY + innerHeight - height - 16}px`;

    if (height + y + 16 > innerHeight) container.style.top = `${scrollY + innerHeight - height - 16}px`;

    if (height + y + 16 > innerHeight) container.style.top = `${scrollY + innerHeight - height - 16}px`; */
}