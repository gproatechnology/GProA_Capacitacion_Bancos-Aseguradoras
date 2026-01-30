import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials } from '../types/auth';
import { Logo } from '../components/Logo';
import splashImage from '../assets/login1.png';
import './Login.css';

const aseguradoras = [
  { id: 'GNP', name: 'GNP (Grupo Nacional Provincial)' },
  { id: 'AXA', name: 'AXA México' },
  { id: 'Banorte', name: 'Banorte Seguros' },
  { id: 'BBVA', name: 'BBVA Seguros' },
  { id: 'Chubb', name: 'Chubb México' },
  { id: 'HSBC', name: 'HSBC Seguros' },
  { id: 'MetLife', name: 'MetLife México' },
  { id: 'Primero', name: 'Primero Seguros' },
];

// Demo users - las contraseñas se validan contra requisitos mínimos
// NO almacenar contraseñas en texto plano
export const demoUsers = [
  { email: 'demo@gnp.com', company: 'GNP' },
  { email: 'demo@axa.com', company: 'AXA' },
  { email: 'demo@banorte.com', company: 'Banorte' },
];

// Requisitos de contraseña mostrados al usuario
const PASSWORD_REQUIREMENTS = 'Mínimo 12 caracteres: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    company: '',
  });

  // Navegar al dashboard cuando se autentica exitosamente
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  const handleDemoAccess = (demoUser: { email: string; company: string }) => {
    setCredentials({
      email: demoUser.email,
      password: '', // El usuario debe ingresar su contraseña
      company: demoUser.company,
    });
    // Enfocar el campo de contraseña
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput?.focus();
  };

  const handleQuickDemo = () => {
    // Usar el primer demo user
    setCredentials({
      email: 'demo@gnp.com',
      password: '', // El usuario debe ingresar su contraseña
      company: 'GNP',
    });
    // Enfocar el campo de contraseña
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput?.focus();
  };

  return (
    <div className="login-container">
      <img src={splashImage} alt="Login Background" className="login-background" />
      <div className="login-overlay"></div>
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Logo size="medium" />
          </div>
          <h1 className="login-title">GProA</h1>
          <p className="login-subtitle">Capacitación Bancos y Aseguradoras</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="company">Aseguradora</label>
            <select
              id="company"
              name="company"
              value={credentials.company}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Selecciona tu aseguradora</option>
              {aseguradoras.map(aseguradora => (
                <option key={aseguradora.id} value={aseguradora.id}>
                  {aseguradora.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="correo@empresa.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="form-input"
              aria-describedby="password-requirements"
            />
            <span id="password-requirements" className="password-requirements">
              {PASSWORD_REQUIREMENTS}
            </span>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loading">Iniciando sesión...</span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="login-demo-section">
          <div className="demo-divider">
            <span>o</span>
          </div>
          
          <button
            type="button"
            className="demo-button"
            onClick={handleQuickDemo}
          >
            🚀 Acceso Demo Rápido
          </button>

          <div className="demo-users">
            <p className="demo-users-title">Demo por aseguradora:</p>
            <div className="demo-users-list">
              {demoUsers.map(user => (
                <button
                  key={user.email}
                  type="button"
                  className="demo-user-button"
                  onClick={() => handleDemoAccess(user)}
                >
                  {user.company}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="login-footer">
        <p>© 2024 GProA - CNSF. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};
