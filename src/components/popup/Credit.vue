<script>
export default defineComponent({
  name: "CreditPopUp",
});
</script>

<script setup>
import MainPopUp from "popup/Main.vue";

const cutterList = ref([]);

onMounted(() => {
  // 提取切歌人
  let _rawList = window.AudioLists.song_list.map((i) => i.ref_cut);
  _rawList = _rawList.filter((i) => i !== false);
  // 去重计数
  for (const cutter of _rawList) {
    const _idx = cutterList.value.findIndex((u) => u.uid === cutter.uid);
    if (_idx === -1) cutterList.value.push({ ...cutter, count: 1 });
    else cutterList.value[_idx].count += 1;
  }
  // 按数量排序
  cutterList.value.sort((u1, u2) => u2.count - u1.count);
});

const emit = defineEmits(["closepopup"]);
</script>

<template>
  <MainPopUp
    v-on:closepopup="$emit('closepopup')"
    title="关于"
    class="popup-credit"
  >
    <div class="content">
      <p>
        感谢
        <a
          href="https://space.bilibili.com/393157178"
          target="_blank"
          rel="noreferrer noopener"
          >@George-Kazami@VTB-LINK</a
        >长久以来对于录播资源的整合和服务器运维的支持，没有大伙就没法顺利发布本录音棚。
      </p>
      <p>
        感谢
        <a
          href="https://space.bilibili.com/3493269174487419"
          target="_blank"
          rel="noreferrer noopener"
          >@这是一个黎谱的二创组</a
        >
        <!-- 和
        <a
          href="https://space.bilibili.com/3461579657972242"
          target="_blank"
          rel="noreferrer noopener"
          >@星云社保安室</a
        > -->
        长期以来对于录播资源整理归纳，没有他们就没法顺利整理出完整的音频列表和切片信息。
      </p>
      <!-- <p>
        感谢
        <span
          v-for="cutter in cutterList"
          v-bind:key="cutter.uid"
          class="cutter"
        >
          <a
            v-bind:href="'https://space.bilibili.com/' + cutter.uid"
            target="_blank"
            rel="noreferrer noopener"
          >
            @{{ cutter.name }}</a
          >
          ({{ cutter.count }})
        </span>
        切的歌，给录音棚添加了很多存货（鞠躬
      </p> -->
      <p>
        运行代码有问题？或者想帮忙！（提前感谢）狂戳这里ଘ(੭ˊᵕˋ)੭
        <a
          href="https://message.bilibili.com/#/whisper/mid393157178"
          target="_blank"
          rel="noreferrer noopener"
          >@George-Kazami</a
        >
        的b站私信！
      </p>
      <p>
        本项目已开源（
        <a
          href="https://github.com/VTB-LINK/VTB-STUDIO"
          target="_blank"
          rel="noreferrer noopener"
          >Github</a
        >
        ）欢迎Star, Fork来一起建设录音棚！
      </p>
      <p>
        最后特别鸣谢
        <a
          href="https://space.bilibili.com/1818479062"
          target="_blank"
          rel="noreferrer noopener"
          >@呜米小姐的吃饭小虎牙</a
        >
        的开源和帮助！
      </p>
    </div>
  </MainPopUp>
</template>

<style scoped>
@import "@/styles/credit.scss";
</style>
