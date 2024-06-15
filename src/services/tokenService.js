
export async function scaleToken(token, elevation) {
    const scaleValue = elevation * 0.02;
    await token.document.update({ texture: { scaleX: 1 + scaleValue, scaleY: 1 + scaleValue}});   
}