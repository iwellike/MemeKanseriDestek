import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const found = users.find(
        u =>
          u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (found) {
        await AsyncStorage.setItem('user', JSON.stringify(found));
        setUser(found);
        return { success: true };
      } else {
        setError('E-posta veya parola hatalı.');
        return { success: false };
      }
    } catch (e) {
      setError('Bir hata oluştu.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const exists = users.find(
        u => u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (exists) {
        setError('Bu e-posta zaten kayıtlı.');
        return { success: false };
      }

      const newUser = { name, email, password, role: 'patient' };

      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      setUser(newUser);

      return { success: true };
    } catch (e) {
      setError('Bir hata oluştu.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);