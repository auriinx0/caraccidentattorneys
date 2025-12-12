import {
    Car,
    PackageX,
    BriefcaseMedical,
    HardHat,
    ShieldAlert,
    Ship,
    Bus,
    Smartphone,
    User,
    Users,
    Brain,
    Pill,
    Syringe,
    FlaskConical,
    Droplets
} from 'lucide-react';
import GridIcon from './components/GridIcon';

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZyFCki8SRj1zCWMLguyxKWI31WZlaoIVVRbZC-snUxYphFeOsN63gaPy4KHXYl8QTCQ/exec";
export const ACCESS_KEY = "bd059ed0-3d31-4877-b768-50ba79857be9";

export const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export const CATEGORY_STRUCT = [
    { id: 'cat-vehicle', icon: Car },
    { id: 'cat-products', icon: PackageX },
    { id: 'cat-injury', icon: BriefcaseMedical },
];

export const AREA_STRUCT = [
    { id: 'car-accidents', categoryId: 'cat-vehicle', icon: Car },
    { id: 'motorcycle', categoryId: 'cat-vehicle', icon: HardHat },
    { id: 'commercial', categoryId: 'cat-vehicle', icon: ShieldAlert },
    { id: 'boating', categoryId: 'cat-vehicle', icon: Ship },
    { id: 'bus', categoryId: 'cat-vehicle', icon: Bus },
    { id: 'rideshare', categoryId: 'cat-vehicle', icon: Smartphone },
    { id: 'pedestrian', categoryId: 'cat-vehicle', icon: User },
    { id: 'passenger', categoryId: 'cat-vehicle', icon: Users },
    { id: 'slip-fall', categoryId: 'cat-injury', icon: BriefcaseMedical },
    { id: 'construction', categoryId: 'cat-injury', icon: HardHat },
    { id: 'brain', categoryId: 'cat-injury', icon: Brain },
    { id: 'mesh', categoryId: 'cat-products', icon: GridIcon },
    { id: 'hair', categoryId: 'cat-products', icon: Droplets },
    { id: 'roundup', categoryId: 'cat-products', icon: FlaskConical },
    { id: 'talc', categoryId: 'cat-products', icon: PackageX },
    { id: 'ozempic', categoryId: 'cat-products', icon: Pill },
    { id: 'truvada', categoryId: 'cat-products', icon: Syringe },
];

export const BLOG_POSTS = [
    {
        title: "Las Vegas Car Rear End Car Accident Attorney",
        date: "November 1, 2022",
        excerpt: "If you or a loved one has been involved in a car accident, you need an experienced law firm on your side. At our Las Vegas law firm, we specialize in helping victims of car accidents get the compensation they deserve.",
        link: "https://www.rearendclaims.com/post/santa-barbara-car-accident-attorney" // Note: The original generic link seemed to point here or similar, adjusting to match source content structure if possible, but using provided links.
    },
    {
        title: "Santa Barbara Car Accident Attorney",
        date: "November 1, 2022",
        excerpt: "Every day, car accidents happen all over the country. While some of these accidents may only result in minor damage to the vehicles involved, others can be far more serious and result in life-changing injuries.",
        link: "https://www.rearendclaims.com/post/santa-barbara-car-accident-attorney"
    },
    {
        title: "Rear End Claims: I've Been in an Auto Accident. What do I do?",
        date: "November 1, 2022",
        excerpt: "Our team of auto accident attorneys is here to help you get through this difficult time.",
        link: "https://www.rearendclaims.com/post/rear-end-claims-ive-been-in-an-auto-accident-what-do-i-do"
    },
    {
        title: "Uber and Lyft Car Accident. What should I do?",
        date: "November 1, 2022",
        excerpt: "If you have been involved in an Uber or Lyft accident, it is important to understand your rights and options for getting compensated.",
        link: "https://www.rearendclaims.com/post/uber-and-lyft-car-accident-what-should-i-do"
    },
    {
        title: "Should I hire an attorney after a car accident?",
        date: "November 1, 2022",
        excerpt: "Yes! The longer a victim waits to hire a lawyer the less effective a case can be.",
        link: "https://www.rearendclaims.com/post/should-i-hire-an-attorney-after-a-car-accident"
    },
    {
        title: "사고시 내가  엠블런스를 타고 안타고 의 차이점…",
        date: "November 1, 2022",
        excerpt: "먼저 교통사고가 큰 경우 엔  부상이 심하면  말할것 없이 앰블런스로 응급실로 가는게 당연하지만, 다행이도 사고 충격에 의해 아프긴 한데 참을만 하다면 어떻게 하는게 좋을 까?",
        link: "https://www.rearendclaims.com/post/6-amazing-email-templates-you-can-use-in-2022-for-free"
    },
    {
        title: "Benefits of Hiring a Lawyer After a Car Accident",
        date: "November 1, 2022",
        excerpt: "If you've been involved in a car accident, hiring a lawyer may be the last thing on your mind. You may be dealing with injuries, vehicle damage, and a host of other issues that require your immediate attention.",
        link: "https://www.rearendclaims.com/post/benefits-of-hiring-a-lawyer-after-a-car-accident"
    }
];
