import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cursos.css';

// Tipo para la estructura de datos
interface Tema {
  id: number;
  titulo: string;
  tipo: 'Lectura' | 'Evaluación';
  completado: boolean;
}

interface Modulo {
  id: number;
  titulo: string;
  temas: Tema[];
}

interface Curso {
  id: string;
  cedula: string;
  titulo: string;
  modulos: Modulo[];
}

export const Cursos = () => {
  const navigate = useNavigate();
  const [modulosExpandidos, setModulosExpandidos] = useState<Set<number>>(new Set([1])); // Primer módulo expandido por defecto

  // Datos de ejemplo basados en la estructura CNSF
  const cursos: Curso[] = [
    {
      id: 'curso-1',
      cedula: 'A',
      titulo: 'Cédula de Capacitación A - Seguros',
      modulos: [
        {
          id: 1,
          titulo: 'Aspectos Generales',
          temas: [
            { id: 1, titulo: 'Aspectos Jurídicos', tipo: 'Lectura', completado: true },
            { id: 2, titulo: 'Evaluación - Aspectos Jurídicos', tipo: 'Evaluación', completado: true },
            { id: 3, titulo: 'Aspectos Técnicos', tipo: 'Lectura', completado: false },
            { id: 4, titulo: 'Evaluación - Aspectos Técnicos', tipo: 'Evaluación', completado: false },
          ],
        },
        {
          id: 2,
          titulo: 'Riesgos del Seguro de Personas',
          temas: [
            { id: 5, titulo: 'Bases Técnicas', tipo: 'Lectura', completado: false },
            { id: 6, titulo: 'Planes del Seguro de Vida', tipo: 'Lectura', completado: false },
            { id: 7, titulo: 'Accidentes Personales', tipo: 'Lectura', completado: false },
            { id: 8, titulo: 'Gastos Médicos Mayores', tipo: 'Lectura', completado: false },
            { id: 9, titulo: 'Seguro de Salud', tipo: 'Lectura', completado: false },
            { id: 10, titulo: 'Evaluación - Seguro de Personas', tipo: 'Evaluación', completado: false },
          ],
        },
        {
          id: 3,
          titulo: 'Riesgos del Seguro de Daños',
          temas: [
            { id: 11, titulo: 'Seguro de Hogar', tipo: 'Lectura', completado: false },
            { id: 12, titulo: 'Seguro de Incendio', tipo: 'Lectura', completado: false },
            { id: 13, titulo: 'Seguro de Diversos', tipo: 'Lectura', completado: false },
            { id: 14, titulo: 'Responsabilidad Civil Familiar', tipo: 'Lectura', completado: false },
            { id: 15, titulo: 'Embarcaciones', tipo: 'Lectura', completado: false },
            { id: 16, titulo: 'Automóviles', tipo: 'Lectura', completado: false },
            { id: 17, titulo: 'Evaluación - Seguro de Daños', tipo: 'Evaluación', completado: false },
          ],
        },
      ],
    },
  ];

  const toggleModulo = (moduloId: number) => {
    setModulosExpandidos((prev) => {
      const nuevos = new Set(prev);
      if (nuevos.has(moduloId)) {
        nuevos.delete(moduloId);
      } else {
        nuevos.add(moduloId);
      }
      return nuevos;
    });
  };

  return (
    <div className="cursos-container">
      <header className="cursos-header">
        <div className="header-left">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Volver
          </button>
          <h1 className="cursos-title">Mis Cursos</h1>
        </div>
      </header>

      <main className="cursos-main">
        {cursos.map((curso) => (
          <div key={curso.id} className="curso-card">
            <div className="curso-header">
              <div className="curso-info">
                <span className="curso-cedula">{curso.cedula}</span>
                <h2>{curso.titulo}</h2>
              </div>
              <div className="curso-progreso">
                <span>Progreso: 25%</span>
                <div className="progreso-bar">
                  <div className="progreso-fill" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>

            <div className="modulos-list">
              {curso.modulos.map((modulo) => (
                <div key={modulo.id} className="modulo-item">
                  <button
                    className="modulo-header"
                    onClick={() => toggleModulo(modulo.id)}
                  >
                    <div className="modulo-info">
                      <span className="modulo-toggle">
                        {modulosExpandidos.has(modulo.id) ? '▼' : '▶'}
                      </span>
                      <span className="modulo-title">{modulo.titulo}</span>
                    </div>
                    <span className="modulo-count">
                      {modulo.temas.filter((t) => t.completado).length}/{modulo.temas.length} temas
                    </span>
                  </button>

                  {modulosExpandidos.has(modulo.id) && (
                    <div className="temas-list">
                      {modulo.temas.map((tema) => (
                        <div key={tema.id} className={`tema-item ${tema.completado ? 'completado' : ''}`}>
                          <div className="tema-info">
                            <span className={`tema-icon ${tema.tipo === 'Evaluación' ? 'evaluacion' : 'lectura'}`}>
                              {tema.tipo === 'Evaluación' ? '📝' : '📖'}
                            </span>
                            <span className="tema-title">{tema.titulo}</span>
                          </div>
                          <div className="tema-actions">
                            {tema.completado ? (
                              <span className="badge-completado">✓ Completado</span>
                            ) : (
                              <button className="btn-iniciar">
                                {tema.tipo === 'Evaluación' ? 'Presentar Evaluación' : 'Iniciar Lectura'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
