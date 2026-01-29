import { View, Text, TouchableOpacity } from "react-native";

export default function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <View className="flex-row justify-between items-center px-5 mb-3">
      <Text className="text-lg font-semibold text-black">{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text className="text-gray-400 text-sm">Show all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
