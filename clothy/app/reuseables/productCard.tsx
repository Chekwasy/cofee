import { View, Text, Image } from "react-native";

export default function ProductCard({
  image,
  title,
  price,
}: {
  image: any;
  title: string;
  price: string;
}) {
  return (
    <View className="mr-4 w-36">
      <Image
        source={image}
        className="w-full h-44 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-sm text-black" numberOfLines={1}>
        {title}
      </Text>
      <Text className="text-sm font-semibold text-black">${price}</Text>
    </View>
  );
}
