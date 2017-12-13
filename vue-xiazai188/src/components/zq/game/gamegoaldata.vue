<template>
  <div class="gamegoaldata">
    <div class="well well-sm">
      <i class="sm-line"></i>
          事件
    </div>
    <div class="zhedie-con">
        <div class="sk-box1 bg_gray">
            <ul class="shikuang-line">
                <li class="d-zt-box"><span class="d-zt">开始</span></li>
                <li class="shikuang-lineLeft hr-box">
                    <span class="sk-time f12">14’</span>
                    <span class="shikuang-ball"><i class="jiaohuan"></i> </span>
                    <div class="ren-name f13">稻本润一</div>
                    <code class="jinqiu f12">静秋</code>
                </li>
                <li class="d-zt-box"><span class="d-zt">结束</span></li>
            </ul>
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
      'gamegoaldata': {}
    };
  },
  created () {
    var gamegoaldataUrl = 'http://api.tiyu.caishencai.com/Api/Api/index/cc/gamegoaldata/id/' + this.matchid;
    this.$http.jsonp(gamegoaldataUrl).then(response => {
      response = response.body;
      this.gamegoaldata = response;
    }, response => {
    });
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
p{
  margin:0;
  padding:0;
}
.zhedie-con{
  width:100%;
  height:auto;
  overflow:hidden;
}
.sk-box1{
  font-size:12px;
  widdth:100%;
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

.shikuang-line{
  background: #e2e2e2;
  width: 1px;
  margin: .533333rem auto 0;
  height: 100%;
  display: inline-block;
  margin-left:50%;
  li{
    width: 15rem;
    line-height: 40px;
    margin-bottom:15px;
    background: #fff;
    border: 1px solid #e2e2e2;
    position: relative;
    border-radius: 2px;
  }
  li.d-zt-box {
    margin-bottom: 20px;
    height: 50px;
    background: 0 0;
    border: none;
    width: 50px;
    clear: both;
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
    line-height: 25px;
    .jh{
      p{
        border-bottom: 1px solid #f4f4f4;
      }
    }
    .jiaohuan{
      margin-top:5px;
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
}
.dianqiu{
  background-position: center -143px;
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
