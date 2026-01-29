import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../reuseables/authInput";
import AuthButton from "../../reuseables/authButton";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function ChangePwdScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errors, setErrors] = useState({ password: false, password1: false });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleReset = () => {
    const newErrors = {
      password: password.length < 6,
      password1: password1.length < 6 || password !== password1,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) {
      Alert.alert("Error", "Please fix the highlighted fields.");
      return;
    }

    // 🔹 Show success popup
    setShowSuccess(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-5 px-8">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-3 mb-6 w-8 h-8 items-center justify-center rounded-full"
        >
          <ArrowLeft size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold text-black mb-2">
          Create New Password
        </Text>
        <Text className="text-xl text-primary-onboardGrayDark mb-8">
          Your new password must be different from previously used password
        </Text>
      </View>

      <View className="w-full px-8">
        <AuthInput
          placeholder="New Password"
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
        <AuthInput
          placeholder="Confirm Password"
          value={password1}
          onChangeText={(text) => {
            setPassword1(text);
            setErrors((prev) => ({
              ...prev,
              password1: text.length < 6,
            }));
          }}
          secureTextEntry
          error={errors.password1}
        />

        {/* Reset Button */}
        <AuthButton title="Confirm" onPress={handleReset} />
      </View>
      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl px-8 py-10 items-center">
            <Image
              source={require("@/assets/images/successReset.png")}
              className="w-20 h-20 mb-6"
              resizeMode="contain"
            />

            <Text className="text-xl font-semibold text-black mb-2">
              Your password has been changed
            </Text>

            <Text className="text-gray-500 text-center mb-8">
              Welcome back! Discover now!
            </Text>

            <TouchableOpacity
              onPress={() => {
                setShowSuccess(false);
                router.replace("/(tabs)/home");
              }}
              className="bg-black w-full py-4 rounded-full"
            >
              <Text className="text-white text-center text-lg font-medium">
                Browse home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
