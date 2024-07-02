import compendiumMapper from "../objects/compendiumMapper.js";


const CompendiumService = {
    AddToCompendium: async (moduleName, compendiumName, documentArray, compendiumType) => {
        const packName = `${moduleName}.${compendiumName}`;
        const compendium = game.packs.find(p => p.metadata.id === packName);
        if (!compendium) {
            throw new Error(`Compendium ${moduleName}.${compendiumName} not found`);
        }

        await addManyToCompendium(compendium, documentArray, compendiumType);        
    },
    
    AddManyToCompendium: async () => {
        compendium.configure({locked: false});
        const handler = compendiumMapper[compendiumType];

        for (const document of documentCollection) {
            const existingDocument = compendium.index.find((i) => i.name === document.name);
            if (!existingDocument) {
                let addedItem;
                addedItem = await handler.create(document, {pack: compendium.metadata.id});
                console.log(`${compendiumType} '${addedItem.name}' added to compendium ${compendium.metadata.name}`);
            }
        }

        compendium.configure({locked: true});
    },
    
    FindInCompendiums: async (itemName, compendiumType, compendiumName = undefined, system = undefined) => {
        if(itemName === undefined || compendiumType === undefined) {
            console.error("You must provide an item name and a compendium type!");
            return;
        }


        const packs = game.packs.filter(p => {
            const typeMatch = p.metadata.type === compendiumType;
            const compendiumNameMatch = compendiumName && p.metadata.name === compendiumName;
            const systemMatch = system && p.metadata.system === system;

            if(!compendiumNameMatch && !systemMatch) {
                return typeMatch;
            }
            if(!compendiumNameMatch || !systemMatch) {
                if(!compendiumNameMatch) {
                    return typeMatch && systemMatch;
                }
                return typeMatch && compendiumNameMatch;
            }
            return typeMatch && compendiumNameMatch && systemMatch;
        });

        const foundItems = [];

        for (const pack of packs) {
            const index = await pack.getIndex();
            const entry = index.find(e => e.name.toLowerCase() === itemName.toLowerCase());
            if (entry) {
                const item = await pack.getDocument(entry._id);
                foundItems.push(item);
            }
        }

        // Return the found items
        if (foundItems.length > 0) {
            return foundItems;
        } else {
            console.log(`Item "${itemName}" not found in any DND5e compendium packs.`);
            return null;
        }
    }
}

export default CompendiumService;