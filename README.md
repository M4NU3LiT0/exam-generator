# 🎓 Sistema de Exámenes - Proyecto Full Stack

Sistema completo para la gestión de exámenes en línea con roles de profesor y estudiante.

## 📋 Descripción del Proyecto

Plataforma educativa que permite a profesores crear y administrar exámenes, y a estudiantes presentarlos en línea con calificación automática.

## 🚀 Características Principales

### Para Profesores
- ✅ Crear y gestionar exámenes
- ✅ Agregar preguntas (opción múltiple, verdadero/falso, respuesta corta)
- ✅ Ver estadísticas y resultados de estudiantes
- ✅ Activar/Desactivar exámenes
- ✅ Dashboard con análisis de desempeño

### Para Estudiantes
- ✅ Ver exámenes disponibles
- ✅ Presentar exámenes en línea
- ✅ Ver resultados y calificaciones automáticas
- ✅ Historial de exámenes completados
- ✅ Revisar respuestas correctas

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT para autenticación
- bcrypt para encriptación

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript Vanilla (sin frameworks)

## 📦 Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB Atlas (cuenta gratuita)
- Git

### 1. Clonar el Repositorio
```bash
git clone <tu-repositorio>
cd exam-system-fullstack
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.template`:
```env
MONGODB_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta_segura
PORT=5000
NODE_ENV=development
```

### 3. Iniciar el Servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará disponible en: `http://localhost:5000`

## 🌐 Deployment en Render

### Paso 1: Preparar el Repositorio
1. Asegúrate de tener un repositorio en GitHub
2. Sube todo tu código

### Paso 2: Crear Web Service en Render
1. Ve a [render.com](https://render.com)
2. Crea una cuenta o inicia sesión
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Name**: exam-system-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: dejar vacío

### Paso 3: Variables de Entorno
En la sección "Environment Variables", agrega:
- `MONGODB_URI`: tu URL de MongoDB Atlas
- `JWT_SECRET`: tu clave secreta
- `NODE_ENV`: production

### Paso 4: Desplegar
Click en "Create Web Service" y espera a que se despliegue.

Tu URL será algo como: `https://exam-system-api.onrender.com`

## 🔐 Credenciales de Prueba

Una vez desplegado, puedes crear usuarios o usar estos:

### Profesor
- **Email**: teacher@test.com
- **Password**: password123

### Estudiante
- **Email**: student@test.com
- **Password**: password123

## 📡 API Endpoints

### Autenticación
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Registrar usuario | Público |
| POST | `/api/auth/login` | Iniciar sesión | Público |
| GET | `/api/auth/profile` | Obtener perfil | Privado |
| PUT | `/api/auth/profile` | Actualizar perfil | Privado |

### Exámenes
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/exams` | Listar exámenes | Privado |
| GET | `/api/exams/:id` | Obtener examen | Privado |
| POST | `/api/exams` | Crear examen | Profesor |
| PUT | `/api/exams/:id` | Actualizar examen | Profesor |
| DELETE | `/api/exams/:id` | Eliminar examen | Profesor |
| PATCH | `/api/exams/:id/toggle-active` | Activar/Desactivar | Profesor |

### Preguntas
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/questions/exam/:examId` | Listar preguntas | Privado |
| POST | `/api/questions` | Crear pregunta | Profesor |
| PUT | `/api/questions/:id` | Actualizar pregunta | Profesor |
| DELETE | `/api/questions/:id` | Eliminar pregunta | Profesor |

### Resultados
| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | `/api/results` | Enviar examen | Estudiante |
| GET | `/api/results/my-results` | Mis resultados | Estudiante |
| GET | `/api/results/:id` | Ver resultado | Privado |
| GET | `/api/results/exam/:examId` | Resultados por examen | Profesor |
| GET | `/api/results/stats/dashboard` | Estadísticas | Profesor |

## 🧪 Pruebas con Postman

1. Importa la colección incluida en `postman_collection.json`
2. Configura la variable de entorno `base_url` con tu URL
3. Ejecuta los endpoints en orden:
   - Register → Login → Get Profile
   - Crear examen → Agregar preguntas
   - Enviar respuestas → Ver resultados

## 📁 Estructura del Proyecto

```
exam-system-fullstack/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── examController.js
│   │   ├── questionController.js
│   │   └── resultController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Exam.js
│   │   ├── Question.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── examRoutes.js
│   │   ├── questionRoutes.js
│   │   └── resultRoutes.js
│   ├── .env.template
│   ├── package.json
│   └── server.js
└── frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── config.js
    │   └── auth.js
    ├── pages/
    │   ├── login.html
    │   ├── register.html
    │   ├── teacher-dashboard.html
    │   └── student-dashboard.html
    └── index.html
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación con JWT
- Validación de roles (profesor/estudiante)
- Protección de rutas según permisos

## 🎯 Flujo de la Aplicación

### Usuario Invitado
1. Puede ver la página de inicio
2. Debe registrarse o iniciar sesión para acceder

### Profesor
1. Inicia sesión
2. Accede a su dashboard
3. Crea exámenes y agrega preguntas
4. Activa exámenes para estudiantes
5. Ve resultados y estadísticas

### Estudiante
1. Inicia sesión
2. Ve exámenes disponibles
3. Presenta exámenes
4. Obtiene calificación automática
5. Revisa su historial

## 📝 Aspectos Legales

### Banner de Cookies
**¿Se necesita?** Sí, porque se guarda:
- Token JWT en localStorage
- Información de sesión del usuario

### Política de Privacidad
Se recolectan:
- Nombre, email (autenticación)
- Resultados de exámenes
- No se comparte con terceros

### Términos y Condiciones
- Contenido creado por profesores es propiedad de ellos
- Sistema solo almacena para fines educativos
- Usuarios pueden solicitar eliminación de datos

## 👥 Contribuidores

- [Tu Nombre] - Frontend y Backend
- [Compañero 2] - [Tareas específicas]
- [Compañero 3] - [Tareas específicas]

## 📄 Licencia

Este proyecto es parte de un trabajo académico.

## 🐛 Problemas Conocidos

- Ninguno por el momento

## 📞 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

---

**Desarrollado con ❤️ para el curso de Desarrollo Web**
