import { ReactElement } from 'react';

export interface HeaderProps {
    title: string;
    description?: string | undefined | ReactElement;
}

const Header = ({ title, description }: HeaderProps) => {
    return (
        <div>
            <h1 className='text-xl font-bold mb-2'>{title}</h1>
            <text className='text-base text-gray-600'>{description}</text>
        </div>
    );
};

Header.defaultProps = {
    description: undefined
};

export default Header;
