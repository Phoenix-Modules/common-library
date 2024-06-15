export async function addEffectIfMissing(actor, effectData) {
    const currentEffect = actor.effects.find(x => x.name === effectData.label);
    if(currentEffect) return false;
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    return true;
}

export async function addEffectsIfMissing(actor, effectData){
    
}

export async function deleteEffectIfExists(actor, effectName) {
    const existingEffect = actor.effects.find(x => x.name === effectName);
    if (!existingEffect) return false;    
    await actor.deleteEmbeddedDocuments("ActiveEffect", [existingEffect.id]);
    return true;
}

export async function hasEffect(actor, effectName) {
    const existingEffect = actor.effects.find(x => x.name === effectName);
    return existingEffect !== undefined;
}