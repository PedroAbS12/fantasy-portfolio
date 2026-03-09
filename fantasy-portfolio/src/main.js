import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Global pixel theme (variables, animations, shared utilities)
import './assets/css/pixel-theme.css'

// Component styles
import './assets/css/App.css'
import './assets/css/NavBar.css'
import './assets/css/HeroSection.css'
import './assets/css/SkillsSection.css'
import './assets/css/ProjectsSection.css'
import './assets/css/ExperienceSection.css'
import './assets/css/CertificationsSection.css'
import './assets/css/ContactSection.css'
import './assets/css/FooterSection.css'

createApp(App).mount('#app')
