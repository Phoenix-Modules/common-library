
export const COMPENDIUM_TYPES = {
    Actor: "Actor",
    Adventure: "Adventure",
    Cards: "Cards",
    Item: "Item",
    JournalEntry: "JournalEntry",
    Macro: "Macro",
    Playlist: "Playlist",
    RollTable: "RollTable",
    Scene: "Scene"
}

export const GAME_SYSTEM = {
    dnd5e: "dnd5e"
}

export const COMPENDIUM_HANDLERS = [
    {
        key: COMPENDIUM_TYPES.Actor,
        value: Actor.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.Adventure,
        value: Adventure.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.Cards,
        value: Cards.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.Item,
        value: Item.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.JournalEntry,
        value: JournalEntry.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.Macro,
        value: Macro.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.Playlist,
        value: Playlist.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.RollTable,
        value: RollTable.create(document, operation)
    },
    {
        key: COMPENDIUM_TYPES.Scene,
        value: Scene.create(document, operation)
    }
]

