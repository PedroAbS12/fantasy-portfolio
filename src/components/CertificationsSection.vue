<template>
  <section id="certifications" class="py-section">
    <div class="container">
      <h2 class="section-title">🏆 SALA DE TROFEOS</h2>

      <!-- Category filters -->
      <div class="filter-bar d-flex justify-content-center gap-3 mb-5 flex-wrap">
        <button
          class="pixel-btn"
          :class="{ 'active-filter': activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          🏅 Todos ({{ certifications.certifications.length }})
        </button>
        <button
          v-for="cat in certifications.categories"
          :key="cat.id"
          class="pixel-btn"
          :class="{ 'active-filter': activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.name }} ({{ countByCategory(cat.id) }})
        </button>
      </div>

      <!-- Grid -->
      <div class="row g-4">
        <TransitionGroup name="cert-anim">
          <div
            v-for="cert in filteredCerts"
            :key="cert.id"
            class="col-12 col-sm-6 col-xl-4"
          >
            <div
              class="cert-card pixel-box h-100"
              :class="`border-${categoryColor(cert.category)}`"
              @click="openModal(cert)"
            >
              <!-- Diploma preview or placeholder -->
              <div class="cert-image-wrap">
                <img
                  v-if="cert.image"
                  :src="cert.image"
                  :alt="cert.title"
                  class="cert-img"
                />
                <div v-else class="cert-placeholder">
                  <div class="placeholder-scroll">📜</div>
                  <div class="placeholder-text">VER CERTIFICADO</div>
                </div>
                <div class="cert-overlay">
                  <span class="overlay-icon">🔍</span>
                </div>
                <div class="cert-ribbon" :class="`ribbon-${categoryColor(cert.category)}`">
                  {{ categoryName(cert.category) }}
                </div>
              </div>

              <!-- Info -->
              <div class="p-4">
                <h3 class="cert-title mb-1">{{ cert.title }}</h3>
                <p class="cert-issuer mb-3">🏛️ {{ cert.issuer }}</p>

                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="cert-date">📅 {{ cert.date }}</span>
                  <span v-if="cert.credentialId" class="cert-id">ID: {{ cert.credentialId }}</span>
                </div>

                <div class="mb-3">
                  <span
                    v-for="skill in cert.skills"
                    :key="skill"
                    class="pixel-badge"
                    :class="`badge-${categoryColor(cert.category)}`"
                  >{{ skill }}</span>
                </div>

                <div class="d-flex gap-2 flex-wrap mt-auto">
                  <button
                    class="pixel-btn cert-link-sm"
                    @click.stop="openModal(cert)"
                  >🔍 Ver diploma</button>
                  <a
                    v-if="cert.verifyUrl"
                    :href="cert.verifyUrl"
                    target="_blank"
                    class="pixel-btn btn-cyan-px cert-link-sm"
                    @click.stop
                  >✅ Verificar</a>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Empty state -->
      <div v-if="filteredCerts.length === 0" class="text-center py-5">
        <div class="pixel-box p-5 d-inline-block">
          <div class="cert-empty-icon">🔍</div>
          <p class="cert-empty-text mt-3">Sin certificados en esta categoría</p>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="cert-stats pixel-box p-4 mt-5">
        <div class="row text-center g-3">
          <div class="col-6 col-md-3" v-for="cat in certifications.categories" :key="cat.id">
            <div class="stat-num" :class="`color-${cat.color}`">{{ countByCategory(cat.id) }}</div>
            <div class="stat-lbl">{{ cat.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal diploma viewer -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selected" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content pixel-box">
            <button class="modal-close pixel-btn btn-danger-px" @click="closeModal">✕ CERRAR</button>

            <h2 class="modal-title mb-1">{{ selected.title }}</h2>
            <p class="modal-issuer mb-4">🏛️ {{ selected.issuer }} — 📅 {{ selected.date }}</p>

            <div class="diploma-frame mb-4">
              <img
                v-if="selected.image"
                :src="selected.image"
                :alt="selected.title"
                class="diploma-img"
              />
              <div v-else class="diploma-placeholder">
                <div class="dp-decoration">
                  <div class="dp-border">
                    <div class="dp-inner">
                      <div class="dp-icon">🏆</div>
                      <div class="dp-cert-text">CERTIFICATE OF COMPLETION</div>
                      <div class="dp-name">{{ selected.title }}</div>
                      <div class="dp-issuer">{{ selected.issuer }}</div>
                      <div class="dp-date">{{ selected.date }}</div>
                      <div v-if="selected.credentialId" class="dp-id">ID: {{ selected.credentialId }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <p class="modal-skills-label mb-2">🛠️ HABILIDADES OBTENIDAS</p>
                <span
                  v-for="s in selected.skills"
                  :key="s"
                  class="pixel-badge"
                  :class="`badge-${categoryColor(selected.category)}`"
                >{{ s }}</span>
              </div>
              <a
                v-if="selected.verifyUrl"
                :href="selected.verifyUrl"
                target="_blank"
                class="pixel-btn btn-cyan-px"
              >✅ Verificar credencial</a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import certifications from '@/data/certifications.json'

export default {
  name: 'CertificationsSection',

  setup() {
    const activeCategory = ref('all')
    const selected       = ref(null)

    const filteredCerts = computed(() => {
      if (activeCategory.value === 'all') return certifications.certifications
      return certifications.certifications.filter(c => c.category === activeCategory.value)
    })

    const countByCategory = (id) =>
      certifications.certifications.filter(c => c.category === id).length

    const categoryColor = (id) =>
      certifications.categories.find(c => c.id === id)?.color ?? 'gold'

    const categoryName = (id) =>
      certifications.categories.find(c => c.id === id)?.name ?? ''

    const openModal  = (cert) => { selected.value = cert; document.body.style.overflow = 'hidden' }
    const closeModal = ()     => { selected.value = null;  document.body.style.overflow = '' }

    return { certifications, activeCategory, selected, filteredCerts, countByCategory, categoryColor, categoryName, openModal, closeModal }
  },
}
</script>
