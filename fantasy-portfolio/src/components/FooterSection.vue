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

<script setup>
import hero from '@/data/hero.json'
const year = new Date().getFullYear()
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<style scoped>
.pixel-footer {
  background: var(--pixel-darker);
  position: relative;
}
.footer-top-border {
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--pixel-gold), transparent);
  box-shadow: 0 0 10px var(--pixel-gold);
}
.footer-brand { font-family: var(--font-pixel); font-size: 0.7rem; color: var(--pixel-gold); }
.footer-sub   { font-family: var(--font-retro); font-size: 1rem; color: var(--pixel-gray); margin: 0; }
.footer-copy  { font-family: var(--font-pixel); font-size: 0.4rem; color: var(--pixel-gray); margin: 0; }
.footer-built { font-family: var(--font-retro); font-size: 0.9rem; color: var(--pixel-border); margin: 0; }
.back-to-top  { font-size: 0.42rem; padding: 8px 14px; }
</style>
