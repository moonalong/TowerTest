
const Global  = require("global");
const enemyWave = require("enemyWave")

var self = null;
var enemyFactory = cc.Class({

    extends: cc.Component,

    properties: {

    },

    statics: {
        waveList: [],
        enemyCount: 10,
        destroyEnemy: function (_index) {
            for (let i = 0; i < enemyFactory.waveList.length; i++) {
                let enemy = enemyFactory.waveList[i];

                if(enemy.index === _index) {
                    enemyFactory.waveList.splice(i,1);
                    enemyFactory.enemyCount = enemyFactory.enemyCount - 1;
                    cc.log("还剩余敌人" + enemyFactory.enemyCount);
                    break;
                }
            }
        }

    },

    onLoad () {
        self = this;
        enemyFactory.waveList = []; 
        self.index = 0;

    },

    start () {

    },

    update (dt) {

        if (Global.frameIndex % (60*4) == 0 && Global.frameIndex < (60*4)*3 + 1) {
            self.index = self.index + 1;
            (function (index) {
                cc.loader.loadRes("enemy/enemy", function (err, prefab) {
                    if(!!err) {
                        console.error(err);    
                    }
                    let newNode = cc.instantiate(prefab);
                    newNode.index = index + 1;
                    newNode.wayIndex = 0;
                    cc.find("Canvas").addChild(newNode);
                    enemyFactory.waveList.push(newNode);
                });
            })(self.index)
        } else if(Global.frameIndex % (60*4) == 0 && Global.frameIndex > (60*4)*3 && Global.frameIndex < (60*4)*6 + 1) {
            self.index = self.index + 1;
            (function (index) {
                cc.loader.loadRes("enemy/enemySpeed", function (err, prefab) {
                    if(!!err) {
                        console.error(err);    
                    }
                    let newNode = cc.instantiate(prefab);
                    newNode.index = index + 1;
                    newNode.wayIndex = 0;
                    cc.find("Canvas").addChild(newNode);
                    enemyFactory.waveList.push(newNode);
                });
            })(self.index)
        } else if(Global.frameIndex % (60*4) == 0 && Global.frameIndex > (60*4)*6 && Global.frameIndex < (60*4)*9 + 1) {
            self.index = self.index + 1;
            (function (index) {
                cc.loader.loadRes("enemy/enemySpeedUp", function (err, prefab) {
                    if(!!err) {
                        console.error(err);    
                    }
                    let newNode = cc.instantiate(prefab);
                    newNode.index = index + 1;
                    newNode.wayIndex = 0;
                    cc.find("Canvas").addChild(newNode);
                    enemyFactory.waveList.push(newNode);
                });
            })(self.index)
        } else if(Global.frameIndex === (60*4)*10 + 1) {
            self.index = self.index + 1;
            (function (index) {
                cc.loader.loadRes("enemy/enemyBig", function (err, prefab) {
                    if(!!err) {
                        console.error(err);    
                    }
                    let newNode = cc.instantiate(prefab);
                    newNode.index = index + 1;
                    newNode.wayIndex = 0;
                    cc.find("Canvas").addChild(newNode);
                    enemyFactory.waveList.push(newNode);
                });
            })(self.index)
        }


        //按照距离终点的远近排序
        this.quickSort(enemyFactory.waveList, 0, enemyFactory.waveList.length - 1);

     
    },

    partition: function (r, first, end) {
        let i = first; 
        let j = end;
        while(i < j) {
            while(i<j && r[i].wayIndex <= r[j].wayIndex) j--;
            if (i < j) {
                let k = r[i];
                r[i] = r[j];
                r[j] = k;
                i++;
            }

            while(i < j && r[i].wayIndex <= r[j].wayIndex) i++;
            if (i < j) {
                let k = r[i];
                r[i] = r[j];
                r[j] = k;
                j--;
            }
        }
        return i;
    },

    //使用快排，按距离终点的远近重新排序
    quickSort: function (pointarray, first, end) {
        if (first < end) {
            let pivot = this.partition(pointarray, first, end);
            this.quickSort(pointarray, first, pivot - 1);
            this.quickSort(pointarray, pivot + 1, end);
        }
    },

});
