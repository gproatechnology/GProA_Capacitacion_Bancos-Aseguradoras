import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import dashboardImage from '../assets/dashboard.png';
import './Dashboard.css';

/* ===============================
   TYPES
 =============================== */

interface StatItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  variant: 'primary' | 'success' | 'info' | 'warning';
  trend: string;
}

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  description: string;
  route: string;
}

/* ===============================
   CONSTANTS (mock data - eventually from API)
 =============================== */

const STATS_DATA: StatItem[] = [
  {
    id: 'courses',
    icon: 'fa-book',
    label: 'Cursos Activos',
    value: '12',
    variant: 'primary',
    trend: '+2 este mes',
  },
  {
    id: 'exams',
    icon: 'fa-check-circle',
    label: 'Exámenes Aprobados',
    value: '8',
    variant: 'success',
    trend: 'Meta: 10',
  },
  {
    id: 'hours',
    icon: 'fa-clock',
    label: 'Horas Totales',
    value: '45h',
    variant: 'info',
    trend: '+5h hoy',
  },
  {
    id: 'average',
    icon: 'fa-trophy',
    label: 'Promedio General',
    value: '90%',
    variant: 'warning',
    trend: 'Top 5%',
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'simulator',
    icon: 'fa-graduation-cap',
    title: 'Simulador CNSF',
    description: 'Evalúa tus conocimientos con preguntas oficiales.',
    route: '/simulator',
  },
  {
    id: 'courses',
    icon: 'fa-layer-group',
    title: 'Mis Cursos',
    description: 'Accede a tu material de estudio.',
    route: '/courses',
  },
  {
    id: 'reports',
    icon: 'fa-chart-line',
    title: 'Reportes',
    description: 'Consulta tu avance y constancias.',
    route: '/progress',
  },
  {
    id: 'assistant',
    icon: 'fa-robot',
    title: 'Asistente Virtual',
    description: 'Soporte inteligente 24/7.',
    route: '/help',
  },
];

/* ===============================
   COMPONENT
 =============================== */

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleQuickActionClick = (route: string) => {
    navigate(route);
  };

  const getUserFirstName = () => {
    return user?.name?.split(' ')[0] || 'Usuario';
  };

  const getVariantClass = (variant: string) => {
    return `stat-card ${variant}`;
  };

  return (
    <div className="dashboard-container">
      <img
        src={dashboardImage}
        alt="Dashboard Background"
        className="dashboard-background"
        loading="eager"
      />
      ""<div className="dashboard-overlay" />
      
      {/* ===== HEADER ===== */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="brand-section">
            <h1 className="dashboard-title">Panel CNSF</h1>
            <span className="dashboard-subtitle">Plataforma Premium</span>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info-section">
            <div className="user-details">
              <span className="user-name" title={user?.name || ''}>
                {user?.name || 'Usuario'}
              </span>
              <span className="user-email" title={user?.email || ''}>
                {user?.email || 'usuario@ejemplo.com'}
              </span>
            </div>
            
            <button
              className="logout-button"
              onClick={handleLogout}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <i className="fas fa-sign-out-alt" />
              <span className="logout-text">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">
        {/* ===== WELCOME SECTION ===== */}
        <section className="welcome-section">
          <div className="welcome-card">
            <h2 className="welcome-title">
              Bienvenido, <span className="user-highlight">{getUserFirstName()}</span>
            </h2>
            <p className="welcome-message">
              Monitorea tu progreso hacia la certificación CNSF
            </p>
            <p className="last-login">
              Último acceso: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* ===== STATISTICS SECTION ===== */}
        <section className="statistics-section">
          <h3 className="section-title">Resumen de Progreso</h3>
          <div className="statistics-grid">
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className={getVariantClass(stat.variant)}>
                <div className="stat-icon">
                  <i className={`fas ${stat.icon}`} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-trend">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== QUICK ACTIONS SECTION ===== */}
        <section className="quick-actions-section">
          <h3 className="section-title">Acciones Rápidas</h3>
          <div className="quick-actions-grid">
            {QUICK_ACTIONS.map((action) => (
              <div
                key={action.id}
                className="quick-action-card"
                onClick={() => handleQuickActionClick(action.route)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickActionClick(action.route)}
                tabIndex={0}
                role="button"
              >
                <div className="quick-action-icon">
                  <i className={`fas ${action.icon}`} />
                </div>
                <div className="quick-action-content">
                  <h4 className="quick-action-title">{action.title}</h4>
                  <p className="quick-action-description">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ADDITIONAL DASHBOARD DATA ===== */}
        <section className="additional-info-section">
          <h3 className="section-title">Información Adicional</h3>
          <div className="additional-info-grid">
            <div className="info-card">
              <h4>Próximos Exámenes</h4>
              <p>No tienes exámenes programados</p>
            </div>
            <div className="info-card">
              <h4>Certificaciones</h4>
                <p>Tienes 2 certificados disponibles</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
