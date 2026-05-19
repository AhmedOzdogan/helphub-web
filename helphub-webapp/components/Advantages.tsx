import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import StepCard from './ui/StepCard';


function Advantages() {
    const { t, i18n } = useTranslation();
    return (
        <View testID="advantages-section" className="w-full items-center justify-center bg-white px-4 md:px-16 py-8 md:py-12">
            {/* Title */}
            <Text
                className="mb-2 md:mb-3 text-xl md:text-2xl font-bold text-slate-800 text-center"
                testID='advantages-title
            '>
                {t('advantages.title')} <Text className="text-blue-500">HelpHub</Text>
            </Text>

            {/* Steps */}
            <View testID="advantages-cards-container" className="w-full flex-row flex-wrap items-center justify-center gap-4 md:gap-6">
                <StepCard
                    icon="search"
                    step="01"
                    title={t('advantages.advantagesList.step1.title')}
                    description={t('advantages.advantagesList.step1.description')}
                    advantages
                />

                <StepCard
                    icon="chatbubble-outline"
                    step="02"
                    title={t('advantages.advantagesList.step2.title')}
                    description={t('advantages.advantagesList.step2.description')}
                    advantages
                />

                <StepCard
                    icon="calendar-outline"
                    step="03"
                    title={t('advantages.advantagesList.step3.title')}
                    description={t('advantages.advantagesList.step3.description')}
                    advantages
                />

                <StepCard
                    icon="videocam-outline"
                    step="04"
                    title={t('advantages.advantagesList.step4.title')}
                    description={t('advantages.advantagesList.step4.description')}
                    advantages
                />
            </View>
        </View>
    );
}

export default Advantages;