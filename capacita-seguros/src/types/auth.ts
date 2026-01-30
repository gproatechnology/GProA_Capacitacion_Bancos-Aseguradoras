export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'admin' | 'agent' | 'supervisor';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  company: string;
}

export interface Aseguradora {
  id: string;
  name: string;
  logo: string;
}
