<template>
  <nav class="pixel-navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-scanline"></div>

    <div class="container-fluid px-4">
      <div class="d-flex justify-content-between align-items-center">
        <!-- Brand -->
        <a class="nav-brand" href="#hero" @click.prevent="scrollTo('hero')">
          <span class="brand-text">{{ nav.brand }}</span>
          <span class="brand-cursor">▋</span>
        </a>

        <!-- Desktop Nav -->
        <ul class="nav-items d-none d-md-flex mb-0 ps-0">
          <li v-for="item in nav.items" :key="item.id" class="nav-item-px">
            <a
              :href="`#${item.id}`"
              class="nav-link-px"
              :class="{ active: activeSection === item.id }"
              @click.prevent="scrollTo(item.id)"
            >
              <span class="nav-emoji">{{ item.emoji }}</span>
              <span class="nav-label">{{ item.label }}</span>
            </a>
          </li>
        </ul>

        <!-- Mobile Toggle -->
        <ThemeToggle />
        <button class="mobile-menu-btn d-md-none" @click="menuOpen = !menuOpen">
          <span>{{ menuOpen ? "✕" : "☰" }}</span>
        </button>
      </div>

      <!-- Mobile Nav -->
      <Transition name="slide-down">
        <ul v-if="menuOpen" class="mobile-nav mt-2 mb-0 ps-0">
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
import { ref, onMounted, onUnmounted } from "vue";
import nav from "@/data/nav.json";
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
  name: "NavBar",
  components: { ThemeToggle },

  setup() {
    const isScrolled = ref(false);
    const menuOpen = ref(false);
    const activeSection = ref("hero");

    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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

    onMounted(() => window.addEventListener("scroll", handleScroll));
    onUnmounted(() => window.removeEventListener("scroll", handleScroll));

    return { nav, isScrolled, menuOpen, activeSection, scrollTo };
  },
};
</script>
