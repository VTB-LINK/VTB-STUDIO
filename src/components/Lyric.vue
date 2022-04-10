<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Lyric",
});

</script>
<script setup>
import Lyric from 'lrc-file-parser'
import { ref } from 'vue'
import bus from "vue3-eventbus";
// import { arrow-down-bold } from 'element-icons/'

var showLrc = ref("")         // 当前时间应该展示的歌词
var currentLines = ref(null);  //当前歌词行数组
var currentLrcstr = ""     //   当前歌曲歌词全文
var dialogVisible = ref(false); // 歌词弹窗是否可见
var marginTop = ref(0); // 歌词弹窗距离顶部的距离
var lrc = new Lyric({
    onPlay: function (line,text){
        console.log("line:%s  text:%s",line,text)
        showLrc.value = text
        
        let newVal = -line * 30 + 200;
        let sub = (marginTop.value - newVal) / 10;
        // 平滑滚动歌词
        for(var i = 0;i < 10;i++){
            setTimeout(()=>{
              marginTop.value = marginTop.value - sub;
            },i*100)
        }
    },
    onSetLyric: function (lines) { // listening lyrics seting event
    currentLines.value = lines;
    console.log(lines) // lines is array of all lyric text
    // console.log(lines[0])
    console.log(currentLines)
  },
  offset: 150, // offset time(ms), default is 150 ms
  isRemoveBlankLine: true // is remove blank line, default is true
})
// audio.currentTime = 0
// 开始新一首歌曲，传入歌曲id
bus.on("lrc-start",(para) => {
    console.log("lrc-start song.id:%s\n",para)
    let lrcInfo= getLrcInfo(para)
    console.log("lrcinfo",lrcInfo)
    currentLrcstr = lrcInfo[12] 
    lrc.setLyric(currentLrcstr,"")
    lrc.play(0)
})
// setPlayProgress 毫秒
// 进度调转,跳到指定毫秒处
bus.on("lrc-seek",(para)=>{
    // para ms
    console.log("lrc-seek song.id:%s\n",para)
    lrc.play(para*1000)
})
// watch playStatus,audioLoading
// 播放/暂停状态转换 
bus.on("lrc-toggle",(para) => {
    console.log("lrc-toggle")
    lrc.pauseToggle()
})
function getLrcInfo(song_id) {
  console.log(window.AudioLrc)
  var ret = null
  window.AudioLrc.forEach(item => {
    if (item[1] == song_id) {
      ret = item 
      return 
    }
  });
  return ret
}
bus.on("lrc-show",()=>{
    console.log('lrc-show')
    dialogVisible.value = true
})
</script>
<template>
<div >
   <el-dialog
    v-model="dialogVisible"
    title=""
    fullscreen="true"
    width="100%"
    custom-class="mainlrc"
  >
  <!-- <el-icon><arrow-down-bold /></el-icon> -->
     <!-- <button @click="dialogVisible=false">隐藏歌词</button> -->
     <div class="lrcpanel" v-bind:style="{marginTop: marginTop + 'px'}">
      <div v-for="(v,idx) in currentLines" :key="idx" v-bind:class="[v.text==showLrc?'activated':'noactivated','lrcline']">
        {{v.text}}
      </div>
     </div>
  </el-dialog>
</div>
</template>

<style>
 .mainlrc{
    /* background: transparent; */
    position: absolute;
    min-height: 100vh;
    max-height: 100vh;
    min-width: 860px;
    z-index: 1;
    height: 100vh;
    overflow: auto;
    margin: auto;
    padding: 0 7%;
    width: 100%;
    background: linear-gradient(#616A70,#6d535b);
  }
  .lrcpanel{
    /* margin-top: -100px; */
  }
  .lrcline{
    color: #a8a8a8;
    font-size: 25px;
    text-align: center;
  }
  .activated{
    color:white;
    font-size: 30px;
    
  }
  /* .lrcline:hover{
    background-color: purple;
  } */
</style>