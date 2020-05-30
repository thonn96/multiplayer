// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import WebsocketControl from './DemoWebsocket';

@ccclass
export default class NewClass extends cc.Component {

    @property
    jumpHeight:number = 0;
    @property
    jumpDuration:number = 0;
    @property
    maxMovementSpeed:number = 0;
    @property
    accel: number = 0;
    jumpAction: any;
    node: any;

    // LIFE-CYCLE CALLBACKS:
    setJumpAction() {
        var jumUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionInOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionInOut());
        return cc.repeatForever(cc.sequence(jumUp, jumpDown));

    }

    //
    onCollisionEnter(selfCollider, otherCollider) {
        console.log(selfCollider.name);
        console.log(otherCollider.name);
        if (otherCollider.name = 'Player1<CircleCollider>') {
            this.node.parent.getComponent('DemoWebsocket').spawnNewEgg();         
            this.node.destroy();
        }
    }
    onLoad() {
        //this.jumpAction = this.setJumpAction();
       // this.node.runAction(this.jumpAction);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    }

    start () {

    }

     update (dt) {}
}
