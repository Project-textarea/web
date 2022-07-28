<template>
  <div class="container about-container">
    <div class=" content pc-show">
      <p style="padding-bottom: 20px"><span style="color: #fff;display:block;font-size: 24px;line-height: 1.2;">Textarea is a text derivative of NFT, which provides NFT with more value.</span></p>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Words</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Consists of consecutive letters and numbers.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Special symbols cannot be used in words.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Words are case insensitive.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The same word cannot be generated repeatedly</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">I; You; He; She; It; Am; Are; Were; Is; Was; Be; Do; Does;
          Did; Have; Has; Shall; Should; Will; Would; Can; Could; May; Might.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The 24 words above cannot be claimed by anyone and they
          will not incur any cost when creating sentences.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Sentence</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Consists of one or more words displayed within a fixed
          pixel area.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The minimum number of words that make up a sentence is
          one, and the maximum cannot exceed the fixed pixel area (11 lines).
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Word holders or non-word holders can both create
          sentences.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Sentences with the exact same content cannot be generated
          repeatedly.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Punctuation; space; enter; will be considered as the basis
          for judging sentence difference.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">No space can be added at the end of the sentence.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Sentences can be changed in color using a six-digit color
          number. Sentences with different colors but the same content cannot be created repeatedly.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Economy</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">The fee for each word to be claimed is 0.15 ETH.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The cost per sentence depends on the number of words.
          Every new word added to the sentence will increase the generation cost by 0.01 ETH (words that are reused will
          not incur additional costs). The 0.01 ETH will be distributed to the word owner as a reward.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">When a word in a sentence has no owner, the 0.01 ETH
          generated based on that word will be allocated to the ETH pool and rewarded to TEXT liquidity providers.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Punctuation; space; enter will not incur any charges.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">5% royalties will be charged for secondary transactions of
          words and sentences.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">TEXT Token</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT token is the official token of textarea project.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The total supply of TEXT token is 170 millions.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT Token distribution currently consists of the
          following structure:
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">15% to team members.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">25% to stake rewards.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">50% to synthetic rewards.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">5% to initial liquidity.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">5% to mirror crowdfunding.</li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Synthesis</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Users can stake their NFT & sentence in to the open source
          contract provided by Textarea to generate a NEW NFT.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The process of synthesizing will generate TEXT tokens, and
          the amount of TEXT token generated depends on the ranking of all time total tvl of the NFT project.
        </li>
      </ul>
      <img src="@/assets/images/about1.png" width="100%" style="padding: 10px 0 40px;"/>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Dismantling</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Users can disassemble the synthesized of the NEW NFT at
          any time, to redeem the original NFT and sentence immediately. After the disassembly, the NEW NFT will be
          destroyed. The act of dismantling will consume TEXT tokens, and the amount of TEXT consumed is the same as the
          amount of TEXT produced during synthesis.
        </li>
      </ul>
      <img src="@/assets/images/about2.png" width="100%" style="padding: 10px 0 40px;"/>

      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Staking</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT liquidity providers will receive double reward of
          WETH & TEXT.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">WETH rewards: 0.01 ETH x The number of unclaimed words
          appearing in all sentences.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT rewards: In the beginning, the TEXT reward pool
          produces 237,037 amount of TEXT tokens everyday, halved every 90 days for 720 days, and a total of 42,500,000
          TEXT tokens are produced.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Record</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">The NEW NFT synthesized by NFT & sentence can continue to
          be synthesized with an other sentence, and this process can be replicated infinity.
        </li>
        <img src="@/assets/images/about3.png" width="100%" style="padding: 10px 0 40px;"/>
        <li style="padding-bottom: 20px; padding-left: 20px;">Based on the pure text representation of Textarea, all
          generated data will be permanently stored on Ethereum. WEB3 is the foundation.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Sentence contest</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">We are building a platform dedicated to sentence-making
          competitions. On this platform, The word holder can initiate a competition base on word themed sentence
          making. Those who want to pariticpate in the competition need to use the themed word for sentence making.
          Participants can allow their sentences for voting, participants with the most votes will win the competition.
          Rewards will prizes provided by the initiator.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Team</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">We are a web3 team with four developers, including a
          product manager, a contract development engineer, a front-end development engineer, and a ui designer. We are
          full time developing textarea project and will remain anonymous.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Roadmap</span>
      </p>
      <ul>
          <li style="padding-bottom: 20px; padding-left: 20px;">April - June, 2022<br/>Development of word; sentence; synthesis; disassembly.
          </li>
          <li style="padding-bottom: 20px; padding-left: 20px;">July, 2022<br/>Rinkeby Testnet<br/>
            Giveaway(ENS Gift)
          </li>
          <li style="padding-bottom: 20px; padding-left: 20px;">August, 2022<br/>Mirror crowdfunding(5% of total TEXT).<br/>
            Word; sentence; synthesis mainnet launched.<br/>
            TEXT token released.<br/>
            TEXT staking.
          </li>
          <li style="padding-bottom: 20px; padding-left: 20px;">September - October, 2022<br/>Sentence contest platform development.
          </li>
          <li style="padding-bottom: 20px; padding-left: 20px;">November, 2022<br/>Sentence contest platform launched.
          </li>
          <li style="padding-bottom: 20px; padding-left: 20px;">December, 2022<br/>Ubsequent funding and feature updates.
          </li>
          <li style="padding-bottom: 20px; padding-left: 20px;">2023<br/>Development and Construction of Text Metaverse.
          </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 15px;padding-top:60px;display:block;font-size: 24px;line-height: 1;">Contract (Rinkeby)</span>
      </p>

      <p><span style="color: #fff;display:block;">Word </span></p>
      <div style="word-break: break-all;padding-bottom: 20px;color:#ffffff;">
        0x8D45FC59143C1741807d4A1F03956A5AeC303463
      </div>

      <p><span style="color: #fff;display:block;">Sentence</span>
      </p>
      <div style="word-break: break-all;padding-bottom: 20px;color:#ffffff;">
        0x26572469B798327978DBA222e8bCC500528d9dB5
      </div>
      <p><span style="color: #fff;display:block;">Merge</span>
      </p>
      <div style="word-break: break-all;padding-bottom: 20px;color:#ffffff;">
        0xE679571C9FbbF69AE1eEE1823eEa780A40f990B6
      </div>
      <p><span
          style="color: #fff;display:block;">TEXT</span>
      </p>
      <div target="_blank" style="word-break: break-all;padding-bottom: 20px;color:#ffffff;">
        0x305Db03d3E0D2067daf33A0bF751c77ACb7808D2
      </div>
      <p><span style="color: #fff;display:block;">Mint Pool</span>
      </p>
      <div style="word-break: break-all;padding-bottom: 20px;color:#ffffff;">
        0x98645d0D83BC47968b1Cad0B6EDdAfe4E75D6088
      </div>
    </div>
    <div class="content iphone-show">
      <p style="font-size: 20px;padding-bottom: 20px">Textarea is a text derivative of NFT, which provides NFT with more value.</p>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Words</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Consists of consecutive letters and numbers.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Special symbols cannot be used in words.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Words are case insensitive.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The same word cannot be generated repeatedly</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">I; You; He; She; It; Am; Are; Were; Is; Was; Be; Do; Does;
          Did; Have; Has; Shall; Should; Will; Would; Can; Could; May; Might.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The 24 words above cannot be claimed by anyone and they
          will not incur any cost when creating sentences.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Sentence</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Consists of one or more words displayed within a fixed
          pixel area.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The minimum number of words that make up a sentence is
          one, and the maximum cannot exceed the fixed pixel area (11 lines).
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Word holders or non-word holders can both create
          sentences.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Sentences with the exact same content cannot be generated
          repeatedly.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Punctuation; space; enter; will be considered as the basis
          for judging sentence difference.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">No space can be added at the end of the sentence.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Sentences can be changed in color using a six-digit color
          number. Sentences with different colors but the same content cannot be created repeatedly.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Economy</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">The fee for each word to be claimed is 0.15 ETH.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The cost per sentence depends on the number of words.
          Every new word added to the sentence will increase the generation cost by 0.01 ETH (words that are reused will
          not incur additional costs). The 0.01 ETH will be distributed to the word owner as a reward.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">When a word in a sentence has no owner, the 0.01 ETH
          generated based on that word will be allocated to the ETH pool and rewarded to TEXT liquidity providers.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">Punctuation; space; enter will not incur any charges.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">5% royalties will be charged for secondary transactions of
          words and sentences.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">TEXT Token</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT token is the official token of textarea project.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The total supply of TEXT token is 170 millions.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT Token distribution currently consists of the
          following structure:
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">15% to team members.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">25% to stake rewards.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">50% to synthetic rewards.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">5% to initial liquidity.</li>
        <li style="padding-bottom: 20px; padding-left: 20px;">5% to mirror crowdfunding.</li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Synthesis</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Users can stake their NFT & sentence in to the open source
          contract provided by Textarea to generate a NEW NFT.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">The process of synthesizing will generate TEXT tokens, and
          the amount of TEXT token generated depends on the ranking of all time total tvl of the NFT project.
        </li>
      </ul>
      <img src="@/assets/images/about1.png" width="100%" style="padding: 10px 0 40px;"/>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Dismantling</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">Users can disassemble the synthesized of the NEW NFT at
          any time, to redeem the original NFT and sentence immediately. After the disassembly, the NEW NFT will be
          destroyed. The act of dismantling will consume TEXT tokens, and the amount of TEXT consumed is the same as the
          amount of TEXT produced during synthesis.
        </li>
      </ul>
      <img src="@/assets/images/about2.png" width="100%" style="padding: 10px 0 40px;"/>

      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Staking</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT liquidity providers will receive double reward of
          WETH & TEXT.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">WETH rewards: 0.01 ETH x The number of unclaimed words
          appearing in all sentences.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">TEXT rewards: In the beginning, the TEXT reward pool
          produces 237,037 amount of TEXT tokens everyday, halved every 90 days for 720 days, and a total of 42,500,000
          TEXT tokens are produced.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Record</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">The NEW NFT synthesized by NFT & sentence can continue to
          be synthesized with an other sentence, and this process can be replicated infinity.
        </li>
        <img src="@/assets/images/about3.png" width="100%" style="padding: 10px 0 40px;"/>
        <li style="padding-bottom: 20px; padding-left: 20px;">Based on the pure text representation of Textarea, all
          generated data will be permanently stored on Ethereum. WEB3 is the foundation.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Sentence contest</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">We are building a platform dedicated to sentence-making
          competitions. On this platform, The word holder can initiate a competition base on word themed sentence
          making. Those who want to pariticpate in the competition need to use the themed word for sentence making.
          Participants can allow their sentences for voting, participants with the most votes will win the competition.
          Rewards will prizes provided by the initiator.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Team</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">We are a web3 team with four developers, including a
          product manager, a contract development engineer, a front-end development engineer, and a ui designer. We are
          full time developing textarea project and will remain anonymous.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Roadmap</span>
      </p>
      <ul>
        <li style="padding-bottom: 20px; padding-left: 20px;">April - June, 2022<br/>Development of word; sentence; synthesis; disassembly.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">July, 2022<br/>Rinkeby Testnet<br/>
          Giveaway(ENS Gift)
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">August, 2022<br/>Mirror crowdfunding(5% of total TEXT).<br/>
          Word; sentence; synthesis mainnet launched.<br/>
          TEXT token released.<br/>
          TEXT staking.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">September - October, 2022<br/>Sentence contest platform development.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">November, 2022<br/>Sentence contest platform launched.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">December, 2022<br/>Ubsequent funding and feature updates.
        </li>
        <li style="padding-bottom: 20px; padding-left: 20px;">2023<br/>Development and Construction of Text Metaverse.
        </li>
      </ul>
      <p><span style="color: #fff;padding-bottom: 10px;padding-top:60px;display:block;font-size: 20px;line-height: 1;">Contract (Rinkeby)</span>
      </p>

      <p><span style="color: #fff;padding-top:10px;display:block;">Word</span>
      </p>
      <div style="word-break: break-all;color:#ffffff;">
        0x8D45FC59143C1741807d4A1F03956A5AeC303463
      </div>
      <p><span style="color: #fff;padding-top:10px;display:block;">Sentence </span>
      </p>
      <div style="word-break: break-all;color:#ffffff;">
        0x26572469B798327978DBA222e8bCC500528d9dB5
      </div>
      <p><span style="color: #fff;padding-top:10px;display:block;">Merge</span>
      </p>
      <div style="word-break: break-all;color:#ffffff;">
        0xE679571C9FbbF69AE1eEE1823eEa780A40f990B6
      </div>
      <p><span style="color: #fff;padding-top:10px;display:block;">TEXT</span>
      </p>
      <div style="word-break: break-all;color:#ffffff;">
        0x305Db03d3E0D2067daf33A0bF751c77ACb7808D2
      </div>
      <p><span style="color: #fff;padding-top:10px;display:block;">Mint Pool</span>
      </p>
      <div style="word-break: break-all;padding-bottom: 15px;color:#ffffff;">
        0x98645d0D83BC47968b1Cad0B6EDdAfe4E75D6088
      </div>

      <div class="about-icon-list" onselectstart="return false">
        <a href="https://twitter.com/TextareaProject" target="_blank">
          <img src="@/assets/images/icon-f11.png" width="35"/>
        </a>
        <a href="https://discord.com/invite/DVv3PFznQm" target="_blank">
          <img src="@/assets/images/icon-f21.png" width="35"/>
        </a>
        <a href="https://textarea.gitbook.io/documentation/" target="_blank">
          <img src="@/assets/images/icon-f51.png" width="35"/>
        </a>
        <a href="https://github.com/Project-textarea" target="_blank">
          <img src="@/assets/images/icon-f31.png" width="35"/>
        </a>
      </div>
    </div>
    <footer-Bar></footer-Bar>
  </div>
