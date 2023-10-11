import Link from 'next/link';
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa';
import Buttons from './Buttons';

const Cards = ({ data, currentPage, setCurrentPage }) => {
    return (
        <div className='px-4 md:px-0 my-6 flex flex-wrap items-center justify-center gap-5'>
            {data?.map((item) => {
                if (!item.description) {
                    return null;
                }
                const text = item.description.split(' ');
                const desc = text.slice(0, 15).join(' ');

                return (
                    <Link
                        key={item.id}
                        href={item.html_url}
                        target='__blank'
                        className='w-[210px] h-[210px] flex flex-col justify-between bg-slate-900 duration-300 transition-all hover:bg-slate-950 rounded-lg py-3 px-4 '
                    >
                        <div className='mb-5'>
                            <h1 className=' font-bold text-[14px] overflow-hidden'>
                                {item.name}
                            </h1>
                            <h3 className='text-xs text-slate-400'>
                                {item.owner.login}
                            </h3>
                            {item.description && (
                                <p className='w-[180px] mt-2 text-xs text-slate-300 overflow-hidden'>
                                    {desc} {text.length > 15 && ' ...'}
                                </p>
                            )}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col gap-2 items-center'>
                                <FaStar className='text-yellow-300' />
                                <p className='text-sm'>
                                    {item.stargazers_count}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 items-center'>
                                <FaCodeBranch className='text-blue-300' />
                                <p className='text-sm'>{item.forks_count}</p>
                            </div>
                            <div className='flex flex-col gap-2 items-center'>
                                <FaEye className='text-red-300' />
                                <p className='text-sm'>{item.watchers_count}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
            {data && (
                <Buttons
                    data={data}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
};

export default Cards;
