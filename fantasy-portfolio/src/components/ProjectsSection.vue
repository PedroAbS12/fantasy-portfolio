<template>
  <section id="projects" class="py-section projects-bg">
    <div class="container">
      <h2 class="section-title">
        🗺️ MAPA DE PROYECTOS
      </h2>

      <!-- Filter bar -->
      <div class="filter-bar d-flex justify-content-center gap-3 mb-5 flex-wrap">
        <button
          v-for="f in filters"
          :key="f.value"
          class="pixel-btn"
          :class="{ 'active-filter': activeFilter === f.value }"
          @click="activeFilter = f.value"
        >
          {{ f.emoji }} {{ f.label }}
        </button>
      </div>

      <!-- Projects grid -->
      <div class="row g-4">
        <TransitionGroup name="project-anim">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="col-12 col-md-6 col-xl-4"
          >
            <div
              class="project-card pixel-box h-100"
              :class="{ 'featured-card': project.featured }"
              @click="openModal(project)"
            >
              <!-- Featured badge -->
              <div v-if="project.featured" class="featured-badge">⭐ FEATURED</div>

              <!-- Image -->
              <div class="project-image-wrap">
                <img :src="project.image" :alt="project.title" class="project-img" />
                <div class="image-overlay">
                  <span class="view-text">👁️ VER PROYECTO</span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-4">
                <!-- Header -->
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h3 class="project-title mb-1">{{ project.title }}</h3>
                    <p class="project-subtitle mb-0">{{ project.subtitle }}</p>
                  </div>
                  <div class="difficulty-badge" :class="`diff-${project.difficulty}`">
                    {{ diffIcons[project.difficulty] }}
                  </div>
                </div>

                <!-- Description -->
                <p class="project-desc mb-3">{{ truncate(project.description, 100) }}</p>

                <!-- Tags -->
                <div class="mb-3">
                  <span
                    v-for="tag in project.tags.slice(0,4)"
                    :key="tag"
                    class="pixel-badge"
                    :class="tagColor(tag)"
                  >{{ tag }}</span>
                  <span v-if="project.tags.length > 4" class="pixel-badge badge-gray">
                    +{{ project.tags.length - 4 }}
                  </span>
                </div>

                <!-- Footer -->
                <div class="project-footer d-flex justify-content-between align-items-center">
                  <span class="project-year">📅 {{ project.year }}</span>
                  <span class="project-status" :class="`status-${project.status}`">
                    {{ statusText[project.status] }}
                  </span>
                </div>

                <!-- Links -->
                <div class="project-links mt-3 d-flex gap-2 flex-wrap">
                  <a
                    v-if="project.links.live"
                    :href="project.links.live"
                    target="_blank"
                    class="pixel-btn btn-cyan-px"
                    style="font-size:0.38rem;padding:6px 10px"
                    @click.stop
                  ><i class="bi bi-globe2 me-1"></i>Demo</a>
                  <a
                    v-if="project.links.github"
                    :href="project.links.github"
                    target="_blank"
                    class="pixel-btn"
                    style="font-size:0.38rem;padding:6px 10px"
                    @click.stop
                  ><i class="bi bi-github me-1"></i>Code</a>
                  <a
                    v-if="project.links.video"
                    :href="project.links.video"
                    target="_blank"
                    class="pixel-btn btn-danger-px"
                    style="font-size:0.38rem;padding:6px 10px"
                    @click.stop
                  ><i class="bi bi-play-fill me-1"></i>Video</a>
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
          <p class="empty-text mt-3">No se encontraron proyectos en esta categoría</p>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content pixel-box">
            <button class="modal-close pixel-btn btn-danger-px" @click="closeModal">✕ CERRAR</button>

            <img :src="selectedProject.image" :alt="selectedProject.title" class="modal-img mb-4" />

            <div class="px-2">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 class="modal-title">{{ selectedProject.title }}</h2>
                  <p class="modal-subtitle">{{ selectedProject.subtitle }}</p>
                </div>
                <span class="difficulty-badge" :class="`diff-${selectedProject.difficulty}`">
                  {{ diffLabels[selectedProject.difficulty] }}
                </span>
              </div>

              <p class="modal-desc mb-4">{{ selectedProject.description }}</p>

              <!-- Tags -->
              <div class="mb-4">
                <h4 class="modal-section-title mb-2">🛠️ TECNOLOGÍAS</h4>
                <span v-for="tag in selectedProject.tags" :key="tag"
                  class="pixel-badge" :class="tagColor(tag)">{{ tag }}</span>
              </div>

              <!-- Links -->
              <div>
                <h4 class="modal-section-title mb-2">🔗 LINKS</h4>
                <div class="d-flex gap-3 flex-wrap">
                  <a v-if="selectedProject.links.live" :href="selectedProject.links.live" target="_blank" class="pixel-btn btn-cyan-px">
                    <i class="bi bi-globe2 me-2"></i>Ver Demo
                  </a>
                  <a v-if="selectedProject.links.github" :href="selectedProject.links.github" target="_blank" class="pixel-btn">
                    <i class="bi bi-github me-2"></i>Ver Código
                  </a>
                  <a v-if="selectedProject.links.video" :href="selectedProject.links.video" target="_blank" class="pixel-btn btn-danger-px">
                    <i class="bi bi-play-fill me-2"></i>Ver Video
                  </a>
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

