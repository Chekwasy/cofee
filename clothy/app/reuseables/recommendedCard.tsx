import { View, Text, Image } from "react-native";

export default function RecommendedCard({
  image,
  title,
  price,
}: {
  image: any;
  title: string;
  price: string;
}) {
  return (
    <View className="mr-4 flex-row items-center bg-white rounded-xl p-3 w-72">
      {/* Image (Left) */}
      <Image
        source={image}
        className="w-20 h-20 rounded-lg"
        resizeMode="contain"
      />

      {/* Text (Right - Column) */}
      <View className="ml-3 flex-1">
        <Text className="text-sm text-black mb-1" numberOfLines={2}>
          {title}
        </Text>
        <Text className="text-sm font-semibold text-black">${price}</Text>
      </View>
    </View>
  );
}
