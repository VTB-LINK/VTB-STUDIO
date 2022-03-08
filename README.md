# Lite Studio

以 csv 文件作为数据库的纯前端音乐播放器，使用 vite 进行构建

# CHANGE LOG

- 2022-02-05
  - 从[这里](https://github.com/K-bai/csv-based-web-music-player)fork 代码

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
npm run preview
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cn.vitejs.dev/config/#configuring-vite).

## Task List

- [x] vue3 project creation with vite.
- [x] Refactor csv-based-web-music-player modules into vue3 compisation API base.
- [x] Implement requests based on axios
- [x] Implement local cache based on indexed lib dexie.
- [ ] Implement save playlist to localstorage feature
- [ ] Use lodash to implemmnt shuffle for the audio play shuffle mode.

## Project Dev Guideline

### Project Branche

Main: feature development for origin lite web studio. Please use the origin to contribute. No pull request will be accepted for this branch.
A-soul: A-soul customzied version of lite web studio, any new feature pull request please submit to here.
Release: branch for auto deplyment to [AS 录音棚 CN](https://studio.asf.ink/) or [AS 录音棚 Global](https://studio.a-soul.fans/)

### Directory Structure

```
LITE-WEB-STUDIO
├─public
│  └─datasheets
└─src
    ├─apis
    ├─assets
    │  └─ui
    ├─components
    │  └─popup
    ├─globals
    ├─styles
    └─utils
```

- public: 公共资源目录
  - datasheets: 数据库文件存放
- src: 项目代码
  - apis: 远程调用 API 格纳
  - assets: 静态资源
    - ui: ui 相关 svg 格纳
  - components: 播放器控件
    - popup: 弹窗相关功能子控件
  - globals: 全局变量结构定义，全局常量设置
  - styles: 各界面式样文件
  - utils: 共通处理

### CSV File Reference
**注意**：各属性前后请勿留存空格
|  Field Name  |       Type      |   Mandatory   |  Description  |
| :---         | :---            |     :---:     | :---          |
| id           | String          | Yes           | 格式:**A000000**。唯一ID。A之后请使用CSV自动递增赋值。页面内控件显示状态等有关，和歌曲资源访问无关。    |
| 日期         | Date             | Yes           | 格式:**YYYY.MM.DD**。请不要省略单数字月日前面的0，保持01，02这样的数值。歌曲采集的录播所在日期。和歌曲名共通决定歌曲资源寻址。 |
| 录播来源      | String          | No            | 用来提供B站相关录播传送门。          |
| 录播片段编号  | Number          | No            | B站录播的分P号。配合**录播来源**和**起始时间点**以及**结束时间点**可以定位跳转B站相关录播节点。          |
| 起始时间点    | Number          | Yes           | B站分P起始时间点。分P未收录是使用0代替。分P存在时格式**00:00:00.000**          |
| 结束时间点    | Number          | Yes           | B站分P起始时间点。**起始时间点**为0时，请使用歌曲ms数记录总歌曲时长。分P存在时格式**00:00:00.000**          |
| 歌名         | String          | Yes           | 歌曲资源文件名。需要和资源文件保持一致，否则会音频加载失败。          |
| 中文歌名      | String          | No            | 歌名之后显示在括号里的内容，可以用作歌曲的备注添加用。          |
| 原曲艺术家    | String          | No            | 原曲作者信息。          |
| 演唱者        | String          | Yes           | 收录曲演唱者。多人存在的情况下请使用英文""和,来记载多人合唱信息，如："AA,BB"。       |
| 演唱状态      | String          | Yes           | 是否整首演唱或者片段。          |
| 语言         | String          |  Yes          | 歌曲演唱语言。          |
| 备注         | String          | No            | 关于歌曲较长的备注信息。          |
| 参考路灯man   | String          | No            | 歌曲切片提供者信息          |
| 有没有音频    | Boolean         | Yes           | TRUE或者FALSE。用来标注是否歌曲切片已被收录入库并处在可以播放的状态。       |
| 切片源        | String          | No           | 切片来自的源文件传送门。          |
| 有没有第二版本 | Boolean         | Yes          | TRUE或者FALSE。用来标注是否歌曲切片存在优化版本或单曲版本已被收录入库处在可以播放的状态。            |

### Naming Convention

- 变量名，函数参数：Camel Case 小驼峰式命名法：首字母小写。开头单词为名词。eg：studentInfo、userInfo
- 方法名：Camel Case 小驼峰式命名法：首字母小写。开头单词为动词。eg：canRead、getName
- 函数内局部临时变量名: 前导下划线小字母。 eg：\_studentinfo, \_username
- 组件名，全局变量名：Pascal Case 大驼峰式命名法：首字母大写。eg：AudiooPlayer、HelloWorld
- 全局变量属性名，缓存对象名,object 属性名：Snake Case 蛇形命名法。全小写字母借由下划线连接。eg：empty_song、code_src
- bus event 事件名称：Kebab Case 短横线命名。单词以 ‘-’ 短横线连接，最后以 event 结尾。eg：update-song-list-event
