
const DebugService = {
    ChatMessage: (chatMessage) => {
        console.log("--------Chat Message Contents----------");
        console.log(chatMessage);
        console.log("--------End Chat Message Debug----------");
    },

    Actor: (actor) => {
        console.log("--------Actor Contents----------");
        console.log(actor);
        console.log("--------End Actor Debug----------");
    },


    Item: (item) => {
        console.log("--------Item Contents----------");
        console.log(item);
        console.log("--------End Item Debug----------");
    },

    Token: (token) => {
        console.log("--------Token Contents----------");
        console.log(token);
        console.log("--------End Token Debug----------");
    }
} 

export default DebugService;
