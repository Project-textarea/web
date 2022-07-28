<template>
  <div class="footer-sum">
    <!--    PC footer Container-->
    <footer class="footer pc-footer">
      <div class="text-list">
        <a @click="to('/word')" :class="$route.path=='/word'||$route.path=='/'?'on':''">Word</a>
        <a @click="to('/sentence')" :class="$route.path=='/sentence'?'on':''">Sentence</a>
        <a @click="to('/synthesis')"
           :class="$route.path=='/rewards'||$route.path=='/staking'||$route.path=='/dismantling'||$route.path=='/synthesis'?'on':''">Textarea</a>
        <a @click="to('/about')" :class="$route.path=='/about'?'on':''">About</a>
      </div>
      <div class="footer-icon" onselectstart="return false">
        <a href="https://twitter.com/TextareaProject" target="_blank">
          <img src="@/assets/images/icon-f1.png" width="35"/>
        </a>
        <a href="https://discord.com/invite/DVv3PFznQm" target="_blank">
          <img src="@/assets/images/discord.svg" width="35"/>
        </a>
        <a href="https://textarea.gitbook.io/documentation/" target="_blank">
          <img src="@/assets/images/icon-gitbook.png" width="37"/>
        </a>
        <a href="https://github.com/Project-textarea" target="_blank">
          <img src="@/assets/images/icon-f3.png" width="35"/>
        </a>
      </div>
    </footer>
    <!--    iphone and IPad footer Container-->
    <footer class="footer wrapper-flex-row iphone-footer" :class="changeClass?'changeClass':''">
      <a  @click="to('/word')" :class="$route.path=='/word'||$route.path=='/'?'on':''">
        <img src="@/assets/images/f1.svg" width="100%"/>
        <img src="@/assets/images/f1-on.svg" width="100%"/>
      </a>
      <a @click="to('/sentence')" :class="$route.path=='/sentence'?'on':''">
        <img src="@/assets/images/f2.svg" width="100%"/>
        <img src="@/assets/images/f2-on.svg" width="100%"/></a>
      <a @click="to('/synthesis')"
                   :class="$route.path=='/rewards'||$route.path=='/staking'||$route.path=='/dismantling'||$route.path=='/synthesis'?'on':''">
        <img src="@/assets/images/f3.svg" width="100%"/>
        <img src="@/assets/images/f3-on.svg" width="100%"/></a>
      <a @click="to('/about')" :class="$route.path=='/about'?'on':''">
        <img src="@/assets/images/f4.svg" width="100%"/>
        <img src="@/assets/images/f4-on.svg" width="100%"/></a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footerBar",
  props: {
    changeClass: false,
  },
  methods: {
    to(url) {
      if (!this.$route.path.includes(url)&&url!='/') {
        this.$router.push({path:url})
      }else{
        if(url=='/'||url=='/word'||url=='/sentence'){
          this.$emit("change",true);
        }
      }
    },
    coming(){
        this.$message({
          message: 'The Sentence Contest is in development...',
          type: 'warning'
        });
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #000000;
  text-align: center;
  color: #fff;
  font-size: 22px;
  padding-top: 36px;
  z-index: 4;

  .text-list {
    a {
      color: #ffffff;
      margin: 12px 8px;
      line-height: 1.2;

      &:hover, &.on {
        text-shadow: 1px 0 #fff;
        //font-weight: bold;
      }

      &.on {
        border-bottom: 1px solid #ffffff;
      }
    }
  }

  .footer-icon {
    padding: 20px 0 40px;

    a {
      display: inline-block;
      margin: 0 31px;
      transition: all .3s;

      &:hover {
        opacity: .5;
      }
    }
  }
}

.iphone-footer {
  display: none;
}

@media screen and (max-width: 1600px) {
  .footer {
    //padding-top: 5px;
  }
}

@media screen and (max-width: 980px) {
  .pc-footer {
    display: none;
  }

  .footer {
    padding-top: 0;
  }

  .iphone-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #000000;
    text-align: center;
    border-top: 0.5px solid #282828;
    z-index: 11;
    a {
      width: 25%;
      padding: 12px 0;
      text-align: center;

      img {
        margin: auto;
        width: 30%;
        display: block;
      }

      img:nth-child(2) {
        display: none;
      }
    }

    a.on {
      img:nth-child(1) {
        display: none;
      }

      img:nth-child(2) {
        display: block;
      }
    }
  }
}
</style>