<template>
  <div class="gamegoaldata">
    <div class="well well-sm">
      <i class="sm-line"></i>
          事件
    </div>
    <div class="zhedie-con">
        <div class="sk-box1 bg_gray">
            <div class="d-zt-box"><span class="d-zt">开始</span></div>
            <ul class="shikuang-line ">
                <li class="hr-box" v-for="(item, index) in curdataStr" :class="Position[index]">
                    <span class="sk-time f12">{{item.Minute}}’</span>
                    <span class="shikuang-ball">
                      <i :class="EnameType[index]" v-if="item.Event!=undefined"></i>
                      <i class="jiaohuan" v-else></i>
                    </span>
                    <div class="ren-name f13" v-if="item.Event!=undefined">{{item.Pname}}</div>
                    <div class="jh f13" v-else>
                      <p>{{item.Upname}}<em class="green-arrow"></em></p> 
                      <p class="w_gray">{{item.Downname}}<em class="red-arrow"></em></p>
                    </div>
                    <code class="jinqiu f12" v-show="item.Event!=undefined">{{item.Ename}}</code>
                </li>
            </ul>
            <div class="d-zt-box"><span class="d-zt">结束</span></div>
        </div>
        <div class="sk-intro">
          <img src="http://tccache.500.com/mobile/touch/images/bifen/intro.png" width="100%">
        </div>
    </div>   
  </div>
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,  // 获得路由传过来的id值
      'gamegoaldata': {},
      'curdataStr': {}
    };
  },
  created () {
    var gamegoaldataUrl = 'live/Api/Api/index/cc/gamegoaldata/id/' + this.matchid;
    this.$http.jsonp(gamegoaldataUrl).then(response => {
      response = response.body;
      this.gamegoaldata = response;
      var goalnew = this.gamegoaldata.Goal_new;
      var substitutes = this.gamegoaldata.Substitutes;

        if (goalnew !== undefined || substitutes !== undefined) {
            if (goalnew.length !== 0 || substitutes.length !== 0) {
                this.curdataStr = goalnew.concat(substitutes); // 两个数据合并
                this.curdataStr.sort(function (a, b) {   // 按顺序排序
                return b.Minute - a.Minute;   // 按大到小
                });
            }
        }
    }, response => {
    });
  },
  computed: {
    Position () {
      var position = [];
      var position2 = '';
      for (var i = 0; i < this.curdataStr.length; i++) {
        if (this.curdataStr[i].Type === '1') {
           position2 = 'shikuang-lineLeft';
           position.push(position2);
        } else if (this.curdataStr[i].Type === '2') {
          position2 = 'shikuang-lineRight';
           position.push(position2);
        }
      };
      return position;
    },
    EnameType () {
      var enametype = [];
      var event = '';
      for (var i = 0; i < this.curdataStr.length; i++) {
              console.log(this.curdataStr[i].Event);
          if (this.curdataStr[i].Event === 0) {
            event = 'black-ball';
            enametype.push(event);
          } else if (this.curdataStr[i].Event === 1) {
            event = 'dianqiu';
            enametype.push(event);
          } else if (this.curdataStr[i].Event === 2) {
            event = 'wulong';
            enametype.push(event);
          } else if (this.curdataStr[i].Event === 3) {
            event = 'yellow-card';
            enametype.push(event);
          } else if (this.curdataStr[i].Event === 4) {
            event = 'red-card';
            enametype.push(event);
          } else if (this.curdataStr[i].Event === 5) {
            event = 'red-yellow-card';
            enametype.push(event);
          } else if (this.curdataStr[i].Event === 8) {
            event = 'dian-ball';
            enametype.push(event);
          } else {
             event = 'no';
             enametype.push(event);
          }
      };
       return enametype;
    }
  }
};
</script>

