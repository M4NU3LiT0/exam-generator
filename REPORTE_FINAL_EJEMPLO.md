# REPORTE FINAL DEL PROYECTO
## Sistema de Exámenes en Línea

---

**Proyecto:** Sistema de Exámenes en Línea  
**Materia:** Desarrollo Web Full Stack  
**Equipo:**
- [Tu Nombre] - [Matrícula]
- [Nombre Compañero 2] - [Matrícula]  
- [Nombre Compañero 3] - [Matrícula]

**Fecha:** 8 de Diciembre, 2024

---

## 1. ENLACES Y ACCESOS (Deployment)

### URL del Proyecto (Render)
🌐 **Producción:** https://exam-system-api.onrender.com

### Repositorio (GitHub)
📦 **GitHub:** https://github.com/tu-usuario/exam-system-fullstack

### Credenciales para Pruebas

**Para probar flujo de Profesor:**
- **Usuario:** teacher@test.com
- **Password:** password123

**Para probar flujo de Estudiante:**
- **Usuario:** student@test.com  
- **Password:** password123

---

## 2. DESCRIPCIÓN Y FLUJO

### Descripción Corta
El Sistema de Exámenes en Línea es una plataforma educativa que permite a profesores crear, gestionar y calificar exámenes de manera automatizada, mientras que los estudiantes pueden presentarlos en línea y obtener resultados instantáneos.

**Problema que resuelve:**
- Elimina la necesidad de exámenes en papel
- Calificación automática e instantánea
- Seguimiento del desempeño estudiantil
- Gestión centralizada de evaluaciones

### Flujo por Roles

#### 👤 Usuario Invitado
- ✅ Puede ver la página de inicio con información del sistema
- ✅ Puede leer sobre las características
- ❌ No puede acceder a exámenes
- 📝 Debe registrarse para usar la plataforma

#### 👨‍🎓 Usuario Registrado (Estudiante)
1. **Inicio de Sesión:** Accede con sus credenciales
2. **Dashboard:** Ve todos los exámenes disponibles
3. **Presentar Examen:** Selecciona un examen y lo presenta en línea
4. **Resultados:** Obtiene calificación automática al terminar
5. **Historial:** Puede revisar todos sus exámenes completados
6. **Perfil:** Puede editar su información personal

#### 👨‍🏫 Administrador (Profesor)
1. **Inicio de Sesión:** Accede con credenciales de profesor
2. **Dashboard:** Ve estadísticas de todos sus exámenes
3. **Crear Examen:** Define título, descripción, duración y puntos
4. **Agregar Preguntas:** Crea preguntas de:
   - Opción múltiple
   - Verdadero/Falso
   - Respuesta corta
5. **Gestionar Estado:** Activa o desactiva exámenes
6. **Ver Resultados:** Analiza el desempeño de estudiantes
7. **Estadísticas:** Accede a dashboard con métricas clave

---

## 3. DOCUMENTACIÓN DE LA API (Final)

### Base URL
```
Desarrollo: http://localhost:5000/api
Producción: https://exam-system-api.onrender.com/api
```

### Endpoints

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| **AUTENTICACIÓN** |
| POST | `/auth/register` | Registrar nuevo usuario | No | - |
| POST | `/auth/login` | Iniciar sesión | No | - |
| GET | `/auth/profile` | Obtener perfil del usuario | Sí | Todos |
| PUT | `/auth/profile` | Actualizar perfil | Sí | Todos |
| **EXÁMENES** |
| GET | `/exams` | Listar todos los exámenes | Sí | Todos |
| GET | `/exams/:id` | Obtener examen específico | Sí | Todos |
| POST | `/exams` | Crear nuevo examen | Sí | Profesor |
| PUT | `/exams/:id` | Actualizar examen | Sí | Profesor |
| DELETE | `/exams/:id` | Eliminar examen | Sí | Profesor |
| PATCH | `/exams/:id/toggle-active` | Activar/Desactivar | Sí | Profesor |
| **PREGUNTAS** |
| GET | `/questions/exam/:examId` | Listar preguntas de un examen | Sí | Todos |
| GET | `/questions/:id` | Obtener pregunta específica | Sí | Profesor |
| POST | `/questions` | Crear nueva pregunta | Sí | Profesor |
| PUT | `/questions/:id` | Actualizar pregunta | Sí | Profesor |
| DELETE | `/questions/:id` | Eliminar pregunta | Sí | Profesor |
| **RESULTADOS** |
| POST | `/results` | Enviar respuestas de examen | Sí | Estudiante |
| GET | `/results/my-results` | Obtener mis resultados | Sí | Estudiante |
| GET | `/results/:id` | Ver resultado específico | Sí | Todos |
| GET | `/results/exam/:examId` | Resultados por examen | Sí | Profesor |
| GET | `/results/stats/dashboard` | Estadísticas generales | Sí | Profesor |

