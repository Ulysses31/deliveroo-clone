import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotalPrice,
} from "../../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

export default function BasketIcon() {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotalPrice);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 z-50 w-full">
      <TouchableOpacity
        className="bg-[#00ccbb] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white font-extrabold text-lg py-1 px-2 bg-[#01a296]">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          {parseFloat(basketTotal).toFixed(2)} €
        </Text>
      </TouchableOpacity>
    </View>
  );
}
