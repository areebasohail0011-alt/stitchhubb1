import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User;
  users: User[];
  login: (email: string, role?: UserRole) => boolean;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('stitchhub_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('stitchhub_current_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    // Default to Sarah Jenkins (Customer)
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('stitchhub_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('stitchhub_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (email: string, role?: UserRole): boolean => {
    let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found && role) {
      found = users.find(u => u.role === role);
    }
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email || 'user@example.com',
      role: userData.role || 'customer',
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name || 'User'}`,
      phone: userData.phone || '+1 (555) 000-0000',
      address: userData.address || '123 Main Street',
      city: userData.city || 'New York, NY',
      joinedDate: 'Just now',
      ...userData
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    // Revert to landing/customer view
    const defaultCustomer = users.find(u => u.role === 'customer') || INITIAL_USERS[0];
    setCurrentUser(defaultCustomer);
  };

  const switchRole = (role: UserRole) => {
    const userForRole = users.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role);
    if (userForRole) {
      setCurrentUser(userForRole);
    }
  };

  const updateProfile = (updated: Partial<User>) => {
    const updatedUser = { ...currentUser, ...updated };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      signup,
      logout,
      switchRole,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