### Ejemplos de Request/Response

#### 1. Registro de Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "securepass123",
  "role": "student"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "674c1234567890abcdef1234",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "student",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Crear Examen
```http
POST /api/exams
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Examen de Matemáticas",
  "description": "Álgebra básica",
  "subject": "Matemáticas",
  "duration": 60,
  "totalPoints": 100
}
```

#### 3. Enviar Respuestas
```http
POST /api/results
Authorization: Bearer {token}
Content-Type: application/json

{
  "examId": "674c1234567890abcdef5678",
  "answers": [
    {
      "questionId": "674c1234567890abcdef9012",
      "selectedAnswer": "674c1234567890abcdef9013"
    }
  ],
  "timeTaken": 1800
}
```

---

## 4. SCREENSHOTS DESTACADOS

### 4.1 Dashboard del Profesor
![Dashboard Profesor](ruta/a/screenshot1.png)
*Vista principal del profesor mostrando estadísticas de exámenes*

### 4.2 Creación de Examen
![Crear Examen](ruta/a/screenshot2.png)
*Formulario para crear un nuevo examen con preguntas*

### 4.3 Dashboard del Estudiante
![Dashboard Estudiante](ruta/a/screenshot3.png)
*Vista de exámenes disponibles para el estudiante*

### 4.4 Resultados de Examen
![Resultados](ruta/a/screenshot4.png)
*Visualización de resultados con calificación automática*

---

## 5. DISTRIBUCIÓN DE ACTIVIDADES Y % DE PARTICIPACIÓN

### Tabla Detallada de Contribuciones

| Alumno | Tareas Backend Realizadas | Tareas Frontend Realizadas | % Participación |
|--------|---------------------------|----------------------------|-----------------|
| **[Tu Nombre]** | • Configuración inicial del servidor Express<br>• Implementación de modelos MongoDB (User, Exam, Question, Result)<br>• Sistema de autenticación con JWT y bcrypt<br>• Middleware de protección de rutas | • Estructura HTML de todas las páginas<br>• Sistema de autenticación en frontend<br>• Dashboard del profesor<br>• Integración con API (config.js, auth.js) | **35%** |
| **[Nombre 2]** | • Controladores de Exámenes (CRUD completo)<br>• Controladores de Preguntas<br>• Lógica de activación/desactivación de exámenes<br>• Rutas de exámenes y preguntas | • Dashboard del estudiante<br>• Página de presentación de exámenes<br>• Estilos CSS personalizados<br>• Interfaz de visualización de preguntas | **33%** |
| **[Nombre 3]** | • Controlador de Resultados<br>• Sistema de calificación automática<br>• Estadísticas y dashboard<br>• Testing con Postman<br>• Deployment en Render | • Página de resultados<br>• Visualización de estadísticas<br>• Página de inicio (landing)<br>• Responsive design<br>• Documentación README | **32%** |

### Desglose Específico por Persona

#### [Tu Nombre] - Backend Core & Auth Frontend
**Backend (20%):**
- Configuración de Express y middleware
- Modelos de Mongoose (User, Exam, Question, Result)
- Sistema JWT completo
- Conexión a MongoDB Atlas
- Middleware de autenticación y autorización

**Frontend (15%):**
- Estructura base HTML/Bootstrap
- Sistema de login/registro
- LocalStorage para tokens
- Dashboard profesor base
- Configuración de API (config.js)

#### [Nombre 2] - Exámenes & Student Frontend
**Backend (18%):**
- CRUD de exámenes (create, read, update, delete)
- CRUD de preguntas
- Lógica de permisos por rol
- Toggle de estado de exámenes
- Populación de datos relacionados

**Frontend (15%):**
- Dashboard estudiante completo
- Interfaz para tomar exámenes
- CSS personalizado (style.css)
- Componentes de preguntas
- Timer para exámenes

#### [Nombre 3] - Results & Deployment
**Backend (17%):**
- Sistema de calificación automática
- Cálculo de porcentajes y aprobación
- Estadísticas para profesor
- Dashboard de métricas
- Collection de Postman

**Frontend (15%):**
- Página de resultados detallados
- Visualización de respuestas correctas/incorrectas
- Landing page principal
- Documentación completa
- Deployment en Render y MongoDB Atlas

---

## 6. ESTADO DEL PROYECTO

### Lo que funciona correctamente ✅

1. **Sistema de Autenticación**
   - ✅ Registro de usuarios (profesor/estudiante)
   - ✅ Login con JWT
   - ✅ Protección de rutas por rol
   - ✅ Actualización de perfil

