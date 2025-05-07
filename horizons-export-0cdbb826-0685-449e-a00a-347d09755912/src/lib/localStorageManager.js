
import React from 'react';

export const loadDataFromLocalStorage = (key, defaultValue) => {
  try {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const saveDataToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};
