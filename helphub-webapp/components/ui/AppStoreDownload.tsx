import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

function AppStoreDownload() {
    const { t, i18n } = useTranslation();

    return (<TouchableOpacity className="flex-row items-center rounded-[10px] bg-black px-2 py-2">
        <Ionicons name="logo-apple" size={20} color="#ffffff" />
        <View className="ml-3">
            <Text className="text-[8px] uppercase tracking-[1px] text-white/80">
                {t('downloadButtons.appStore.text1')}
            </Text>
            <Text className="text-[16px] font-semibold text-white">
                {t('downloadButtons.appStore.text2')}
            </Text>
        </View>
    </TouchableOpacity>)
}

export default AppStoreDownload;