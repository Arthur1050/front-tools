type CSSRuleMod = CSSRule&{
    selectorText?:string;
    style?: CSSStyleDeclaration
}

export function getStyleSelector(selector:string) {
    const sheets = document.styleSheets;
    const styles:[string, CSSStyleDeclaration][] = [];

    [...sheets].forEach(sheet => {
        // EVITANDO ERRO AO BUSCAR CSS DE STYLESHEETS EXTERNOS (CORS)
        if (!sheet.href || sheet.href.includes(window.location.origin)) {
            const cssRules:CSSRuleMod[] = [...sheet.cssRules].filter((cssRule) => {
                const {selectorText} = (cssRule as CSSRuleMod);
                if(selectorText) {
                    return selectorText.split(',').reduce((acc, curr) => {
                        const arraySelector = curr.split(' ');
                        const exp = '([\\w\\d\\s\\W\\D]|^)\\'+selector+'(?=(\\.|#|\\[|\\:)|$)';

                        return acc || (new RegExp(exp)).test(arraySelector[arraySelector.length-1])
                    }, false)
                    //const arraySelector = selectorText.split(' ');
                    //return selectorText.includes(`${selector},`) || arraySelector[arraySelector.length-1].includes(selector)
                } else return false;
            })
    
            cssRules.length && cssRules.forEach(cssRule => {
                cssRule.style && cssRule.selectorText && 
                    styles.push([cssRule.selectorText, cssRule.style])
            }) 
        }
    })

    return styles;
}