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
        for (let w = 0; w < 71; w++) {
            for (let h = 0; h < 40; h++) {
                ctx.lineWidth = 1;
                ctx.strokeColor = cc.Color.RED;
                ctx.rect(Global.marginW + w*Global.unitLength, h*Global.unitLength, Global.unitLength, Global.unitLength);
                ctx.stroke();
            }
        }

        //生成路径1
        for (let w = 3; w < 30; w++) {
            let h = 5;
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
        for (let h = 6; h < 10; h++) {
            let w = 29;
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
        for (let w = 30; w < 68; w++) {
            let h = 9;
            drawblock.wayPoints.push({
                w:w,
                h:h
            });
            ctx.lineWidth = 1;
            ctx.strokeColor = cc.Color.GREEN;
            ctx.circle(Global.marginW + w*Global.unitLength, h*Global.unitLength, 2);
            ctx.stroke();
        }

        //生成路径4
        for (let h = 10; h < 20; h++) {
            let w = 67;
            drawblock.wayPoints.push({
                w:w,
                h:h
            });
            ctx.lineWidth = 1;
            ctx.strokeColor = cc.Color.GREEN;
            ctx.circle(Global.marginW + w*Global.unitLength, h*Global.unitLength, 2);
            ctx.stroke();
        }

        //生成路径5
        for (let w = 66; w > 20; w--) {
            let h = 19;
            drawblock.wayPoints.push({
                w:w,
                h:h
            });
            ctx.lineWidth = 1;
            ctx.strokeColor = cc.Color.GREEN;
            ctx.circle(Global.marginW + w*Global.unitLength, h*Global.unitLength, 2);
            ctx.stroke();
        }

        //生成路径6
        for (let h = 20; h < 38; h++) {
            let w = 21;
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
