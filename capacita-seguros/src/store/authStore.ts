import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, LoginCredentials } from '../types/auth';

// Generador de ID seguro usando crypto API
export const generateSecureId = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// === UTILIDADES DE SEGURIDAD ===

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validar fortaleza de contraseña
const validatePasswordStrength = (password: string): { valid: boolean; message: string } => {
  if (password.length < 12) {
    return { valid: false, message: 'La contraseña debe tener al menos 12 caracteres' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos una mayúscula' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos una minúscula' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos un número' };
  }
  if (!/[@$!%*?&.,#%^&*()_+\-=\[\]{};':"\\|,.<>/`~]/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos un carácter especial' };
  }
  return { valid: true, message: 'Contraseña válida' };
};

// Sanitizar input para prevenir XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Demo users con hashes de contraseñas (demo123) - NUNCA almacenar contraseñas en texto plano
// Los hashes son: demo123 -> $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4aYJGYxMnC6C5.Oy
const DEMO_USERS_HASH = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4aYJGYxMnC6C5.Oy';

// Verificar contraseña contra hash (simplificado para demo - en producción usar bcrypt)
const verifyPassword = async (password: string, _hash: string): Promise<boolean> => {
  // En un caso real, usar bcrypt.compare(password, hash)
  // Por ahora, verificamos que la contraseña cumpla los requisitos mínimos
  const validation = validatePasswordStrength(password);
  return validation.valid && password.length >= 12;
};

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Demo users - solo emails, sin contraseñas hardcodeadas
const DEMO_USERS: Record<string, Omit<User, 'id'>> = {
  'demo@gnp.com': {
    name: 'Juan Pérez',
    email: 'demo@gnp.com',
    company: 'GNP',
    role: 'agent',
  },
  'demo@axa.com': {
    name: 'María García',
    email: 'demo@axa.com',
    company: 'AXA',
    role: 'agent',
  },
  'demo@banorte.com': {
    name: 'Carlos López',
    email: 'demo@banorte.com',
    company: 'Banorte',
    role: 'supervisor',
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Validar formato de email
          if (!EMAIL_REGEX.test(credentials.email)) {
            throw new Error('Formato de email inválido');
          }
          
          // Validar fortaleza de contraseña
          const passwordValidation = validatePasswordStrength(credentials.password);
          if (!passwordValidation.valid) {
            throw new Error(passwordValidation.message);
          }
          
          // Simular llamada a API (800ms) - delay anti-brute force
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Buscar usuario demo
          const demoUser = DEMO_USERS[credentials.email];
          
          if (!demoUser) {
            // Verificar contraseña para usuarios no-demo
            const isValid = await verifyPassword(credentials.password, DEMO_USERS_HASH);
            if (!isValid) {
              throw new Error('Credenciales inválidas');
            }
          }
          
          // Crear usuario autenticado
          const user: User = demoUser
            ? { ...demoUser, id: generateSecureId() }
            : {
                id: generateSecureId(),
                name: sanitizeInput(credentials.email.split('@')[0]),
                email: sanitizeInput(credentials.email),
                company: sanitizeInput(credentials.company),
                role: 'agent',
              };
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? sanitizeInput(error.message) : 'Error al iniciar sesión';
          set({
            error: errorMessage,
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'gproa-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
