<script>
export default defineComponent({
  name: 'InfoPopUp'
});
</script>

<script setup>
import MainPopUp from 'popup/Main.vue';
import shuffle from 'lodash.shuffle';

const cutter = ref(
  shuffle(window.AudioLists.cutter_list).slice(0, CUTTER_DISPLAY_MAX)
);

const emit = defineEmits(['closepopup']);
</script>

<template>
  <MainPopUp title="欢迎来到AS录音棚！" @closepopup="$emit('closepopup')">
    <div class="content">
      <p>
        今天有好好吃饭吗٩(๑^o^๑)۶
        <br />
        <br />
        <b>一则来自Dionysus酒吧录音棚的温馨提醒：</b> <br />
        欢迎使用手机版Chrome或者safari来进行收听！<br />
        由于IOS安全限制，后台播放时无法自动切歌，只能单曲循环，尽情谅解。
      </p>
      <!--  <p>
        随便给你推荐几个AS社区的小伙伴，喜欢的话可以关注一下捏：
        <a
          v-for="c in cutter"
          :key="c[0]"
          :href="'https://space.bilibili.com/' + c[0]"
          target="_blank"
          rel="noreferrer noopener"
          >@{{ c[1] }}</a
        >
      </p> -->
      <p>『在没有演出的夜晚，我习惯挑一个人少的角落捧着热牛奶小口啜饮，观察着每一个来到这里的客人。欢迎来到Dionysus的录音棚，希望望你收听愉快。』</p>
    </div>
  </MainPopUp>
</template>

<style scoped>
@import '@/styles/info.scss';
</style>
