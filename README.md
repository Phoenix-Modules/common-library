# Phoenix-Modules: common-library

>**About Me:** I've been a full-stack developer since 2012, working on various enterprise level applications for
different companies. I've always been a nerd and loved DND, so writing modules for foundry has been my newfound passion.

>If you wish to support me or buy me a coffee, my patreon is: https://www.patreon.com/PhoenixModules
 
>Report issues here: https://github.com/Phoenix-Modules/common-library/issues

This is a common set of tools I find myself using as I'm writing my foundry modules, This list is by no means comprehensive,
in addition, these may not be the best way to handle these within foundry as I am still learning the intricacies and caveats of
writing code within foundry. I try to follow best practices here, however, there may be occasion where I have not. 

>Current as of foundry V12 and tested with DND5e


![Module Background](https://github.com/Phoenix-Modules/flight/assets/7071396/b207910e-aff0-4bbc-8a61-e60ba7dae705)


# Breakdown of Features:

## Constants:

```javascript
    PhxConst.COMP_TYPES //Compendium Types, This is for reference, you can also use CONST.COMPENDIUM_DOCUMENT_TYPES from foundry

    PhxConst.ITEM_TYPE //Item Types, A list of DND5e Item Types

    PhxConst.SOCKET_METHOD_NAMES //Method names for socketLib.  See Socket Section.
```

## Compendium Service:

>The add methods will update the item if it exists in the compendium already 

```javascript
    CompendiumService.AddToCompendium(moduleName, compendiumName, documentArray, compendiumType) //Add Items to a compendium pack
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

    //Add single document to compendium
    await CompendiumService.AddToCompendium("my-cool-module", "my-module-actors", actor5e, PhxConst.COMP_TYPES.Actor);
    
    //Add multiple documents to Compendium
    await CompendiumService.AddManyToCompendium("my-extra-cool-module", "my-items", [item5e1, item5e2], PhxConst.COMP_TYPES.Item)

    
    CompendiumService.FindInCompendiums(documentName, compendiumType, compendiumName, system) //Search inside compendiums
    - documentName //The name of the document in the compendium
    - compendiumType //The type of document the compendium holds, see "Constants" section above
    - compendiumName //Optional - The name of the compendium with a dot notation, e.g.   my-module.my-compendium
    - system //Optional - The system of the compendium, e.g. dnd5e
    
    //returns the class document named "My New Class" from the my-cool-module.my-module-classes compendium
    await CompendiumService.FindInCompendiums("My New Class", Constants.COMPENDIUM_TYPES.Item, "my-cool-module.my-module-classes");
    
    //returns the wizard class document from the dnd5e system compendiums
    await CompendiumService.FindInCompendiums("Wizard", Constants.COMPENDIUM_TYPES.Item, undefined, Constants.GAME_SYSTEM.dnd5e);
```

## ChatService:

```javascript
    await ChatMessageService.GetItemFromChatMessage(chatMessage) //Gets a Item5e document from the chat message
    await ChatMessageService.GetActorFromChatMessage(chatMessage) //Gets an Actor5e document from the chat message, this will always return the speaker
    await ChatMessageService.GetCurrentSceneTokenFromChatMessage(chatMessage) //Gets the token of the speaker of the chatMessage
```

Ex Usage:
```javascript
Hooks.on("createChatMessage", async (chatMessage, message, data) => {
    const myItem = await ChatMessageService.GetItemFromChatMessage(chatMessage);
})
```

## EffectService:

***NOTE: Potential SocketLib required***
```javascript
    //Note: DAE has this as a checkbox as well in the UI.
    await EffectService.AddEffectIfMissing(actor, effectData) //Adds an effect to an actor if it doesn't already have it
    await EffectService.AddManyEffects(actor, effectDataArray) //Adds multiple effects, does not duplicate
    await EffectService.RemoveEffect(actor, effectName) //Removes an effect by name
    EffectService.HasEffect(actor, effectName) //boolean response.
```
Ex Usage:
```javascript
Hooks.on("createChatMessage", async (chatMessage, message, data) => {
    const myEffect = {
        //Effect data
    }
    const actor = await ChatMessageService.GetActorFromChatMessage(chatMessage);
    await EffectService.AddEffectIfMissing(actor, myEffect);
    
    //With SocketLib instead, note, you'll have had to instantiate the socket class for your module first (see below)
    PhoenixSocketLib['my-module-name'].executeAsGM(PhxConst.SOCKET_METHOD_NAMES.ADD_EFFECT, actor, myEffect);
})
```

## TokenService:

***NOTE: Potential SocketLib required***
```javascript
    await TokenService.ScaleToken(token, scaleIncrement) //Scales the token texture (I use in flight module)
    await TokenService.ElevateToken(token, elevationIncrement) //Increases the elevation of the token, (Unit of measure is dictated elsewhere)
    await TokenService.ResetTokenElevation(token) //Resets token elevation to 0
    await TokenService.ResetTokenScale(token) //Resets token scale to 1
```

## ActorService:

```javascript
    ActorService.GetItemsFromActorByType(actor5e, itemType) //Gets an array of items from the actor by the item type
    ActorService.GetItemFromActorByName(actor5e, itemName) //Gets a single item from the actor by name, undefined if not found
```


## Example
A pseudo script from my flight module.
```javascript
Hooks.on("createChatMessage", async (chatMessage, message, data) => {
    const item = await ChatMessageService.GetItemFromChatMessage(chatMessage);
    
    if(item.name !== "Take Flight") return;
    
    const actor = await ChatMessageService.GetActorFromChatMessage(chatMessage);
    
    const flightItem = ActorService.GetItemFromActorByName(actor, "Take Flight");
    if(!flightItem) return;

    const initiatingActorToken = await ChatMessageService.GetCurrentSceneTokenFromChatMessage(chatMessage);
    const controlledToken = canvas.tokens.controlled[0];
    
    if(initiatingActorToken.actorId !== controlledToken.document.actorid) return;
    
    //Non Socket
    await TokenService.ElevateToken(initiatingActorToken, 5);
    
    //Socket
    await PhoenixSocketLib[MODULE_NAME].executeAsGM(PhxConst.SOCKET_METHOD_NAMES.ELEVATE_TOKEN, initiatingActorToken, 5);
    
    
})
```



## SocketService:

SocketService is a class that checks if socketlib is installed and creates a self-contained socketlib instance, injecting common library handlers
for the module you pass in (See PhxConst.SOCKET_METHOD_NAMES).  It wraps all the socketlib methods available in the socketLib module EXCEPT the system methods.
It then registers itself with a global variable automatically. This is done to generate an easily accessible, unique singleton of your module's socketLib instance.

For reference, see:https://github.com/manuelVo/foundryvtt-socketlib/tree/develop

>PhoenixSocketLib is a global object E.G. window.PhoenixSocketLib

### DOES NOT USE
```javascript
    socketlib.registerSystem
```


### To begin, Create a new Socket Service:
```javascript
Hooks.once('ready', () => {
    new SocketService('my-module-name-from-module-dot-json');
});
```

### Global Variable Access:
```javascript
    ///Access base class
    PhoenixSocketLib['my-module-name'];
```

### Public Variables:

```javascript
    PhoenixSocketLib.HasSocketLib //Returns a bool

    PhoenixSocketLib.SocketHandler //Returns the module's socketLib instance
```


### Constants.SOCKET_METHOD_NAMES:
```javascript
    PhxConst.SOCKET_METHOD_NAMES.ADD_EFFECT
    PhxConst.SOCKET_METHOD_NAMES.ADD_MANY_EFFECTS
    PhxConst.SOCKET_METHOD_NAMES.REMOVE_EFFECT
    PhxConst.SOCKET_METHOD_NAMES.ELEVATE_TOKEN
    PhxConst.SOCKET_METHOD_NAMES.ELEVATE_TOKEN_RESET
    PhxConst.SOCKET_METHOD_NAMES.SCALE_TOKEN
    PhxConst.SOCKET_METHOD_NAMES.SCALE_TOKEN_RESET
    PhxConst.SOCKET_METHOD_NAMES.SET_ACTOR_FLAG
```



### Call Common Socket Methods:
>See socketLib readme for more info: https://github.com/manuelVo/foundryvtt-socketlib/tree/develop
```javascript
    await PhoenixSocketLib['my-module-name'].executeAsGM(PhxConst.SOCKET_METHOD_NAMES.ADD_EFFECT, actor5e, myEffectData);
```

### Register a new method and then execute it
```javascript

const logMe = function(myLog) {
    console.log(myLog);
}

PhoenixSocketLib['my-module-name'].register('testLogger', logMe);

await PhoenixSocketLib['my-module-name'].executeAsGM('testLogger', 'log message');
```