2. **Gestión de Exámenes (Profesor)**
   - ✅ Crear exámenes con toda la información
   - ✅ Agregar preguntas (3 tipos)
   - ✅ Editar y eliminar exámenes
   - ✅ Activar/Desactivar exámenes
   - ✅ Ver lista de todos sus exámenes

3. **Presentación de Exámenes (Estudiante)**
   - ✅ Ver exámenes disponibles
   - ✅ Presentar examen completo
   - ✅ Calificación automática instantánea
   - ✅ Ver historial de resultados

4. **Resultados y Estadísticas**
   - ✅ Cálculo automático de puntuación
   - ✅ Determinación de aprobado/reprobado (60%)
   - ✅ Dashboard con métricas para profesor
   - ✅ Visualización de respuestas correctas

5. **Deployment y Producción**
   - ✅ Desplegado en Render
   - ✅ Base de datos en MongoDB Atlas
   - ✅ Variables de entorno configuradas
   - ✅ Frontend servido desde backend

### Pendientes/Bugs conocidos ⚠️

1. **Funcionalidad Menor:**
   - ⚠️ No hay límite de tiempo en el frontend (solo backend)
   - ⚠️ No se puede editar un examen después de que alguien lo presente
   - ⚠️ No hay paginación en listas largas de exámenes

2. **UX/UI:**
   - ⚠️ Falta confirmación al eliminar exámenes
   - ⚠️ No hay feedback visual durante operaciones lentas
   - ⚠️ Diseño podría mejorarse en mobile

3. **Características Futuras:**
   - 📝 Sistema de reportes en PDF
   - 📝 Notificaciones por email
   - 📝 Gráficas de rendimiento
   - 📝 Exportación de resultados a Excel

---

## 7. CUMPLIMIENTO LEGAL Y NORMATIVO

### 7.1 Banner de Cookies

**¿Tu sitio debería tenerlo?**
**Respuesta: SÍ**

**Justificación:**
Nuestro sistema almacena información en el navegador del usuario mediante localStorage:
- Token JWT para mantener la sesión activa
- Información básica del usuario (nombre, email, rol)
- Preferencias de usuario

Aunque no usamos cookies tradicionales, el GDPR considera que cualquier almacenamiento local debe informarse al usuario.

**Implementación recomendada:**
```html
<div class="cookie-banner">
  Este sitio almacena datos de sesión en tu navegador para 
  mantener tu sesión activa. Al usar el sitio, aceptas esta 
  funcionalidad necesaria para el servicio.
  <button>Entendido</button>
</div>
```

### 7.2 Políticas de Privacidad

**Explicación de datos recolectados:**

**Información que recolectamos:**
1. **Datos de Registro:**
   - Nombre completo
   - Correo electrónico
   - Contraseña (encriptada con bcrypt)

2. **Datos de Uso:**
   - Exámenes creados (profesores)
   - Respuestas a exámenes (estudiantes)
   - Resultados y calificaciones
   - Fechas de actividad

**Propósito de la recolección:**
- Autenticación y autorización de usuarios
- Funcionamiento del sistema de exámenes
- Generación de estadísticas educativas
- Mejora del servicio

**Compartir con terceros:**
- ❌ NO compartimos información con terceros
- ❌ NO vendemos datos de usuarios
- ✅ Los datos se almacenan en MongoDB Atlas (procesador de datos)
- ✅ Solo el profesor puede ver resultados de sus propios estudiantes

**Retención de datos:**
- Los datos se mantienen mientras la cuenta esté activa
- Usuario puede solicitar eliminación de cuenta y datos
- Backup de seguridad se mantiene por 30 días

**Seguridad:**
- Contraseñas encriptadas con bcrypt (sal de 10 rondas)
- Comunicación HTTPS en producción
- Tokens JWT con expiración de 30 días
- Base de datos con autenticación obligatoria

### 7.3 Términos y Condiciones

**Ejemplos aplicables a nuestro sistema:**

**1. Uso Aceptable**
```
Los usuarios se comprometen a:
- Usar el sistema solo con fines educativos
- No compartir credenciales de acceso
- No intentar acceder a información de otros usuarios
- No subir contenido ofensivo o ilegal en preguntas/respuestas
```

**2. Propiedad Intelectual**
```
CONTENIDO DEL PROFESOR:
- El profesor retiene todos los derechos sobre los exámenes creados
- Al usar la plataforma, otorga licencia para almacenar y mostrar 
  el contenido a los estudiantes autorizados
- Puede exportar o eliminar su contenido en cualquier momento

CONTENIDO DEL ESTUDIANTE:
- Las respuestas de los estudiantes son de su propiedad
- El profesor puede verlas únicamente con fines de evaluación
- No se pueden usar respuestas con fines comerciales
```

