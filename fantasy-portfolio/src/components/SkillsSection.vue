<template>
  <section id="skills" class="py-section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-prefix">⚡ </span>ÁRBOL DE HABILIDADES<span class="title-prefix"> ⚡</span>
      </h2>

      <!-- Category tabs -->
      <div class="skill-tabs d-flex justify-content-center gap-3 mb-5 flex-wrap">
        <button
          v-for="cat in skills.categories"
          :key="cat.id"
          class="pixel-btn"
          :class="{ 'active-tab': activeCategory === cat.id, [`btn-tab-${cat.color}`]: true }"
          @click="activeCategory = cat.id"
        >
          <i :class="`bi ${cat.icon} me-2`"></i>{{ cat.name }}
        </button>
      </div>

      <!-- Skills grid -->
      <TransitionGroup name="skills-fade" tag="div" class="row g-4">
        <div
          v-for="(cat, ci) in filteredCategories"
          :key="cat.id"
          class="col-12 col-lg-6"
        >
          <div class="pixel-box p-4 skill-card h-100">
            <h3 class="skill-category-title mb-4">{{ cat.name }}</h3>

            <div
              v-for="(skill, si) in cat.skills"
              :key="skill.name"
              class="skill-row mb-3"
              :style="{ animationDelay: `${(ci * 4 + si) * 0.05}s` }"
            >
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="skill-name">
                  <span class="skill-emoji me-2">{{ skill.icon }}</span>
                  {{ skill.name }}
                </span>
                <span class="skill-level" :class="`level-${skill.type}`">
                  {{ skill.level }}%
                </span>
              </div>
              <div class="xp-bar-wrap">
                <div
                  class="xp-bar-fill"
                  :class="`bar-${skill.type}`"
                  :style="{ width: animated ? `${skill.level}%` : '0%' }"
                ></div>
                <!-- Level markers -->
                <div class="bar-markers">
                  <span v-for="m in [25,50,75]" :key="m"
                    class="bar-marker" :style="{ left: `${m}%` }"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Legend -->
      <div class="skill-legend mt-5 d-flex justify-content-center gap-4 flex-wrap">
        <div class="legend-item" v-for="item in legend" :key="item.label">
          <div class="legend-bar" :style="{ background: item.color, boxShadow: `0 0 8px ${item.color}` }"></div>
          <span class="legend-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import skills from '@/data/skills.json'

const activeCategory = ref('all')
const animated = ref(false)

const filteredCategories = computed(() => {
  if (activeCategory.value === 'all') return skills.categories
  return skills.categories.filter(c => c.id === activeCategory.value)
})

const legend = [
  { label: 'Web Dev',   color: 'var(--pixel-gold)' },
  { label: 'Data',      color: 'var(--pixel-cyan)' },
  { label: 'Backend',   color: 'var(--pixel-green)' },
  { label: 'Advanced',  color: 'var(--pixel-violet)' },
]

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { animated.value = true; observer.disconnect() }
  }, { threshold: 0.1 })
  const el = document.getElementById('skills')
  if (el) observer.observe(el)
})
</script>

<style scoped>
.py-section { padding: 6rem 0; }

.title-prefix { color: var(--pixel-cyan); }

/* Tabs */
.active-tab {
  background: var(--pixel-gold) !important;
  color: var(--pixel-dark) !important;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--pixel-gold-dark) !important;
}

.skill-card {
  animation: slide-up 0.5s ease both;
}

.skill-category-title {
  font-size: 0.65rem;
  color: var(--pixel-cyan);
  border-bottom: 2px solid var(--pixel-border);
  padding-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.skill-row { animation: slide-up 0.4s ease both; }

.skill-name {
  font-family: var(--font-retro);
  font-size: 1.1rem;
  color: var(--pixel-white);
}

.skill-emoji { font-size: 1rem; }

.skill-level {
  font-family: var(--font-pixel);
  font-size: 0.4rem;
  min-width: 40px;
  text-align: right;
}
.level-gold   { color: var(--pixel-gold); }
.level-cyan   { color: var(--pixel-cyan); }
.level-green  { color: var(--pixel-green); }
.level-purple { color: var(--pixel-violet); }

.bar-markers { position: absolute; inset: 0; pointer-events: none; }
.bar-marker {
  position: absolute;
  top: 0; bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.1);
}

.xp-bar-wrap { position: relative; }

.xp-bar-fill.bar-purple {
  background: linear-gradient(90deg, #2a0a5e, var(--pixel-violet));
  box-shadow: 0 0 8px var(--pixel-violet);
}

/* Legend */
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-bar  { width: 30px; height: 8px; }
.legend-label { font-family: var(--font-pixel); font-size: 0.4rem; color: var(--pixel-gray); }

/* Transitions */
.skills-fade-enter-active { transition: all 0.3s ease; }
.skills-fade-leave-active { transition: all 0.2s ease; }
.skills-fade-enter-from   { opacity: 0; transform: translateY(20px); }
.skills-fade-leave-to     { opacity: 0; transform: translateY(-20px); }
</style>
