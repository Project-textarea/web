<template>
  <!--  connetMetamask-->
  <div class="container">
    <div class="connect connect-wallet" @click="connetMetamask()" v-if="!isConnect">
      <img src="@/assets/images/icon-green.svg" width="12"/>Connect Wallet
    </div>
    <!--textarea-nav-->
    <div class="content" v-if="isConnect">
      <header-Bar></header-Bar>
    </div>
    <div v-if="isConnect" class="textarea-container staking">
      <div class="content">
        <div class="staking-section1">
          <div class="title">TEXT Staking</div>
          <article class="desc">Stake <span class="yello">TEXT</span> Earn TEXT & WETH
            <p>Total TEXT staked:<br/>
              <span v-if="totalStake.textPrice>=0&&Rewards>=0">
                {{ totalStake.textPrice + Rewards | NumFormat }}
                 (${{ earhPrice.textPrice * (totalStake.textPrice + Rewards) / 10000|NumFormat }})
              </span>
              <span v-else>--</span>
            </p>
          </article>
        </div>
        <div class="staking-section2">
          <div class="title title1">
              <span v-if="apy>=0&&ethApr>=0">
                {{ ((apy + ethApr) / 100) | NumFormat }}
              </span>
            <span v-else>--</span>
            % APR
          </div>
          <article class="desc">
            <div class="item">
              <h4 class="top-desc wrapper-flex-row" @click="changeItem(0)">
                <div class="left">Your Stake</div>
                <div class="right">
                  <span v-if="Stake.textPrice>=0">{{ Stake.textPrice | NumFormat }}</span>
                  <span v-else>--</span>
                  TEXT
                </div>
              </h4>
              <div class="bottom-wrapper">
                <div class="bottom-desc">
                  <div class="selected-item wrapper-flex-row">
                    <a @click="showStake=true;" :class="showStake?'on':''">Stake</a>
                    <a @click="showStake=false;" :class="showStake?'':'on'">Unstake</a>
                  </div>
                  <ul class="content" v-if="showStake">
                    <li>
                      <div class="input wrapper-flex-row">
                        <input type="text" v-model="stakeText" @input="stakeInput" @focus="searchAllowance"/>
                        <a class="max" @click="maxClick(1)">Max</a>
                        <div v-if="stakeText==0||stakeText==''||stakeText==null">
                          <a class="stake" v-if="allowance==1" @click="approved" :class="refused?'refused':''"
                             style="background: #2de370;color: #000000;margin-left: 5px;padding: 0 13px;width: 100%;box-sizing: border-box;">Approved</a>
                          <a class="stake no-button" v-else style="width: 100%;box-sizing: border-box;">Stake</a>
                        </div>
                        <div v-else>
                          <a class="stake" v-if="allowance==1" @click="approved"
                             style="width: 100%;box-sizing: border-box;" :class="refused?'refused':''">Approved</a>
                          <a class="stake" @click="stakeClick()" v-if="allowance==2" :class="refused?'refused':''"
                             style="background: #2de370;color: #000000;width: 100%;box-sizing: border-box;">Stake</a>
                          <a class="stake no-button"
                             style="width: 100%;box-sizing: border-box;" v-else>Stake</a>
                        </div>
                      </div>
                      <dl class="data-list font18">
                        <dd class="wrapper-flex-row">
                          <div class="tips">TEXT in wallet:</div>
                          <div class="price">
                            <span v-if="walletPrice>=0">{{ walletPrice | NumFormat }}</span>
                            <span v-else>--</span>
                          </div>
                        </dd>
                        <dd class="wrapper-flex-row">
                          <div class="tips">Your Stake<br/>(Compounding):</div>
                          <div class="price">
                            <span v-if="Stake.textPrice>=0">{{ Stake.textPrice | NumFormat }}</span>
                            <span v-else>--</span>
                          </div>
                        </dd>
                      </dl>
                      <div class="line"></div>
                      <dl class="data-list">
                        <dd class="wrapper-flex-row font16">
                          <div class="tips">TEXT rewards are automatically compounded</div>
                        </dd>
                        <div class="title-sum">
                          <a class="t1 font18" style="cursor: default">TEXT</a>
                          <a class="t2 font16" style="cursor: default">Compounding</a>
                        </div>
                        <dd class="wrapper-flex-row font16">
                          <div class="tips">Earned to date:</div>
                          <div class=" price">
                            <span
                                v-if="Stake.textPrice>=0&&textPrincipal>-10000000000000000000000000000000000000000&&Earndate!='--'">
                              {{
                                Earndate|NumFormat
                              }}(${{
                                earhPrice.textPrice * Earndate / 10000|NumFormat
                              }})</span>
                            <span v-else>--</span>

                          </div>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                  <ul class="content" v-else>
                    <li>
                      <div class="input wrapper-flex-row">
                        <input type="text" v-model="unstakeText" @input="unstakeInput"/>
                        <a class="max max1" @click="maxClick(2)">Max</a>
                        <a class="stake" :class="unstakeText==0||unstakeText==''||unstakeText==null?'no-button':''"
                           v-if="unstakeText==0||unstakeText==''||unstakeText==null"
                        >Unstake</a>
                        <a class="stake" @click="unstakeClick()" v-if="unstakeText>0" :class="refused1?'refused':''"
                           style="background: #2de370;color: #000000">Unstake</a>
                      </div>
                      <dl class="data-list">
                        <dd class="wrapper-flex-row">
                          <div class="tips">TEXT in wallet:</div>
                          <div class="price">
                            <span v-if="walletPrice>=0">{{ walletPrice | NumFormat }}</span>
                            <span v-else>--</span>
                          </div>
                        </dd>
                        <dd class="wrapper-flex-row">
                          <div class="tips">Your Stake<br/>(Compounding):</div>
                          <div class="price">
                            <span v-if="Stake.textPrice>=0">{{ Stake.textPrice | NumFormat }}</span>
                            <span v-else>--</span></div>
                        </dd>
                      </dl>
                      <div class="line"></div>
                      <dl class="data-list">
                        <dd class="wrapper-flex-row font16">
                          <div class="tips">TEXT rewards are automatically compounded</div>
                        </dd>
                        <div class="title-sum">
                          <a class="t1 font18" style="cursor: default">TEXT</a>
                          <a class="t2 font16" style="cursor: default">Compounding</a>
                        </div>
                        <dd class="wrapper-flex-row font16">
                          <div class="tips">Earned to date:</div>
                          <div class=" price">
                            <span
                                v-if="Stake.textPrice>=0&&textPrincipal>-10000000000000000000000000000000000000000&&Earndate!='--'"> {{
                                Earndate|NumFormat
                              }}(${{
                                earhPrice.textPrice * Earndate / 10000|NumFormat
                              }})</span>
                            <span v-else>--</span>
                          </div>
                        </dd>
                      </dl>
                    </li>
                    <li>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="item">
              <h4 class="top-desc wrapper-flex-row" @click="changeItem(1)">
                <div class="left">Rewards to Collect</div>
                <div class="right">
                  <span v-if="WethPrice>=0">{{ WethPrice |NumFormat4 }}</span>
                  <span v-else>--</span>
                </div>
              </h4>
              <div class="bottom-wrapper">
                <div class="bottom-desc">
                  <ul class="content">
                    <li>
                      <div class="section2-input wrapper-flex-row">
                        <input type="text" v-model="WethPrice" readonly/>
                        <a class="collect" @click="hasvest" :class="[WethPrice==0?'on':'',refused2?'refused':'']">Collect</a>
                      </div>
                      <dl class="data-list">
                        <dd class="wrapper-flex-row">
                          <div class="tips  font18">WETH rewards are distributed every block.</div>
                          <div class="tips price"></div>
                        </dd>
                      </dl>
                      <div class="line"></div>
                      <dl class="data-list font16">
                        <dd class="wrapper-flex-row">
                          <div class="tips">Last collected:</div>
                          <div class=" price" v-if="date>0">{{ date | Dateormat }}</div>
                          <div class=" price" v-else>--</div>
                        </dd>
                        <dd class="wrapper-flex-row">
                          <div class="tips">Earned to date:</div>
                          <div class=" price">
                            {{ ethEarnToDate|NumFormat4 }}(${{ earhPrice.ethPrice * ethEarnToDate / 1000|NumFormat4 }})
                          </div>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <footer-Bar></footer-Bar>
  </div>
