


export async function addToCompendium(featureArray) {
    const packName = `${moduleData.moduleName}.${moduleData.featurePack}`;
    const pack = game.packs.find(p => p.metadata.id === packName);
    if (!pack) {
        throw new Error("Compendium {flight-features} not found");
    }

    await addManyToPack(pack, featureArray, "item");
}

async function addManyToPack(pack, itemCollection) {
    pack.configure({ locked: false });

    for (const item of itemCollection) {
        const existingItem = pack.index.find((i) => i.name === item.name);
        if (!existingItem) {
            let addedItem;
            addedItem = await Item.create(item, { pack: pack.metadata.id });
            console.log(`Macro '${addedItem.name}' added to compendium ${pack.metadata.name}`);
        }
    }

    pack.configure({ locked: true });
}