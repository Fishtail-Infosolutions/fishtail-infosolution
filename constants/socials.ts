import { FaFacebook, FaLinkedin, FaX, FaInstagram } from 'react-icons/fa6';

export const Socials = [
    {
        name: "Facebook",
        icon: FaFacebook,
        href: "https://www.facebook.com/fishtailinfosolutions",
        hoverColor: "hover:text-[#1877F2]", // Facebook blue
        groupHoverColor: "group-hover:text-[#1877F2]",
        darkGroupHoverColor: "dark:group-hover:text-[#1877F2]",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "https://www.linkedin.com/company/fishtailinfosolutions/posts/?feedView=all",
        hoverColor: "hover:text-[#0e76a8]", // LinkedIn blue
        groupHoverColor: "group-hover:text-[#0e76a8]",
        darkGroupHoverColor: "dark:group-hover:text-[#0e76a8]",
    },
    {
        name: "X", // Updated for Twitter as X symbol
        icon: FaX,
        href: "https://twitter.com/fishtailinfo",
        hoverColor: "hover:text-[#1DA1F2]", // Twitter blue
        groupHoverColor: "group-hover:text-[#1DA1F2]",
        darkGroupHoverColor: "dark:group-hover:text-[#1DA1F2]",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        href: "https://www.instagram.com/fishtailinfosolutions/",
        hoverColor: "hover:text-red-500", // Red color for Instagram
        groupHoverColor: "group-hover:text-red-500",
        darkGroupHoverColor: "dark:group-hover:text-red-500",
    },
];
