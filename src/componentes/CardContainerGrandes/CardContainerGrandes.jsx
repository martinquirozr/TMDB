import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react'
import CardGrandes from '../CardGrandes/CardGrandes.jsx'



function CardContainerGrandes(props){

const [categoryList, setCategoryList] = useState([]);

const getRatedMovie = async () => {
    
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=210bd2a2117bf15c53b4bb54e113409c&include_video=false&language=en-US&page=1&release_date.gte=2024&sort_by=vote_average.desc&vote_count.gte=100&year=2024');
        const data = await response.json();
        setCategoryList(data.results);
        console.log
    } catch (error) {
        console.error('Error al obtener la lista de películas:', error);
    }
}

useEffect(() => {
    getRatedMovie();
}, []);


console.log('Prueba Final Category Fetch',categoryList)

const handleMovieClick = (movie) => {
    props.clickf2(movie);
  };

return(
    <div className='my-4'>

        <h4 className='text-light mb-3'>{props.titulo}</h4>
     <div className='row text-center justify-content-center'>
      {categoryList.slice(0,6).map(movie => (
        <CardGrandes key={movie.id} titulo={movie.original_title} imgsrc={movie.backdrop_path} clickf={handleMovieClick} movie={movie} vote={movie.vote_average} />

      ))}
      </div>
      <div className="border border-secondary my-2" style={{ width: '100%', height: '1px' }}></div>

    </div>
    )

}


export default CardContainerGrandes;