'use client';

import Cards from '@/components/Cards';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';

const fetchTopics = async (query, page) => {
    try {
        const res = await fetch(
            `https://api.github.com/search/repositories?q=topic:${query}&page=${page}&per_page=28`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Topics = ({ searchParams }) => {
    const { search } = searchParams;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const users = await fetchTopics(search, currentPage);
            setData(users.items);
            setLoading(false);
        };
        fetchUserData();
    }, [search, currentPage]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='container'>
            <div className='my-10 flex item-center justify-between'>
                <h1>Topics {search}: </h1>
                <Link href='/' className='underline'>
                    Back
                </Link>
            </div>
            <Cards
                data={data}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Topics;
