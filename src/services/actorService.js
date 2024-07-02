
const ActorService = {
    GetItemsFromActorByType: (actor5e, itemType) => {
        return actor5e.items.filter(x => x.type === itemType);
    },

    GetItemFromActorByName: (actor5e, itemName) => {
        return actor5e.items.find(x => x.name === itemName);
    },


    SetActorFlag: async (actor, moduleName, flagName, value) => {
        if(!actor) return;
        await actor.setFlag(moduleName, flagName, value);
    },

    GetActorFlag: (actor, moduleName, flagName) => {
        if(!actor) return;
        actor.getFlag(moduleName, flagName);
    }    
}

export default ActorService;




