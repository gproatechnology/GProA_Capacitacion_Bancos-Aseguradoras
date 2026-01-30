import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore, useFormattedTime, useExamProgress } from '../store/examStore';
import { sampleExam } from '../types/exam';
import { useAuthStore } from '../store/authStore';
import './SimuladorExamen.css';

export const SimuladorExamen = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    currentExam,
    currentQuestionIndex,
    answers,
    timeRemaining,
    isExamStarted,
    isExamCompleted,
    results,
    startExam,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeExam,
    resetExam,
    tick,
  } = useExamStore();

  const formattedTime = useFormattedTime();
  const progress = useExamProgress();
  const [showConfirm, setShowConfirm] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isExamStarted || isExamCompleted) return;
    
    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamCompleted, tick]);

  // Auto-complete when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && isExamStarted && !isExamCompleted) {
      completeExam();
    }
  }, [timeRemaining, isExamStarted, isExamCompleted, completeExam]);

  const handleStartExam = () => {
    startExam(sampleExam);
  };

  const handleAnswer = (questionId: string, selectedAnswer: number) => {
    answerQuestion(questionId, selectedAnswer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (currentExam?.questions.length || 0) - 1) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleComplete = () => {
    if (answers.length < (currentExam?.questions.length || 0)) {
      setShowConfirm(true);
    } else {
      completeExam();
    }
  };

  const handleReset = () => {
    resetExam();
    setShowConfirm(false);
  };

  const getAnsweredCount = () => answers.length;
  const getCurrentQuestion = () => currentExam?.questions[currentQuestionIndex];

  // Pantalla de inicio del examen
  if (!isExamStarted) {
    return (
      <div className="exam-container">
        <div className="exam-start-card">
          <div className="exam-header">
            <h1>🎓 Simulador de Examen CNSF 2.1</h1>
            <p className="exam-description">
              Examen de práctica sobre la Ley de Instituciones de Seguros y Fianzas
            </p>
          </div>

          <div className="exam-info">
            <div className="info-item">
              <span className="info-icon">📝</span>
              <span>{sampleExam.questions.length} preguntas</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span>{sampleExam.timeLimit} minutos</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span>Mínimo {sampleExam.passingScore}% para aprobar</span>
            </div>
          </div>

          <div className="exam-instructions">
            <h3>Instrucciones:</h3>
            <ul>
              <li>Lee cada pregunta cuidadosamente</li>
              <li>Selecciona la respuesta correcta</li>
              <li>Puedes navegar entre preguntas</li>
              <li>El tiempo corre desde que inicias</li>
              <li>Al terminar, revisa tus respuestas antes de enviar</li>
            </ul>
          </div>

          <button className="start-exam-button" onClick={handleStartExam}>
            🚀 Iniciar Examen
          </button>

          <button className="back-button" onClick={() => navigate('/dashboard')}>
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (isExamCompleted && results) {
    const passed = results.score >= sampleExam.passingScore;
    
    return (
      <div className="exam-container">
        <div className="exam-results-card">
          <div className={`results-header ${passed ? 'passed' : 'failed'}`}>
            {passed ? '🎉 ¡Felicidades!' : '📚 Sigue intentando'}
          </div>
          
          <div className="score-circle">
            <span className="score-value">{results.score}%</span>
            <span className="score-label">{passed ? 'Aprobado' : 'No aprobado'}</span>
          </div>

          <div className="results-stats">
            <div className="stat">
              <span className="stat-value correct">{results.correctAnswers}</span>
              <span className="stat-label">Correctas</span>
            </div>
            <div className="stat">
              <span className="stat-value wrong">{results.wrongAnswers}</span>
              <span className="stat-label">Incorrectas</span>
            </div>
            <div className="stat">
              <span className="stat-value">{results.totalQuestions}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-value">{Math.floor(results.timeSpent / 60)}:{String(results.timeSpent % 60).padStart(2, '0')}</span>
              <span className="stat-label">Tiempo</span>
            </div>
          </div>

          <div className="results-user">
            <p><strong>Participante:</strong> {user?.name || 'Usuario Demo'}</p>
            <p><strong>Empresa:</strong> {user?.company || 'N/A'}</p>
            <p><strong>Fecha:</strong> {new Date(results.completedAt).toLocaleDateString('es-MX')}</p>
          </div>

          <div className="results-actions">
            <button className="retry-button" onClick={handleReset}>
              🔄 Repetir Examen
            </button>
            <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
              🏠 Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla del examen
  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="exam-container">
      {/* Barra de progreso */}
      <div className="exam-progress-bar">
        <div className="progress-info">
          <span>Pregunta {currentQuestionIndex + 1} de {currentExam?.questions.length}</span>
          <span className={`timer ${timeRemaining < 60 ? 'warning' : ''}`}>
            ⏱️ {formattedTime}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress.progress}%` }}
          ></div>
        </div>
        <div className="progress-answered">
          {getAnsweredCount()} / {currentExam?.questions.length} respondidas
        </div>
      </div>

      {/* Pregunta actual */}
      <div className="question-card">
        <div className="question-header">
          <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
            {currentQuestion.difficulty}
          </span>
          <span className="category-badge">{currentQuestion.category}</span>
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-list">
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers.find(a => a.questionId === currentQuestion.id)?.selectedAnswer === index;
            return (
              <button
                key={index}
                className={`option-button ${isSelected ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, index)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navegación */}
      <div className="exam-navigation">
        <button 
          className="nav-button prev" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← Anterior
        </button>

        <div className="question-dots">
          {currentExam?.questions.map((q, index) => {
            const isAnswered = answers.some(a => a.questionId === q.id);
            const isCurrent = index === currentQuestionIndex;
            return (
              <button
                key={q.id}
                className={`dot ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => {
                  useExamStore.setState({ currentQuestionIndex: index });
                }}
              ></button>
            );
          })}
        </div>

        {currentQuestionIndex === (currentExam?.questions.length || 0) - 1 ? (
          <button 
            className="nav-button complete" 
            onClick={handleComplete}
          >
            Finalizar ✅
          </button>
        ) : (
          <button 
            className="nav-button next" 
            onClick={handleNext}
          >
            Siguiente →
          </button>
        )}
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Estás seguro de terminar el examen?</h3>
            <p>Tienes {currentExam?.questions.length ? currentExam.questions.length - answers.length : 0} preguntas sin responder.</p>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowConfirm(false)}>
                Revisar respuestas
              </button>
              <button className="confirm-button" onClick={completeExam}>
                Terminar examen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
