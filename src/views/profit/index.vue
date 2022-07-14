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
    <div v-if="isConnect" class="textarea-container">
      <div class="content">
        <div v-if="wordList.length==0&&start" class="no-data">
          <img src="@/assets/images/none-data.png" width="80%"/>

          <span v-if="!timeout">You don't have any words</span>
          <span v-else>Network timed out,<br/>please try again</span>
        </div>
        <div v-if="wordList.length==0&&start" class="no-data no-data1">
          <img src="@/assets/images/none-data1.png" width="80%"/>
          <span v-if="!timeout">You don't have any words</span>
          <span v-else>Network timed out,<br/>please try again</span>
        </div>
        <ul class="list list-word-data">
          <li v-for="(item,index) in wordList" :key="index"
              :class="[item.isShow?'on':'',item.list.length==0?'no-list':'']">
            <div class="wrapper-flex-row top" @click="changeShow(index)">
              <div class="name">{{ item.word }}</div>
              <div class="price">{{ item.totalRevenue |NumFormat }} ETH</div>
            </div>
            <div class="desc" :class="item.list.length==0?'none':''">
              <p v-for="(it,i) in item.list" :key="i">
                <img :src="it.imageUrl" width="100%"/>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content profit-bottom" v-if="wordList.length> 0&&start" :class="[availablePrice>0?'':'on']">
        <div class="textarea-bottom">
          <ul class="list list-total">
            <li>
              <div class="wrapper-flex-row top" style="color: #415360">
                <div class="name">Total</div>
                <div class="price">{{ totalPrice |NumFormat }} ETH</div>
              </div>
            </li>
            <li>
              <div class="wrapper-flex-row top" style="color: #415360">
                <div class="name">Withdrawn</div>
                <div class="price">{{ WithdrawnPrice|NumFormat }} ETH</div>
              </div>
            </li>
            <li>
              <div class="wrapper-flex-row top" :style="availablePrice==0?'color:#415360':'color:#2de370' ">
                <div class="name">Available</div>
                <div class="price">{{ availablePrice|NumFormat }} ETH</div>
              </div>
            </li>
          </ul>
          <div @click="withdraw()" :class="[availablePrice>0?'':'on','connect Withdraw',refused?'refused':'']"
               style="width: 100%;box-sizing: border-box">
            <span
                style="width: 100%;box-sizing: border-box;color: #404040;background: #2de370;text-align: center;font-size: 18px;padding: 15px 0;display: block;">Withdraw</span>
          </div>
        </div>
      </div>
    </div>
    <footer-Bar></footer-Bar>
  </div>
</template>

