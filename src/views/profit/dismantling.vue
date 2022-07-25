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
    <div v-if="isConnect" class="synthesis-container">
      <div class="content">
        <div class="second-synthesis list">
          <a v-for="(item,index) in showList" :index="index" class="item ">
            <div class="items1 pop-loading-picture">
              <i class="el-icon-picture icons"></i>
              <img :src="item.image" width="100%" @click="selectedShow(item.image)"/>
            </div>
            <div class="connect connect-wallet wrapper-flex-row" v-if="allowance==1" @click="approved">Approved</div>
            <div class="connect connect-wallet wrapper-flex-row" :class="refused==index?'refused':''"
                 @click="selectedNft(item,index)" v-if="allowance==2">
              Provide {{ item.forReward }} TEXT for dismantling
            </div>
          </a>
          <div v-if="showList.length==0&&start" class="no-data">
            <img src="@/assets/images/none-data.png" width="80%"/>
            <span v-if="!timeout">Nothing to disassemble</span>
            <span v-else>Network timed out,<br/>please try again</span>
          </div>
          <div v-if="showList.length==0&&start" class="no-data no-data1">
            <img src="@/assets/images/none-data1.png" width="80%"/>
            <span v-if="!timeout">Nothing to disassemble</span>
            <span v-else>Network timed out,<br/>please try again</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pop-container pop-none-iphone" v-if="showImg!=null" @click="showImg=null">
      <div class="bg" style="background:#121619;z-index: 110"></div>
      <div class="content content2">
        <img :src="showImg" width="100%s"/>
      </div>
    </div>
    <footer-Bar></footer-Bar>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import {Message} from 'element-ui';
import footerBar from '../../components/footerBar'
import headerBar from './components/headerBar'
import {address, initContracts} from "../../utils/common";
import axios from "axios";