**3. Limitación de Responsabilidad**
```
La plataforma se proporciona "tal cual":
- No garantizamos disponibilidad 100% del tiempo
- No somos responsables de pérdida de datos por fallas técnicas
- Se recomienda mantener copias de respaldo de contenido importante
- El sistema de calificación automática puede tener errores
```

**4. Modificaciones al Servicio**
```
Nos reservamos el derecho de:
- Modificar características del sistema
- Suspender el servicio temporalmente para mantenimiento
- Actualizar estos términos (se notificará por email)
```

**5. Terminación de Cuenta**
```
Podemos suspender cuentas que:
- Violen estos términos
- Intenten comprometer la seguridad del sistema
- Usen el servicio para actividades ilegales

El usuario puede eliminar su cuenta en cualquier momento 
desde su perfil o contactando soporte.
```

**6. Ley Aplicable**
```
Estos términos se rigen por las leyes de [Tu País/Estado].
Cualquier disputa se resolverá en los tribunales de [Tu Jurisdicción].
```

---

## 8. REFLEXIONES INDIVIDUALES

### [Tu Nombre]
"Este proyecto me permitió entender el ciclo completo de desarrollo de una aplicación web moderna. Aprendí a implementar autenticación segura con JWT, diseñar modelos de base de datos relacionales con MongoDB, y conectar frontend con backend mediante API REST. Lo más valioso fue enfrentar problemas reales de deployment y entender la importancia de la seguridad en aplicaciones web. Las herramientas aprendidas (Node.js, Express, MongoDB) son fundamentales en el desarrollo web actual y estoy seguro de que las usaré en proyectos futuros. El trabajo en equipo también fue crucial para completar un proyecto de esta magnitud."

### [Nombre Compañero 2]
"Desarrollar la parte de gestión de exámenes me enseñó la importancia de pensar en la experiencia del usuario desde el principio. Implementar CRUD completo, manejar relaciones entre colecciones y validar permisos por rol fueron retos que me hicieron crecer como desarrollador. Aprendí que el backend no es solo escribir código que funciona, sino código mantenible, seguro y eficiente. El CSS y Bootstrap me mostraron que un buen diseño es tan importante como la funcionalidad. Trabajar con Git y resolver conflictos de merge fue una experiencia valiosa para trabajo colaborativo."

### [Nombre Compañero 3]
"La parte de calificación automática fue el desafío más interesante. Tuve que pensar en todos los casos posibles: respuestas múltiples, textuales, verdadero/falso. El deployment en Render y configurar MongoDB Atlas me dio experiencia práctica en DevOps. Crear la documentación me hizo valorar la importancia de un buen README y guías claras. Las pruebas con Postman me enseñaron a verificar que cada endpoint funciona correctamente antes de conectar el frontend. Este proyecto me demostró que el desarrollo web es más que código: es documentación, testing, deployment y mantenimiento."

---

## 9. TECNOLOGÍAS Y HERRAMIENTAS UTILIZADAS

### Backend
- **Node.js** v18+ - Runtime de JavaScript
- **Express.js** v4.18 - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** (jsonwebtoken) - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos personalizados
- **Bootstrap 5.3** - Framework UI
- **Bootstrap Icons** - Iconografía
- **JavaScript ES6+** - Lógica de aplicación
- **Fetch API** - Peticiones HTTP

### Herramientas de Desarrollo
- **Git & GitHub** - Control de versiones
- **Postman** - Testing de API
- **VS Code** - Editor de código
- **MongoDB Compass** - Cliente de MongoDB
- **Chrome DevTools** - Debugging

### Servicios Cloud
- **Render** - Hosting de backend
- **MongoDB Atlas** - Base de datos en la nube
- **GitHub** - Repositorio de código

---

## 10. CONCLUSIONES

El Sistema de Exámenes en Línea cumple exitosamente con los objetivos planteados al inicio del proyecto. Hemos logrado crear una plataforma funcional, segura y desplegada en producción que resuelve necesidades reales del ámbito educativo.

**Logros principales:**
- ✅ API REST completa y documentada
- ✅ Sistema de autenticación robusto
- ✅ Interfaz intuitiva y responsive
- ✅ Calificación automática funcional
- ✅ Deployment exitoso en Render

**Aprendizajes clave:**
- Arquitectura de aplicaciones full stack
- Mejores prácticas de seguridad web
- Trabajo colaborativo con Git
- Deployment y DevOps básico

Este proyecto nos ha preparado para enfrentar retos del desarrollo web profesional y nos ha dado las bases para continuar aprendiendo y mejorando nuestras habilidades.

---

**Firma de los integrantes:**

________________________  
[Tu Nombre]

________________________  
[Nombre Compañero 2]

________________________  
[Nombre Compañero 3]

**Fecha de entrega:** 8 de Diciembre, 2024
