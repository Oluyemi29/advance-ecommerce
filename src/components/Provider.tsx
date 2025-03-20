"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
type ProductProps = {
  id: string;
  imageUrl: string;
  imageIndex: number;
  name: string;
  quantity: number;
  price: number;
  color: string;
};
type CartProps = {
  addToCart: (
    id: string,
    imageUrl: string,
    imageIndex: number,
    name: string,
    quantity: number,
    price: number,
    color: string
  ) => void;
  cart: ProductProps[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItemed: (id: string) => void;
  clearAllCart: () => void;
};
export const CartContext = createContext<CartProps | undefined>(undefined);
const Provider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ProductProps[]>([]);
  useEffect(() => {
    const PersistingCart = localStorage.getItem("items") as string;
    if (PersistingCart) {
      setCart(JSON.parse(PersistingCart));
    }
  }, []);
  const addToCart = (
    id: string,
    imageUrl: string,
    imageIndex: number,
    name: string,
    quantity: number,
    price: number,
    color: string
  ) => {
    const presentCart = cart?.find((carting) => {
      return carting.id === id;
    });
    if (presentCart) {
      toast.error("Items Already exist in cart");
    } else {
      const product = {
        id,
        imageUrl,
        imageIndex,
        name,
        quantity,
        price,
        color,
      };
      toast.success("Product Added Successfully");

      setCart([...cart, product]);
      localStorage.setItem("items", JSON.stringify([...cart, product]));
    }
  };
  const increaseQuantity = (id: string) => {
    const ItemIndex = cart.findIndex((cartIndex) => {
      return cartIndex.id === id;
    });
    cart[ItemIndex].quantity += 1;
    setCart([...cart]);
    localStorage.setItem("items", JSON.stringify([...cart]));
  };
  const decreaseQuantity = (id: string) => {
    const ItemIndex = cart.findIndex((cartIndex) => {
      return cartIndex.id === id;
    });
    if (cart[ItemIndex].quantity > 1) {
      cart[ItemIndex].quantity -= 1;
      setCart([...cart]);
      localStorage.setItem("items", JSON.stringify([...cart]));
    }
  };
  const removeItemed = (id: string) => {
    const ItemIndex = cart.filter((allCart) => {
      return allCart?.id !== id;
    });
    setCart([...ItemIndex]);
    localStorage.setItem("items", JSON.stringify([...ItemIndex]));
  };
  const clearAllCart = () => {
    setCart([]);
    localStorage.removeItem("items");
  };

  return (
    <HeroUIProvider>
      {" "}
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <CartContext.Provider
          value={{
            addToCart,
            cart,
            increaseQuantity,
            decreaseQuantity,
            removeItemed,
            clearAllCart,
          }}
        >
          <KindeProvider>{children}</KindeProvider>
        </CartContext.Provider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default Provider;
