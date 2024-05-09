import 'bootstrap/dist/css/bootstrap.min.css';
import '../CardGenero/CardGenero.css';

function CardGenero(props){

return(
    <div className=" cardgenero col-md-2 mb-3 rounded-3 text-light align-text-center bg-secondary bg-gradient d-flex align-items-center justify-content-center" onClick={props.clickRender2}>
        <h2 className='d'>{props.titulo}</h2>
      
    </div>
)
}
 
export default CardGenero;