</template>

<script>
import $ from 'jquery'
import BigNumber from "bignumber.js";
import {Message} from 'element-ui';
import headerBar from './components/headerBar'
import footerBar from '../../components/footerBar'
import {address, initContracts} from "../../utils/common";
import axios from "axios";

export default {
  components: {
    headerBar,
    footerBar
  },
  data() {
    return {
      Earndate: '--',
      refused: false,
      refused1: false,
      refused2: false,
      address: null || sessionStorage.getItem('address'),
      isConnect: sessionStorage.getItem('isConnect') || false,
      apy: '--',//apy
      ethApr: '--',
      Rewards: '--',
      showStake: true,
      totalStake: {
        textPrice: '--',
        price: '--'
      },
      Stake: {
        textPrice: '--',
        price: '--'
      },
      earhPrice: {
        textPrice: '--',
        ethPrice: '--',
      },
      firstData: {
        walletPrice: '--',
        stakePrice: '--',
      },
      date: '--',
      ethEarnToDate: '--',
      textPrincipal: '--',
      shares: '--',
      walletPrice: '--',
      WethPrice: '--',
      collectText: '--',
      unstakeText: '',
      stakeText: '',
      allowance: 0,
      timer: null,
      max: false,
      timerList: []
    }
  },
  filters: {
    textPrincipal() {
      this.Earndate = this.Stake.textPrice - this.textPrincipal
    },
    NumFormat(value) {
      if (!value) return '0.00'
      value = Number(value).toFixed(2)
      var intPart = Math.trunc(value) // Get integer part
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // Break the whole number by three
      var floatPart = '.00' // Predefined fractional part
      var value2Array = value.split('.')
      // =2 indicates that data has decimal places
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString() // Get the decimal part
        if (floatPart.length === 1) { 
          return intPartFormat + '.' + floatPart + '0'
        } else {
          return intPartFormat + '.' + floatPart
        }
      } else {
        return intPartFormat + floatPart
      }
    },
    NumFormat4(value) {
      if (!value) return '0.0000'
      value = Number(value).toFixed(4)
      var intPart = Math.trunc(value)// Get integer part
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // Break the whole number by three
      var floatPart = '.0000' // Predefined fractional part
      var value2Array = value.split('.')
      // =2 indicates that data has decimal places
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString() // Get the decimal part
        return intPartFormat + '.' + floatPart
      } else {
        return intPartFormat + floatPart
      }
    },
    Dateormat(value) {
      var date = new Date(value); //Format the date 
      var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"); //ALL MONTH
      var mn = date.getMonth(); //MONTH
      var dn = date.getDate(); //DAYS
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //HOUR
      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //MIN
      return hour + ':' + minute + " " + m[mn] + "." + dn + "," + date.getFullYear();
    },
  },
  computed: {},
  watch: {
    network(e) {
    },
    max() {
    },
    address(e) {
      this.timer = setInterval(() => {
        this.getData();
        // this.showWebData2();
        // this.showWebData();
      }, 30000)
      this.timerList.push(this.timer)
    },
    unstakeText() {
      var that = this;
      if (that.unstakeText == 0 || that.unstakeText == '' || that.unstakeText == null) {
      } else {
        this.unstakeText = this.unstakeText.toString().replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1')
      }
    },
    stakeText() {
      var that = this;
      if (that.stakeText == 0 || that.stakeText == '' || that.stakeText == null) {
      } else {
        // console.warn(this.stakeText)
        this.stakeText = this.stakeText.toString().replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1')
      }
    }
  },
  created() {
    if (this.utilsEvent.isMobile()) {
      if(!window.ethereum && this.isConnect){
        this.wallet()
      }
    } else {
      this.utilsEvent.checkFirstSite()
    }
  },
  mounted() {
    if (this.utilsEvent.isMobile()) {
      if (!window.ethereum) {
      } else {
        this.connetMetamask()
      }
    } else {
    }
    if (this.address != null) {
      // console.log(this.address)
      this.isConnect = true;
      // debugger
      this.initializeData();
    }
    this.checkMetamask();
  },
  beforeRouteLeave(to, from, next) {
    // console.log("end");
    this.timerList.forEach((item, index) => {
      clearInterval(item);
    })
    this.timerList = [];
    this.timer = 0;
    next();
  },
  destroyed() {
    this.timerList.forEach((item, index) => {
      clearInterval(item);
    })
    this.timerList = [];
    this.timer = 0;
  },
  methods: {
    clearData() {
      this.Earndate = '--';
      this.apy = '--';
      this.ethApr = '--';
      this.Rewards = '--';
      this.showStake = true;
      this.totalStake.textPrice = '--';
      this.totalStake.price = '--';
      this.Stake.textPrice = '--';
      this.Stake.price = '--';
      this.earhPrice.textPrice = '--';
      this.earhPrice.ethPrice = '--';
      this.firstData.walletPrice = '--';
      this.firstData.stakePrice = '--';
      this.date = '--';
      this.ethEarnToDate = '--';
      this.textPrincipal = '--';
      this.shares = '--';
      this.walletPrice = '--';
      this.WethPrice = '--';
      this.collectText = '--';
      this.allowance = '--';
      this.unstakeText = '';
      this.stakeText = '';
    },
    initializeData() {
      var that = this;
      // that.clearData();
      that.getData();
      this.timer = setInterval(() => {
        that.getData();
        // that.showWebData2();
        // that.showWebData();
      }, 30000)
      this.timerList.push(this.timer)
    },
    async searchAllowance() {
      var that = this;
      console.log('searchAllowance');
      that.allowance = 0;
      let trueChainId = await this.utilsEvent.checkChainId();
      // console.log('trueChainId',trueChainId)
      if (!trueChainId) {
        that.$message({
          message: 'Please switch to the correct network',
          type: 'warning'
        });
        return
      }
      let allowance = await initContracts().textareaContract.methods.allowance(that.address, address.mintSharingSystem).call();
      console.log('allowance', allowance)
      if (allowance == 0) {
        that.allowance = 1;
      } else {
        that.allowance = 2;
      }
    },
    async approved() {
      var that = this;
      let trueChainId = await this.utilsEvent.checkChainId();
      // console.log('trueChainId',trueChainId)
      if (!trueChainId) {
        that.$message({
          message: 'Please switch to the correct network',
          type: 'warning'
        });
        return
      }
      that.refused = true;
      await initContracts().textareaContract.methods.approve(address.mintSharingSystem,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
        from: that.address,
        gas: 300000,
      }).then(() => {
        that.refused = false;
        that.searchAllowance();
      }).catch(() => {
        that.refused = false;
      })
    },
    /**
     * @method hasvest
     * */
    async hasvest() {
      try {
        var that = this;
        let trueChainId = await this.utilsEvent.checkChainId();
        // console.log('trueChainId',trueChainId)
        if (!trueChainId) {
          that.$message({
            message: 'Please switch to the correct network',
            type: 'warning'
          });
          return
        }
        if (that.WethPrice == 0 || that.WethPrice == '' || that.WethPrice == null) {
          return
        } else {
          that.refused2 = true;
          // let number = new BigNumber(that.unstakeText / that.totalStake.textPrice * that.shares).toFixed(0);
          await initContracts().mintContract.methods.harvest().send({
            from: that.address
          }).then(() => {
            that.refused2 = false;
            that.$message({
              message: 'success',
              type: 'success'
            });
            that.getData();
          });
        }
      } catch (err) {
        that.refused2 = false;
        console.warn(err)
        that.$message({
          message: err.message,
          type: 'warning'
        });
      }
    },
    /**
     * @method maxClick
     * @param index {Number} 0 is stake;1 is Unstake
     * */
    maxClick(index) {
      var that = this;
      if (index == 1) {
        console.log("walletPrice", that.walletPrice)
        that.stakeText = that.walletPrice;
        that.searchAllowance();
      } else {
        that.unstakeText = that.Stake.textPrice;
        that.max = true;
      }
    },
    /**
     * @method stakeInput
     * */
    stakeInput() {
      var that = this;
      that.stakeText = (that.stakeText > that.walletPrice ? that.walletPrice : that.stakeText)
    },
    /**
     * @method unstakeInput
     * */
    unstakeInput() {
      var that = this;
      that.unstakeText = (that.unstakeText > that.Stake.textPrice ? that.Stake.textPrice : that.unstakeText)
      that.max = false;
    },
    /**
     * @method stakeClick
     * */
    async stakeClick() {
      try {
        var that = this;
        if (that.stakeText == 0 || that.stakeText == '' || that.stakeText == null) {
          return
        } else if (that.stakeText < 1) {
          that.$message({
            message: 'Cannot be less than 1 TEXT',
            type: 'warning'
          });
          return
        } else {
          let number = new BigNumber(that.stakeText).times(1e18).toFixed(0);
          console.log("number", number)
          console.log("that.address", that.address)
          if (number > that.firstData.walletPrice) {
            number = that.firstData.walletPrice
          }
          that.refused = true;
          await initContracts().mintContract.methods.deposit(number, false).send({
            from: that.address
          }).then(function (receipt) {
            that.refused = false;
            console.log("receipt=>", receipt)
            // 6 Success
            that.stakeText = '';
            that.$message({
              message: 'success',
              type: 'success'
            });
            that.getData();
          });
        }
      } catch (err) {
        that.refused = false;
        console.log("err=>", err)
        that.$message({
          message: err.message,
          type: 'warning'
        });
      }
    },
    /**
     * @method unstakeClick
     * */
    async unstakeClick() {
      try {
        var that = this;
        if (that.unstakeText == 0 || that.unstakeText == '' || that.unstakeText == null) {
          return
        } else {
          console.log(that.max, "max")
          let price = new BigNumber(that.unstakeText).times(1e18).toFixed(0);
          let total = that.firstData.stakePrice;
          let number = 0
          if (that.max || that.unstakeText >= that.Stake.textPrice) {
            // price = that.firstData.stakePrice
            number = that.shares
          } else {
            number = that.unstakeText / that.Stake.textPrice * new BigNumber(that.shares).div(1e18).toFixed(6);
            number = new BigNumber(number).times(1e18).toFixed(0);
          }
          // that.unstakeText==that.Stake.textPrice?that.firstData.stakePrice
          // let number = new BigNumber(1 * that.shares);
          // console.log('that.unstakeText / that.Stake.textPrice', that.unstakeText / that.Stake.textPrice)
          console.log('that.Stake.textPrice', that.Stake.textPrice)
          console.log('that.shares', that.shares)

          // if (number > that.firstData.stakePrice) {
          //   number = that.firstData.stakePrice
          // }
          that.refused1 = true;
          await initContracts().mintContract.methods.withdraw(number, false).send({
            from: that.address
          }).then(function (receipt) {
            console.log("receipt=>", receipt)
            // 6 Success
            that.unstakeText = '';
            that.$message({
              message: 'success',
              type: 'success'
            });
            that.refused1 = false;
            that.getData();
          });
        }
      } catch (err) {
        that.refused1 = false;
        console.log("err=>", err)
        that.$message({
          message: err.message,
          type: 'warning'
        });
      }
    },
    async getData(add) {
      try {
        var that = this;
        if (typeof add != "undefined") {
          that.address = add;
        }
        console.log('start get', that.address)
        let UserInfo = await initContracts().mintContract.methods.userInfo(that.address).call();
        let totalPrice = await initContracts().tokenDistributorContract.methods.userInfo(address.mintSharingSystem).call();
        let Rewards = await initContracts().tokenDistributorContract.methods.calculatePendingRewards(address.mintSharingSystem).call();
        let stakePrice = await initContracts().mintContract.methods.calculateSharesValueInTEXT(that.address).call();
        let walletPrice = await initContracts().textareaContract.methods.balanceOf(that.address).call();
        let WethPrice = await initContracts().mintContract.methods.calculatePendingRewards(that.address).call();
        console.log('walletPrice=>', walletPrice)
        that.shares = UserInfo.shares;
        // console.log('that.shares', that.shares)
        that.totalStake.textPrice = Number(new BigNumber(totalPrice.amount).div(1e18).toFixed(4))
        that.walletPrice = Number(new BigNumber(walletPrice).div(1e18).toFixed(4))
        that.WethPrice = Number(new BigNumber(WethPrice).div(1e18).toFixed(8))
        that.Rewards = Number(new BigNumber(Rewards).div(1e18).toFixed(8))
        console.log('that.Rewards', that.Rewards)
        console.log('Rewards', Rewards)
        console.log(' that.walletPrice', that.walletPrice)
        // console.log('totalPrice', totalPrice)
        // console.log('that.totalStake.textPrice', that.totalStake.textPrice)


        that.firstData.walletPrice = walletPrice
        that.firstData.stakePrice = stakePrice
        that.Stake.textPrice = Number(new BigNumber(stakePrice).div(1e18).toFixed(18))
        console.log(' that.Stake.textPrice', that.Stake.textPrice)
        that.showWebData2();
        that.showWebData();
      } catch (e) {
        console.error(e)
      }
    },
    // change Stake and UnStake
    changeItem(index) {
      var that = $('.staking-section2 .desc .item').eq(index).children('.top-desc')
      if (that.parents('.item').hasClass('show')) {
        that.parents('.item').removeClass('show');
        that.siblings('.bottom-wrapper').stop(true, true).slideUp(300);
      } else {
        that.parents('.item').addClass('show');
        that.siblings('.bottom-wrapper').stop(true, true).slideDown(300);
      }
    },
    /**
     * click connet to Metamask
     * @method connetMetamask
     */
    async connetMetamask() {
      var that = this;

      if (!window.ethereum) {
        if (this.utilsEvent.isMobile()) {
          this.wallet()
        } else {
          this.$message({
            message: 'Please use web3 browser',
            type: 'warning'
          });

        }
        return;
      }
      let trueChainId = await this.utilsEvent.checkChainId();
      // console.log('trueChainId',trueChainId)
      if (!trueChainId) {
        that.$message({
          message: 'Please switch to the correct network',
          type: 'warning'
        });
        return
      }
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        sessionStorage.setItem('isConnect', true)
        that.isConnect = sessionStorage.getItem('isConnect');
        sessionStorage.setItem('address', accounts[0]);
        that.address = sessionStorage.getItem('address');
        that.initializeData();
      }).catch((reason) => {
        console.log('', reason)
        if (reason.code == -32002) {
          that.$message({
            message: reason.message,
            type: 'warning'
          });

        }
      })
    },

    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.$nextTick(() => {
          sessionStorage.setItem('isConnect', true)
          that.isConnect = sessionStorage.getItem('isConnect');
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
          that.initializeData();
        })
      }).catch((reason) => {
        console.log('', reason)
        // if (reason.code == -32002) {
        //   this.$message({
        //     message: reason.message,
        //     type: 'warning'
        //   });
        // }
      });
      initContracts().provider.on("accountsChanged", (accounts) => {

        this.$nextTick(() => {
          // Time to reload your interface with accounts[0]!
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
      initContracts().provider.on("chainChanged", (chainId) => {

        this.$nextTick(() => {
          // Time to reload your interface with accounts[0]!
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {
        this.$nextTick(() => {
          // Time to reload your interface with accounts[0]!
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          that.address = '';
          that.isConnect = false;
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
    },
    async showWebData(add) {
      var that = this;
      try {
        if (typeof add != "undefined") {
          that.address = add;
        }
        console.log('try', that.address)
        axios.get(`https://api.textarea.xyz/wordtest/common/quryGlobalProp`).then(res => {
          if (res.status == 200) {
            let data = null;
            data = res.data.data; //The Array to JSON
            console.warn(data)
            this.apy = data.textApr;
            this.ethApr = data.ethApr;
            this.earhPrice.ethPrice = data.ethPrice;
            this.earhPrice.textPrice = data.textPrice;
            this.$forceUpdate();
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async showWebData2(add) {
      var that = this;
      try {
        if (typeof add != "undefined") {
          that.address = add;
        }
        // console.log('try',this.address)
        axios.get(`https://api.textarea.xyz/wordtest/common/queryUserStake?address=${this.address}`).then(res => {
          if (res.status == 200) {
            let data = null;
            data = res.data.data; //The Array to JSON
            console.log(data)
            this.date = data.ethLastEarn;
            this.ethEarnToDate = Number(new BigNumber(data.ethEarnToDate).div(1e18).toFixed(6));
            this.textPrincipal = Number(new BigNumber(data.textPrincipal).div(1e18).toFixed(4));
            console.log(this.Stake.textPrice)
            console.log(this.textPrincipal)
            this.Earndate = this.Stake.textPrice - this.textPrincipal
            console.log("this.Earndate", this.Earndate)
            // this.apy=data.textApr;
            // this.earhPrice.price1=data.ethPrice/10000;
            // this.earhPrice.price2=data.textPrice/10000;
            this.$forceUpdate();
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    checkMetamask() {
      var that = this;
      if (!window.ethereum) {
        return;
      }
      ethereum.on("accountsChanged", function (accounts) {
        sessionStorage.setItem('address', accounts[0]);
        this.address = accounts[0];
        console.log("this.address", this.address)
        that.clearData();
        that.getData(accounts[0])
        that.searchAllowance();
        that.showWebData2(accounts[0]);
        that.showWebData(accounts[0]);
      });
      ethereum.on('networkChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        sessionStorage.setItem('isConnect', false)
        if (sessionStorage.getItem('isConnect') == 'true') {
          that.isConnect = true;
        } else {
          that.isConnect = false
        }
        sessionStorage.removeItem('isConnect')
        sessionStorage.removeItem('address')
      })
    },
  }
}
;

</script>

<style lang="less" scoped>
@import "./index.less";

.body, .container, .container:before, /deep/ .footer {
  background: #121619;
}

@media screen and (max-width: 980px) {
  /deep/ .footer {
    background: #000000;
    border-top: 0.5px solid #282828;
  }

}
</style>
<style>
.font16 {
  font-size: 16px !important;
}

.font18 {
  font-size: 18px !important;
}

@media screen and (max-width: 980px) {
  .font16 {
    font-size: 16px !important;
  }

  .font18 {
    font-size: 16px !important;
  }
}

.el-loading-spinner .el-loading-text, .el-loading-spinner i {
  color: #ffffff;
  font-size: 24px;
}

.textarea-container {
  padding-bottom: 100px;

}

.textarea-bottom {
  padding-top: 20px;
}

.content {
//padding-bottom: 80px;
}

.no-data {
  text-align: center;
//font-size: 18px;
}

@media screen and (max-width: 980px) {
  .el-loading-spinner .el-loading-text {
    font-size: 18px;
  }
}
</style>