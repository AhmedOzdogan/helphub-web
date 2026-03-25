import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
interface MenuLinkProps {
    text: string;
}

function MenuLink({ text }: MenuLinkProps) {
    return (
        <Link href="/" asChild>
            <Pressable className="rounded-[28px] px-2 pb-2 pt-1">
                <Text className="text-lg font-medium text-gray-400 hover:text-gray-700">
                    {text}
                </Text>
            </Pressable>
        </Link>)
}

export default MenuLink;