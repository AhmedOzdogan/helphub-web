import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import StepCard from './ui/StepCard';

function HowItWorks() {
    const { t } = useTranslation();
    return (
        <View
            className="w-full items-center justify-center bg-white px-4 md:px-16 py-8 md:py-12"
            testID="steps-container"
        >
            {/* Title */}
            <Text className="mb-2 md:mb-3 text-xl md:text-2xl font-bold text-slate-800 text-center">
                {t('howItWorks.title')}
            </Text>

            {/* Subtitle */}
            <Text className="mb-8 md:mb-10 max-w-[700px] text-center text-base md:text-lg text-gray-500 px-2">
                {t('howItWorks.subtitle')}
            </Text>

            {/* Steps */}
            <View
                className="w-full flex-row flex-wrap items-center justify-center gap-4 md:gap-6"
                testID="steps-cards-container"
            >
                <StepCard
                    icon="search"
                    step="01"
                    title={t('howItWorks.step1.title')}
                    description={t('howItWorks.step1.description')}
                />

                <StepCard
                    icon="chatbubble-outline"
                    step="02"
                    title={t('howItWorks.step2.title')}
                    description={t('howItWorks.step2.description')}
                />

                <StepCard
                    icon="calendar-outline"
                    step="03"
                    title={t('howItWorks.step3.title')}
                    description={t('howItWorks.step3.description')}
                />

                <StepCard
                    icon="videocam-outline"
                    step="04"
                    title={t('howItWorks.step4.title')}
                    description={t('howItWorks.step4.description')}
                />
            </View>
        </View>
    );
}

export default HowItWorks;