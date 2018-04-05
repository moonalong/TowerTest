
const Global  = require("global");

var self = null;
var towerCtrl = cc.Class({
    extends: cc.Component,

    properties: {
        attackRate: cc.Integer, //攻击频率
    },

    statics: {
        instance: null,
        points: null,
        getInstance: function() {
            if (towerCtrl.instance == null) {
                towerCtrl.instance = new towerCtrl();
            }
            return towerCtrl.instance;
        }
    },

    onLoad () {
        self = this;
        self.physicsManager = cc.director.getPhysicsManager();
        self.physicsManager.enabled = true;
        self.attckTarget = null; //攻击的目标
        self.attackDistance = 16*16 + 32*32; //攻击范围（曼哈顿距离）

        self.canvas = cc.find("Canvas");
        self.skillBg = cc.find("Canvas/skillbg");
        self.skillBg.active = false;
        self.skill = cc.find("Canvas/skill");
        self.skill.active = false;
        self.heroZhuge = cc.find("Canvas/zhugeliang");

        self.skilleffects = cc.find("Canvas/skilleffects");
        
        towerCtrl.points = [];
        self.waypoints = cc.find("Canvas/waypoints");
        for (let i = 0; i < self.waypoints.childrenCount; i++) {
            towerCtrl.points.push(self.waypoints.children[i]);
        }

        self.node.on('touchstart', function ( event ) {  
            Global.stopFrame = true;
            // cc.log("A start");
            // if (cc.rectContainsPoint(self.heroZhuge.getBoundingBoxToWorld(), event.getLocation())) {  
            //     //self.skillBg.active = true;
            //     self.skill.active = true;
            //     self.skill.setAnchorPoint(0,0.5);
            // } else {  
            //     self.skillBg.active = false;
            //     self.skill.active = false;
            // }  
           
        });


        self.node.on('touchmove', function ( event ) {  
            Global.stopFrame = true;
            // cc.log("A move");
            // let position = event.getLocation();
            
            // self.xRelative = position.x - self.heroZhuge.parent.convertToWorldSpaceAR(self.heroZhuge).x;
            // self.yRelative = position.y - self.heroZhuge.parent.convertToWorldSpaceAR(self.heroZhuge).y;
            // let judge = 1;
            // if((self.xRelative < 0 && self.yRelative > 0) || (self.xRelative > 0 && self.yRelative > 0)) {
            //     judge = -1;
            // }
            // let cosa = self.xRelative / Math.sqrt(self.xRelative * self.xRelative + self.yRelative*self.yRelative);
            // self.angle = Math.acos(cosa) *180/Math.PI;
            // self.skill.setRotation(self.angle*judge);

        });

        self.node.on('touchend', function ( event ) {  
            Global.stopFrame = false;
            // let xMove = self.xRelative;
            // let yMove = self.yRelative;

            // let normalVec = cc.pNormalize(cc.v2(xMove, yMove));
            // if(self.skill.active) {
            //     cc.loader.loadRes("skill/skillbullet", function (err, prefab) {
            //         var newNode = cc.instantiate(prefab);
            //         self.skilleffects.addChild(newNode);
            //         let action = cc.moveBy(1, cc.v2(normalVec.x*1000, normalVec.y*1000))   
            //         newNode.runAction(action);
            //         self.scheduleOnce(function() {
            //             newNode.destroy();
            //         }, 1.5);
            //     });
            // }

            // self.skillBg.active = false;
            // self.skill.active = false;   

            
            
        });

        //攻击范围
        self.range = this.node.getChildByName("range");
        var ctx = self.range.getComponent(cc.Graphics);
        ctx.strokeColor = cc.Color.BLUE;
        ctx.circle(self.range.x, self.range.y, Math.sqrt(self.attackDistance) * Global.unitLength);
        ctx.stroke();
        

    },

    start () {

    },

    update (dt) {
        if (Global.stopFrame === false) {
            this.setAttackTarget();
        }
        
    },

    setAttackTarget: function () {
        let enemyFactory = require("enemyFactory");

        //设置攻击目标
        if (enemyFactory.waveList.length > 0) { // && !!!self.attckTarget
            for (let i = enemyFactory.waveList.length - 1; i >= 0 ; i--) {  
                let enemyNode = enemyFactory.waveList[i];
                if(!!enemyNode) {
                    let x = Math.ceil(Math.abs(self.node.position.x - enemyNode.x)/Global.unitLength);
                    let y = Math.ceil(Math.abs(self.node.position.y - enemyNode.y)/Global.unitLength);
                    if(x*x + y*y < self.attackDistance) {
                        self.attckTarget = enemyNode;
                        cc.log("距离:"+self.attckTarget);
                        this.attack();
                        cc.log("曼哈顿x: "+x+" 曼哈顿y: "+y);
                        break;
                    }
                }

            }
        }

        //判断攻击目标是否在射程范围里, self.attckTarget.parent用于判断该节点是否被销毁
        // if(!!self.attckTarget && self.attckTarget.parent) {
        //     let x = Math.ceil(Math.abs(self.node.position.x - self.attckTarget.x)/Global.unitLength);
        //     let y = Math.ceil(Math.abs(self.node.position.y - self.attckTarget.y)/Global.unitLength);
        //     if(x*x + y*y > self.attackDistance) {
        //         self.attckTarget = null;
        //         cc.log("目标丢失，切换新的目标");
        //     } else {
        //         //cc.log("index: " + self.attckTarget.wayIndex);
        //         this.attack();
        //     }
        // } else if(!!self.attckTarget && !!!self.attckTarget.parent) {
        //     self.attckTarget = null;
        // }



    },

    attack: function () {
        //实例化子弹
        if(Global.stopFrame == false && !!self.attckTarget && Global.frameIndex % self.attackRate == 0) {
           
            cc.loader.loadRes("skill/skillbullet", function (err, prefab) {
                var newNode = cc.instantiate(prefab);
                newNode.x = self.node.x;
                newNode.y = self.node.y;
                self.canvas.addChild(newNode);
                newNode.getComponent("bullet").setTarget(self.attckTarget);
            });
           
        }
    },

    convertWordPosition: function (node) {
        return node.parent.convertToWorldSpaceAR(node);
    },



});
