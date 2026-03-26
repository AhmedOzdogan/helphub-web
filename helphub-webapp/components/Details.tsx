import { Text, View } from 'react-native';

function Details() {
    return (
        <View className="w-full items-center justify-center bg-blue-50 px-6 py-16">
            <Text className="mb-10 text-center text-[30px] font-bold text-slate-800">
                What is HelpHub?
            </Text>

            <View className="max-w-[900px] gap-8">
                <View>
                    <Text className="mb-2 text-center text-[30px] font-semibold text-slate-800">
                        Online Counseling and Support Services at HelpHub
                    </Text>
                    <Text className="text-center text-[14px] leading-[30px] text-gray-600">
                        HelpHub provides a wide range of online counseling services for individuals seeking professional support. With services such as online therapy, family counseling, and emotional guidance, you can find solutions tailored to your mental and emotional needs. No matter how busy your schedule is, you can connect with expert consultants from the comfort of your home.
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-center text-[30px] font-semibold text-slate-800">
                        Simplify Your Life with Online Support
                    </Text>
                    <Text className="text-center text-[14px] leading-[30px] text-gray-600">
                        HelpHub is designed to make your life easier by connecting you with professionals in various fields. Whether you need psychological support, lifestyle guidance, or personal development, you can easily find the right expert and receive personalized assistance.
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-center text-[30px] font-semibold text-slate-800">
                        Benefits of Online Counseling
                    </Text>
                    <Text className="text-center text-[14px] leading-[30px] text-gray-600">
                        One of the biggest advantages of online counseling is the ability to receive support anytime and anywhere. You don’t need to travel—simply connect from your home or any location. This is especially helpful for busy individuals or those with limited access to local services. Online sessions also ensure privacy and comfort, allowing you to feel more secure and focused.
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-center text-[30px] font-semibold text-slate-800">
                        Professional Support You Can Trust
                    </Text>
                    <Text className="text-center text-[14px] leading-[30px] text-gray-600">
                        HelpHub connects you with experienced professionals who provide guidance for a variety of needs. From mental health support to personal growth, our experts help you navigate challenges and improve your well-being with confidence.
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-center text-[30px] font-semibold text-slate-800">
                        Personalized Solutions for Everyone
                    </Text>
                    <Text className="text-center text-[14px] leading-[30px] text-gray-600">
                        Our services are designed to offer personalized solutions that fit your unique needs. Whether for yourself or your loved ones, HelpHub makes it easy to access reliable, professional support and take steps toward a healthier, happier life.
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default Details;
