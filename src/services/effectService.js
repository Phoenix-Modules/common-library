
const EffectService = {   

    /**
     * Adds an effect.
     * @param actor Actor to add effect to
     * @param effectData Effect Data
     * @param replace Optional - Defaults to true. Will replace if exists
     * @returns {Promise<void>}
     * @constructor
     */
    AddEffect: async (actor, effectData, replace = true) => {
        if(replace) {
            await EffectService.RemoveEffect(actor, effectData.label);            
        }
        await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    },

    /**
     * Adds many effects to an actor, skips an individual effect if it exists
     * @param actor the actor
     * @param effectDataArray array of effect data
     * @param replace Optional. Defaults to true. Replaces existing effects
     * @returns {Promise<void>}
     * @constructor
     */
    AddManyEffects: async (actor, effectDataArray, replace = true) => {

        if(!Array.isArray(actor.effects)) {
            console.warn("Invalid Actor");
            return;
        }

        if(!Array.isArray(effectDataArray)) {
            console.warn("effectDataArray is not an array!");
            return;
        }
        
        if(replace) {
            effectDataArray.forEach(async effect => {
                await EffectService.RemoveEffect(actor, effect.name);
            });
        }

        await actor.createEmbeddedDocuments("ActiveEffect", effectDataArray);
    },

    /**
     * Removes effect from an actor, if it exists
     * @param actor the actor
     * @param effectName the effect name
     * @returns {Promise<boolean>}
     * @constructor
     */
    RemoveEffect: async (actor, effectName) => {
        const existingEffect = actor.effects.find(x => x.name === effectName);
        if (!existingEffect) return false;
        await actor.deleteEmbeddedDocuments("ActiveEffect", [existingEffect.id]);
        return true;
    },

    /**
     * Returns true/false if an actor has an effect
     * @param actor the actor
     * @param effectName the effect name
     * @returns {boolean}
     * @constructor
     */
    HasEffect: (actor, effectName) => {
        const existingEffect = actor.effects.find(x => x.name === effectName);
        return existingEffect !== undefined;
    }    
}

export default EffectService;