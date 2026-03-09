<template>
  <nav class="pixel-navbar" :class="{ scrolled: isScrolled }">
    <!-- Scanline effect -->
    <div class="nav-scanline"></div>

    <div class="container-fluid px-4">
      <div class="d-flex justify-content-between align-items-center">

        <!-- Brand -->
        <a class="nav-brand" href="#hero" @click.prevent="scrollTo('hero')">
          <span class="brand-text">{{ nav.brand }}</span>
          <span class="brand-cursor">▋</span>
        </a>

        <!-- Desktop Nav -->
        <ul class="nav-items d-none d-md-flex mb-0 ps-0">
          <li v-for="item in nav.items" :key="item.id" class="nav-item-px">
            <a
              :href="`#${item.id}`"
              class="nav-link-px"
              :class="{ active: activeSection === item.id }"
              @click.prevent="scrollTo(item.id)"
            >
              <span class="nav-emoji">{{ item.emoji }}</span>
              <span class="nav-label">{{ item.label }}</span>
            </a>
          </li>
        </ul>

        <!-- Mobile Toggle -->
        <button class="mobile-menu-btn d-md-none" @click="menuOpen = !menuOpen">
          <span>{{ menuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>

      <!-- Mobile Nav -->
      <Transition name="slide-down">
        <ul v-if="menuOpen" class="mobile-nav mt-2 mb-0 ps-0">
          <li v-for="item in nav.items" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="mobile-nav-link"
              :class="{ active: activeSection === item.id }"
              @click.prevent="scrollTo(item.id); menuOpen = false"
            >
              {{ item.emoji }} {{ item.label }}
            </a>
          </li>
        </ul>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import nav from '@/data/nav.json'

const isScrolled = ref(false)
const menuOpen = ref(false)
const activeSection = ref('hero')

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60

  const sections = nav.items.map(i => i.id)
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && window.scrollY >= el.offsetTop - 150) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.pixel-navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 12px 0;
  background: rgba(7, 7, 15, 0.7);
  border-bottom: 3px solid var(--pixel-border);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.pixel-navbar.scrolled {
  background: rgba(7, 7, 15, 0.95);
  border-bottom-color: var(--pixel-gold);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
}

.nav-scanline {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--pixel-gold), transparent);
  animation: shimmer 3s ease-in-out infinite;
  background-size: 200% auto;
}

.nav-brand {
  font-family: var(--font-pixel);
  font-size: 0.75rem;
  color: var(--pixel-gold);
  text-decoration: none;
  text-shadow: 0 0 10px var(--pixel-gold);
  letter-spacing: 0.1em;
}

.brand-cursor {
  animation: blink 1s step-end infinite;
  color: var(--pixel-gold);
}

.nav-items {
  list-style: none;
  display: flex;
  gap: 0.25rem;
}

.nav-link-px {
  font-family: var(--font-pixel);
  font-size: 0.45rem;
  color: var(--pixel-gray);
  text-decoration: none;
  padding: 8px 12px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.1s steps(2);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-link-px:hover,
.nav-link-px.active {
  color: var(--pixel-gold);
  border-color: var(--pixel-gold);
  background: rgba(255, 215, 0, 0.08);
  box-shadow: 2px 2px 0 var(--pixel-gold-dark), 0 0 10px rgba(255,215,0,0.2);
}

.nav-emoji { font-size: 0.85rem; }

.mobile-menu-btn {
  font-family: var(--font-pixel);
  font-size: 0.9rem;
  background: none;
  border: 2px solid var(--pixel-gold);
  color: var(--pixel-gold);
  padding: 6px 12px;
  cursor: pointer;
}

.mobile-nav {
  list-style: none;
  border-top: 2px solid var(--pixel-border);
  padding-top: 0.5rem;
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-pixel);
  font-size: 0.5rem;
  color: var(--pixel-gray);
  text-decoration: none;
  padding: 10px 8px;
  border-bottom: 1px solid var(--pixel-border);
  transition: all 0.1s;
  letter-spacing: 0.05em;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: var(--pixel-gold);
  padding-left: 16px;
}

.slide-down-enter-active,
.slide-down-leave-active { transition: all 0.2s ease; }
.slide-down-enter-from,
.slide-down-leave-to   { opacity: 0; transform: translateY(-10px); }
</style>
