const RollTableService = {
    
    GetIndexValue: (rollTable, value) => {
         const rollTableResults = Array.from(rollTable.collections.results);
         return rollTableResults[value];
    },
    
    //An alternative to running "rolltable.draw" This allows you to get the result without generating chat messages, etc.
    RollWithoutFoundry: (rollTable, rollSilently = true) => {
        const rollTableResults = Array.from(rollTable.collections.results);        
        let rollIndex;
        if(rollSilently) {
            rollIndex = Math.floor(Math.random() * rollTableResults.length)
        }
        else {
            const diceRoll = new Roll(`1d${rollTableResults.length}`);
            diceRoll.toMessage();
            rollIndex = diceRoll.total - 1; //Zero Based
        }
        
        return rollTableResults[rollIndex];
    }
}

export default RollTableService;