import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react-native";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { useDispatch, useSelector } from "react-redux";
import { mainStateReducer } from "@/store/slices/mainslice";
import type { RootState, AppDispatch } from "./../../store/store";

interface CoffeeProp {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: any;
  size?: string;
}

interface CartItem extends CoffeeProp {
  qty: number;
}

interface StoreState {
  cart: CartItem[];
}

const categories = ["All", "Hot Coffee", "Iced Coffee", "Tea Coffee"];

const COFFEE_MENU = [
  {
    id: "1",
    name: "Espresso",
    description: "Strong, concentrated coffee.",
    price: 3.5,
    category: "Hot",
    image: require("@/assets/images/cofee.jpg"),
  },
  {
    id: "2",
    name: "Iced Latte",
    description: "Espresso mixed with cold milk and ice.",
    price: 4.5,
    category: "Iced",
    image: require("@/assets/images/is-cofee.jpg"),
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam.",
    price: 4.0,
    category: "Hot",
    image: require("@/assets/images/coffee-beans.jpg"),
  },
  {
    id: "4",
    name: "Green Tea",
    description: "Soothing organic green tea.",
    price: 3.0,
    category: "Tea",
    image: require("@/assets/images/cofee.jpg"),
  },
  {
    id: "5",
    name: "Cold Brew",
    description: "Steeped for 12 hours for smoothness.",
    price: 5.0,
    category: "Iced",
    image: require("@/assets/images/is-cofee.jpg"),
  },
  {
    id: "6",
    name: "Americano",
    description: "Espresso diluted with hot water.",
    price: 3.25,
    category: "Hot",
    image: require("@/assets/images/coffee-beans.jpg"),
  },
];

export default function CoffeeMenuScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);

  const dispatch = useDispatch();

  const cartItems: StoreState = useSelector(
    (state: RootState) => state.mainSlice,
  );

  const filteredMenu =
    activeCategory === "All"
      ? COFFEE_MENU
      : COFFEE_MENU.filter((item) => item.category === activeCategory);

  const handleCart = (item: CoffeeProp) => {
    setCart((prev) => {
      let updatedCart: CartItem[];

      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        updatedCart = prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      } else {
        updatedCart = [...prev, { ...item, qty: 1 }];
      }

      dispatch(
        mainStateReducer({
          cart: updatedCart,
        }),
      );

      return updatedCart;
    });
  };

  useEffect(() => {
    setCart(cartItems.cart);
  }, [cartItems.cart]);

  return (
    <View className="flex-1 bg-[#FFF9F5]">
      {/* HEADER - FIXED */}
      <BlurView
        intensity={100}
        tint="light"
        className="absolute top-0 left-0 right-0 z-10 px-5 pt-14 pb-4"
      >
        {/* Header Row */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-center flex-1">
            Our Menu
          </Text>

          <TouchableOpacity onPress={() => console.log("Search")}>
            <Search size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Category List */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 10, marginTop: 15 }}
          renderItem={({ item }) => {
            const isActive = item.split(" ")[0] === activeCategory;
            return (
              <TouchableOpacity
                onPress={() => setActiveCategory(item.split(" ")[0])}
                className={`h-10 mr-3 px-5 py-2 rounded-full ${
                  isActive
                    ? "bg-orange-500/80"
                    : "bg-white/80 border border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium text-base ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </BlurView>

      {/* MENU FLATLIST */}
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 180,
          paddingBottom: cart.length > 0 ? 200 : 120,
        }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-4 mb-4 flex-row items-center">
            <Image
              source={item.image}
              className="w-20 h-20 rounded-xl mr-4 bg-gray-100"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold">{item.name}</Text>
              <Text className="text-orange-500 font-semibold my-1">
                ${item.price.toFixed(2)}
              </Text>
              <Text className="text-xs text-gray-500" numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleCart(item)}
              className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center"
            >
              <Text className="text-white text-2xl">+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {cart.reduce((s, i) => s + i.qty, 0) > 0 && (
        <View className="absolute bottom-28 left-0 right-0 z-50 px-4 pb-4">
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/myorders")}
            activeOpacity={0.9}
            className="bg-black rounded-full px-5 py-4 flex-row items-center justify-between"
          >
            {/* LEFT SIDE */}
            <View className="flex-row items-center space-x-3">
              {/* Cart Count Bubble */}
              <View className="w-8 h-8 rounded-full bg-gray-500 items-center mr-3 justify-center">
                <Text className="text-white font-semibold text-lg">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </Text>
              </View>

              {/* Text */}
              <View>
                <Text className="text-white font-semibold text-lg">
                  View Cart
                </Text>
                <Text className="text-gray-400 text-sm">
                  {cart.reduce((s, i) => s + i.qty, 0)} items added
                </Text>
              </View>
            </View>

            {/* RIGHT SIDE */}
            <Text className="text-white font-bold text-lg">
              ${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
