import { View, Text, TouchableOpacity, Image } from "react-native";

const categories = [
  {
    id: "1",
    label: "Women",
    icon: require("@/assets/icons/women.png"),
    active: true,
  },
  {
    id: "2",
    label: "Men",
    icon: require("@/assets/icons/men.png"),
  },
  {
    id: "3",
    label: "Accessories",
    icon: require("@/assets/icons/accessories.png"),
  },
  {
    id: "4",
    label: "Beauty",
    icon: require("@/assets/icons/beauty.png"),
  },
];

export default function CategoryNav() {
  return (
    <View className="flex-row justify-between px-5 py-4">
      {categories.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="items-center"
          activeOpacity={0.7}
        >
          <View
            className={`w-12 h-12 rounded-full items-center justify-center mb-1 ${
              item.active ? "bg-black" : "bg-gray-100"
            }`}
          >
            <Image
              source={item.icon}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
          <Text
            className={`text-xs ${
              item.active ? "text-black font-semibold" : "text-gray-400"
            }`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
