"use client";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import CartItemComponent from "@/components/cart-item";
import { useState } from "react";

export default function ShopPage() {
  const { state, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    dispatch({ type: "CLEAR_CART" });
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 mt-15">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pedido confirmado!
            </h1>
            <p className="text-gray-600 mb-6">
              Obrigado pela sua compra. Seu pedido foi feito com sucesso e será
              processado em breve.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/collections">Continuar comprando</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/">Voltar para Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 mt-15">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Informações de envio
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Primeiro Nome"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Ultimo Nome"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Endereço"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Cidade"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CEP"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1"
                >
                  Voltar ao carrinho
                </Button>
                <Button onClick={handleConfirmOrder} className="flex-1">
                  Confirmar pedido
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-15">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link
            href="/collections"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar comprando
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carrinho de compras
          </h1>

          {state.items.length === 0 ? (
            <div className="rounded-lg p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600 mb-6">
                Descubra nossas belas coleções e adicione alguns itens ao seu
                carrinho.
              </p>
              <Button asChild>
                <Link href="/collections">Navegar pelas coleções</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {state.items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Resumo do pedido
                  </h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Items ({state.itemCount})</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Envio</span>
                      <span>Grátis</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${state.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleCheckout} className="w-full mb-4">
                    Finalizar compra
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-transparent"
                  >
                    <Link href="/collections">Continuar comprando</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
