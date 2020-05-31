const {ccclass, property} = cc._decorator;

import PlayerControl from './PlayerControl';
import { PlayerData, KEY_CONNECTED, KEY_READY, KEY_INGAME, PlayerDataAI } from './GameDefine';
import PlayerAI from './PlayerAI';

// doc 
// https://docs.cocos2d-x.org/creator/manual/en/scripting/network.html 

@ccclass
export default class WebsocketControl extends cc.Component {

    websocket : WebSocket;
    isConnected : boolean = false;

    player: PlayerControl;
    playerDataMe : PlayerData = null;
    playerDataRivel: PlayerData = null;
    playerAI: PlayerDataAI = null;
    @property(cc.Prefab) prefab_PlayerAi: cc.Prefab = null;
    @property(cc.Prefab) prefab_Player: cc.Prefab = null;
    @property(cc.Prefab) eggfab: cc.Prefab = null;
  
    @property
    maxStarDuration: number = 0;
    @property
    minStarDuration: number = 0;
    // create AI
    createAI() {

        for (let i = 0; i < 5; ++i) {   
            var playerAI = cc.instantiate(this.prefab_PlayerAi);
            this.node.addChild(playerAI);
            playerAI.setPosition(i * 10, i * 20);
        }
    
     /*   for (let i = 0; i < 5; ++i) {
            var scene = cc.director.getScene();
            var node = cc.instantiate(this.prefab_PlayerAi);
            node.parent = scene;
            
        }*/
    }
     
    //
    //tho
    spawnNewEgg() {
        var newEgg = cc.instantiate(this.eggfab);
        this.node.addChild(newEgg);
        newEgg.addComponent(cc.CircleCollider);
        newEgg.getComponent(cc.CircleCollider).radius = 40;
        newEgg.group = 'Player1';
        newEgg.setPosition(this.getNewEggPosition());
 
    }
    getNewEggPosition() {
        var EggX = Math.random()*200;
        var EggY = Math.random()*500;
        var maxX = this.node.width / 2;
        return cc.v2(EggX, EggY);
    }
    //
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.spawnNewEgg();
        this.createAI();
    }
    start() {
        cc.log("WebSocket start");
        this.websocket = new 
            // WebSocket("ws://192.168.1.64:8080");
            WebSocket("ws://192.168.1.6:8080");

        var self = this;
        this.websocket.onopen = function (evt) {
            // cc.log(evt);
            self.isConnected = true;
        };
        this.websocket.onmessage = function (evt) {
           // console.log('data: ' + evt.data);
            
           // let playerdata = JSON.parse(evt.data);
            let eventData = JSON.parse(evt.data);
            switch (eventData.type) {
                case 'PLAYER_DATA':
                    {
                        console.log('tho ' +evt.data);
                        break;
                    }
                case 'EGG_DATA':
                    {
                       // console.log(eventData.data);
                        var self = eventData.data.egg_number;
                        console.log('tho1' +self);
                        break;
                    }
            }
        };

        this.websocket.onclose = function (event) {
            console.log("Closed ");
            self.isConnected = false;
        }
        this.player = cc.find('Canvas/Player').getComponent(PlayerControl);
         this.Send(this.player.getInfo(KEY_READY));
        console.log(this.player.node.x);
        
    }

    update(dt) {
        
       // if(this.isConnected == false) 
      //      return;


        // this.Send('dt: ' + dt);
    }
    public Send(data : string) {
        if(this.websocket != null && this.isConnected == true)
            this.websocket.send(data);
    }
}
