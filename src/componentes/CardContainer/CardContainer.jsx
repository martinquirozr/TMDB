import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Card/Card'



function CardContainer(){
// let genero = 28;
const api_url = 'https://api.themoviedb.org/3'
const api_key = '210bd2a2117bf15c53b4bb54e113409c'

const [categoryList, setCategoryList] = useState([]);

const getCategoryMovie = async () => {
    let genero= 10749;
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=210bd2a2117bf15c53b4bb54e113409c&with_genres=${genero}`);
        const data = await response.json();
        setCategoryList(data.results);
    } catch (error) {
        console.error('Error al obtener la lista de películas:', error);
    }
}

useEffect(() => {
    getCategoryMovie();
}, []);


console.log('Prueba Final Category Fetch',categoryList)

return(
    <>
    

    </>
    )

}


export default CardContainer;