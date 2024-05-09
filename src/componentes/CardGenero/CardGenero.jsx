import 'bootstrap/dist/css/bootstrap.min.css';
import '../CardGenero/CardGenero.css';

function CardGenero(props){

return(
    <div className=" cardgenero col-10 col-sm col-md-2 my-2 mx-2 rounded-3 text-light align-text-center bg-secondary bg-gradient d-flex align-items-center justify-content-center" onClick={props.clickRender2}>
        <p className='fs-2 text-sm'>{props.titulo}</p>
      
    </div>
)
}
 
export default CardGenero;