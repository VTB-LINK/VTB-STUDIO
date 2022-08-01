<script>
export default defineComponent({
  name: "DetailsPopUp",
});
</script>

<script setup>
import MainPopUp from "popup/Main.vue";

const props = defineProps({
  song: Object,
});

const recordUrl = computed(() => {
  const { 
    record: { bv = '', p = NaN },
    record_start_ms = '0'
  } = props.song
  const base = `https://www.bilibili.com/video/${bv}?`
  const uri = new URLSearchParams()
  if (p) {
    uri.append('p', p)
  }
  if (record_start_ms && record_start_ms !== '0') {
    uri.append('start_progress', record_start_ms)
  }
  return base + uri.toString()
})

const emit = defineEmits(["closepopup"]);
</script>

<template>
  <MainPopUp v-on:closepopup="$emit('closepopup')" title="歌曲详情">
    <div class="content">
      <p><span>歌名：</span>{{ props.song?.name }}</p>
      <p><span>演唱者：</span>{{ props.song?.artist }}</p>
      <p><span>演唱状态：</span>{{ props.song?.status }}</p>
      <p v-if="props.song?.orginal_artist !== ''">
        <span>原唱：</span>{{ props.song?.orginal_artist }}
      </p>
      <p><span>语言：</span>{{ props.song?.language }}</p>
      <p v-if="props.song?.note"><span>备注：</span>{{ props.song?.note }}</p>
      <p v-if="props.song?.record.bv">
        <span>对应录播：</span>
        <a :href="recordUrl" target="_blank" rel="noreferrer noopener">
          {{ props.song?.date }}
          <template v-if="props.song?.record.p">
            p{{ props.song?.record.p }}
          </template>
        </a>
        <span v-if="props.song?.record.timecode!=='00:00:00'">
          时间点：{{ props.song?.record.timecode }}
        </span>
      </p>
      <p v-if="props.song?.ref">
        <span>参考的路灯man：</span>
        <a
          :href="'https://space.bilibili.com/' + props.song?.ref.uid"
          target="_blank"
          rel="noreferrer noopener"
        >
          @{{ props.song?.ref.name }}
        </a>
      </p>
      <p v-if="props.song?.ref_cut">
        感谢
        <a
          :href="'https://space.bilibili.com/' + props.song?.ref_cut.uid"
          target="_blank"
          rel="noreferrer noopener"
        >
          @{{ props.song?.ref_cut.name }}
        </a>
        提供的音频！
      </p>
    </div>
  </MainPopUp>
</template>

<style scoped>
@import "@/styles/details.scss";
</style>
