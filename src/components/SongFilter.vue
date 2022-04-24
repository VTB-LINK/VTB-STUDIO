<script>
export default defineComponent({
  name: 'SongFilter'
});
</script>

<script setup>
import utils from 'utils/utils.js';
import bus from 'vue3-eventbus';
import ExplainTreatedPopUp from 'popup/ExplainTreated.vue';
import intersection from 'lodash.intersection';
import shuffle from 'lodash.shuffle';
import { Search, Refresh } from '@element-plus/icons-vue';
import IconEditModeOn from '~icons/ic/outline-edit';
import IconEditModeOff from '~icons/ic/outline-edit-off';

const props = defineProps({
  songListFiltered: Array,
  cachedList: Array,
  loveList: Array
});

const emit = defineEmits(['update:songListFiltered']);

const songListOrg = ref(window.AudioLists.song_list);
const songCollection = ref(window.AudioLists.song_collection);
const showCollapseIndexes = ref([]);
const useTreated = ref(window.Variables.use_treated.value);
const songMyCollection = ref();
const tagCollectionName = ref('');
const tagInputRef = ref(null);
const showExplain = ref(false);
const artistExactMacth = ref(false);
const tagInputVisible = ref(false);
const tagEditable = ref(false);
const filterCollection = ref(null);
const filters = reactive([
  {
    name: 'artist',
    text: '演唱者',
    value: '',
    options: window.FilterOptions.artist
  },
  {
    name: 'status',
    text: '演唱状态',
    value: '',
    options: window.FilterOptions.status
  },
  {
    name: 'language',
    text: '语言',
    value: '',
    options: window.FilterOptions.language
  },
  {
    name: 'month',
    text: '月份',
    value: '',
    options: window.FilterOptions.month
  },
  {
    name: 'loved',
    text: '收藏',
    value: '',
    options: window.FilterOptions.loved
  },
  {
    name: 'has_audio',
    text: '音频有无',
    value: '',
    options: window.FilterOptions.has_audio
  },
  {
    name: 'order',
    text: '排序',
    value: '时间倒序',
    options: window.FilterOptions.order
  }
]);
const search = ref({
  text: '',
  textForSearch: '',
  type: '歌名',
  options: window.FilterOptions.search_type
});

const selfSongListFiltered = computed(() => {
  let _templist = songListOrg.value.slice();
  let filter = {};
  for (const item of filters) filter[item.name] = item.value;
  // 筛选歌单
  if (filterCollection.value !== null) _templist = filterCollection.value;
  // 筛选演唱状态
  if (filter.status !== '')
    _templist = _templist.filter((song) => song.status === filter.status);
  // 筛选语言
  if (filter.language !== '')
    _templist = _templist.filter((song) => song.language === filter.language);
  // 筛选演唱者
  if (filter.artist.length) {
    _templist = _templist.filter((song) => {
      const _artistList = song.artist.split(',');
      let _result = false;
      if (filter.artist.length === 1)
        _result =
          _artistList.findIndex((a) => filter.artist.includes(a)) !== -1;
      else
        _result =
          intersection(_artistList, filter.artist).length ===
          filter.artist.length;
      return artistExactMacth.value
        ? _result && _artistList.length == filter.artist.length
        : _result;
    });
  }
  // 筛选月份
  if (filter.month !== '')
    _templist = _templist.filter(
      (song) => song.date.substring(0, 7) === filter.month
    );
  // 筛选星标
  if (filter.loved === '已收藏')
    _templist = _templist.filter(
      (song) =>
        window.AudioLists.love_list.findIndex((love) => song.id === love) !== -1
    );
  else if (filter.loved === '未收藏')
    _templist = _templist.filter(
      (song) =>
        window.AudioLists.love_list.findIndex((love) => song.id === love) === -1
    );
  // 筛选是否有音频
  if (filter.has_audio === '有音频')
    _templist = _templist.filter((song) => song.has_audio);
  else if (filter.has_audio === '无音频')
    _templist = _templist.filter((song) => !song.has_audio);
  // 筛选搜索
  if (search.value.textForSearch !== '') {
    if (search.value.type === '歌名')
      _templist = _templist.filter(
        (song) =>
          song.name
            .toLowerCase()
            .search(search.value.textForSearch.toLowerCase()) !== -1
      );
    else {
      _templist = _templist.filter((song) => {
        const _text = search.value.textForSearch.toLowerCase();
        let _flag = false;
        _flag = _flag || song.name.toLowerCase().search(_text) !== -1;
        if (song.note !== '')
          _flag = _flag || song.note.toLowerCase().search(_text) !== -1;
        if (song.ref)
          _flag = _flag || song.ref.name.toLowerCase().search(_text) !== -1;
        if (song.ref_cut)
          _flag = _flag || song.ref_cut.name.toLowerCase().search(_text) !== -1;
        return _flag;
      });
    }
  }
  // 排序
  if (filter.order === '时间正序') _templist.reverse();
  return _templist;
});

