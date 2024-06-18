import {HANDLERS} from "../constants/constants";


export async function addToCompendium(moduleName, compendiumName, documentArray, compendiumType) {
    const packName = `${moduleName}.${compendiumName}`;
    const compendium = game.packs.find(p => p.metadata.id === packName);
    if (!compendium) {
        throw new Error(`Compendium ${moduleName}.${compendiumName} not found`);
    }

    await addManyToPack(compendium, documentArray, compendiumType);
}

async function addManyToPack(compendium, documentCollection, compendiumType) {
    compendium.configure({ locked: false });
    const handler = HANDLERS.find(x => x.key === compendiumType).value;

    for (const document of documentCollection) {
        const existingDocument = compendium.index.find((i) => i.name === document.name);
        if (!existingDocument) {
            let addedItem;
            addedItem = await handler(document, { pack: compendium.metadata.id });
            console.log(`Macro '${addedItem.name}' added to compendium ${compendium.metadata.name}`);
        }
    }

    compendium.configure({ locked: true });
}