import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const fetchComments = async (url) => {
    try {
        const res = await fetch(`${url}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const IssueDetail = async ({ data }) => {
    const res = await fetchComments(data.comments_url);
    const comments = res;

    return (
        <div className='whitespace-pre-line flex flex-col gap-5 border border-slate-900 p-5'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>{data.title}</h1>
                </div>
                <div className='flex flex-wrap gap-1'>
                    {data.labels.map((label) => (
                        <p
                            key={label.id}
                            className='text-[10px] py-[1px] px-2 rounded-lg font-bold text-black'
                            style={{
                                backgroundColor: `#${label.color}`,
                                color: `${
                                    label.color === '000000' && 'lightgray'
                                }`,
                            }}
                        >
                            {label.name}
                        </p>
                    ))}
                </div>
                <Link href={data.html_url} className='mt-2 flex flex-col gap-2'>
                    <div className='flex items-center gap-3'>
                        <Image
                            src={data.user.avatar_url}
                            alt='avatar'
                            width={30}
                            height={30}
                            className='object-cover rounded-full'
                        />
                        <h3 className='text-sm'>@{data.user.login}</h3>
                    </div>
                    <div>
                        <span className='text-xs text-slate-400'>
                            Created: {data.created_at.substring(0, 10)}
                        </span>
                    </div>
                </Link>
            </div>

            <div className='prose prose-lg max-w-none overflow-x-auto text-[13px] bg-gray-950 p-5'>
                <ReactMarkdown remarkPlugins={[gfm]}>{data.body}</ReactMarkdown>
            </div>

            <div>
                <h1 className='mb-5 underline'>Comments: </h1>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div className='flex flex-col gap-2 mb-5 relative'>
                            <div className='flex items-center gap-3'>
                                <Image
                                    src={comment.user.avatar_url}
                                    alt='avatar'
                                    width={30}
                                    height={30}
                                    className='rounded-full object-cover'
                                />
                                <div className='flex flex-col'>
                                    <span className='text-sm'>
                                        {comment.user.login ===
                                        data.user.login ? (
                                            <div className='flex items-center gap-3'>
                                                {comment.user.login}
                                                <span className='text-[9px] bg-orange-600 rounded  px-[2px]'>
                                                    Author
                                                </span>
                                            </div>
                                        ) : (
                                            comment.user.login
                                        )}
                                    </span>
                                    <span className='text-[10px] text-gray-400'>
                                        {comment.created_at.substring(0, 10)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <ReactMarkdown
                                    remarkPlugins={[gfm]}
                                    className='text-xs text-slate-200'
                                >
                                    {comment.body}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p className='text-sm'>No comments!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueDetail;
