import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page');

    let apiUrl = '';
    if (req.url.includes('/user/search')) {
        apiUrl = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=28`;
    } else if (req.url.includes('/issues/search')) {
        apiUrl = `https://api.github.com/search/issues?q=${query}&page=${page}&per_page=30`;
    } else if (req.url.includes('/topics/search')) {
        apiUrl = `https://api.github.com/search/repositories?q=topic:${query}&page=${page}&per_page=30`;
    } else if (req.url.includes('/repositories/search')) {
        apiUrl = `https://api.github.com/users/${query}/repos?page=${page}&per_page=28`;
    } else {
        return new Response('Invalid URL', { status: 400 });
    }

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(
                `GitHub API request failed with status: ${res.status}`
            );
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from GitHub API:', error);
        return new Response('Error fetching data', { status: 500 });
    }
};
