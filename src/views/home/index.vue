<template>
  <!--  connetMetamask-->
  <div class="container">

    <div class="content">
      <!--textarea-->
      <div class="inputsum" :class="!focus||sentence.length>0?'':'focus'">
        <textarea style="overflow:hidden" class="input"
                  @click="textAreaClick1()"
                  :style="{'color':'#'+(color.length<=2?'fff':color) }"
                  v-model="sentence"
                  @paste="handleFalse"
                  @cory="handleFalse"
                  @cut="handleFalse"
                  @input="input"
                  @keyup="keyup"
                  @focus="textfocus=true"
                  @blur="textfocus=false"
                  ref="sentence"
                  spellcheck="false"
                  id="em1">
        </textarea>
      </div>
      <div class="wrapper-flex-row button-total-container">
        <div class="color">
          #<input type="text"
                  @click="textAreaClick()"
                  maxlength="6"
                  class="text"
                  ref="color"
                  spellcheck="false"
                  @input="inputcolor"
                  @focus="textfocus=false"
                  v-model="color">
        </div>
        <div v-show="isConnect">
          <div :class="[isClaim?'iphone-button ':'iphone-button on',refuse?'refuse':'']" @click="ClaimClick"
               v-show="result&&sentence.length>0&&isClaim">Claim
          </div>
          <div :class="[isClaim?'iphone-button ':'iphone-button on',refuse?'refuse':'']"
               v-show="result&&sentence.length==0"
               style="opacity: 0">
            Claim
          </div>
          <div v-show="result&&sentence.length>0&&!isClaim" class="iphone-button claimed"
               :class="setcolor==false?'setcolor':''">
            <span v-show="setcolor==false">Incorrect color value</span>
            <span v-show="setcolor!=false">claimed</span>
          </div>
          <div v-show="!result&&sentence.length>0" class="iphone-button dian">
            <span class="ani_dot">...</span>
          </div>
        </div>
        <div class="iphone-button" @click="connetMetamask()" v-show="!isConnect&&sentence.length>0"
             style="font-size: 16px">
          Connect
        </div>
      </div>
      <div class="button on" v-if="sentence.length==0" style="opacity: 0;cursor: default;">
        <img src="@/assets/images/icon-green.svg" width="12"/>Claim
      </div>
      <div :class="isClaim?'button ':'button on'" style="cursor: default;"
           v-show="result&&sentence.length>0&&isClaim">
              <span @click="ClaimClick" style="cursor: pointer"><img src="@/assets/images/icon-green.svg"
                                                                     width="12"/>Claim</span>
      </div>
      <div v-if="result&&sentence.length>0&&!isClaim" style="cursor: default;" class="button claimed">
        <span v-if="setcolor==false">Incorrect color value</span>
        <span v-else>claimed</span>
      </div>
      <div v-show="!result&&sentence.length>0" class="wrapper-flex-row dian button" style="cursor: default;">
        <span class="ani_dot">...</span>
      </div>
    </div>
    <footer-Bar :changeClass="true" @change="updateReload($event)"></footer-Bar>
  </div>
</template>

<script>

