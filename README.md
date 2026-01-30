# GProA - Capacitación Bancos y Aseguradoras 🚀

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> Este repositorio contiene el desarrollo de un **asistente inteligente** diseñado específicamente para operar como asesor especializado en los sectores de **banca y seguros**.

El objetivo principal es proporcionar una herramienta capaz de resolver dudas, ofrecer asesoría sobre productos financieros y optimizar la atención al cliente mediante inteligencia artificial.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso del Proyecto](#-uso-del-proyecto)
- [API Reference](#-api-reference)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 📖 Descripción del Proyecto

GProA (Gestión Profesional de Asesoramiento) es un asistente inteligente diseñado para transformar la atención al cliente en los sectores bancario y de seguros. Este sistema proporciona:

- **Asesoría especializada** con conocimiento profundo en términos bancarios, productos financieros y pólizas de seguros
- **Atención 24/7** sin necesidad de intervención humana constante
- **Personalización** adaptándose a las normativas y productos específicos de diferentes instituciones
- **Análisis de datos** para entender las necesidades del cliente y ofrecer soluciones personalizadas

### Objetivos del Proyecto

1. Reducir tiempos de respuesta en atención al cliente
2. Disminuir la carga de trabajo del personal humano en consultas rutinarias
3. Mejorar la precisión en la información proporcionada sobre productos financieros
4. Generar insights actionable a partir de las interacciones con clientes

---

## ✨ Características Principales

### 🤖 Asesoría Inteligente
- Procesamiento de lenguaje natural (NLP) avanzado
- Comprensión contextual de consultas financieras
- Respuestas personalizadas basadas en el perfil del cliente

### 📊 Gestión de Conocimiento
- Base de datos vectorial para检索 eficiente de información
- Actualización dinámica de conocimientos sobre productos
- Capacitación continua del modelo

### 🔐 Seguridad y Cumplimiento
- Cumplimiento con regulaciones financieras locales
- Encriptación de datos sensibles
- Auditoría de todas las interacciones

### 📈 Escalabilidad
- Arquitectura microservices lista para escalar
- Integración con múltiples plataformas de atención
- Soporte para múltiples idiomas

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        CAPA FRONTEND                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   React/Next.js App                      │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────────────┐  │   │
│  │  │  Chat   │  │ Dashboard│  │   Admin Panel           │  │   │
│  │  │  UI     │  │  Analytics│  │                         │  │   │
│  │  └─────────┘  └─────────┘  └─────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY / BFF                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              NestJS / Express Server                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────────────┐  │   │
│  │  │ Auth    │  │ Rate    │  │   Request               │  │   │
│  │  │ Service │  │ Limiter │  │   Validation            │  │   │
│  │  └─────────┘  └─────────┘  └─────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CAPA DE SERVICIOS                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐     │
│  │   Chat      │  │   User      │  │   Knowledge         │     │
│  │   Service   │  │   Service   │  │   Base Service      │     │
│  └─────────────┘  └─────────────┘  └─────────────────────┘     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐     │
│  │   AI/ML     │  │ Analytics   │  │   Notification      │     │
│  │   Service   │  │   Service   │  │   Service           │     │
│  └─────────────┘  └─────────────┘  └─────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE DATOS                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐     │
│  │ PostgreSQL  │  │  Redis      │  │   Vector DB         │     │
│  │  (Users)    │  │  (Cache)    │  │   (Pinecone/       │     │
│  │             │  │             │  │    ChromaDB)        │     │
│  └─────────────┘  └─────────────┘  └─────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
GProA_Capacitacion_Bancos-Aseguradoras/
├── 📄 README.md                    # Este archivo
├── 📄 LICENSE                      # Licencia del proyecto
├── 📄 package.json                 # Dependencias del proyecto root
├── 📄 package-lock.json            # Lock file de dependencias
├── 📄 .env.example                 # Ejemplo de variables de entorno
├── 📄 docker-compose.yml           # Configuración de Docker Compose
├── 📂 capacita-seguros/            # Frontend React
│   ├── 📄 Dockerfile               # Dockerfile del frontend
│   ├── 📄 package.json             # Dependencias del frontend
│   ├── 📄 vite.config.ts           # Configuración de Vite
│   ├── 📂 src/                     # Código fuente del frontend
│   │   ├── 📂 components/          # Componentes reutilizables
│   │   ├── 📂 pages/               # Páginas de la aplicación
│   │   ├── 📂 services/            # Servicios y lógica de negocio
│   │   ├── 📂 hooks/               # Custom hooks
│   │   ├── 📂 utils/               # Utilidades
│   │   ├── 📂 context/             # Contextos de React
│   │   ├── 📂 types/               # Definiciones de TypeScript
│   │   └── 📂 data/                # Datos y mocks
│   └── 📂 public/                  # Archivos estáticos
├── 📂 init-scripts/                # Scripts de inicialización de BD
│   └── 📄 01-init.sql              # Schema de PostgreSQL
├── 📂 backend/                     # Servidor backend (si aplica)
│   ├── 📂 src/
│   │   ├── 📂 controllers/         # Controladores de API
│   │   ├── 📂 services/            # Servicios de negocio
│   │   ├── 📂 models/              # Modelos de datos
│   │   ├── 📂 routes/              # Rutas de API
│   │   └── 📂 middleware/          # Middleware Express
│   └── 📂 tests/                   # Tests del backend
├── 📂 docs/                        # Documentación adicional
├── 📂 scripts/                     # Scripts de utilidad
├── 📂 config/                      # Configuraciones
└── 📂 .github/                     # Configuración de GitHub Actions
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18+ | Biblioteca principal de UI |
| TypeScript | 5.0+ | Tipado estático |
| Vite | 5.0+ | Build tool y dev server |
| Tailwind CSS | 3.4+ | Framework de estilos |
| React Query | 5.0+ | Gestión de estado y caching |
| Socket.io Client | 4.7+ | Comunicación en tiempo real |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 18+ | Entorno de ejecución |
| Express/NestJS | 4.x/10.x | Framework de API |
| PostgreSQL | 15+ | Base de datos relacional |
| Redis | 7+ | Cache y sesiones |
| OpenAI SDK | 4+ | Integración con LLM |

### AI & ML
| Tecnología | Propósito |
|------------|-----------|
| OpenAI GPT-4 | Modelo de lenguaje principal |
| LangChain | Framework de integración LLM |
| Pinecone/ChromaDB | Base de datos vectorial |
| Hugging Face | Modelos de embedding |

### DevOps & Herramientas
| Tecnología | Propósito |
|------------|-----------|
| Docker | Contenedorización |
| Docker Compose | Orquestación de contenedores |
| GitHub Actions | CI/CD |
| ESLint/Prettier | Linting y formateo |
| Jest/Vitest | Testing |

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- npm 9 o superior (o yarn/pnpm)
- Docker y Docker Compose (alternativo)
- PostgreSQL 15+ (para producción sin Docker)
- Redis 7+ (para producción sin Docker)

### Opción 1: Instalación con Docker (Recomendado)

Esta es la forma más fácil de levantar todo el ecosistema con un solo comando.

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/GProA_Capacitacion_Bancos-Aseguradoras.git
   cd GProA_Capacitacion_Bancos-Aseguradoras
   ```

2. **Levantar los servicios**
   ```bash
   docker-compose up -d
   ```

3. **Verificar que todo esté funcionando**
   ```bash
   docker-compose ps
   ```

4. **Acceder a la aplicación**
   - Frontend: http://localhost:5173
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

5. **Para detener los servicios**
   ```bash
   docker-compose down
   ```

6. **Para detener y eliminar volúmenes (BORRA TODOS LOS DATOS)**
   ```bash
   docker-compose down -v
   ```

### Servicios Incluidos en Docker

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| frontend | 5173 | Aplicación React con Vite |
| db | 5432 | PostgreSQL 15 |
| cache | 6379 | Redis 7 |

### Persistencia de Datos

Los datos se persisten en volúmenes de Docker:
- `postgres_data`: Base de datos PostgreSQL
- `redis_data`: Datos de cache de Redis

### Opción 2: Instalación Local (Sin Docker)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/GProA_Capacitacion_Bancos-Aseguradoras.git
   cd GProA_Capacitacion_Bancos-Aseguradoras
   ```

2. **Instalar dependencias**
   ```bash
   # Instalación con npm
   npm install

   # O con yarn
   yarn install

   # O con pnpm
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copiar archivo de ejemplo
   cp .env.example .env.local
   
   # Editar variables de entorno
   nano .env.local
   ```

4. **Ejecutar en desarrollo**
   ```bash
   # Modo desarrollo con hot reload
   npm run dev
   
   # O para el backend
   npm run dev:backend
   ```

5. **Build para producción**
   ```bash
   # Build del frontend
   npm run build
   
   # Preview del build
   npm run preview
   ```

### Variables de Entorno Requeridas

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# OpenAI Configuration
OPENAI_API_KEY=tu-api-key-aqui

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/gproa

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Vector Database
PINECONE_API_KEY=tu-pinecone-key
PINECONE_ENVIRONMENT=us-east1-aws
```

---

## 💻 Uso del Proyecto

### Interfaz de Chat

1. Accede a la aplicación en `http://localhost:5173`
2. Escribe tu consulta sobre productos bancarios o seguros
3. El asistente procesará tu pregunta y proporcionará una respuesta
4. Puedes continuar la conversación para profundizar en el tema

### Panel de Administración

1. Accede a `http://localhost:5173/admin`
2. Inicia sesión con credenciales de administrador
3. Gestiona usuarios, conversaciones y configuraciones

### API Endpoints

#### Chat API
```
POST /api/chat
- Envía un mensaje al asistente
- Body: { "message": "tu pregunta aquí", "context": {} }
- Response: { "response": "respuesta del asistente", "confidence": 0.95 }
```

#### Knowledge API
```
GET /api/knowledge/search
- Busca información en la base de conocimiento
- Query: ?q=tu+consulta&limit=5
- Response: { "results": [...] }
```

---

## 📚 API Reference

### Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/chat` | Envía mensaje al asistente |
| GET | `/api/chat/history/:sessionId` | Obtiene historial de chat |
| GET | `/api/products` | Lista productos disponibles |
| GET | `/api/products/:id` | Detalle de producto |
| POST | `/api/users` | Crea nuevo usuario |
| POST | `/api/analytics` | Registra evento analítico |

### Errores Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no existe |
| 500 | Internal Server Error - Error del servidor |

---

## 🤝 Contribución

¡Agradecemos las contribuciones! Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código del proyecto
- Esribe tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Asegúrate de que los tests pasen antes de hacer PR

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 📞 Contacto

- **Nombre del Proyecto**: GProA - Capacitación Bancos y Aseguradoras
- **Email**: contacto@gproa.com
- **GitHub**: [https://github.com/tu-usuario](https://github.com/tu-usuario)
- **Documentación**: [https://docs.gproa.com](https://docs.gproa.com)

---

## 🙏 Agradecimientos

- [OpenAI](https://openai.com) por los modelos de lenguaje
- [Vercel](https://vercel.com) por la infraestructura
- [Tailwind CSS](https://tailwindcss.com) por el framework de estilos
- [Todos los contribuidores](https://github.com/tu-usuario/graphs/contributors)

---

⭐ **Si este proyecto te fue útil, no olvides darle una estrella en GitHub!**
He creado la configuración completa de Docker para el proyecto GProA. Los archivos creados son:

## Archivos Creados:

1. **[`capacita-seguros/Dockerfile`](capacita-seguros/Dockerfile)** - Dockerfile del frontend con:
   - Imagen Node.js 18 Alpine (ligera)
   - Instalación de dependencias con npm ci
   - Puerto 5173 expuesto para Vite
   - Comando para ejecutar servidor de desarrollo

2. **[`docker-compose.yml`](docker-compose.yml)** - Orquestación de servicios con:
   - **frontend**: Aplicación React/Vite en puerto 5173
   - **db**: PostgreSQL 15 en puerto 5432 con volumen persistente
   - **cache**: Redis 7 en puerto 6379 con volumen persistente
   - Red bridge para comunicación entre servicios
   - Health checks configurados

3. **[`init-scripts/01-init.sql`](init-scripts/01-init.sql)** - Schema de base de datos con tablas para:
   - Agentes de seguros
   - Exámenes y simulacros
   - Preguntas y respuestas
   - Progreso de agentes
   - Sesiones y logs de actividad

4. **[`.env.example`](.env.example)** - Variables de entorno de ejemplo

5. **[`README.md`](README.md)** - Actualizado con sección de Docker

---

## Comando para levantar todo el ecosistema:

```bash
docker-compose up -d
```

Este comando:
- Construye la imagen del frontend
- Levanta los 3 servicios (frontend, db, cache)
- Crea los volúmenes persistentes
- Configura la red interna

** URLs de acceso:**
- Frontend: http://localhost:5173
- PostgreSQL: localhost:5432 (usuario: gproa_user, password: gproa_password)
- Redis: localhost:6379

**Para detener:**
```bash
docker-compose down
```

**Para detener y eliminar datos:**
```bash
docker-compose down -v
```

cd capacita-seguros && npm run dev