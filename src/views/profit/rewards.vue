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
        <router-link to="/rewards/word" class="button-rewards word">word</router-link>
        <a to="/rewards/staking" class="button-rewards staking">staking</a>
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
      address: null || sessionStorage.getItem('address'),
      isConnect: sessionStorage.getItem('isConnect') || false,
    }
  },
  computed: {},
  watch: {
    network(e) {
    },
    address(e) {
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
      if (!window.ethereum) {
      } else {
        this.connetMetamask()
      }
    } 
    if (this.address != null) {
      this.isConnect = true;
    }
    this.checkMetamask()
  },
  methods: {

    link_id(id) {

      var _id = document.getElementById(id);
      window.scrollTo(0, _id.offsetTop);
    },
    /**
     * click connet to Metamask
     * @method connetMetamask
     */
    connetMetamask() {
      var that = this;
      if (!window.ethereum) {
        if (this.utilsEvent.isMobile()) {
          this.wallet()
        }
        return;
      }
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        sessionStorage.setItem('isConnect', true)
        that.isConnect = sessionStorage.getItem('isConnect');
        sessionStorage.setItem('address', accounts[0]);
        that.address = sessionStorage.getItem('address');
        // that.getDataList(that.address)
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
    checkMetamask() {
      var that = this;
      if (!window.ethereum) {
        return;
      }
      ethereum.on("accountsChanged", function (accounts) {
        // console.log('accountsChanged')
        sessionStorage.setItem('address', accounts[0]);
        that.address = sessionStorage.getItem('address');
        // that.getDataList(that.address)
      });
      initContracts().provider.on("chainChanged", (chainId) => {
        that.address = '';
        sessionStorage.removeItem('isConnect')
        sessionStorage.removeItem('address')
      });
    },
    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.$nextTick(() => {
          sessionStorage.setItem('isConnect', true)
          that.isConnect = sessionStorage.getItem('isConnect');
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
        })
      }).catch((reason) => {
        console.log('', reason)
      });
      initContracts().provider.on("accountsChanged", (accounts) => {
        this.$nextTick(() => {
          // console.log('accountsChanged')
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
        })
      });
      initContracts().provider.on("chainChanged", (chainId) => {

        this.$nextTick(() => {
          // console.log('chainChanged')
          that.address = '';
          that.isConnect = false;
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {

        this.$nextTick(() => {
          // console.log('disconnect')
          that.address = '';
          that.isConnect = false;
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
      let rate = 1; // The commission is 5%
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
        // A.Get word List
        let wordCount = await initContracts().wordContract.methods.balanceOf(that.address).call();
        loading.setText('Loading Word 10%');
        // B.Loop through the word count loop to get the tokenID and add it to the loop list
        for (var i = 0; i < wordCount; i++) {
          tokenId = await initContracts().wordContract.methods.tokenOfOwnerByIndex(that.address, i).call();
          TokenList.push(tokenId)
        }
        loading.setText('Loading Word 50%');
        //C.Get the price of words and sentences
        that.sentenceWordPrice = await initContracts().wordContract.methods.sentenceWordPrice().call();
        loading.setText('Loading Word 80%');
        // D.Loop through the tokenID list to get the hash and add it to the loop list
        for (var i = 0; i < TokenList.length; i++) {
          hashItem = await initContracts().wordContract.methods.wordTokenID2Hash(TokenList[i]).call();
          HashList.push(hashItem)
          // console.log(hashItem, "<=hashItem")
        }
        loading.setText('Loading Word 85%');
        // E.Get the number of sentences corresponding to the word by traversing the word hash
        for (var i = 0; i < HashList.length; i++) {
          countItem = await initContracts().wordContract.methods.sentenceMintNum(HashList[i]).call();
          textItem = await initContracts().wordContract.methods.wordHash2String(HashList[i]).call();
          // SentenceMintNumList.push(item);
          price = Number(countItem) * Number(new BigNumber(that.sentenceWordPrice).div(1e18)) * rate;
          availableWordPrice = await initContracts().wordContract.methods.sentenceMintRevenue(TokenList[i]).call();
          availableWordPrice = new BigNumber(availableWordPrice).div(1e18).toFixed(4)
          that.availablePrice = (Number(availableWordPrice) * Number(countItem)).toFixed(4)
          that.wordList.push({
            token: TokenList[i],
            hash: HashList[i],
            count: Number(countItem),
            price: Number(price.toFixed(4)),
            name: textItem,
            isShow: false,
            list: [],
          })
          if (that.wordList[i].price > 0) {
            that.tokenIdList.push(TokenList[i])
          }
          that.totalPrice += Number(that.wordList[i].price)
          console.log(that.wordList, that.wordList, "that.wordList")
        }
        loading.setText('Loading Word 100%');
        // F.Get the hash of each sentence of the corresponding word based on the number of sentences traversed for each word
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
      } catch (err) {
        // console.log(err, "<=err")
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";

.body, .container, .container:before, /deep/.footer {
  background: #121619;
}
/deep/.footer{
  padding-top: 5vh;
}
@media screen and (max-width: 980px) {
  /deep/.footer {
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

.textarea-container {
  padding-bottom: 100px;

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