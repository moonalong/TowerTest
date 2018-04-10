const Global  = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        hurt: 50,
    },

    onLoad () {
        this.canvas = cc.find("Canvas");
        this.skilldistance = 70*70 + 120*120;
        this.normalVec = null;
        
    },

    start () {

    },

    update () {    
        if(!!this.normalVec) {
            let action = cc.moveBy(1, cc.v2(this.normalVec.x*Global.unitLength*5, this.normalVec.y*Global.unitLength*5))   
            this.node.runAction(action);
        }
        let x = Math.ceil(Math.abs(this.node.position.x - this.canvas.x)/Global.unitLength);
        let y = Math.ceil(Math.abs(this.node.position.y - this.canvas.y)/Global.unitLength);
        if(x*x + y*y > this.skilldistance) {
            this.node.destroy();
        }
        this.attack();
    },

    setDirection: function (normalVec) {
        this.normalVec = normalVec;

        cc.log("技能矢量")
        cc.log(this.normalVec);
    },

    //攻击所有与技能接触的敌人
    attack: function () {
        let enemyFactory = require("enemyFactory");

        if (enemyFactory.waveList.length > 0) {
            for (let i = enemyFactory.waveList.length - 1; i >= 0 ; i--) {  
                let enemyNode = enemyFactory.waveList[i];
                if(!!enemyNode) {
                    let attackdistance = cc.pDistance(this.node.position, enemyNode.position);  
                    if (attackdistance < this.node.width) {
                        enemyNode.getComponent("enemy").takeDemage(this.hurt);
                    }
                }
            }
        }
        
    },

    


});
