
const Global  = require("global");
const Drawblock = require("drawblock");
const enemyFactory = require("enemyFactory");

var self = null;

cc.Class({

    extends: cc.Component,

    properties: {
        health: {
            default: 100,
            type: cc.Integer
        }
    },

    onLoad () {
        this.healthNode = this.node.getChildByName("health");
    },

    start () {
        this.waypoints = Drawblock.wayPoints;       
        this.pointIndex = 0;
        this.canvas = cc.find("Canvas");
        var pos = this.canvas.convertToNodeSpaceAR(cc.v2(Global.marginW + this.waypoints[0].w * Global.unitLength, this.waypoints[0].h * Global.unitLength));
        this.node.setPosition(pos);
        this.healthNode.getComponent(cc.ProgressBar).progress = 1;
    },

    update (dt) {
        if(Global.frameIndex % 30 == 0) {
            this.move();
        }
    },

    move: function () {
        this.pointIndex = this.pointIndex + 1;
        if(this.pointIndex > this.waypoints.length - 1) {
            this.destroySelf();
            return;
        }
        var pos = this.canvas.convertToNodeSpaceAR(cc.v2(Global.marginW + this.waypoints[this.pointIndex].w * Global.unitLength, this.waypoints[this.pointIndex].h * Global.unitLength));
        this.node.setPosition(pos);
    },

    takeDemage: function (_hurt) {
        this.health = this.health - _hurt;
        this.healthNode.getComponent(cc.ProgressBar).progress = this.health / 100;
        if(this.health <= 0) {
           //敌人死亡
           this.destroySelf();
        }
    },

    destroySelf: function () {
        //通知怪物生成器，将敌人从数组中移除
        enemyFactory.destroyEnemy(this.node.index);
        this.node.destroy();   
    },

    move2: function (dt) {
        // if(self.pointIndex > self.waypoints[self.pointIndex].length - 1) return;
        // let normalVec = cc.pNormalize(cc.v2(self.waypoints[self.pointIndex].x - self.canvas.convertToNodeSpaceAR(self.node).x, self.waypoints[self.pointIndex].y - self.canvas.convertToNodeSpaceAR(self.node).y));
        // let action = cc.moveBy(dt, normalVec.x, normalVec.y)
        // self.node.runAction(action);
        // if(cc.pDistance(self.canvas.convertToNodeSpaceAR(self.node), self.waypoints[self.pointIndex]) < 0.5) {
        //     self.pointIndex = self.pointIndex + 1;
        //     if(self.pointIndex === self.waypoints.length) {
        //         self.node.destroy();
        //     }
        // }
    },



});
