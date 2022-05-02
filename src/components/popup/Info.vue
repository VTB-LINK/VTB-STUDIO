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
      <p>今天有好好吃饭吗٩(๑^o^๑)۶</p>
      <br />
      <p>
        <b>一则来自录音棚的消息：</b> <br />
        问卷调查已经结束，感谢大家的参与！
      </p>
      <br />
      <p>
        随便给你推荐几个AS社区的小伙伴，喜欢的话可以关注一下捏：
        <a
          v-for="c in cutter"
          :key="c[0]"
          :href="'https://space.bilibili.com/' + c[0]"
          target="_blank"
          rel="noreferrer noopener"
          >@{{ c[1] }}</a
        >
      </p>
      <p>和所有的烦恼说白白，和全部的快乐索嗨嗨！今天也来一起愉快地听歌鸭~！</p>
    </div>
  </MainPopUp>
</template>

<style scoped>
@import '@/styles/info.scss';
</style>
