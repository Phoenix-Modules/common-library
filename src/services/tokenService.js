
const SCALE_MULTIPLIER = 0.02;

const TokenService = {
    ///Scale the token by the increment
    ///token:  token (accepts the document, or the wrapper with the document field)
    ///scaleIncrement: the amount to increment the scale by
    ScaleToken: async (token, scaleValue = 0.02) => {
        const scaleIncrement = scaleValue * SCALE_MULTIPLIER;
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ texture: { scaleX: 1 + scaleIncrement, scaleY: 1 + scaleIncrement}});
            return;
        }
        await token.update({ texture: { scaleX: 1 + scaleIncrement, scaleY: 1 + scaleIncrement}});
    },

    ///Elevate the token by the increment
    ///token:  token (accepts the document, or the wrapper with the document field)
    ///elevation: new token elevation
    ElevateToken: async (token, elevationValue) => {
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ elevation: elevationValue });
            return;
        }
        await token.update({ elevation: elevationValue });
    },

    ///Reset the token scale
    ///token:  token (accepts the document, or the wrapper with the document field)
    ResetTokenScale: async (token) => {
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ texture: { scaleX: 1, scaleY: 1}});
            return;
        }
        await token.update({ texture: { scaleX: 1, scaleY: 1}});
    },

    ///Reset the token elevation
    ///token:  token (accepts the document, or the wrapper with the document field)
    ResetTokenElevation: async (token) => {
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ elevation: 0 });
            return;
        }
        await token.update({ elevation: 0 });
    }
}

export default TokenService;