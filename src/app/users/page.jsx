'use client';

import Buttons from '@/components/Buttons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const fetchUsers = async (query, page) => {
    try {
        const res = await fetch(
            `https://api.github.com/search/users?q=${query}&page=${page}&per_page=30`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Users = ({ searchParams }) => {
    const { search } = searchParams;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUserData = async () => {
            const users = await fetchUsers(search, currentPage);
            setData(users.items);
        };
        fetchUserData();
    }, [search, currentPage]);

    return (
        <div className='container'>
            <div className='my-10 flex item-center justify-between'>
                <h1>Users: </h1>
                <Link href='/' className='underline'>
                    Back
                </Link>
            </div>
            <div className='flex flex-wrap gap-5 justify-start'>
                {data &&
                    data?.map((user) => (
                        <Link
                            href={`/users/${user.login}`}
                            key={user.login}
                            className='w-[135px] md:w-[164px] border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-gray-950'
                        >
                            <div className='flex flex-col items-center gap-2 text-center'>
                                <Image
                                    src={user.avatar_url}
                                    width={60}
                                    height={60}
                                    alt='github-avatar'
                                    className='rounded-full'
                                    loading='eager'
                                />
                                <p>@{user.login}</p>
                            </div>
                        </Link>
                    ))}
                {data && (
                    <Buttons
                        data={data}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
