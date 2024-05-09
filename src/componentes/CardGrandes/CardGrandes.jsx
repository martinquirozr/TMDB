import 'bootstrap/dist/css/bootstrap.min.css';
import './CardGrandes.css'

function CardGrandes(props){

return(

    <div className="  col-md-4 text-light" onClick={() => props.clickf(props.movie)}>
      <img className='rounded-3' src={`https://image.tmdb.org/t/p/w500/${props.imgsrc}`} alt={props.titulo} height='auto' width='100%'/>
      <h6 className="text-center mb-3 mt-2">{props.titulo} <span className='fw-bolder mx-2'> {props.vote}</span> </h6>
    </div>
)
}
 
export default CardGrandes;