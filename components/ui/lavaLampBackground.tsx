import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export function LavaLampBackground() {
  return (
    <View style={{ position: "absolute", inset: 0 }}>
      {/* Base vertical gradient (matches login page) */}
      <LinearGradient
        colors={["#0B0015", "#4B0F80", "#5A1EB5", "#1E0F60", "#070016"]}
        locations={[0, 0.25, 0.5, 0.8, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Radial purple glow (top center) */}
      <View
        style={{
          position: "absolute",
          top: -height * 0.15,
          left: width * 0.1,
          width: width * 1.2,
          height: width * 1.2,
          borderRadius: width * 0.6,
          backgroundColor: "rgba(140, 70, 255, 0.55)",
        }}
      />

      {/* Radial blue glow (bottom right) */}
      <View
        style={{
          position: "absolute",
          bottom: -height * 0.1,
          right: -width * 0.3,
          width: width * 1.4,
          height: width * 1.4,
          borderRadius: width * 0.7,
          backgroundColor: "rgba(60, 120, 255, 0.45)",
        }}
      />

      {/* Radial magenta glow (mid left) */}
      <View
        style={{
          position: "absolute",
          top: height * 0.35,
          left: -width * 0.4,
          width: width * 1.6,
          height: width * 1.6,
          borderRadius: width * 0.8,
          backgroundColor: "rgba(200, 50, 160, 0.4)",
        }}
      />

      {/* Soft blur to unify everything */}
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />

      {/* Subtle vignette for depth */}
      <LinearGradient
        colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
