# 🏗️ DYS Frontend – Calculadoras de Construcción

Proyecto frontend desarrollado con **React + Vite**, **Tailwind CSS** y **shadcn/ui**, orientado a herramientas de cálculo para el rubro de la construcción (concreto, ladrillos, pintura, áreas, volúmenes, etc.).

Este README documenta **la puesta en marcha desde cero**, los problemas reales encontrados y cómo se resolvieron. Forma parte del **portafolio profesional** del proyecto.

---

## 🚀 Tecnologías utilizadas

* **React 18**
* **Vite** (bundler y dev server)
* **Tailwind CSS** (estilos utilitarios)
* **shadcn/ui** (componentes UI)
* **Framer Motion** (animaciones)
* **Lucide React** (iconos)

---

## 📁 Estructura del proyecto

```text
src/
 ├─ components/
 │   └─ ui/               # Componentes shadcn/ui (button, card, tabs, toast, etc)
 ├─ pages/
 │   └─ tools/
 │       ├─ components/   # Formularios y displays de resultados
 │       ├─ utils/        # Funciones de cálculo (materiales, áreas, volúmenes)
 │       └─ MaterialCalculator.jsx
 ├─ lib/
 │   └─ utils.js
 ├─ index.css             # Tailwind + variables CSS
 └─ main.jsx
```

---

## 🧩 Funcionalidades principales

* Calculadora de **concreto** (volumen según dimensiones y tipo)
* Calculadora de **ladrillos / bloques**
* Calculadora de **pintura**
* Sistema de **tabs** por tipo de material
* Resultados claros + recomendaciones prácticas
* Notificaciones (`toast`) para validaciones y acciones
* Diseño responsive

---

## ⚙️ Instalación y ejecución local

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repo>
cd dysfront
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar el proyecto

```bash
npm run dev
```

El proyecto quedará disponible en:

```
http://localhost:5173/
```

---

## 🎨 Configuración de Tailwind CSS (PUNTO CLAVE)

Este proyecto utiliza **shadcn/ui**, que requiere una configuración específica de Tailwind.

### 🔴 Problema encontrado

Al iniciar el proyecto, el sitio levantaba **sin estilos**, y Vite mostraba el error:

```
The `border-border` class does not exist
```

Esto ocurre cuando:

* Tailwind está instalado
* `index.css` usa `@apply border-border`
* ❌ `tailwind.config.js` NO tiene los colores extendidos

---

## ✅ Solución aplicada (documentada)

Se creó / corrigió completamente el archivo:

📄 **`tailwind.config.js`**

Con la configuración requerida por shadcn/ui:

* `darkMode: ['class']`
* `content` apuntando a `src/**/*.{js,jsx}`
* `theme.extend.colors` usando variables CSS
* `borderRadius` basada en `--radius`

Esto habilita correctamente clases como:

* `border-border`
* `bg-background`
* `text-foreground`
* `ring-ring`

📌 **Sin esta configuración, shadcn NO funciona correctamente.**

---

## 🎨 index.css

El archivo `src/index.css` define:

* Directivas Tailwind:

  * `@tailwind base`
  * `@tailwind components`
  * `@tailwind utilities`
* Variables CSS para colores (light / dark)
* Estilos base del proyecto
* Clases personalizadas (`hero-gradient`, `glass-effect`, etc.)

Este archivo **NO tenía errores**, el problema era exclusivamente la config de Tailwind.

---

## 🧠 Aprendizajes clave (valor portfolio)

✔️ Integración real de **shadcn/ui + Tailwind + Vite**
✔️ Resolución de errores de PostCSS en entorno real
✔️ Comprensión profunda de `@apply` y `@layer`
✔️ Debugging de imports, exports y rutas
✔️ Organización modular de calculadoras

Este proyecto demuestra **capacidad de diagnóstico**, no solo escritura de código.

---

## 📌 Próximos pasos posibles

* Persistencia de cálculos
* Exportación de resultados (PDF)
* Modo oscuro toggle
* Tests unitarios de utilidades
* Deploy (Vercel / Netlify)

---

## 👩‍💻 Autora

**Sofía Schenone**
Frontend Developer · Full Stack · Sistemas

📍 Argentina
🔗 Portfolio y proyectos en desarrollo

---

> Proyecto real, con errores reales, resueltos profesionalmente.
