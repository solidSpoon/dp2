import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import {
    HiOutlineAcademicCap,
    HiOutlineCog,
    HiOutlineHome,
    HiOutlineUser,
    HiOutlineVideoCamera,
} from 'react-icons/hi';
import React, { cloneElement, ReactElement } from 'react';
import { cn } from '@/common/utils/Util';
// import logoLight from '../../../assets/logo-light.png';
import useFile from '../hooks/useFile';

export interface SideBarProps {
    compact?: boolean;
}
const SideBar = ({ compact }: SideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const video = useFile((s) => s.currentVideo);
    const item = (
        text: string,
        path: string,
        key: string,
        icon: ReactElement
    ) => {
        return (
            <div
                onMouseDown={() => navigate(path)}
                className={cn(
                    'w-full px-2 flex justify-start items-center gap-2 rounded-xl h-10',
                    location.pathname.includes(key)
                        ? 'bg-white/80 drop-shadow'
                        : 'hover:bg-black/10',
                    compact && 'justify-center'
                )}
            >
                {cloneElement(icon, {
                    className: cn('w-5 h-5 text-amber-700 flex-shrink-0'),
                })}
                {!compact && (
                    <div className={cn('text-base  truncate w-0 flex-1')}>
                        {text}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={cn('w-full h-full flex flex-col text-black ')}>
            <div
                className={cn(
                    'flex-1 flex items-center justify-center min-h-fit py-10'
                )}
            >
                <img
                    className={cn(
                        'w-24 h-24 user-drag-none',
                        compact && 'w-14 h-14'
                    )}
                    // src={logoLight}
                />
            </div>
            <div className={cn('basis-3/4 flex flex-col p-3 gap-1')}>
                {/* {item('Home', '/home', 'home', <HiOutlineHome />)} */}
                {item(
                    'Player',
                    `/player/${video?.id}?sideBarAnimation=false`,
                    'player',
                    <HiOutlineVideoCamera />
                )}
                {item(
                    'Word Management',
                    '/word-management',
                    'word-management',
                    <HiOutlineAcademicCap />
                )}
                {item('Setting', '/settings', 'settings', <HiOutlineCog />)}
                {item('About', '/about', 'about', <HiOutlineUser />)}
            </div>
        </div>
    );
};

SideBar.defaultProps = {
    compact: false,
};

export default SideBar;
