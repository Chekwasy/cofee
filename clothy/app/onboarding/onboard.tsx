import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import OnboardButton from "../reuseables/onboardButton";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Discover something new",
    subtitle: "Special new arrivals just for you",
    image: require("@/assets/images/onboard-discover.png"),
  },
  {
    id: "2",
    title: "Update trendy outfit",
    subtitle: "Favorite brands and hottest trends",
    image: require("@/assets/images/onboard-update.png"),
  },
  {
    id: "3",
    title: "Explore your true style",
    subtitle: "Relax and let us bring the style to you",
    image: require("@/assets/images/onboard-explore.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/auth/signup");
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <SafeAreaView className="flex-1 w-full h-full mt-8 bg-primary-light">
      {/* Top text section */}
      <View className="items-center w-full pt-12 h-[70%] z-10">
        <Text className="text-2xl font-semibold text-black mb-2 text-center">
          {currentSlide.title}
        </Text>
        <Text className="text-primary-onboardGrayDark text-center mb-6">
          {currentSlide.subtitle}
        </Text>

        <FlatList
          data={slides}
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className="items-center justify-center z-20"
              style={{ width }}
            >
              <View className="bg-primary-onboardGrayLight  w-80 h-100 rounded-2xl overflow-hidden">
                <Image
                  source={item.image}
                  className="w-full h-full rounded-xl"
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        />
        <View className="w-full flex flex-row justify-between mb-12 -mt-[320px]">
          <View
            className={`w-[5%] justify-start rounded-tr-2xl rounded-br-2xl ${currentIndex === 0 ? "bg-primary-light h-10" : "bg-primary-onboardGrayLight h-80"}`}
          />

          <View
            className={`w-[5%] justify-end rounded-tl-2xl rounded-bl-2xl ${currentIndex === 2 ? "bg-primary-light h-10" : "bg-primary-onboardGrayLight h-80"}`}
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View className="bg-primary-onboardGrayDark h-[42%] w-full -mt-24 items-center justify-center pt-8 pb-12 z-0">
        {/* Pagination Dots */}
        <View className="flex-row space-x-2 mt-12">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === currentIndex ? "bg-gray-300" : "bg-gray-500/40"
              }`}
            />
          ))}
        </View>

        {/* Button */}
        <OnboardButton title="Shopping Now" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
