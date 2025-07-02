"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../lib/cart-context";

export function CartIcon() {
  const { state } = useCart();

  return (
    <Link href="/shop" className="pl-2 pt-[2px] flex">
      <ShoppingCart className="h-5 w-5" />
      {state.itemCount > 0 && (
        <span className="ml-[-4px] mt-[-6px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {state.itemCount > 9 ? "9+" : state.itemCount}
        </span>
      )}
    </Link>
  );
}
