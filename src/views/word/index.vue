<template>
  <div class="container">
    <!--  connetMetamask-->
    <div class="wrapper-flex-row content">
      <div class="input" :class="focus==true?'focus':''"
      >
        <input
            ref="mark"
            v-model="newRoleNameEn" spellcheck="false"
            @focus="inputClick()"
            @blur="blurClick()"
            @input="inputs()"
        />
      </div>

      <div class="iphone-button" @click="connetMetamask()" v-show="!isConnect&&newRoleNameEn.length>0"
           style="font-size: 16px">
        Connect
      </div>
      <div v-show="isConnect">
        <div :class="isClaim?'button ':'button on error'" @click="claim" v-show="result&&newRoleNameEn.length>0">
          <img src="@/assets/images/icon-green.svg" width="12" v-if="isClaim"/>{{ isClaim ? 'Claim' : 'Claimed' }}
        </div>
        <div class="button on" @click="claim" v-show="newRoleNameEn.length==0" style="opacity: 0">
          <img src="@/assets/images/icon-green.svg" width="12"/>Claim
        </div>
        <div v-show="!result&&newRoleNameEn.length>0" class="wrapper-flex-row dian button">
          <span class="ani_dot">...</span>
        </div>
        <div :class="[isClaim?'iphone-button ':'iphone-button on',refuse?'refuse':'']" @click="claim"
             v-if="result&&newRoleNameEn.length>0&&isClaim">Claim
        </div>
        <div :class="isClaim?'iphone-button ':'iphone-button on'" v-if="result&&newRoleNameEn.length==0"
             style="opacity: 0">Claim
        </div>
        <div v-if="result&&newRoleNameEn.length>0&&!isClaim" class="iphone-button claimed">claimed</div>
        <div v-if="!result&&newRoleNameEn.length>0" class="iphone-button dian">
          <span class="ani_dot">...</span>
        </div>
      </div>
    </div>
    <footer-Bar @change="updateReload($event)"></footer-Bar>
  </div>
</template>

<script>
import {debounce} from '../../utils/utils'
import {initContracts} from "../../utils/common";
import footerBar from '../../components/footerBar'

