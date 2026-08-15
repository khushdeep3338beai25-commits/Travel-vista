import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('tv_favorites', []);
  const { addToast } = useToast();

  const isFavorite = (code) => {
    return favorites.some((item) => item.cca3 === code);
  };

  const toggleFavorite = (country) => {
    if (!country || !country.cca3) return;
    const exists = isFavorite(country.cca3);
    if (exists) {
      setFavorites((prev) => prev.filter((item) => item.cca3 !== country.cca3));
      addToast(`${country.name.common} removed from Wishlist`, 'warning');
    } else {
      setFavorites((prev) => [...prev, country]);
      addToast(`${country.name.common} added to Wishlist ❤️`, 'success');
    }
  };

  const removeFavorite = (code) => {
    const item = favorites.find((f) => f.cca3 === code);
    setFavorites((prev) => prev.filter((f) => f.cca3 !== code));
    if (item) {
      addToast(`${item.name.common} removed from Wishlist`, 'warning');
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
