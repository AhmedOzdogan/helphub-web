import { Text, View } from 'react-native';
import StepCard from './ui/StepCard';


function Advantages() {
    return (
        <View className="w-full items-center justify-center bg-white px-16 py-12">
            {/* Title */}
            <Text className="mb-3 text-[28px] font-bold text-slate-800">
                Advantages of Choosing HelpHub
            </Text>

            {/* Steps */}
            <View className="flex-row flex-wrap items-center justify-center gap-6">
                <StepCard
                    icon="search"
                    step="01"
                    title="1-1 Live Consultation"
                    description="Live consultation from the comfort of your home, office, or anywhere you are."
                    advantages
                />

                <StepCard
                    icon="chatbubble-outline"
                    step="02"
                    title="Online Chat"
                    description="Message the expert for free and have a short introductory conversation."
                    advantages
                />

                <StepCard
                    icon="calendar-outline"
                    step="03"
                    title="Secure Payment"
                    description="Make secure payments using your credit card."
                    advantages
                />

                <StepCard
                    icon="videocam-outline"
                    step="04"
                    title="100% Refund Guarantee"
                    description="Get a full refund for any missed appointments."
                    advantages
                />
            </View>
        </View>
    );
}

export default Advantages;