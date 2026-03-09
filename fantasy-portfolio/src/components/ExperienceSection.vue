<template>
  <section id="experience" class="py-section">
    <div class="container">
      <h2 class="section-title">📜 REGISTRO DE AVENTURAS</h2>

      <div class="row g-5">

        <!-- Work experience -->
        <div class="col-12 col-lg-7">
          <h3 class="col-title mb-4">⚔️ EXPERIENCIA</h3>
          <div class="timeline">
            <div
              v-for="(item, i) in experience.experience"
              :key="item.id"
              class="timeline-item"
              :style="{ animationDelay: `${i * 0.15}s` }"
            >
              <div class="timeline-connector">
                <div class="connector-icon">{{ item.icon }}</div>
                <div v-if="i < experience.experience.length - 1" class="connector-line"></div>
              </div>

              <div class="pixel-box timeline-card p-4 ms-3">
                <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h4 class="item-role">{{ item.role }}</h4>
                    <p class="item-company mb-0">🏰 {{ item.company }}</p>
                  </div>
                  <span class="item-period">📅 {{ item.period }}</span>
                </div>

                <p class="item-desc mb-3">{{ item.description }}</p>

                <div class="achievements mb-3">
                  <p class="achiev-label mb-2">🏆 Logros:</p>
                  <ul class="achiev-list">
                    <li v-for="ach in item.achievements" :key="ach" class="achiev-item">
                      <span class="achiev-bullet">▸</span> {{ ach }}
                    </li>
                  </ul>
                </div>

                <div>
                  <span v-for="t in item.tech" :key="t" class="pixel-badge badge-gold me-1">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="col-12 col-lg-5">
          <h3 class="col-title mb-4">🎓 FORMACIÓN</h3>
          <div class="timeline">
            <div
              v-for="(item, i) in experience.education"
              :key="item.id"
              class="timeline-item"
              :style="{ animationDelay: `${(i + experience.experience.length) * 0.15}s` }"
            >
              <div class="timeline-connector">
                <div class="connector-icon">{{ item.icon }}</div>
                <div v-if="i < experience.education.length - 1" class="connector-line"></div>
              </div>

              <div class="pixel-box timeline-card p-4 ms-3" :class="{ 'edu-cert': item.type === 'certification' }">
                <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h4 class="item-role">{{ item.role }}</h4>
                    <p class="item-company mb-0">🏛️ {{ item.company }}</p>
                  </div>
                  <span class="item-period">📅 {{ item.period }}</span>
                </div>

                <p class="item-desc mb-3">{{ item.description }}</p>

                <div class="achievements mb-3">
                  <ul class="achiev-list">
                    <li v-for="ach in item.achievements" :key="ach" class="achiev-item">
                      <span class="achiev-bullet">▸</span> {{ ach }}
                    </li>
                  </ul>
                </div>

                <div>
                  <span v-for="t in item.tech" :key="t" class="pixel-badge badge-cyan me-1">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import experience from '@/data/experience.json'

export default {
  name: 'ExperienceSection',

  setup() {
    return { experience }
  },
}
</script>
