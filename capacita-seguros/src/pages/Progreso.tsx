import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './Progreso.css';

// Datos de ejemplo del progreso del usuario
const datosProgreso = {
  avatarInitials: 'JD',
  name: 'Juan Díaz',
  role: 'Agente de Seguros',
  department: 'Sucursal Centro',
  overallProgress: 65,
  completedModules: 5,
  totalModules: 8,
  averageScore: 8.5,
  monthlyProgress: [30, 45, 55, 60, 65, 70, 75, 80, 78, 82, 85, 90],
  performanceComparison: {
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    user: [8, 7.5, 8.2, 8.8, 9, 8.5],
    average: [7, 7.2, 7.5, 7.8, 7.6, 8],
  },
  timeSpent: [2, 3, 5, 4, 6, 4, 3, 5, 4, 6, 5, 4],
  categoryProgress: [25, 20, 15, 10, 30],
  modules: [
    { name: 'Aspectos Jurídicos', progress: 100, status: 'completed', score: 9 },
    { name: 'Aspectos Técnicos', progress: 100, status: 'completed', score: 8.5 },
    { name: 'Bases Técnicas', progress: 75, status: 'in-progress', score: null },
    { name: 'Seguro de Vida', progress: 60, status: 'in-progress', score: null },
    { name: 'Accidentes Personales', progress: 40, status: 'in-progress', score: null },
  ],
  activities: [
    { title: 'Completó módulo', description: 'Finalizó el módulo de Aspectos Técnicos', time: 'Hace 2 horas', color: '#43e97b', icon: 'fas fa-check' },
    { title: 'Nueva puntuación', description: 'Obtuvo 9/10 en evaluación de Aspectos Jurídicos', time: 'Ayer', color: '#4facfe', icon: 'fas fa-star' },
    { title: 'Inició módulo', description: 'Comenzó el módulo de Seguro de Vida', time: 'Hace 3 días', color: '#fa709a', icon: 'fas fa-play' },
  ],
  badges: [
    { name: 'Primer Curso', color: '#43e97b', icon: 'fas fa-trophy' },
    { name: '100% Nota', color: '#4facfe', icon: 'fas fa-medal' },
    { name: 'Rápido', color: '#fa709a', icon: 'fas fa-bolt' },
    { name: 'Constante', color: '#ff7e5f', icon: 'fas fa-fire' },
  ],
  upcoming: [
    { name: 'Evaluación de Vida', date: '15 Feb 2026', status: 'Pendiente' },
    { name: 'Examen Final', date: '28 Feb 2026', status: 'Pendiente' },
  ],
};

