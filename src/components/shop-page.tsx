"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import CartItemComponent from "@/components/cart-item";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  neighborhood: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    neighborhood: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCep = (cep: string): boolean => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
  };

  const formatCep = (cep: string): string => {
    const numbers = cep.replace(/\D/g, "");
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const fetchAddressByCep = async (cep: string) => {
    if (!validateCep(cep)) return;

    setIsLoadingCep(true);
    const cleanCep = cep.replace(/\D/g, "");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setFormErrors((prev) => ({ ...prev, zipCode: "CEP não encontrado" }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        address: data.logradouro || prev.address,
        city: data.localidade || prev.city,
        state: data.uf || prev.state,
        neighborhood: data.bairro || prev.neighborhood,
      }));

      setFormErrors((prev) => ({ ...prev, zipCode: undefined }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setFormErrors((prev) => ({
        ...prev,
        zipCode: "Erro ao buscar CEP. Tente novamente.",
      }));
    } finally {
      setIsLoadingCep(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Nome é obrigatório";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Sobrenome é obrigatório";
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Por favor, insira um email válido";
    }

    if (!formData.address.trim()) {
      errors.address = "Endereço é obrigatório";
    }

    if (!formData.city.trim()) {
      errors.city = "Cidade é obrigatória";
    }

    if (!formData.zipCode.trim()) {
      errors.zipCode = "CEP é obrigatório";
    } else if (!validateCep(formData.zipCode)) {
      errors.zipCode = "Por favor, insira um CEP válido (ex: 12345-678)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;

    if (field === "zipCode") {
      formattedValue = formatCep(value);

      if (formattedValue.length === 9) {
        fetchAddressByCep(formattedValue);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    if (field in formErrors) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOrderConfirmed(true);
    dispatch({ type: "CLEAR_CART" });
    setIsSubmitting(false);
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
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600 mb-2">
              Obrigado pela sua compra, {formData.firstName}!
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Um email de confirmação foi enviado para {formData.email}
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/collections">Continuar Comprando</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/">Voltar ao Início</Link>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Finalizar Compra
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>
                        R$ {((item.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>R$ {state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Informações de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome *"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Sobrenome *"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="CEP *"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        maxLength={9}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                          formErrors.zipCode
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {isLoadingCep && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Search className="h-4 w-4 animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>
                    {formErrors.zipCode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.zipCode}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Digite o CEP para buscar o endereço automaticamente
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Endereço *"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.address
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Bairro"
                      value={formData.neighborhood}
                      onChange={(e) =>
                        handleInputChange("neighborhood", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Cidade *"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Estado"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength={2}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  * Campos obrigatórios
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1"
                >
                  Voltar ao Carrinho
                </Button>
                <Button
                  onClick={handleConfirmOrder}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : "Confirmar Pedido"}
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
            Continuar Comprando
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carrinho de Compras
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
                <Link href="/collections">Explorar Coleções</Link>
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
                    Resumo do Pedido
                  </h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Itens ({state.itemCount})</span>
                      <span>R$ {state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Frete</span>
                      <span>Grátis</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>R$ {state.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleCheckout} className="w-full mb-4">
                    Finalizar Compra
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-transparent"
                  >
                    <Link href="/collections">Continuar Comprando</Link>
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
