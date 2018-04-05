const Global  = require("global");

var drawblock = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    statics: {
        wayPoints: []
    },

    onLoad () {

        var ctx = this.node.getComponent(cc.Graphics);
        // 生成单位格子
        for (let w = 0; w < 112; w++) {
            for (let h = 0; h < 64; h++) {
                ctx.lineWidth = 1;
                ctx.strokeColor = cc.Color.RED;
                ctx.rect(Global.marginW + w*Global.unitLength, h*Global.unitLength, Global.unitLength, Global.unitLength);
                ctx.stroke();
            }
        }

        //生成路径1
        for (let w = 12; w < 100; w++) {
            let h = 12;
            drawblock.wayPoints.push({
                w:w,
                h:h
            });
            ctx.lineWidth = 1;
            ctx.strokeColor = cc.Color.GREEN;
            ctx.circle(Global.marginW + w*Global.unitLength, h*Global.unitLength, 2);
            ctx.stroke();              
        }

        //生成路径2
        for (let h = 12; h < 53; h++) {
            let w = 100;
            drawblock.wayPoints.push({
                w:w,
                h:h
            });
            ctx.lineWidth = 1;
            ctx.strokeColor = cc.Color.GREEN;
            ctx.circle(Global.marginW + w*Global.unitLength, h*Global.unitLength, 2);
            ctx.stroke();
        }

        //生成路径3
        for (let w = 99; w > 11; w--) {
            let h = 52;
            drawblock.wayPoints.push({
                w:w,
                h:h
            });
            ctx.lineWidth = 1;
            ctx.strokeColor = cc.Color.GREEN;
            ctx.circle(Global.marginW + w*Global.unitLength, h*Global.unitLength, 2);
            ctx.stroke();
        }




    },


});
