import { Text, View } from 'react-native';

function Numbers() {

    return (
        <View className="flex-col w-full items-center justify-center bg-blue-50 px-4 md:px-6 py-8 md:py-16">
            <Text className="mb-8 text-center text-2xl md:text-[35px] font-bold text-slate-800">
                Our Impact in Numbers
            </Text>

            <View className="flex-col md:flex-row w-full items-center justify-center bg-blue-50 px-4 md:px-6 py-8 md:py-16">
                <View className="flex-col items-center justify-center gap-2 border-b-2 md:border-b-0 md:border-r-2 px-4 md:px-7 py-4 md:py-0 w-full md:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        2000
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        Active Consultants
                    </Text>
                </View>
                <View className="flex-col items-center justify-center gap-2 border-b-2 md:border-b-0 md:border-r-2 px-4 md:px-7 py-4 md:py-0 w-full md:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        185.452
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        Completed Sessions
                    </Text>
                </View>
                <View className="flex-col items-center justify-center gap-2 border-b-2 md:border-b-0 md:border-r-2 px-4 md:px-7 py-4 md:py-0 w-full md:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        40.000+
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        Satisfied Customers
                    </Text>
                </View>
                <View className="flex-col items-center justify-center gap-2 px-4 md:px-7 py-4 md:py-0 w-full md:w-auto">
                    <Text className="text-lg md:text-2xl font-bold text-slate-800">
                        7562
                    </Text>
                    <Text className="text-base md:text-2xl text-slate-800 text-center">
                        Positive Reviews
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Numbers;