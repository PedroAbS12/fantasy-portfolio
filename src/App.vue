<template>
  <div class="app-wrapper scanlines">
    <NavBar />

    <main>
      <HeroSection />
      <hr class="pixel-divider container" />
      <SkillsSection />
      <hr class="pixel-divider container" />
      <ProjectsSection />
      <hr class="pixel-divider container" />
      <ExperienceSection />
      <hr class="pixel-divider container" />
      <CertificationsSection />
      <hr class="pixel-divider container" />
      <ContactSection />
    </main>

    <FooterSection />

    <!-- Boot screen overlay -->
    <Transition name="boot-fade">
      <div v-if="booting" class="boot-screen">
        <div class="boot-content">
          <div class="boot-logo">⚔️</div>
          <div class="boot-title">DEV.QUEST</div>
          <div class="boot-subtitle">Loading portfolio...</div>
          <div class="boot-bar-wrap mt-4">
            <div class="boot-bar" :style="{ width: bootProgress + '%' }"></div>
          </div>
          <div class="boot-percent mt-2">{{ bootProgress }}%</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterSection from "./components/FooterSection.vue";
import CertificationsSection from "./components/CertificationsSection.vue";

export default {
  name: "App",

  components: {
    NavBar,
    HeroSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection,
    FooterSection,
    CertificationsSection,
  },

  setup() {
    const booting = ref(true);
    const bootProgress = ref(0);

    onMounted(() => {
      const interval = setInterval(() => {
        bootProgress.value += Math.floor(Math.random() * 15) + 5;
        if (bootProgress.value >= 100) {
          bootProgress.value = 100;
          clearInterval(interval);
          setTimeout(() => {
            booting.value = false;
          }, 400);
        }
      }, 120);
    });

    return { booting, bootProgress };
  },
};
</script>
