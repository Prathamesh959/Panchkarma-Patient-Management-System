import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  age?: number;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'dr.priya@panchkarma.com',
    role: 'doctor',
    phone: '+91 9876543210',
    specialization: 'Panchakarma Specialist',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    role: 'patient',
    phone: '+91 9876543211',
    age: 45,
  },
  {
    id: '3',
    name: 'Dr. Amit Verma',
    email: 'dr.amit@panchkarma.com',
    role: 'doctor',
    phone: '+91 9876543212',
    specialization: 'Ayurvedic Medicine',
  },
  {
    id: '4',
    name: 'Sunita Devi',
    email: 'sunita@email.com',
    role: 'patient',
    phone: '+91 9876543213',
    age: 38,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('panchkarma_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication logic
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('panchkarma_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('panchkarma_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};