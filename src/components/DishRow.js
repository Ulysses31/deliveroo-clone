import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { urlFor } from "../../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsById,
  selectBasketTotalPrice,
  selectBasketItemTotalPrice,
} from "../../features/basketSlice";

export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsById(state, id));
  const itemsTotalPrice = useSelector((state) =>
    selectBasketItemTotalPrice(state, id)
  );
  const totalPrice = useSelector((state) => selectBasketTotalPrice(state));

  const handleAddItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const handleRemoveItemFromBasket = (id) => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        className="bg-white border border-gray-200 p-4"
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">{price} €</Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
              style={styles.image}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={() => handleRemoveItemFromBasket(id)}>
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00ccbb" : "gray"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={() => handleAddItemToBasket()}>
              <PlusCircleIcon
                size={40}
                color="#00ccbb"
              />
            </TouchableOpacity>
            <Text>
              <Text className="text-gray-400 text-sm">Total:</Text>{" "}
              {parseFloat(itemsTotalPrice).toFixed(2)} €
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
});
