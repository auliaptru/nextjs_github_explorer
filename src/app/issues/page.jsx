'use client';

import Buttons from '@/components/Buttons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';

const fetchIssues = async (query, page) => {
    try {
        const res = await fetch(
            `https://api.github.com/search/issues?q=${query}&page=${page}&per_page=28`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Issues = ({ searchParams }) => {
    const { search } = searchParams;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUserData = async () => {
            const users = await fetchIssues(search, currentPage);
            setData(users.items);
        };
        fetchUserData();
    }, [search, currentPage]);

    return (
        <div className='container'>
            <div className='my-10 flex item-center justify-between'>
                <h1>Issues: </h1>
                <Link href='/' className='underline'>
                    Back
                </Link>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-5'>
                {data?.map((item) => {
                    const issueUrl = item.url;
                    const url = new URL(issueUrl);

                    const path = url.pathname.split('/');
                    const owner = path[2];
                    const repo = path[3];
                    return (
                        <Link
                            href={`/issues/${owner}/${repo}/${item.number}`}
                            key={item.id}
                            className='w-[210px] h-[200px] flex flex-col justify-between bg-slate-900 duration-300 transition-all hover:bg-slate-950 rounded-lg py-3 px-4 cursor-pointer'
                        >
                            <div>
                                <h1 className='font-bold text-md overflow-hidden'>
                                    {item.title}
                                </h1>
                                <h3 className='text-[13px] text-slate-400 mt-1'>
                                    {item.user.login}
                                </h3>
                                <span
                                    className={`text-xs my-2 ${
                                        item.comments === 0
                                            ? 'text-red-600'
                                            : 'text-white'
                                    }`}
                                >
                                    Comments: {item.comments}
                                </span>
                            </div>
                            <div className='flex flex-wrap gap-1'>
                                {item.labels.map((label) => (
                                    <p
                                        key={label.id}
                                        className='text-[10px] py-[1px] px-2 rounded-lg font-bold text-black'
                                        style={{
                                            backgroundColor: `#${label.color}`,
                                            color: `${
                                                label.color === '000000' &&
                                                'lightgray'
                                            }`,
                                        }}
                                    >
                                        {label.name}
                                    </p>
                                ))}
                            </div>
                        </Link>
                    );
                })}
                {data?.length > 0 && (
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

export default Issues;
