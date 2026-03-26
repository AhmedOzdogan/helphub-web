import { Image, Text, View } from 'react-native';
import blog1 from '../assets/blog/blog1.webp';
import blog2 from '../assets/blog/blog2.webp';
import blog3 from '../assets/blog/blog3.webp';
import blog4 from '../assets/blog/blog4.webp';
import blog5 from '../assets/blog/blog5.webp';
import blog6 from '../assets/blog/blog6.webp';

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
        <View className="relative h-[140px] w-[240px] overflow-hidden rounded-xl">
            <Image
                source={image}
                resizeMode="contain"
                className="h-full w-full"
                style={{ borderRadius: 16, height: 170, width: 240 }}
            />

            {/* Overlay */}
            <View className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                <Text className="text-[13px] font-semibold text-white">
                    {title}
                </Text>
            </View>
        </View>
    );
}

function Blog() {
    return (
        <View className="w-full flex-row items-center justify-center bg-white px-16 py-16">
            {/* LEFT SIDE */}
            <View className="mr-16 max-w-[300px]">
                <Text className="mb-3 text-[26px] font-bold text-slate-800">
                    Blog
                </Text>

                <Text className="mb-6 text-[16px] text-gray-600">
                    You can explore blog content from our consultants here.
                </Text>

                <View className="rounded-full bg-red-500 px-5 py-2 self-start">
                    <Text className="text-[14px] font-semibold text-white">
                        View All
                    </Text>
                </View>
            </View>

            {/* RIGHT SIDE GRID */}
            <View className="gap-4">
                <View className="flex-row gap-4">
                    <BlogCard {...blogs[0]} />
                    <BlogCard {...blogs[1]} />
                    <BlogCard {...blogs[2]} />
                </View>

                <View className="flex-row gap-4">
                    <BlogCard {...blogs[3]} />
                    <BlogCard {...blogs[4]} />
                    <BlogCard {...blogs[5]} />
                </View>
            </View>
        </View>
    );
}

export default Blog;