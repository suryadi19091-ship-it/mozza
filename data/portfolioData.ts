import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
    name: "Mozza Bunga Tarmuji",
    headline: "Full Stack Developer & AI Enthusiast",
    summary: "Passionate developer with a focus on building scalable web applications and integrating AI solutions.",
    profileImage: "profile.jpeg",
    contact: {
        email: "mozza@example.com",
        phone: "+62 812 3456 7890",
        linkedin: "linkedin.com/in/mozza",
        location: "Indonesia"
    },
    education: [
        {
            institution: "University of Technology",
            major: "Computer Science",
            period: "2018 - 2022",
            details: [
                "Focus on Software Engineering",
                "GPA: 3.8/4.0"
            ]
        }
    ],
    experience: [
        {
            role: "Frontend Developer",
            company: "Tech Solutions Inc.",
            period: "2022 - Present",
            location: "Jakarta, Indonesia",
            type: "Full-time",
            achievements: [
                "Developed responsive web applications using React and TypeScript",
                "Improved site performance by 40%"
            ]
        }
    ],
    skills: [
        {
            category: "Frontend",
            items: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
        },
        {
            category: "Backend",
            items: ["Node.js", "Express", "PostgreSQL"]
        },
        {
            category: "Tools",
            items: ["Git", "Docker", "VS Code"]
        }
    ],
    certifications: [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2023",
            details: "Foundational cloud computing knowledge"
        }
    ],
    projects: [
        {
            title: "Portfolio Website",
            description: "My personal portfolio website built with React and Framer Motion.",
            year: "2024",
            stack: ["React", "TypeScript", "Vite", "Tailwind"],
            impact: "Showcased projects to potential clients"
        }
    ]
};
