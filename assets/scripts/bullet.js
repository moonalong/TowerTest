const Global  = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        hurt: {
            default: 5,
            type: cc.Integer
        }
    },

    onLoad () {
        this.attckTarget = null;
    },

    start () {

    },

    update (dt) {

        if(!!this.attckTarget && !!this.attckTarget._parent) {
            //取到攻击方向
            let xVector = this.attckTarget.x - this.node.x;
            let yVector = this.attckTarget.y - this.node.y;
            let normalVec = cc.pNormalize(cc.v2(xVector, yVector));
            
            let action = cc.moveBy(1, cc.v2(normalVec.x*Global.unitLength*5, normalVec.y*Global.unitLength*5))   
            this.node.runAction(action);

            let distance = cc.pDistance(this.node.position, this.attckTarget.position);
            
            if(distance < Global.unitLength*4) {
                //敌人受到伤害
                this.attckTarget.getComponent("enemy").takeDemage(this.hurt);
                //销毁自身
                this.node.destroy();
            }

        } else {
            this.node.destroy();
        }

    },

    setTarget: function (_target) {
        this.attckTarget = _target;
    },


});
