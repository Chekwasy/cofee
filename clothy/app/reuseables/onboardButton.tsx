import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AppButtonProps } from "../types/types";

export default function OnboardButton({ title, onPress }: AppButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-gray-400 border border-gray-200 w-[50%] rounded-full self-center justify-center items-center mt-6 py-3 px-12"
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
