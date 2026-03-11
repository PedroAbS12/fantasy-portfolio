<template>
  <nav class="pixel-navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-scanline"></div>

    <div class="container-fluid px-4">
      <div class="d-flex justify-content-between align-items-center">
        <!-- Brand -->
        <a class="nav-brand" href="#hero" @click.prevent="scrollTo('hero')">
          {{ nav.brand }}<span class="brand-cursor">▋</span>
        </a>

        <!-- Desktop Nav — visible only when it fits -->
        <ul
          ref="navListRef"
          class="nav-items mb-0 ps-0"
          :class="{ 'nav-items--hidden': !navFits }"
        >
          <li v-for="item in nav.items" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="nav-link-px"
              :class="{
                active: activeSection === item.id,
                'icon-only': labelsHidden,
              }"
              @click.prevent="scrollTo(item.id)"
              :title="labelsHidden ? item.label : ''"
            >
              <span class="nav-emoji">{{ item.emoji }}</span>
              <span v-if="!labelsHidden" class="nav-label">{{
                item.label
              }}</span>
            </a>
          </li>
        </ul>

        <!-- Right controls -->
        <div class="nav-controls">
          <ThemeToggle />
          <button
            v-if="!navFits"
            class="mobile-menu-btn"
            @click="menuOpen = !menuOpen"
            :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
          >
            {{ menuOpen ? "✕" : "☰" }}
          </button>
        </div>
      </div>

      <!-- Mobile / overflow nav -->
      <Transition name="slide-down">
        <ul v-if="menuOpen && !navFits" class="mobile-nav mt-2 mb-0 ps-0">
          <li v-for="item in nav.items" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="mobile-nav-link"
              :class="{ active: activeSection === item.id }"
              @click.prevent="
                scrollTo(item.id);
                menuOpen = false;
              "
            >
              {{ item.emoji }} {{ item.label }}
            </a>
          </li>
        </ul>
      </Transition>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import nav from "@/data/nav.json";
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
  name: "NavBar",
  components: { ThemeToggle },

  setup() {
    const isScrolled = ref(false);
    const menuOpen = ref(false);
    const activeSection = ref("hero");
    const navFits = ref(true);
    const labelsHidden = ref(false);
    const navListRef = ref(null);

    const scrollTo = (id) => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // ── Measure whether the nav links overflow the available space ──
    const checkFit = () => {
      const container = document.querySelector(
        ".pixel-navbar .container-fluid",
      );
      if (!container || !navListRef.value) return;

      const totalW = container.offsetWidth;
      const brandEl = container.querySelector(".nav-brand");
      const ctrlEl = container.querySelector(".nav-controls");
      const brandW = brandEl ? brandEl.offsetWidth : 0;
      const ctrlW = ctrlEl ? ctrlEl.offsetWidth : 0;
      const available = totalW - brandW - ctrlW - 48; // 48px breathing room

      // Step 1 — try full labels
      labelsHidden.value = false;
      navFits.value = true;

      nextTick(() => {
        const fullW = navListRef.value ? navListRef.value.scrollWidth : 0;

        if (fullW <= available) return; // all good

        // Step 2 — try icon-only mode
        labelsHidden.value = true;

        nextTick(() => {
          const iconW = navListRef.value ? navListRef.value.scrollWidth : 0;

          if (iconW > available) {
            // Step 3 — fall back to hamburger
            navFits.value = false;
            labelsHidden.value = false;
          }
        });
      });
    };

    // ── Scroll: scrolled state + active section ──────────────────────
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 60;
      const sections = nav.items.map((i) => i.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 150) {
          activeSection.value = sections[i];
          break;
        }
      }
    };

    let ro = null;

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      // ResizeObserver catches both window resize and font-load reflows
      ro = new ResizeObserver(() => checkFit());
      const navbar = document.querySelector(".pixel-navbar");
      if (navbar) ro.observe(navbar);
      checkFit();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      if (ro) ro.disconnect();
    });

    return {
      nav,
      isScrolled,
      menuOpen,
      activeSection,
      navFits,
      labelsHidden,
      navListRef,
      scrollTo,
    };
  },
};
</script>
