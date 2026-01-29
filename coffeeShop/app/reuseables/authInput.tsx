// components/FormInput.tsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { AuthInputProps } from "../types/types";

export default function AuthInput({
  value,
  onChangeText,
  placeholder,
  error = false,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  className = "",
}: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showEye = secureTextEntry;

  return (
    <View
      className={`flex-row items-center border-b py-1 mb-6 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={showEye && !isPasswordVisible}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`flex-1 py-3 text-base ${className}`}
      />

      {showEye && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          className="pl-3"
        >
          {isPasswordVisible ? (
            <EyeOff size={20} color="#6B7280" />
          ) : (
            <Eye size={20} color="#6B7280" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
