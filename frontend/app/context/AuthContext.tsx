'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User, Address, Order } from '../types/auth';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (addr: Address) => void;
  updateAddress: (addr: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'auth.user.v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [user]);

  const login = async (email: string) => {
    // Simulación: inicia sesión con datos mock si el email existe en storage, si no crea uno básico
    setUser(prev => prev ?? {
      id: 'u_' + Math.random().toString(36).slice(2, 9),
      name: email.split('@')[0],
      email,
      addresses: [],
      orders: [],
    });
  };

  const register = async (name: string, email: string) => {
    setUser({
      id: 'u_' + Math.random().toString(36).slice(2, 9),
      name,
      email,
      addresses: [],
      orders: [],
    });
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...data } : prev));
  };

  const addAddress = (addr: Address) => {
    setUser(prev => (prev ? { ...prev, addresses: [...prev.addresses, addr] } : prev));
  };

  const updateAddress = (addr: Address) => {
    setUser(prev => (prev ? { ...prev, addresses: prev.addresses.map(a => a.id === addr.id ? addr : a) } : prev));
  };

  const removeAddress = (id: string) => {
    setUser(prev => (prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : prev));
  };

  const addOrder = (order: Order) => {
    setUser(prev => (prev ? { ...prev, orders: [order, ...prev.orders] } : prev));
  };

  const value: AuthContextType = useMemo(() => ({ user, loading, login, logout, register, updateProfile, addAddress, updateAddress, removeAddress, addOrder }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
