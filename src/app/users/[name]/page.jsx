'use client';

import Loading from '@/app/loading';
import ProfileUser from '@/components/ProfileUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchUser = async (name) => {
    try {
        const res = await fetch(`https://api.github.com/users/${name}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const User = async ({ params: { name } }) => {
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUser(name);
            setData(data);
        };
        fetchData();
    }, [name]);

    if (!data) {
        return <Loading />;
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <ProfileUser data={data} />

            <button
                onClick={() => router.back()}
                className='mt-4 bg-slate-300 duration-300 hover:bg-transparent border hover:border-slate-500 text-black hover:text-white py-2 px-4 rounded cursor-pointer'
            >
                Back
            </button>
        </div>
    );
};

export default User;
