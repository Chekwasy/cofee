import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-3 mb-6 w-8 h-8 items-center justify-center rounded-full"
      >
        <ArrowLeft size={22} color="#000" />
      </TouchableOpacity>

      {/* Header */}
      <Text className="text-2xl font-semibold mb-2 text-black">
        Forgot password?
      </Text>
      <Text className="text-gray-500 mb-10 leading-6">
        Enter email associated with your account and we'll send an email with
        instructions to reset your password
      </Text>

      {/* Input */}
      <View className="border-b border-gray-300 mb-6">
        <TextInput
          placeholder="enter your email here"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="py-3 text-base text-black"
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-black py-3 rounded-full items-center mt-4"
        onPress={() => router.push("/auth/fpwd/verification")}
      >
        <Text className="text-white font-semibold text-base">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
