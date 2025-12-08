// Verificar si el usuario está autenticado
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return { token, user };
}

// Guardar datos de sesión
function saveSession(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
    }));
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}

// Proteger página (requiere autenticación)
function requireAuth(requiredRole = null) {
    const { token, user } = checkAuth();
    
    if (!token || !user) {
        window.location.href = '/pages/login.html';
        return null;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        Utils.showAlert('No tienes permisos para acceder a esta página', 'danger');
        setTimeout(() => {
            window.location.href = '/pages/login.html';
        }, 2000);
        return null;
    }
    
    return user;
}

// Redirigir según rol
function redirectByRole(user) {
    if (user.role === 'teacher') {
        window.location.href = '/pages/teacher-dashboard.html';
    } else {
        window.location.href = '/pages/student-dashboard.html';
    }
}

// Actualizar navbar con información del usuario
function updateNavbar() {
    const { user } = checkAuth();
    const navMenu = document.getElementById('navMenu');
    
    if (user && navMenu) {
        navMenu.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="bi bi-person-circle"></i> ${user.name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/pages/profile.html">
                        <i class="bi bi-person"></i> Mi Perfil
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()">
                        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                    </a></li>
                </ul>
            </li>
        `;
    }
}

// Ejecutar al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbar);
} else {
    updateNavbar();
}
