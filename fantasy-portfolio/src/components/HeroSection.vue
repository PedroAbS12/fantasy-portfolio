<template>
  <section id="hero" class="hero-section">
    <!-- Floating particles -->
    <div class="particles">
      <span v-for="p in particles" :key="p.id" class="particle" :style="p.style">{{ p.char }}</span>
    </div>

    <div class="container">
      <div class="row align-items-center min-vh-100 py-5">

        <!-- Left: Avatar & Stats -->
        <div class="col-lg-4 text-center mb-5 mb-lg-0">
          <div class="character-card pixel-box p-4 d-inline-block">
            <!-- Avatar frame -->
            <div class="avatar-frame mb-3">
              <img :src="hero.avatar" alt="avatar" class="pixel-avatar" />
              <div class="avatar-glow"></div>
            </div>

            <!-- Level badge -->
            <div class="level-badge mb-3">
              <span class="badge-label">LVL</span>
              <span class="badge-num">{{ hero.level }}</span>
            </div>

            <!-- Class -->
            <div class="hero-class mb-3">{{ hero.class }}</div>

            <!-- HP / MP bars -->
            <div class="stat-bars">
              <div class="stat-row mb-2">
                <span class="stat-icon">❤️</span>
                <span class="stat-name">HP</span>
                <div class="xp-bar-wrap flex-grow-1">
                  <div class="xp-bar-fill bar-red" style="width:88%"></div>
                </div>
                <span class="stat-val">88/100</span>
              </div>
              <div class="stat-row mb-2">
                <span class="stat-icon">💙</span>
                <span class="stat-name">MP</span>
                <div class="xp-bar-wrap flex-grow-1">
                  <div class="xp-bar-fill bar-cyan" style="width:95%"></div>
                </div>
                <span class="stat-val">95/100</span>
              </div>
              <div class="stat-row">
                <span class="stat-icon">⭐</span>
                <span class="stat-name">XP</span>
                <div class="xp-bar-wrap flex-grow-1">
                  <div class="xp-bar-fill" style="width:72%"></div>
                </div>
                <span class="stat-val">720/1000</span>
              </div>
            </div>

            <!-- Availability -->
            <div class="availability mt-3" :class="hero.availableForHire ? 'available' : 'busy'">
              <span class="avail-dot"></span>
              {{ hero.availableForHire ? '✅ Available for hire' : '⏳ Currently busy' }}
            </div>
          </div>
        </div>

        <!-- Right: Hero info -->
        <div class="col-lg-8">
          <div class="hero-content">
            <!-- Greeting -->
            <div class="greeting mb-2">
              <span class="greeting-text">{{ greetingText }}</span><span class="cursor-blink">▋</span>
            </div>

            <!-- Name -->
            <h1 class="hero-name mb-2">
              <span class="name-highlight">{{ hero.name }}</span>
            </h1>

            <!-- Title -->
            <h2 class="hero-title mb-4">
              <span class="title-bracket">[</span>
              {{ hero.title }}
              <span class="title-bracket">]</span>
            </h2>

            <!-- Bio -->
            <div class="pixel-box p-4 mb-4 bio-box">
              <p class="bio-text mb-0">{{ hero.bio }}</p>
            </div>

            <!-- Quick stats -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3" v-for="(val, key) in hero.stats" :key="key">
                <div class="quick-stat pixel-box p-3 text-center">
                  <div class="stat-number">{{ val }}{{ key === 'coffeeConsumed' ? '+' : '' }}</div>
                  <div class="stat-label">{{ statLabels[key] }}</div>
                </div>
              </div>
            </div>

            <!-- CTAs -->
            <div class="hero-ctas d-flex flex-wrap gap-3">
              <a :href="`mailto:${hero.email}`" class="pixel-btn">
                <i class="bi bi-envelope-fill me-2"></i>Contactar
              </a>
              <a :href="hero.social.github" target="_blank" class="pixel-btn btn-cyan-px">
                <i class="bi bi-github me-2"></i>GitHub
              </a>
              <a :href="hero.social.linkedin" target="_blank" class="pixel-btn" style="border-color:#0077b5;color:#0077b5;box-shadow:4px 4px 0 #004466">
                <i class="bi bi-linkedin me-2"></i>LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-hint">
      <span class="scroll-text">SCROLL DOWN</span>
      <div class="scroll-arrow">▼</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import hero from '@/data/hero.json'

const greetingText = ref('')
const fullGreeting = '> Bienvenido al portafolio de'

const statLabels = {
  projectsCompleted: 'Proyectos',
  yearsExperience: 'Años XP',
  technologiesMastered: 'Tecnologías',
  coffeeConsumed: 'Cafés ☕'
}

// Typing effect
onMounted(() => {
  let i = 0
  const type = () => {
    if (i < fullGreeting.length) {
      greetingText.value += fullGreeting[i++]
      setTimeout(type, 60)
    }
  }
  setTimeout(type, 500)
})

