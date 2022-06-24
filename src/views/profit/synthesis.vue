<template>
  <!--  connetMetamask-->
  <div class="body" ref="main">
    <div class="container" ref="content">
      <div class="connect connect-wallet" @click="connetMetamask()" v-if="!isConnect">
        <img src="@/assets/images/icon-green.svg" width="12"/>Connect Wallet
      </div>
      <!--textarea-nav-->
      <div class="content" v-if="isConnect" >
        <header-Bar></header-Bar>
      </div>
      <div v-if="isConnect" class="synthesis-container">
        <div class="content">
          <div class="tips">Synthesize your NFT & sentence</div>
          <div class="arrow-sum">
            <div class="arrow">
              <span>></span>
              <span>></span>
            </div>
            <div class="arrow arrow1">
              <span>></span>
              <span>></span>
            </div>
          </div>
          <!-- processCount:0-->
          <div class="first-synthesis">
            <div v-if="otherNft!=null" class="have-nft">
              <div class="items1  pop-loading-picture pop-loading-picture1">
                <i class="el-icon-picture icons"></i>
                <img :src="otherNft.image" width="100%" style="cursor: pointer"
                     @click="firstItem=1;PopShowNFTList=true;ethInput='';number=0;list='';$refs.otherAddress.focus()"
                />

                <div class="wrapper-flex-row">
                  <div class="name"> {{ otherNft != undefined ? otherNft.name : '' }}</div>
                  <div class="tokenID">
                    {{ otherNft != undefined ? 'TokenID: ' + otherNft.tokenID : '' }}
                  </div>
                </div>
              </div>
              <a class="close" @click="closeOtherNft()">
                <img src="@/assets/images/icon-close.svg" width="100%"/>
              </a>
            </div>
            <div v-if="otherNft==null"
                 @click="list='';number=0;firstItem = 1;PopShowNFTList=true;ethInput ='';needTokenId='';$refs.otherAddress.focus()">
              <a class="other-nft" :class="touchinData==0?'on':''" style="background: #1b2328;border-color: #0d0f10">
                <span class="icon"></span>
              </a>
            </div>
            <div v-if="sentenceNft!=null" class="have-nft" style="min-height: auto;">
              <p v-html="sentenceNft.image" @click="firstItem=1;PopShowNFTList=false;"></p>
              <a class="close" @click="sentenceNft=null">
                <img src="@/assets/images/icon-close.svg" width="100%"/>
              </a>
            </div>
            <div v-if="sentenceNft==null" @click="showSentenceList();">
              <a class="sentence-nft" :class="touchinData==1?'on':''" style="background: #141b1f;border-color: #0d0f10">
                <span class="icon"></span>
              </a>
            </div>
          </div>
          <!--button-->
          <div v-if="otherNft&&sentenceNft">
            <div v-if="!isApprovedSentence||!isApprovedOther"
                 :class="[!isApprovedSentence||!isApprovedOther?'':'on','connect']" @click="approved()">
             <span>
                <img src="@/assets/images/icon-green.svg" width="12"/>Approved
              </span>
            </div>
            <div v-if="isApprovedOther&&isApprovedSentence"
                 :class="[isApprovedOther&&isApprovedSentence?'':'on','connect']" @click="previewNft">
             <span>
                <img src="@/assets/images/icon-green.svg" width="12"/>Synthesize and get {{ reward }} TEXT
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer-Bar></footer-Bar>
    </div>
    <!--S pop-container:other NFT-->
    <div class="pop-container" :class="PopShowNFTList&&firstItem==1?'':'none-show'">
      <div class="bg"
           @click="firstItem=0;isNotNft=0;ethInput='';number=-1;needTokenId=false;tokenID='';is721=true;"></div>
      <div class="content1">
        <div class="tips wrapper-flex-row">
          <span>Add your NFT</span>
          <a class="icon-close"
             @click="firstItem=0;isNotNft=0;ethInput='';number=-1;is721=true;needTokenId=false;tokenID='';">
            <img src="@/assets/images/icon-close.svg" width="100%"/>
          </a>
        </div>
        <input type="text" v-model="ethInput" ref="otherAddress" id='otherAddress' class="text" spellcheck="false"
               @paste="addNft"
               placeholder="Enter your NFT contract address"/>
        <div class="waring">
          <p v-if="ethInput&&!isAddress&&is721&&number==-1" class="error">Incorrect contract address</p>
          <p v-if="isAddress&&list.length==0&&number==-1&&!needTokenId&&is721" class="info">Loading contract<span
              class="ani_dot">...</span>
          </p>
          <p v-if="isAddress&&list.length>=0&&number>=0&&is721" class="info">You own {{ number }} {{ number<=1?'NFT':'NFTs' }} of this
            contract</p>
          <p v-if="!is721" class="info">Not an ERC-721 contract</p>
        </div>
        <div class="need-token-id" :class="needTokenId&&number>0?'needTokenId':''">
          <div class="desc">
            <!-- Your NFT Token ID:-->
          </div>
          <div class="wrapper-flex-row">
            <input type="text" placeholder="NFT's token ID" spellcheck="false" ref="tokenID" id='tokenID'
                   v-model="tokenID"/>
            <div :class="[tokenID.length>0?'on button':'button']" @click="searchToken">
              {{ isClick ? 'Refresh' : 'Enter' }}
            </div>
          </div>
        </div>
        <p v-if="isNotNft==0&&needTokenId&&number>0&&isClick" class="isNotNft">
          Loading NFT<span class="ani_dot">...</span><br/>
          the process may take a long time, please wait patiently or refresh several times
          <!--          The contract needs to fill in the NFT's token ID to locate-->
        </p>
        <p v-if="isNotNft==1&&needTokenId&&number>0" class="isNotNft error">You don't own this NFT</p>
        <p v-if="isNotNft==2&&needTokenId&&number>0" class="isNotNft error">Incorrect Token ID</p>
        <div v-if="!needTokenId">
          <div :class="['show-other-list',show?'on':'']" v-if="number>0">
            <a v-for="index in Number(number)" :key="index" class="items1 " @click="selectedNft(list[index-1],index-1)"
               style="background: #1b2328">
              <div class="item pop-loading-picture">
                <i class="el-icon-picture icons"></i>
                <img :src="list[index-1]==undefined?'':list[index-1].image" width="100%"/>
                <div class="wrapper-flex-row">
                  <div class="name">{{ list[index - 1] != undefined ? list[index - 1].name : '' }}</div>
                  <div class="tokenID">{{ list[index - 1] != undefined ? 'TokenID: ' + list[index - 1].tokenID : '' }}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div v-if="ethInput==''&&number<=0&&PopShowNFTList&&firstItem==1" class="show-other-list">
            <ul class="white-list">
              <li class="wrapper-flex-row" v-for="(item,index) in whitePageList" :key="index"
                  @click="ethInput=item.contract">
                <divn class="name ones">
                  {{ item.name }}
                </divn>
                <divn class="reward">
                  Reward {{ item.level }} TEXT
                </divn>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div :class="['show-other-list needTokedShowNft',show?'on':'']" v-if="number>0&&needTokedShowNft">
            <a v-for="index in Number(number)" :key="index" class="items1 " @click="selectedNft(list[index-1],index-1)"
               style="background: #1b2328">
              <div class="item pop-loading-picture">
                <i class="el-icon-picture icons"></i>
                <img :src="list[index-1]==undefined?'':list[index-1].image" width="100%"/>
                <div class="wrapper-flex-row">
                  <div class="name">{{ list[index - 1] != undefined ? list[index - 1].name : '' }}</div>
                  <div class="tokenID">{{ list[index - 1] != undefined ? 'TokenID: ' + list[index - 1].tokenID : '' }}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div v-if="ethInput==''&&number<=0&&!needTokedShowNft" class="show-other-list">
            <ul class="white-list">
              <li class="wrapper-flex-row" v-for="(item,index) in whitePageList" :key="index"
                  @click="ethInput=item.contract">
                <divn class="name ones">
                  {{ item.name }}
                </divn>
                <divn class="reward">
                  Reward {{ item.level }} TEXT
                </divn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="pop-container" v-show="!PopShowNFTList&&firstItem==1">
      <div class="bg"
           @click="firstItem=0;isNotNft=0;ethInput='';number=-1;is721=true;needTokenId=false;tokenID=''"></div>
      <div class="content1">
        <div class="tips wrapper-flex-row">
          <span>Add your SENTENCE</span>
          <a class="icon-close" @click="firstItem=0;">
            <img src="@/assets/images/icon-close.svg" width="100%"/>
          </a>
        </div>
        <div class=" waring waring1">
          <p v-if="sentenceList.length==0&&result!=0" class="info">Loading contract<span class="ani_dot">...</span></p>
          <p v-else class="info">You own {{ sentenceList.length }} {{ sentenceList.length<=1?'NFT':'NFTs' }} of this contract</p>
        </div>
        <div :class="['show-other-list show-other-list11',show?'on':'']">
          <a v-for="(item,index) in sentenceList" :index="index" class="item" @click="selectedNft(item,index)">
            <img :src=item.imageUrl width="100%" class="sen-pic"/>
          </a>
        </div>
      </div>
    </div>
    <!--E pop-container:other NFT-->
    <!--pop-container-->
    <div class="pop-container pop-none-iphone" v-if="PopShow">
      <div class="bg" @click="PopShow=false;"></div>
      <div class="content">
        <img :src="previewImgUrl" class="prev-img" @click="bigShow=true"/>
      </div>
    </div>
    <div class="pop-container pop-none-iphone" v-if="bigShow">
      <div class="bg" style="background: transparent;z-index: 2200;cursor: pointer" @click="bigShow=false;"></div>
      <div class="content content2" style="cursor: default">
        <img :src="previewImgUrl" width="100%s"/>
      </div>
    </div>
  </div>
