<script>
export default defineComponent({
  name: 'MainSongList'
});
</script>

<script setup>
import utils from 'utils/utils.js';
import bus from 'vue3-eventbus';
import SongFilter from 'components/SongFilter.vue';
import SongListPagination from 'components/SongListPagination.vue';
import IconCloudLoading from '~icons/local-icons/cloud-loading';

const loveList = ref(window.AudioLists.love_list);
const cachedList = ref(window.AudioLists.cached_list);
const cachingList = ref([]);
const expandList = ref([]);
const page = ref(1);
const perPage = ref(10);
const songListFiltered = ref(window.AudioLists.song_list);
const songListOrigin = ref([]);
const playlist = ref(window.AudioLists.playlist);
const header = ref(null);

const songList = computed(() => {
  // 从筛选过后的列表中选出当前页的歌
  return songListFiltered.value.slice(
    (page.value - 1) * perPage.value,
    page.value * perPage.value
  );
});

const inPlaylistList = computed(() => {
  return songList.value.map(
    (song) => playlist.value.findIndex((s) => song.id === s.id) !== -1
  );
});

const isCaching = computed(() => {
  return songList.value.map(
    (song) =>
      cachingList.value.findIndex((caching) => song.id === caching) !== -1
  );
});

const isCached = computed(() => {
  return songList.value.map(
    (song) => cachedList.value.findIndex((cached) => song.id === cached) !== -1
  );
});

const isLoved = computed(() => {
  return songList.value.map(
    (song) => loveList.value.findIndex((love) => song.id === love) !== -1
  );
});

const isExpanded = computed(() => {
  return songList.value.map(
    (song) => expandList.value.findIndex((expend) => song.id === expend) !== -1
  );
});

const cachedListForPlay = computed(() => {
  return songListOrigin.value.filter(
    (song) => cachedList.value.findIndex((id) => song.id === id) !== -1
  );
});

const loveListForPlay = computed(() => {
  return songListOrigin.value.filter(
    (song) => loveList.value.findIndex((id) => song.id === id) !== -1
  );
});

const addSong = (idx, shouldPlay = false) => {
  if (songList.value[idx].has_audio === false) return;
  bus.emit('playlist-add-song-event', [
    songList.value[idx],
    shouldPlay,
    shouldPlay
  ]);
  //this.$parent.$refs.player.playlist_add_song();
};

const removeSong = (idx) => {
  // 这里怎么定位到播放器组件 我完全哇嘎那一
  bus.emit('playlist-remove-song-id-event', songList.value[idx].id);
  //this.$parent.$refs.player.playlist_remove_song_id(this.song_list[idx].id);
};

const loveSong = (idx) => {
  const _song = songList.value[idx];
  // 修改喜爱列表
  if (isLoved.value[idx]) {
    const _idxDel = loveList.value.findIndex((i) => _song.id === i);
    loveList.value.splice(_idxDel, 1);
  } else loveList.value.push(_song.id);
  // 保存喜爱列表
  utils.saveLoveList(loveList.value);
};

const expandSong = (idx) => {
  const _song = songList.value[idx];
  // 修改展开列表
  if (isExpanded.value[idx]) {
    const _idxDel = expandList.value.findIndex((i) => _song.id === i);
    expandList.value.splice(_idxDel, 1);
  } else expandList.value.push(_song.id);
};

const allSongToPlaylist = () => {
  // 当前筛选的全部歌曲，加入歌单
  if (songListFiltered.value.length > 0)
    bus.emit(
      'playlist-add-many-event',
      songListFiltered.value.filter((song) => song.has_audio)
    );
  //this.$parent.$refs.player.playlist_add_many()
};

const expendAll = () => {
  // 展开全部 如果没有全部展开就展开 否则收起
  if (expandList.value.length !== songList.value.length)
    expandList.value = songList.value.map((song) => song.id);
  else expandList.value = [];
};

