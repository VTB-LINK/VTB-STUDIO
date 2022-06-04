<script>
export default defineComponent({
  name: 'SharePopUp'
});
</script>

<script setup>
import { computed } from '@vue/runtime-core';
import MainPopUp from 'popup/Main.vue';
import utils from 'utils/utils.js';

const baseURL = window.location.origin;

const songTooltips = {
  content: '已成功复制到剪切板'
};

const songlistTooltips = {
  content: '已成功复制到剪切板'
};

const props = defineProps({
  song: Object
});

const emit = defineEmits(['closepopup']);

const playlistShareCode = computed(() => {
  return utils.encodeShare();
});

const playlistID = computed(() => {
  return utils.getAudioIDForShare();
});

const downloadURL = computed(() => {
  return utils.getResourceURL(
    !window.Variables.use_treated.value,
    false,
    true,
    props.song.date,
    props.song.name,
    props.song.ext_name,
    props.song.artist
  );
});

const isBackdoor = computed(() => {
  return window.Variables.backdoor;
});

const copy = (text, popper) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        popper.content = '已成功复制到剪切板';
      },
      function () {
        popper.content = '无剪切板权限，请手动复制';
      }
    );
  } else popper.content = '你的浏览器尚不支持，请手动复制';
};
</script>

<template>
  <MainPopUp title="分享歌曲" @closepopup="$emit('closepopup')">
    <div>
      <div class="c-share-body">
        <div class="c-share-title">
          <div class="share-title">复制链接分享当前歌曲</div>
          <VTooltip :show-triggers="['click']" :hide-triggers="['hover']">
            <button
              slot="reference"
              class="copy-button"
              @click="copy(baseURL + '/?s=' + props.song?.id, songTooltips)"
            >
              复制到剪切板
            </button>
            <template #popper> {{ songTooltips.content }} </template>
          </VTooltip>
        </div>
        <div>
          <a :href="baseURL + '/?s=' + props.song?.id"
            >{{ baseURL }}/?s={{ props.song?.id }}</a
          >
        </div>
      </div>
      <hr />
      <div class="c-share-body">
        <div class="c-share-title">
          <div class="share-title">复制代码分享歌单</div>

          <VTooltip :show-triggers="['click']" :hide-triggers="['hover']">
            <button
              id="share-songlist-button"
              class="copy-button"
              @click="copy(playlistShareCode, songlistTooltips)"
            >
              复制到剪切板
            </button>
            <template #popper> {{ songlistTooltips.content }} </template>
          </VTooltip>
        </div>
        <div class="share-list-text">{{ playlistShareCode }}</div>
      </div>
      <hr />
      <div v-if="isBackdoor" class="c-share-body">
        <div class="c-share-title">
          <div class="share-title">复制歌单曲目id(内部用)</div>
          <VTooltip :show-triggers="['click']" :hide-triggers="['hover']">
            <button
              id="share-songlist-button"
              class="copy-button"
              @click="copy(playlistID, songlistTooltips)"
            >
              复制到剪切板
            </button>
            <template #popper> {{ songlistTooltips.content }} </template>
          </VTooltip>
        </div>
        <div class="share-list-text">{{ playlistID }}</div>
      </div>
      <div v-if="isBackdoor" class="c-share-body">
        <div class="c-share-title">
          <div class="share-title">下载当前歌曲</div>
          <a :href="downloadURL" download>点击下载</a>
        </div>
      </div>
    </div>
  </MainPopUp>
</template>

<style scoped>
@import '@/styles/share.scss';
</style>
