
const Global  = require("global");
const enemyWave = require("enemyWave")

var self = null;
var enemyFactory = cc.Class({

    extends: cc.Component,

    properties: {

    },

    statics: {
        waveList: [],
        destroyEnemy: function (_index) {
            for (let i = 0; i < enemyFactory.waveList.length; i++) {
                let enemy = enemyFactory.waveList[i];

                if(enemy.index === _index) {
                    enemyFactory.waveList.splice(i,1);
                    cc.log(enemyFactory.waveList)
                    cc.log("还剩余敌人"+enemyFactory.waveList.length);
                    break;
                }
            }
        }

    },

    onLoad () {
        self = this;
        enemyFactory.waveList = [];
        self.startPos = cc.find("Canvas/startPos");

        self.index = 0;

    },

    start () {

    },

    update (dt) {

        if (Global.frameIndex % (60*4) == 0) {
            self.index = self.index + 1;
            (function (index) {
                cc.loader.loadRes("enemy/enemy", function (err, prefab) {
                    if(!!err) {
                        console.error(err);    
                    }
                    let newNode = cc.instantiate(prefab);
                    newNode.index = index + 1;
                    cc.find("Canvas").addChild(newNode);
                    enemyFactory.waveList.push(newNode);
                });
            })(self.index)
        }
    },

});
