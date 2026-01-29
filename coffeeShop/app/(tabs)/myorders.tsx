import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./../../store/store";

interface CartItem {
  id: string;
  name: string;
  size?: string;
  price: number;
  qty: number;
  image: any;
}

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const cartItems = useSelector((state: RootState) => state.mainSlice);
  const dispatch = useDispatch();

  const subtotal = cartItems.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleAddCart = (item: CartItem) => {
    const updatedCart = cartItems.cart.map((i) =>
      i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
    );

    dispatch({
      type: "mainState/mainStateReducer",
      payload: {
        cart: updatedCart,
      },
    });
  };

  const handleReduceCart = (item: CartItem) => {
    const updatedCart = cartItems.cart
      .map((i) => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);

    dispatch({
      type: "mainState/mainStateReducer",
      payload: {
        cart: updatedCart,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-5 pt-4 pb-2 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        <Text className="flex-1 text-center text-lg font-semibold">
          Your Cart
        </Text>

        <View className="w-6" />
      </View>

      {/* CART LIST */}
      <FlatList
        data={cartItems.cart}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 160, // space for footer button
        }}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-6">
            <Image source={item.image} className="w-16 h-16 rounded-xl mr-4" />

            <View className="flex-1">
              <Text className="font-semibold text-base">{item.name}</Text>
              <Text className="text-gray-400 text-sm">{item.size}</Text>
            </View>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity
                onPress={() => handleReduceCart(item)}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Text>-</Text>
              </TouchableOpacity>

              <Text className="font-semibold">{item.qty}</Text>

              <TouchableOpacity
                onPress={() => handleAddCart(item)}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-4">Payment Summary</Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Tax</Text>
              <Text>${tax.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mt-2">
              <Text className="font-semibold">Total</Text>
              <Text className="font-semibold">${total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />

      {/* FIXED PLACE ORDER BUTTON */}
      <View
        className="absolute left-0 right-0 bg-white pb-12 px-5 pt-3 z-50"
        style={{
          bottom: insets.bottom + 30,
          elevation: 30,
        }}
      >
        <TouchableOpacity className="bg-orange-500 py-4 rounded-2xl">
          <Text className="text-white text-center font-semibold text-base">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
