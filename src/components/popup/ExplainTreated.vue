<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ExplainTreatedPopUp",
});
</script>

<script setup>
import MainPopUp from "popup/Main.vue";

const emit = defineEmits(["closepopup"]);
</script>

<template>
  <MainPopUp v-on:closepopup="$emit('closepopup')" title="经处理的歌">
    <div class="content">
      <p>
        经处理的歌是指将录播片段进行了修音，虽然和原版相比可能部分音质有所损失。
      </p>
      <p>
        仅有少部分歌曲经过处理，其他歌曲仍播放未处理版本。欢迎大家投递自己的精修版本。
      </p>
      <p>通常情况下，网站提供的音频是对录播音频进行简单剪辑，不做额外处理。</p>
    </div>
  </MainPopUp>
</template>

<style scoped></style>
