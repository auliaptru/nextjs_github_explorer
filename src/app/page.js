'use client';

import { FaGithub } from 'react-icons/fa';
import Search from '../components/Search';

const Home = () => {
    return (
        <div className='flex items-center justify-center flex-col -mt-8 mx-auto h-screen max-w-2xl'>
            <div
                className='w-fit mb-6 cursor-pointer'
                onClick={() => {
                    location.reload();
                }}
            >
                <div className='flex items-center justify-center mb-1'>
                    <FaGithub className='text-5xl' />
                </div>
                <h1 className='mb-5 text-xl text-center'>Github Explorer</h1>
            </div>
            <div className='w-full'>
                <Search />
            </div>
        </div>
    );
};

export default Home;
