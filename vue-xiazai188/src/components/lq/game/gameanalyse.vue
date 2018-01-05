<template>
  <div class="gameanalyse">
    <div class="zhegie-wrap">
      <div calss="zhedie-box">
        <div class="well well-sm">
          <i class="sm-line"></i>
              历史交战
        </div> 
        <div class="zhedie-con" v-if="meetings!=undefined && meetings!=''">
            <div class="hd" :selectum="selectNum">近{{selectNum}}场交战</div>
            <el-row :gutter="2" class="table-header little-word">
              <el-col :span="5"><div class="grid-content">赛事</div></el-col>
              <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
              <el-col :span="4"><div class="grid-content fc">比分</div></el-col>
              <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
              <el-col :span="4" >
                <div class="grid-content fr">
                  <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link">
                      赛果<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">赛果</el-dropdown-item>
                      <el-dropdown-item command="b">让球</el-dropdown-item>
                      <el-dropdown-item command="c">大小</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>          
            <div class="table">
              <el-row :gutter="5" v-for="(meeting, index) in meetings" :key='index' v-if="index<10" class="list">
                <el-col :span="5">
                  <div class="grid-content little-word">
                  <p v-if="competitions[meeting.Id[1]].ShortName!=''">{{competitions[meeting.Id[1]].ShortName}}</p>
                  <p v-else>{{competitions[meeting.Id[1]].Name}}</p>
                  <p :meetingdate="meetingDate[index]">{{meetingDate[index] | filterdata}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content homename fc" v-if="teams[meeting.Id[2]]!=''">
                  {{teams[meeting.Id[2]]}}
                  </div>
                  <div class="grid-content homename fc" v-else>
                  --
                  </div>                  
                </el-col>
                <el-col :span="4">
                  <div class="grid-content score">
                    <span v-if="meeting.AScore[0]===''">--:--</span> 
                    <span v-else>{{meeting.AScore[0]}}:{{meeting.BScore[0]}}</span>                 
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content awayname fc" v-if="teams[meeting.Id[3]]!=''">
                  {{teams[meeting.Id[3]]}}
                  </div>
                  <div class="grid-content awayname fc" v-else>
                  --
                  </div>                  
                </el-col>
                <el-col :span="3">
                  <div class="grid-content sg" :matchresult="matchResult" :class="matchBgcolor[index]" v-show="matchResultShow">{{matchResult[index]}}</div>
                  <div class="grid-content bglittle" v-show="HandicapShow" v-if="meeting.Handicap!=''">{{meeting.Handicap}}</div>
                   <div class="grid-content bglittle" v-show="HandicapShow" v-else>--</div>
                  <div class="grid-content bglittle" v-if="meeting.Overunder===''" v-show="matchresultShow">--</div>
                  <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{meeting.Overunder}}</div>          
                </el-col>
              </el-row>
            </div>
        </div>
        <div class="nodata-mess" v-else>暂无数据</div>    
      </div>
    </div> 
    <div  class="zhegie-wrap">
      <div calss="zhedie-box">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                近期战绩
            </div>
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="tabExent('a')" :class="{'active': tabItemShowa}">主</li>
                <li lable="b" @click="tabExent('b')" :class="{'active': tabItemShowb}">客</li>
              </ul>
            </div>
          </div>
          <div class="zhedie-con" v-if="teamHistorys!=undefined">
            <div class="tab-item" v-show="tabItemShowa">
              <div v-if="homeHistorys!=undefined && homeHistorys.length!=0">
                <div class="hd" :homehistoryNum="homeHistoryNum">近{{homeHistoryNum}}场交战</div>
                <el-row :gutter="2" class="table-header little-word">
                  <el-col :span="5"><div class="grid-content">赛事</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
                  <el-col :span="4"><div class="grid-content fc">比分</div></el-col>
                  <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
                  <el-col :span="4" >
                    <div class="grid-content fr">
                      <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                          赛果<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">赛果</el-dropdown-item>
                          <el-dropdown-item command="b">让球</el-dropdown-item>
                          <el-dropdown-item command="c">大小</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
                <div class="table">
                  <el-row :gutter="5" v-for="(homeHistory, index) in homeHistorys" :key='index' v-if="index<10" class="list">
                    <el-col :span="5">
                      <div class="grid-content little-word">
                      <p v-if="competitions[homeHistory.Id[1]].ShortName!=''">{{competitions[homeHistory.Id[1]].ShortName}}</p>
                      <p v-else>{{competitions[homeHistory.Id[1]].Name}}</p>
                      <p :homeHistorydate="homeHistoryDate[index]">{{homeHistoryDate[index] | filterdata}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content homename fc" v-if="teams[homeHistory.Id[2]]!=''">
                      {{teams[homeHistory.Id[2]]}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content score">
                        <span v-if="homeHistory.AScore[0]===''">--:--</span> 
                        <span v-else>{{homeHistory.AScore[0]}}:{{homeHistory.BScore[0]}}</span> 
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[homeHistory.Id[3]]!=''">
                      {{teams[homeHistory.Id[3]]}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content sg" :teamhistoryresult="homehistoryResult" :class="homehistoryBgcolor[index]" v-show="matchResultShow">{{homehistoryResult[index]}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow" v-if="homeHistory.Handicap!=''">{{homeHistory.Handicap}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow" v-else>--</div>
                      <div class="grid-content bglittle" v-if="homeHistory.Overunder===''" v-show="matchresultShow">--</div>
                      <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{homeHistory.Overunder}}</div>          
                    </el-col>
                  </el-row> 
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--近期比赛主队 完-->
            <div class="tab-item" v-show="tabItemShowb"> <!--近期比赛客队-->
              <div v-if="awayHistorys!=undefined && awayHistorys.length!=0">
                <div class="hd" :awayhistoryNum="awayHistoryNum">近{{awayHistoryNum}}场交战</div>
                <el-row :gutter="2" class="table-header little-word">
                  <el-col :span="5"><div class="grid-content">赛事</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
                  <el-col :span="4"><div class="grid-content fc">比分</div></el-col>
                  <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
                  <el-col :span="4" >
                    <div class="grid-content fr">
                      <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                          赛果<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">赛果</el-dropdown-item>
                          <el-dropdown-item command="b">让球</el-dropdown-item>
                          <el-dropdown-item command="c">大小</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
                <div class="table">
                  <el-row :gutter="5" v-for="(awayHistory, index) in awayHistorys" :key='index' v-if="index<10" class="list">
                    <el-col :span="5">
                      <div class="grid-content little-word">
                      <p v-if="competitions[awayHistory.Id[1]].ShortName!=''">{{competitions[awayHistory.Id[1]].ShortName}}</p>
                      <p v-else>{{competitions[awayHistory.Id[1]].Name}}</p>
                      <p :awayHistorydate="awayHistoryDate[index]">{{awayHistoryDate[index] | filterdata}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content homename fc" v-if="teams[awayHistory.Id[2]]!=''">
                      {{teams[awayHistory.Id[2]]}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content score">
                        <span v-if="awayHistory.AScore[0]===''">--:--</span> 
                        <span v-else>{{awayHistory.AScore[0]}}:{{awayHistory.BScore[0]}}</span>                                  
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[awayHistory.Id[3]]!=''">
                      {{teams[awayHistory.Id[3]]}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content sg" :awayhistoryresult="awayhistoryResult" :class="awayhistoryBgcolor[index]" v-show="matchResultShow">{{awayhistoryResult[index]}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow" v-if="awayHistory.Handicap!=''">{{awayHistory.Handicap}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow" v-else>--</div>
                      <div class="grid-content bglittle" v-if="awayHistory.Overunder===''" v-show="matchresultShow">--</div>
                      <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{awayHistory.Overunder}}</div>          
                    </el-col>
                  </el-row> 
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--近期比赛客队 完-->
          </div> 
          <div class="nodata-mess" v-else>暂无数据</div>    
      </div>
    </div>
    <div  class="zhegie-wrap">
      <div calss="zhedie-box">
        <div class="well well-sm">
          <div class="fl">
              <i class="sm-line"></i>
              对战双方联赛排名
          </div>
          <div class="fr">
            <ul class="fr-tab">
              <li lable="a" @click="ranktabExent('a')" :class="{'active': ranktabItemShowa}">主</li>
              <li lable="b" @click="ranktabExent('b')" :class="{'active': ranktabItemShowb}">客</li>
            </ul>
          </div>
        </div>
        <div class="zhedie-con" v-if="Standings!=undefined">
          <div class="tab-item" v-show="ranktabItemShowa" v-if="HomeStandings!=undefined && HomeStandings!=null">
            <div v-if="HomeFullTime!=null">
              <div class="tj-Con">
                <div class="tj-item-box">
                  <div class="title">主队排名</div>
                  <div class="table">
                    <table width="100%">
                      <thead class="little-word table-header fc">
                        <tr class="little-word">
                            <td align="center" width="35"></td>
                            <td align="center">场次</td>
                            <td align="center">胜场数</td>
                            <td align="center">负场数</td>
                            <td align="center">平均得分</td>
                            <td align="center">平局失分</td>
                            <td align="center">净得分</td>
                            <td align="center">排名</td>
                            <td align="center">胜率</td>
                        </tr>
                      </thead>
                      <tbody class="table-body">
                        <tr v-if="HomeFullTime.Total!=undefined && HomeFullTime.Total.length!=0">
                          <td align="center little-word">总</td>
                          <td align="center" v-for="(goalTotal, index) in HomeFullTime.Total" :key="index" v-if="goalTotal!=''">{{goalTotal}}</td>
                          <td align="center" v-else>--</td>
                        </tr>
                        <tr v-if="HomeFullTime.Home!=undefined && HomeFullTime.Home.length!=0">
                          <td align="center little-word">主</td>
                          <td align="center" v-for="(goalHome, index) in HomeFullTime.Home" :key="index" v-if="goalHome!=''">{{goalHome}}</td>
                          <td align="center" v-else>--</td>
                        </tr>
                        <tr v-if="HomeFullTime.Away!=undefined && HomeFullTime.Away.length!=0">
                          <td align="center little-word">客</td>
                          <td align="center" v-for="(goalAway, index) in HomeFullTime.Away" :key="index" v-if="goalAway!=''">{{goalAway}}</td>
                          <td align="center" v-else>--</td>
                        </tr>
                        <tr v-if="HomeFullTime.Last6!=undefined && HomeFullTime.Last6.length!=0">
                          <td align="center little-word">近6场</td>
                          <td align="center" v-for="(goalNeutral, index) in HomeFullTime.Last6" :key="index" v-if="goalNeutral!=''">{{goalNeutral}}</td>
                          <td align="center" v-else>--</td>
                        </tr>                                                                            
                      </tbody>
                    </table>
                  </div>
                </div>                                                                       
              </div>              
            </div>
            <div class="nodata-mess" v-else>暂无主队数据</div>
          </div>
          <div class="nodata-mess" v-else>暂无主队数据</div>

          <div class="tab-item" v-show="ranktabItemShowb" v-if="AwayStandings!=undefined && AwayStandings!=null">
            <div v-if="AwayFullTime!=null">
              <div class="tj-Con">
                <div class="tj-item-box">
                  <div class="title">客队排名</div>
                  <div class="table">
                    <table width="100%">
                      <thead class="little-word table-header fc">
                        <tr class="little-word">
                            <td align="center" width="35"></td>
                            <td align="center">场次</td>
                            <td align="center">胜场数</td>
                            <td align="center">负场数</td>
                            <td align="center">平均得分</td>
                            <td align="center">平局失分</td>
                            <td align="center">净得分</td>
                            <td align="center">排名</td>
                            <td align="center">胜率</td>
                        </tr>
                      </thead>
                      <tbody class="table-body">
                        <tr v-if="AwayFullTime.Total!=undefined && AwayFullTime.Total.length!=0">
                          <td align="center little-word">总</td>
                          <td align="center" v-for="(goalTotal, index) in AwayFullTime.Total" :key="index" v-if="goalTotal!=''">{{goalTotal}}</td>
                          <td align="center" v-else>--</td>
                        </tr>
                        <tr v-if="AwayFullTime.Home!=undefined && AwayFullTime.Home.length!=0">
                          <td align="center little-word">主</td>
                          <td align="center" v-for="(goalHome, index) in AwayFullTime.Home" :key="index" v-if="goalHome!=''">{{goalHome}}</td>
                          <td align="center" v-else>--</td>
                        </tr>
                        <tr v-if="AwayFullTime.Away!=undefined && AwayFullTime.Away.length!=0">
                          <td align="center little-word">客</td>
                          <td align="center" v-for="(goalAway, index) in AwayFullTime.Away" :key="index" v-if="goalAway!=''">{{goalAway}}</td>
                          <td align="center" v-else>--</td>
                        </tr>
                        <tr v-if="AwayFullTime.Last6!=undefined && AwayFullTime.Last6.length!=0">
                          <td align="center little-word">近6场</td>
                          <td align="center" v-for="(goalNeutral, index) in AwayFullTime.Last6" :key="index" v-if="goalNeutral!=''">{{goalNeutral}}</td>
                          <td align="center" v-else>--</td>
                        </tr>                                                                            
                      </tbody>
                    </table>
                  </div>
                </div>                                                                       
              </div>             
            </div>
            <div class="nodata-mess" v-else>暂无客队数据</div>          
          </div>
          <div class="nodata-mess" v-else>暂无客队数据</div>
        </div>
        <div class="nodata-mess" v-else>暂无数据</div>
      </div>
    </div>
    <div  class="zhegie-wrap">
      <div calss="zhedie-box">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                对战双方数据统计
            </div>
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="tjtabExent('a')" :class="{'active': tjtabItemShowa}">主</li>
                <li lable="b" @click="tjtabExent('b')" :class="{'active': tjtabItemShowb}">客</li>
              </ul>
            </div>
          </div>
          <div class="zhedie-con">
            <div class="tab-item" v-show="tjtabItemShowa">
              <div>
                <div class="tj-Con">
                  <div class="tj-item-box">
                    <div class="title">平均得分/失分</div>
                    <ul class="ce-tab">
                        <li lable="a" @click="dsftabExent('a')" :class="{'active': dsftabItemShowa}">得分</li>
                        <li lable="b" @click="dsftabExent('b')" :class="{'active': dsftabItemShowb}">失分</li>                      
                    </ul>
                    <div v-if="AVGScoredLost!=undefined">
                      <div class="table" v-show="dsftabItemShowa" v-if="HomeAVGScored!=undefined && HomeAVGScored!=null">
                        <table width="100%" v-for="(homeAVG, str, index) in HomeAVGScored" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                              <tr class="little-word">
                                  <td align="center"></td>
                                  <td align="center">总</td>
                                  <td colspan="6"  align="center">得分</td>
                              </tr>
                              <tr  class="little-word">
                                  <td align="center" width="20"></td>
                                  <td align="center" width="60">场次</td>
                                  <td align="center" width="12.5%">1节</td>
                                  <td align="center" width="12.5%">2节</td>
                                  <td align="center" width="12.5%">3节</td>
                                  <td align="center" width="12.5%">4节</td>
                                  <td align="center" width="70">加时</td>
                                  <td align="center" width="70">全场</td>
                              </tr>
                          </thead>
                          <tbody class="table-body">
                            <tr v-if="homeAVG.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center">{{homeAVG.Total[0]}}</td>
                              <td align="center" v-for="(goalTotal, index) in homeAVG.Total" :key="index" v-if="0 != ( index % 2 )">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="homeAVG.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center">{{homeAVG.Home[0]}}</td>
                              <td align="center" v-for="(goalHome, index) in homeAVG.Home" :key="index" v-if="0 != ( index % 2 )">{{goalHome}}</td>
                            </tr>
                            <tr v-if="homeAVG.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center">{{homeAVG.Away[0]}}</td>
                              <td align="center" v-for="(goalAway, index) in homeAVG.Away" :key="index" v-if="0 != ( index % 2 )">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                      <!--得分-->

                      <div class="table" v-show="dsftabItemShowb" v-if="HomeAVGScored!=undefined && HomeAVGScored!=null">
                        <table width="100%" v-for="(homeAVG, str, index) in HomeAVGScored" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                              <tr class="little-word">
                                  <td align="center"></td>
                                  <td align="center">总</td>
                                  <td colspan="6"  align="center">失分</td>
                              </tr>
                              <tr  class="little-word">
                                  <td align="center" width="20"></td>
                                  <td align="center" width="60">场次</td>
                                  <td align="center" width="12.5%">1节</td>
                                  <td align="center" width="12.5%">2节</td>
                                  <td align="center" width="12.5%">3节</td>
                                  <td align="center" width="12.5%">4节</td>
                                  <td align="center" width="70">加时</td>
                                  <td align="center" width="70">全场</td>
                              </tr>
                          </thead>
                          <tbody class="table-body">
                            <tr v-if="homeAVG.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in homeAVG.Total" :key="index" v-if="0 == ( index % 2 )">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="homeAVG.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in homeAVG.Home" :key="index" v-if="0 == ( index % 2 )">{{goalHome}}</td>
                            </tr>
                            <tr v-if="homeAVG.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in homeAVG.Away" :key="index" v-if="0 == ( index % 2 )">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                      <!--失分-->                      
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--平均得失分 主-->

                  <div class="tj-item-box">
                    <div class="title">球队得分/单双统计</div>
                    <div v-if="TeamScored!=undefined">
                      <div class="table" v-if="HomeScored!=undefined && HomeScored!=null" >
                        <table width="100%" v-for="(homeScored, str, index) in HomeScored" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                            <tr class="little-word">
                                <td align="center"></td>
                                <td align="center">场次</td>
                                <td align="center">70-</td>
                                <td align="center">70-80</td>
                                <td align="center">81-90</td>
                                <td align="center">91-100</td>
                                <td align="center">101-110</td>
                                <td align="center">111-120</td>
                                <td align="center">120+</td>
                                <td align="center">单数</td>
                                <td align="center">双数</td>
                            </tr>
                          </thead>
                          <tbody class="table-body" >
                            <tr v-if="homeScored.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in homeScored.Total" :key="index">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="homeScored.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in homeScored.Home" :key="index">{{goalHome}}</td>
                            </tr>
                            <tr v-if="homeScored.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in homeScored.Away" :key="index">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--球队得分/单双统计 主--> 

                  <div class="tj-item-box">
                    <div class="title">球队总分统计</div>
                    <div v-if="TotalPoints!=undefined">
                      <div class="table" v-if="HomeTotalPoints!=undefined && HomeTotalPoints!=null" >
                        <table width="100%" v-for="(homeScored, str, index) in HomeTotalPoints" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                            <tr class="little-word">
                              <td align="center"></td>
                              <td align="center">场次</td>
                              <td align="center">160-</td>
                              <td align="center">160-170</td>
                              <td align="center">171-180</td>
                              <td align="center">181-190</td>
                              <td align="center">191-200</td>
                              <td align="center">201-210</td>
                              <td align="center">211-220</td>
                              <td align="center">221-230</td>
                              <td align="center">230+</td>
                            </tr>
                          </thead>
                          <tbody class="table-body" >
                            <tr v-if="homeScored.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in homeScored.Total" :key="index">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="homeScored.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in homeScored.Home" :key="index">{{goalHome}}</td>
                            </tr>
                            <tr v-if="homeScored.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in homeScored.Away" :key="index">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--球队总分统计 主--> 

                  <div class="tj-item-box">
                    <div class="title">球队半全场统计(半场/全场)</div>
                    <div v-if="HalfFullTime!=undefined">
                      <div class="table" v-if="HomeHalfFullTime!=undefined && HomeHalfFullTime!=null" >
                        <table width="100%" v-for="(homeScored, str, index) in HomeHalfFullTime" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                            <tr class="little-word">
                              <td align="center"></td>
                              <td align="center">胜/胜</td>
                              <td align="center">胜/负</td>
                              <td align="center">和/胜</td>
                              <td align="center">和/负</td>
                              <td align="center">负/胜</td>
                              <td align="center">负/负</td>
                            </tr>
                          </thead>
                          <tbody class="table-body" >
                            <tr v-if="homeScored.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in homeScored.Total" :key="index">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="homeScored.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in homeScored.Home" :key="index">{{goalHome}}</td>
                            </tr>
                            <tr v-if="homeScored.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in homeScored.Away" :key="index">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--球队半全场统计(半场/全场) 主-->                                                                                                         
                </div>
              </div>
            </div>
            <!--对战双方数据统计主队 完-->

            <div class="tab-item" v-show="tjtabItemShowb">
              <div>
                <div class="tj-Con">
                  <div class="tj-item-box">
                    <div class="title">平均得分/失分</div>
                    <ul class="ce-tab">
                        <li lable="a" @click="dsftabExent('a')" :class="{'active': dsftabItemShowa}">得分</li>
                        <li lable="b" @click="dsftabExent('b')" :class="{'active': dsftabItemShowb}">失分</li>                      
                    </ul>
                    <div v-if="AVGScoredLost!=undefined">
                      <div class="table" v-show="dsftabItemShowa" v-if="AwayAVGScored!=undefined && AwayAVGScored!=null">
                        <table width="100%" v-for="(AwayAVG, str, index) in AwayAVGScored" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                              <tr class="little-word">
                                  <td align="center"></td>
                                  <td align="center">总</td>
                                  <td colspan="6"  align="center">得分</td>
                              </tr>
                              <tr  class="little-word">
                                  <td align="center" width="20"></td>
                                  <td align="center" width="60">场次</td>
                                  <td align="center" width="12.5%">1节</td>
                                  <td align="center" width="12.5%">2节</td>
                                  <td align="center" width="12.5%">3节</td>
                                  <td align="center" width="12.5%">4节</td>
                                  <td align="center" width="70">加时</td>
                                  <td align="center" width="70">全场</td>
                              </tr>
                          </thead>
                          <tbody class="table-body">
                            <tr v-if="AwayAVG.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center">{{AwayAVG.Total[0]}}</td>
                              <td align="center" v-for="(goalTotal, index) in AwayAVG.Total" :key="index" v-if="0 != ( index % 2 )">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="AwayAVG.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center">{{AwayAVG.Home[0]}}</td>
                              <td align="center" v-for="(goalHome, index) in AwayAVG.Home" :key="index" v-if="0 != ( index % 2 )">{{goalHome}}</td>
                            </tr>
                            <tr v-if="AwayAVG.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center">{{AwayAVG.Away[0]}}</td>
                              <td align="center" v-for="(goalAway, index) in AwayAVG.Away" :key="index" v-if="0 != ( index % 2 )">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无主队数据</div>
                      <!--得分-->

                      <div class="table" v-show="dsftabItemShowb" v-if="AwayAVGScored!=undefined && AwayAVGScored!=null">
                        <table width="100%" v-for="(AwayAVG, str, index) in AwayAVGScored" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                              <tr class="little-word">
                                  <td align="center"></td>
                                  <td align="center">总</td>
                                  <td colspan="6"  align="center">失分</td>
                              </tr>
                              <tr  class="little-word">
                                  <td align="center" width="20"></td>
                                  <td align="center" width="60">场次</td>
                                  <td align="center" width="12.5%">1节</td>
                                  <td align="center" width="12.5%">2节</td>
                                  <td align="center" width="12.5%">3节</td>
                                  <td align="center" width="12.5%">4节</td>
                                  <td align="center" width="70">加时</td>
                                  <td align="center" width="70">全场</td>
                              </tr>
                          </thead>
                          <tbody class="table-body">
                            <tr v-if="AwayAVG.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in AwayAVG.Total" :key="index" v-if="0 == ( index % 2 )">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="AwayAVG.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in AwayAVG.Home" :key="index" v-if="0 == ( index % 2 )">{{goalHome}}</td>
                            </tr>
                            <tr v-if="AwayAVG.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in AwayAVG.Away" :key="index" v-if="0 == ( index % 2 )">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无客队数据</div>
                      <!--失分-->                      
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--平均得失分 客--> 

                  <div class="tj-item-box">
                    <div class="title">球队得分/单双统计</div>
                    <div v-if="TeamScored!=undefined">
                      <div class="table" v-if="AwayScored!=undefined && AwayScored!=null" >
                        <table width="100%" v-for="(awayScored, str, index) in AwayScored" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                            <tr class="little-word">
                                <td align="center"></td>
                                <td align="center">场次</td>
                                <td align="center">70-</td>
                                <td align="center">70-80</td>
                                <td align="center">81-90</td>
                                <td align="center">91-100</td>
                                <td align="center">101-110</td>
                                <td align="center">111-120</td>
                                <td align="center">120+</td>
                                <td align="center">单数</td>
                                <td align="center">双数</td>
                            </tr>
                          </thead>
                          <tbody class="table-body" >
                            <tr v-if="awayScored.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in awayScored.Total" :key="index">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="awayScored.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in awayScored.Home" :key="index">{{goalHome}}</td>
                            </tr>
                            <tr v-if="awayScored.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in awayScored.Away" :key="index">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--球队得分/单双统计 客--> 

                  <div class="tj-item-box">
                    <div class="title">球队总分统计</div>
                    <div v-if="TotalPoints!=undefined">
                      <div class="table" v-if="AwayTotalPoints!=undefined && AwayTotalPoints!=null" >
                        <table width="100%" v-for="(awayScored, str, index) in AwayTotalPoints" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                            <tr class="little-word">
                              <td align="center"></td>
                              <td align="center">场次</td>
                              <td align="center">160-</td>
                              <td align="center">160-170</td>
                              <td align="center">171-180</td>
                              <td align="center">181-190</td>
                              <td align="center">191-200</td>
                              <td align="center">201-210</td>
                              <td align="center">211-220</td>
                              <td align="center">221-230</td>
                              <td align="center">230+</td>
                            </tr>
                          </thead>
                          <tbody class="table-body" >
                            <tr v-if="awayScored.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, index) in awayScored.Total" :key="index">{{goalTotal}}</td>
                            </tr>
                            <tr v-if="awayScored.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, index) in awayScored.Home" :key="index">{{goalHome}}</td>
                            </tr>
                            <tr v-if="awayScored.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, index) in awayScored.Away" :key="index">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--球队总分统计 主-->

                  <div class="tj-item-box">
                    <div class="title">球队半全场统计(半场/全场)</div>
                    <div v-if="HalfFullTime!=undefined">
                      <div class="table" v-if="AwayHalfFullTime!=undefined && AwayHalfFullTime!=null" >
                        <table width="100%" v-for="(awayScored, str, index) in AwayHalfFullTime" :key="index" v-if="index<1">
                          <thead class="little-word table-header fc">
                            <tr class="little-word">
                              <td align="center"></td>
                              <td align="center">胜/胜</td>
                              <td align="center">胜/负</td>
                              <td align="center">和/胜</td>
                              <td align="center">和/负</td>
                              <td align="center">负/胜</td>
                              <td align="center">负/负</td>
                            </tr>
                          </thead>
                          <tbody class="table-body" >
                            <tr v-if="awayScored.Total!=undefined">
                              <td align="center little-word">总</td>
                              <td align="center" v-for="(goalTotal, str, index) in awayScored.Total" :key="index" >{{goalTotal}}</td>
                            </tr>
                            <tr v-if="awayScored.Home!=undefined">
                              <td align="center little-word">主</td>
                              <td align="center" v-for="(goalHome, str, index) in awayScored.Home" :key="index">{{goalHome}}</td>
                            </tr>
                            <tr v-if="awayScored.Away!=undefined">
                              <td align="center little-word">客</td>
                              <td align="center" v-for="(goalAway, str, index) in awayScored.Away" :key="index">{{goalAway}}</td>
                            </tr>                                                                            
                          </tbody>
                        </table>
                      </div>
                      <div class="nodata-mess" v-else>暂无数据</div>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>
                  </div>
                  <!--球队半全场统计(半场/全场) 主-->                                                                                                                                
                </div>
              </div>
            </div>
            <!--对战双方数据统计客队 完-->            
          </div>
      </div>
    </div>
    <div  class="zhegie-wrap">
      <div calss="zhedie-box">
        <div class="well well-sm">
          <div class="fl">
              <i class="sm-line"></i>
              技术统计
          </div>
          <div class="fr">
            <ul class="fr-tab">
              <li lable="a" @click="jstabExent('a')" :class="{'active': jstabItemShowa}">主</li>
              <li lable="b" @click="jstabExent('b')" :class="{'active': jstabItemShowb}">客</li>
            </ul>
          </div>
        </div>
        <div class="zhedie-con" v-if="TeamStats!=undefined">
          <div class="tab-item" v-show="jstabItemShowa" v-if="HomeTeamStats!=undefined && HomeTeamStats!=null">
            <div v-if="HomeTeamStats!=null">
              <div class="tj-Con">
                <div class="tj-item-box">
                  <div class="title">近5场</div>
                  <div class="table">
                    <table width="100%">
                      <tbody class="table-body" v-if="HomeTeamStats.last5!=undefined && HomeTeamStats.last5.length!=0">
                        <tr>
                            <td align="center" class="little-word">投篮命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[0]}}</td>
                            <td align="center" class="little-word">三分命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[1]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">罚球命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[2]}}</td>
                            <td align="center" class="little-word">篮板</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[3]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">助攻</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[4]}}</td>
                            <td align="center" class="little-word">犯规</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[5]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">抢断</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[6]}}</td>
                            <td align="center" class="little-word">失误</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[7]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">盖帽</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[8]}}</td>
                            <td align="center" class="little-word">得分</td>
                            <td align="center" class="f16">{{HomeTeamStats.last5[9]}}</td>
                        </tr>                                                                           
                      </tbody>
                      <div class="nodata-mess" v-else>暂无近5场数据</div>
                    </table>
                  </div>
                </div>
                <div class="tj-item-box">
                  <div class="title">近10场</div>
                  <div class="table">
                    <table width="100%">
                      <tbody class="table-body" v-if="HomeTeamStats.last10!=undefined && HomeTeamStats.last10.length!=0">
                        <tr>
                            <td align="center" class="little-word">投篮命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[0]}}</td>
                            <td align="center" class="little-word">三分命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[1]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">罚球命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[2]}}</td>
                            <td align="center" class="little-word">篮板</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[3]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">助攻</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[4]}}</td>
                            <td align="center" class="little-word">犯规</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[5]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">抢断</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[6]}}</td>
                            <td align="center" class="little-word">失误</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[7]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">盖帽</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[8]}}</td>
                            <td align="center" class="little-word">得分</td>
                            <td align="center" class="f16">{{HomeTeamStats.last10[9]}}</td>
                        </tr>                                                                           
                      </tbody>
                      <div class="nodata-mess" v-else>暂无近10场数据</div>
                    </table>

                  </div>
                </div>
                <div class="tj-item-box">
                  <div class="title">赛季</div>
                  <div class="table">
                    <table width="100%">
                      <tbody class="table-body" v-if="HomeTeamStats.Season!=undefined && HomeTeamStats.Season.length!=0">
                        <tr>
                            <td align="center" class="little-word">投篮命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[0]}}</td>
                            <td align="center" class="little-word">三分命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[1]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">罚球命中率</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[2]}}</td>
                            <td align="center" class="little-word">篮板</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[3]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">助攻</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[4]}}</td>
                            <td align="center" class="little-word">犯规</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[5]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">抢断</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[6]}}</td>
                            <td align="center" class="little-word">失误</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[7]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">盖帽</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[8]}}</td>
                            <td align="center" class="little-word">得分</td>
                            <td align="center" class="f16">{{HomeTeamStats.Season[9]}}</td>
                        </tr>                                                                           
                      </tbody>
                      <div class="nodata-mess" v-else>暂无赛季数据</div>
                    </table>
                  </div>
                </div>                                                                                        
              </div>              
            </div>
            <div class="nodata-mess" v-else>暂无主队数据</div>
          </div>
          <div class="nodata-mess" v-else>暂无主队数据</div>

          <div class="tab-item" v-show="jstabItemShowb" v-if="AwayTeamStats!=undefined && AwayTeamStats!=null">
            <div v-if="AwayTeamStats!=null">
              <div class="tj-Con">
                <div class="tj-item-box">
                  <div class="title">近5场</div>
                  <div class="table">
                    <table width="100%">
                      <tbody class="table-body" v-if="AwayTeamStats.last5!=undefined && AwayTeamStats.last5.length!=0">
                        <tr>
                            <td align="center" class="little-word">投篮命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[0]}}</td>
                            <td align="center" class="little-word">三分命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[1]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">罚球命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[2]}}</td>
                            <td align="center" class="little-word">篮板</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[3]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">助攻</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[4]}}</td>
                            <td align="center" class="little-word">犯规</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[5]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">抢断</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[6]}}</td>
                            <td align="center" class="little-word">失误</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[7]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">盖帽</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[8]}}</td>
                            <td align="center" class="little-word">得分</td>
                            <td align="center" class="f16">{{AwayTeamStats.last5[9]}}</td>
                        </tr>                                                                           
                      </tbody>
                      <div class="nodata-mess" v-else>暂无近5场数据</div>
                    </table>
                  </div>
                </div>
                <div class="tj-item-box">
                  <div class="title">近10场</div>
                  <div class="table">
                    <table width="100%">
                      <tbody class="table-body" v-if="AwayTeamStats.last10!=undefined && AwayTeamStats.last10.length!=0">
                        <tr>
                            <td align="center" class="little-word">投篮命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[0]}}</td>
                            <td align="center" class="little-word">三分命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[1]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">罚球命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[2]}}</td>
                            <td align="center" class="little-word">篮板</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[3]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">助攻</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[4]}}</td>
                            <td align="center" class="little-word">犯规</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[5]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">抢断</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[6]}}</td>
                            <td align="center" class="little-word">失误</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[7]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">盖帽</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[8]}}</td>
                            <td align="center" class="little-word">得分</td>
                            <td align="center" class="f16">{{AwayTeamStats.last10[9]}}</td>
                        </tr>                                                                           
                      </tbody>
                      <div class="nodata-mess" v-else>暂无近10场数据</div>
                    </table>

                  </div>
                </div>
                <div class="tj-item-box">
                  <div class="title">赛季</div>
                  <div class="table">
                    <table width="100%">
                      <tbody class="table-body" v-if="AwayTeamStats.Season!=undefined && AwayTeamStats.Season.length!=0">
                        <tr>
                            <td align="center" class="little-word">投篮命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[0]}}</td>
                            <td align="center" class="little-word">三分命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[1]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">罚球命中率</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[2]}}</td>
                            <td align="center" class="little-word">篮板</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[3]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">助攻</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[4]}}</td>
                            <td align="center" class="little-word">犯规</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[5]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">抢断</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[6]}}</td>
                            <td align="center" class="little-word">失误</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[7]}}</td>
                        </tr>
                        <tr>
                            <td align="center" class="little-word">盖帽</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[8]}}</td>
                            <td align="center" class="little-word">得分</td>
                            <td align="center" class="f16">{{AwayTeamStats.Season[9]}}</td>
                        </tr>                                                                           
                      </tbody>
                      <div class="nodata-mess" v-else>暂无赛季数据</div>
                    </table>
                  </div>
                </div>                                                                       
              </div>             
            </div>
            <div class="nodata-mess" v-else>暂无客队数据</div>          
          </div>
          <div class="nodata-mess" v-else>暂无客队数据</div>
        </div>
        <div class="nodata-mess" v-else>暂无数据</div>
      </div>
    </div>
    <div  class="zhegie-wrap">
      <div calss="zhedie-box padding-table">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                未来赛事
            </div>
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="wltabExent('a')" :class="{'active': wltabItemShowa}">主</li>
                <li lable="b" @click="wltabExent('b')" :class="{'active': wltabItemShowb}">客</li>
              </ul>
            </div>
          </div>
          <div class="zhedie-con" v-if="TeamFixtures!=undefined">
            <div class="tab-item" v-show="wltabItemShowa">
              <div v-if="homeFixtures!=undefined && homeFixtures.length!=0">
                <el-row :gutter="2" class="table-header little-word">
                  <el-col :span="3"><div class="grid-content fc">赛事</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">日期</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">vs</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">客队</div></el-col>
                </el-row>
                <div class="table">
                  <el-row :gutter="3" v-for="(homeFixture, index) in homeFixtures" :key='index' v-if="index<10" class="list fc">
                    <el-col :span="3">
                      <div class="grid-content little-word">
                      <p v-if="competitions[homeFixture.Id[1]].ShortName!=''">{{competitions[homeFixture.Id[1]].ShortName}}</p>
                      <p v-else>{{competitions[homeFixture.Id[1]].Name}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content little-word">
                      <p :homeFixturedate="homeFixtureDate[index]">{{homeFixtureDate[index] | filterdatatime}}</p>
                      </div>
                    </el-col>                    
                    <el-col :span="6">
                      <div class="grid-content homename fc" v-if="teams[homeFixture.Id[2]]!=''">
                      {{teams[homeFixture.Id[2]]}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content ">
                          vs                
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[homeFixture.Id[3]]!=''">
                      {{teams[homeFixture.Id[3]]}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      --
                      </div>                  
                    </el-col>
                  </el-row> 
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--未来赛事主队 完-->

            <div class="tab-item" v-show="wltabItemShowb"> <!--未来赛事客队-->
              <div v-if="awayFixtures!=undefined && awayFixtures.length!=0">
                <el-row :gutter="2" class="table-header little-word">
                  <el-col :span="3"><div class="grid-content fc">赛事</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">日期</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">vs</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">客队</div></el-col>
                </el-row>
                <div class="table">
                  <el-row :gutter="3" v-for="(awayFixture, index) in awayFixtures" :key='index' v-if="index<10" class="list fc">
                    <el-col :span="3">
                      <div class="grid-content little-word">
                      <p v-if="competitions[awayFixture.Id[1]].ShortName!=''">{{competitions[awayFixture.Id[1]].ShortName}}</p>
                      <p v-else>{{competitions[awayFixture.Id[1]].Name}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content little-word">
                      <p :awayFixturedate="awayFixtureDate[index]">{{awayFixtureDate[index] | filterdatatime}}</p>
                      </div>
                    </el-col>                    
                    <el-col :span="6">
                      <div class="grid-content homename fc" v-if="teams[awayFixture.Id[2]]!=''">
                      {{teams[awayFixture.Id[2]]}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content ">
                          vs                
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[awayFixture.Id[3]]!=''">
                      {{teams[awayFixture.Id[3]]}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      --
                      </div>                  
                    </el-col>
                  </el-row> 
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--未来赛事客队 完-->
          </div> 
          <div class="nodata-mess" v-else>暂无数据</div>    
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid, // 获得路由传过来的id值
      'gameanalyse': {},
      'meetings': {},
      'competitions': {},
      'teamHistorys': {},
      'homeHistorys': {},
      'awayHistorys': {},
      'teams': {},
      'Standings': {},
      'AwayStandings': {},
      'HomeStandings': {},
      'HomeFullTime': {},
      'AwayFullTime': {},
      'Stats': {},
      'AVGScoredLost': {},
      'HomeAVGScored': {},
      'AwayAVGScored': {},
      'TeamScored': {},
      'HomeScored': {},
      'AwayScored': {},
      'TotalPoints': {},
      'HomeTotalPoints': {},
      'AwayTotalPoints': {},
      'HalfFullTime': {},
      'HomeHalfFullTime': {},
      'AwayHalfFullTime': {},
      'TeamStats': {},
      'HomeTeamStats': {},
      'AwayTeamStats': {},
      'TeamFixtures': {},
      'homeFixtures': {},
      'awayFixtures': {},
      'matchResultShow': true,
      'HandicapShow': false,
      'RedCardShow': false,
      'tabItemShowa': true,
      'tabItemShowb': false,
      'tjtabItemShowa': true,
      'tjtabItemShowb': false,
      'wltabItemShowa': true,
      'wltabItemShowb': false,
      'ranktabItemShowa': true,
      'ranktabItemShowb': false,
      'dsftabItemShowa': true,
      'dsftabItemShowb': false,
      'jstabItemShowa': true,
      'jstabItemShowb': false
    };
  },
  created () {
    var gameanalyseUrl = 'live/Api/Api/index/cc/b_gameanalyse/id/' + this.matchid;
    this.$http.jsonp(gameanalyseUrl).then(response => {
      response = response.body;
      this.gameanalyse = response;
      this.meetings = this.gameanalyse.Meeting;
      this.competitions = this.gameanalyse.Competition;
      this.teams = this.gameanalyse.Team;
      this.teamHistorys = this.gameanalyse.TeamHistory;
      if (this.teamHistorys !== undefined && this.teamHistorys !== '') {
        this.homeHistorys = this.teamHistorys.Home;
        this.awayHistorys = this.teamHistorys.Away;
      }
      this.Standings = this.gameanalyse.Standings;
      if (this.Standings !== undefined && this.Standings !== '') {
        this.HomeStandings = this.Standings.Home;
        this.AwayStandings = this.Standings.Away;
        this.HomeFullTime = this.HomeStandings.FullTime;
        this.AwayFullTime = this.AwayStandings.FullTime;
      }
      this.Stats = this.gameanalyse.Stats;
      this.AVGScoredLost = this.Stats['AVGScored/Lost'];
      if (this.AVGScoredLost !== undefined && this.AVGScoredLost !== '') {
        this.HomeAVGScored = this.Stats['AVGScored/Lost'].Home;
        this.AwayAVGScored = this.Stats['AVGScored/Lost'].Away;
      }
      this.TeamScored = this.Stats.TeamScored;
      if (this.TeamScored !== undefined && this.TeamScored !== '') {
        this.HomeScored = this.TeamScored.Home;
        this.AwayScored = this.TeamScored.Away;
      }
      this.TotalPoints = this.Stats.TotalPoints;
      if (this.TotalPoints !== undefined && this.TotalPoints !== '') {
        this.HomeTotalPoints = this.TotalPoints.Home;
        this.AwayTotalPoints = this.TotalPoints.Away;
      }
      this.HalfFullTime = this.Stats['Half/FullTime'];
      if (this.HalfFullTime !== undefined && this.HalfFullTime !== '') {
        this.HomeHalfFullTime = this.HalfFullTime.Home;
        this.AwayHalfFullTime = this.HalfFullTime.Away;
      }
      this.TeamStats = this.Stats.TeamStats;
      if (this.TeamStats !== undefined && this.TeamStats !== '') {
        this.HomeTeamStats = this.TeamStats.Home;
        this.AwayTeamStats = this.TeamStats.Away;
      }
      this.TeamFixtures = this.gameanalyse.TeamFixture;
      if (this.TeamFixtures !== undefined && this.TeamFixtures !== '') {
        this.homeFixtures = this.TeamFixtures.Home;
       this.awayFixtures = this.TeamFixtures.Away;
      }
    }, response => {});
  },
  filters: {
    filterdata: function (input) { // 时间过滤器 template中{{ 需要过滤的值 | 过滤器表达式}}
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      // var hour = d.getHours();
      // var minutes = d.getMinutes();
      // var seconds = d.getSeconds();
      return year + '-' + month + '-' + day;
    },
    filterdatatime: function (input) { // 时间过滤器 template中{{ 需要过滤的值 | 过滤器表达式}}
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
      var minutes = d.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    }
  },
  computed: {
    selectNum () {
      var num = 0;
      if (this.meetings.length > 10) {
        num = 10;
      } else {
         num = this.meetings.length;
      }
      return num;
    },
    homeHistoryNum () {
      var num = 0;
      if (this.homeHistorys.length > 10) {
        num = 10;
      } else {
         num = this.homeHistorys.length;
      }
      return num;
    },
    awayHistoryNum () {
      var num = 0;
      if (this.awayHistorys.length > 10) {
        num = 10;
      } else {
         num = this.awayHistorys.length;
      }
      return num;
    },
    meetingDate () {
      var meetingdate = [];
      var Date1 = '';
      for (var i = 0; i < this.meetings.length; i++) {
        if (typeof (this.meetings[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.meetings[i].Date);
        } else {
          Date1 = parseInt(this.meetings[i].Date.value);
        };
      var strDate = new Date(Date1);
      meetingdate.push(strDate);
      };
      return meetingdate;
    },
    homeHistoryDate () {
      var homeHistorydate = [];
      var Date1 = '';
      for (var i = 0; i < this.homeHistorys.length; i++) {
        if (typeof (this.homeHistorys[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.homeHistorys[i].Date);
        } else {
          Date1 = parseInt(this.homeHistorys[i].Date.value);
        };
      var strDate = new Date(Date1);
      homeHistorydate.push(strDate);
      };
      return homeHistorydate;
    },
    awayHistoryDate () {
      var awayHistorydate = [];
      var Date1 = '';
      for (var i = 0; i < this.awayHistorys.length; i++) {
        if (typeof (this.awayHistorys[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.awayHistorys[i].Date);
        } else {
          Date1 = parseInt(this.awayHistorys[i].Date.value);
        };
      var strDate = new Date(Date1);
      awayHistorydate.push(strDate);
      };
      return awayHistorydate;
    },
    homeFixtureDate () {
      var homeFixturedate = [];
      var Date1 = '';
      for (var i = 0; i < this.homeFixtures.length; i++) {
        if (typeof (this.homeFixtures[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.homeFixtures[i].Date);
        } else {
          Date1 = parseInt(this.homeFixtures[i].Date.value);
        };
      var strDate = new Date(Date1);
      homeFixturedate.push(strDate);
      };
      return homeFixturedate;
    },
    awayFixtureDate () {
      var awayFixturedate = [];
      var Date1 = '';
      for (var i = 0; i < this.awayFixtures.length; i++) {
        if (typeof (this.awayFixtures[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.awayFixtures[i].Date);
        } else {
          Date1 = parseInt(this.awayFixtures[i].Date.value);
        };
      var strDate = new Date(Date1);
      awayFixturedate.push(strDate);
      };
      return awayFixturedate;
    },
    matchResult () {
      var matchresult = [];
      var matchresult1 = '';
      for (var i = 0; i < this.meetings.length; i++) {
        var homescore = this.meetings[i].AScore[0];
        var awayscore = this.meetings[i].BScore[0];
        if (homescore > awayscore) {
           matchresult1 = '胜';
        } else if (homescore === awayscore) {
           matchresult1 = '平';
        } else if (homescore < awayscore) {
           matchresult1 = '负';
        }
        matchresult.push(matchresult1);
      };
      return matchresult;
    },
    homehistoryResult () {
      var matchresult = [];
      var matchresult1 = '';
      for (var i = 0; i < this.homeHistorys.length; i++) {
        var homescore = this.homeHistorys[i].AScore[0];
        var awayscore = this.homeHistorys[i].BScore[0];
        if (homescore > awayscore) {
           matchresult1 = '胜';
        } else if (homescore === awayscore) {
           matchresult1 = '平';
        } else if (homescore < awayscore) {
           matchresult1 = '负';
        }
        matchresult.push(matchresult1);
      };
      return matchresult;
    },
    awayhistoryResult () {
      var matchresult = [];
      var matchresult1 = '';
      for (var i = 0; i < this.awayHistorys.length; i++) {
        var homescore = this.awayHistorys[i].AScore[0];
        var awayscore = this.awayHistorys[i].BScore[0];
        if (homescore > awayscore) {
           matchresult1 = '胜';
        } else if (homescore === awayscore) {
           matchresult1 = '平';
        } else if (homescore < awayscore) {
           matchresult1 = '负';
        }
        matchresult.push(matchresult1);
      };
      return matchresult;
    },
    matchBgcolor () {
      var bgcolor = [];
      var bgcolor1 = '';
      for (var i = 0; i < this.meetings.length; i++) {
        var homescore = this.meetings[i].AScore[0];
        var awayscore = this.meetings[i].BScore[0];
        if (homescore > awayscore) {
           bgcolor1 = 'bg_red';
        } else if (homescore === awayscore) {
           bgcolor1 = 'bg_green';
        } else if (homescore < awayscore) {
           bgcolor1 = 'bg_blue';
        }
        bgcolor.push(bgcolor1);
      };
      return bgcolor;
    },
    homehistoryBgcolor () {
      var bgcolor = [];
      var bgcolor1 = '';
      for (var i = 0; i < this.homeHistorys.length; i++) {
        var homescore = this.homeHistorys[i].AScore[0];
        var awayscore = this.homeHistorys[i].BScore[0];
        if (homescore > awayscore) {
           bgcolor1 = 'bg_red';
        } else if (homescore === awayscore) {
           bgcolor1 = 'bg_green';
        } else if (homescore < awayscore) {
           bgcolor1 = 'bg_blue';
        }
        bgcolor.push(bgcolor1);
      };
      return bgcolor;
    },
    awayhistoryBgcolor () {
      var bgcolor = [];
      var bgcolor1 = '';
      for (var i = 0; i < this.awayHistorys.length; i++) {
        var homescore = this.awayHistorys[i].AScore[0];
        var awayscore = this.awayHistorys[i].BScore[0];
        if (homescore > awayscore) {
           bgcolor1 = 'bg_red';
        } else if (homescore === awayscore) {
           bgcolor1 = 'bg_green';
        } else if (homescore < awayscore) {
           bgcolor1 = 'bg_blue';
        }
        bgcolor.push(bgcolor1);
      };
      return bgcolor;
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        this.matchResultShow = true;
        this.HandicapShow = false;
        this.RedCardShow = false;
      } else if (command === 'b') {
        this.matchResultShow = false;
        this.HandicapShow = true;
        this.RedCardShow = false;
      } else if (command === 'c') {
        this.matchResultShow = false;
        this.HandicapShow = false;
        this.RedCardShow = true;
      }
    },
    tabExent (lable) {
      if (lable === 'a') {
        this.tabItemShowa = true;
        this.tabItemShowb = false;
      } else if (lable === 'b') {
        this.tabItemShowa = false;
        this.tabItemShowb = true;
      }
    },
    tjtabExent (lable) {
      if (lable === 'a') {
        this.tjtabItemShowa = true;
        this.tjtabItemShowb = false;
      } else if (lable === 'b') {
        this.tjtabItemShowa = false;
        this.tjtabItemShowb = true;
      }
    },
    wltabExent (lable) {
      if (lable === 'a') {
        this.wltabItemShowa = true;
        this.wltabItemShowb = false;
      } else if (lable === 'b') {
        this.wltabItemShowa = false;
        this.wltabItemShowb = true;
      }
    },
    ranktabExent (lable) {
      if (lable === 'a') {
        this.ranktabItemShowa = true;
        this.ranktabItemShowb = false;
      } else if (lable === 'b') {
        this.ranktabItemShowa = false;
        this.ranktabItemShowb = true;
      }
    },
    dsftabExent (lable) {
      if (lable === 'a') {
        this.dsftabItemShowa = true;
        this.dsftabItemShowb = false;
      } else if (lable === 'b') {
        this.dsftabItemShowa = false;
        this.dsftabItemShowb = true;
      }
    },
    jstabExent (lable) {
      if (lable === 'a') {
        this.jstabItemShowa = true;
        this.jstabItemShowb = false;
      } else if (lable === 'b') {
        this.jstabItemShowa = false;
        this.jstabItemShowb = true;
      }
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
    overflow:hidden;
  i.sm-line{
    width:2px;
    height:15px;
    background: #f32b1b;
    display: inline-block;
    vertical-align: middle;
  }
  .fl{
    padding-top: 5px;
  }
}
.nodata-mess{
  margin:100px 0;
  text-align:center;
}
.bg_blue{
  background:#428bca;
}
.bg_red{
    background:#f32b1b;
}
.bg_green{
    background:#05a548;
}
.little-word{
  font-size:12px;
  color:#b8bec7;
}
.fr{
  float:right;
}
.fl{
  float:left;
}
.fc{
  text-align:center;
}
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
  }
}
.table-header{
  padding:10px;
}
.table{
  padding:10px;
  font-size:13px;
  .list{
  padding:10px 0;
  &:first-child{
     padding-top:0;
    }
  }
  .sg{
    color:#fff;
    text-align:center;
  }
  .bglittle{
    text-align:center; 
    background:#f5f5f5;
    padding:6px; 
  }
}
.el-dropdown{
  font-size:12px;
  color:#b8bec7;  
}
.el-dropdown-menu__item{
    font-size:12px;
    padding:0 5px;
}
.fr-tab{
  overflow:hidden;
  li{
    float:left;
    padding:5px 8px;
    margin: 0 3px;
    border:1px solid #ccc;
    background:#fff;
    border-radius:5px;
    &.active{
    background:#357ebd;
    border:1px solid #357ebd;
    color:#fff;
    }
  }
}
.title{
  font-size:14px;
  padding: 10px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
  td{
   border-bottom:1px solid #f4f4f4; 
   padding:5px 0;
  }
}
.table-body{
  padding:10px 0;
  td{
    padding:5px 0;
  }
}
.ce-tab{
  margin:0 auto;
  display: flex;
  justify-content: center;
  li{
    margin:0 10px;
    padding: 3px 10px;
    border:1px solid #adadad;
    border-radius:5px;
    font-size:14px;
    &.active{
    background:#f32b1b;
    color:#fff;
    }
  }
}
.f16{
  font-size:16px;
}
</style>
