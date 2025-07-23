import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'admin' | 'patient' | 'super-admin';
  avatar?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    
    // Simulate API call with proper role mapping
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        let newUser: User;
        
        if (role === 'patient') {
          newUser = {
            id: '1',
            name: 'Ajith',
            email,
            role: 'patient',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          };
        } else if (role === 'admin') {
          newUser = {
            id: '3',
            name: 'Admin User',
            email,
            role: 'super-admin',
            department: 'Administration',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          };
        } else {
          // For clinic users (doctor, nurse, admin)
          newUser = {
            id: '2',
            name: 'Dr. Vikash',
            email,
            role: 'doctor',
            department: 'Cardiology',
            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
          };
        }
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};