<template>
  <section id="hero" class="hero-section">
    <!-- Floating particles -->
    <div class="container">
      <div class="row align-items-center min-vh-100 py-5">
        <!-- Left: Avatar & Stats -->
        <div class="col-lg-4 text-center mb-5 mb-lg-0">
          <div class="character-card pixel-box p-4 d-inline-block">
            <!-- Avatar frame -->
            <div class="avatar-frame mb-3">
              <div class="avatar-bg"></div>
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

            <!-- HP / MP / XP bars -->
            <div class="stat-bars">
              <div class="stat-row mb-2">
                <span class="stat-icon">❤️</span>
                <span class="stat-name">HP</span>
                <div class="xp-bar-wrap flex-grow-1">
                  <div class="xp-bar-fill bar-red" style="width: 88%"></div>
                </div>
                <span class="stat-val">88/100</span>
              </div>
              <div class="stat-row mb-2">
                <span class="stat-icon">💙</span>
                <span class="stat-name">MP</span>
                <div class="xp-bar-wrap flex-grow-1">
                  <div class="xp-bar-fill bar-cyan" style="width: 95%"></div>
                </div>
                <span class="stat-val">95/100</span>
              </div>
              <div class="stat-row">
                <span class="stat-icon">⭐</span>
                <span class="stat-name">XP</span>
                <div class="xp-bar-wrap flex-grow-1">
                  <div class="xp-bar-fill" style="width: 72%"></div>
                </div>
                <span class="stat-val">720/1000</span>
              </div>
            </div>

            <!-- Availability -->
            <div
              class="availability mt-3"
              :class="hero.availableForHire ? 'available' : 'busy'"
            >
              <span class="avail-dot"></span>
              {{
                hero.availableForHire
                  ? "✅ Available for hire"
                  : "⏳ Currently busy"
              }}
            </div>
          </div>
        </div>

        <!-- Right: Hero info -->
        <div class="col-lg-8">
          <div class="hero-content">
            <!-- Typing greeting -->
            <div class="greeting mb-2">
              <span class="greeting-text">{{ greetingText }}</span>
              <span class="cursor-blink">▋</span>
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
              <div
                class="col-6 col-md-3"
                v-for="(val, key) in hero.stats"
                :key="key"
              >
                <div class="quick-stat pixel-box p-3 text-center">
                  <div class="stat-number">
                    {{ val }}{{ key === "coffeeConsumed" ? "+" : "" }}
                  </div>
                  <div class="stat-label">{{ statLabels[key] }}</div>
                </div>
              </div>
            </div>

            <!-- CTAs -->
            <div class="hero-ctas d-flex flex-wrap gap-3">
              <a :href="`mailto:${hero.email}`" class="pixel-btn">
                <i class="bi bi-envelope-fill me-2"></i>Contactar
              </a>
              <a
                :href="hero.social.github"
                target="_blank"
                class="pixel-btn btn-cyan-px"
              >
                <i class="bi bi-github me-2"></i>GitHub
              </a>
              <a
                :href="hero.social.linkedin"
                target="_blank"
                class="pixel-btn linkedin-btn"
              >
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

<script>
import { ref, onMounted } from "vue";
import hero from "@/data/hero.json";

export default {
  name: "HeroSection",

  setup() {
    const greetingText = ref("");
    const fullGreeting = "> Bienvenido al portafolio de";

    const statLabels = {
      projectsCompleted: "Proyectos",
      yearsExperience: "Años XP",
      technologiesMastered: "Tecnologías",
      coffeeConsumed: "Cafés ☕",
    };

    onMounted(() => {
      let i = 0;
      const type = () => {
        if (i < fullGreeting.length) {
          greetingText.value += fullGreeting[i++];
          setTimeout(type, 60);
        }
      };
      setTimeout(type, 500);
    });

    const chars = ["⚔️", "🔮", "💻", "📊", "🐉", "⭐", "💎", "🗡️", "📜", "🏆"];
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      char: chars[i % chars.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${3 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 3}s`,
        fontSize: `${0.8 + Math.random() * 1.2}rem`,
        opacity: 0.15 + Math.random() * 0.3,
      },
    }));

    return { hero, greetingText, statLabels, particles };
  },
};
</script>
