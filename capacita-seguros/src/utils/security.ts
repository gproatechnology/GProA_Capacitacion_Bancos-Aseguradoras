// Utilidades de seguridad para sanitización y validación

// Sanitizar strings para prevenir XSS
export const sanitizeString = (input: unknown): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// Validar email con regex segura
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Validar contraseña mínima
export const isValidPassword = (password: string): boolean => {
  return password.length >= 4;
};

// Validar company ID
export const isValidCompany = (company: string): boolean => {
  const validCompanies = ['GNP', 'AXA', 'Banorte', 'BBVA', 'Chubb', 'HSBC', 'MetLife', 'Primero'];
  return validCompanies.includes(company);
};

// Sanitizar credenciales de login
export const sanitizeCredentials = (credentials: {
  email: string;
  password: string;
  company: string;
}) => {
  return {
    email: sanitizeString(credentials.email).toLowerCase(),
    password: credentials.password,
    company: sanitizeString(credentials.company),
  };
};

// Generar token de sesión seguro usando crypto API
export const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
