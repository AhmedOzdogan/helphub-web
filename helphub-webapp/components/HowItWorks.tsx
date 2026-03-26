import { Text, View } from 'react-native';
import StepCard from './ui/StepCard';

function HowItWorks() {
    return (
        <View className="w-full items-center justify-center bg-white px-16 py-12">
            {/* Title */}
            <Text className="mb-3 text-[28px] font-bold text-slate-800">
                How It Works?
            </Text>

            {/* Subtitle */}
            <Text className="mb-10 max-w-[700px] text-center text-[16px] text-gray-500">
                Our consulting process is simple and effective. Quickly connect with the right expert for your needs and reach a solution.
            </Text>

            {/* Steps */}
            <View className="flex-row flex-wrap items-center justify-center gap-6">
                <StepCard
                    icon="search"
                    step="01"
                    title="Choose an Expert"
                    description="Find the right specialist easily using filters that match your needs."
                />

                <StepCard
                    icon="chatbubble-outline"
                    step="02"
                    title="Free Intro Chat"
                    description="Message the expert for free and have a short introductory conversation."
                />

                <StepCard
                    icon="calendar-outline"
                    step="03"
                    title="Schedule a Session"
                    description="Pick a suitable date and time and plan your online session."
                />

                <StepCard
                    icon="videocam-outline"
                    step="04"
                    title="Start the Session"
                    description="Meet your consultant online at the scheduled time."
                />
            </View>
        </View>
    );
}

export default HowItWorks;