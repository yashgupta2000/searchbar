import React, { useEffect, useState } from 'react'
import MoviesCard from '../component/MoviesCard'
import SearchBar from '../component/SearchBar';

export default function PopularMovies() {
    const [data, setData] = useState();

    const fetchData = async () => {
        const API_OPTIONS = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTAxMDQzNGZmMGE4ZmEzNDZkZmZmODc2MThhNDAzYiIsIm5iZiI6MTcyMjI4MDkxOS4wMzgyMzIsInN1YiI6IjYzMmRkNGViMDQ0M2M5MDA3Y2NjOWE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hgf7kz5JACjDXKvnCL4oJnyoszsrlmBMlGcpfrdHp-c'
            }
        }
        const url = 'https://api.themoviedb.org/3/movie/popular?page=1'
        const data = await fetch(url, API_OPTIONS);
        const jsondata = await data.json();
        setData(jsondata);
        // console.log(jsondata)

    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <MoviesCard data={data} /></div>
    )
}