const isTagModeSwticherShown = computed(() => {
  return showCollapseIndexes.value.includes('2');
});

watch(
  () => [...showCollapseIndexes.value],
  (newValues, oldValues) => {
    if (newValues.indexOf('2') !== newValues.lastIndexOf('2'))
      console.log(oldValues, newValues);
  }
);

const applySearch = (clear) => {
  if (clear) search.value.text = '';
  search.value.textForSearch = search.value.text.trim();
  filterChangeEvent();
};

const filterChangeEvent = () => {
  emit('update:songListFiltered', selfSongListFiltered.value);
};

const replaceCollection = (songList) => {
  bus.emit(
    'playlist-replace-event',
    songList.filter((s) => s.has_audio)
  );
};

const filterByCollection = (songList) => {
  filterCollection.value = songList;
  applySearch(false);
};

const clearFilters = () => {
  for (const item of filters) {
    if (item.name === 'order') item.value = '时间倒序';
    else item.value = '';
  }
  filterCollection.value = null;
  applySearch(true);
};

const searchPressEnter = (event) => {
  applySearch(false);
  event.target.blur();
};

const changeUseTreated = () => {
  window.Variables.use_treated.value = useTreated.value;
  utils.saveSettings({
    use_treated: useTreated.value
  });
};

const calculateSelectWidth = (list, mutipleflag) => {
  let _length = 4;
  if (list.length) {
    _length = [
      ...list.reduce((acc, val) => {
        return acc.length >= val.length ? acc : val;
      })
    ].reduce((count, char) => count + Math.min(new Blob([char]).size, 2), 0);
  }
  return `width: ${Math.ceil(_length / 2) + (mutipleflag ? 11 : 4)}rem`;
};

const switchStylePicker = () => {
  return shuffle(['#9AC8E2', '#DB7D74', '#B8A6D9', '#E799B0', '#576690'])[0];
};

const showInput = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    tagInputRef.value?.input?.focus();
  });
};

const clickCollection = (idx) => {
  if (tagEditable.value)
    tagCollectionName.value = songMyCollection.value[idx].name;
  else replaceCollection(songMyCollection.value[idx].list);
};

const addMyCollection = () => {
  //隐藏input
  tagInputVisible.value = false;
  // 没写名字就不管
  if (tagCollectionName.value === '') return;
  // 歌单是空的就不管
  if (window.AudioLists.playlist[0].id === 'empty_song') return;
  // 查找同名歌单
  let idx = songMyCollection.value
    .map((c) => c.name)
    .findIndex((n) => n === tagCollectionName.value);
  if (idx !== -1) {
    // 已有同名就更新
    songMyCollection.value[idx].list = [...window.AudioLists.playlist];
  } else {
    // 否则新建
    songMyCollection.value.push({
      name: tagCollectionName.value,
      list: [...window.AudioLists.playlist]
    });
  }
  // 写入localstorage
  utils.saveMyCollection(songMyCollection.value);
  // 清空input值
  tagCollectionName.value = '';

  ElMessage({
    message: '保存到本地完毕！',
    type: 'success'
  });
};

const dropMyCollection = (idx) => {
  songMyCollection.value.splice(idx, 1);
  tagEditable.value = false;
};

const chgTagMode = () => {
  //防止反复点击时候无限添加标签导致关闭时需要额外点击的问题
  if (
    showCollapseIndexes.value.indexOf('2') ===
    showCollapseIndexes.value.lastIndexOf('2')
  )
    showCollapseIndexes.value.push('2');
  tagInputVisible.value = tagEditable.value ? true : false;
};

onMounted(() => {
  bus.on('apply-search-event', applySearch);
  bus.on('apply-search-event', () => {
    if (!window.Variables.is_mobile_device) showCollapseIndexes.value = ['1'];
    songMyCollection.value = utils.readMyCollection();
  });
});
</script>

