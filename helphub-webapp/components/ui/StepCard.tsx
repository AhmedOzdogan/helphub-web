import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

function StepCard({
    icon,
    title,
    description,
    step,
    advantages = false,
}: {
    icon: any;
    title: string;
    description: string;
    step: string;
    advantages?: boolean;
}) {
    return (
        <View className={`relative w-[300px] h-[200px] rounded-[20px] bg-white p-6 shadow ${advantages ? 'items-center justify-center text-center' : 'items-start justify-start'}`}>
            {/* Step number */}
            {advantages ? null : (
                <Text className="absolute right-6 top-6 text-xl font-bold text-gray-200">
                    {step}
                </Text>
            )}

            {/* Icon */}
            <View className={`mb-4 h-14 w-14 items-center justify-center rounded-full ${advantages ? 'bg-red-500' : 'bg-red-50'}`}>
                <Ionicons name={icon} size={22} color={advantages ? '#ffffff' : '#ef4444'} />
            </View>

            {/* Title */}
            <Text className="mb-2 text-base font-semibold text-slate-800">
                {title}
            </Text>

            {/* Description */}
            <Text className={`text-sm ${advantages ? 'text-center' : 'text-left'} text-gray-500`}>
                {description}
            </Text>
        </View>
    );
}

export default StepCard;