
const Global  = require("global");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

    },

    start () {

    },

    update (dt) {
        if(Global.stopFrame === false) {
            Global.frameIndex = Global.frameIndex + 1;
        }
        
        //cc.log("全局帧: "+Global.frameIndex);
    },
});
