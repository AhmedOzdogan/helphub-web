import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text } from "react-native";

interface RedButtonProps {
    Icon?: {
        name: keyof typeof Ionicons.glyphMap;
        size: number;
        color?: string;
    };
    ButtonText: string;
    wfull?: boolean;
    onPress?: () => void;
    disabled?: boolean;
    rotatingIcon?: boolean;
}

function RedButton({ Icon, ButtonText, wfull, onPress, disabled, rotatingIcon }: RedButtonProps) {
    return (
        <Pressable
            className={`mt-6 px-6 py-3 bg-red-500 rounded-full ${wfull ? 'w-full' : 'w-52'} h-12 flex-row items-center justify-center`}
            onPress={onPress}
            disabled={disabled}
        >
            {Icon && <Ionicons name={Icon.name} size={Icon.size} color={Icon.color || "white"} className={`mr-2 ${rotatingIcon ? 'animate-spin' : ''}`} />}
            <Text className="text-white font-bold">{ButtonText}</Text>
        </Pressable>);
}

export default RedButton;