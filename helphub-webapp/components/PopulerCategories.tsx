import { Text, View } from "react-native";
import astrology from '../assets/popularCategories/astrology.webp';
import child from '../assets/popularCategories/child.webp';
import dietician from '../assets/popularCategories/dietician.webp';
import family from '../assets/popularCategories/family.webp';
import lifeCoach from '../assets/popularCategories/lifeCoach.webp';
import psychology from '../assets/popularCategories/psychology.webp';


import { useTranslation } from "react-i18next";
import CategoryCard from "./ui/CategoryCard";
import RedButton from "./ui/RedButton";

function PopulerCategories() {
    const { t, i18n } = useTranslation();
    return (
        <View className="flex p-10 justify-center items-center w-full z-[-999]">
            <Text className="text-2xl font-bold mb-4">{t('popularCategories.title')}</Text>
            <Text className="text-lg text-gray-600 mb-6 text-center">
                {t('popularCategories.description')}
            </Text>

            <View
                className="flex-col md:flex-row w-full items-center justify-center gap-4 md:flex-wrap mb-6"
                testID="category-cards-container"
            >
                <CategoryCard title={t('popularCategories.Astrology')} image={astrology} />
                <CategoryCard title={t('popularCategories.Psychology')} image={psychology} />
                <CategoryCard title={t('popularCategories.Life Coach')} image={lifeCoach} />
                <CategoryCard title={t('popularCategories.Child Development')} image={child} />
                <CategoryCard title={t('popularCategories.Dietitian')} image={dietician} />
                <CategoryCard title={t('popularCategories.Family Counseling')} image={family} />
            </View>

            <RedButton Icon={{ name: "arrow-forward", size: 20 }} ButtonText={t('popularCategories.buttonText')} />
        </View>
    );
}

export default PopulerCategories;