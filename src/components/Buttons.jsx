import React from 'react';

const Buttons = ({ data, currentPage, setCurrentPage }) => {
    const nextPage = () => {
        if (currentPage < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (currentPage < 1) {
            setCurrentPage(1);
        }
    };

    return (
        <div className='w-full mt-5'>
            {currentPage && (
                <div className='flex items-center justify-between '>
                    <button
                        className={`p-3 rounded-md ${
                            currentPage === 1
                                ? 'bg-red-950 cursor-not-allowed'
                                : 'bg-red-800'
                        }`}
                        disabled={currentPage === 1}
                        onClick={prevPage}
                    >
                        Prev
                    </button>
                    <button
                        className={`p-3 rounded-md ${
                            currentPage > data?.length - 1
                                ? 'bg-red-950 cursor-not-allowed'
                                : 'bg-red-800'
                        }`}
                        onClick={nextPage}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Buttons;
