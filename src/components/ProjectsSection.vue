<template>
  <section id="projects" class="py-section projects-bg">
    <div class="container">
      <h2 class="section-title">🗺️ MAPA DE PROYECTOS</h2>

      <!-- ── Origin tabs ── -->
      <div class="origin-tabs d-flex justify-content-center gap-2 mb-4 flex-wrap">
        <button
          v-for="o in originTabs"
          :key="o.value"
          class="origin-tab"
          :class="{ 'origin-tab--active': activeOrigin === o.value }"
          @click="activeOrigin = o.value; activeCategory = 'all'"
        >
          <span class="origin-tab__icon">{{ o.emoji }}</span>
          <span class="origin-tab__label">{{ o.label }}</span>
          <span class="origin-tab__count">{{ countByOrigin(o.value) }}</span>
        </button>
      </div>

      <!-- ── Category filters ── -->
      <div class="filter-bar d-flex justify-content-center gap-2 mb-5 flex-wrap">
        <button
          v-for="f in availableCategories"
          :key="f.value"
          class="pixel-btn category-btn"
          :class="{ 'active-filter': activeCategory === f.value }"
          @click="activeCategory = f.value"
        >
          {{ f.emoji }} {{ f.label }}
          <span class="cat-count">({{ countByCategory(f.value) }})</span>
        </button>
      </div>

      <!-- ── Projects grid ── -->
      <div class="row g-4">
        <TransitionGroup name="project-anim">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="col-12 col-md-6 col-xl-4"
          >
            <div
              class="project-card pixel-box h-100"
              :class="[
                { 'featured-card': project.featured },
                `origin-border--${project.origin}`
              ]"
              @click="openModal(project)"
            >
              <!-- Badges row -->
              <div class="card-badges">
                <span v-if="project.featured" class="featured-badge">⭐ FEATURED</span>
                <span class="origin-badge" :class="`origin-badge--${project.origin}`">
                  {{ originLabel(project.origin) }}
                </span>
              </div>

              <!-- Image -->
              <div class="project-image-wrap">
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="project-img"
                />
                <div v-else class="project-img-placeholder">
                  <span class="placeholder-emoji">{{ categoryEmoji(project.category) }}</span>
                </div>
                <div class="image-overlay">
                  <span class="view-text">👁️ VER PROYECTO</span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div class="flex-grow-1 me-2">
                    <h3 class="project-title mb-1">{{ project.title }}</h3>
                    <p class="project-subtitle mb-0">{{ project.subtitle }}</p>
                  </div>
                  <div class="difficulty-badge" :title="diffLabels[project.difficulty]">
                    {{ diffIcons[project.difficulty] }}
                  </div>
                </div>

                <p class="project-desc mb-3">{{ truncate(project.description, 110) }}</p>

                <!-- Tags -->
                <div class="mb-3">
                  <span
                    v-for="tag in project.tags.slice(0, 4)"
                    :key="tag"
                    class="pixel-badge"
                    :class="tagColor(tag)"
                  >{{ tag }}</span>
                  <span v-if="project.tags.length > 4" class="pixel-badge badge-gray">
                    +{{ project.tags.length - 4 }}
                  </span>
                </div>

                <!-- Footer -->
                <div class="project-footer d-flex justify-content-between align-items-center mb-3">
                  <span class="project-year">📅 {{ project.year }}</span>
                  <span class="project-status" :class="`status-${project.status}`">
                    {{ statusText[project.status] }}
                  </span>
                </div>

                <!-- Links -->
                <div class="project-links d-flex gap-2 flex-wrap">
                  <a v-if="project.links.live"   :href="project.links.live"   target="_blank" class="pixel-btn btn-cyan-px link-sm" @click.stop>
                    <i class="bi bi-globe2 me-1"></i>Demo
                  </a>
                  <a v-if="project.links.github" :href="project.links.github" target="_blank" class="pixel-btn link-sm" @click.stop>
                    <i class="bi bi-github me-1"></i>Code
                  </a>
                  <a v-if="project.links.video"  :href="project.links.video"  target="_blank" class="pixel-btn btn-danger-px link-sm" @click.stop>
                    <i class="bi bi-play-fill me-1"></i>Video
                  </a>
                  <span v-if="!project.links.live && !project.links.github && !project.links.video"
                    class="no-links-text">Sin links públicos</span>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Empty state -->
      <div v-if="filteredProjects.length === 0" class="text-center py-5">
        <div class="empty-state pixel-box p-5 d-inline-block">
          <div class="empty-icon">🔍</div>
          <p class="empty-text mt-3">No se encontraron proyectos</p>
        </div>
      </div>

      <!-- Stats summary -->
      <div class="projects-stats pixel-box p-4 mt-5">
        <div class="row text-center g-3">
          <div class="col-4" v-for="o in originTabs.filter(t => t.value !== 'all')" :key="o.value">
            <div class="pstat-num" :class="`pstat-${o.value}`">{{ countByOrigin(o.value) }}</div>
            <div class="pstat-label">{{ o.emoji }} {{ o.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Project Modal ── -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content pixel-box">
            <button class="modal-close pixel-btn btn-danger-px" @click="closeModal">✕ CERRAR</button>

            <!-- Modal image -->
            <div class="modal-img-wrap">
              <img
                v-if="selectedProject.image"
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="modal-img"
              />
              <div v-else class="modal-img-placeholder">
                <span>{{ categoryEmoji(selectedProject.category) }}</span>
              </div>
              <!-- Origin ribbon on modal -->
              <div class="modal-origin-ribbon" :class="`origin-badge--${selectedProject.origin}`">
                {{ originLabel(selectedProject.origin) }}
              </div>
            </div>

            <div class="p-4">
              <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                <div>
                  <h2 class="modal-title">{{ selectedProject.title }}</h2>
                  <p class="modal-subtitle mb-0">{{ selectedProject.subtitle }}</p>
                </div>
                <span class="diff-pill" :class="`diff-pill--${selectedProject.difficulty}`">
                  {{ diffIcons[selectedProject.difficulty] }} {{ diffLabels[selectedProject.difficulty] }}
                </span>
              </div>

              <p class="modal-desc mb-4">{{ selectedProject.description }}</p>

              <div class="mb-4">
                <h4 class="modal-section-title mb-2">🛠️ TECNOLOGÍAS</h4>
                <span v-for="tag in selectedProject.tags" :key="tag" class="pixel-badge" :class="tagColor(tag)">{{ tag }}</span>
              </div>

              <div>
                <h4 class="modal-section-title mb-2">🔗 LINKS</h4>
                <div class="d-flex gap-3 flex-wrap">
                  <a v-if="selectedProject.links.live"   :href="selectedProject.links.live"   target="_blank" class="pixel-btn btn-cyan-px"><i class="bi bi-globe2 me-2"></i>Ver Demo</a>
                  <a v-if="selectedProject.links.github" :href="selectedProject.links.github" target="_blank" class="pixel-btn"><i class="bi bi-github me-2"></i>Ver Código</a>
                  <a v-if="selectedProject.links.video"  :href="selectedProject.links.video"  target="_blank" class="pixel-btn btn-danger-px"><i class="bi bi-play-fill me-2"></i>Ver Video</a>
                  <span v-if="!selectedProject.links.live && !selectedProject.links.github && !selectedProject.links.video"
                    class="pixel-badge badge-gray">Sin links disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import projectsData from '@/data/projects.json'

export default {
  name: 'ProjectsSection',

  setup() {
    const projects        = projectsData.featured
    const activeOrigin    = ref('all')
    const activeCategory  = ref('all')
    const selectedProject = ref(null)

    // ── Origin tabs ──
    const originTabs = [
      { value: 'all',      label: 'Todos',          emoji: '🗺️' },
      { value: 'academic', label: 'Académico',       emoji: '🎓' },
      { value: 'work',     label: 'Laboral',         emoji: '💼' },
      { value: 'personal', label: 'Personal',        emoji: '🚀' },
    ]

    const originLabels = {
      academic: '🎓 Académico',
      work:     '💼 Laboral',
      personal: '🚀 Personal',
    }
    const originLabel = (o) => originLabels[o] ?? o

    // ── Category filters (all possible) ──
    const allCategories = [
      { value: 'all',         label: 'Todos',       emoji: '🔎' },
      { value: 'data',        label: 'Data / IA',   emoji: '🔮' },
      { value: 'web',         label: 'Web',         emoji: '⚔️' },
      { value: 'backend',     label: 'Backend',     emoji: '🖥️' },
      { value: 'ai',          label: 'Visión / IA', emoji: '🤖' },
      { value: 'engineering', label: 'Ingeniería',  emoji: '⚙️' },
    ]

    // Only show categories that exist in the current origin filter
    const availableCategories = computed(() => {
      const pool = activeOrigin.value === 'all'
        ? projects
        : projects.filter(p => p.origin === activeOrigin.value)
      const cats = new Set(pool.map(p => p.category))
      return allCategories.filter(c => c.value === 'all' || cats.has(c.value))
    })

    // ── Filtered projects ──
    const filteredProjects = computed(() => {
      let list = projects
      if (activeOrigin.value   !== 'all') list = list.filter(p => p.origin   === activeOrigin.value)
      if (activeCategory.value !== 'all') list = list.filter(p => p.category === activeCategory.value)
      return list
    })

    // ── Counts ──
    const countByOrigin   = (o) => o === 'all' ? projects.length : projects.filter(p => p.origin   === o).length
    const countByCategory = (c) => {
      const pool = activeOrigin.value === 'all' ? projects : projects.filter(p => p.origin === activeOrigin.value)
      return c === 'all' ? pool.length : pool.filter(p => p.category === c).length
    }

    // ── Difficulty ──
    const diffIcons  = { legendary: '🔥', epic: '⚡', rare: '💎', uncommon: '🗡️', common: '⚪', avanzado: '🔥', intermedio: '⚡', basico: '⚪' }
    const diffLabels = { legendary: 'LEGENDARY', epic: 'EPIC', rare: 'RARE', uncommon: 'UNCOMMON', common: 'COMMON', avanzado: 'AVANZADO', intermedio: 'INTERMEDIO', basico: 'BÁSICO' }

    // ── Status ──
    const statusText = {
      completed:    '✅ Completado',
      completado:   '✅ Completado',
      'in-progress': '🔄 En progreso',
      'en-progreso': '🔄 En progreso',
      planned:      '📋 Planeado',
    }

    // ── Category emoji for placeholder ──
    const categoryEmojis = { data: '📊', web: '💻', backend: '🖥️', ai: '🤖', engineering: '⚙️' }
    const categoryEmoji  = (c) => categoryEmojis[c] ?? '📁'

    // ── Tag colors ──
    const tagColors   = ['badge-gold', 'badge-cyan', 'badge-green', 'badge-purple', 'badge-pink']
    const tagColorMap = {}
    const tagColor = (tag) => {
      if (!tagColorMap[tag]) tagColorMap[tag] = tagColors[Object.keys(tagColorMap).length % tagColors.length]
      return tagColorMap[tag]
    }

    const truncate   = (str, n) => str.length > n ? str.slice(0, n) + '...' : str
    const openModal  = (p)      => { selectedProject.value = p;    document.body.style.overflow = 'hidden' }
    const closeModal = ()       => { selectedProject.value = null; document.body.style.overflow = '' }

    return {
      originTabs, activeOrigin, activeCategory, availableCategories,
      filteredProjects, selectedProject,
      originLabel, countByOrigin, countByCategory,
      diffIcons, diffLabels, statusText,
      categoryEmoji, tagColor, truncate,
      openModal, closeModal,
    }
  },
}
</script>
