import { View, Text, Image } from "react-native";

export default function CategoryCards() {
  return (
    <View className="flex-row px-5 mb-6 gap-1">
      {/* LEFT CARD */}
      <View className="flex-1 bg-gray-100 rounded-2xl overflow-hidden flex-row items-center">
        {/* Image */}
        <Image
          source={require("@/assets/women/top-collections/td1.png")}
          className="w-20 h-48 ml-3"
          resizeMode="contain"
        />

        {/* Text */}
        <View className="flex-1 p-4">
          <Text className="text-xs text-gray-400 mb-1">T-Shirts</Text>
          <Text className="text-base font-semibold text-black">
            The Office{"\n"}Life
          </Text>
        </View>
      </View>

      {/* RIGHT CARD */}
      <View className="flex-1 bg-gray-100 rounded-2xl overflow-hidden flex-row items-center">
        {/* Image */}
        <Image
          source={require("@/assets/women/top-collections/td2.png")}
          className="w-20 h-48 ml-3"
          resizeMode="contain"
        />

        {/* Text */}
        <View className="flex-1 p-4">
          <Text className="text-xs text-gray-400 mb-1">Dresses</Text>
          <Text className="text-base font-semibold text-black">
            Elegant{"\n"}Design
          </Text>
        </View>
      </View>
    </View>
  );
}