export default {
  components: {
    footerBar,
    headerBar
  },
  data() {
    return {
      tokenID: 0,
      refused: -1,
      start: false,
      nft: null,
      showImg: null,
      showList: [],//input give NFT LIST
      address: null || sessionStorage.getItem('address'),
      isConnect: sessionStorage.getItem('isConnect') || false,
      timeout: false,
      allowance: 0,
      walletPrice: 0,
    }
  },
  computed: {},
  watch: {
    network(e) {
    },
    address(e) {
    }
  },

  created() {
    if (this.utilsEvent.isMobile()) {
      if (!window.ethereum && this.isConnect) {
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
      if (this.address != null) {
        this.isConnect = true;
        this.showList = [];
        this.searchAllowance();
        this.getData();
        this.showMergeList();
      }
    }
    this.checkMetamask();
  },
  methods: {
    async getData() {
      try {
        var that = this;
        console.log('start get')
        let trueChainId = await this.utilsEvent.checkChainId();
        // console.log('trueChainId',trueChainId)
        if (!trueChainId) {
          that.$message({
            message: 'Please switch to the correct network',
            type: 'warning'
          });
          return
        }
        let walletPrice = await initContracts().textareaContract.methods.balanceOf(that.address).call();
        // let UserInfo = await initContracts().mergeContract.methods.mergeInfos(that.address).call();
        // console.log('UserInfo', UserInfo);
        that.walletPrice = Number(new BigNumber(walletPrice).div(1e18).toFixed(6))
        console.log('that.walletPrice', that.walletPrice)
      } catch (e) {
      }
    },
    async searchAllowance() {
      var that = this;
      console.log('searchAllowance');
      that.allowance = 0;
      let allowance = await initContracts().textareaContract.methods.allowance(that.address, address.merge).call();
      // console.log('allowance', allowance)
      if (allowance == 0) {
        that.allowance = 1;
      } else {
        that.allowance = 2;
      }
    },
    async approved() {
      var that = this;
      await initContracts().textareaContract.methods.approve(address.merge,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
        from: that.address,
        gas: 300000,
      })
      that.searchAllowance();
    },
    selectedShow(img) {
      this.showImg = img;
    },
    async selectedNft(item, index) {
      var that = this;
      if (item.forReward > this.walletPrice) {
        that.$message({
          message: 'Insufficient amount of TEXT',
          type: 'warning'
        });
        return;
      }
      that.nft = item;
      that.refused = index;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      });
      let obj = await initContracts();
      // console.log(that.nft.tokenID)
      try {
        await obj.mergeContract.methods.unbind(that.nft.tokenID).send({
          from: that.address
        }).then(function (receipt) {
          that.$message({
            message: 'Unbinding succeeded!',
            type: 'success'
          });
          that.refused = -1;
          setTimeout(() => {
            that.showList = [];
            that.showMergeList(1)
          }, 1500)

        })

      } catch (err) {
        that.refused = -1;
        that.$message({
          message: err.message,
          type: 'warning'
        });
        loading.close();
        // console.log(err)
      }
    },

    async showMergeList(status) {
      var that = this;
      that.showList = [];
      that.refused = -1;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      });
      try {
        console.log('try')
        axios.get(`https://api.textarea.xyz/wordtest/common/queryData?address=${this.address}`).then(res => {
          if (res.status == 200) {
            let mergeToken = null;
            console.log(res.data)
            mergeToken = res.data.data.merges; //The Array to JSON
            let merges = Object.values(res.data.merge); //The Array to JSON
            console.warn("mergeToken.length", mergeToken.length)
            if (mergeToken.length == 0) {
              loading.close();
              that.start = true;
            }
            console.warn("merges", merges)
            mergeToken.filter(tokenID => {
              merges.filter(mergesItem => {
                if (mergesItem.tokenID == tokenID) {
                  // that.showList.push(mergesItem)
                  axios.get(mergesItem.url).then(res => {
                    if (that.nft == null || tokenID != that.nft.tokenID) {
                      this.showList.push({
                        tokenID: mergesItem.tokenID,
                        image: res.data.image,
                        name: res.data.name,
                        reward: mergesItem.reward,
                        forReward: new BigNumber(mergesItem.reward).div(1e18).toFixed(0)
                      });
                    }
                    // console.warn(mergesItem.reward)
                    loading.close();
                    that.start = true;
                  })
                }
              });
            });
            // this.showList = this.sentenceList;
            console.log(this.showList)
            this.$forceUpdate();
          }
          // loading.close();
        })
        setTimeout(() => {
          if (sessionStorage.getItem('timeout') == '1') {
            loading.close()
            that.start = true;
            that.timeout = true
            console.log("that.timeout", that.timeout)
          }
        }, 60000)
      } catch (e) {
        console.log(e)
        loading.close();
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
        this.$message({
          message: 'Please switch to the correct network',
          type: 'warning'
        });
        return
      }
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        this.showList = [];
        sessionStorage.setItem('isConnect', true)
        this.isConnect = sessionStorage.getItem('isConnect');
        sessionStorage.setItem('address', accounts[0]);
        this.address = sessionStorage.getItem('address');
        this.searchAllowance();
        this.getData();
        this.showMergeList();
      }).catch((reason) => {
        console.log('', reason)
        if (reason.code == -32002) {
          this.$message({
            message: reason.message,
            type: 'warning'
          });

        }
      })
    },
    checkMetamask() {
      var that = this;
      if (!window.ethereum) {
        return;
      }
      ethereum.on("accountsChanged", function (accounts) {
        if(accounts.length==0){
          that.address =null ;
          that.isConnect = false
          that.showList = [];
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        }else {
          sessionStorage.setItem('isConnect', false)
          that.isConnect = sessionStorage.getItem('isConnect');
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
          that.showList = [];
          that.showMergeList()
          that.searchAllowance();
          that.getData()
        }
      });
      ethereum.on("chainChanged", function (accounts) {
        sessionStorage.setItem('isConnect', false)
        if (sessionStorage.getItem('isConnect') == 'true') {
          that.isConnect = true;
        } else {
          that.isConnect = false
        }
        that.showList = [];
        sessionStorage.removeItem('isConnect')
        sessionStorage.removeItem('address')
      });
    },
    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.showList = [];
        sessionStorage.setItem('isConnect', true)
        this.isConnect = sessionStorage.getItem('isConnect');
        sessionStorage.setItem('address', accounts[0]);
        this.address = sessionStorage.getItem('address');
        this.searchAllowance();
        this.getData();
        this.showMergeList();
      }).catch((reason) => {
        console.log('', reason)
        if (reason.code == -32002) {
          this.$message({
            message: reason.message,
            type: 'warning'
          });
        }
      });
      initContracts().provider.on("accountsChanged", (accounts) => {
        this.$nextTick(() => {
          sessionStorage.setItem('isConnect', false)
          that.isConnect = sessionStorage.getItem('isConnect');
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
          that.showList = [];
          that.showMergeList()
          that.searchAllowance();
          that.getData()
        })
      });
      initContracts().provider.on("chainChanged", (chainId) => {
        this.$nextTick(() => {
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          that.showList = [];
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {
        this.$nextTick(() => {
          console.log(code, reason);
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          that.showList = [];
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
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

.pop-loading-picture {
  position: relative;
  min-height: 320px;
}

.pop-loading-picture .icon {
  top: 45%;
}

@media screen and (max-width: 980px) {
  /deep/ .footer {
    background: #000000;
    border-top: 0.5px solid #282828;
  }
}

</style>
<style>
.el-loading-spinner .el-loading-text, .el-loading-spinner i {
  color: #ffffff;
  font-size: 24px;
}

@media screen and (max-width: 980px) {
  .el-loading-spinner .el-loading-text {
    font-size: 18px;
  }
}
</style>