</template>

<script>

let FONT_DATA = "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";

async function generalImage(sentence, sentenceColor, creator) {
  let line = Math.floor(sentence.length / 29);
  if (sentence.length % 29 > 0) {
    ++line;
  }
  let r = sentenceColor >> 16 & 0xff;
  let g = sentenceColor >> 8 & 0xff;
  let b = sentenceColor & 0xff;
  let height = (line - 1) * 30 + 40 + 40; 
  let width = 360;
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMiDYMid meet" viewBox="0 0,360,' + height + '">';
  svg += '<style>@font-face {font-family: "Unifont";font-style: normal;font-weight: normal;src: url(data:font/woff;base64,';
  svg += FONT_DATA;
  svg += ') format("woff");}</style><style>.base{fill:';
  svg += 'rgb(' + r + ',' + g + ',' + b + ');';
  svg += 'font-family:Unifont;white-space:pre;font-size:22px;text-anchor:start}</style>'
  svg += '<style>.creator{fill:rgb(255,255,255);font-family:Unifont;font-size:12px;text-anchor:start}</style>';
  svg += '<rect width="100%" height="100%" fill="black" />';
  let startY = 45;
  let i = 0;
  for (; i < line; ++i) {
    let start = i * 29;
    let end = start + 29;
    if (end > sentence.length) {
      end = sentence.length;
    }
    svg += '<text x="20" y="' + (startY + i * 30) + '" class="base"><![CDATA[' + sentence.substring(start, end) + ']]></text>'
  }
  svg += '</svg>';

  return svg;
}

