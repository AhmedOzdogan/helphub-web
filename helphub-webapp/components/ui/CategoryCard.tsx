import { Image, Text, View } from 'react-native';

interface CategoryCardProps {
    title: string;
    image: number;
}

function CategoryCard({ title, image }: CategoryCardProps) {
    return (
        <View className="relative mr-4 h-52 w-52 p-5 gap-3 overflow-hidden rounded-lg bg-white shadow-md">
            <View className="flex-1">
                <Image
                    source={image}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </View>

            <View className="absolute bottom-3 left-0 right-0">
                <Text className="text-center font-bold text-black">{title}</Text>
            </View>
        </View>
    );
}

export default CategoryCard;
