# Karsindo Frontend - Nuxt.js Admin Dashboard

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?style=flat-square&logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=flat-square&logo=vue.js)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green.svg)

Admin Dashboard modern yang dibangun dengan Nuxt.js 4 dan Bootstrap 5, terintegrasi dari template NiceAdmin dengan struktur komponen Vue yang profesional.

## 🎯 Fitur Utama

- ✅ **Dashboard Responsif** - Layout modern dengan grid system Bootstrap
- ✅ **Komponen Reusable** - Header, Sidebar, Footer yang dapat dikustomisasi
- ✅ **Multiple Pages** - Dashboard, Login, Register dengan routing otomatis
- ✅ **Charts & Visualisasi** - ApexCharts dan ECharts terintegrasi
- ✅ **Form Validation** - Validasi form yang proper dengan Bootstrap
- ✅ **Icons** - Bootstrap Icons, Boxicons, RemixIcons tersedia
- ✅ **Responsive Design** - Mobile-first approach dengan Bootstrap breakpoints

## 📁 Struktur Proyek

```
karsindo-fe/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue          # Komponen header dengan notifikasi, pesan, profile
│   │   │   ├── Sidebar.vue         # Sidebar navigasi yang collapse-able
│   │   │   └── Footer.vue          # Footer dengan back-to-top button
│   │   └── DashboardStatsCard.vue  # Komponen card statistik reusable
│   │
│   ├── layouts/
│   │   ├── default.vue             # Layout untuk login/register (tanpa sidebar)
│   │   └── dashboard.vue           # Layout untuk dashboard (dengan sidebar)
│   │
│   ├── pages/
│   │   ├── dashboard.vue           # Halaman dashboard utama
│   │   ├── login.vue               # Halaman login
│   │   └── register.vue            # Halaman register
│   │
│   └── app.vue                     # Root component dengan vendor script loader
│
├── public/
│   └── assets/
│       ├── css/
│       │   └── style.css           # Custom template CSS
│       ├── img/                    # Semua gambar template
│       ├── js/
│       │   └── main.js             # Template main JavaScript
│       └── vendor/                 # Semua library vendor
│           ├── bootstrap/
│           ├── apexcharts/
│           ├── echarts/
│           ├── bootstrap-icons/
│           ├── boxicons/
│           ├── remixicon/
│           └── ... (library lainnya)
│
├── nuxt.config.ts                 # Konfigurasi Nuxt.js
├── tsconfig.json                  # Konfigurasi TypeScript
├── package.json                   # Dependencies
└── README.md                      # File ini
```

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js 16+ 
- npm atau yarn

### Installation

```bash
# Clone repository (jika belum)
cd karsindo-fe

# Install dependencies
npm install

# Setup Nuxt
npm run postinstall

# Run development server
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 📖 Penggunaan

### URL Routing

```
/                  → Redirect ke /dashboard
/dashboard         → Halaman dashboard utama
/login            → Halaman login
/register         → Halaman register
```

### Struktur Halaman

#### Dashboard (`/dashboard`)
- Menggunakan layout `dashboard.vue` yang memiliki Header + Sidebar + Main Content + Footer
- Menampilkan statistik dengan DashboardStatsCard components
- Integrasi dengan ApexCharts dan ECharts untuk visualisasi data
- Tabel data penjualan dan produk top selling

#### Login (`/login`)
- Menggunakan layout `default.vue` (full screen, tanpa sidebar)
- Form username/password sederhana
- Remember me checkbox
- Link ke halaman register

#### Register (`/register`)
- Menggunakan layout `default.vue`
- Form lengkap: name, email, username, password
- Terms & conditions checkbox
- Link ke halaman login

## 🧩 Komponen Utama

### Header.vue
Komponen navigasi atas dengan:
- Logo & toggle sidebar button
- Search bar
- Notification bell dengan dropdown
- Messages dropdown
- Profile dropdown dengan logout

```vue
<LayoutHeader @toggle-sidebar="toggleSidebar" />
```

### Sidebar.vue
Menu navigasi samping dengan:
- Dashboard link
- Collapsible menus (Components, Forms, Tables, Charts, Icons)
- Pages section dengan links ke Profile, FAQ, Contact
- Link ke Login & Register

### DashboardStatsCard.vue
Komponen card statistik yang reusable:

```vue
<DashboardStatsCard
  title="Sales"
  subtitle="Today"
  value="145"
  icon="bi-cart"
  trend="+12%"
  trendClass="text-success"
  description="increase"
