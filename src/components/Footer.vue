<script>
export default defineComponent({
  name: 'Footer'
});
</script>

<script setup>
import CreditPopUp from 'popup/Credit.vue';

const cutter = ref([]);
const showCredit = ref(false);

onMounted(() => {
  const _list = window.AudioLists.cutter_list;
  cutter.value = _list[Math.floor(Math.random() * _list.length)];
});
</script>

<template>
  <div class="c-footer">
    <p>
      或许你还不十分了解
      <a
        href="https://space.bilibili.com/1518468126"
        target="_blank"
        rel="noreferrer noopener"
        >黎酩_Lunette</a
      >？ 赶快去看看她的直播间：
      <a
        href="https://live.bilibili.com/26167845"
        target="_blank"
        rel="noreferrer noopener"
        >@黎酩_Lunette 的直播间
      </a>

    </p>
    <p>
      欢迎加入
      <a
        href="https://space.bilibili.com/3493269174487419"
        target="_blank"
        rel="noreferrer noopener"
        >这是一个黎谱的二创组</a
      >
      ，二创组持续招新中。
    </p>
    <!--     <p>
      试着关注一下这个b站的二创小伙伴？
      <a
        v-bind:href="'https://space.bilibili.com/' + cutter[0]"
        target="_blank"
        rel="noreferrer noopener"
        >@{{ cutter[1] }}</a
      >
    </p> -->
    <hr />
    <!-- <p>
      关于歌曲的切片资源整理请参阅：<a
        href="https://www.bilibili.com/read/cv16054470"
        target="_blank"
        rel="noreferrer noopener"
        >A-SOUL录音棚指南</a
      >
    </p> -->
    <p>
      录播资源，翻唱切片等请访问：
      <a
          href="https://space.bilibili.com/3493269174487419"
          target="_blank"
          rel="noreferrer noopener"
          >@这是一个黎谱的二创组</a
        >
        和
        <a
          href="https://space.bilibili.com/3461579657972242"
          target="_blank"
          rel="noreferrer noopener"
          >@星云社保安室</a
        >
    </p>
    <p>
      二创组的很多小伙伴们为本站提供了莫大的帮助，戳这里看看->
      <a class="credit" @click="showCredit = true">关于本站</a>
    </p>
    <p>
      录音棚版本更新情报，资源文件报错反馈，问题咨询和新功能建议等请关注并私信联系：
      <br>
      <a
          href="https://space.bilibili.com/3493269174487419"
          target="_blank"
          rel="noreferrer noopener"
          >@这是一个黎谱的二创组</a
        >
      或
      <a
        href="https://space.bilibili.com/393157178"
        target="_blank"
        rel="noreferrer noopener"
        >@George-Kazami</a
      >
    </p>
    <hr />
    <p class="links">
      友情链接：
      <a
          href="https://space.bilibili.com/3493269174487419"
          target="_blank"
          rel="noreferrer noopener"
          >@这是一个黎谱的二创组</a
        >
        
        <a
          href="https://space.bilibili.com/3461579657972242"
          target="_blank"
          rel="noreferrer noopener"
          >@星云社保安室</a
        >
    </p>
    <CreditPopUp v-if="showCredit" @closepopup="showCredit = false" />
  </div>
</template>

<style scoped>
@import '@/styles/footer.scss';
</style>
