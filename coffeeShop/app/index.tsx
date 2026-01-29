import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import OnboardButton from "./reuseables/onboardButton";

export default function Index() {
  return (
    <ImageBackground
      source={require("@/assets/images/OnScreen.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <ImageBackground
        source={require("@/assets/images/onboard-dark.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1 justify-end p-12">
          <View className="mb-10">
            <Text className="text-primary-light text-3xl font-bold text-center mb-2">
              Welcome to CoffeeShop!
            </Text>
            <Text className="text-primary-silver text-center text-base mb-6">
              Real Taste
            </Text>

            {/* Button */}
            <OnboardButton
              title="Get Started"
              onPress={() => router.push("./onboarding/onboard")}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}
