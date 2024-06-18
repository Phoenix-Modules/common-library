# Phoenix-Modules common-library

>**About Me:** I've been a full-stack developer since 2012, working on various enterprise level applications for
different companies. I've always been a nerd and loved DND, so writing modules for foundry has been my newfound passion.



This is a common set of tools I find myself using as I'm writing my foundry modules, This list is by no means comprehensive,
in addition, these may not be the best way to handle these within foundry as I am still learning the intricacies and caveats of
writing code within foundry. I try to follow best practices here, however, there may be occasion where I have not. 



## Breakdown of Features:

### Constants:
```javascript
Constants.COMPENDIUM_TYPES //Array of Compendium Types, This is for reference, you can also use CONST.COMPENDIUM_DOCUMENT_TYPES from foundry

Constants.HANDLERS  //This is an array of handlers for document creation in a key/value fashion. Used in compendium service.. example below

//Example:
import { Constants } from '@phoenix-modules/common-library';

const newItem = {
    name: "My cool Item"
}
const itemCreationHandler = Constants.HANDLERS.find(x => x.key === Constants.COMPENDIUM_TYPES.Item);
itemCreationHandler(newItem) //Create a new item
```

### Compendium Service
```javascript
CompendiumService.addToCompendium(moduleName, compendiumName, documentArray, compendiumType) //Add Items to a compendium pack
- moduleName //Name of your module, must match module.json's ID
- compendiumName //name of you compendium pack.  The compendium must exist(Be defined in the module.json AND have the corresponding .db file
- documentArray //Array of the documents you're adding to the compendium
- compendiumType //The type of compendium.  This dictates the Object type that's added to the compendium.  Must match Type of compendium

//Example
import { CompendiumService, Constants } from '@phoenix-modules/common-library';

const actors = [
    { name: "Akira the Dragonborn ", type: "character" },
    { name: "Bob the builder", type: "character" }
];

//Add actors to compendium
await CompendiumService.addToCompendium("my-cool-module", "my-module-actors", actors, Constants.COMPENDIUM_TYPES.Actor);
```

### ChatService
```javascript
await ChatService.getItemFromChatMessage(chatMessage) //Gets a Item5e document from the chat message
await ChatService.getActorFromChatMessage(chatMessage) //Gets an Actor5e document from the chat message, this will always return the speaker
await ChatService.getCurrentSceneTokenFromChatMessage(chatMessage) //Gets the token of the speaker of the chatMessage
```

### EffectService
```javascript
//Note: DAE has this as a checkbox as well in the UI.
await EffectService.addEffectIfMissing(actor, effectData) //Adds an effect to an actor if it doesn't already have it
await EffectService.addEffectsIfMissing(actor, effectDataArray) //Adds multiple effects, does not duplicate
await EffectService.deleteEffectIfExists(actor, effectName) //Removes an effect by name
EffectService.hasEffect(actor, effectName) //boolean response.
```

### TokenService
```javascript
await TokenService.scaleToken(token, scaleIncrement) //Scales the token texture (I use in flight module)
await TokenService.elevateToken(token, elevationIncrement) //Increases the elevation of the token, (Unit of measure is dictated elsewhere)
await TokenService.resetTokenElevation(token) //Resets token elevation to 0
await TokenService.resetTokenScale(token) //Resets token scale to 1
```
