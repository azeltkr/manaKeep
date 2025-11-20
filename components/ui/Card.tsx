import { View, ViewProps } from "react-native";
import { cn } from "../../lib/utils";

export function Card({
  className,
  children,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        "bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
