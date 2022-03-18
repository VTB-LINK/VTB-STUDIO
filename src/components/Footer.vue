<script>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Footer",
});
</script>

<script setup>
import CreditPopUp from "popup/Credit.vue";

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
        href="https://zh.moegirl.org.cn/A-SOUL"
        target="_blank"
        rel="noreferrer noopener"
        >A-SOUL</a
      >？ 赶快去看看她们的直播间：
      <a
        href="https://live.bilibili.com/22625025"
        target="_blank"
        rel="noreferrer noopener"
        >@向晚AvA
      </a>
      <a
        href="https://live.bilibili.com/22632424"
        target="_blank"
        rel="noreferrer noopener"
        >@贝拉Bella</a
      >
      <a
        href="https://live.bilibili.com/22634198"
        target="_blank"
        rel="noreferrer noopener"
        >@珈乐Carol</a
      >
      <a
        href="https://live.bilibili.com/22637261"
        target="_blank"
        rel="noreferrer noopener"
        >@嘉然Diana</a
      >
      <a
        href="https://live.bilibili.com/22625027"
        target="_blank"
        rel="noreferrer noopener"
        >@乃琳Eileen</a
      >
    </p>
    <p>
      欢迎加入
      <a
        href="https://discord.gg/TKyrqHqNyS"
        target="_blank"
        rel="noreferrer noopener"
        >A-Soul的非官方社区DC频道</a
      >
      ，这边有面向海外AU小伙伴的转播服务和AS社区建设交流频道。
    </p>
    <p>
      试着关注一下这个b站的二创小伙伴？
      <a
        v-bind:href="'https://space.bilibili.com/' + cutter[0]"
        target="_blank"
        rel="noreferrer noopener"
        >@{{ cutter[1] }}</a
      >
    </p>
    <hr />
    <p>
      录播资源，翻唱切片等请访问：
      <a
        href="https://asoul1.asoul-rec.com/"
        target="_blank"
        rel="noreferrer noopener"
        >A-SOUL录播站</a
      >
    </p>
    <p>
      AS社区的很多小伙伴们为本站提供了莫大的帮忙，戳这里看看->
      <a v-on:click="showCredit = true" class="credit">关于本站</a>
    </p>
    <p>
      录音棚版本更新情报，资源文件报错反馈，问题咨询和新功能建议等请关注并私信联系：
      <a
        href="https://space.bilibili.com/674044855"
        target="_blank"
        rel="noreferrer noopener"
        >@A-SOUL_Studio录音棚</a
      >
    </p>
    <hr />
    <p class="links">
      友情链接：
      <a
        href="https://www.youtube.com/channel/UCrC6Xdxx5Jmo3m0cPi-u_cw"
        target="_blank"
        rel="noreferrer noopener"
        >A-soul Moments油管频道</a
      >
      <a href="https://asoul.jp/" target="_blank" rel="noreferrer noopener"
        >ASファンサイト</a
      >
      <a href="https://asoulfan.com/" target="_blank" rel="noreferrer noopener"
        >Project ASF</a
      >
    </p>
    <p class="links">
      <a
        href="https://bbs.a-soul.fans"
        target="_blank"
        rel="noreferrer noopener"
        >AS BBS</a
      >
      <a href="https://pt.a-soul.fans" target="_blank" rel="noreferrer noopener"
        >ASPT</a
      >
      <a
        href="https://asoulworld.com/"
        target="_blank"
        rel="noreferrer noopener"
        >A-SOUL WORLD导航站</a
      >
      <a href="https://asdb.live" target="_blank" rel="noreferrer noopener"
        >A-SOUL Database</a
      >
    </p>
    <CreditPopUp v-if="showCredit" v-on:closepopup="showCredit = false" />
  </div>
</template>

<style scoped>
@import "@/styles/footer.scss";
</style>
