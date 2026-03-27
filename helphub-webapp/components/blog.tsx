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
        <View className="relative h-[120px] w-[45%] md:h-[140px] md:w-[240px] overflow-hidden rounded-xl">
            <Image
                source={image}
                resizeMode="contain"
                className="h-full w-full"
                style={{ borderRadius: 16, backgroundColor: '#000', width: '100%', height: '100%' }}
            />

            {/* Overlay */}
            <View className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <Text className="text-[10px] md:text-[13px] font-semibold text-white">
                    {title}
                </Text>
            </View>
        </View>
    );
}

function Blog() {
    return (
        <View className="w-full flex-col md:flex-row items-center md:items-start justify-center bg-white px-4 md:px-16 py-8 md:py-16 gap-8 md:gap-0">
            {/* LEFT SIDE */}
            <View className="w-full md:mr-16 md:max-w-[300px] items-center md:items-start text-center md:text-left">
                <Text className="mb-2 md:mb-3 text-2xl md:text-[26px] font-bold text-slate-800">
                    Blog
                </Text>

                <Text className="mb-4 md:mb-6 text-sm md:text-[16px] text-gray-600">
                    You can explore blog content from our consultants here.
                </Text>

                <RedButton ButtonText="Explore" />
            </View>

            {/* RIGHT SIDE GRID */}
            <View className="w-full md:w-auto">
                {/* Mobile only: 2 cards per row */}
                <View className="flex-row flex-wrap gap-3 md:hidden justify-center">
                    <BlogCard {...blogs[0]} />
                    <BlogCard {...blogs[1]} />
                    <BlogCard {...blogs[2]} />
                    <BlogCard {...blogs[3]} />
                    <BlogCard {...blogs[4]} />
                    <BlogCard {...blogs[5]} />
                </View>

                {/* Desktop only: 3 cards per row */}
                <View className="hidden md:flex flex-row flex-wrap gap-4 justify-start">
                    <BlogCard {...blogs[0]} />
                    <BlogCard {...blogs[1]} />
                    <BlogCard {...blogs[2]} />
                </View>
                <View className="hidden md:flex flex-row flex-wrap gap-4 justify-start">
                    <BlogCard {...blogs[3]} />
                    <BlogCard {...blogs[4]} />
                    <BlogCard {...blogs[5]} />
                </View>
            </View>
        </View>
    );
}

export default Blog;