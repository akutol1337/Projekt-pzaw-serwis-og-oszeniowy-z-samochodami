import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '@/types';
import { users } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name: string, phone: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('automarket_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string, password: string): boolean => {
    if (email === 'jan@example.com' && password === 'haslo123') {
      const foundUser = users.find(u => u.email === 'jan@example.com');
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('automarket_user', JSON.stringify(foundUser));
        return true;
      }
    }
    // Check for registered users
    const registeredUsers = JSON.parse(localStorage.getItem('automarket_registered_users') || '[]');
    const regUser = registeredUsers.find((u: User) => u.email === email);
    if (regUser) {
      setUser(regUser);
      localStorage.setItem('automarket_user', JSON.stringify(regUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('automarket_user');
  }, []);

  const register = useCallback((email: string, _password: string, name: string, phone: string): boolean => {
    const registeredUsers = JSON.parse(localStorage.getItem('automarket_registered_users') || '[]');
    if (registeredUsers.some((u: User) => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: `u${Date.now()}`,
      email,
      name,
      phone,
      joinDate: new Date().toISOString().split('T')[0],
    };
    registeredUsers.push(newUser);
    localStorage.setItem('automarket_registered_users', JSON.stringify(registeredUsers));
    setUser(newUser);
    localStorage.setItem('automarket_user', JSON.stringify(newUser));
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
