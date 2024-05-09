import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Card/Card'



function CardContainer(props){

const [categoryList, setCategoryList] = useState([]);

const getCategoryMovie = async () => {
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=210bd2a2117bf15c53b4bb54e113409c&with_genres=${props.generoID}`);
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

const handleMovieClick = (movie) => {
    props.clickf2(movie);
  };

return(
    <div>

        <h4 className='text-light mb-3'>{props.titulo}</h4>
     <div className='row'>
      {categoryList.slice(0,6).map(movie => (
        <Card key={movie.id} titulo={movie.original_title} imgsrc={movie.poster_path} clickf={handleMovieClick} movie={movie} />

      ))}
      </div>
      <div className="border border-secondary mb-3" style={{ width: '100%', height: '1px' }}></div>

    </div>
    )

}


export default CardContainer;