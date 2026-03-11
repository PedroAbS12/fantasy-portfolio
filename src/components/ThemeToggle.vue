<template>
  <button
    class="theme-toggle-btn"
    :class="currentTheme"
    @click="toggle"
    :title="
      currentTheme === 'pixel'
        ? 'Switch to Overworld (Day)'
        : 'Switch to Dungeon (Night)'
    "
    :aria-label="
      currentTheme === 'pixel' ? 'Switch to Overworld' : 'Switch to Dungeon'
    "
  >
    <Transition name="theme-icon" mode="out-in">
      <span v-if="currentTheme === 'pixel'" key="pixel">💭</span>
      <span v-else key="medieval">⛓️</span>
    </Transition>
    <span class="toggle-label">
      {{ currentTheme === "pixel" ? "OVERWORLD" : "DUNGEON" }}
    </span>
  </button>
</template>

<script>
import { ref, watch, onMounted } from "vue";

export default {
  name: "ThemeToggle",
  setup() {
    const currentTheme = ref("pixel");

    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("portfolio-theme", theme);
      } catch {}
    };

    const toggle = () => {
      currentTheme.value =
        currentTheme.value === "pixel" ? "medieval" : "pixel";
    };

    onMounted(() => {
      let saved = null;
      try {
        saved = localStorage.getItem("portfolio-theme");
      } catch {}
      if (saved === "medieval") currentTheme.value = "medieval";
      applyTheme(currentTheme.value);
    });

    watch(currentTheme, applyTheme);

    return { currentTheme, toggle };
  },
};
</script>

<style scoped>
.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-pixel);
  font-size: 0.35rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 7px 11px;
  border: 2px solid var(--pixel-border);
  background: var(--pixel-darker);
  color: var(--pixel-gray);
  cursor: pointer;
  box-shadow: 3px 3px 0 #000;
  transition: all 0.08s steps(1);
  white-space: nowrap;
}
.theme-toggle-btn:hover {
  border-color: var(--pixel-gold);
  color: var(--pixel-gold);
  background: rgba(200, 146, 42, 0.08);
  box-shadow: 1px 1px 0 #000;
  transform: translate(2px, 2px);
}

/* Medieval variant — lighter bg */
.theme-toggle-btn.medieval {
  background: linear-gradient(180deg, #e8d8bc 0%, #d8c8a8 100%);
  border-color: var(--pixel-border);
  color: var(--pixel-gray);
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
  background: linear-gradient(180deg, #f0e0c4 0%, #e0cca8 100%);
}

/* Icon transition */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.18s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-150deg) scale(0.5);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(150deg) scale(0.5);
}

/* Hide label on very small screens */
@media (max-width: 480px) {
  .toggle-label {
    display: none;
  }
}
</style>