<style lang="less" scoped>
a{
  text-decoration: none; 
  color:#000;
} 
a:hover,a:visited{
  text-decoration: none;border:0;
}
p,ul,li{
  margin:0;
  padding:0;
}
ul,li,ol{
  list-style:none;
}
.zhedie-con{
  width:100%;
  height:auto;
  overflow:hidden;
}
.well-sm{
    background:#f5f5f5;
    padding:8px 10px;
    font-size:12px;
  i.sm-line{
    width:2px;
    height:15px;
    background: #f32b1b;
    display: inline-block;
    vertical-align: middle;
  }
}
.nodata-mess{
  margin:100px 0;
  text-align:center;
}
.sk-box1{
  widdth:100%;
  padding-bottom:15px;
}
.f12{
  font-size:12px;
}
.f13{
  font-size:13px;
}
.sk-time {
  position: absolute;
  top: 0;
  width: .933333rem;
  color: #999;
}
.shikuang-ball {
  width: 35px;
  height: 35px;
  border-radius: 59%;
  display: inline-block;
  background: #fff;
  text-align: center;
  border: 1px solid #d0d0d0;
  position: absolute;
  top: 0;
}
.ren-name {
  position: relative;
  top: 0;
  color: #333;
  display: inline-block;
}
.d-zt-box {
    background: #e2e2e2;
    width: 1px;
    height: 100%;
    display: inline-block;
    margin-left:50%;
  }

.shikuang-line{
  background: #e2e2e2;
  width: 1px;
  padding: .533333rem 0;
  height: 100%;
  display: inline-block;
  margin-left:50%;
  li{
    width:10rem;
    line-height: 40px;
    margin-bottom:15px;
    background: #fff;
    border: 1px solid #e2e2e2;
    position: relative;
    border-radius: 2px;
  }
  .shikuang-lineRight {
    float: left;
    text-align: left;
    padding-left: 20px;
    .shikuang-ball {
      margin:0;
      left: -18px;
    }
    .jh{
      p{
        padding-left: 2px;
        position: relative;
      }
    }
  }
  .shikuang-lineLeft {
    float: right;
    text-align: right;
    padding-right: 27px;
    .shikuang-ball {
      margin: 0 0 0 0;
      right: -11px;
    }
    .sk-time {
      right: -50px;
      top: -10px;
      text-align: left;
    }
    .jh{
      p{
        padding-right: 2px;
      }
    }
  }
  .sk-time {
    margin: 0 0 0 -70px;
    text-align: right;
  }
  .hr-box{
    line-height: 30px;
    .jh{
      p{
        border-bottom: 1px solid #f4f4f4;
      }
    }
    .jiaohuan{
      margin-top:8px;
    }
  }
}
.d-zt {
  width: 50px;
  height:50px;
  line-height: 50px;
  border: 1px solid #d0d0d0;
  text-align: center;
  border-radius: 50%;
  color: #333;
  display: inline-block;
  background: #fff;
  position: relative;
  margin-left:-25px;
  font-size:12px;
}

.shikuang-lineLeft code {
  margin-left: .213333rem;
}
.shikuang-lineRight code {
  margin-right: .213333rem;
}
.red-card, .yellow-card {
  margin: 0 auto;
  width:  14px;
  height: 14px;
  display: block;
  position: relative;
  top: 10px;
}
.green-arrow,.red-arrow{
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.red-yellow-card em, .yellow-card {
  background: #ffe91f;
}
.jinqiu{
  width: auto;
  height: 20px;
  line-height: 20px;
  border-radius: 5px;
  padding:0 5px;
  color: #fff;
  text-align: center;
  display: inline-block;
  position: relative;
  top: 0;
}
.red-card{background: #ff3d10;}
.black-ball, .dian-ball, .jiaohuan, .red-ball, .wulong,.red-yellow-card, .dianqiu{
  width: 17px;
  height: 17px;
  display: inline-block;
}
.jinqiu {
  background: #0bcd0b;
}
.black-ball,.dianqiu,.wulong,.red-yellow-card,.dian-ball,.jiaohuan,.green-arrow,.red-arrow{
  background: url("../../../common/img/detail-icon.png") no-repeat;
}
.black-ball {
  background-position: center -107px;
  margin-top:8px;
}
.dianqiu{
  background-position: center -143px;
  margin-top:8px;
}
.dian-ball{
  background-position: center -250px;
}
.wulong{
  background-position: center -215px;
}
.red-yellow-card{
  background-position: center 0px;
}
.jiaohuan{
  background-position: center -177px;
}
.green-arrow{
  background-position: center -280px;
}
.red-arrow{
  background-position: center -310px;
}
.sk-intro {
  background: #fff;
  padding: 10px 60px;
  text-align: center;
}
.bg_gray {
    background: #f5f5f5;
}
</style>
