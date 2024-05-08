import { useState,useEffect } from 'react'
import axios from 'axios'
import YouTube from 'react-youtube'
import './App.css'
import Card from './componentes/Card/Card'
import CardContainer from './componentes/CardContainer/CardContainer.jsx'

function App() {
  
  const api_url = 'https://api.themoviedb.org/3'
  const api_key = '210bd2a2117bf15c53b4bb54e113409c'

// Variables de estado
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [searchKey, setSearchKey] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [playing,setPlaying] = useState(false);

// Peticion API de Todas Las Películas
 const fetchApi = async (searchKey) => {
  let type = searchKey ? 'search' : 'discover';
  const {data : {results},
} = await axios.get(`${api_url}/${type}/movie`,{
params :{
  api_key : api_key,
  query : searchKey
        },
});
    setMovieList(results);
    setMovie(results[0])

    if(results.length){
      await fetchMovie(results[0].id)
    }
 }

// Código para la petición de una película y mostrar el trailer
const fetchMovie = async (id) => {
  const {data} = await axios.get(`${api_url}/movie/${id}`,{
    params:{
      api_key : api_key,
      append_to_response :'videos'
    }
  })
  if(data.videos && data.videos.results){
    const trailer = data.videos.results.find(
      (vid) => vid.name == 'Official Trailer'
    );
    setTrailer(trailer ? trailer : data.videos.results[0])
  }
  setMovie(data)
}

const selectMovie = async(movie) =>{
  fetchMovie(movie.id)
  // setMovie(movie)
  window.scrollTo(0,0)
}


//  Código para buscar películas
const buscarPeliculas = (e)=>{
  e.preventDefault();
  fetchApi(searchKey);
}

 useEffect(()=>{
  fetchApi();
 },[])

  return (

    <div className='bg-dark'>
      <nav className='text-light d-flex'>
        <div className='col-6 d-flex align-items-center justify-content-center' ><h2 className='text-center'>TMDB+</h2></div>
        
        <div className='col-6 d-flex align-items-center justify-content-center '>
          <form className='container d-flex align-items-center justify-content-center' onSubmit={buscarPeliculas}>
            <div className='col-4 mx-1'>
            <input className='form-control form-control-sm' type="text" placeholder='Buscar' onChange={(e)=> setSearchKey(e.target.value)} />
            </div>
            <div className='d-grid col-2 mx-1'>
            <button className='btn btn-secondary btn-navbar btn-sm'> Buscar</button>
            </div>
        
          </form>
        </div>
       
      </nav>
      

      {/* Contenedor del Baner y reproductor de video */}

      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="btn btn-secondary">
                    Close
                  </button>
                </>
              ) : (
                <div className="container mb-5">
                  <div className="">
                    {trailer ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>


      {/* Contenedor del Baner y reproductor de video */}

      <div className='container mt-3'>
          <CardContainer 
          clickf2={() => selectMovie(movie)} titulo='Comedia' generoID={35}>
          </CardContainer>
          <CardContainer titulo='Acción' generoID={28}></CardContainer>
          <CardContainer titulo='Romance' generoID={10749}></CardContainer>
          <CardContainer titulo='Animación' generoID={16}></CardContainer>
      <div className='row'>

        <h1>General</h1>
      {movieList.map(movie => (
        <Card key={movie.id} titulo={movie.original_title} imgsrc={movie.poster_path} clickf={() => selectMovie(movie)} movie={movie} />

      ))}
      </div>
      
    </div>
    </div>
    
  )
}

export default App