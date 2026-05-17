import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
function Details() {
    const { t, i18n } = useTranslation();
    return (
        <View
            className="w-full items-center justify-center bg-blue-50 px-6 py-16"
            testID="details-main-container">
            <Text className="mb-10 text-center text-[30px] font-bold text-slate-800">
                {t('details.title')}
            </Text>

            <View
                className="max-w-[900px] gap-8"
                testID="details-container"
            >
                <View
                    testID='First Paragraph'>
                    <Text
                        className="mb-2 text-center text-2xl font-semibold text-slate-800"
                    >
                        {t('details.section1.title')}
                    </Text>
                    <Text className="text-center text-sm leading-[30px] text-gray-600">
                        {t('details.section1.description')}
                    </Text>
                </View>

                <View
                    testID='Second Paragraph'>
                    <Text
                        className="mb-2 text-center text-2xl font-semibold text-slate-800"
                    >
                        {t('details.section2.title')}
                    </Text>
                    <Text className="text-center text-sm leading-[30px] text-gray-600">
                        {t('details.section2.description')}
                    </Text>
                </View>

                <View
                    testID='Third Paragraph'>
                    <Text className="mb-2 text-center text-2xl font-semibold text-slate-800">
                        {t('details.section3.title')}
                    </Text>
                    <Text className="text-center text-sm leading-[30px] text-gray-600">
                        {t('details.section3.description')}
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-center text-2xl font-semibold text-slate-800">
                        {t('details.section4.title')}
                    </Text>
                    <Text className="text-center text-sm leading-[30px] text-gray-600">
                        {t('details.section4.description')}
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-center text-2xl font-semibold text-slate-800">
                        {t('details.section5.title')}
                    </Text>
                    <Text className="text-center text-sm leading-[30px] text-gray-600">
                        {t('details.section5.description')}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default Details;
