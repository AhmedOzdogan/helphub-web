import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';

function GooglePlayDownload() {
    return (<TouchableOpacity className="flex-row items-center rounded-[10px] bg-black px-5 py-4">
        <Ionicons name="logo-google-playstore" size={24} color="#ffffff" />
        <View className="ml-3">
            <Text className="text-[10px] uppercase tracking-[1px] text-white/80">
                Get it on
            </Text>
            <Text className="text-[18px] font-semibold text-white">
                Google Play
            </Text>
        </View>
    </TouchableOpacity>)
}

export default GooglePlayDownload;