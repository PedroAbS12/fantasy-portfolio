<template>
  <footer class="pixel-footer">
    <div class="footer-top-border"></div>
    <div class="container py-4">
      <div class="row align-items-center">
        <div class="col-md-4 text-center text-md-start mb-3 mb-md-0">
          <div class="footer-brand">⚔️ DEV.QUEST</div>
          <p class="footer-sub">Forged with 💻 & ☕</p>
        </div>
        <div class="col-md-4 text-center mb-3 mb-md-0">
          <p class="footer-copy">© {{ year }} — {{ hero.name }}</p>
          <p class="footer-built">Built with Vue 3 + Bootstrap 5</p>
        </div>
        <div class="col-md-4 text-center text-md-end">
          <button class="pixel-btn back-to-top" @click="scrollTop">
            ▲ VOLVER ARRIBA
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import hero from '@/data/hero.json'

export default {
  name: 'FooterSection',

  setup() {
    const year      = new Date().getFullYear()
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    return { hero, year, scrollTop }
  },
}
</script>
