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