import BigNumber from "bignumber.js";
import {Message} from 'element-ui';
import headerBar from './components/headerBar'
import footerBar from '../../components/footerBar'
import {address, initContracts} from "../../utils/common";
import whiteList from '../../utils/Whitelist.json'
import axios from "axios";
import Web3 from 'web3'

export default {
  components: {
    headerBar,
    footerBar
  },
  data() {
    return {
      isClick: false,
      is721: true,
      whitePageList: [],
      number: -1,
      reward: '--',
      touchinData: -1,
      Loop: 0,
      Loop1: 0,
      bigShow: false,
      tokenID: '',
      needTokenId: false, //need Token ID
      PopShowNFTList: true,
      tips: '111',
      PopShow: false,//pop
      isApprovedSentence: false,
      isApprovedOther: false,
      mousemoveData: true,
      showList: [],//show NFT list
      show: false,//is display word List
      list: [],//input give NFT LIST
      getDataList: false,
      sentenceList: [],//Our NFT LIST
      otherNft: null,
      sentenceNft: null,
      processCount: 0,//0: Display after login;1: Select the NFT ;2: After the selected NFT;
      firstItem: 0,//firstItem getItem
      isAddress: false,// is accout address
      ethInput: '',
      lastInput: '',
      previewImgUrl: null,
      address: null || sessionStorage.getItem('address'),
      isConnect: sessionStorage.getItem('isConnect') || false,
      buttonText: 'claim',
      result: null,
      isNotNft: 0,
      needTokedShowNft: true,

    }
  },
  computed: {},
  watch: {
    PopShowNFTList() {
      console.log('change List', this.PopShowNFTList)
    },
    network(e) {
    },
    address(e) {
    },
    needTokenId() {
    },
    ethInput(n, o) {
      this.ethInput = this.ethInput.replace(/[\u4e00-\u9fa5/\s+/]|[^a-zA-Z0-9\u4E00-\u9FA5]/g, "")
      const reg = /^0x[0-9a-fA-F]{40}$/;
      if (reg.test(n)) {
        // console.log('doing check')
        this.buttonText = 'true';
        this.isAddress = true;
      } else {
        this.buttonText = 'false'
        this.isAddress = false;
      }
      this.list = '';
      this.is721 = true;
      this.number = 0;
      this.firstItem = 1;
      this.isNotNft = 0;
      this.number = -1;
      this.needTokenId = false;
      this.tokenID = ''
    },
    tokenID(n, o) {
      this.needTokedShowNft = false
      this.tokenID = this.tokenID.replace(/[^\d]/g, "");//Limit the input box to only numbers and dots
      this.list = [];
      this.isNotNft = 0;
      this.isClick = false;
    },
    isAddress(n, o) {
      if (n) {
        this.addNft()
      } else {
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
    // console.log(whiteList)
    this.whitePageList = whiteList.list
    // this.event()
  },
  mounted() {
    if (this.utilsEvent.isMobile()) {
      if (!window.ethereum) {
      } else {
        this.connetMetamask()
      }
    } else {
      // this.connetMetamask();
    }
    // console.error(this.address)
    if (this.address != null) {
      console.log(this.address)
      this.isConnect = true;
    }
    this.checkMetamask();
  },
  methods: {
    touchin(index) { 
      let that = this;
      this.$nextTick(() => {
        that.touchinData = index;
      })
      this.Loop = setTimeout(function () {
        that.Loop = 0;
      }, 500);
      return false;
    },
    // Restrict input fields to only numbers and points to simulate click events (quickly lift after click)
    clickhandle(index) { 
      let that = this;
      clearTimeout(this.Loop);
      if (that.Loop !== 0) {
        that.touchinData = -1;
        if (index == 0) {
          that.changeFirst()
        } else {
          that.showSentenceList();
        }
      } else {
        // that.touchinData = -1;
      }
      return false;
    },
    // Hold down the event and wait for the specified event to trigger
    touchin1(index) { 
      let that = this;
      this.Loop1 = setTimeout(function () {
        that.Loop1 = 0;
      }, 500);
      return false;
    },
    // Restrict input fields to only numbers and points to simulate click events (quickly lift after click)
    clickhandle1(index) { 
      let that = this;
      clearTimeout(this.Loop);
      if (that.Loop1 !== 0) {
        if (index == 0) {
          that.firstItem = 1;
          that.PopShowNFTList = true;
          that.ethInput = that.lastInput
        } else {
          that.firstItem = 1;
          that.PopShowNFTList = false;
        }
      } else {

      }
      return false;
    },
    ReplaceIPFS(url) {
      console.error(url)
      if (url.indexOf("ipfs") != -1 && url.indexOf("http") == -1) {
        url = "https://textarea.infura-ipfs.io/ipfs/" + url.split("//")[1];
      }
      if (url.indexOf("https://ikzttp.mypinata.cloud/ipfs/") != -1) {
        url = "https://textarea.infura-ipfs.io/ipfs/" + url.split("cloud/ipfs/")[1];
      }
      return url;
    },
    async searchToken() {
      var that = this;
      try {
        console.log('ether')
        this.isClick = true;
        this.list = [];
        let tokenID = Number(that.tokenID);
        let isUserToken = await initContracts(that.ethInput).getOtherContracts.methods.ownerOf(tokenID).call();
        // console.log('isUserToken', that.address.toUpperCase(), isUserToken.toUpperCase())
        if (that.address.toUpperCase() == isUserToken.toUpperCase()) {
          let url = await initContracts(that.ethInput).getOtherContracts.methods.tokenURI(tokenID).call();
          // console.log('url', url)
          try {
            await axios.get(that.ReplaceIPFS(url)).then(res => {
              that.needTokedShowNft = true;
              console.warn('image=>', res.data.image)
              that.list.push({
                tokenID: tokenID,
                image: that.ReplaceIPFS(res.data.image),
                name: res.data.name
              });
              // console.warn('that.ReplaceIPFS(res.data.image)', that.ReplaceIPFS(res.data.image))
            })
          } catch (e) {
            // console.log(e)
            if (String(e).indexOf("Network Error") != -1) {
              that.reqUrl(url)
            }
          }
        } else {
          this.isNotNft = 1;
        }
      } catch (e) {
        console.log(e)
        this.isNotNft = 2;
      }
    },
    closeOtherNft() {
      this.ethInput = '';
      this.sentenceList = [];
      this.otherNft = null;
      this.isApprovedOther = false;
      this.needTokenId = false;
    },
    async selectedNft(item, index) {
      var that = this;
      // console.log(item)
      this.$nextTick(() => {
        if (!that.PopShowNFTList) {
          that.sentenceNft = item;
          let url
          generalImage(this.sentenceNft.sentence, this.sentenceNft.color, this.address).then(res => {
            url = res;
            this.$set(this.sentenceNft, "image", url);
          });
          that.checkApprovedSentence();
        } else {
          that.otherNft = item;
          that.checkApprovedOther()
        }
        that.firstItem = 0;
        if (that.sentenceNft && that.otherNft) {
          window.scrollTo(0, 100000);
          that.getPrice();
        }
      })
    },
    async getPrice() {
      var that = this;
      let mergeInfos = await initContracts().mergeContract.methods.mergeInfos(that.lastInput).call();
      if (mergeInfos.reward <= 0) {
        that.reward = await initContracts().mergeContract.methods.minRewards().call();
        that.reward = Number(new BigNumber(that.reward).div(1e18).toFixed(0))
      } else {
        that.reward = mergeInfos.reward;
        that.reward = Number(new BigNumber(that.reward).div(1e18).toFixed(0))
      }

    },
    showSentenceList() {
      var that = this;
      that.$nextTick(() => {
        that.show = true;
        that.firstItem = 1;
        that.showList = [];
        that.sentenceList = [];
        that.sentenceNft = null;
        that.ethInput = "";
        that.PopShowNFTList = false;
        console.log(that.PopShowNFTList)
      })
      try {
        axios.get(`https://api.textarea.xyz/wordtest/common/queryData?address=${this.address}`).then(res => {
          console.log(res)
          if (res.status == 200) {
            that.sentenceList = [];
            that.sentenceNft = null;
            let sentencesToken = null;
            console.log(res.data)
            sentencesToken = Object.values(res.data.data.sentences); //The Array to JSON
            let sentences = Object.values(res.data.sentence); //The Array to JSON
            if (sentencesToken.length == 0) {
              that.sentenceList = [];
              that.result = 0;
            } else {
              sentencesToken.filter(tokenID => {
                sentences.filter(sentencesItem => {
                  if (sentencesItem.tokenID == tokenID) {
                    that.sentenceList.push(sentencesItem)
                  }
                });
              });
            }
            // console.log("sentenceList=>",that.sentenceList.length)
            this.processCount = 1;

            // this.showList = this.sentenceList;
            this.$forceUpdate();
            // console.log(this.sentenceList, "this.sentenceList")
          }
          // loading.close();
        })
      } catch (e) {
        console.log(e.message)
        // loading.close();
      }
    },
    async reqUrl(url) {
      var that = this;
      try {
        var link = that.ReplaceIPFS(url)

        await axios.get(that.ReplaceIPFS('https://api.textarea.xyz/wordtest/proxy?' + link)
        ).then(res => {
          console.log(res, "reqUrl res")
          if (res.status == 200) {
            that.needTokedShowNft = true;
            let tokenID =
                that.list.push({
                  tokenID: Number(that.tokenID),
                  image: that.ReplaceIPFS(res.data.image),
                  name: res.data.name
                });
            that.number = 1;
            // console.warn('image=>', res.data.image)
            // console.warn('that.ReplaceIPFS(res.data.image)', that.ReplaceIPFS(res.data.image))
          }
          //   // that.needTokedShowNft = true;
          //   // // if()
        }).catch(e => {
          // A cross-domain PROx error occurred
          // console.log(e, "A cross-domain PROx error occurred")
          let xhr;
          try {
            xhr = new XMLHttpRequest();
          } catch (error) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
          }
          xhr.open('GET', that.ReplaceIPFS('https://api.textarea.xyz/wordtest/proxy?' + url), true);
          xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          xhr.send(null);
          xhr.onreadystatechange = function (res) {
            // console.log(link, "1 link")
            // console.log(xhr.responseURL, "2 link");
            // console.log(xhr.response, "3 JSON.parse(xhr.response)")
            if (xhr.response == '') {
            } else {
              // console.info(res, "success")
            }
          }
        })
      } catch (e) {
        console.log(e.response, "response")
      }
    },
    /**
     * Preview NFT
     * @method previewNft
     * @for none
     */
    previewNft() {
      var that = this;
      try {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.9)'
        });
        // console.log(
        //     that.ethInput, that.otherNft.tokenID, that.sentenceNft.tokenID
        // )

        axios.get(`https://api.textarea.xyz/wordtest/common/getMergePreview?creator=${this.address}&sentenceTokenID=${that.sentenceNft.tokenID}&otherAddress=${that.lastInput}&otherTokenID=${that.otherNft.tokenID}`).then(res => {
          // console.log(res)
          if (res.status == 200) {
            this.previewImgUrl = res.data.url;
            this.PopShow = true;
            this.synthesis()
          }

        }).catch(err => {
          // console.log(err)
          loading.close()
        })
      } catch (err) {
        // console.log(err)
      }
    },
    /**
     * add Input NFT
     * @method addNft
     * @for none
     */
    async addNft() {
      var that = this;
      this.show = false;
      const reg = /^0x[0-9a-fA-F]{40}$/;
      // console.log(reg.test(this.ethInput))
      if (!reg.test(this.ethInput)) {
        return
      } else {
        that.showList = [];
        that.list = [];
        that.number = -1;
        that.otherNft = null;
        try {
          // console.log('enter Check')
          let isSupErc165 = await initContracts(that.ethInput).getOtherContracts.methods.supportsInterface('0x01ffc9a7').call();
          let isSupErc721 = await initContracts(that.ethInput).getOtherContracts.methods.supportsInterface('0x80ac58cd').call() || await initContracts(that.ethInput).getOtherContracts.methods.supportsInterface('0x6466353c').call();
          let isSupErc721Metadata = await initContracts(that.ethInput).getOtherContracts.methods.supportsInterface('0x5b5e139f').call();
          let isSuperErc721Enum = await initContracts(that.ethInput).getOtherContracts.methods.supportsInterface('0x780e9d63').call();
          let item = {
            tokenID: null,
            image: null,
            name: null,
          }
          // console.log('isSupErc165=>', isSupErc165)
          // console.log('isSupErc721=>', isSupErc721)
          // console.log('isSupErc721Metadata=>', isSupErc721Metadata)
          // console.log('isSuperErc721Enum=>', isSuperErc721Enum)
          if (isSupErc165) {
            if (!isSupErc721) {
              that.is721 = false
            }
            if (!isSupErc721 || !isSupErc721Metadata) {
              // console.log('This is not NFT!')
              // loading.close();
              that.is721 = false;
              that.buttonText = 'false';
              that.isAddress = false;
              return;
            }
            if (!isSuperErc721Enum) {
              this.$nextTick(() => {
                that.needTokenId = true;
                that.$refs.tokenID.focus();
                that.needTokedShowNft = false;
                if (that.tokenID.length > 0) {
                  that.searchToken()
                }
                return;
              })
            }
          } else {
            that.is721 = false
          }
          // console.log('Enter the contract', isSupErc165, isSupErc721, isSupErc721Metadata, isSuperErc721Enum)
          let balanceOf = await initContracts(that.ethInput).getOtherContracts.methods.balanceOf(that.address).call();
          that.lastInput = that.ethInput;
          let tokenID, url;
          // console.log('Enter the contract of balanceOf', balanceOf);
          if (balanceOf == 0) {
            this.processCount = 1;
            // console.log('this.list', this.list);
            this.number = balanceOf;
            return
          }
          this.number = balanceOf;
          // console.log('Enter the contract of number', this.number);
          this.getDataList = true;
          for (let i = 0; i < balanceOf; ++i) {
            {
              tokenID = await initContracts(that.ethInput).getOtherContracts.methods.tokenOfOwnerByIndex(that.address, i).call();
              console.log(tokenID, item.tokenID, "item.tokenID", i)
              url = await initContracts(that.ethInput).getOtherContracts.methods.tokenURI(tokenID).call();
              this.getDataList = true;
              // console.log(url, "url")
              await axios.get(that.ReplaceIPFS(url)).then(res => {
                // console.log(res.data.image, "res.data.image")
                this.list.push({
                  tokenID: tokenID,
                  image: that.ReplaceIPFS(res.data.image),
                  name: res.data.name
                });
              })
            }

            // this.showList = this.list;
            this.processCount = 1;
          }
          // loading.close();

        } catch (e) {
          console.log(e)
          // loading.close();
          this.buttonText = 'false'
        }
      }
    },
    /**
     * synthesis
     * @method synthesis
     * @for none
     */
    async synthesis() {
      var that = this;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      });
      let obj = await initContracts();
      try {
        await obj.mergeContract.methods.bind(that.lastInput, that.otherNft.tokenID, that.sentenceNft.tokenID).send({
          from: that.address
        }).then(function (receipt) {
          loading.close();
          sessionStorage.setItem('firstItem', 0);
          that.ethInput = '';
          that.isAddress = false;
          that.$set(that, 'firstItem', Number(sessionStorage.getItem('firstItem')));
          that.processCount = 0;
          that.PopShow = false;
          that.otherNft = null;
          that.sentenceNft = null;
          that.lastInput = '';
          that.list = [];
          that.number = -1;
          that.showList = [];
          that.sentenceList = [];

          if (that.utilsEvent.isMobile()) {
            that.$message({
              message: 'Synthesis succeeded!',
              type: 'success'
            });
          }
        })

      } catch (err) {
        that.PopShow = false;
        that.$message({
          message: err.message,
          type: 'warning'
        });
        loading.close();
      }
    },
    /**
     * check Approve Sentence NFT
     * @method checkApprovedSentence
     * @for none
     * @return isApprovedSentence
     */
    async checkApprovedSentence() {
      var that = this;
      let obj = await initContracts();
      try {
        that.isApprovedSentence = await obj.sentenceContract.methods.isApprovedForAll(that.address, obj.address.merge).call()
        console.log('checkApprovedSentence=>', that.isApprovedSentence)

      } catch (err) {
        console.log('checkApprovedSentence=>', false)
        // console.log(err)
        this.isApprovedSentence = false;
      }

    },
    /**
     * check Approved Other NFT
     * @method checkApprovedOther
     * @for none
     * @return isApprovedOther
     */
    async checkApprovedOther() {
      var that = this;
      let obj = await initContracts();
      try {
        let getApproved = await initContracts(that.lastInput).getOtherContracts.methods.getApproved(that.otherNft.tokenID).call();
        console.log(that.otherNft.tokenID, that.lastInput);
        console.log(getApproved);
        console.log(obj.address.merge)
        if (obj.address.merge != getApproved) {
          console.log('checkApprovedOther=>', false)
          this.isApprovedOther = false;
        } else {
          console.log('checkApprovedOther=>', true)
          this.isApprovedOther = true;
        }
      } catch (err) {
        console.log('checkApprovedOther=>', false)
        this.isApprovedOther = false;
      }
    },
    /**
     * approved Sentence
     * @method approvedSentence
     * @for none
     * @return isApprovedSentence
     */
    async approvedSentence(loading) {
      var that = this;
      let obj = await initContracts();
      try {
        await that.checkApprovedSentence();
        console.log("this.isApprovedSentence=>", that.isApprovedSentence)
        if (!this.isApprovedSentence) {
          await obj.sentenceContract.methods.setApprovalForAll(obj.address.merge, true).send({
            from: that.address
          }).then(function (receipt) {
            that.isApprovedSentence = true;
            console.log(receipt, "<=receipt")
            if (that.isApprovedOther) {
              loading.close();
            }
          })
        } else {
          if (that.isApprovedOther) {
            loading.close();
          }
        }
      } catch (err) {
        console.log(err)
        that.$message({
          message: err.message,
          type: 'warning'
        });
        loading.close();
      }

    },
    /**
     * approved Input Other NFT
     * @method approvedOther
     * @for none
     */
    async approvedOther(loading) {
      var that = this;
      let obj = await initContracts();
      try {
        await that.checkApprovedOther()
        if (!that.isApprovedOther) {
          // console.log(that.ethInput)
          await initContracts(that.lastInput).getOtherContracts.methods.approve(obj.address.merge, that.otherNft.tokenID).send({
            from: that.address
          })
              .then(function (receipt) {
                that.isApprovedOther = true;
                console.log(receipt, "<=receipt")
                if (that.isApprovedSentence) {
                  loading.close();
                }
              })
        }
      } catch (err) {
        console.log(err)
        that.$message({
          message: err.message,
          type: 'warning'
        });
        loading.close();
      }

    },
    /**
     * approved Input Other NFT and Sentence NFT
     * @method Approved
     * @for none
     */
    approved() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
      });
      // console.warn('USER approved')
      this.approvedSentence(loading)
      this.approvedOther(loading)
    },
    /**
     * click change synthesis first view
     * @method changeFirst
     */
    changeFirst() {
      var that = this;
      sessionStorage.setItem('firstItem', 1);
      that.$nextTick(() => {
        that.firstItem = Number(sessionStorage.getItem('firstItem'));
        that.showList = [];
        that.ethInput = "";
        that.list = [];
        that.number = -1;
        that.otherNft = null;
        that.show = false;
        that.PopShowNFTList = true;
        // console.log(this.$refs.otherAddress);
        that.$refs.otherAddress.focus()
      })
    }
    ,
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
      ethereum.request({method: 'eth_requestAccounts'})
          .then((accounts) => {
            console.log('accounts:', accounts)
            sessionStorage.setItem('isConnect', true)
            that.isConnect = sessionStorage.getItem('isConnect');
            sessionStorage.setItem('address', accounts[0]);
            that.address = sessionStorage.getItem('address');
            that.checkApprovedSentence()
            that.checkApprovedOther()
          }).catch((reason) => {
        if (reason.code == -32002) {
          this.$message({
            message: reason.message,
            type: 'warning'
          });

        }
      })
      // console.log('finally:', 11)
    }
    ,

    async wallet() {
      var that = this;
      await initContracts().provider.enable().then(accounts => {
        this.$nextTick(() => {
          // console.log('accounts:', accounts)
          sessionStorage.setItem('isConnect', true)
          that.isConnect = sessionStorage.getItem('isConnect');
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
          that.checkApprovedSentence()
          that.checkApprovedOther()
        })
      }).catch((res) => {
        // console.log(res, "error")
      });
      initContracts().provider.on("accountsChanged", (accounts) => {
        this.$nextTick(() => {
          console.log('change METAMASK', accounts)
          sessionStorage.setItem('address', accounts[0]);
          that.address = sessionStorage.getItem('address');
          that.checkApprovedSentence()
          that.checkApprovedOther()
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
          // console.log('chainChanged=>', that.isConnect);
        })
      });
      initContracts().provider.on("disconnect", (code, reason) => {

        this.$nextTick(() => {
          sessionStorage.setItem('isConnect', false)
          if (sessionStorage.getItem('isConnect') == 'true') {
            that.isConnect = true;
          } else {
            that.isConnect = false
          }
          that.address = ''
          that.isConnect = false;
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
      ethereum.on("accountsChanged", function (accounts) {
        // console.log('change METAMASK', accounts)
        sessionStorage.setItem('address', accounts[0]);
        that.address = sessionStorage.getItem('address');
        that.checkApprovedSentence()
        that.checkApprovedOther()
      });
      ethereum.on('networkChanged', function (networkIDstring) {
        sessionStorage.setItem('isConnect', false)
        if (sessionStorage.getItem('isConnect') == 'true') {
          that.isConnect = true;
        } else {
          that.isConnect = false
        }
        sessionStorage.removeItem('isConnect')
        sessionStorage.removeItem('address')
        // console.log('networkChanged=>', that.isConnect);
      })
    }
    ,
  }
}
;
</script>

<style lang="less" scoped>
@import "./index.less";

.body {
  overflow: hidden;
  overflow-y: scroll;
}

.body, .container, .container:before, /deep/ .footer {
  background: #121619;
}

@media screen and (max-width: 980px) {
  /deep/ .footer {
    background: #000000;
    //border-top: 0.5px solid #282828;
    position: fixed;
    bottom: 0;
  }
  .container{
    padding-bottom: 66px;
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