export default {
  components: {
    footerBar
  },
  data() {
    return {
      word: ['i', 'you', 'he', 'she', 'it', 'am', 'are', 'were', 'is', 'was', 'be', 'do', 'does', 'did', 'have', 'has', 'shall', 'should', 'will', 'would', 'can', 'could', 'may', 'might'],
      reload: false,
      isConnect: sessionStorage.getItem('isConnect') || false,
      refuse: false,
      result: true,
      focus: false,
      isClaim: false,
      newRoleNameEn: '',
      timer: null,
    }
  },
  computed: {},
  filters: {},
  watch: {
    network(e) {
    },
    address(e) {
    },
    newRoleNameEn: function () {
      if (this.newRoleNameEn.length > 18) {
        this.newRoleNameEn = this.newRoleNameEn.slice(0, 18)
      }
      this.newRoleNameEn = this.newRoleNameEn.replace(/[^0-9A-Za-z]/g, '');
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
    this.$watch('newRoleNameEn', debounce((newQuery) => {
      var that = this;
      console.log(!this.word.includes(this.newRoleNameEn), this.newRoleNameEn)
      if (!this.word.includes(this.newRoleNameEn.toLowerCase())) {
        console.log('enter')
        that.queryTokenID().then((res) => {
          console.log(res)
          if (this.newRoleNameEn.length > 0 && res == 0) {
            that.isClaim = true;
            that.result = true;
          } else {
            that.isClaim = false;
            that.result = true;
          }
        });
      } else {
        console.log('else')
        that.isClaim = false;
        that.result = true;
      }
    }, 1000))
  },
  destroyed() {
  },
  mounted() {
    if (this.utilsEvent.isMobile()) {
      if (!window.ethereum) {
        if (this.address != null) {
          this.isConnect = true;
        }
      } else {
        this.connetMetamask()
        this.isConnect = true;
      }
    } else {
      this.isConnect = true;
      setTimeout(() => {

        this.$refs['mark'].focus()
      }, 10)
    }
    this.checkWidth()
    if (this.newRoleNameEn == 'null') {
      this.newRoleNameEn = '';
    } else {
      this.input()
    }
    this.checkMetamask();
  },
  methods: {
    updateReload(e) {
      if (e && this.newRoleNameEn == '') {
        this.newRoleNameEn = '';
        if (this.utilsEvent.isMobile()) {
          if (!window.ethereum) {
            if (this.address != null) {
              this.isConnect = true;
            }
          } else {
            this.connetMetamask()
            this.isConnect = true;
          }
        } else {
          this.isConnect = true;
          setTimeout(() => {
            this.$refs['mark'].focus()
          }, 10)
        }
        this.checkWidth()
        if (this.newRoleNameEn == 'null') {
          this.newRoleNameEn = '';
        } else {
          this.input()
        }
        this.checkMetamask();
      }
    }
    ,
    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.$nextTick(() => {
          this.utilsEvent.checkChainId().then(res => {
            if (!res) {
              // that.$message({
              //   message: 'Please switch to the correct network',
              //   type: 'warning'
              // });
              that.$message.warning('Please switch to the correct network');
              initContracts().provider.disconnect()
            } else {
              // S OTHER
              sessionStorage.setItem('address', accounts[0]);
              this.address = sessionStorage.getItem('address');
              sessionStorage.setItem('isConnect', true)
              this.focus = true;
              this.isConnect = sessionStorage.getItem('isConnect');
              this.claim();
              this.newRoleNameEn = '';
              // E OTHER
            }
          })
        })
      }).catch((res) => {
        console.log(res)
      });
      initContracts().provider.on("accountsChanged", (accounts) => {
        this.$nextTick(() => {
          this.utilsEvent.checkChainId().then(res => {
            // console.log(res)
            if (!res) {
              // that.$message({
              //   message: 'Please switch to the correct network',
              //   type: 'warning'
              // });

              that.$message.warning('Please switch to the correct network');
              initContracts().provider.disconnect()
            } else {
              // S OTHER
              sessionStorage.setItem('address', accounts[0]);
              that.address = sessionStorage.getItem('address');
              // E OTHER
            }
          })
        })
      });
      initContracts().provider.on("chainChanged", (chainId) => {
        this.$nextTick(() => {
          this.chainID = chainId
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            this.isConnect = true;
          } else {
            this.isConnect = false
          }
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
          initContracts().provider.disconnect()
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {
        this.$nextTick(() => {
          this.isConnect = false;
          this.address = '';
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
    }
    ,
    /**
     * function queryTokenID(string memory word) public view returns (uint256 tokenID)
     * @method queryTokenID
     * @return {String} word
     * @return {String} tokenID
     */
    async queryTokenID() {
      try {
        let tokenId = await initContracts().wordContract.methods.queryTokenID(this.newRoleNameEn).call();
        return tokenId
      } catch (err) {
        return 0;
      }
    }
    ,

    /**
     * function mint(string memory word) public payable
     * @method claim
     */
    async claim() {
      var that = this;
      if (!this.isClaim) {
        return
      }
      that.refuse = true;
      let trueChainId;

      trueChainId = await this.utilsEvent.checkChainId();
      if (!trueChainId) {
        if (this.utilsEvent.isMobile()) {
          that.$message.warning('Please switch to the correct network');
        }
        let changeID = await this.utilsEvent.changeChainId();
        return
      }

      // 1 GET metaMask Accounts
      let address = sessionStorage.getItem('address')
      if (address == null) {
        this.connetMetamask()
        return
      }
      // 2 GET word's Price
      let price = await initContracts().wordContract.methods.mintPrice().call();
      // console.log("price=>", price, address, typeof address == 'undefined');
      // 3 check metamask accounts
      if (typeof address != 'undefined') {
        // 4 try send contract
        try {
          that.result = false;
          await initContracts().wordContract.methods.mint(that.newRoleNameEn).send({
            from: address,
            value: price
          })
              .then(function (receipt) {
                // 5 Success
                // that.$message({
                //   message: 'success',
                //   type: 'success'
                // });

                that.$message.success('success');
                that.result = true;
                that.$refs['mark'].focus()
                that.refuse = false;
                that.newRoleNameEn = '';
              })
        } catch (err) {
          console.log(err)
          that.refuse = false;
          that.result = true;
          // that.$message({
          //   message: err.message,
          //   type: 'warning'
          // });
          that.$refs['mark'].focus()
          that.$message.warning(err.message);
        }
      } else {
        this.connetMetamask();
      }
    }
    ,
    /**
     * Monitor the screen width to determine whether the false cursor is displayed
     * @method checkWidth
     * @for none
     * @return {none} none
     */
    checkWidth() {
      if (document.body.clientWidth <= 560) {
        this.focus = true;
        // this.$refs['mark'].focus()
        // console.log(this.focus)
      } else {
        this.focus = false;
        this.$refs['mark'].focus()
      }
      // console.log(document.body.clientWidth)
    }
    ,
    /**
     * Enter word event
     * @method input
     * @for none
     * @return {none} none
     */
    input() {
      // sessionStorage.setItem('word', this.newRoleNameEn)
      this.queryTokenID().then((res) => {
        if (this.newRoleNameEn.length > 0 && res == 0) {
          this.isClaim = true;
        } else {
          this.isClaim = false;
        }
      });
    }
    ,
    inputs() {
      if (this.newRoleNameEn.length <= 18) {
        this.result = false;
      }
    }
    ,
    async checkMetamask() {

      var that = this;
      if (!window.ethereum) {
        return;
      }
      ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length == 0) {
          that.address = null;
          sessionStorage.removeItem('address')
        } else {
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
        }
      });
      ethereum.on("networkChanged", function (accounts) {

        // sessionStorage.setItem('isConnect', false)
        // if (sessionStorage.getItem('isConnect') == 'true') {
        //   that.isConnect = true;
        // } else {
        //   that.isConnect = false
        // }
        // sessionStorage.removeItem('isConnect')
        // sessionStorage.removeItem('address')
        // console.log('networkChanged')
      });
    }
    ,
    /**
     * Connet Metamask event
     * @method connetMetamask
     * @for none
     * @return {none} none
     */
    async connetMetamask() {
      var that = this;
      if (!window.ethereum) {
        if (this.utilsEvent.isMobile()) {
          this.wallet()
        } else {
          // this.$message({
          //   message: 'No blockchain wallet installed',
          //   type: 'warning'
          // });

          that.$message.warning('No blockchain wallet installed');
        }
        return;
      }
      let trueChainId = await this.utilsEvent.checkChainId();
      // console.log('trueChainId',trueChainId)
      if (!trueChainId) {
        // that.$message({
        //   message: 'Please switch to the correct network',
        //   type: 'warning'
        // });

        if (this.utilsEvent.isMobile()) {
          that.$message.warning('Please switch to the correct network');
        }
        let changeID = await this.utilsEvent.changeChainId();
        return
      }
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        sessionStorage.setItem('address', accounts[0]);
        this.address = sessionStorage.getItem('address');
        this.claim();
        sessionStorage.setItem('isConnect', true)
        this.isConnect = sessionStorage.getItem('isConnect');
      }).catch((reason) => {
        console.log('reason', reason)
        if (reason.code == -32002) {
          // this.$message({
          //   message: reason.message,
          //   type: 'warning'
          // });

          that.$message.warning(reason.message);

        }
      })
    }
    ,
    /**
     * Monitor the clicking event of line text box on the mobile terminal
     * @method inputClick
     * @for none
     * @return {none} none
     */
    inputClick() {
      this.focus = false;
      this.$refs['mark'].focus()
    },
    blurClick() {
      if (!this.utilsEvent.isMobile()) {
        if (this.newRoleNameEn.length == 0) {
          this.focus = false;
          this.$refs['mark'].focus()
        }
      }

    }
    ,

  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style>

input {
  border: 0;
  background: transparent;
  color: #ffffff;
  padding: 0;
  resize: none;
  font-size: 22px;
  line-height: 1;
  text-transform: lowercase;
}

@media screen and (max-width: 980px) {
  input {
    border: 0;
    line-height: 30px;
    height: 57px;
  }

  .el-loading-spinner .el-loading-text {
    font-size: 18px;
  }
}

[contenteditable="true"], input, textarea {
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -o-user-select: auto !important;
  user-select: auto !important;
}
</style>
