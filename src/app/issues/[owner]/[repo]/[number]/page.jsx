'use client';

import Loading from '@/app/loading';
import IssueDetail from '@/components/IssueDetail';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const fetchIssue = async (owner, repo, number) => {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues/${number}`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Issue = async ({ params }) => {
    const [data, setData] = useState(null);
    const { owner, repo, number } = params;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchIssue(owner, repo, number);
            setData(data);
        };
        fetchData();
    }, [owner, repo, number]);

    if (!data) {
        return <Loading />;
    }

    console.log(data);

    return (
        <div className='container'>
            <IssueDetail data={data} />

            <div className='my-5 text-right'>
                <button
                    onClick={() => router.back()}
                    className='bg-red-800 text-sm text-white py-2 px-2 border-none rounded cursor-pointer'
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Issue;
