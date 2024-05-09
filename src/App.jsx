import { useState,useEffect } from 'react'
import axios from 'axios'
import YouTube from 'react-youtube'
import './App.css'
import Card from './componentes/Card/Card'
import CardContainer from './componentes/CardContainer/CardContainer.jsx'
import CardContainer2 from './componentes/CardContainer2/CardContainer2.jsx'
import CardContainerGrandes from './componentes/CardContainerGrandes/CardContainerGrandes.jsx'
import Footer from './componentes/Footer/Footer.jsx'

function App() {
  
  const api_url = 'https://api.themoviedb.org/3'
  const api_key = '210bd2a2117bf15c53b4bb54e113409c'

// Variables de estado
  const [movieList, setMovieList] = useState([]);
  const [popularMovieList,setPopularMovieList] = useState([]);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [searchKey, setSearchKey] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [playing,setPlaying] = useState(false);

  const[showDrama,setShowDrama] = useState(false);
  const[showTerror,setShowTerror] = useState(false);
  const[showFamiliar,setShowFamiliar] = useState(false);
  const[showCrimen,setShowCrimen] = useState(false);
  const[showAventura,setShowAventura] = useState(false);
  const[showBusqueda,setShowBusqueda] = useState(false);

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


//  Buscarc Peliculas Populares

const getPopularMovies = async () => {
    
  try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=210bd2a2117bf15c53b4bb54e113409c&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`);
      const data = await response.json();
      setPopularMovieList(data.results);
  } catch (error) {
      console.error('Error al obtener la lista de películas:', error);
  }
}

useEffect(() => {
  getPopularMovies();
}, []);

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


//  Funciones Para renderizar categorias y otros
let renderBusqueda = () => {
  setShowBusqueda(true)
  setShowDrama(false);
  setShowTerror(false);
  setShowFamiliar(false);
  setShowCrimen(false);
  setShowAventura(false);

}
let renderDrama = () => {
  
  setShowBusqueda(false)
  setShowDrama(true);
  setShowTerror(false);
  setShowFamiliar(false);
  setShowCrimen(false);
  setShowAventura(false);

}
let renderTerror = () => {
  
  setShowBusqueda(false)
  setShowDrama(false);
  setShowTerror(true);
  setShowFamiliar(false);
  setShowCrimen(false);
  setShowAventura(false);

}
let renderFamiliar = () => {
  
  setShowBusqueda(false)
  setShowDrama(false);
  setShowTerror(false);
  setShowFamiliar(true);
  setShowCrimen(false);
  setShowAventura(false);

}
let renderCrimen = () => {
  
  setShowBusqueda(false)
  setShowDrama(false);
  setShowTerror(false);
  setShowFamiliar(false);
  setShowCrimen(true);
  setShowAventura(false);

}
let renderAventura = () => {
  
  setShowBusqueda(false)
  setShowDrama(false);
  setShowTerror(false);
  setShowFamiliar(false);
  setShowCrimen(false);
  setShowAventura(true);

}

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
            <button onClick={()=>renderBusqueda()} className='btn btn-secondary btn-navbar btn-sm'> Buscar</button>
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


        {/* Variables de Estado Para renderizar o no */}

        

            {/* Category Provicionales */}

            { showBusqueda &&
          (
            <div className='row'>

        <h1>General</h1>
      {movieList.slice(0,6).map(movie => (
        <Card key={movie.id} titulo={movie.original_title} imgsrc={movie.poster_path} clickf={() => selectMovie(movie)} movie={movie} />

      ))}
      </div>
          )
          }




          { showDrama &&
          (<CardContainer clickf2={selectMovie} titulo='Drama' generoID={18}></CardContainer>)
          }
          { showTerror &&
          (<CardContainer clickf2={selectMovie} titulo='Terror' generoID={27}></CardContainer>)
          }
          { showFamiliar &&
          (<CardContainer clickf2={selectMovie} titulo='Familiar' generoID={10751}></CardContainer>)
          }
          { showCrimen &&
          (<CardContainer clickf2={selectMovie} titulo='Crimen' generoID={80}></CardContainer>)
          }
           { showAventura &&
          (<CardContainer clickf2={selectMovie} titulo='Aventura' generoID={12}></CardContainer>)
          }
          
            {/* Termina Category Provicionales */}




          <CardContainer clickf2={selectMovie} titulo='Comedia' generoID={35}></CardContainer>
          <CardContainer clickf2={selectMovie} titulo='Acción' generoID={28}></CardContainer>
          <CardContainer2 
          renderDrama={()=>renderDrama()} 
          renderTerror={()=>renderTerror()}
          renderFamiliar={()=>renderFamiliar()}
          renderCrimen={()=>renderCrimen()}
          renderAventura={()=>renderAventura()}
          titulo='+ Categorias'>

          </CardContainer2>


          <CardContainerGrandes clickf2={selectMovie} titulo='Mejores Calificadas'></CardContainerGrandes>


      <div className='row'>

        <h1>General</h1>
      {popularMovieList.slice(0,12).map(movie => (
        <Card key={movie.id} titulo={movie.original_title} imgsrc={movie.poster_path} clickf={() => selectMovie(movie)} movie={movie} />

      ))}
      </div>
      
    </div>
    <Footer></Footer>
    </div>
    
  )
}

export default App