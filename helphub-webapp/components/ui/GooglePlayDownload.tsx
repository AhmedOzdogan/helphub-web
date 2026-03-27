import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';

function GooglePlayDownload() {
    return (
        <TouchableOpacity className="flex-row items-center justify-center rounded-[10px] bg-black px-2 py-2">
            <Ionicons name="logo-google-playstore" size={20} color="#ffffff" />
            <View className="ml-3">
                <Text className="text-[8px] uppercase tracking-[1px] text-white/80">
                    Get it on
                </Text>
                <Text className="text-[16px] font-semibold text-white">
                    Google Play
                </Text>
            </View>
        </TouchableOpacity>)
}

export default GooglePlayDownload;