import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useLocalStorage('tv_compare', []);
  const { addToast } = useToast();

  const isComparing = (code) => {
    return compareList.some((item) => item.cca3 === code);
  };

  const addToCompare = (country) => {
    if (!country || !country.cca3) return;
    if (isComparing(country.cca3)) {
      addToast(`${country.name.common} is already in comparison`, 'info');
      return;
    }
    if (compareList.length >= 3) {
      addToast('You can compare up to 3 countries at a time', 'warning');
      return;
    }
    setCompareList((prev) => [...prev, country]);
    addToast(`${country.name.common} added to comparison list 📊`, 'success');
  };

  const removeFromCompare = (code) => {
    const item = compareList.find((c) => c.cca3 === code);
    setCompareList((prev) => prev.filter((c) => c.cca3 !== code));
    if (item) {
      addToast(`${item.name.common} removed from comparison`, 'warning');
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    addToast('Comparison list cleared', 'info');
  };

  return (
    <CompareContext.Provider value={{ compareList, isComparing, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
