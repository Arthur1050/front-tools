import {StylePropertie} from '../../types/css.type'

export const getCSSProperties = async () => {
    const data = await fetch(chrome.runtime.getURL("css-properties.json"));

    if (data.status != 200) {
        new Error(`Error ao buscar propriesdades CSS: ${data.status} ${await data.text()}`);
        return false;
    }

    return await data.json() as StylePropertie
}