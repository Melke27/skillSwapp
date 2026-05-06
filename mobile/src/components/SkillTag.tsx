import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

type SkillTagProps = {
  label: string;
  tone?: "primary" | "secondary";
};

export const SkillTag: React.FC<SkillTagProps> = ({ label, tone = "primary" }) => {
  return (
    <View style={[styles.tag, tone === "primary" ? styles.primary : styles.secondary]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8
  },
  primary: {
    backgroundColor: "#D6EEF6"
  },
  secondary: {
    backgroundColor: "#D7F3E8"
  },
  text: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 12
  }
});
