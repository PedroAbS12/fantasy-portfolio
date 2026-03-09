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
              <!-- Connector -->
              <div class="timeline-connector">
                <div class="connector-icon">{{ item.icon }}</div>
                <div v-if="i < experience.experience.length - 1" class="connector-line"></div>
              </div>

              <!-- Card -->
              <div class="pixel-box timeline-card p-4 ms-3">
                <!-- Header -->
                <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h4 class="item-role">{{ item.role }}</h4>
                    <p class="item-company mb-0">🏰 {{ item.company }}</p>
                  </div>
                  <span class="item-period">📅 {{ item.period }}</span>
                </div>

                <!-- Description -->
                <p class="item-desc mb-3">{{ item.description }}</p>

                <!-- Achievements -->
                <div class="achievements mb-3">
                  <p class="achiev-label mb-2">🏆 Logros:</p>
                  <ul class="achiev-list">
                    <li v-for="ach in item.achievements" :key="ach" class="achiev-item">
                      <span class="achiev-bullet">▸</span> {{ ach }}
                    </li>
                  </ul>
                </div>

                <!-- Tech pills -->
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

<script setup>
import experience from '@/data/experience.json'
</script>

<style scoped>
.py-section { padding: 6rem 0; }

.col-title {
  font-size: 0.7rem;
  color: var(--pixel-cyan);
  border-left: 4px solid var(--pixel-cyan);
  padding-left: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Timeline */
.timeline { position: relative; }

.timeline-item {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  animation: slide-up 0.5s ease both;
}

.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 44px;
  flex-shrink: 0;
}

.connector-icon {
  width: 44px;
  height: 44px;
  border: 3px solid var(--pixel-gold);
  background: var(--pixel-navy);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 0 10px rgba(255,215,0,0.3), 2px 2px 0 #000;
  flex-shrink: 0;
  z-index: 1;
}

.connector-line {
  width: 3px;
  flex: 1;
  min-height: 20px;
  background: linear-gradient(180deg, var(--pixel-gold), var(--pixel-border));
  margin-top: 4px;
}

/* Cards */
.timeline-card {
  flex: 1;
  animation: pixel-in 0.5s ease both;
}
.timeline-card:hover { transform: translateX(3px); transition: transform 0.1s steps(2); }

.edu-cert { border-color: var(--pixel-gold); box-shadow: 4px 4px 0 var(--pixel-gold-dark), 0 0 15px rgba(255,215,0,0.1); }

.item-role    { font-size: 0.55rem; color: var(--pixel-gold); margin-bottom: 4px; }
.item-company { font-family: var(--font-retro); font-size: 1rem; color: var(--pixel-cyan); }
.item-period  { font-family: var(--font-pixel); font-size: 0.38rem; color: var(--pixel-gray); white-space: nowrap; }
.item-desc    { font-family: var(--font-retro); font-size: 1rem; color: var(--pixel-white); line-height: 1.7; }

.achiev-label { font-family: var(--font-pixel); font-size: 0.4rem; color: var(--pixel-amber); }
.achiev-list  { list-style: none; padding: 0; margin: 0; }
.achiev-item  { font-family: var(--font-retro); font-size: 0.95rem; color: var(--pixel-gray); margin-bottom: 4px; display: flex; gap: 8px; }
.achiev-bullet { color: var(--pixel-gold); flex-shrink: 0; }
</style>
