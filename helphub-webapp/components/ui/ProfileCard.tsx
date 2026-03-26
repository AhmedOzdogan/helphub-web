import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, Text, View } from 'react-native';
import { manNames, womanNames } from '../../data/names';

import man1 from '../../assets/profile/man1.webp';
import man2 from '../../assets/profile/man2.webp';
import man3 from '../../assets/profile/man3.webp';
import man4 from '../../assets/profile/man4.webp';
import man5 from '../../assets/profile/man5.webp';

import woman1 from '../../assets/profile/woman1.webp';
import woman2 from '../../assets/profile/woman2.webp';
import woman3 from '../../assets/profile/woman3.webp';
import woman4 from '../../assets/profile/woman4.webp';
import woman5 from '../../assets/profile/woman5.webp';

const specialties = [
    'Attachment Issues',
    'Low Self-Esteem',
    'Anxiety Disorders',
    'Exam Anxiety',
    'Family Counseling',
    'Relationship Issues',
    'Stress Management',
    'Child Development',
    'Burnout',
    'Communication Issues',
];

const titles = [
    'Psychologist - Family and Couples Counselor',
    'Psychological Counselor',
    'Clinical Psychologist',
    'Family Counselor',
    'Holistic Health Coach',
];

function pickRandomItems<T>(items: T[], count: number) {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function formatPrice(value: number) {
    return `${value.toLocaleString('tr-TR')},00 TL`;
}

function ProfileCard({ man, new: isNew, online: isOnliner }: { man: boolean; new?: boolean, online?: boolean }) {
    const manImages = [man1, man2, man3, man4, man5];
    const womanImages = [woman1, woman2, woman3, woman4, woman5];

    const randomImage = man
        ? manImages[Math.floor(Math.random() * manImages.length)]
        : womanImages[Math.floor(Math.random() * womanImages.length)];

    const randomName = man
        ? manNames[Math.floor(Math.random() * manNames.length)]
        : womanNames[Math.floor(Math.random() * womanNames.length)];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomReviewCount = Math.floor(Math.random() * 250) + 1;
    const randomMoreCount = Math.floor(Math.random() * 90) + 5;
    const randomTags = pickRandomItems(specialties, 3);
    const oldPrice = (Math.floor(Math.random() * 20) + 20) * 100;
    const newPrice = oldPrice - (Math.floor(Math.random() * 8) + 4) * 100;
    const isOnline = isOnliner ?? Math.random() > 0.5;

    return (
        <View className="mr-4 w-[300px] rounded-[20px] border border-gray-200 bg-[#f8f8f7] px-3 pb-3 pt-3 shadow-sm">
            <View className="items-end">
                <Text className="text-[14px] font-medium text-gray-500">Sponsored</Text>
            </View>

            <View className="mt-6 items-center">
                <View className="relative">
                    <View className={`overflow-hidden rounded-[24px] ${isOnline ? 'border-[6px] border-green-500' : 'border-[6px] border-gray-300'}`}>
                        <Image
                            source={randomImage}
                            resizeMode="cover"
                            className="h-[140px] w-[140px] rounded-[16px]"
                        />
                    </View>

                    {isOnline ? (
                        <View className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1">
                            <Text className="text-[10px] font-semibold text-white">Online</Text>
                        </View>
                    ) : null}
                </View>
            </View>

            <View className="mt-6 items-center">
                <Text className="text-center text-[18px] font-bold text-slate-800">
                    {randomName}
                </Text>

                <Text
                    numberOfLines={1}
                    className="mt-1 max-w-[240px] text-center text-[14px] font-medium text-gray-400"
                >
                    {randomTitle}
                </Text>

                <View className="mt-3 flex-row items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                        <Ionicons key={index} name="star" size={12} color="#eab308" />
                    ))}
                    <Text className="ml-1 text-[14px] font-medium text-gray-500">
                        ({randomReviewCount})
                    </Text>
                </View>
            </View>

            <View className="mt-3 items-center gap-3">
                <View className="rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                    <Text className="text-[12px] font-medium text-slate-700">{randomTags[0]}</Text>
                </View>

                <View className="flex-row items-center justify-center gap-2">
                    <View className="rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                        <Text className="text-[12px] font-medium text-slate-700">{randomTags[1]}</Text>
                    </View>

                    <View className="rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                        <Text className="text-[12px] font-medium text-slate-700">{randomTags[2]}</Text>
                    </View>
                </View>

                <View className="rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                    <Text className="text-[12px] font-semibold text-red-500">+ {randomMoreCount} more</Text>
                </View>
            </View>



            <View className="mt-3 flex-row items-center justify-between gap-4">
                <View className="flex-col items-start justify-center gap-2">
                    {isNew ? (
                        <View className="flex-row items-center gap-2 rounded-full bg-blue-500 px-4 py-2">
                            <Ionicons name="sparkles" size={14} color="#ffffff" />
                            <Text className="text-[10px] font-semibold text-white">New Consultant</Text>
                        </View>
                    ) : null}

                    <View className="flex-row items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                        <Ionicons name="hand-left-outline" size={14} color="#22c55e" />
                        <Text className="text-[10px] font-medium text-green-500">Free Intro Call</Text>
                    </View>
                </View>
                <View className="items-center justify-center">
                    <Text className="text-[10px] font-medium text-gray-300 line-through">
                        {formatPrice(oldPrice)}
                    </Text>
                    <Text className="mt-1 text-[12px] font-bold text-green-500">
                        {formatPrice(newPrice)}
                    </Text>
                </View>
            </View>

            <View className="mt-2 flex-row">
                <Pressable className="flex-1 items-center rounded-[20px] bg-[#355584] py-2">
                    <Text className="text-[14px] font-semibold text-white">Book Session</Text>
                </Pressable>
                {isOnline ? (
                    <Pressable className="ml-2 flex-1 items-center rounded-[20px] bg-green-500 py-2">
                        <Text className="text-[14px] font-semibold text-white">Start Now</Text>
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

export default ProfileCard;