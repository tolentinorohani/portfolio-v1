import * as TechIcons from '@/components/icons/index';

export type Category = 'web' | 'mobile' | 'ui' | '3d' | 'graphic'
export type Projects = {
    category: Category;
    image: string;
    title: string;
    description: string;
    techStack: React.ElementType[];
    liveLink?: string;
    codeLink?: string;
}

export const projectsData: Projects[] = [
    {
        category: 'web',
        image: "/project-images/mr-cluckers.png",
        title: "Mr. Cluckers",
        description: "Meet Mr. Cluckers. Tell him your age and he'll make a remark about you.",
        techStack: [TechIcons.HTMLIcon, TechIcons.CSSIcon, TechIcons.JsIcon, TechIcons.TailwindIcon]
    },
    {
        category: 'web',
        image: "/project-images/undertale-tribute.png",
        title: "Undertale Tribute",
        description: "A tribute dedicated to an indie game title 'Undertale' by Toby Fox.",
        techStack: [TechIcons.HTMLIcon, TechIcons.CSSIcon, TechIcons.JsIcon, TechIcons.TailwindIcon]
    },
    {
        category: 'ui',
        image: "/project-images/start-screen-concept.png",
        title: "Start Screen Concept",
        description: "Minimalist interface for fantasy-themed adventure game design.",
        techStack: [TechIcons.FigmaIcon]
    },
    {
        category: 'ui',
        image: "/project-images/redesign-shopee.png",
        title: "Shopee Homepage Redesign",
        description: "A modern redesign of Shopee's homepage focused on simpler and cleaner layouts.",
        techStack: [TechIcons.FigmaIcon]
    },
    {
        category: 'ui',
        image: "/project-images/bytech-login.png",
        title: "ByTech Login",
        description: "A modern mobile login interface focused on simplicity, accessibility, and smooth user experience.",
        techStack: [TechIcons.FigmaIcon]
    },
    {
        category: '3d',
        image: "/project-images/atmospheric-environment.jpg",
        title: "Atmospheric Environment",
        description: "A moody 3D environment focused on volumetric lighting and atmospheric depth.",
        techStack: [TechIcons.BlenderIcon]
    },
    {
        category: '3d',
        image: "/project-images/coffee-table.png",
        title: "Coffee Table",
        description: "3D product visualization focused on modern furniture design.",
        techStack: [TechIcons.BlenderIcon]
    },
    {
        category: '3d',
        image: "/project-images/modern-interior.png",
        title: "Modern Interior",
        description: "Interior design concept showcasing balanced lighting and furniture composition.",
        techStack: [TechIcons.BlenderIcon]
    },
    {
        category: 'mobile',
        image: "/project-images/memory-exe.png",
        title: "Memory.exe",
        description: "A simple programming-themed memory match-up mobile game. It comes with three game modes and three difficulties.",
        techStack: [TechIcons.AndroidStudioIcon, TechIcons.JavaIcon]
    },
    {
        category: 'mobile',
        image: "/project-images/alloc.png",
        title: "Alloc",
        description: "A mobile-based E-money application that enables you to allocate incoming funds to different wallets automatically.",
        techStack: [TechIcons.AndroidStudioIcon, TechIcons.JavaIcon]
    },
    {
        category: 'graphic',
        image: "/project-images/poster-pacific-rim.png",
        title: "Pacific Rim: Uprising",
        description: "Bold monochrome composition blending typography and illustration.",
        techStack: [TechIcons.IllustratorIcon]
    },
    {
        category: 'graphic',
        image: "/project-images/poster-cinderella.png",
        title: "Cinderella Redesign",
        description: "Fantasy-themed artwork designed with silhouette composition and enchanting visual contrast.",
        techStack: [TechIcons.IllustratorIcon]
    },
    {
        category: 'graphic',
        image: "/project-images/poster-kill-bill.png",
        title: "Kill Bill Redesign",
        description: "Minimal silhouette artwork exploring shadow and contrast.",
        techStack: [TechIcons.IllustratorIcon]
    },
    {
        category: 'graphic',
        image: "/project-images/poster-the-edge-of-sleep.png",
        title: "The Edge of Sleep Redesign",
        description: "Minimalist graphic piece using strong contrast and bold red tones to create atmosphere.",
        techStack: [TechIcons.IllustratorIcon]
    },
]
