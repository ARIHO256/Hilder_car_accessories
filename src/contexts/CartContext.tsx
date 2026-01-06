import React from 'react';

type CartContextValue = {
  count: number;
  add: (delta?: number) => void;
  reset: () => void;
};

const CartContext = React.createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = React.useState(0);

  const add = React.useCallback((delta: number = 1) => {
    if (!Number.isFinite(delta) || delta <= 0) {
      return;
    }
    setCount((prev) => {
      const next = prev + Math.round(delta);
      return next >= 99 ? 99 : next;
    });
  }, []);

  const reset = React.useCallback(() => setCount(0), []);

  const value = React.useMemo(
    () => ({
      count,
      add,
      reset
    }),
    [count, add, reset]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
