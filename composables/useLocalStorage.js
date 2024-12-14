export const useLocalStorage = () => {
  const setItem = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving in localStorage", error);
    }
  };

  const getItem = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error getting from localStorage", error);
      return null;
    }
  };

  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
