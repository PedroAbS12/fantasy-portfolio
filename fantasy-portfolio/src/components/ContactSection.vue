<template>
  <section id="contact" class="py-section contact-section">
    <div class="container">
      <h2 class="section-title">📨 ENVIAR MENSAJE</h2>
      <p class="contact-sub text-center mb-5">¿Tienes una misión para mí? ¡Contáctame!</p>

      <div class="row g-5 justify-content-center">

        <!-- Contact info -->
        <div class="col-12 col-lg-4">
          <div class="pixel-box p-4 contact-info-box h-100">
            <h3 class="info-title mb-4">⚔️ CONEXIÓN DIRECTA</h3>

            <div class="contact-item mb-4" v-for="item in contactItems" :key="item.label">
              <div class="item-icon">{{ item.icon }}</div>
              <div>
                <p class="item-label mb-1">{{ item.label }}</p>
                <a :href="item.href" target="_blank" class="item-value">{{ item.value }}</a>
              </div>
            </div>

            <hr class="pixel-divider my-4" style="margin:1.5rem 0" />

            <h4 class="social-title mb-3">🌐 REDES</h4>
            <div class="social-grid">
              <a :href="hero.social.github"   target="_blank" class="social-btn github-btn">
                <i class="bi bi-github"></i><span>GitHub</span>
              </a>
              <a :href="hero.social.linkedin" target="_blank" class="social-btn linkedin-btn">
                <i class="bi bi-linkedin"></i><span>LinkedIn</span>
              </a>
              <a :href="hero.social.twitter"  target="_blank" class="social-btn twitter-btn">
                <i class="bi bi-twitter-x"></i><span>Twitter</span>
              </a>
              <a v-if="hero.social.portfolio" :href="hero.social.portfolio" target="_blank" class="social-btn web-btn">
                <i class="bi bi-globe2"></i><span>Web</span>
              </a>
            </div>

            <!-- Status card -->
            <div class="status-card mt-4 pixel-box p-3" :class="hero.availableForHire ? 'status-open' : 'status-closed'">
              <div class="d-flex align-items-center gap-2">
                <div class="status-light"></div>
                <div>
                  <p class="status-main mb-0">
                    {{ hero.availableForHire ? '✅ DISPONIBLE' : '⏳ NO DISPONIBLE' }}
                  </p>
                  <p class="status-sub mb-0">
                    {{ hero.availableForHire ? 'Para proyectos freelance y full-time' : 'Actualmente ocupado' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact form -->
        <div class="col-12 col-lg-7">
          <div class="pixel-box p-5 form-box">
            <h3 class="form-title mb-4">💬 NUEVO MENSAJE</h3>

            <!-- Form sent message -->
            <Transition name="fade-up">
              <div v-if="sent" class="success-msg pixel-box p-4 text-center mb-4">
                <div class="success-icon">🎉</div>
                <p class="success-text mt-2">¡Mensaje enviado! Te responderé pronto.</p>
              </div>
            </Transition>

            <div v-if="!sent">
              <!-- Name -->
              <div class="mb-4">
                <label class="field-label">👤 NOMBRE *</label>
                <div class="pixel-input-wrap">
                  <input
                    v-model="form.name"
                    type="text"
                    class="pixel-input"
                    :class="{ error: errors.name }"
                    placeholder="Tu nombre aquí..."
                  />
                </div>
                <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
              </div>

              <!-- Email -->
              <div class="mb-4">
                <label class="field-label">📧 EMAIL *</label>
                <div class="pixel-input-wrap">
                  <input
                    v-model="form.email"
                    type="email"
                    class="pixel-input"
                    :class="{ error: errors.email }"
                    placeholder="tu@email.com"
                  />
                </div>
                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
              </div>

              <!-- Subject -->
              <div class="mb-4">
                <label class="field-label">📋 ASUNTO</label>
                <div class="pixel-input-wrap">
                  <select v-model="form.subject" class="pixel-input">
                    <option value="">Selecciona una misión...</option>
                    <option value="freelance">🗡️ Proyecto Freelance</option>
                    <option value="fulltime">⚔️ Oportunidad Full-time</option>
                    <option value="collab">🤝 Colaboración</option>
                    <option value="consult">🔮 Consultoría de Datos</option>
                    <option value="other">💬 Otro</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div class="mb-4">
                <label class="field-label">✉️ MENSAJE *</label>
                <div class="pixel-input-wrap">
                  <textarea
                    v-model="form.message"
                    class="pixel-input"
                    :class="{ error: errors.message }"
                    rows="5"
                    placeholder="Describe tu misión aquí..."
                  ></textarea>
                </div>
                <div class="d-flex justify-content-between">
                  <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
                  <span class="char-count ms-auto" :class="{ warn: form.message.length > 400 }">
                    {{ form.message.length }}/500
                  </span>
                </div>
              </div>

              <!-- Submit -->
              <button
                class="pixel-btn w-100 submit-btn"
                @click="submitForm"
                :disabled="loading"
              >
                <span v-if="!loading">⚔️ ENVIAR MENSAJE ⚔️</span>
                <span v-else class="loading-text">ENVIANDO<span class="dots">{{ loadingDots }}</span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import hero from '@/data/hero.json'

const form = ref({ name: '', email: '', subject: '', message: '' })
const errors = ref({})
const sent = ref(false)
const loading = ref(false)
const loadingDots = ref('.')

const contactItems = [
  { icon: '📧', label: 'EMAIL', value: hero.email, href: `mailto:${hero.email}` },
  { icon: '📍', label: 'UBICACIÓN', value: hero.location.replace('📍 ', ''), href: '#' },
]

const validate = () => {
  const e = {}
  if (!form.value.name.trim())    e.name = '⚠️ El nombre es requerido'
  if (!form.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = '⚠️ Email inválido'
  if (!form.value.message.trim()) e.message = '⚠️ El mensaje es requerido'
  if (form.value.message.length > 500) e.message = '⚠️ Máximo 500 caracteres'
  errors.value = e
  return Object.keys(e).length === 0
}

let dotsInterval
const submitForm = () => {
  if (!validate()) return
  loading.value = true
  let count = 0
  dotsInterval = setInterval(() => { loadingDots.value = '.'.repeat((++count % 3) + 1) }, 400)

  // Simulate submission (replace with actual API call)
  setTimeout(() => {
    clearInterval(dotsInterval)
    loading.value = false
    sent.value = true
    // Open mailto as fallback
    const subject = encodeURIComponent(form.value.subject || 'Contacto desde portfolio')
    const body    = encodeURIComponent(`Nombre: ${form.value.name}\n\n${form.value.message}`)
    window.location.href = `mailto:${hero.email}?subject=${subject}&body=${body}`
  }, 1800)
}

onUnmounted(() => clearInterval(dotsInterval))
</script>

<style scoped>
.py-section { padding: 6rem 0; }
.contact-section { background: linear-gradient(180deg, transparent, rgba(10,0,30,0.4), transparent); }

.contact-sub { font-family: var(--font-retro); font-size: 1.1rem; color: var(--pixel-gray); }

/* Info box */
.info-title { font-size: 0.55rem; color: var(--pixel-gold); }
.contact-item { display: flex; gap: 14px; align-items: flex-start; }
.item-icon   { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
.item-label  { font-family: var(--font-pixel); font-size: 0.38rem; color: var(--pixel-gray); }
.item-value  { font-family: var(--font-retro); font-size: 1rem; color: var(--pixel-cyan); text-decoration: none; }
.item-value:hover { color: var(--pixel-gold); }

.social-title { font-size: 0.48rem; color: var(--pixel-gray); }
.social-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.social-btn {
  font-family: var(--font-pixel);
  font-size: 0.4rem;
  padding: 8px 12px;
  border: 2px solid var(--pixel-border);
  background: var(--pixel-darker);
  color: var(--pixel-gray);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.1s steps(2);
}
.social-btn i { font-size: 1rem; }
.social-btn:hover { transform: translate(-2px, -2px); box-shadow: 2px 2px 0 #000; }
.github-btn:hover   { border-color: var(--pixel-white); color: var(--pixel-white); }
.linkedin-btn:hover { border-color: #0077b5; color: #0077b5; }
.twitter-btn:hover  { border-color: var(--pixel-cyan); color: var(--pixel-cyan); }
.web-btn:hover      { border-color: var(--pixel-gold); color: var(--pixel-gold); }

.status-card { border-width: 2px; }
.status-open  { border-color: var(--pixel-green); }
.status-closed { border-color: var(--pixel-amber); }
.status-light {
  width: 12px; height: 12px; flex-shrink: 0;
  background: var(--pixel-green);
  animation: blink 1.5s step-end infinite;
}
.status-closed .status-light { background: var(--pixel-amber); }
.status-main { font-family: var(--font-pixel); font-size: 0.42rem; color: var(--pixel-green); }
.status-closed .status-main { color: var(--pixel-amber); }
.status-sub  { font-family: var(--font-retro); font-size: 0.85rem; color: var(--pixel-gray); }

/* Form */
.form-title  { font-size: 0.6rem; color: var(--pixel-gold); }
.field-label { font-family: var(--font-pixel); font-size: 0.42rem; color: var(--pixel-gray); display: block; margin-bottom: 8px; }
.field-error { font-family: var(--font-pixel); font-size: 0.38rem; color: var(--pixel-red); }

.pixel-input-wrap { position: relative; }
.pixel-input {
  width: 100%;
  background: var(--pixel-darker);
  border: 3px solid var(--pixel-border);
  color: var(--pixel-white);
  font-family: var(--font-retro);
  font-size: 1.1rem;
  padding: 10px 14px;
  outline: none;
  resize: none;
  transition: border-color 0.1s steps(2);
  -webkit-appearance: none;
}
.pixel-input:focus { border-color: var(--pixel-gold); box-shadow: 0 0 10px rgba(255,215,0,0.2); }
.pixel-input.error { border-color: var(--pixel-red); }
.pixel-input option { background: var(--pixel-darker); }

.char-count { font-family: var(--font-pixel); font-size: 0.38rem; color: var(--pixel-gray); }
.char-count.warn { color: var(--pixel-red); }

.submit-btn {
  font-size: 0.55rem;
  padding: 14px;
  letter-spacing: 0.1em;
  text-align: center;
  transition: all 0.1s steps(2);
}
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: 4px 4px 0 var(--pixel-gold-dark); }

.loading-text { font-family: var(--font-pixel); }
.dots { display: inline-block; min-width: 20px; }

/* Success */
.success-icon { font-size: 2.5rem; }
.success-text { font-family: var(--font-pixel); font-size: 0.5rem; color: var(--pixel-green); }

.fade-up-enter-active { transition: all 0.4s ease; }
.fade-up-enter-from   { opacity: 0; transform: translateY(20px); }
</style>