<script setup>
import { ref, computed } from 'vue'
import projectsData from '@/data/projects.json'

const projects = projectsData.featured
const activeFilter = ref('all')
const selectedProject = ref(null)

const filters = [
  { value: 'all',  label: 'Todos',    emoji: '🗺️' },
  { value: 'web',  label: 'Web Dev',  emoji: '⚔️' },
  { value: 'data', label: 'Data',     emoji: '🔮' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category === activeFilter.value)
})

const diffIcons  = { legendary: '🔥', epic: '⚡', rare: '💎', uncommon: '🗡️', common: '⚪' }
const diffLabels = { legendary: '🔥 LEGENDARY', epic: '⚡ EPIC', rare: '💎 RARE', uncommon: '🗡️ UNCOMMON', common: '⚪ COMMON' }
const statusText = { completed: '✅ Completado', 'in-progress': '🔄 En progreso', planned: '📋 Planeado' }

const tagColors = ['badge-gold','badge-cyan','badge-green','badge-purple','badge-pink']
const tagColorMap = {}
const tagColor = (tag) => {
  if (!tagColorMap[tag]) tagColorMap[tag] = tagColors[Object.keys(tagColorMap).length % tagColors.length]
  return tagColorMap[tag]
}

const truncate = (str, n) => str.length > n ? str.slice(0, n) + '...' : str

const openModal  = (p) => { selectedProject.value = p; document.body.style.overflow = 'hidden' }
const closeModal = ()  => { selectedProject.value = null; document.body.style.overflow = '' }
</script>

<style scoped>
.py-section { padding: 6rem 0; }
.projects-bg { background: linear-gradient(180deg, transparent, rgba(10,10,30,0.5), transparent); }

.active-filter {
  background: var(--pixel-gold) !important;
  color: var(--pixel-dark) !important;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--pixel-gold-dark) !important;
}

/* Project card */
.project-card {
  cursor: pointer;
  transition: transform 0.1s steps(2), box-shadow 0.1s steps(2);
  position: relative;
  overflow: hidden;
}
.project-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 #000, 0 0 20px rgba(255,215,0,0.1);
}
.featured-card { border-color: var(--pixel-gold); animation: pulse-glow 3s ease-in-out infinite; }

.featured-badge {
  position: absolute;
  top: 0; right: 0;
  font-family: var(--font-pixel);
  font-size: 0.4rem;
  background: var(--pixel-gold);
  color: var(--pixel-dark);
  padding: 4px 8px;
  z-index: 1;
}

.project-image-wrap { position: relative; overflow: hidden; height: 180px; background: var(--pixel-darker); }
.project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; image-rendering: pixelated; }
.project-card:hover .project-img { transform: scale(1.05); }

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(7,7,15,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.project-card:hover .image-overlay { opacity: 1; }
.view-text { font-family: var(--font-pixel); font-size: 0.5rem; color: var(--pixel-gold); }

.project-title   { font-size: 0.65rem; color: var(--pixel-white); }
.project-subtitle { font-family: var(--font-retro); font-size: 0.95rem; color: var(--pixel-cyan); }
.project-desc    { font-family: var(--font-retro); font-size: 1rem; color: var(--pixel-gray); line-height: 1.6; }

.difficulty-badge { font-size: 1.2rem; }

.project-year   { font-family: var(--font-pixel); font-size: 0.4rem; color: var(--pixel-gray); }
.project-status { font-family: var(--font-pixel); font-size: 0.38rem; }
.status-completed   { color: var(--pixel-green); }
.status-in-progress { color: var(--pixel-amber); }
.status-planned     { color: var(--pixel-gray); }

.badge-gray { border-color: var(--pixel-gray); color: var(--pixel-gray); }

/* Empty state */
.empty-icon { font-size: 3rem; }
.empty-text { font-family: var(--font-pixel); font-size: 0.5rem; color: var(--pixel-gray); }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(6px);
}
.modal-content {
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  scrollbar-width: thin;
}
.modal-close { position: absolute; top: 1rem; right: 1rem; z-index: 10; }
.modal-img { width: 100%; height: 220px; object-fit: cover; image-rendering: pixelated; }
.modal-title    { font-size: 0.8rem; color: var(--pixel-gold); }
.modal-subtitle { font-family: var(--font-retro); font-size: 1.1rem; color: var(--pixel-cyan); }
.modal-desc     { font-family: var(--font-retro); font-size: 1.1rem; color: var(--pixel-white); line-height: 1.8; }
.modal-section-title { font-size: 0.5rem; color: var(--pixel-gray); }

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(0.95); }

.project-anim-enter-active { transition: all 0.3s ease; }
.project-anim-leave-active { transition: all 0.2s ease; position: absolute; }
.project-anim-enter-from   { opacity: 0; transform: scale(0.9); }
.project-anim-leave-to     { opacity: 0; transform: scale(0.9); }
</style>
