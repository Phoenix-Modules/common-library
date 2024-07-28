
const SCALE_MULTIPLIER = 0.02;

const TokenService = {
    /**
     * Checks if an object is a tokendocument
     * @param token the object to check
     * @returns {boolean} true if true
     * @constructor
     */
    IsTokenDocument: (token) => {
      return token instanceof TokenDocument;  
    },
    
    /**
     * Elevate the token by the increment.
     *
     * @param {Token} token - (accepts the document, or the wrapper with the document field)
     * @param {Token} scaleValue - The amount to increment the scale by.
     */
    ScaleToken: async (token, scaleValue = 0.02) => {
        const scaleIncrement = scaleValue * SCALE_MULTIPLIER;
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ texture: { scaleX: 1 + scaleIncrement, scaleY: 1 + scaleIncrement}});
            return;
        }
        await token.update({ texture: { scaleX: 1 + scaleIncrement, scaleY: 1 + scaleIncrement}});
    },
    
    /**
     * Elevate the token by the increment.
     *
     * @param {Token} token - (accepts the document, or the wrapper with the document field)
     * @param {Token} elevationValue - New token elevation.
     */
    ElevateToken: async (token, elevationValue) => {
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ elevation: elevationValue });
            return;
        }
        await token.update({ elevation: elevationValue });
    },

    /**
     * Reset the token scale
     *
     * @param {Token} token - (accepts the document, or the wrapper with the document field)
     */
    ResetTokenScale: async (token) => {
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ texture: { scaleX: 1, scaleY: 1}});
            return;
        }
        await token.update({ texture: { scaleX: 1, scaleY: 1}});
    },

    /**
     * Reset the token elevation.
     *
     * @param {Token} token - (accepts the document, or the wrapper with the document field)
     */
    ResetTokenElevation: async (token) => {
        const hasDocument = token.document ?? false;
        if(hasDocument) {
            await token.document.update({ elevation: 0 });
            return;
        }
        await token.update({ elevation: 0 });
    },

    /**
     * Rotates a token to face towards a target token.
     *
     * @param {Token} token - The token that will rotate.
     * @param {Token} targetToken - The target token to face towards.
     */
    RotateTowardsTarget: async (token, targetToken) => {
        if(!targetToken) return;
        // Calculate the angle between the two tokens
        const deltaX = targetToken.x - token.x;
        const deltaY = targetToken.y - token.y;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        // Update the token's rotation
        await token.update({ rotation: (angle - 90) });
    }
}

export default TokenService;