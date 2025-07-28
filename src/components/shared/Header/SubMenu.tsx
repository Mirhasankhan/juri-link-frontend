import Link from 'next/link';
import React from 'react';

const SubMenu = () => {
    return (
        <div className='flex items-center gap-6 '>
            <Link href="/">Home</Link>
            <Link href="/">Services</Link>
            <Link href="/">Find Lawyers</Link>
            <Link href="/">Posts</Link>
            <Link href="/">Premium</Link>
            <Link href="/">About Us</Link>
        </div>
    );
};

export default SubMenu;