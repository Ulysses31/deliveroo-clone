import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient from "../../sanity";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "category"] {
          ...
        }
      `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.contentContainerStyle}
    >
      {/* {CategoryCard} */}
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={category.image}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
