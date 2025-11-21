// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  string,
  { lib: "MaterialIcons"; name: ComponentProps<typeof MaterialIcons>["name"] }
>;
type IconSymbolName = string;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
// Add an index signature to the mapping and type name as string to fix TS errors
const MAPPING: { [key: string]: { lib: string; name: string } } = {
  "house.fill": { lib: "MaterialIcons", name: "home" },
  "paperplane.fill": { lib: "MaterialIcons", name: "send" },
  "folder.fill": { lib: "MaterialIcons", name: "folder" },
  magnifyingglass: { lib: "MaterialIcons", name: "search" },
  xmark: { lib: "MaterialIcons", name: "close" },
  "chevron.right": { lib: "MaterialIcons", name: "chevron-right" },
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mapping = MAPPING[name];
  if (!mapping) return null;
  if (mapping.lib === "MaterialIcons") {
    return (
      <MaterialIcons
        color={color}
        size={size}
        name={mapping.name as any}
        style={style}
      />
    );
  }
  return null;
}
