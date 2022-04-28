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
        我们制作了一份问卷，希望找到一些熟悉A-SOUL演唱歌曲，且有一定音乐素养的au，负责歌单和曲库方面的工作。
        <br />
        问卷满分100分，前半部分评分题50分，后半部分50分，答题完毕可以看到分数和排行榜。
        <br />
        欢迎有兴趣加入录音棚团队，或想挑战自己的au前来参与。 <br />
        问卷：https://ks.wjx.top/vj/P04QpQq.aspx
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
