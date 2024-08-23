import { RiHome2Line } from "react-icons/ri";
import { RiFileListLine } from "react-icons/ri";
import { RiBarChart2Line } from "react-icons/ri";
import { RiApps2Line } from "react-icons/ri";
import { RiGitBranchLine } from "react-icons/ri";
import { RiMailStarLine } from "react-icons/ri";
import { LiaInboxSolid } from "react-icons/lia";
import { LiaPollHSolid } from "react-icons/lia";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { LiaCodeBranchSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlinePaintBrush } from "react-icons/hi2";

export const sideNavItems = [
    {
        id: 1,
        name: 'Inbox',
        icon: <LiaInboxSolid size={20} />,
        redirect: '/',
        children: [{
            id: 1,
            name: 'All',
            redirect: '/'
        }, {
            id: 2,
            name: 'Video',
            redirect: '/'
        },
        {
            id: 3,
            name: 'Text',
            redirect: '/'
        },
        {
            id: 4,
            name: 'Archived',
            redirect: '/'
        }],
    },
    {
        id: 2,
        name: 'Testimonial form',
        icon: <LiaPollHSolid size={22} />,
        redirect: '/form'
    },
    {
        id: 3,
        name: 'Wall of love',
        icon: <IoMdHeartEmpty size={22} />,
        redirect: '/testimonial'
    },
    // {
    //     id: 4,
    //     name: 'Studio',
    //     icon: <HiOutlinePaintBrush size={22} />,
    //     redirect: '/studio'
    // },
    // {
    //     id: 5,
    //     name: 'Embeds and widgets',
    //     icon: <RiApps2Line size={22} />,
    //     redirect: '/integrate-apps'
    // },
    // {
    //     id: 6,
    //     name: 'Your Workflows',
    //     icon: <LiaCodeBranchSolid size={22} />,
    //     redirect: '/reports'
    // },
]