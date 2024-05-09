import 'bootstrap/dist/css/bootstrap.min.css';
import CardGenero from '../CardGenero/CardGenero.jsx';



function CardContainer2(props){

function render3(){
    alert('Render 3 Prueba')
}

return(
    <div>

    <h4 className='text-light mb-3'>{props.titulo}</h4>
    <div className='d-flex align-items-center justify-content-between'>
        <CardGenero clickRender2={props.renderDrama} generoID={18} titulo='Drama'></CardGenero>
        <CardGenero clickRender2={props.renderTerror} generoID={27} titulo='Terror'></CardGenero>
        <CardGenero clickRender2={props.renderFamiliar} generoID={10751} titulo='Familiar'></CardGenero>
        <CardGenero clickRender2={props.renderCrimen} generoID={80} titulo='Crimen'></CardGenero>
        <CardGenero clickRender2={props.renderAventura} generoID={12} titulo='Aventura'></CardGenero>
    </div>
    

    </div>
    )

}


export default CardContainer2;