import {debounce} from '../../utils/utils'
import {address, initContracts} from "../../utils/common";
import footerBar from '../../components/footerBar'
export default {
  components: {
    footerBar
  },
  data() {
    return {
      isConnect: sessionStorage.getItem('isConnect') || false,
      refuse: false,
      textfocus: true,
      result: true,
      spaceList: sessionStorage.getItem('spaceList') || [],
      focus: false,
      isClaim: false,//can Claim?
      sentence: '',
      color: 'ffffff',
      changeColor: false,
      old: '',
      olds: '',
      sentenceKong: '',
      arr: [],
      rang: 0,
      trimLen: 0,
      keyCode: null,
      inputBoolean: false,
      setTimeOut: null,
      setcolor: 'fff',
    }
  },
  computed: {},
  filters: {},
  watch: {
    network(e) {
    },
    address(e) {
    },
    sentence() {
    },
    result() {
    },
    color: function () {
      var that = this;
      this.color = this.color.replace(/[^A-Fa-f0-9]/g, '');
      let trim = this.proc(that.sentence.replace(/\t\n/g, ''))
      let em1 = document.getElementById('em1');
      trim = trim.replace(/\s+$/g, "")

      that.setcolor = this.colorRgb1('#' + this.color);
      if (trim.length > 0) {
        this.queryTokenID(trim).then((res) => {
          that.$nextTick(() => {
            that.result = true;
            if (that.sentence.length > 0 && res == 0 && that.setcolor != false) {
              that.isClaim = true;
            } else {
              that.isClaim = false;
            }
            // result&&sentence.length>0&&!isClaim
          })
        }).catch(() => {
          that.result = false;
        });
      } else {
        this.result = true;
      }
    }
  },

  created() {
    if (this.utilsEvent.isMobile()) {
      if (!window.ethereum && this.isConnect) {
        this.wallet()
      }
      if (!window.ethereum) {
        if (this.address != null) {
          this.isConnect = true;
        }
      } else {
        this.connetMetamask()
        this.isConnect = true;
        this.textfocus = false;
      }
    } else {
      this.isConnect = true;
      this.utilsEvent.checkFirstSite()
    }
    this.$watch('sentence', debounce((newQuery) => {
      var that = this;
      let trim = this.proc(that.sentence.replace(/\t\n/g, ''))
      let em1 = document.getElementById('em1');
      trim = trim.replace(/\s+$/g, "")
      if (trim.length > 319) {
        that.$nextTick(() => {
          that.sentence = that.olds.replace(/\s+$/g, "");
          that.rang = 319
        })
        return false;
      }
      if (em1.scrollHeight > 330) {
        this.$nextTick(() => {
          that.sentence = that.olds.replace(/\s+$/g, "");
        })
        return false;
      }
      if (trim.length > 0) {
        this.queryTokenID(trim).then((res) => {
          this.result = true;
          if (this.sentence.length > 0 && res == 0 && that.setcolor != false) {
            this.isClaim = true;
          } else {
            this.isClaim = false;
          }
          console.log(res)
        });
      } else {
        this.result = true;
      }
    }, 1000))
    this.$watch('inputBoolean', debounce((newQuery) => {
      var that = this;
      if (that.inputBoolean) {
        that.inputBoolean = false;
        let trim = this.proc(that.sentence.replace(/\t\n/g, ''))
        let em1 = document.getElementById('em1');
        trim = trim.replace(/\s+$/g, "")
        if (trim.length > 319) {
          this.$nextTick(() => {
            that.sentence = that.olds.replace(/\s+$/g, "");
            that.rang = 319
          })
          return false;
        }
        if (em1.scrollHeight > 330) {
          this.$nextTick(() => {
            that.sentence = that.olds.replace(/\s+$/g, "");
            // that.setLocation(em1, that.rang);
          })
          return false;
        }
        if (trim.length > 0) {
          this.queryTokenID(trim).then((res) => {
            this.result = true;
            if (this.sentence.length > 0 && res == 0 && that.setcolor != false) {
              this.isClaim = true;
            } else {
              this.isClaim = false;
            }
            console.log(res)
          });
        } else {
          this.result = true;
        }
      }
    }, 1000))
    this.$watch('sentence', debounce((newQuery) => {
      var that = this;
      let trim = this.proc(that.sentence.replace(/\t\n/g, ''))
      let em1 = document.getElementById('em1');
      trim = trim.replace(/\s+$/g, "")
      if (trim.length > 319) {
        this.$nextTick(() => {
          that.sentence = that.olds.replace(/\s+$/g, "");
        })
        return false;
      }
      if (em1.scrollHeight > 330) {
        this.$nextTick(() => {
          that.sentence = that.olds.replace(/\s+$/g, "");
          // that.setLocation(em1, that.rang);
        })
        return false;
      }
    }, 100))
  },
  mounted() {
    this.checkWidth();
    this.checkMetamask();

  },
  beforeRouteLeave(to, from, next) {
    next();
    clearInterval(this.timeOut)
    this.timeOut = null;
  },
  methods: {

    updateReload(e) {
      if (e && this.sentence == '') {
        this.sentence = '';
        this.color = 'ffffff';
        this.checkWidth();
        this.checkMetamask();
      }
    },
    /**
     * function queryTokenID(string memory word) public view returns (uint256 tokenID)
     * @method queryTokenID
     * @return {String} word
     * @return {String} tokenID
     */
    async queryTokenID(sentence) {
      try {
        let tokenId = await initContracts().sentenceContract.methods.queryTokenID(sentence).call();
        return tokenId
      } catch (err) {
        return 0;
      }
      // console.log("tokenId=>", tokenId)
    },
    /**
     * Monitor the clicking event of multi line text box on the mobile terminal
     * @method textAreaClick
     * @for none
     * @return {none} none
     */
    textAreaClick() {
      this.focus = false;
    },
    textAreaClick1() {
      this.focus = false;
      let em1 = document.getElementById('em1');
      this.setLocation(em1, this.sentence.length);
    },
    /**
     * Monitor the screen width to determine whether the false cursor is displayed
     * @method checkWidth
     * @for none
     * @return {none} none
     */
    checkWidth() {
      if (document.body.clientWidth <= 560) {
        this.focus = true;
        // console.log(this.focus)
      } else {
        this.$refs['sentence'].focus()
        this.focus = false;
      }
      // console.log(document.body.clientWidth)
    },
    /**
     * Monitor tReplace the newline of the string with a space
     * @method proc
     * @for none
     * @return {String} str
     */
    proc(str) {
      let ret = "";
      let count = 0;
      for (let i = 0; i < str.length; ++i) {
        if (str[i] == '\n') {
          // str = str.substring(0, str.length - 1);
          for (let j = 0; j < 29 - count; ++j) {
            ret += ' ';
          }
          count = 0;
          continue;
        }
        ret += str[i];
        count++;
        if (count >= 29) {
          count = 0;
        }
      }
      return ret;
    },
    /**
     * Monitor tReplace the newline of the string with a space
     * @method proc
     * @for none
     * @return {String} str
     */
    proc1(str) {
      let ret = "";
      let set = null;
      let count = 0;
      // console.log(JSON.stringify(str))
      for (let i = 0; i < str.length; ++i) {
        count++;
        if (str[i] == '\n' || str[i] == '\t') {
          // console.log(str[i] == '\n',"count")
          // ret += '\n'
          // console.log('have===>')
          count = 0;
          // continue;
        }
        if (count == 30) {
          // console.log(str[i],str[i]==' ')
          // console.log(str[i+1]==undefined)
          // this.spaceList.push(i)
          // set = new Set(this.spaceList)
          // this.spaceList = [...set]
          count = 1;
          ret += '\t\n';
          ret += str[i];
          continue;
          // break
          // return ret;
        }
        ret += str[i];
        // console.log(count,"count")
      }
      // console.log(JSON.stringify(ret))
      // console.log(count,ret,"count")
      return ret;
    },
    newsText(str) {
      let that = this;
      let newString = '';
      newString = str.replace(/\t\n/g, '');
      newString = newString.replace(/\t/g, '');
      // console.log(JSON.stringify(newString))
      let arr = newString.split('\n');
      let trim = that.proc(newString)
      trim = trim.replace(/\s+$/g, "");
      // console.log("arr", arr);
      that.arr = arr;
      arr.forEach(function (element, index) {
        let len = 29;
        try {
          len = arr[index + 1].length
        } catch (e) {
          len = -1
        }
        // console.log('index=>', index, element.length % 29, len)
        if (len == 0) {
          if (element.length > 1 && element.length % 29 == 0 && trim.length == 348) {
            // arr[index] = element + '\t'
            arr.splice(index + 1, 1);
          } else if (element.length > 1 && element.length % 29 == 0 && trim.length <= 319) {
            // console.log(JSON.stringify(arr[index]))
            // arr[index] = element + '\t';

            // arr.splice(index + 1, 1)
          }
        } else if (len == -1) {
          if (element.length != 0 && element.length % 29 == 0) {
            arr[index] = element;
          }
          arr.splice(index + 1, 1)
        } else {
          if (element.length != 0 && element.length % 29 == 0) {
            arr[index] = element + '\t\n' + arr[index + 1];
            arr.splice(index + 1, 1);
          }
        }

      });
      // console.log(JSON.stringify(arr.join('\n')))
      return arr.join('\n')
      // return newString
    },
    /**
     * Cancels the copy and paste behavior of multiline text boxes
     * @method handleFalse
     * @for none
     * @return {none} none
     */
    handleFalse(e) {
      e.preventDefault()
      return ""
    },
    /**
     * Enter color event
     * @method inputcolor
     * @for none
     * @return {none} none
     */
    inputcolor() {
    },
    /**
     * Enter sentence event
     * @method input
     1 * @for none
     * @return {none} none
     */
    async input() {
      // console.log('')
      // console.log('')
      // console.log('')
      // console.log('')
      this.result = false;
      var that = this;
      this.sentence = this.sentence.replace(/[^0-9A-Za-z :;<=`>?@!"#$%~&'({})_*+,./\/\^/\\/\-|\[|\ |\]|\n\t]/g, '');
      let em1 = document.getElementById('em1');
      that.rang = that.getLocation(em1);
      // that.rang = that.sentence.length;
      let newString = this.proc1(this.newsText(this.sentence.replace(/\t\n/g, '')))
      let trim = this.proc(newString)
      // 3 Remove the spaces at the end of the sentence
      trim = trim.replace(/\s+$/g, "")
      // console.log(JSON.stringify(that.sentence.replace(/\t/g,'')))
      // console.log(newString)
      // console.log(JSON.stringify(trim))
      // // 1 check textarea Height over 330
      let obj
      if (em1.scrollHeight > 330) {
        this.sentence = this.olds;
        this.inputBoolean = true;
        return false;
      } else {
        that.isClaim = false;
      }
      // 2 check user keyup
      let suo = false;
      let overOld = false
      if (that.old.length > that.sentence.length) {
        overOld = true
      }
      let number = this.proc((that.sentence.substring(0, this.rang)).replace(/\t\n/g, ''))
      number = number.replace(/\s+$/g, "");
      document.addEventListener("keyup", () => {
        that.keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        that.$nextTick(() => {
          if (overOld) {
            newString = that.proc1(this.newsText(this.sentence))
            trim = that.proc(newString)
            trim = trim.replace(/\s+$/g, "")
          }
          // console.log(trim.length)
          if (trim.length > 319) {
            if (that.eyCode == 13) {
              return
            }
          } else {
            if (that.keyCode == 13 || that.keyCode === 37 || that.keyCode === 38 || that.keyCode === 39 || that.keyCode === 39) {
              suo = true
              that.setLocation(em1, that.sentence.length);
            } else {
              suo = false;
            }
          }
        })
      })
      obj = {
        line: -1, number: 0, j: 0
      }
      that.olds = that.sentence;
      that.old = that.sentence
      that.sentence = that.proc1(newString.replace(/\t\n/g, ''));
      setTimeout(() => {
        that.getFor(obj)
        let line = Math.ceil((number.length - 1) / 29) <= 0 ? 0 : Math.ceil((number.length - 1) / 29) - 1;
        line = (line) * 2;
        let sub = this.sentence.substring(0, this.rang).replace(/\t\n/g, '');
        let deteleShowLans = that.proc(sub.replace(/\t/g, ''))
        if (suo != true) {
          if (that.sentenceKong.length > that.sentence.length) {
            if ((deteleShowLans.length) % 29 == 0 && deteleShowLans.length > 1) {
              if (that.sentence.substring(that.rang - 2, that.rang).indexOf('\t') == -1) {
                that.sentence = that.sentence.substring(0, that.rang - 1) + that.sentence.substring(that.rang, that.sentence.length);
              } else {
              }
            } else {
            }
          } else {
            if (that.arr[obj.j].length % 29 == 1 && that.arr[obj.j].length != 1 && that.sentence.substring(that.rang, that.sentence.length).length == 0) {
            } else if (deteleShowLans.length % 29 == 0 && deteleShowLans.length > 0 && that.sentence.substring(that.rang, that.sentence.length).length == 0) {
            } else {
              if (number.length % 29 == 0 && number.length != 0 && that.arr[obj.j].length < sub.length && that.sentence.substring(that.rang, that.sentence.length).length == 0) {
              } else if (number.length % 29 == 1) {
              } else {
              }
            }
          }
        }
        that.sentenceKong = that.sentence;
      }, 1);
      return;
    },
    keyup() {

    }
    ,
    getFor(obj) {
      var that = this;
      for (var i = 0; i < that.arr.length; i++) {
        obj.number += that.arr[i].length + i;
        obj.line += Math.ceil(that.arr[i].length / 29);
        if (obj.number + obj.line >= that.rang) {
          obj.j = i
          return obj;
        }
      }
      obj.j = that.arr.length - 1;
      return obj;
    }
    ,
    /**
     * Click claim event
     * @method ClaimClick
     * @for none
     * @return {none} none
     */
    async ClaimClick() {
      var that = this;
      if (!this.isClaim) {
        return
      }
      let trueChainId = await this.utilsEvent.checkChainId();
      // console.log('trueChainId',trueChainId)
      if (!trueChainId) {
        if (this.utilsEvent.isMobile()) {
          that.$message.warning('Please switch to the correct network');
        }
        let changeID =await this.utilsEvent.changeChainId();
        console.log('changeID',changeID)
        if(!changeID){
          return
        }
      }
      // 1 GET metaMask Accounts
      let address = sessionStorage.getItem('address')
      if (address == null) {
        this.connetMetamask()
        return false
      }
      //2 Format sentence
      let trim = this.proc(that.sentence.replace(/\t\n/g, ''))
      // 3 Remove the spaces at the end of the sentence
      trim = trim.replace(/\s+$/g, "")
      // return
      // 4 GET word's Price
      let price = await initContracts().sentenceContract.methods.queryPrice(trim).call()
      // 4 Format color
      let color = this.colorRgb('#' + this.color)
      if (color == '0xffffff') {
        that.$nextTick(() => {
          that.color = "ffffff";
        })
      }
      let url;
      // 5 send
      if (typeof address != 'undefined') {
        that.refuse = true
        that.result = false;
        try {
          await initContracts().sentenceContract.methods.mint(trim, color).send({
            from: address,
            value: price
          }).then(function (receipt) {
            that.result = true;
            that.$refs['sentence'].focus()
            console.log("receipt=>", receipt)
            // 6 Success
            // that.$message({
            //   message: 'success',
            //   type: 'success'
            // });

            that.$message.success('success');
            that.sentence = ''
            that.refuse = false;
          });
        } catch (err) {
          that.result = true;
          that.$refs['sentence'].focus()
          console.log("err=>", err)
          // that.$message({
          //   message: err.message,
          //   type: 'warning'
          // });

          that.$message.warning(err.message);
          that.refuse = false;
        }
      } else {
        this.connetMetamask();
      }
    }
    ,
    /**
     * @method getLocation
     * @for none
     */
    getLocation(elm) {
      // console.log(elm)
      if (elm.createTextRange) { // IE
        var range = document.selection.createRange();
        range.setEndPoint('StartToStart', elm.createTextRange());
        return range.text.length;
      } else if (typeof elm.selectionStart == 'number') { // Firefox
        return elm.selectionStart;
      }
    }
    ,
    /**
     * @method getLocation
     * @for none
     */
    setLocation(elm, n) {
      if (n > elm.value.length)
        n = elm.value.length;
      if (elm.setSelectionRange) { // Firefox
        elm.setSelectionRange(n, n);
        elm.focus();
      }
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
        let changeID =await this.utilsEvent.changeChainId();
        // console.log('changeID',changeID)
        if(!changeID){
          return
        }
      }
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        sessionStorage.setItem('address', accounts[0]);
        that.address = sessionStorage.getItem('address');
        that.ClaimClick();
      }).catch((reason) => {
        // console.log('', reason)
        if (reason.code == -32002) {
          // that.$message({
          //   message: reason.message,
          //   type: 'warning'
          // });
          that.$message.warning(reason.message);
        }
      })
    },

    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.$nextTick(() => {
          this.utilsEvent.checkChainId().then(res => {
            console.log(res)
            if (!res) {
              // that.$message({
              //   message: 'Please switch to the correct network',
              //   type: 'warning'
              // });
              // that.$message.warning('Please switch to the correct network');
              initContracts().provider.disconnect()
            } else {
              // S OTHER
              // console.log("provider.enable()", accounts)
              sessionStorage.setItem('address', accounts[0]);
              that.address = sessionStorage.getItem('address');
              sessionStorage.setItem('isConnect', true)
              this.isConnect = sessionStorage.getItem('isConnect');
              this.textfocus = true;
              that.ClaimClick();
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
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
          initContracts().provider.disconnect()
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {
        this.$nextTick(() => {
          console.log(code, reason);
          this.address = '';
          this.isConnect = false;
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        })
      });
    },
    checkMetamask() {

      var that = this;
      if (!window.ethereum) {
        return;
      }
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
      ethereum.on("accountsChanged", function (accounts) {
        if(accounts.length==0){
          that.address =null ;
          that.isConnect = false
          sessionStorage.removeItem('isConnect')
          sessionStorage.removeItem('address')
        }else {
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
        }
      });
      ethereum.on('disconnect', (error) => {
        that.address =null ;
        that.isConnect = false
        sessionStorage.setItem('isConnect', false)
        sessionStorage.removeItem('isConnect')
        sessionStorage.removeItem('address')
      });
    }
    ,
    colorRgb(sColor) {
      sColor = sColor.toLowerCase();
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(sColor.slice(i, i + 2));
        }
        return "0x" + sColorChange.join("")
      }
      return '0xffffff';
    }
    ,
    colorRgb1(sColor) {
      sColor = sColor.toLowerCase();
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(sColor.slice(i, i + 2));
        }
        return "0x" + sColorChange.join("")
      }
      return false;
    },
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style>
.el-textarea__inner, .el-input__inner {
  border: 0;
  background: transparent;
  color: #ffffff;
  padding: 0;
  resize: none;
}

textarea {
  height: 330px;
  resize: none;
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
