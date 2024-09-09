import React, { useState, useEffect } from 'react'
import { IMG_CDN } from '../utils/constant.js';
import SearchIcon from '@mui/icons-material/Search';

export default function MoviesCard({ data }) {
    const [searchedData, setSearchedData] = useState(data?.results);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchInputValue);
        }, 1000);

        return () => {
            clearTimeout(handler); 
        };
    }, [searchInputValue]); 

    useEffect(() => {
        if (data?.results) {
            const filteredMovies = data.results.filter((movie) =>
                movie.original_title.toLowerCase().includes(debouncedValue.toLowerCase())
            );
            setSearchedData(filteredMovies);
        }
    }, [debouncedValue, data]); 

    const handleChange = (value) => {
        setSearchInputValue(value); 
    };

    return (
        <>
            <div className='my-8 flex justify-center'>
                <div className='border border-black w-1/3 flex justify-around'>
                    <input 
                        onChange={(e) => handleChange(e.target.value)} 
                        value={searchInputValue} 
                        className='rounded-md p-2 border-none outline-none w-4/5' 
                        type='text' 
                        placeholder="Search movies..."
                    />
                    <div className='my-auto'>
                        <SearchIcon />
                    </div>
                </div>
            </div>

            <div className='flex justify-center gap-3 flex-wrap'>
                {searchedData?.length > 0 ? (
                    searchedData.map((item) => (
                        <div key={item.id} className='border border-black w-1/4 rounded-md'>
                            <img src={IMG_CDN + item.poster_path} alt={item.original_title} />
                            <div className='px-1 py-1'>
                                <h1 className='mt-1'>
                                    <strong>MOVIE NAME: </strong> {item.original_title}
                                </h1>
                                <p><strong>RELEASE DATE: </strong>{item.release_date}</p>
                                <p><strong>AVG VOTE: </strong>{item.vote_average}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </>
    );
}
