import compendiumMapper from "../objects/compendiumMapper.js";


const CompendiumService = {
    AddToCompendium: async (moduleName, compendiumName, document, compendiumType) => {
        const compendium = CompendiumService.GetCompendium(moduleName, compendiumName);
        
        compendium.configure({locked: false});
        
        await CompendiumService.CreateOrUpdateCompendiumDocument(document, compendium, compendiumType);
        
        compendium.configure({locked: true});
    },
    
    AddManyToCompendium: async (moduleName, compendiumName, documentArray, compendiumType) => {
        const compendium = CompendiumService.GetCompendium(moduleName, compendiumName);
        
        compendium.configure({locked: false});

        for (const document of documentArray) {
            await CompendiumService.CreateOrUpdateCompendiumDocument(document, compendium, compendiumType);            
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

        const foundIndexes = [];

        for (const pack of packs) {
            const index = await pack.getIndex();
            const entry = index.find(e => e.name.toLowerCase() === itemName.toLowerCase());
            if (entry) {
                const item = await pack.getDocument(entry._id);
                foundIndexes.push(item);
            }
        }

        // Return the found items
        if (foundIndexes.length > 0) {
            
            return foundIndexes;
        } else {
            console.log(`Item "${itemName}" not found in any DND5e compendium packs.`);
            return null;
        }
    },
    
    GetCompendium: (moduleName, compendiumName) => {
        const packName = `${moduleName}.${compendiumName}`;
        const compendium = game.packs.find(p => p.metadata.id === packName);
        if (!compendium) {
            throw new Error(`Compendium ${moduleName}.${compendiumName} not found`);
        }
        return compendium;
    },
    
    CreateOrUpdateCompendiumDocument: async (document, compendium, compendiumType) => {
        const existingCacheDocument = compendium.index.find(i => i.name === document.name);
        if (!existingCacheDocument) {
            const handler = compendiumMapper[compendiumType];
            let addedItem;
            addedItem = await handler.create(document, {pack: compendium.metadata.id});
            console.log(`${compendiumType} '${addedItem.name}' added to compendium ${compendium.metadata.name}`);
            return;
        }
        
        const compendiumDocument = await compendium.getDocument(existingCacheDocument._id);

        compendiumDocument.update(document);
    }
}

export default CompendiumService;