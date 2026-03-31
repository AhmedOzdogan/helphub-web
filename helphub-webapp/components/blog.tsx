import { Image, Text, View } from 'react-native';
import blog1 from '../assets/blog/blog1.webp';
import blog2 from '../assets/blog/blog2.webp';
import blog3 from '../assets/blog/blog3.webp';
import blog4 from '../assets/blog/blog4.webp';
import blog5 from '../assets/blog/blog5.webp';
import blog6 from '../assets/blog/blog6.webp';
import RedButton from './ui/RedButton';

const blogs = [
    { image: blog1, title: 'Mental Fatigue Even When Doing Nothing' },
    { image: blog2, title: 'Trauma and Growth After Trauma' },
    { image: blog3, title: 'Trust, Connection and Rebuilding' },
    { image: blog4, title: 'Being a Consultant in AI Search' },
    { image: blog5, title: 'Where Did We Lose Ourselves?' },
    { image: blog6, title: 'Being Present vs Truly Being There' },
];

function BlogCard({ image, title }: { image: any; title: string }) {
    return (
        <View className="relative mb-4 h-[120px] w-[47%] overflow-hidden rounded-xl sm:w-[48%] md:h-[140px] md:w-[47%] lg:mb-5 lg:w-[240px]">
            <Image
                source={image}
                resizeMode="contain"
                className="h-full w-full"
                style={{ borderRadius: 16, backgroundColor: '#000', width: '100%', height: '100%' }}
            />

            {/* Overlay */}
            <View className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <Text className="text-xs md:text-sm font-semibold text-white">
                    {title}
                </Text>
            </View>
        </View>
    );
}

function Blog() {
    return (
        <View className="w-full flex-col flex-wrap items-center justify-center bg-white px-4 py-8 md:px-8 md:py-12 lg:flex-row lg:items-start lg:px-16 lg:py-16 lg:gap-0">
            {/* LEFT SIDE */}
            <View className="mb-8 w-full justify-center items-center md:max-w-[600px] lg:mr-16 lg:mb-5 lg:max-w-[300px] lg:items-start">
                <Text className="mb-2 text-xl font-bold text-slate-800 md:mb-3 md:text-2xl">
                    Blog
                </Text>

                <Text className="mb-6 max-w-[520px] text-center text-sm text-gray-600 md:text-base lg:text-left">
                    You can explore blog content from our consultants here.
                </Text>

                <View className="mt-2 md:mt-4">
                    <RedButton ButtonText="Explore" />
                </View>
            </View>

            {/* RIGHT SIDE GRID */}
            <View className="w-full max-w-[770px]">
                <View className="flex-row flex-wrap justify-center gap-3 md:gap-4">
                    <BlogCard {...blogs[0]} />
                    <BlogCard {...blogs[1]} />
                    <BlogCard {...blogs[2]} />
                    <BlogCard {...blogs[3]} />
                    <BlogCard {...blogs[4]} />
                    <BlogCard {...blogs[5]} />
                </View>
            </View>
        </View>
    );
}

export default Blog;