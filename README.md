# Phoenix-Modules common-library

>**About Me:** I've been a full-stack developer since 2012, working on various enterprise level applications for
different companies. I've always been a nerd and loved DND, so writing modules for foundry has been my newfound passion.



This is a common set of tools I find myself using as I'm writing my foundry modules, This list is by no means comprehensive,
in addition, these may not be the best way to handle these within foundry as I am still learning the intricacies and caveats of
writing code within foundry. I try to follow best practices here, however, there may be occasion where I have not. 

>Current as of foundry V12 and tested with DND5e


# Breakdown of Features:

## Constants:

```javascript
    Constants.COMP_TYPES //Compendium Types, This is for reference, you can also use CONST.COMPENDIUM_DOCUMENT_TYPES from foundry
    
    Constants.ITEM_TYPE //Item Types, A list of DND5e Item Types
    
    Constants.SOCKET_METHOD_NAMES //Method names for socketLib.  See Socket Section.
```

## Compendium Service:

***NOTE: Potential SocketLib required***
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

    //Add actors to compendium
    await CompendiumService.AddToCompendium("my-cool-module", "my-module-actors", actors, Constants.COMPENDIUM_TYPES.Actor);
    
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
    await ChatService.GetItemFromChatMessage(chatMessage) //Gets a Item5e document from the chat message
    await ChatService.GetActorFromChatMessage(chatMessage) //Gets an Actor5e document from the chat message, this will always return the speaker
    await ChatService.GetCurrentSceneTokenFromChatMessage(chatMessage) //Gets the token of the speaker of the chatMessage
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
    ActorService.GetItemFromActorByName(actor5e, itemName) //Gets a single item from the actor by name
```

## SocketService:

SocketService is a class that checks if socketlib is installed and creates a self-contained socketlib instance, injecting common library handlers
for the module you pass in (See Constants.SOCKET_METHOD_NAMES).  It wraps all the socketlib methods available in the socketLib module EXCEPT the system methods.
It then registers itself with a global variable automatically. This is done to generate an easily accessible, unique singleton of your module's socketLib instance.

For reference, see:https://github.com/manuelVo/foundryvtt-socketlib/tree/develop

### DOES NOT USE
```javascript
    socketLib.registerSystem
```

### Global Variable Access:
```javascript
    ///Access base class
    window.PhoenixSocketLib.myModuleName;
```

### Public Variables:

```javascript
    window.PhoenixSocketLib.HasSocketLib //Returns a bool

    window.PhoenixSocketLib.SocketHandler //Returns the module's socketLib instance
```


### Constants.SOCKET_METHOD_NAMES:
```javascript
    Constants.SOCKET_METHOD_NAMES.ADD_EFFECT
    Constants.SOCKET_METHOD_NAMES.ADD_MANY_EFFECTS
    Constants.SOCKET_METHOD_NAMES.REMOVE_EFFECT
    Constants.SOCKET_METHOD_NAMES.ELEVATE_TOKEN
    Constants.SOCKET_METHOD_NAMES.ELEVATE_TOKEN_RESET
    Constants.SOCKET_METHOD_NAMES.SCALE_TOKEN
    Constants.SOCKET_METHOD_NAMES.SCALE_TOKEN_RESET
    Constants.SOCKET_METHOD_NAMES.SET_ACTOR_FLAG
```


### Create a new Socket Service:
```javascript
    new SocketService(ModuleName); //Foundry Name of your module. Set in module.json. REQUIRED
```

### Call Common Socket Methods:
>See socketLib readme for more info: https://github.com/manuelVo/foundryvtt-socketlib/tree/develop
```javascript
    await window.PhoenixSocketLib.myModuleName.executeAsGM(Constants.SOCKET_METHOD_NAMES.ADD_EFFECT, actor5e, myEffectData);
```

### Register a new method
```javascript
    window.PhoenixSocketLib.myModuleName.register(myMethodNameAsString, myMethod);
```

