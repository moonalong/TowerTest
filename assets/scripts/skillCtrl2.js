

cc.Class({
    extends: cc.Component,

    properties: {
        hurt: cc.Integer,
    },

    onLoad () {

    },

    start () {

    },

    update (dt) {
    
    },

    //攻击所有在技能范围内的敌人
    attack: function () {
        let enemyFactory = require("enemyFactory");

        if (enemyFactory.waveList.length > 0) {
            for (let i = enemyFactory.waveList.length - 1; i >= 0 ; i--) {  
                let enemyNode = enemyFactory.waveList[i];
                if(!!enemyNode) {
                    let attackdistance = cc.pDistance(this.node.position, enemyNode.position);  
                    if (attackdistance < this.node.width/2) {
                        enemyNode.getComponent("enemy").takeDemage(this.hurt);
                    }
                }
            }
        }
        
    },

});
