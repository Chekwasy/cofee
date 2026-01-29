import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    title: "Autumn Collection",
    subtitle: "2025",
    image: require("@/assets/women/banners/banner1.png"),
  },
  {
    id: "2",
    title: "Winter Collection",
    subtitle: "2025",
    image: require("@/assets/women/banners/banner1.png"),
  },
  {
    id: "3",
    title: "Summer Style",
    subtitle: "2025",
    image: require("@/assets/women/banners/banner1.png"),
  },
];

export default function AdBanner() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔁 Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View className="mt-2 mb-2">
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={{ width }} className="px-5">
            <View className="rounded-2xl overflow-hidden relative">
              <Image
                source={item.image}
                className="w-full h-48"
                resizeMode="cover"
              />

              {/* Overlay text */}
              <View className="absolute top-6 right-6">
                <Text className="text-white text-2xl font-semibold text-left">
                  {item.title.split(" ")[0]}
                </Text>
                <Text className="text-white text-2xl font-semibold text-left">
                  {item.title.split(" ")[1]}
                </Text>
                <Text className="text-white text-2xl font-semibold text-left">
                  {item.subtitle}
                </Text>
              </View>

              {/* Pagination dots ON IMAGE */}
              <View className="absolute bottom-4 self-center flex-row">
                {banners.map((_, index) => (
                  <View
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full mr-2 justify-center ${
                      index === currentIndex
                        ? "border border-white bg-transparent"
                        : "bg-white"
                    }`}
                  >
                    <View className="w-1 h-1 bg-white rounded-full self-center" />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
