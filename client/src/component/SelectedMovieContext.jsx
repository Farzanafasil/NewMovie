import { createContext, useContext, useState } from 'react';

const SelectedMovieContext = createContext();

export const useSelectedMovie = () => {
  const context = useContext(SelectedMovieContext);
  if (!context) {
    throw new Error('useSelectedMovie must be used within a SelectedMovieProvider');
  }
  return context;
};

export const SelectedMovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <SelectedMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </SelectedMovieContext.Provider>
  );
};