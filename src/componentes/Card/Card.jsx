import 'bootstrap/dist/css/bootstrap.min.css';



function Card(props){

return(
    <div className="col-6 +.6col-md-2 col-sm-4 mb-3 text-light" onClick={() => props.clickf(props.movie)}>
      <img className='rounded-3' src={`https://image.tmdb.org/t/p/original/${props.imgsrc}`} alt={props.titulo} height='auto' width='100%'/>
      <h6 className="text-center mt-2">{props.titulo}</h6>
    </div>
)
}
 
export default Card;