import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

function Numbers() {
    const { t } = useTranslation();

    return (
        <View testID="numbers-section" className="flex-col w-full items-center justify-center bg-blue-50 px-4 md:px-6 py-8 md:py-16">
            <Text className="mb-8 text-center text-2xl md:text-[35px] font-bold text-slate-800">
                {t('numbers.title')}
            </Text>

            <View testID="numbers-stats-container" className="flex-col md:flex-row md:flex-wrap w-full items-center justify-center bg-blue-50 px-2 md:px-6 py-4 md:py-10">
                <View testID="numbers-stat-active-consultants" className="flex-col items-center justify-center gap-2 border-b-2 md:border-b-2 md:border-r-2 lg:border-b-0 lg:border-r-2 px-4 md:px-7 py-4 md:py-4 lg:py-0 w-full md:w-[45%] lg:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        2000
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        {t('numbers.consultants')}
                    </Text>
                </View>
                <View testID="numbers-stat-completed-sessions" className="flex-col items-center justify-center gap-2 border-b-2 md:border-b-2 lg:border-b-0 px-4 md:px-7 py-4 md:py-4 lg:py-0 w-full md:w-[45%] lg:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        185.452
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        {t('numbers.sessions')}
                    </Text>
                </View>
                <View testID="numbers-stat-satisfied-customers" className="flex-col items-center justify-center gap-2 md:border-r-2 lg:border-b-0 lg:border-r-2 px-4 md:px-7 py-4 md:py-4 lg:py-0 w-full md:w-[45%] lg:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        40.000+
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        {t('numbers.customers')}
                    </Text>
                </View>
                <View testID="numbers-stat-positive-reviews" className="flex-col items-center justify-center gap-2 px-4 md:px-7 py-4 md:py-4 lg:py-0 w-full md:w-[45%] lg:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        7562
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        {t('numbers.reviews')}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Numbers;