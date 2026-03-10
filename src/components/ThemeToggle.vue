<template>
  <div class="theme-toggle-wrap" :class="currentTheme">
    <button
      class="theme-toggle-btn"
      :class="currentTheme"
      @click="toggle"
      :title="
        currentTheme === 'pixel'
          ? 'Switch to Medieval Fantasy'
          : 'Switch to Pixel RPG'
      "
      :aria-label="
        currentTheme === 'pixel'
          ? 'Switch to Medieval Fantasy'
          : 'Switch to Pixel RPG'
      "
    >
      <!-- Pixel theme icon -->
      <Transition name="theme-icon" mode="out-in">
        <span
          v-if="currentTheme === 'pixel'"
          key="pixel"
          class="toggle-icon pixel-icon"
        >
          🏰
        </span>
        <span v-else key="medieval" class="toggle-icon medieval-icon">
          👾
        </span>
      </Transition>

      <span class="toggle-label">
        <span v-if="currentTheme === 'pixel'" class="label-text">OUTDOORS</span>
        <span v-else class="label-text">DUNGEON</span>
      </span>

      <!-- Animated shimmer bar -->
      <span class="toggle-shimmer"></span>
    </button>

    <!-- Tooltip hint (first visit only) -->
    <Transition name="hint-fade">
      <div v-if="showHint" class="toggle-hint">
        <span>✨ Try the new theme!</span>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: "ThemeToggle",

  setup() {
    const currentTheme = ref("pixel");
    const showHint = ref(false);

    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("portfolio-theme", theme);
      } catch (e) {}
    };

    const toggle = () => {
      currentTheme.value =
        currentTheme.value === "pixel" ? "medieval" : "pixel";
      showHint.value = false;
    };

    onMounted(() => {
      // Restore saved theme
      let saved = null;
      try {
        saved = localStorage.getItem("portfolio-theme");
      } catch (e) {}
      if (saved === "medieval") {
        currentTheme.value = "medieval";
      }
      applyTheme(currentTheme.value);

      // Show hint if first visit
      let visited = false;
      try {
        visited = !!localStorage.getItem("portfolio-visited");
      } catch (e) {}
      if (!visited) {
        setTimeout(() => {
          showHint.value = true;
        }, 3000);
        setTimeout(() => {
          showHint.value = false;
        }, 8000);
        try {
          localStorage.setItem("portfolio-visited", "1");
        } catch (e) {}
      }
    });

    watch(currentTheme, (newTheme) => {
      applyTheme(newTheme);
    });

    return { currentTheme, showHint, toggle };
  },
};
</script>

<style scoped>
/* ── Wrapper ── */
.theme-toggle-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* ── Button ── */
.theme-toggle-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
}

/* ── Pixel theme style ── */
.theme-toggle-btn.pixel {
  font-family: var(--font-pixel);
  font-size: 0.38rem;
  letter-spacing: 0.05em;
  padding: 7px 12px;
  border: 2px solid var(--pixel-border);
  background: var(--pixel-darker);
  color: var(--pixel-gray);
  box-shadow: 3px 3px 0 #000;
  text-transform: uppercase;
  transition: all 0.08s steps(1);
}
.theme-toggle-btn.pixel:hover {
  border-color: var(--pixel-gold);
  color: var(--pixel-gold);
  background: rgba(255, 215, 0, 0.08);
  box-shadow: 1px 1px 0 #000;
  transform: translate(2px, 2px);
}

/* ── Medieval theme style ── */
.theme-toggle-btn.medieval {
  font-family: "Cinzel", serif;
  font-size: 0.38rem;
  letter-spacing: 0.08em;
  padding: 7px 12px;
  border: 2px solid var(--pixel-border);
  background: linear-gradient(180deg, #2a1f0e 0%, #1a1208 100%);
  color: var(--pixel-gray);
  box-shadow: 3px 3px 0 #000;
  text-transform: uppercase;
  transition: all 0.08s steps(1);
  clip-path: polygon(
    4px 0%,
    calc(100% - 4px) 0%,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 4px) 100%,
    4px 100%,
    0% calc(100% - 4px),
    0% 4px
  );
}
.theme-toggle-btn.medieval:hover {
  border-color: var(--pixel-gold);
  color: var(--pixel-gold);
  background: linear-gradient(180deg, #3a2a10 0%, #2a1a08 100%);
  box-shadow: 1px 1px 0 #000;
  transform: translate(2px, 2px);
}

/* ── Icons ── */
.toggle-icon {
  font-size: 0.9rem;
  display: inline-block;
  line-height: 1;
  flex-shrink: 0;
}
.pixel-icon {
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
}
.medieval-icon {
  filter: drop-shadow(0 0 4px rgba(0, 204, 255, 0.5));
}

/* ── Label ── */
.toggle-label {
  white-space: nowrap;
}

/* ── Shimmer ── */
.toggle-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.12) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: toggle-shimmer 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes toggle-shimmer {
  0% {
    background-position: -200% center;
  }
  60% {
    background-position: 300% center;
  }
  100% {
    background-position: 300% center;
  }
}

/* ── Icon transition ── */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

/* ── Hint tooltip ── */
.toggle-hint {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--pixel-navy);
  border: 2px solid var(--pixel-gold);
  padding: 4px 10px;
  white-space: nowrap;
  box-shadow: 3px 3px 0 #000;
  z-index: 100;
}
.toggle-hint span {
  font-family: var(--font-pixel);
  font-size: 0.35rem;
  color: var(--pixel-gold);
}
/* Arrow */
.toggle-hint::before {
  content: "";
  position: absolute;
  top: -7px;
  right: 14px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--pixel-gold);
}

.hint-fade-enter-active {
  transition: all 0.3s ease;
}
.hint-fade-leave-active {
  transition: all 0.3s ease;
}
.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
