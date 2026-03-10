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
          :class="{ 'active-tab': activeCategory === cat.id }"
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
                <div class="bar-markers">
                  <span v-for="m in [25, 50, 75]" :key="m" class="bar-marker" :style="{ left: `${m}%` }"></span>
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

<script>
import { ref, computed, onMounted } from 'vue'
import skills from '@/data/skills.json'

export default {
  name: 'SkillsSection',

  setup() {
    const activeCategory = ref('all')
    const animated       = ref(false)

    const filteredCategories = computed(() => {
      if (activeCategory.value === 'all') return skills.categories
      return skills.categories.filter(c => c.id === activeCategory.value)
    })

    const legend = [
      { label: 'Web Dev',  color: 'var(--pixel-gold)'   },
      { label: 'Data',     color: 'var(--pixel-cyan)'   },
      { label: 'Backend',  color: 'var(--pixel-green)'  },
      { label: 'Advanced', color: 'var(--pixel-violet)' },
    ]

    onMounted(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { animated.value = true; observer.disconnect() }
      }, { threshold: 0.1 })
      const el = document.getElementById('skills')
      if (el) observer.observe(el)
    })

    return { skills, activeCategory, animated, filteredCategories, legend }
  },
}
</script>