</template>

<script>
import {Message} from 'element-ui';
import footerBar from '../../components/footerBar'

export default {
  components: {
    footerBar
  },
  data() {
    return {
      newRoleNameEn: '',
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
      this.newRoleNameEn = this.newRoleNameEn.replace(/[^0-9A-Za-z,.?`~!@#$%^&*(){}|]/g, '');
    },
  },

  created() {
  },
  mounted() {
  },
  methods: {
    coming() {
      this.$message({
        message: 'The Sentence Contest is in development...',
        type: 'warning'
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";

/deep/ .footer {
  padding-top: 50px;
}

.about-icon-list {
  padding-top: 40px;
  padding-bottom: calc(170px + constant(safe-area-inset-bottom));
  padding-bottom: calc(170px + env(safe-area-inset-bottom));
  //padding-bottom: 20px;
}

.about-icon-list a {
  margin-right: 20px;
}

.iphone-show li, .pc-show li {
  position: relative;
}

.iphone-show li:after, .pc-show li:after {
  content: '·';
  position: absolute;
  top: 0;
  left: 0;
}

@media screen and (max-width: 980px) {
  /deep/ .footer {
    padding-top: 0;
  }

  .container {
    padding-bottom: 70px;
  }
}
</style>
<style>
.el-textarea__inner, .el-input__inner {
  border: 0;
  background: transparent;
  color: #ffffff;
  padding: 0;
  resize: none;
}
</style>
