<script>
export default defineComponent({
  name: "Banner",
});
</script>

<template>
  <div class="c-title card">
    <div class="banner-video">
      <video playsinline="" autoplay="" loop="" muted="">
        <source
          src="@/assets/banner-lunette.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <div class="banner-logo">
      <!-- <img src="/favicon.svg" alt="logo" /> -->
    </div>
    <div class="title-info">
      <h1>Dionysus录音棚</h1>
      <div class="title-detail">
        <div>『靠近一点，好好看着我』</div>
        <div>「来自Dionysus酒吧的驻唱——黎酩 Lunette」</div>
        <div>
          还没关注？快给
          <a
            href="https://space.bilibili.com/1518468126"
            target="_blank"
            rel="noreferrer noopener"
            >@黎酩_Lunette
          </a>
          点点关注！
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/styles/banner.scss";
</style>
