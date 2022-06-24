<template>
  <section>
    <div class="textarea-nav wrapper-flex-row">
      <router-link to="/synthesis" class="f1" :class="$route.path=='/synthesis'?'on':''" >Synthesis</router-link>
      <router-link to="/dismantling" class="f1" :class="$route.path=='/dismantling'?'on':''">Dismantling</router-link>
      <div :class="$route.path=='/rewards'||$route.path=='/staking'?'on':''" class="f1 f2">
        <a class="el-dropdown-link" :class="$route.path=='/rewards'||$route.path=='/staking'?'on':''" @click="menu=!menu">
          Rewards
          <!--        {{menu}}-->
        </a>
        <ul class="menu" v-if="menu">
          <li @click="menu=false"><router-link to="/staking" >Staking</router-link></li>
          <li @click="menu=false"><router-link to="/rewards"  >Word Rewards</router-link></li>
        </ul>
      </div>
      <div class="bg" v-if="menu" @click="menu=false"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "headerBar",
  data(){
    return{
      menu:false,
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>

.textarea-nav {
  position: fixed;
  bottom: calc(100vh - 140px);
  left: calc(50% - 160px);
  width: 320px;
  z-index: 10;

  a {
    color: #ffffff;
    margin: 12px 0;
    line-height: 1.2;
    font-size: 22px;
    //margin-right: 15px;

    &:hover, &.on {
      text-shadow: 1px 0 #fff;
    }

    &.on {
      //font-size: 22px;
      border-bottom: 1px solid #ffffff;
    }
  }
}
.dropdown-link{
  position: relative;
}
.bg{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  //background: rgba(0,0,0,1);
}
.menu{
  background: #343a3f;
  border: 0.5px solid rgba(255,255,255,1);
  //left: auto!important;
  //right: 0!important;
  //margin-left: -110px;
  //margin-top: -5px;
  border-radius: 0;
  position: absolute;
  z-index: 3;
  top:50px;
  right: 0;
  padding: 0;
  width: 188px;
  a{
    width: 100%;
    line-height: 52px;
    padding: 0 20px;
    margin: 0;
    display: block;
    box-sizing: border-box;
    font-size:18px;
    border: 0;
  }
  li{
    &:nth-child(1){
      background: #1b2328;
    }
    &:nth-child(2){
      background: #141b1f;
    }
    &:hover,&.on{
      background: #1a1e22;
      font-weight: normal!important;
    }
  }
}
@media screen and (max-width: 1600px) {
  .textarea-nav {
    bottom: calc(100vh - 70px);
  }
}
@media screen and (max-width: 980px) {
  .textarea-nav-container{

  }
  .textarea-nav{
    bottom: auto;
    top: 0;
    width: 100%;
    left: 0;
    border-bottom: 0.5px solid #1f2326;
    //left:calc(50% - 189px);
    //max-width: 377px;

    margin: auto;
    a{
      padding:20px calc((100vw - 320px)/2) 20px;
      margin: 0;
      font-size: 18px;
      box-sizing: border-box;
      //display: block;
      &.on{
        border: 0;
        background: #1f242a;
      }
    }
    a:nth-child(1){
      padding-right: 20px;
    }
    a:nth-child(2){
      padding: 21px  20px;;
    }
    a:nth-child(3){
      padding-left:20px;;
    }
    .f1{
      height: 60px;
      //line-height: 60px;
    }
  }
  .textarea-nav .el-dropdown-link{
      padding: 20px calc((100vw - 320px)/2) 20px 20px!important;
    max-height: 60px;
    }
  .menu{
    right:calc((100vw - 320px)/2) ;
    top: 76px;
    a{
      padding: 0 10px 0 20px;
      //line-height: 30px;
    }
  }
}
</style>