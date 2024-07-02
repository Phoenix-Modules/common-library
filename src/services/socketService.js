import {SOCKET_METHOD_NAMES} from "../constants/constants.js";
import EffectService from "./effectService.js";
import ActorService from "./actorService.js";
import TokenService from "./tokenService.js";

export default class SocketService {
    #_module;
    HasSocketLib;
    SocketHandler;

    constructor(ModuleName) {
        this.HasSocketLib = this.#_isSocketLibInstalled(); 
        if(!this.HasSocketLib) return;
        
        this.#_module = ModuleName;
        
        if(this.#_isLibRegistered()) return;
        
        this.#_registerCommonSockets();
    }
    
    #_registerCommonSockets() {
        this.SocketHandler = socketLib.registerModule(this.#_module);

        this.#_registerCommonSocketMethods();        
        
        this.#_registerSocketService();
    }
    
    #_registerCommonSocketMethods() {        
        this.SocketHandler.register(SOCKET_METHOD_NAMES.ADD_EFFECT, EffectService.AddEffectIfMissing);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.ADD_MANY_EFFECTS, EffectService.AddManyEffects);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.REMOVE_EFFECT, EffectService.RemoveEffect);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.SET_ACTOR_FLAG, ActorService.SetActorFlag);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.ELEVATE_TOKEN, TokenService.ElevateToken);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.ELEVATE_TOKEN_RESET, TokenService.ResetTokenElevation);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.SCALE_TOKEN, TokenService.ScaleToken);
        this.SocketHandler.register(SOCKET_METHOD_NAMES.SCALE_TOKEN_RESET, TokenService.ResetTokenScale);
    }
    
    #_registerSocketService() {
        if(this.#_isLibRegistered()) return;
        if(!window.PhoenixSocketLib) {
            window.PhoenixSocketLib = {};
        }
        window.PhoenixSocketLib[this.#_module] = this;
    }
    
    #_isSocketLibInstalled() {
        if(!socketLib) {
            console.error("SocketLib is not installed! Cannot Continue!");
            return false;
        }
        return true;
    }
    
    #_isLibRegistered() {
        return window.PhoenixSocketLib && window.PhoenixSocketLib[this.#_module];
    }
    
    register(methodName, method) {
        this.SocketHandler.register(methodName, method);
    }

    async executeAsGM(methodName, ...args) {
        return await this.SocketHandler.executeAsGM(methodName, ...args);
    }

    async executeAsUser(methodName, userId, ...args) {
        return await this.SocketHandler.executeAsUser(methodName, userId, ...args);
    }

    async executeForAllGMs(methodName, ...args) {
        return await this.SocketHandler.executeForAllGMs(methodName, ...args);
    }

    async executeForOtherGMs(methodName, ...args) {
        return await this.SocketHandler.executeForOtherGMs(methodName, ...args);
    }

    async executeForOthers(methodName, ...args) {
        return await this.SocketHandler.executeForOthers(methodName, ...args);
    }
    
    async executeForEveryone(methodName, ...args) {
        return await this.SocketHandler.executeForEveryone(methodName, ...args);
    }

    async executeForUsers(methodName, ...args) {
        return await this.SocketHandler.executeForUsers(methodName, ...args);
    }    
}