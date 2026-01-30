import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Exam, ExamResult, UserAnswer, Question, sampleExam } from '../types/exam';
import { useAuthStore } from './authStore';

// Generador de ID seguro (duplicado para evitar dependencia circular)
const generateSecureId = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

interface ExamState {
  currentExam: Exam | null;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  timeRemaining: number; // en segundos
  isExamStarted: boolean;
  isExamCompleted: boolean;
  results: ExamResult | null;
  
  // Actions
  startExam: (exam?: Exam) => void;
  answerQuestion: (questionId: string, selectedAnswer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeExam: () => void;
  resetExam: () => void;
  tick: () => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      currentExam: null,
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: 0,
      isExamStarted: false,
      isExamCompleted: false,
      results: null,

      startExam: (exam?: Exam) => {
        const selectedExam = exam || sampleExam;
        set({
          currentExam: selectedExam,
          currentQuestionIndex: 0,
          answers: [],
          timeRemaining: selectedExam.timeLimit * 60,
          isExamStarted: true,
          isExamCompleted: false,
          results: null,
        });
      },

      answerQuestion: (questionId: string, selectedAnswer: number) => {
        const { currentExam, answers } = get();
        if (!currentExam) return;

        const question = currentExam.questions.find(q => q.id === questionId);
        if (!question) return;

        const isCorrect = question.correctAnswer === selectedAnswer;
        
        // Actualizar o agregar respuesta
        const existingIndex = answers.findIndex(a => a.questionId === questionId);
        const newAnswer: UserAnswer = {
          questionId,
          selectedAnswer,
          isCorrect,
        };

        if (existingIndex >= 0) {
          const newAnswers = [...answers];
          newAnswers[existingIndex] = newAnswer;
          set({ answers: newAnswers });
        } else {
          set({ answers: [...answers, newAnswer] });
        }
      },

      nextQuestion: () => {
        const { currentExam, currentQuestionIndex } = get();
        if (!currentExam) return;
        
        if (currentQuestionIndex < currentExam.questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      completeExam: () => {
        const { currentExam, answers, timeRemaining } = get();
        if (!currentExam) return;

        // Obtener usuario autenticado de forma segura
        const { user } = useAuthStore.getState();
        const userId = user?.id || 'anonymous';

        const correctAnswers = answers.filter(a => a.isCorrect).length;
        const totalQuestions = currentExam.questions.length;
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        
        const result: ExamResult = {
          id: generateSecureId(),
          examId: currentExam.id,
          userId,
          score,
          totalQuestions,
          correctAnswers,
          wrongAnswers,
          timeSpent: currentExam.timeLimit * 60 - timeRemaining,
          answers,
          completedAt: new Date().toISOString(),
        };

        set({
          isExamCompleted: true,
          results: result,
        });

        // Guardar resultado en localStorage de forma segura
        try {
          const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
          // Limitar a últimos 100 resultados para evitar acumulación
          const limitedResults = [...existingResults, result].slice(-100);
          localStorage.setItem('examResults', JSON.stringify(limitedResults));
        } catch (e) {
          console.error('Error al guardar resultados:', e);
        }
      },

      resetExam: () => {
        set({
          currentExam: null,
          currentQuestionIndex: 0,
          answers: [],
          timeRemaining: 0,
          isExamStarted: false,
          isExamCompleted: false,
          results: null,
        });
      },

      tick: () => {
        const { timeRemaining, isExamCompleted } = get();
        if (isExamCompleted || timeRemaining <= 0) return;
        set({ timeRemaining: timeRemaining - 1 });
      },
    }),
    {
      name: 'gproa-exam',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        results: state.results,
      }),
    }
  )
);

// Selector para obtener el progreso
export const useExamProgress = () => {
  const { currentExam, answers, currentQuestionIndex } = useExamStore();
  
  if (!currentExam) return { progress: 0, answered: 0, total: 0 };
  
  return {
    progress: Math.round((answers.length / currentExam.questions.length) * 100),
    answered: answers.length,
    total: currentExam.questions.length,
    currentQuestion: currentQuestionIndex + 1,
  };
};

// Selector para formatear tiempo
export const useFormattedTime = () => {
  const { timeRemaining } = useExamStore();
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
