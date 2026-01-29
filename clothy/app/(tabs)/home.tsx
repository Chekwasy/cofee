import { ScrollView, View, Text, Image, FlatList } from "react-native";
import SectionHeader from "@/app/reuseables/sectionHeader";
import ProductCard from "@/app/reuseables/productCard";
import TopNavBar from "../reuseables/topNavbar";
import CategoryNav from "../reuseables/homeCategory";
import AdBanner from "../reuseables/adBanner";
import RecommendedCard from "../reuseables/recommendedCard";
import CollectionBanner from "../reuseables/collectionBanner";
import CategoryCards from "../reuseables/categoryBanner";

const PRODUCTS = [
  {
    id: "1",
    title: "Turtleneck Sweater",
    price: "39.99",
    image: require("@/assets/women/products/p1.png"),
  },
  {
    id: "2",
    title: "Long Sleeve Dress",
    price: "45.00",
    image: require("@/assets/women/products/p2.png"),
  },
  {
    id: "3",
    title: "Sportswear Set",
    price: "80.00",
    image: require("@/assets/women/products/p3.png"),
  },
];

const RECOMMENDED_PRODUCTS = [
  {
    id: "1",
    title: "White Fashion Sweater",
    price: "49.99",
    image: require("@/assets/women/recommended/r1.png"),
  },
  {
    id: "2",
    title: "Cotton Top",
    price: "55.00",
    image: require("@/assets/women/recommended/r2.png"),
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <TopNavBar />
      <CategoryNav />
      <AdBanner />

      {/* FEATURE PRODUCTS */}
      <SectionHeader title="Feature Products" onPress={() => {}} />

      <FlatList
        data={PRODUCTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <ProductCard
            image={item.image}
            title={item.title}
            price={item.price}
          />
        )}
      />

      {/* NEW COLLECTION */}
      <CollectionBanner
        image={require("@/assets/women/banners/banner2.png")}
        text1="NEW COLLECTION"
        text2="HANG OUT"
        text3="& PARTY"
      />

      {/* RECOMMENDED */}
      <SectionHeader title="Recommended" onPress={() => {}} />

      <FlatList
        data={RECOMMENDED_PRODUCTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id + "rec"}
        contentContainerStyle={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <RecommendedCard
            image={item.image}
            title={item.title}
            price={item.price}
          />
        )}
      />

      {/* TOP COLLECTION */}
      <SectionHeader title="Top Collection" onPress={() => {}} />

      <CollectionBanner
        image={require("@/assets/women/top-collections/tt1.png")}
        text1="| Save up to 40%"
        text2="FOR SLIM"
        text3="& BEAUTY"
      />

      <CollectionBanner
        image={require("@/assets/women/top-collections/tt2.png")}
        text1="| Summer Collection 2025"
        text2="Most sexy"
        text3="& fabulous"
        text4="design"
      />

      <CategoryCards />

      <View className="h-24" />
    </ScrollView>
  );
}