const pageChangeEvent = () => {
  // 清空展开和选中
  expandList.value = [];
  // 判断是不是在页面内并滚动到顶部
  if (header.value.getBoundingClientRect().bottom < 0)
    header.value.scrollIntoView();
};

const cacheAudioLocally = async (song) => {
  cachingList.value.push(song.id);
  await utils.saveAudioInDB(
    song,
    !window.Variables.use_treated.value,
    window.Variables.use_ch_resource
  );
  window.AudioLists.cached_list = cachedList.value =
    await utils.readCachedList();
  cachingList.value.pop();
};

const decacheAudioLocally = async (id) => {
  await utils.deleteAudioInDB(id);
  window.AudioLists.cached_list = cachedList.value =
    await utils.readCachedList();
};

const initAsyncList = () => {
  songListOrigin.value = window.AudioLists.song_list;
};

onMounted(() => {
  bus.on('apply-search-event', initAsyncList);
});
</script>

<template>
  <div class="c-main">
    <SongFilter
      v-model:songListFiltered="songListFiltered"
      :cached-list="cachedListForPlay"
      :love-list="loveListForPlay"
      @update:songListFiltered="page = 1"
    />
    <div class="c-controler">
      <button
        class="general-button controler-item controler-item-all"
        @click="allSongToPlaylist"
      >
        全部筛选结果加入播放列表
      </button>
    </div>
    <SongListPagination
      v-model:page="page"
      v-model:perPage="perPage"
      :total="songListFiltered.length"
      @update:page="pageChangeEvent"
    ></SongListPagination>
    <div class="c-song-list">
      <div ref="header" class="song-list-header">
        <div class="header-column all-column all-column-idx"></div>
        <div class="header-column header-column-op all-column all-column-op">
          操作
        </div>
        <div class="all-column-info">
          <div
            class="header-column header-column-name all-column all-column-name"
          >
            <span class="header-column-name-wide">歌名</span>
            <span class="header-column-name-narrow">歌曲信息</span>
          </div>
          <div
            class="header-column header-column-artist all-column all-column-artist"
          >
            演唱者
          </div>
          <div
            class="header-column header-column-status all-column all-column-status"
          >
            演唱状态
          </div>
          <div
            class="header-column header-column-date all-column all-column-date"
          >
            演唱日期
          </div>
          <div
            class="header-column header-column-duration all-column all-column-duration"
          >
            时长
          </div>
        </div>
        <div
          class="header-column header-column-details all-column all-column-details"
          @click="expendAll"
        >
          展开
        </div>
      </div>
      <div
        v-for="(song, idx) in songList"
        :key="song.id"
        :class="[
          'song-list-item',
          { 'dark-bg': idx % 2 === 1 },
          { 'light-bg': idx % 2 === 0 }
        ]"
      >
        <div class="song-list-item-main">
          <div class="item-column-idx all-column all-column-idx">
            {{ idx + 1 + (page - 1) * perPage }}
          </div>
          <div class="item-column-op all-column all-column-op">
            <div
              v-show="song.has_audio && !isCached[idx]"
              class="item-op-download item-op-all"
              title="缓存歌曲"
              @click.stop="cacheAudioLocally(song)"
            >
              <!--               <div
                v-bind:class="[
                  { 'item-op-download-ready': !isCaching[idx] },
                  { 'item-op-download-doing': isCaching[idx] },
                ]"
              ></div> -->
              <div>
                <i-ic-outline-cloud-download
                  v-show="!isCaching[idx]"
                  class="svg-icons"
                />
                <IconCloudLoading v-show="isCaching[idx]" />
              </div>
            </div>
            <div
              v-show="song.has_audio && isCached[idx]"
              class="item-op-downloaded item-op-all"
              title="移除歌曲"
              @click.stop="decacheAudioLocally(song.id)"
            >
              <div>
                <i-ic-round-cloud-done class="svg-icons" />
              </div>
            </div>
            <div
              v-show="song.has_audio && !inPlaylistList[idx]"
              class="item-op-add item-op-all"
              title="加入播放列表"
              @click.stop="addSong(idx)"
            >
              <div>
                <i-ic-outline-playlist-add-circle class="svg-icons" />
              </div>
            </div>
            <div
              v-show="song.has_audio && inPlaylistList[idx]"
              class="item-op-added item-op-all"
              title="已在播放列表"
              @click.stop="removeSong(idx)"
            >
              <div>
                <i-ic-baseline-playlist-add-check-circle class="svg-icons" />
              </div>
            </div>
            <div
              v-show="song.has_audio"
              class="item-op-star item-op-all"
              title="我喜欢"
              @click.stop="loveSong(idx)"
            >
              <div>
                <i-ic-round-favorite-border
                  v-show="!isLoved[idx]"
                  class="svg-icons"
                />
                <i-ic-round-favorite
                  v-show="isLoved[idx]"
                  class="svg-icons"
                  style="color: red"
                />
              </div>
            </div>
            <div v-show="!song.has_audio" class="item-op-none">
              {{
                song.days_before_available > 0
                  ? song.days_before_available + '天后可听'
                  : '暂无音频'
              }}
            </div>
          </div>
          <div
            class="all-column-info item-column-info"
            @click="addSong(idx, true)"
          >
            <div class="song-name all-column all-column-name">
              {{ song.name }}
            </div>
            <div class="song-info-artist">
              <div class="song-artist all-column all-column-artist">
                {{ song.artist }}
              </div>
              <div class="song-status all-column all-column-status">
                {{ song.status }}
              </div>
            </div>
            <div class="song-info-date">
              <div class="song-date all-column all-column-date">
                {{ song.date }}
              </div>
              <div class="song-duration all-column all-column-duration">
                {{ song.duration }}
              </div>
            </div>
          </div>
          <div
            class="item-column-details all-column all-column-details"
            @click.stop="expandSong(idx)"
          >
            {{ isExpanded[idx] ? '...收起' : '详细...' }}
          </div>
        </div>
        <div v-show="isExpanded[idx]" class="song-list-item-details">
          <div class="song-full-details-language">
            语言: {{ song.language }}
          </div>
          <div
            v-show="song.orginal_artist !== ''"
            class="song-full-details-orginal"
          >
            原唱: {{ song.orginal_artist }}
          </div>
          <div v-show="song.ref !== false" class="song-full-details-ref">
            参考的路灯man:
            <a
              :href="'https://space.bilibili.com/' + song.ref.uid"
              target="_blank"
              rel="noreferrer noopener"
            >
              @{{ song.ref.name }}
            </a>
          </div>
          <div class="song-full-details-record">
            <span>录播/切片/视频：</span>
            <a
              :href="
                'https://www.bilibili.com/video/' +
                song.record.bv +
                (song.record.p ? '?p=' + song.record.p : '') +
                (song.record_start_ms > 0
                  ? '&start_progress=' + song.record_start_ms
                  : '')
              "
              target="_blank"
              rel="noreferrer noopener"
            >
              {{ song.date }}
              {{
                song.record.p ? 'p' + song.record.p + song.record.timecode : ''
              }}
            </a>
          </div>
          <div v-show="song.note !== ''" class="song-full-details-note">
            备注: {{ song.note }}
          </div>
          <div
            v-show="song.ref_cut !== false"
            class="song-full-details-ref-cut"
          >
            音频提供:
            <a
              :href="'https://space.bilibili.com/' + song.ref_cut.uid"
              target="_blank"
              rel="noreferrer noopener"
            >
              @{{ song.ref_cut.name }}
            </a>
          </div>
        </div>
      </div>
      <div v-show="songList.length === 0" class="song-list-no-item">
        无结果...
      </div>
    </div>
    <SongListPagination
      v-model:page="page"
      v-model:perPage="perPage"
      :total="songListFiltered.length"
      @update:page="pageChangeEvent"
    ></SongListPagination>
  </div>
</template>

<style scoped>
@import '@/styles/mainsonglist.scss';
</style>
