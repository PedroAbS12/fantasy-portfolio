<template>
  <div class="app-wrapper scanlines">
    <!-- Navbar -->
    <NavBar />

    <!-- Main content -->
    <main>
      <HeroSection />
      <hr class="pixel-divider container" />
      <SkillsSection />
      <hr class="pixel-divider container" />
      <ProjectsSection />
      <hr class="pixel-divider container" />
      <ExperienceSection />
      <hr class="pixel-divider container" />
      <ContactSection />
    </main>

    <FooterSection />

    <!-- Boot screen overlay -->
    <Transition name="boot-fade">
      <div v-if="booting" class="boot-screen">
        <div class="boot-content">
          <div class="boot-logo">⚔️</div>
          <div class="boot-title">DEV.QUEST</div>
          <div class="boot-subtitle">Loading portfolio...</div>
          <div class="boot-bar-wrap mt-4">
            <div class="boot-bar" :style="{ width: bootProgress + '%' }"></div>
          </div>
          <div class="boot-percent mt-2">{{ bootProgress }}%</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const booting = ref(true)
const bootProgress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    bootProgress.value += Math.floor(Math.random() * 15) + 5
    if (bootProgress.value >= 100) {
      bootProgress.value = 100
      clearInterval(interval)
      setTimeout(() => { booting.value = false }, 400)
    }
  }, 120)
})
</script>

<style scoped>
/* Boot screen */
.boot-screen {
  position: fixed;
  inset: 0;
  background: var(--pixel-darker);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.boot-content { padding: 2rem; }

.boot-logo {
  font-size: 4rem;
  animation: float 1s ease-in-out infinite;
  display: block;
  margin-bottom: 1rem;
}

.boot-title {
  font-family: var(--font-pixel);
  font-size: clamp(1.2rem, 5vw, 2rem);
  color: var(--pixel-gold);
  text-shadow: 0 0 30px var(--pixel-gold), 4px 4px 0 var(--pixel-gold-dark);
  margin-bottom: 0.5rem;
}

.boot-subtitle {
  font-family: var(--font-pixel);
  font-size: 0.5rem;
  color: var(--pixel-cyan);
  animation: blink 1s step-end infinite;
}

.boot-bar-wrap {
  width: 280px;
  height: 20px;
  border: 3px solid var(--pixel-gold);
  background: var(--pixel-darker);
  margin: 0 auto;
}

.boot-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--pixel-gold-dark), var(--pixel-gold));
  box-shadow: 0 0 10px var(--pixel-gold);
  transition: width 0.1s steps(5);
}

.boot-percent {
  font-family: var(--font-pixel);
  font-size: 0.5rem;
  color: var(--pixel-gold);
}

.boot-fade-leave-active { transition: opacity 0.5s ease; }
.boot-fade-leave-to     { opacity: 0; }
</style>