/>
```

## 📊 Data & API

Dashboard saat ini menggunakan data mock/dummy yang di-hardcode dalam `dashboard.vue`. Untuk mengintegrasikan dengan API backend:

```typescript
// Tambahkan fetch/axios call dalam onMounted()
const fetchDashboardData = async () => {
  try {
    const response = await fetch('/api/dashboard')
    const data = await response.json()
    // Update reactive data
    recentSales.value = data.recentSales
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
```

## 🎨 Customization

### Mengubah Warna
Edit file `/public/assets/css/style.css` atau tambahkan custom CSS di component-level:

```vue
<style scoped>
/* Override Bootstrap variables */
:root {
  --bs-primary: #667eea;
  --bs-success: #2eca6a;
}
</style>
```

### Menambah Menu Sidebar
Edit `components/layout/Sidebar.vue`:

```vue
<li class="nav-item">
  <NuxtLink to="/your-page" class="nav-link">
    <i class="bi bi-your-icon"></i>
    <span>Your Page</span>
  </NuxtLink>
</li>
```

### Menambah Page Baru
1. Buat file di `app/pages/your-page.vue`
2. Routing otomatis by file name
3. Pilih layout dengan `definePageMeta({ layout: 'dashboard' })`

## 🛠️ Build & Deploy

### Development
```bash
npm run dev
```

### Build untuk Production
```bash
npm run build
npm run preview  # Test production build
```

### Generate Static Site
```bash
npm run generate
```

## 📦 Dependencies

**Core:**
- `nuxt@^4.2.0` - Framework utama
- `vue@^3.5.22` - JavaScript framework
- `vue-router@^4.6.3` - Routing

**UI:**
- Bootstrap 5.3.3 - CSS framework
- Bootstrap Icons - Icon library
- ApexCharts - Chart library
- ECharts - Visualization library

**Modules:**
- `@nuxt/content` - Content management
- `@nuxt/ui` - UI components
- `@nuxt/image` - Image optimization
- `@nuxt/eslint` - Linting

## 🔐 Best Practices

### Security
- Jangan commit `.env` files
- Validate form input di server-side
- Use HTTPS untuk production
- Implement CSRF protection

### Performance
- Lazy load images dengan `<NuxtImg>`
- Code splitting otomatis oleh Nuxt
- CSS/JS minified di production
- Use async/await untuk API calls

### Code Quality
- Follow Vue 3 Composition API patterns
- Use TypeScript untuk type safety
- Component file naming (PascalCase)
- Proper error handling

## 🐛 Troubleshooting

### Sidebar tidak collapse
Pastikan Bootstrap JS sudah loaded:
```bash
# Check di browser console
window.bootstrap // harus ada
```

### Charts tidak render
Pastikan ApexCharts/ECharts sudah loaded:
```bash
# Di browser console
window.ApexCharts // untuk ApexCharts
window.echarts     // untuk ECharts
```

### Assets tidak ditemukan
Pastikan struktur folder `/public/assets` sudah benar dan copy semua vendor files.

### CSS Path Error (Cannot find module)
**Problem:** Error `Cannot find module '~/public/assets/...'`
**Solution:** 
- CSS vendor files di-serve dari `/public/assets/` folder
- Paths di-reference via `/assets/` (tanpa `~/public/`)
- Semua CSS di-load via `app.head.link` di `nuxt.config.ts`
- Tidak perlu menggunakan `~/public/` prefix

Struktur yang benar:
```
public/assets/vendor/bootstrap/css/bootstrap.min.css  → Accessible via /assets/vendor/bootstrap/css/bootstrap.min.css
```

### Dev Server Starting Error
Jika dev server error saat start, cek:
1. Pastikan semua dependencies installed: `npm install`
2. Clear node_modules & cache: `rm -rf node_modules .nuxt && npm install`
3. Pastikan file `nuxt.config.ts` tidak ada syntax error

## 📝 License

Template original dari [BootstrapMade](https://bootstrapmade.com/).
Nuxt.js integration & customization oleh Karsindo Team.

## 📞 Support

Untuk pertanyaan atau issue, hubungi team development.

---

**Last Updated:** November 2025
**Nuxt Version:** 4.2.0
**Bootstrap Version:** 5.3.3
