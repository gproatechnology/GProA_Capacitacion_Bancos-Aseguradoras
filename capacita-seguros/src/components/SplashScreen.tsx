import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { Logo } from './Logo';
import splashImage from '../assets/splashscreen.png';
import './SplashScreen.css';

interface SplashScreenProps {
  children: React.ReactNode;
}

const SPLASH_DURATION = 4000; // 4 segundos

export const SplashScreen = ({ children }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const splashStartTime = useRef<number | null>(null);
  const isHidden = useRef(false);

  const hideSplash = useCallback(() => {
    if (!isHidden.current) {
      isHidden.current = true;
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    // Verificar si ya pasaron los 4 segundos desde que started
    const now = Date.now();
    
    if (splashStartTime.current === null) {
      splashStartTime.current = now;
    }

    const elapsed = now - splashStartTime.current;
    const remaining = SPLASH_DURATION - elapsed;

    if (remaining <= 0) {
      // Ya pasaron los 4 segundos
      hideSplash();
      return;
    }

    // Esperar el tiempo restante
    const timer = setTimeout(() => {
      hideSplash();
    }, remaining);

    return () => clearTimeout(timer);
  }, [hideSplash]);

  // Si ya se ocultó el splash, mostrar el contenido
  if (!showSplash) {
    return <>{children}</>;
  }

  // Mostrar pantalla de carga
  return (
    <div className="splash-screen">
      <img src={splashImage} alt="Splash Background" className="splash-background" />
      <div className="splash-overlay"></div>
      <div className="splash-content">
        <div className="splash-logo">
          <Logo size="large" />
        </div>
        <h1 className="splash-title">GProA</h1>
        <p className="splash-subtitle">Capacitación Bancos y Aseguradoras</p>
        <div className="splash-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="splash-loading-text">Cargando contenidos CNSF...</p>
      </div>
    </div>
  );
};
