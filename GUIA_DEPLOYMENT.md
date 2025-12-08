# 🚀 Guía de Deployment en Render

## Requisitos Previos
1. Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuita)
2. Cuenta en [Render](https://render.com) (gratuita)
3. Repositorio en GitHub con tu proyecto

## Paso 1: Configurar MongoDB Atlas

### 1.1 Crear Cluster
1. Inicia sesión en MongoDB Atlas
2. Click en "Build a Database"
3. Selecciona el plan FREE (M0)
4. Elige una región cercana (AWS - us-east-1)
5. Click en "Create Cluster"

### 1.2 Configurar Acceso
1. En "Database Access", crea un usuario:
   - Username: `examuser`
   - Password: (genera una contraseña segura)
   - Database User Privileges: Read and write to any database

2. En "Network Access", agrega IP:
   - Click "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - Esto es necesario para que Render pueda conectarse

### 1.3 Obtener URI de Conexión
1. En "Database", click en "Connect"
2. Selecciona "Connect your application"
3. Copia la URI (se ve así):
   ```
   mongodb+srv://examuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Reemplaza `<password>` con tu contraseña real
5. Agrega el nombre de tu base de datos: `/exam-system` antes de `?`
   ```
   mongodb+srv://examuser:tupassword@cluster0.xxxxx.mongodb.net/exam-system?retryWrites=true&w=majority
   ```

## Paso 2: Preparar el Proyecto para Deployment

### 2.1 Estructura Requerida
Asegúrate de que tu proyecto tenga esta estructura:
```
tu-repositorio/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── ... (todos los archivos del backend)
├── frontend/
│   ├── index.html
│   └── ... (todos los archivos del frontend)
├── .gitignore
└── README.md
```

### 2.2 Actualizar package.json del Backend
Verifica que tenga estos scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 2.3 Subir a GitHub
```bash
git add .
git commit -m "Preparar para deployment"
git push origin main
```

## Paso 3: Deployment en Render

### 3.1 Crear Web Service
1. Ve a [render.com](https://render.com) e inicia sesión
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Si es privado, autoriza a Render

### 3.2 Configuración del Service
Completa el formulario con estos valores:

**Basic Configuration:**
- **Name**: `exam-system-api` (o el nombre que prefieras)
- **Region**: Oregon (US West) - la más cercana gratis
- **Branch**: `main`
- **Root Directory**: dejar vacío
- **Runtime**: Node
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

**Instance Type:**
- Selecciona **Free** ($0/month)

### 3.3 Variables de Entorno
En la sección "Environment Variables", click en "Add Environment Variable" para cada una:

1. `MONGODB_URI`
   - Value: Tu URI completa de MongoDB Atlas
   - Ejemplo: `mongodb+srv://examuser:password123@cluster0.xxxxx.mongodb.net/exam-system?retryWrites=true&w=majority`

2. `JWT_SECRET`
   - Value: Una cadena aleatoria y segura
   - Ejemplo: `mi_super_secreto_jwt_12345_cambialo`
   - Puedes generarla con: `openssl rand -base64 32`

3. `NODE_ENV`
   - Value: `production`

4. `PORT`
   - Value: `5000`

### 3.4 Desplegar
1. Click en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Espera 3-5 minutos (primera vez puede tardar más)
4. Verás el progreso en los logs

### 3.5 Verificar Deployment
Una vez completado:
1. Tu URL será algo como: `https://exam-system-api.onrender.com`
2. Prueba abriendo: `https://exam-system-api.onrender.com/api`
3. Deberías ver un mensaje JSON de bienvenida

## Paso 4: Actualizar Frontend para Producción

Si quieres usar el frontend con tu API en producción:

### Opción A: Actualizar config.js
Abre `frontend/js/config.js` y asegúrate que detecte correctamente la URL:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://exam-system-api.onrender.com/api'; // Tu URL de Render
```

### Opción B: Servir Frontend desde Render
Tu backend ya está configurado para servir los archivos estáticos del frontend.
Solo visita: `https://exam-system-api.onrender.com`

## Paso 5: Crear Usuarios de Prueba

### 5.1 Desde Postman
1. Abre Postman
2. Cambia `base_url` a tu URL de Render
3. Ejecuta "Register" para crear usuarios de prueba

### 5.2 Desde la Interfaz Web
1. Ve a tu URL: `https://exam-system-api.onrender.com`
2. Click en "Registrarse"
3. Crea un usuario profesor y uno estudiante

## Paso 6: Credenciales para el Reporte

Una vez creados, documenta:

**Profesor de Prueba:**
- Email: teacher@test.com
- Password: password123

**Estudiante de Prueba:**
- Email: student@test.com
- Password: password123

## Troubleshooting

### Error: "Application failed to respond"
- Verifica que el Build Command sea correcto
- Revisa los logs en Render
- Asegúrate de que MongoDB URI sea correcta

### Error: "Cannot connect to database"
- Verifica que la IP 0.0.0.0/0 esté permitida en MongoDB Atlas
- Confirma que el usuario y contraseña sean correctos
- Asegúrate de haber reemplazado `<password>` en la URI

### La aplicación se "duerme"
- Es normal en el plan Free de Render
- Después de 15 minutos de inactividad, se apaga
- La primera petición la despierta (puede tardar 30-60 segundos)

### Frontend no carga
- Verifica que los archivos estén en la carpeta `frontend/`
- Revisa que server.js tenga la configuración de archivos estáticos

## Mantenimiento

### Actualizar la Aplicación
1. Haz cambios en tu código local
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin main
   ```
3. Render detecta el cambio y redespliega automáticamente

### Ver Logs
1. En Render, ve a tu service
2. Click en "Logs" en el menú lateral
3. Aquí verás todos los logs en tiempo real

### Monitorear
Render muestra:
- Estado del servicio (Running/Deploying/Failed)
- Uso de recursos
- Historial de deployments

## Notas Importantes

1. **Plan Free tiene límites:**
   - 750 horas/mes
   - Se duerme después de 15 min de inactividad
   - Puede tardar en despertar

2. **MongoDB Atlas Free tiene límites:**
   - 512 MB de almacenamiento
   - Conexiones compartidas
   - Suficiente para proyectos pequeños

3. **Seguridad:**
   - NUNCA compartas tu JWT_SECRET
   - Cambia las credenciales de prueba regularmente
   - No uses las mismas contraseñas en producción

## Enlaces Útiles

- [Documentación de Render](https://render.com/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

¡Listo! Tu aplicación debería estar funcionando en:
`https://tu-app-name.onrender.com` 🎉
