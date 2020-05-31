const { ccclass, property } = cc._decorator;
import WebsocketControl from './DemoWebsocket';
import { PlayerDataAI, KEY_INGAME } from './GameDefine';

@ccclass
export default class PlayerAI extends cc.Component {

    speed: number;
    gravity: number;
    dir: number = 0;
    dirY: number = 0;

    public keys: Map<number, boolean> = new Map();
    playerAI: PlayerDataAI;
 

    // ---------------------------------------------------------
    websocketCtr: WebsocketControl = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.log("PlayerAI onLoad");
        this.speed = 150;
        this.gravity = -12;

    }
    start() {
        cc.log("playerAI start");

        this.playerAI = new PlayerDataAI();
        this.playerAI.x = this.node.x;
        this.playerAI.y = this.node.y;
        this.websocketCtr = cc.find('Canvas/GameWorld')
            .getComponent(WebsocketControl);
   

    }
    
    update(dt) {
     
       
      //  this.speed -= this.gravity * dt;
        this.node.x += this.speed * Math.random() * dt;
        this.playerAI.x = Math.random() * 10;
        //console.log("playerAI:" + this.playerAI.x);
        //tho
        this.node.y += this.speed * Math.random() * dt;
       // this.playerAI.y = Math.random() * 10;
       
        if (this.websocketCtr != null) {
          //  this.websocketCtr.Send(this.getInfo(KEY_INGAME));

        }
    }

    public getInfo(type: string) {
        this.playerAI.x = this.node.x;
        this.playerAI.y = this.node.y;//tho
        /*  if(this.websocketCtr != null) {
              this.playerData.id = this.websocketCtr.playerDataMe.id;
          }*/

        this.playerAI.type = type;
        return JSON.stringify(this.playerAI);
    }

  /*  onKeyDown(e: cc.Event.EventCustom) {
        this.keys.set(e.keyCode, true);

        switch (e.keyCode) {
            case cc.macro.KEY.right:
                this.dir = 1;
                break;
            case cc.macro.KEY.left:
                this.dir = -1;
                break;
            case cc.macro.KEY.up:
                this.dirY = 1;
                break;
            case cc.macro.KEY.down:
                this.dirY = -1;
                break;
        }
        console.log(this.keys.size);
    }
    onKeyUp(e: cc.Event.EventCustom) {
        this.keys.delete(e.keyCode);
        this.dir = 0;
        this.dirY = 0
    }

*/

}
