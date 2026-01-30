export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamResult {
  id: string;
  examId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
  answers: UserAnswer[];
  completedAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
}

export const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'Según la LISF, ¿cuál es el objeto de la regulación de las instituciones de seguros?',
    options: [
      'Proteger los intereses del público asegurado',
      'Maximizar las ganancias de las aseguradoras',
      'Facilitar la venta de seguros',
      'Reducir la competencia entre aseguradoras'
    ],
    correctAnswer: 0,
    category: 'Regulación',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: '¿Qué tipo de seguros son los que cubren riesgos provenientes de fuerzas naturales?',
    options: [
      'Seguros de vida',
      'Seguros de daños',
      'Seguros de gastos médicos',
      'Seguros de automóviles'
    ],
    correctAnswer: 1,
    category: 'Seguros de Daños',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'La Comisión Nacional de Seguros y Fianzas (CNSF) depende de:',
    options: [
      'La Secretaría de Hacienda y Crédito Público',
      'El Banco de México',
      'La Secretaría de Economía',
      'El Congreso de la Unión'
    ],
    correctAnswer: 0,
    category: 'Regulación',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: '¿Cuál es el plazo máximo para que una aseguradora deba pronunciarse sobre el pago de un siniestro?',
    options: [
      '30 días naturales',
      '60 días naturales',
      '90 días naturales',
      '180 días naturales'
    ],
    correctAnswer: 2,
    category: 'Siniestros',
    difficulty: 'medium'
  },
  {
    id: '5',
    question: 'El contrato de seguros debe contener de forma obligatoria:',
    options: [
      'Solo el nombre del agente que vende el seguro',
      'La cantidad de asegurados en la póliza',
      'Los derechos y obligaciones de las partes',
      'El historial de reclamaciones del asegurado'
    ],
    correctAnswer: 2,
    category: 'Contratos',
    difficulty: 'medium'
  },
  {
    id: '6',
    question: '¿Qué es la prima en un contrato de seguros?',
    options: [
      'El monto que paga la aseguradora al asegurado',
      'El precio del seguro que paga el contratante',
      'El deducible del seguro',
      'La comisión del agente'
    ],
    correctAnswer: 1,
    category: 'Conceptos Básicos',
    difficulty: 'easy'
  },
  {
    id: '7',
    question: 'La reserva técnica de una aseguradora se refiere a:',
    options: [
      'Las oficinas físicas de la empresa',
      'Los recursos destinados a cumplir compromisos con asegurados',
      'El capital social de la compañía',
      'Los activos fijos de la institución'
    ],
    correctAnswer: 1,
    category: 'Finanzas',
    difficulty: 'hard'
  },
  {
    id: '8',
    question: '¿Qué documento acredita la existencia de un contrato de seguros?',
    options: [
      'La cotización',
      'La póliza',
      'El recibo de pago',
      'La solicitud de seguro'
    ],
    correctAnswer: 1,
    category: 'Contratos',
    difficulty: 'easy'
  },
  {
    id: '9',
    question: 'El aseguramiento de riesgos implica que:',
    options: [
      'El riesgo desaparece completamente',
      'El riesgo se transfiere a la aseguradora',
      'El riesgo se comparte con el gobierno',
      'El riesgo se reduce a cero'
    ],
    correctAnswer: 1,
    category: 'Conceptos Básicos',
    difficulty: 'easy'
  },
  {
    id: '10',
    question: 'La inspección del riesgo por parte de la aseguradora se realiza:',
    options: [
      'Después de ocurrido un siniestro',
      'Antes de emitir la póliza',
      'Solo cuando hay un incremento en la prima',
      'Una vez al año obligatoriamente'
    ],
    correctAnswer: 1,
    category: 'Underwriting',
    difficulty: 'medium'
  }
];

export const sampleExam: Exam = {
  id: 'examen-cnsf-2.1',
  title: 'Simulador Examen CNSF 2.1',
  description: 'Examen de práctica sobre la Ley de Instituciones de Seguros y Fianzas',
  category: 'Regulación',
  questions: sampleQuestions,
  timeLimit: 15,
  passingScore: 70
};