<template>
  <div class="c-outer card">
    <el-collapse
      v-model="showCollapseIndexes"
      style="border-top: 0px; border-bottom: 0px"
    >
      <el-collapse-item name="1">
        <template #title>
          <div class="title title-filter">
            <div class="title">推荐</div>
          </div>
        </template>
        <div class="c-song-collection">
          <div
            v-for="collection in songCollection"
            :key="collection.name"
            class="collection-item"
            @click="filterByCollection(collection.list)"
          >
            <i-ic-outline-local-offer class="collection-icon" />
            <div>{{ collection.name }}</div>
          </div>
          <div class="collection-item" @click="filterByCollection(cachedList)">
            <i-ic-outline-sim-card-download class="collection-icon" />
            <div>本地缓存</div>
          </div>
          <div class="collection-item" @click="filterByCollection(loveList)">
            <i-ic-round-favorite class="collection-icon" style="color: red" />
            <div>已收藏</div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2" :disabled="tagEditable">
        <template #title>
          <div class="title title-filter">
            <div class="title">
              歌单
              <el-switch
                v-show="isTagModeSwticherShown"
                v-model="tagEditable"
                inline-prompt
                :active-icon="IconEditModeOn"
                :inactive-icon="IconEditModeOff"
                @click="chgTagMode"
              />
            </div>
          </div>
        </template>
        <div class="c-song-collection">
          <el-tag
            v-for="(collection, index) in songMyCollection"
            :key="collection.name"
            class="collect-tag"
            :closable="tagEditable"
            :disable-transitions="false"
            round
            size="large"
            checked
            @close="dropMyCollection(index)"
            @click="clickCollection(index)"
          >
            <div>
              <i-ic-outline-collections-bookmark />{{ collection.name }}
            </div>
          </el-tag>
          <el-input
            v-if="tagInputVisible"
            ref="tagInputRef"
            v-model="tagCollectionName"
            class="collect-tag-input"
            size="default"
            @keyup.enter="addMyCollection"
            @blur="addMyCollection"
          />
          <el-button
            v-else
            class="collect-tag-add"
            size="default"
            @click="showInput"
          >
            <i-ic-outline-save-as /> {{ tagEditable ? '编辑歌单' : '保存歌单' }}
          </el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <div class="title title-filter">
            <div class="title">筛选</div>
          </div>
        </template>
        <div class="c-filter">
          <div
            v-for="filter_item in filters"
            :key="filter_item.name"
            class="filter-item"
          >
            <div class="filter-item-label">
              <div>{{ filter_item.text }}:</div>
              <el-switch
                v-if="filter_item.name == 'artist'"
                v-model="artistExactMacth"
                inline-prompt
                active-text="精确"
                inactive-text="模糊"
                :width="50"
                :active-color="switchStylePicker()"
                inactive-color="#FC966E"
              />
            </div>
            <el-select
              v-model="filter_item.value"
              :multiple="filter_item.name == 'artist'"
              clearable
              placeholder="--"
              :style="
                calculateSelectWidth(
                  filter_item.options,
                  filter_item.name == 'artist'
                )
              "
            >
              <el-option
                v-for="option in filter_item.options"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </div>
          <div class="filter-item">
            <input
              id="filter-checkbox-treated"
              v-model="useTreated"
              class="general-checkbox"
              type="checkbox"
              @change="changeUseTreated"
            />
            <label
              for="filter-checkbox-treated"
              class="filter-item-label filter-item-treated"
              >听经过处理的歌</label
            >
            <div class="filter-item-question" @click="showExplain = true">
              <i-ic-outline-quiz />
            </div>
          </div>
        </div>
        <ExplainTreatedPopUp
          v-if="showExplain"
          @closepopup="showExplain = false"
        />
      </el-collapse-item>
    </el-collapse>
    <div class="filter-song-search">
      <el-input
        v-model="search.text"
        placeholder="请输入搜索信息"
        class="input-with-select"
        clearable
        @clear="applySearch(true)"
        @change="searchPressEnter"
      >
        <template #prepend>
          <el-select
            v-model="search.type"
            placeholder="Select"
            style="width: 5rem"
            fit-input-width
          >
            <el-option
              v-for="option in search.options"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </template>
        <template #append>
          <el-button
            :icon="Search"
            style="padding-right: 2em"
            @click="applySearch(false)"
          />
          <el-divider direction="vertical" />
          <el-button
            :icon="Refresh"
            style="padding-left: 2em"
            @click="clearFilters"
          />
        </template>
      </el-input>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/songfilter.scss';
</style>
