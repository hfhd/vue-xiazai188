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
              <el-col :span="4"><div class="grid-content fc">比分(半场)</div></el-col>
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
                      <el-dropdown-item command="c">红牌比分</el-dropdown-item>
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
                  <div class="grid-content homename fc" v-if="teams[meeting.Id[2]].ShortName!=''">
                  {{teams[meeting.Id[2]].ShortName}}
                  </div>
                  <div class="grid-content homename fc" v-else>
                  {{teams[meeting.Id[2]].Name}}
                  </div>                  
                </el-col>
                <el-col :span="4">
                  <div class="grid-content score">
                    <span v-if="meeting.Score[0]===''">--:--</span> 
                    <span v-else>{{meeting.Score[0]}}:{{meeting.Score[1]}}</span>                   
                    <span class="little-word" v-if="meeting.Half=='' || meeting.Half==undefined">--:--</span> 
                    <span class="little-word" v-else>({{meeting.Half}})</span>                   
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content awayname fc" v-if="teams[meeting.Id[3]].ShortName!=''">
                  {{teams[meeting.Id[3]].ShortName}}
                  </div>
                  <div class="grid-content awayname fc" v-else>
                  {{teams[meeting.Id[3]].Name}}
                  </div>                  
                </el-col>
                <el-col :span="3">
                  <div class="grid-content sg" :matchresult="matchResult" :class="matchBgcolor[index]" v-show="matchResultShow">{{matchResult[index]}}</div>
                  <div class="grid-content bglittle" v-show="HandicapShow">{{meeting.Handicap}}</div>
                  <div class="grid-content bglittle" v-if="meeting.RedCard[0]===''" v-show="matchresultShow">--</div>
                  <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{meeting.RedCard[0]}}:{{meeting.RedCard[1]}}</div>          
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
                  <el-col :span="4"><div class="grid-content fc">比分(半场)</div></el-col>
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
                          <el-dropdown-item command="c">红牌比分</el-dropdown-item>
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
                      <div class="grid-content homename fc" v-if="teams[homeHistory.Id[2]].ShortName!=''">
                      {{teams[homeHistory.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      {{teams[homeHistory.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content score">
                        <span v-if="homeHistory.Score[0]===''">--:--</span> 
                        <span v-else>{{homeHistory.Score[0]}}:{{homeHistory.Score[1]}}</span>                   
                        <span class="little-word" v-if="homeHistory.Half=='' || homeHistory.Half==undefined">--:--</span> 
                        <span class="little-word" v-else>({{homeHistory.Half}})</span>                   
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[homeHistory.Id[3]].ShortName!=''">
                      {{teams[homeHistory.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      {{teams[homeHistory.Id[3]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content sg" :teamhistoryresult="homehistoryResult" :class="homehistoryBgcolor[index]" v-show="matchResultShow">{{homehistoryResult[index]}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow">{{homeHistory.Handicap}}</div>
                      <div class="grid-content bglittle" v-if="homeHistory.RedCard[0]===''" v-show="matchresultShow">--</div>
                      <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{homeHistory.RedCard[0]}}:{{homeHistory.RedCard[1]}}</div>          
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
                  <el-col :span="4"><div class="grid-content fc">比分(半场)</div></el-col>
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
                          <el-dropdown-item command="c">红牌比分</el-dropdown-item>
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
                      <div class="grid-content homename fc" v-if="teams[awayHistory.Id[2]].ShortName!=''">
                      {{teams[awayHistory.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      {{teams[awayHistory.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content score">
                        <span v-if="awayHistory.Score[0]===''">--:--</span> 
                        <span v-else>{{awayHistory.Score[0]}}:{{awayHistory.Score[1]}}</span>                   
                        <span class="little-word" v-if="awayHistory.Half=='' || awayHistory.Half==undefined">--:--</span> 
                        <span class="little-word" v-else>({{awayHistory.Half}})</span>                   
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[awayHistory.Id[3]].ShortName!=''">
                      {{teams[awayHistory.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      {{teams[awayHistory.Id[3]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content sg" :awayhistoryresult="awayhistoryResult" :class="awayhistoryBgcolor[index]" v-show="matchResultShow">{{awayhistoryResult[index]}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow">{{awayHistory.Handicap}}</div>
                      <div class="grid-content bglittle" v-if="awayHistory.RedCard[0]===''" v-show="matchresultShow">--</div>
                      <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{awayHistory.RedCard[0]}}:{{awayHistory.RedCard[1]}}</div>          
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
                历史战绩数据统计
            </div>
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="tjtabExent('a')" :class="{'active': tjtabItemShowa}">主</li>
                <li lable="b" @click="tjtabExent('b')" :class="{'active': tjtabItemShowb}">客</li>
              </ul>
            </div>
          </div>
          <div class="zhedie-con" v-if="TeamStatss!=undefined">
            <div class="tab-item" v-show="tjtabItemShowa">
              <div v-if="homeTeamStatss!=undefined">
                <div class="tj-Con">
                  <div class="tj-item-box">
                    <div class="title">总入球数(场数)，单双统计</div>
                    <div class="table">
                      <el-row :gutter="5" class="little-word table-header fc">
                        <el-col :span="4"><div class="grid-content">0-1球</div></el-col>
                        <el-col :span="4"><div class="grid-content">2-3球</div></el-col>
                        <el-col :span="4"><div class="grid-content">4-6球</div></el-col>
                        <el-col :span="4"><div class="grid-content">7球或以上</div></el-col>
                        <el-col :span="4"><div class="grid-content">单数</div></el-col>
                        <el-col :span="4"><div class="grid-content">双数</div></el-col>
                      </el-row>
                      <div class="table-body">
                        <el-row :gutter="5" class="fc ds-padding">
                          <el-col :span="4" v-for="(TotalGoal, index) in homeTeamStatss.TotalGoal" :key="index"><div class="grid-content">{{TotalGoal}}</div></el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                  <div class="tj-item-box">
                    <div class="title">进球统计</div>
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center" width="35"></td>
                              <td align="center">净胜2+</td>
                              <td align="center">净胜1</td>
                              <td align="center">平局</td>
                              <td align="center">净负1</td>
                              <td align="center">净负2+</td>
                              <td align="center">进球数0</td>
                              <td align="center">进球数1</td>
                              <td align="center">进球数2</td>
                              <td align="center">进球数3+</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr>
                            <td align="center little-word">总</td>
                            <td align="center" v-for="(goalTotal, index) in homeStatsGoal.Total" :key="index">{{goalTotal}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">主</td>
                            <td align="center" v-for="(goalHome, index) in homeStatsGoal.Home" :key="index">{{goalHome}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">客</td>
                            <td align="center" v-for="(goalAway, index) in homeStatsGoal.Away" :key="index">{{goalAway}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">中立</td>
                            <td align="center" v-for="(goalNeutral, index) in homeStatsGoal.Neutral" :key="index">{{goalNeutral}}</td>
                          </tr>                                                                            
                        </tbody>
                      </table>
                    </div>
                  </div> 
                  <div class="tj-item-box">
                    <div class="title">以往盘路</div>
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center"></td>
                              <td colspan="3"  align="center">上盘</td>
                              <td colspan="3"  align="center">下盘</td>
                              <td colspan="3"  align="center">平盘</td>
                          </tr>
                          <tr>
                              <td align="center" width="35"></td>
                              <td align="center">赢</td>
                              <td align="center">走</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">走</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">走</td>
                              <td align="center">输</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr>
                            <td align="center little-word">总</td>
                            <td align="center" v-for="(OddsTotal, index) in homeStatsOdds.Total" :key="index">{{OddsTotal}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">主</td>
                            <td align="center" v-for="(OddsHome, index) in homeStatsOdds.Home" :key="index">{{OddsHome}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">客</td>
                            <td align="center" v-for="(OddsAway, index) in homeStatsOdds.Away" :key="index">{{OddsAway}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">中立</td>
                            <td align="center" v-for="(OddsNeutral, index) in homeStatsOdds.Neutral" :key="index">{{OddsNeutral}}</td>
                          </tr>                                                                            
                        </tbody>
                      </table>
                    </div>
                  </div>                                                                        
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--历史战绩数据统计主队 完-->

            <div class="tab-item" v-show="tjtabItemShowb"> <!--历史战绩数据统计客队-->
              <div v-if="awayTeamStatss!=undefined">
                <div class="tj-Con">
                  <div class="tj-item-box">
                    <div class="title">总入球数(场数)，单双统计</div>
                    <div class="table">
                      <el-row :gutter="5" class="little-word table-header fc">
                        <el-col :span="4"><div class="grid-content">0-1球</div></el-col>
                        <el-col :span="4"><div class="grid-content">2-3球</div></el-col>
                        <el-col :span="4"><div class="grid-content">4-6球</div></el-col>
                        <el-col :span="4"><div class="grid-content">7球或以上</div></el-col>
                        <el-col :span="4"><div class="grid-content">单数</div></el-col>
                        <el-col :span="4"><div class="grid-content">双数</div></el-col>
                      </el-row>
                      <div class="table-body">
                        <el-row :gutter="5" class="fc ds-padding">
                          <el-col :span="4" v-for="(TotalGoal, index) in awayTeamStatss.TotalGoal" :key="index"><div class="grid-content">{{TotalGoal}}</div></el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                  <div class="tj-item-box">
                    <div class="title">进球统计</div>
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center" width="35"></td>
                              <td align="center">净胜2+</td>
                              <td align="center">净胜1</td>
                              <td align="center">平局</td>
                              <td align="center">净负1</td>
                              <td align="center">净负2+</td>
                              <td align="center">进球数0</td>
                              <td align="center">进球数1</td>
                              <td align="center">进球数2</td>
                              <td align="center">进球数3+</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr>
                            <td align="center little-word">总</td>
                            <td align="center" v-for="(goalTotal, index) in awayStatsGoal.Total" :key="index">{{goalTotal}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">主</td>
                            <td align="center" v-for="(goalHome, index) in awayStatsGoal.Home" :key="index">{{goalHome}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">客</td>
                            <td align="center" v-for="(goalAway, index) in awayStatsGoal.Away" :key="index">{{goalAway}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">中立</td>
                            <td align="center" v-for="(goalNeutral, index) in awayStatsGoal.Neutral" :key="index">{{goalNeutral}}</td>
                          </tr>                                                                            
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="tj-item-box">
                    <div class="title">以往盘路</div>
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center"></td>
                              <td colspan="3"  align="center">上盘</td>
                              <td colspan="3"  align="center">下盘</td>
                              <td colspan="3"  align="center">平盘</td>
                          </tr>
                          <tr>
                              <td align="center" width="35"></td>
                              <td align="center">赢</td>
                              <td align="center">走</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">走</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">走</td>
                              <td align="center">输</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr>
                            <td align="center little-word">总</td>
                            <td align="center" v-for="(OddsTotal, index) in awayStatsOdds.Total" :key="index">{{OddsTotal}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">主</td>
                            <td align="center" v-for="(OddsHome, index) in awayStatsOdds.Home" :key="index">{{OddsHome}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">客</td>
                            <td align="center" v-for="(OddsAway, index) in awayStatsOdds.Away" :key="index">{{OddsAway}}</td>
                          </tr>
                          <tr>
                            <td align="center little-word">中立</td>
                            <td align="center" v-for="(OddsNeutral, index) in awayStatsOdds.Neutral" :key="index">{{OddsNeutral}}</td>
                          </tr>                                                                            
                        </tbody>
                      </table>
                    </div>
                  </div>                                                       
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--历史战绩数据统计客队 完-->
          </div>
          <div class="nodata-mess" v-else>暂无数据</div>    
      </div>
    </div>
    <div  class="zhegie-wrap">
      <div calss="zhedie-box">
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
                      <div class="grid-content homename fc" v-if="teams[homeFixture.Id[2]].ShortName!=''">
                      {{teams[homeFixture.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      {{teams[homeFixture.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content ">
                          vs                
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[homeFixture.Id[3]].ShortName!=''">
                      {{teams[homeFixture.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      {{teams[homeFixture.Id[3]].Name}}
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
                      <div class="grid-content homename fc" v-if="teams[awayFixture.Id[2]].ShortName!=''">
                      {{teams[awayFixture.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      {{teams[awayFixture.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content ">
                          vs                
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[awayFixture.Id[3]].ShortName!=''">
                      {{teams[awayFixture.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      {{teams[awayFixture.Id[3]].Name}}
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
      'TeamStatss': {},
      'homeTeamStatss': {},
      'awayTeamStatss': {},
      'TeamFixtures': {},
      'homeFixtures': {},
      'awayFixtures': {},
      'homeStatsGoal': {},
      'homeStatsOdds': {},
      'awayStatsGoal': {},
      'awayStatsOdds': {},
      'matchResultShow': true,
      'HandicapShow': false,
      'RedCardShow': false,
      'tabItemShowa': true,
      'tabItemShowb': false,
      'tjtabItemShowa': true,
      'tjtabItemShowb': false,
      'wltabItemShowa': true,
      'wltabItemShowb': false
    };
  },
  created () {
    var gameanalyseUrl = 'live/Api/Api/index/cc/gameanalyse/id/' + this.matchid;
    this.$http.jsonp(gameanalyseUrl).then(response => {
      response = response.body;
      this.gameanalyse = response;
      this.meetings = this.gameanalyse.Meeting;
      this.competitions = this.gameanalyse.Competition;
      this.teams = this.gameanalyse.Team;
      this.teamHistorys = this.gameanalyse.TeamHistory;
      this.homeHistorys = this.teamHistorys.Home;
      this.awayHistorys = this.teamHistorys.Away;
      this.TeamStatss = this.gameanalyse.TeamStats;
      this.homeTeamStatss = this.TeamStatss.Home;
      this.awayTeamStatss = this.TeamStatss.Away;
      this.TeamFixtures = this.gameanalyse.TeamFixture;
      this.homeFixtures = this.TeamFixtures.Home;
      this.awayFixtures = this.TeamFixtures.Away;
      this.homeStatsGoal = this.homeTeamStatss.Goal;
      this.homeStatsOdds = this.homeTeamStatss.Odds;
      this.awayStatsGoal = this.awayTeamStatss.Goal;
      this.awayStatsOdds = this.awayTeamStatss.Goal;
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
        var homescore = this.meetings[i].Score[0];
        var awayscore = this.meetings[i].Score[1];
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
        var homescore = this.homeHistorys[i].Score[0];
        var awayscore = this.homeHistorys[i].Score[1];
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
        var homescore = this.awayHistorys[i].Score[0];
        var awayscore = this.awayHistorys[i].Score[1];
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
        var homescore = this.meetings[i].Score[0];
        var awayscore = this.meetings[i].Score[1];
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
        var homescore = this.homeHistorys[i].Score[0];
        var awayscore = this.homeHistorys[i].Score[1];
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
        var homescore = this.awayHistorys[i].Score[0];
        var awayscore = this.awayHistorys[i].Score[1];
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
  padding:5px 0;
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
  padding: 5px 10px 0;
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
</style>
