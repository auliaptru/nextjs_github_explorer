import Image from 'next/image';
import Link from 'next/link';
import { FaBlog, FaTwitter } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const ProfileUser = ({ data }) => {
    return (
        <div className='w-auto flex flex-col items-center justify-center border border-slate-900 p-5'>
            <div className='flex flex-col items-center gap-2'>
                <Image
                    src={data.avatar_url}
                    width={60}
                    height={60}
                    alt='github-avatar'
                    className='rounded-full'
                />
                <div className='text-center'>
                    <h1>{data.name}</h1>
                    {data.company && (
                        <h2 className='text-sm text-gray-300'>
                            ({data.company})
                        </h2>
                    )}
                </div>
                <h3 className='text-sm text-gray-300'>@{data.login}</h3>
                {data.location && (
                    <h3 className='text-sm text-yellow-400'>{data.location}</h3>
                )}
                {data.bio !== 'undefined' && (
                    <p className='text-[12px] max-w-[400px] text-center'>
                        {data.bio}
                    </p>
                )}
            </div>
            <div className='mt-8'>
                <div className='flex flex-col justify-between'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h5 className='text-sm border-b mb-2'>Followers</h5>
                            <p>{data.followers}</p>
                        </div>
                        <div>
                            <h5 className='text-sm border-b mb-2'>Following</h5>
                            <p>{data.following}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-10 mt-5'>
                        <div>
                            <h5 className='text-sm border-b mb-2'>
                                Public Repositories
                            </h5>
                            <p>{data.public_repos}</p>
                        </div>
                        <div>
                            <h5 className='text-sm border-b mb-2'>
                                Public Gists
                            </h5>
                            <p>{data.public_gists}</p>
                        </div>
                    </div>
                </div>
                <Link
                    href={data?.html_url}
                    target='_blank'
                    className='my-5 flex items-center justify-center'
                >
                    <button className=' bg-slate-800 p-2 text-[12px] rounded'>
                        View Profile
                    </button>
                </Link>
                <div className='flex items-center justify-center gap-5 mt-5'>
                    {data.twitter_username && (
                        <Link
                            href={`https://twitter.com/${data.twitter_username}`}
                            target='__blank'
                        >
                            <FaTwitter className='text-2xl text-blue-600' />
                        </Link>
                    )}
                    {data.blog && (
                        <Link href={`https://${data.blog}`} target='__blank'>
                            <FaBlog className='text-2xl text-orange-500' />
                        </Link>
                    )}
                    {data.email && (
                        <button>
                            <MdOutlineEmail className='text-2xl' />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
