
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

export const HANDLERS = [
    {
        key: 'Actor',
        value: async (document, operation) => {
            await Actor.create(document, operation);
        }
    },
    {
        key: "Adventure",
        value: async (document, operation) => {
            await Adventure.create(document, operation);
        }
    },
    {
        key: "Cards",
        value: async (document, operation) => {
            await Cards.create(document, operation);
        }
    },
    {
        key: "Item",
        value: async (document, operation) => {
            await Item.create(document, operation);
        }
    },
    {
        key: "JournalEntry",
        value: async (document, operation) => {
            await JournalEntry.create(document, operation);
        }
    },
    {
        key: "Macro",
        value: async (document, operation) => {
            await Macro.create(document, operation);
        }
    },
    {
        key: "Playlist",
        value: async (document, operation) => {
            await Playlist.create(document, operation);
        }
    },
    {
        key: "RollTable",
        value: async (document, operation) => {
            await RollTable.create(document, operation);
        }
    },
    {
        key: "Scene",
        value: async (document, operation) => {
            await Scene.create(document, operation);
        }
    }
]

