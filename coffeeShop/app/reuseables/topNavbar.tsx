import { View, Text, TouchableOpacity, Image } from "react-native";

export default function TopNavBar() {
  return (
    <View className="flex-row items-center justify-between mt-8 px-5 py-4 bg-white">
      {/* Menu */}
      <TouchableOpacity>
        <Image
          source={require("@/assets/icons/menu.png")}
          className="w-6 h-6"
        />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-lg font-semibold text-black">Chekwasy Store</Text>

      {/* Notification */}
      <TouchableOpacity>
        <Image
          source={require("@/assets/icons/bell-non.png")}
          className="w-6 h-6"
        />
      </TouchableOpacity>
    </View>
  );
}
