'use client';

import Cards from '@/components/Cards';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';

const fetchRepos = async (query, page) => {
    try {
        const res = await fetch(
            `https://api.github.com/users/${query}/repos?page=${page}&per_page=29`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Repos = ({ searchParams }) => {
    const { search } = searchParams;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUserData = async () => {
            const repos = await fetchRepos(search, currentPage);
            setData(repos);
        };
        fetchUserData();
    }, [search, currentPage]);

    return (
        <div className='container'>
            <div className='my-10 flex item-center justify-between'>
                <h1>Repositories {search}: </h1>
                <Link href='/' className='underline'>
                    Back
                </Link>
            </div>
            <Cards
                data={data}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default Repos;
