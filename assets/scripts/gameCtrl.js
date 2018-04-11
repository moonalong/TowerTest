
const Global  = require("global");
const enemyFactory = require("enemyFactory");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        var collider = cc.director.getCollisionManager();
        collider.enabled =true;
        
        let self = this;
        self.hero = null;
        self.skill = cc.find("Canvas/skill");
        self.skill.active = false;

        self.skillRange = cc.find("Canvas/skillRange");
        self.skillRange.active = false;

        self.hurtRange = cc.find("Canvas/hurtRange");
        self.hurtRange.active = false;
        
        this.btnReply = cc.find("Canvas/btnReplay");
        this.btnReply.on('click', this.replayGame, this);

        self.rangePosition = null; //范围性攻击技能坐标点 
        self.rangeR = null; //范围性攻击技能半径
        

        this.node.on('touchstart', function ( event ) {  
           
            let touchNode = self.getTouchNode(event.getLocation(), self.node);
            
            if(!!touchNode && touchNode.name == "zhugeliang") {
                cc.log(1)
                Global.stopFrame = true;       
                self.hero = touchNode;
                self.skill.active = true;
                self.skill.setPosition(touchNode.x, touchNode.y);
                self.skill.setAnchorPoint(0,0.5);
            } else if(!!touchNode && touchNode.name == "zhaoyun") {
                cc.log(2)
                Global.stopFrame = true;       
                self.hero = touchNode;
                self.skillRange.active = true;
                self.skillRange.setPosition(touchNode.x,touchNode.y);
                self.hurtRange.active = true;
                self.hurtRange.setPosition(touchNode.x, touchNode.y);
                self.r = Math.sqrt(touchNode.getComponent("towerCtrl").attackDistance) * Global.unitLength;
                self.skillRange.width = self.r*2;
                self.skillRange.height = self.r*2;

                self.hurtRange.width = self.r;
                self.hurtRange.height = self.r;

            }
        });

        this.node.on('touchmove', function ( event ) {  
            let position = event.getLocation();    
            if(!!self.hero && self.hero.name == "zhugeliang") {
                
                self.xRelative = position.x - self.hero.parent.convertToWorldSpaceAR(self.hero).x;
                self.yRelative = position.y - self.hero.parent.convertToWorldSpaceAR(self.hero).y;

                let judge = 1;
                if((self.xRelative < 0 && self.yRelative > 0) || (self.xRelative > 0 && self.yRelative > 0)) {
                    judge = -1;
                }
                let cosa = self.xRelative / Math.sqrt(self.xRelative * self.xRelative + self.yRelative*self.yRelative);
                self.angle = Math.acos(cosa) *180/Math.PI;
                self.skill.setRotation(self.angle*judge);    
            } else if(!!self.hero && self.hero.name == "zhaoyun") {
                let newPosition = self.hurtRange.parent.convertToNodeSpaceAR(position)
                self.hurtRange.setPosition(newPosition.x, newPosition.y);
                let distance = cc.pDistance(self.hurtRange.position, self.skillRange.position);
                if(distance > self.r) {
                    cc.log("超出范围")
                    let rangeX = newPosition.x - self.hero.x;
                    let rangeY = newPosition.y - self.hero.y;

                    let judge = 1; //(rangeX < 0 && rangeY > 0) (rangeX > 0 && rangeY > 0)
                    if(false) {
                        judge = -1;
                    }
                    let cosa = rangeX / Math.sqrt(rangeX * rangeX + rangeY * rangeY);
                    let sina = rangeY / Math.sqrt(rangeX * rangeX + rangeY * rangeY);
                    self.hurtRange.setPosition(self.hero.x + self.r*cosa*judge, self.hero.y + self.r*sina*judge);
                }
            }

        });

        this.node.on('touchend', function ( event ) {  
            Global.stopFrame = false;
            self.skill.active = false;
            let xMove = self.xRelative;
            let yMove = self.yRelative;
            let normalVec = cc.pNormalize(cc.v2(xMove, yMove));

            if(normalVec.x != 0 && normalVec.y != 0) {
                if(!!self.hero && self.hero.name == "zhugeliang") {
                    Global.Replay[Global.frameIndex] = {
                        actionType:"touchend", 
                        func:self.skillAttack, 
                        msg:{
                            normalVec:normalVec,
                            heroName:self.hero.name,
                        }
                    };
                    self.skillAttack(normalVec, self.hero);
                }
            }

            if(!!self.hero && self.hero.name == "zhaoyun") {

                self.skillRange.active = false;
                self.rangePosition = self.hurtRange.position;
                self.rangeR = self.hurtRange.width / 2;


                Global.Replay[Global.frameIndex] = {
                    actionType:"touchend", 
                    func:self.skillAttack2, 
                    msg:{
                        obj:self.hurtRange,
                        heroName:self.hero.name,
                        rangeR:self.hurtRange.width,
                        position:self.hurtRange.position,
                        selfobj:self
                    }
                };
                self.skillAttack2(self.hurtRange, self.hurtRange.width, self.hurtRange.position,self);

            }

            self.hero = null;
 
        });

    },

    start () {

    },

    update (dt) {

        if(Global.stopFrame === false) {
            Global.frameIndex = Global.frameIndex + 1;
            this.replayExecuteAction();
            if(enemyFactory.enemyCount == 0) {
                this.btnReply.active = true;
            } else {
                this.btnReply.active = false;
            }
        }

    },

    skillAttack: function(normalVec, hero) {
        hero.getComponent("towerCtrl").attackBySkill(function (skillPrefab) {
            skillPrefab.getComponent("skillCtrl").setDirection(normalVec);
            hero = null;
        });
    },

    skillAttack2: function(obj, rangeR, position, selfobj) {
        obj.setPosition(position.x, position.y);
        obj.width = rangeR;
        obj.height = rangeR;
        obj.getComponent("skillCtrl2").attack();

        selfobj.attackcallback = function() {
            if(obj.active == true) {
                cc.log("attck")
                obj.getComponent("skillCtrl2").attack();
            }
        }

        selfobj.schedule(selfobj.attackcallback,0.5)

        selfobj.scheduleOnce(function () {
            //self.hurtRange.active = false;
            obj.active = false;
            selfobj.unschedule(selfobj.attackcallback);

        },2)
    },

    //取到触摸到的英雄
    getTouchNode: function (touchPos, node) {
        for (let i = 0; i < node.childrenCount; i++) {
            let child = this.node.children[i];
            let boxcollider = child.getComponent(cc.BoxCollider);
            if (!!boxcollider && boxcollider.tag == 10 && cc.rectContainsPoint(child.getBoundingBoxToWorld(), touchPos)) {  
                // 点击在组件内的操作
                  return child;
            } else {  
                this.getTouchNode(touchPos, child);
            }  
        }
    },

    //复盘游戏
    replayGame: function () {
        cc.director.loadScene("main", function () {
            Global.frameIndex = 0;
            enemyFactory.enemyCount = 10;
        });
    },

    //复盘操作执行
    replayExecuteAction: function () {
        
        let actionItem = Global.Replay[Global.frameIndex]
        if(!!actionItem) {
            if(actionItem.actionType == "touchend") {
                let func = actionItem.func;
                let msg = actionItem.msg;
                for (let i = 0; i < this.node.childrenCount; i++) {
                    let child = this.node.children[i];
                    if(child.name == msg.heroName) {
                        cc.log("复现: "+Global.frameIndex);
                        if(msg.heroName == "zhugeliang") {
                            func(msg.normalVec, child);
                        } else if(msg.heroName == "zhaoyun") {
                            let hurtRange = cc.find("Canvas/hurtRange");
                            hurtRange.active = true;
                            func(hurtRange, msg.rangeR, msg.position, msg.selfobj);
                        }
                        
                    }
                }
            }
        }
        
    },



});
