"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/cart-context";
import { useCart } from "@/lib/cart-context";

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const updateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: newQuantity },
    });
  };

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item.id,
    });
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0">
        <Image
          src={item.url || "/placeholder.svg"}
          alt={item.alt}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.collectionName}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">
          R${item.price ? (item.price * item.quantity).toFixed(2) : "0.00"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.quantity - 1)}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.quantity + 1)}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={removeItem}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
