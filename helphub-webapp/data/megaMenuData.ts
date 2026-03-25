interface SmallMenuData {
    title: string;
    items: string[];
}

interface MegaMenuData {
    forMyself: SmallMenuData[];
    momsAndKids: SmallMenuData[];
    workRelatedIssues: SmallMenuData[];
    groupTherapies: SmallMenuData[];
}

const megaMenuData: MegaMenuData = {
    forMyself: [
        {
            title: 'Mental Wellbeing',
            items: ['Psychology', 'Family Counseling', 'Sexual Therapy', 'Holistic Therapy', 'Life Coaching'],
        },
        {
            title: 'Physical Wellbeing',
            items: ['Dietitian', 'Sports', 'Style', 'Physiotherapy'],
        },
        {
            title: 'Alternative Practices',
            items: ['Energy Therapy', 'Astrology', 'Numerology', 'NLP', 'Reiki', 'Family Constellation', 'Human Design', 'Mindfulness'],
        },
    ],
    momsAndKids: [
        {
            title: 'Mother Support',
            items: ['Postpartum Support', 'Parenting Guidance', 'Emotional Balance'],
        },
        {
            title: 'Child Support',
            items: ['Child Anxiety', 'School Stress', 'Behavior Support'],
        },
        {
            title: 'Family Support',
            items: ['Parent-Child Communication', 'Routine Planning', 'Family Coaching'],
        },
    ],
    workRelatedIssues: [
        {
            title: 'Career Support',
            items: ['Burnout', 'Career Counseling', 'Leadership Coaching'],
        },
        {
            title: 'Work-Life Balance',
            items: ['Stress Management', 'Time Management', 'Remote Work Balance'],
        },
        {
            title: 'Team & Culture',
            items: ['Conflict Resolution', 'Communication Skills', 'Workplace Motivation'],
        },
    ],
    groupTherapies: [
        {
            title: 'Support Groups',
            items: ['Anxiety Support Group', 'Depression Support Group', 'Mindfulness Group'],
        },
        {
            title: 'Growth Groups',
            items: ['Confidence Building', 'Stress Recovery', 'Relationship Skills'],
        },
        {
            title: 'Workshops',
            items: ['Breathing Workshop', 'Emotional Awareness', 'Guided Reflection'],
        },
    ],
} as const;

export { megaMenuData };
