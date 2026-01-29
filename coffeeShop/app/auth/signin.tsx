import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../reuseables/authInput";
import AuthButton from "../reuseables/authButton";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = () => {
    const newErrors = {
      email: !validateEmail(email),
      password: password.length < 6,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) {
      Alert.alert("Error", "Please fix the highlighted fields.");
      return;
    }

    Alert.alert("Success", "Logged in successfully!");
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-20 px-8">
        <Text className="text-3xl font-semibold text-black mb-2">Log into</Text>
        <Text className="text-3xl font-semibold text-black mb-8">
          your account
        </Text>
      </View>

      <View className="w-full px-8">
        <AuthInput
          placeholder="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: !validateEmail(text) }));
          }}
          keyboardType="email-address"
          error={errors.email}
        />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({
              ...prev,
              password: text.length < 6,
            }));
          }}
          secureTextEntry
          error={errors.password}
        />

        {/* Forgot Password */}
        <View className="items-end mb-2">
          <TouchableOpacity
            onPress={() => router.replace("/auth/fpwd/forgotpassword")}
          >
            <Text className="text-gray-500">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <AuthButton title="LOG IN" onPress={handleLogin} />

        {/* Divider */}
        <Text className="text-center text-gray-500 mt-6">or log in with</Text>

        {/* Social Buttons */}
        <View className="flex-row justify-center mt-6 space-x-6">
          <TouchableOpacity className="p-3 rounded-full">
            <Image
              source={require("@/assets/images/google.png")}
              className="w-10 h-10"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500">Dont have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/auth/signup")}>
            <Text className="font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
