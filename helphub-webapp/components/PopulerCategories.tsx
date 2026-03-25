import { Pressable, Text, View } from "react-native";
import astrology from '../assets/popularCategories/astrology.webp';
import child from '../assets/popularCategories/child.webp';
import dietician from '../assets/popularCategories/dietician.webp';
import family from '../assets/popularCategories/family.webp';
import lifeCoach from '../assets/popularCategories/lifeCoach.webp';
import psychology from '../assets/popularCategories/psychology.webp';


import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryCard from "./ui/CategoryCard";

function PopulerCategories() {
    return (
        <View className=" flex p-10 justify-center items-center w-full">
            <Text className="text-3xl font-bold mb-4">Popular Categories</Text>
            <Text className="text-xl text-gray-600 mb-6 text-center">
                There will be more than 1.500 experts in 39 categories here for you...
            </Text>

            <View className="flex-row w-full items-center justify-center">
                <CategoryCard title="Astrology" image={astrology} />
                <CategoryCard title="Psychology" image={psychology} />
                <CategoryCard title="Life Coach" image={lifeCoach} />
                <CategoryCard title="Child Development" image={child} />
                <CategoryCard title="Dietician" image={dietician} />
                <CategoryCard title="Family Counseling" image={family} />
            </View>

            <Pressable className="mt-6 px-6 py-3 bg-red-400 rounded-full w-52 flex-row items-center justify-center">
                <Ionicons name="arrow-forward" size={20} color="white" className="mr-2" />
                <Text className="text-white font-bold">See All Categories</Text>
            </Pressable>

        </View>
    );
}

export default PopulerCategories;