import { Text, View } from 'react-native';

function Numbers() {

    return (
        <View className="flex-col w-full items-center justify-center bg-blue-50 px-6 py-16">
            <Text className="mb-1 text-center text-[35px] font-bold text-slate-800">
                Our Impact in Numbers
            </Text>

            <View className="flex-row w-full items-center justify-center bg-blue-50 px-6 py-16">
                <View className="flex-col items-center justify-center gap-2 border-r-2 px-7">
                    <Text className="text-[24px] font-bold text-slate-800">
                        2000
                    </Text>
                    <Text className="text-[24px] text-slate-800">
                        Active Consultants
                    </Text>
                </View>
                <View className="flex-col items-center justify-center gap-2 border-r-2 px-7">
                    <Text className="text-[24px] font-bold text-slate-800">
                        185.452
                    </Text>
                    <Text className="text-[24px] text-slate-800">
                        Completed Sessions
                    </Text>
                </View>
                <View className="flex-col items-center justify-center gap-2 border-r-2 px-7">
                    <Text className="text-[24px] font-bold text-slate-800">
                        40.000+
                    </Text>
                    <Text className="text-[24px] text-slate-800">
                        Satisfied Customers
                    </Text>
                </View>
                <View className="flex-col items-center justify-center gap-2 px-7">
                    <Text className="text-[24px] font-bold text-slate-800">
                        7562
                    </Text>
                    <Text className="text-[24px] text-slate-800">
                        Positive Reviews
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Numbers;