export const Progreso = () => {
  const navigate = useNavigate();
  const progressChartRef = useRef<HTMLCanvasElement>(null);
  const performanceChartRef = useRef<HTMLCanvasElement>(null);
  const timeChartRef = useRef<HTMLCanvasElement>(null);
  const categoryChartRef = useRef<HTMLCanvasElement>(null);

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('progress');
  const [currentView, setCurrentView] = useState('detailed');

  // Inicializar gráficas
  useEffect(() => {
    // Gráfica de progreso mensual
    const progressCtx = progressChartRef.current?.getContext('2d');
    if (progressCtx && datosProgreso.monthlyProgress) {
      drawLineChart(progressCtx, datosProgreso.monthlyProgress);
    }

    // Gráfica de comparativa de rendimiento
    const performanceCtx = performanceChartRef.current?.getContext('2d');
    if (performanceCtx && datosProgreso.performanceComparison) {
      drawBarChart(performanceCtx, datosProgreso.performanceComparison);
    }

    // Gráfica de tiempo dedicado
    const timeCtx = timeChartRef.current?.getContext('2d');
    if (timeCtx && datosProgreso.timeSpent) {
      drawTimeChart(timeCtx, datosProgreso.timeSpent);
    }

    // Gráfica de progreso por categoría
    const categoryCtx = categoryChartRef.current?.getContext('2d');
    if (categoryCtx && datosProgreso.categoryProgress) {
      drawDoughnutChart(categoryCtx, datosProgreso.categoryProgress);
    }

    // Animar barras de progreso
    animateProgressBars();
  }, []);

  // Función para dibujar gráfica de línea
  const drawLineChart = (ctx: CanvasRenderingContext2D, data: number[]): boolean => {
    // Defensive programming: validar ctx y canvas
    if (!ctx?.canvas || ctx.canvas.width === 0 || ctx.canvas.height === 0) {
      return false;
    }
    if (!data || data.length < 2) {
      return false;
    }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Dibujar línea
    ctx.strokeStyle = '#2a5298';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = height - padding - (value / 100) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Dibujar puntos
    ctx.fillStyle = '#2a5298';
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = height - padding - (value / 100) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
    return true;
  };

  // Función para dibujar gráfica de barras
  const drawBarChart = (ctx: CanvasRenderingContext2D, data: any): boolean => {
    // Defensive programming: validar ctx, canvas y data
    if (!ctx?.canvas || ctx.canvas.width === 0 || ctx.canvas.height === 0) {
      return false;
    }
    if (!data?.categories || data.categories.length === 0) {
      return false;
    }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const barWidth = chartWidth / data.categories.length / 2;

    data.categories.forEach((category: string, index: number) => {
      const x = padding + index * (chartWidth / data.categories.length);
      const userHeight = (data.user[index] / 10) * chartHeight;
      const avgHeight = (data.average[index] / 10) * chartHeight;

      // Barra del usuario
      ctx.fillStyle = '#2a5298';
      ctx.fillRect(x, height - padding - userHeight, barWidth, userHeight);

      // Barra promedio
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(x + barWidth, height - padding - avgHeight, barWidth, avgHeight);
    });
    return true;
  };

  // Función para dibujar gráfica de tiempo
  const drawTimeChart = (ctx: CanvasRenderingContext2D, data: number[]): boolean => {
    // Defensive programming: validar ctx, canvas y data
    if (!ctx?.canvas || ctx.canvas.width === 0 || ctx.canvas.height === 0) {
      return false;
    }
    if (!data || data.length === 0) {
      return false;
    }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const barWidth = chartWidth / data.length;

    data.forEach((value, index) => {
      const x = padding + index * barWidth;
      const barHeight = (value / Math.max(...data)) * chartHeight;

      ctx.fillStyle = '#4facfe';
      ctx.fillRect(x, height - padding - barHeight, barWidth - 5, barHeight);
    });
    return true;
  };

  // Función para dibujar gráfica de dona
  const drawDoughnutChart = (ctx: CanvasRenderingContext2D, data: number[]): boolean => {
    // Defensive programming: validar ctx, canvas y data
    if (!ctx?.canvas || ctx.canvas.width === 0 || ctx.canvas.height === 0) {
      return false;
    }
    if (!data || data.length === 0) {
      return false;
    }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    ctx.clearRect(0, 0, width, height);

    let startAngle = -Math.PI / 2;
    const colors = ['#43e97b', '#2a5298', '#4facfe', '#fa709a', '#ff7e5f', '#f6d365', '#9f7aea', '#68d391'];

    data.forEach((value, index) => {
      const sliceAngle = (value / data.reduce((a, b) => a + b, 0)) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      startAngle = endAngle;
    });

    // Agujero central
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    return true;
  };

  // Animar barras de progreso
  const animateProgressBars = () => {
    setTimeout(() => {
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach((bar) => {
        const progress = (bar as HTMLElement).getAttribute('data-progress');
        if (progress) {
          (bar as HTMLElement).style.width = `${progress}%`;
        }
      });
    }, 500);
  };

  // Cambiar vista
  const toggleView = () => {
    setCurrentView(currentView === 'detailed' ? 'compact' : 'detailed');
    showNotification(currentView === 'detailed' ? "Vista cambiada a modo compacto" : "Vista cambiada a modo detallado");
  };

  // Mostrar notificación
  const showNotification = (message: string) => {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2a5298;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 1000;
      transform: translateY(100px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  // Función para obtener el estado del módulo
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="status-indicator status-completed"><i className="fas fa-check-circle"></i> Completado</span>;
      case 'in-progress':
        return <span className="status-indicator status-in-progress"><i className="fas fa-spinner"></i> En Progreso</span>;
      default:
        return <span className="status-indicator status-pending"><i className="fas fa-clock"></i> Pendiente</span>;
    }
  };

  return (
    <div className="container">
      {/* Header con información del usuario */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <div className="user-avatar" id="user-avatar">{datosProgreso.avatarInitials}</div>
            <div className="user-details">
              <h1 id="user-name">{datosProgreso.name}</h1>
              <p id="user-role">{datosProgreso.role}</p>
              <p id="user-department">{datosProgreso.department}</p>
            </div>
          </div>

          <div className="user-stats">
            <div className="user-stat">
              <div className="value" id="overall-progress">{datosProgreso.overallProgress}%</div>
              <div className="label">Progreso Total</div>
            </div>
            <div className="user-stat">
              <div className="value" id="completed-modules">{datosProgreso.completedModules}/{datosProgreso.totalModules}</div>
              <div className="label">Módulos Completados</div>
            </div>
            <div className="user-stat">
              <div className="value" id="average-score">{datosProgreso.averageScore}</div>
              <div className="label">Puntuación Promedio</div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs de navegación */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>
          Progreso
        </button>
        <button className={`tab ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>
          Rendimiento
        </button>
        <button className={`tab ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
          Logros
        </button>
        <button className={`tab ${activeTab === 'comparison' ? 'active' : ''}`} onClick={() => setActiveTab('comparison')}>
          Comparativa
        </button>
      </div>

      {/* Contenido principal del dashboard */}
      <div className="dashboard-main">
        {/* Columna izquierda: Progreso y estadísticas */}
        <div className="main-column">
          {/* Card de progreso general */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Progreso de Capacitación</h2>
              <div className="card-actions">
                <button className="btn btn-outline" onClick={toggleView}>
                  <i className="fas fa-exchange-alt"></i> Cambiar Vista
                </button>
              </div>
            </div>

            <div className="progress-list" id="progress-list">
              {datosProgreso.modules.map((module, index) => (
                <div key={index} className={`progress-item ${currentView === 'compact' && index >= 3 ? 'hidden' : ''}`}>
                  <div className="progress-header">
                    <div className="progress-title">{module.name}</div>
                    <div className="progress-percentage">{module.progress}%</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" data-progress={module.progress} style={{ width: '0%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '0.9rem' }}>
                    <div>{getStatusBadge(module.status)}</div>
                    <div>Puntuación: {module.score ? `${module.score}/10` : 'Sin evaluar'}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-container">
              <canvas ref={progressChartRef} width="400" height="200"></canvas>
            </div>
          </div>

          {/* Card de comparativa de rendimiento */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Comparativa de Rendimiento</h2>
            </div>

            <div className="chart-container">
              <canvas ref={performanceChartRef} width="400" height="200"></canvas>
            </div>
          </div>
        </div>

        {/* Columna derecha: Actividad y logros */}
        <div className="sidebar-column">
          {/* Card de actividad reciente */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Actividad Reciente</h2>
            </div>

            <div className="activity-feed" id="activity-feed">
              {datosProgreso.activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon" style={{ background: `${activity.color}20`, color: activity.color }}>
                    <i className={activity.icon}></i>
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card de logros y badges */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Logros Obtenidos</h2>
            </div>

            <div className="badges-container" id="badges-container">
              {datosProgreso.badges.map((badge, index) => (
                <div key={index} className="badge">
                  <div className="badge-icon" style={{ background: `linear-gradient(135deg, ${badge.color}, ${adjustColor(badge.color, -20)})` }}>
                    <i className={badge.icon}></i>
                  </div>
                  <div className="badge-name">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card de próximas evaluaciones */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Próximas Evaluaciones</h2>
            </div>

            <div className="upcoming-list" id="upcoming-list">
              {datosProgreso.upcoming.map((evaluation, index) => (
                <div key={index} className="progress-item">
                  <div className="progress-header">
                    <div className="progress-title">{evaluation.name}</div>
                    <span className="status-indicator status-pending">
                      <i className="fas fa-clock"></i> {evaluation.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    <i className="far fa-calendar-alt"></i> {evaluation.date}
                  </div>
                  <div className="progress-bar" style={{ marginTop: '10px' }}>
                    <div className="progress-fill" data-progress="0" style={{ width: '0%', background: '#e0e0e0' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer con estadísticas adicionales */}
      <div className="dashboard-footer">
        <div className="card">
          <h3 className="card-title">Tiempo de Capacitación</h3>
          <div className="chart-container">
            <canvas ref={timeChartRef} width="300" height="200"></canvas>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Progreso por Categoría</h3>
          <div className="chart-container">
            <canvas ref={categoryChartRef} width="300" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar para ajustar colores
const adjustColor = (color: string, amount: number) => {
  // Simplificación: mapa de colores fijos
  const colorMap: { [key: string]: string } = {
    '#4facfe': '#2a8df8',
    '#43e97b': '#2ad66a',
    '#fa709a': '#f84a7e',
    '#2a5298': '#1e3c72',
    '#ff7e5f': '#ff5a3a',
    '#f6d365': '#f4c542'
  };
  return colorMap[color] || color;
};
