import React, { useState } from 'react';
import createdAt from '../utils/date';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      title: 'Selamat ramadhan 2023',
      body: 'Tgl 19 april pulang kampung di pagi hari jam 08.30, dan jangan lupa izin kerja.',
			id: Date.now().toString(16),
			archived: false,
			createdAt: createdAt(),
    }
  ]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {...item, archived: true};
      }
      return item;
    });
    setItems(updatedItems);
  }

  const restoreItem = (id) => {
    const restoredItems = items.map(item => {
      if (item.id === id) {
        return {...item, archived: false};
      }
      return item;
    });
    setItems(restoredItems);
  }


  return (
    <DataContext.Provider value={{ items, addItem, removeItem, updateItem, restoreItem }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