<script>
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
      refused: false,
      start: false,
      toFixed: 8,
      wordList: [],//word Token
      sentenceWordPrice: 0,//one of the sentence Word Price
      WithdrawnPrice: 0,//WithdrawnPrice
      totalPrice: 0,//total
      availablePrice: 0,
      tokenIdList: [],//claim tokenId list
      address: null || sessionStorage.getItem('address'),
      isConnect: sessionStorage.getItem('isConnect') || false,
      timeout: false,
    }
  },
  computed: {},
  watch: {
    network(e) {
    },
    address(e) {
    },
  },
  filters: {
    NumFormat(value) {
      if (!value) return '0'
      value = Number(value)
      return value
    },
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
      if (window.ethereum) {
        this.connetMetamask()
      }
    }
    if (this.address != null) {
      // console.log(this.address)
      this.isConnect = true;
      this.getDataList(this.address)
    }
    this.checkMetamask()
  },
  methods: {
    changeShow(index) {
      this.$nextTick(() => {
        this.wordList[index].isShow = !this.wordList[index].isShow
      })
      this.$forceUpdate()
    },
    getDataList(address) {
      var that = this;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      });
      try {
        axios.get(`https://api.textarea.xyz/wordtest/common/queryData?address=${address}`).then(res => {
          console.log(res.data)
          let sentences = Object.values(res.data.sentence); //The Array to JSON
          let sentencesToken = null;
          // console.log(sentences)
          if (res.status == 200) {
            that.wordList = Object.values(res.data.words); //The Array to JSON
            if (that.wordList.length == 0) {
              that.start = true;
              loading.close();
            }
            that.wordList.filter(item => {
              sentencesToken = Object.values(item.sentences);
              item.isShow = false;
              item.list = [];

              if (item.totalRevenue > 0) {
                that.tokenIdList.push(item.tokenID)
              }
              item.totalRevenue = new BigNumber(item.totalRevenue).div(1e18).toFixed(this.toFixed)
              sentencesToken.filter(tokenID => {
                sentences.filter(sentencesItem => {
                  if (sentencesItem.tokenID == tokenID) {
                    item.list.push(sentencesItem)
                  }
                });
              });
              that.start = true;
              loading.close();
            });
            this.$forceUpdate();
            this.availablePrice = new BigNumber(res.data.availableRevenue).div(1e18).toFixed(this.toFixed)
            this.totalPrice = new BigNumber(res.data.totalRevenue).div(1e18).toFixed(this.toFixed);
            this.WithdrawnPrice = new BigNumber(res.data.claimRevenue).div(1e18).toFixed(this.toFixed);
            console.log('that.wordList', that.wordList)
          }
        })
        setTimeout(() => {
          if (sessionStorage.getItem('timeout') == '1') {
            loading.close()
            that.start = true;
            that.timeout = true
            // console.log("that.timeout", that.timeout)
          }
        }, 60000)

      } catch (e) {
        console.log(e)
        loading.close();
      }
    },
    async withdraw() {
      var that = this;
      if (this.availablePrice == 0) {
        return
      }

      try {
        console.log("tokenIdList", this.tokenIdList)
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
        await initContracts().wordContract.methods.claimSentenceRevenue(this.tokenIdList).send({
          from: this.address
        })
            .then(function (receipt) {
              // 5 Success
              // console.log(receipt)
              that.refused = false;
              that.$message({
                message: 'success',
                type: 'success'
              });
              setTimeout(() => {
                that.wordList = [];
                that.getDataList(that.address)
              }, 500)
            });
      } catch (err) {
        // console.log(err)
        that.refused = false;
        that.$message({
          message: err.message,
          type: 'warning'
        });
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
        sessionStorage.setItem('isConnect', true)
        this.isConnect = sessionStorage.getItem('isConnect');
        sessionStorage.setItem('address', accounts[0]);
        this.address = sessionStorage.getItem('address');
        this.getDataList(this.address)
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
        sessionStorage.setItem('address', accounts[0]);
        that.address = sessionStorage.getItem('address');
        that.getDataList(that.address)
      });
      ethereum.on("networkChanged", function (accounts) {
        sessionStorage.setItem('isConnect', false)
        if (sessionStorage.getItem('isConnect') == 'true') {
          that.isConnect = true;
        } else {
          that.isConnect = false
        }
        sessionStorage.removeItem('isConnect')
        sessionStorage.removeItem('address')
      });
    },
    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.$nextTick(() => {
          sessionStorage.setItem('isConnect', true)
          this.isConnect = sessionStorage.getItem('isConnect');
          sessionStorage.setItem('address', accounts[0]);
          this.address = sessionStorage.getItem('address');
          this.getDataList(this.address)
        })
      }).catch((reason) => {
        console.log('', reason)
      });
      initContracts().provider.on("accountsChanged", (accounts) => {

        this.$nextTick(() => {
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
          that.getDataList(that.address)
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
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {
        this.$nextTick(() => {
          console.log('disconnect')
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            this.isConnect = true;
          } else {
            this.isConnect = false
          }
          this.address = ''
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
    },
    /**
     * checked word BalanceOf
     * @method checkedBalanceOf
     * @return {String} wordCount
     * @return {Number} sentenceWordPrice
     */
    async checkedWordBalanceOf() {
      var that = this;
      let rate = 1;
      // console.log('address=>', this.address)
      let tokenId = null, hashItem = null, countItem = null, textItem = null, price = 0,
          sentenceTokenID = null, sentenceHash = null, sentenceDesc = null, sentenceColor = null,
          availableWordPrice = null,
          TokenList = [], HashList = [];
      that.totalPrice = 0;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      });
      try {
        let wordCount = await initContracts().wordContract.methods.balanceOf(that.address).call();
        loading.setText('Loading Word 10%');
        for (var i = 0; i < wordCount; i++) {
          tokenId = await initContracts().wordContract.methods.tokenOfOwnerByIndex(that.address, i).call();
          TokenList.push(tokenId)
        }
        loading.setText('Loading Word 50%');
        console.log(TokenList, "<=TokenList")
        that.sentenceWordPrice = await initContracts().wordContract.methods.sentenceWordPrice().call();
        loading.setText('Loading Word 80%');
        for (var i = 0; i < TokenList.length; i++) {
          hashItem = await initContracts().wordContract.methods.wordTokenID2Hash(TokenList[i]).call();
          HashList.push(hashItem)
        }
        loading.setText('Loading Word 85%');
        for (var i = 0; i < HashList.length; i++) {
          countItem = await initContracts().wordContract.methods.sentenceMintNum(HashList[i]).call();
          textItem = await initContracts().wordContract.methods.wordHash2String(HashList[i]).call();
          price = Number(countItem) * Number(new BigNumber(that.sentenceWordPrice).div(1e18)) * rate;
          availableWordPrice = await initContracts().wordContract.methods.sentenceMintRevenue(TokenList[i]).call();
          availableWordPrice = new BigNumber(availableWordPrice).div(1e18).toFixed(4)
          that.availablePrice = (Number(availableWordPrice) * Number(countItem)).toFixed(4)
          that.wordList.push(
              {
                token: TokenList[i],
                hash: HashList[i],
                count: Number(countItem),
                price: Number(price.toFixed(4)),
                name: textItem,
                isShow: false,
                list: [],
              }
          )
          if (that.wordList[i].price > 0) {
            that.tokenIdList.push(TokenList[i])
          }
          that.totalPrice += Number(that.wordList[i].price)

          console.log(that.wordList, that.wordList, "that.wordList")
        }
        loading.setText('Loading Word 100%');
        for (var i = 0; i < that.wordList.length; i++) {
          for (var j = 0; j < that.wordList[i].count; j++) {
            sentenceTokenID = await initContracts().wordContract.methods.sentenceMintTokenIDs(that.wordList[i].hash, j).call();
            sentenceHash = await initContracts().sentenceContract.methods.sentenceTokenID2Hash(sentenceTokenID).call();
            sentenceDesc = await initContracts().sentenceContract.methods.sentenceHash2String(sentenceHash).call();
            sentenceColor = await initContracts().sentenceContract.methods.sentenceTokenID2Color(sentenceTokenID).call();
            loading.setText('Loading Sentence ' + (90 * ((i + 1) / that.wordList.length)) + '%');
            let newItem = {
              tokenId: sentenceTokenID,
              hash: sentenceHash,
              beforeDesc: sentenceDesc,
              afterDesc: that.getStringStyleReplace(sentenceDesc, that.wordList[i].name),
              color: that.changeColor(sentenceColor),
            };

            that.wordList[i].list.push(newItem)
          }
        }
        loading.setText('Loading Price');
        that.WithdrawnPrice = (Number(that.totalPrice) - Number(that.availablePrice)).toFixed(4)
        // totalPrice
        loading.close();
        that.$forceUpdate()
        console.log("that.wordList", that.wordList)
      } catch (err) {
        console.log(err, "<=err")
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";

.body, .container, .container:before, /deep/ .footer {
  background: #121619;
}

/deep/ .footer {
  padding-top: 10vh;
}

@media screen and (max-width: 980px) {
  /deep/ .footer {
    background: #000000;
    border-top: 0.5px solid #282828;
  }

  .list-word-data {
    padding-bottom: 70px;
  }

  /deep/ .footer {
    padding-top: 0;
  }

}
</style>
<style>
.el-loading-spinner .el-loading-text, .el-loading-spinner i {
  color: #ffffff;
  font-size: 24px;
}

.textarea-container {
  padding-bottom: 200px;

}

.textarea-bottom {
  padding-top: 20px;
}

.content {
}

.no-data {
  text-align: center;
}

@media screen and (max-width: 980px) {
  .el-loading-spinner .el-loading-text {
    font-size: 18px;
  }
}
</style>