// Floating particles
const chars = ['⚔️','🔮','💻','📊','🐉','⭐','💎','🗡️','📜','🏆']
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  char: chars[i % chars.length],
  style: {
    left: `${Math.random() * 100}%`,
    top:  `${Math.random() * 100}%`,
    animationDuration: `${3 + Math.random() * 4}s`,
    animationDelay:    `${Math.random() * 3}s`,
    fontSize: `${0.8 + Math.random() * 1.2}rem`,
    opacity: 0.15 + Math.random() * 0.3
  }
}))
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: 80px;
  overflow: hidden;
}

/* Particles */
.particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.particle {
  position: absolute;
  animation: float linear infinite;
  will-change: transform;
}

/* Character card */
.character-card {
  position: relative;
  animation: float 4s ease-in-out infinite;
  max-width: 280px;
}

.avatar-frame {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border: 4px solid var(--pixel-gold);
  box-shadow: 0 0 20px rgba(255,215,0,0.4), inset 0 0 10px rgba(0,0,0,0.5);
  background: var(--pixel-darker);
  overflow: hidden;
}

.pixel-avatar {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  object-fit: cover;
}

.avatar-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1), transparent 70%);
  animation: pulse-glow 2s ease-in-out infinite;
}

.level-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid var(--pixel-gold);
  padding: 4px 12px;
  background: var(--pixel-darker);
}
.badge-label { font-family: var(--font-pixel); font-size: 0.45rem; color: var(--pixel-gray); }
.badge-num   { font-family: var(--font-pixel); font-size: 0.9rem; color: var(--pixel-gold); text-shadow: 0 0 10px var(--pixel-gold); }

.hero-class {
  font-family: var(--font-pixel);
  font-size: 0.5rem;
  color: var(--pixel-cyan);
  letter-spacing: 0.05em;
}

.stat-bars { width: 100%; }
.stat-row { display: flex; align-items: center; gap: 6px; font-family: var(--font-pixel); font-size: 0.4rem; }
.stat-icon { font-size: 0.8rem; }
.stat-name { color: var(--pixel-gray); min-width: 20px; }
.stat-val  { color: var(--pixel-white); min-width: 50px; text-align: right; }

.xp-bar-fill.bar-red {
  background: linear-gradient(90deg, #660011, var(--pixel-red));
  box-shadow: 0 0 8px var(--pixel-red);
}

.availability {
  font-family: var(--font-pixel);
  font-size: 0.4rem;
  padding: 6px 10px;
  border: 2px solid;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.available { border-color: var(--pixel-green); color: var(--pixel-green); }
.busy      { border-color: var(--pixel-amber); color: var(--pixel-amber); }
.avail-dot {
  width: 8px; height: 8px;
  border-radius: 0;
  background: currentColor;
  animation: blink 1s step-end infinite;
}

/* Hero text */
.hero-content { position: relative; z-index: 1; }

.greeting { font-family: var(--font-pixel); font-size: 0.55rem; color: var(--pixel-cyan); }
.cursor-blink { animation: blink 1s step-end infinite; color: var(--pixel-cyan); }

.hero-name {
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  color: var(--pixel-white);
  text-shadow: 3px 3px 0 #000, 0 0 30px rgba(255,255,255,0.2);
}
.name-highlight {
  background: linear-gradient(135deg, var(--pixel-gold), var(--pixel-amber), var(--pixel-gold));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

.hero-title { color: var(--pixel-gray); }
.title-bracket { color: var(--pixel-gold); opacity: 0.7; }

.bio-box { border-left: 4px solid var(--pixel-gold); }
.bio-text { font-size: 1.15rem; color: var(--pixel-white); line-height: 1.8; }

.quick-stat {
  animation: slide-up 0.6s ease both;
}
.quick-stat:nth-child(1) { animation-delay: 0.1s; }
.quick-stat:nth-child(2) { animation-delay: 0.2s; }
.quick-stat:nth-child(3) { animation-delay: 0.3s; }
.quick-stat:nth-child(4) { animation-delay: 0.4s; }

.stat-number { font-family: var(--font-pixel); font-size: 0.9rem; color: var(--pixel-gold); text-shadow: 0 0 10px var(--pixel-gold); }
.stat-label  { font-family: var(--font-pixel); font-size: 0.35rem; color: var(--pixel-gray); margin-top: 4px; }

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: float 2s ease-in-out infinite;
}
.scroll-text  { font-family: var(--font-pixel); font-size: 0.4rem; color: var(--pixel-gray); display: block; margin-bottom: 6px; }
.scroll-arrow { font-family: var(--font-pixel); font-size: 1rem; color: var(--pixel-gold); animation: blink 1.5s step-end infinite; }
</style>
