import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { SplashScreen } from './components/SplashScreen';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SimuladorExamen } from './pages/SimuladorExamen';
import { Cursos } from './pages/Cursos';
import { Progreso } from './pages/Progreso';
import { Ayuda } from './pages/Ayuda';
import './App.css';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <SplashScreen>
        <Routes>
          {/* Ruta pública: Login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulator"
            element={
              <ProtectedRoute>
                <SimuladorExamen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <Progreso />
              </ProtectedRoute>
            }
          />

          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Ayuda />
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </SplashScreen>
    </BrowserRouter>
  );
}

export default App;
