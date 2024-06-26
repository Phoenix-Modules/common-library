export async function addEffectIfMissing(actor, effectData) {
    const currentEffect = actor.effects.find(x => x.name === effectData.label);
    if(currentEffect) return false;
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    return true;
}

export async function addEffectsIfMissing(actor, effectDataArray){
    
    if(!Array.isArray(actor.effects)) {
        console.warn("Invalid Actor");
        return;
    }
    
    if(!Array.isArray(effectDataArray)) {
        console.warn("effectDataArray is not an array!");
        return;
    }
    
    const missingEffects = effectDataArray.map(effect => {
        const actorEffect = actor.effects.find(x => x.name === effect.name);
        if(!actorEffect) return effect;        
    });

    await actor.createEmbeddedDocuments("ActiveEffect", missingEffects);    
}

export async function deleteEffectIfExists(actor, effectName) {
    const existingEffect = actor.effects.find(x => x.name === effectName);
    if (!existingEffect) return false;    
    await actor.deleteEmbeddedDocuments("ActiveEffect", [existingEffect.id]);
    return true;
}

export function hasEffect(actor, effectName) {
    const existingEffect = actor.effects.find(x => x.name === effectName);
    return existingEffect !== undefined;
}