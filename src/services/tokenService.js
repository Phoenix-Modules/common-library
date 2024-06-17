
export async function scaleToken(token, multiplier = 0.02) {
    const hasDocument = token.elevation === undefined;
    const elevation = token.elevation ? token.elevation : token.document.elevation;
    const scaleValue = elevation * multiplier;
    if(hasDocument) {
        await token.document.update({ texture: { scaleX: 1 + scaleValue, scaleY: 1 + scaleValue}});
        return;
    }
    await token.update({ texture: { scaleX: 1 + scaleValue, scaleY: 1 + scaleValue}});       
}