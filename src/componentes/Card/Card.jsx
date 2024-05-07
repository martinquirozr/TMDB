import 'bootstrap/dist/css/bootstrap.min.css';



function Card(props){

return(
    <div className="col-md-2 mb-3 text-light" onClick={props.clickf}>
      <img className='rounded-3' src={`https://image.tmdb.org/t/p/original/${props.imgsrc}`} alt={props.titulo} height='auto' width='100%'/>
      <h6 className="text-center">{props.titulo}</h6>
    </div>
)
}

export default Card;