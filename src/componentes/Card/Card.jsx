import 'bootstrap/dist/css/bootstrap.min.css';



function Card(props){

return(
    <div className="col-md-4 mb-3 text-light" onClick={props.clickf}>
      <img className='rounded-3' src={`https://image.tmdb.org/t/p/original/${props.imgsrc}`} alt={props.titulo} height={500} width='100%'/>
      <h4 className="text-center">{props.titulo}</h4>
    </div>
)
}

export default Card;