# ⚡ INICIO RÁPIDO - Sistema de Exámenes

## 🎯 Para Empezar en 5 Minutos

### 1️⃣ Instalar Dependencias
```bash
cd backend
npm install
```

### 2️⃣ Configurar Base de Datos
1. Crea cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster
3. Obtén tu URI de conexión
4. Copia `.env.template` a `.env`
5. Pega tu URI en `.env`

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/exam-system
JWT_SECRET=cualquier_texto_secreto_aqui
PORT=5000
NODE_ENV=development
```

### 3️⃣ Iniciar Servidor
```bash
npm start
# o para desarrollo:
npm run dev
```

### 4️⃣ Abrir en Navegador
```
http://localhost:5000
```

¡Listo! 🎉

---

## 📋 Lista de Verificación Pre-Entrega

### Código
- [ ] Proyecto completo en GitHub
- [ ] `.gitignore` configurado
- [ ] No hay `node_modules` en el repo
- [ ] `.env.template` incluido (sin datos reales)

### Deployment
- [ ] Desplegado en Render
- [ ] MongoDB Atlas configurado
- [ ] Variables de entorno en Render
- [ ] URL de producción funciona

### Usuarios de Prueba
- [ ] Profesor creado (teacher@test.com)
- [ ] Estudiante creado (student@test.com)
- [ ] Al menos 1 examen con preguntas
- [ ] Al menos 1 resultado de prueba

### Documentación
- [ ] README.md completo
- [ ] Postman Collection incluida
- [ ] Reporte Final en PDF
- [ ] Video demostrativo grabado

### Reporte Final
- [ ] Portada con nombres
- [ ] URLs de producción
- [ ] Credenciales de prueba
- [ ] API Reference completa
- [ ] 3-4 screenshots
- [ ] Tabla de distribución de trabajo (ESPECÍFICA)
- [ ] Aspectos legales respondidos
- [ ] Reflexiones individuales

---

## 🚀 Comandos Útiles

### Git
```bash
# Inicializar repo
git init
git add .
git commit -m "Proyecto completo"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### Testing Local
```bash
# Instalar y ejecutar
cd backend
npm install
npm start

# En otro terminal
cd frontend
# Abrir index.html o usar Live Server
```

### Postman
1. Importar `postman_collection.json`
2. Crear variable `base_url`: `http://localhost:5000/api`
3. Register → Login → Copiar token
4. Usar token automáticamente en requests

---

## 🎬 Grabando el Video

### Estructura Sugerida (3-6 minutos)
1. **Intro (30 seg):** Mostrar URL de producción
2. **Login Profesor (1 min):** Crear examen con preguntas
3. **Login Estudiante (1 min):** Presentar examen
4. **Resultados (1 min):** Mostrar calificación automática
5. **Dashboard (1 min):** Estadísticas del profesor
6. **Conclusión (30 seg):** Mencionar tecnologías

### Tips
- Graba en pantalla completa
- Prepara el examen antes de grabar
- Usa zoom para mostrar detalles importantes
- Habla claro y no muy rápido
- Muestra el URL de producción en pantalla

---

## ❓ Troubleshooting Rápido

### "Cannot connect to database"
→ Verifica tu URI en `.env`
→ Revisa que la IP esté permitida en MongoDB Atlas

### "Port 5000 already in use"
→ Cambia PORT en `.env` a 3000 o 8000

### "Cannot find module"
→ Ejecuta `npm install` en `/backend`

### Frontend no carga
→ Asegúrate de estar en `http://localhost:5000` (no file://)

### Render "Application failed to respond"
→ Revisa los logs en Render
→ Verifica Build Command: `cd backend && npm install`
→ Verifica Start Command: `cd backend && npm start`

---

## 📞 Recursos de Ayuda

- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Render Docs:** https://render.com/docs
- **Postman:** https://learning.postman.com/docs/
- **Bootstrap:** https://getbootstrap.com/docs/
- **Express.js:** https://expressjs.com/

---

## ✨ Características Destacadas para Mencionar

- ✅ Autenticación JWT segura
- ✅ Calificación automática instantánea  
- ✅ 3 tipos de preguntas (múltiple choice, true/false, short answer)
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Roles de usuario (profesor/estudiante)
- ✅ Responsive design con Bootstrap
- ✅ API REST completa y documentada
- ✅ Deployed en Render con MongoDB Atlas

---

¡Buena suerte con tu proyecto! 🎓
