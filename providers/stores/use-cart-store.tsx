import { ICartItem } from "@/interfaces/cart";
import { IProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

interface CartActions {
  addItem: (product: IProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  getItem: (productId: string) => ICartItem | undefined;
  isInCart: (productId: string) => boolean;
  toggleReserved: (productId: string) => void;
  getCartSummary: () => {
    subtotal: number;
    totalItems: number;
    totalPrice: number;
  };
}

type CartStore = CartState & CartActions;

const calculateItemTotalPrice = (
  unitPrice: number,
  quantity: number,
  discount: number = 0
): number => {
  const discountedPrice = unitPrice * (1 - discount / 100);
  return discountedPrice * quantity;
};

const calculateCartTotals = (items: ICartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,

      // Agregar item al carrito
      addItem: (product: IProduct, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product === product.id
          );

          if (existingItem) {
            // Si el item ya existe, actualizar cantidad
            const updatedItems = state.items.map((item) => {
              if (item.product === product.id) {
                const newQuantity = item.quantity + quantity;
                const totalPrice = calculateItemTotalPrice(
                  item.unitPrice,
                  newQuantity
                );
                return {
                  ...item,
                  quantity: newQuantity,
                  totalPrice,
                  price: totalPrice, // Mantener consistencia
                };
              }
              return item;
            });

            const { totalItems, totalPrice } =
              calculateCartTotals(updatedItems);

            return {
              ...state,
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          } else {
            // Crear nuevo item
            const unitPrice = product.price;
            const totalPrice = calculateItemTotalPrice(unitPrice, quantity);

            const newItem: ICartItem = {
              price: totalPrice,
              quantity,
              totalPrice,
              unitPrice,
              product: product.id,
              productSnapShot: product,
              reserved: false,
            };

            const updatedItems = [...state.items, newItem];
            const { totalItems, totalPrice: newTotalPrice } =
              calculateCartTotals(updatedItems);

            return {
              ...state,
              items: updatedItems,
              totalItems,
              totalPrice: newTotalPrice,
            };
          }
        });
      },

      // Remover item del carrito
      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.product !== productId
          );
          const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      // Actualizar cantidad específica
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.product === productId) {
              const totalPrice = calculateItemTotalPrice(
                item.unitPrice,
                quantity
              );
              return {
                ...item,
                quantity,
                totalPrice,
                price: totalPrice,
              };
            }
            return item;
          });

          const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      // Incrementar cantidad
      incrementQuantity: (productId: string) => {
        const item = get().getItem(productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },

      // Decrementar cantidad
      decrementQuantity: (productId: string) => {
        const item = get().getItem(productId);
        if (item && item.quantity > 1) {
          get().updateQuantity(productId, item.quantity - 1);
        } else if (item && item.quantity === 1) {
          get().removeItem(productId);
        }
      },

      // Limpiar carrito
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      // Obtener item específico
      getItem: (productId: string) => {
        return get().items.find((item) => item.product === productId);
      },

      // Verificar si un producto está en el carrito
      isInCart: (productId: string) => {
        return get().items.some((item) => item.product === productId);
      },

      // Alternar estado de reservado
      toggleReserved: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.product === productId) {
              return {
                ...item,
                reserved: !item.reserved,
              };
            }
            return item;
          });

          return {
            ...state,
            items: updatedItems,
          };
        });
      },

      // Obtener resumen del carrito
      getCartSummary: () => {
        const state = get();
        return {
          subtotal: state.totalPrice,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
        };
      },
    }),
    {
      name: "cart-storage", // nombre para localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

// Hook personalizado para facilitar el uso
export const useCart = () => {
  const store = useCartStore();

  return {
    ...store,
    // Métodos de conveniencia adicionales
    isEmpty: store.items.length === 0,
    itemCount: store.totalItems,

    // Obtener items reservados
    getReservedItems: () => store.items.filter((item) => item.reserved),

    // Obtener items no reservados
    getAvailableItems: () => store.items.filter((item) => !item.reserved),
  };
};
