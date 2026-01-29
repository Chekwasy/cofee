import { View, Text, Image } from "react-native";

type CollectionBannerProps = {
  image: any; // require("...")
  text1: string;
  text2: string;
  text3: string;
  text4?: string;
};

export default function CollectionBanner({
  image,
  text1,
  text2,
  text3,
  text4,
}: CollectionBannerProps) {
  return (
    <View className="mx-5 my-2 mb-6 bg-gray-100 rounded-2xl overflow-hidden flex-row items-center">
      {/* Text Section */}
      <View className="p-5 flex-1">
        <Text className="text-xs text-gray-400 mb-1">{text1}</Text>

        <Text className="text-lg font-semibold text-black">
          {text2}
          {"\n"}
          {text3}
          {"\n"}
          {text4}
        </Text>
      </View>

      {/* Image Section */}
      <Image source={image} className="w-40 h-40" resizeMode="contain" />
    </View>
  );
}
