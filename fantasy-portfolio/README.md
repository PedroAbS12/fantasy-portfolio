# ⚔️ Fantasy Portfolio — Dev.Quest

> Portfolio personal con temática pixel art RPG de fantasía. Construido con **Vue 3** + **Bootstrap 5** + **Vite**.

![Preview](https://placehold.co/1200x400/0d0d1a/ffd700?text=⚔️+DEV.QUEST+Portfolio&font=raleway)

---

## 🗺️ Estructura del Proyecto

```
fantasy-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── pixel-theme.css       # ✨ Estilos globales (colores, botones, animaciones)
│   ├── components/
│   │   ├── NavBar.vue                # 🧭 Barra de navegación fija con scroll spy
│   │   ├── HeroSection.vue          # 🏰 Sección hero con carta de personaje
│   │   ├── SkillsSection.vue        # ⚡ Árbol de habilidades con barras XP animadas
│   │   ├── ProjectsSection.vue      # 🗺️ Galería de proyectos con filtros y modal
│   │   ├── ExperienceSection.vue    # 📜 Timeline de experiencia y educación
│   │   ├── ContactSection.vue       # 📨 Formulario de contacto
│   │   └── FooterSection.vue        # 🔻 Footer
│   ├── data/
│   │   ├── hero.json                # 👤 Datos personales, redes, estadísticas
│   │   ├── skills.json              # ⚡ Habilidades por categoría con niveles
│   │   ├── projects.json            # 🗺️ Proyectos con links, imágenes, tags
│   │   ├── experience.json          # 📜 Experiencia laboral y formación
│   │   └── nav.json                 # 🧭 Configuración de navegación
│   ├── App.vue                       # 🎮 Componente raíz con boot screen
│   └── main.js                       # 🚀 Entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Instalación y Uso

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/fantasy-portfolio.git
cd fantasy-portfolio

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## ✏️ Cómo Personalizar

### 1. Actualiza tus datos personales → `src/data/hero.json`
```json
{
  "name": "Tu Nombre",
  "email": "tu@email.com",
  "social": {
    "github": "https://github.com/tu-usuario"
  }
}
```

### 2. Agrega/edita habilidades → `src/data/skills.json`
```json
{
  "name": "Vue.js",
  "level": 90,
  "type": "gold",
  "icon": "🟢"
}
```
Los tipos disponibles para el color de la barra son: `gold`, `cyan`, `green`, `purple`.

### 3. Agrega proyectos → `src/data/projects.json`
```json
{
  "id": 7,
  "title": "Nuevo Proyecto",
  "image": "URL_DE_IMAGEN_O_RUTA_LOCAL",
  "tags": ["Vue.js", "Python"],
  "links": {
    "live": "https://demo.com",
    "github": "https://github.com/...",
    "video": ""
  }
}
```
- `image`: Puede ser una URL externa o una ruta local (`/src/assets/img/proyecto.png`)
- `links`: Deja en `""` si no hay link disponible

### 4. Difficulty levels disponibles para proyectos:
| Valor | Emoji | Descripción |
|-------|-------|-------------|
| `legendary` | 🔥 | Proyectos insignia |
| `epic` | ⚡ | Proyectos mayores |
| `rare` | 💎 | Proyectos intermedios |
| `uncommon` | 🗡️ | Proyectos menores |
| `common` | ⚪ | Proyectos simples |

### 5. Edita tu experiencia → `src/data/experience.json`

---

## 🎨 Personalización Visual

Edita las variables CSS en `src/assets/css/pixel-theme.css`:

```css
:root {
  --pixel-gold:   #ffd700;   /* Color principal */
  --pixel-cyan:   #00ccff;   /* Color secundario */
  --pixel-dark:   #0d0d1a;   /* Fondo */
}
```

---

## 🌐 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
# En vite.config.js agrega:
export default defineConfig({
  base: '/nombre-del-repo/',
  ...
})

npm run build
# Sube la carpeta dist/ a la rama gh-pages
```

### Netlify
Conecta el repo en netlify.com → Build command: `npm run build` → Publish directory: `dist`

---

## 🛠️ Tech Stack

- **Vue 3** — Composition API
- **Bootstrap 5** — Grid y componentes base
- **Vite** — Build tool ultra rápido
- **Press Start 2P** — Fuente pixel art principal
- **VT323 / Silkscreen** — Fuentes retro secundarias

---

*Made with ⚔️ & ☕ — DEV.QUEST Portfolio*
