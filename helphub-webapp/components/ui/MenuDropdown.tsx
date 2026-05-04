import { Link } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';
interface MenuDropdownProps {
    onMouseEnterFunction: () => void;
    onMouseLeaveFunction: () => void;
    menuText: string;
    TestID?: string;
}
function MenuDropdown({ TestID, onMouseEnterFunction, onMouseLeaveFunction, menuText }: MenuDropdownProps) {
    return (

        <View
            className="relative"
            testID={TestID}
            {...(Platform.OS === 'web' && {
                onMouseEnter: onMouseEnterFunction,
                onMouseLeave: onMouseLeaveFunction,
            })}
        >
            <Link href="/" asChild>
                <Pressable className="rounded-[28px] px-2 pb-2 pt-1">
                    <Text className="text-lg font-semibold text-gray-800 hover:text-red-500 hover:underline decoration-red-500 underline-offset-8">
                        {menuText}
                    </Text>
                </Pressable>
            </Link>
        </View>
    );
}

export default MenuDropdown;
