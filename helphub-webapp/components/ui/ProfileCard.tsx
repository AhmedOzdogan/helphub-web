import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useRef } from 'react';
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
    'Yaşam ve Bütünsel Sağlık Koçu',
];

function pickRandomItems<T>(items: T[], count: number) {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function formatPrice(value: number) {
    return `${value.toLocaleString('tr-TR')},00 TL`;
}

function ProfileCard({
    man,
    new: isNew,
    online: isOnliner,
    compact = false,
    cardWidth,
}: {
    man: boolean;
    new?: boolean;
    online?: boolean;
    compact?: boolean;
    cardWidth?: number;
}) {
    const handlePress = (name: string, title: string, price: number, image: string) => {
        router.push({
            pathname: '/appointment' as any,
            params: {
                name: encodeURIComponent(name),
                title: encodeURIComponent(title),
                price: String(price),
                image: encodeURIComponent(image),
            },
        });
    };

    const manImages = [man1, man2, man3, man4, man5];
    const womanImages = [woman1, woman2, woman3, woman4, woman5];

    const profileSeedRef = useRef<{
        image: any;
        imageKey: string;
        name: string;
        title: string;
        reviewCount: number;
        moreCount: number;
        tags: string[];
        oldPrice: number;
        newPrice: number;
        isOnline: boolean;
    } | null>(null);

    if (!profileSeedRef.current) {
        const selectedImage = man
            ? manImages[Math.floor(Math.random() * manImages.length)]
            : womanImages[Math.floor(Math.random() * womanImages.length)];

        const selectedImageIndex = man
            ? manImages.findIndex((image) => image === selectedImage)
            : womanImages.findIndex((image) => image === selectedImage);

        const selectedImageKey = `${man ? 'man' : 'woman'}-${selectedImageIndex}`;

        const selectedName = man
            ? manNames[Math.floor(Math.random() * manNames.length)]
            : womanNames[Math.floor(Math.random() * womanNames.length)];

        const selectedTitle = titles[Math.floor(Math.random() * titles.length)];
        const selectedReviewCount = Math.floor(Math.random() * 250) + 1;
        const selectedMoreCount = Math.floor(Math.random() * 90) + 5;
        const selectedTags = pickRandomItems(specialties, 3);
        const selectedOldPrice = (Math.floor(Math.random() * 20) + 20) * 100;
        const selectedNewPrice = selectedOldPrice - (Math.floor(Math.random() * 8) + 4) * 100;

        profileSeedRef.current = {
            image: selectedImage,
            imageKey: selectedImageKey,
            name: selectedName,
            title: selectedTitle,
            reviewCount: selectedReviewCount,
            moreCount: selectedMoreCount,
            tags: selectedTags,
            oldPrice: selectedOldPrice,
            newPrice: selectedNewPrice,
            isOnline: isOnliner ?? Math.random() > 0.5,
        };
    }

    const randomImage = profileSeedRef.current.image;
    const randomImageKey = profileSeedRef.current.imageKey;
    const randomName = profileSeedRef.current.name;
    const randomTitle = profileSeedRef.current.title;
    const randomReviewCount = profileSeedRef.current.reviewCount;
    const randomMoreCount = profileSeedRef.current.moreCount;
    const randomTags = profileSeedRef.current.tags;
    const oldPrice = profileSeedRef.current.oldPrice;
    const newPrice = profileSeedRef.current.newPrice;
    const isOnline = profileSeedRef.current.isOnline;

    const width = cardWidth ?? 300;
    const imageSize = compact ? 128 : 140;
    const imageBorderRadius = compact ? 20 : 24;
    const cardPaddingX = compact ? 12 : 14;
    const cardPaddingY = compact ? 12 : 14;
    const nameSize = compact ? 17 : 18;
    const titleMaxWidth = Math.max(width - 60, 180);
    const tagTextSize = compact ? 10 : 12;
    const buttonTextSize = compact ? 10 : 12;

    return (
        <View
            style={{ width }}
            className="rounded-[30px] border border-gray-200 bg-[#f8f8f7] cursor-pointer"
        >
            <View
                className="rounded-[30px]"
                style={{ paddingHorizontal: cardPaddingX, paddingVertical: cardPaddingY }}
            >
                <View className="items-end">
                    <Text className={`font-medium text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
                        Sponsored
                    </Text>
                </View>

                <View className={`${compact ? 'mt-4' : 'mt-6'} items-center`}>
                    <View className="relative">
                        <View
                            className={`overflow-hidden ${isOnline ? 'border-[6px] border-green-500' : 'border-[6px] border-gray-300'}`}
                            style={{ borderRadius: imageBorderRadius }}
                        >
                            <Image
                                source={randomImage}
                                resizeMode="cover"
                                style={{ width: imageSize, height: imageSize }}
                            />
                        </View>

                        {isOnline ? (
                            <View className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1">
                                <Text className="text-xs font-semibold text-white">Online</Text>
                            </View>
                        ) : null}
                    </View>
                </View>

                <View className={`${compact ? 'mt-4' : 'mt-6'} items-center`}>
                    <Text
                        numberOfLines={1}
                        className="text-center font-bold text-slate-800"
                        style={{ fontSize: nameSize, maxWidth: width - 48 }}
                    >
                        {randomName}
                    </Text>

                    <Text
                        numberOfLines={1}
                        className="mt-1 text-center font-medium text-gray-400"
                        style={{ maxWidth: titleMaxWidth, fontSize: compact ? 13 : 14 }}
                    >
                        {randomTitle}
                    </Text>

                    <View className="mt-3 flex-row items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                            <Ionicons key={index} name="star" size={12} color="#eab308" />
                        ))}
                        <Text className="ml-1 text-sm font-medium text-gray-500">
                            ({randomReviewCount})
                        </Text>
                    </View>
                </View>

                <View className={`${compact ? 'mt-3 gap-2' : 'mt-3 gap-3'} items-center`}>
                    <View className="max-w-full rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                        <Text numberOfLines={1} className="font-medium text-slate-700" style={{ fontSize: tagTextSize }}>
                            {randomTags[0]}
                        </Text>
                    </View>

                    <View className="w-full flex-row items-center justify-center gap-2">
                        <View className="max-w-[48%] rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                            <Text numberOfLines={1} className="font-medium text-slate-700" style={{ fontSize: tagTextSize }}>
                                {randomTags[1]}
                            </Text>
                        </View>

                        <View className="max-w-[48%] rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                            <Text numberOfLines={1} className="font-medium text-slate-700" style={{ fontSize: tagTextSize }}>
                                {randomTags[2]}
                            </Text>
                        </View>
                    </View>

                    <View className="rounded-[16px] bg-[#e5e7eb] px-2 py-1">
                        <Text className="font-semibold text-red-500" style={{ fontSize: tagTextSize }}>
                            + {randomMoreCount} more
                        </Text>
                    </View>
                </View>

                <View className={`${compact ? 'mt-3' : 'mt-4'} flex-row items-end justify-between gap-3`}>
                    <View className="flex-1 flex-col items-start justify-center gap-2">
                        {isNew ? (
                            <View className="flex-row items-center gap-2 rounded-full bg-blue-500 px-3 py-2">
                                <Ionicons name="sparkles" size={14} color="#ffffff" />
                                <Text className="text-xs font-semibold text-white">New Consultant</Text>
                            </View>
                        ) : null}

                        <View className="flex-row items-center gap-2 rounded-full bg-green-100 px-3 py-2">
                            <Ionicons name="hand-left-outline" size={14} color="#22c55e" />
                            <Text className="text-xs font-medium text-green-500">Free Intro Call</Text>
                        </View>
                    </View>

                    <View className="items-end justify-center">
                        <Text className="text-xs font-medium text-gray-300 line-through" numberOfLines={1}>
                            {formatPrice(oldPrice)}
                        </Text>
                        <Text className="mt-1 font-bold text-green-500" style={{ fontSize: compact ? 11 : 12 }} numberOfLines={1}>
                            {formatPrice(newPrice)}
                        </Text>
                    </View>
                </View>

                <View className="mt-3 flex-row">
                    <Pressable
                        className="flex-1 items-center rounded-[20px] bg-[#355584] py-3"
                        onPress={() => handlePress(randomName, randomTitle, newPrice, randomImageKey)}
                    >
                        <Text className="font-semibold text-white" style={{ fontSize: buttonTextSize }}>
                            Book Session
                        </Text>
                    </Pressable>
                    {isOnline ? (
                        <Pressable
                            className="ml-2 flex-1 items-center rounded-[20px] bg-green-500 py-3"
                            onPress={() => handlePress(randomName, randomTitle, newPrice, randomImageKey)}
                        >
                            <Text className="font-semibold text-white" style={{ fontSize: buttonTextSize }}>
                                Start Now
                            </Text>
                        </Pressable>
                    ) : null}
                </View>
            </View>
        </View>
    );
}

export default ProfileCard;