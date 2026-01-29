import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AuthButtonProps } from "../types/types";

export default function AuthButton({
  title,
  onPress,
  className = "",
}: AuthButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`bg-primary-dark w-[50%] rounded-full py-3 mt-6 self-center items-center ${className}`}
    >
      <Text className="text-white font-semibold text-base">{title}</Text>
    </TouchableOpacity>
  );
}
