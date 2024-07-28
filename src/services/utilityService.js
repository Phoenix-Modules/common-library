const UtilityService = {
    /**
     * Gets the center x/y of a token based upon grid size
     * @param token the token
     * @returns {{x: *, y: *}} the exact center pixel in x/y of the token
     */
    getTokenCenter: (token) => {
        return {
            x: token.x + (canvas.grid.size / 2),
            y: token.y + (canvas.grid.size / 2)
        }
    },
    /**
     * Calculate the points on a circle, spaced evenly
     * @param centerX the center point of the circle, usually the caster or target x = token.x + (canvas.grid.size / 2)
     * @param centerY the center point of the circle, usually the caster or target x = token.x + (canvas.grid.size / 2)
     * @param radius the radius of the circle... The amount of pixels from the center point.
     * @param numPoints the amount of x/y coordinates you want, spaced evenly.
     * @param centerPoint The center of the circle, an object with x and y variables.  E.G. { x: 200, y: 150 } can also pass in token
     * @returns {*[]} array of points on the circle
     */
    calculatePointsOnCircleFromCenter: (radius, numPoints, centerPoint = { x: 0, y: 0 }) => {
        const points = [];
        const angleIncrement = (2 * Math.PI) / numPoints; // Calculate angle between points

        for (let i = 0; i < numPoints; i++) {
            const angle = i * angleIncrement;
            const x = centerPoint.x + radius * Math.cos(angle);
            const y = centerPoint.y + radius * Math.sin(angle);
            points.push({x, y});
        }
        return points;
    },

    /**
     * Check if a module is installed and active in Foundry VTT.
     * @param {string} moduleName - The name of the module to check.
     * @returns {boolean} - Returns true if the module is installed and active, false otherwise.
     */
    isModuleInstalledAndActive: (moduleName) => {
        const module = game.modules.get(moduleName);
        return module ? module.active : false;
    }
}

export default UtilityService;