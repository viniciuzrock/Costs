import { useLocation } from "react-router-dom"
import Message from "../layout/Message/Message"

function Projects(){

    const location = useLocation()
    let message = ""
    if(location.state){
        message = location.state.message
    }

    return(
        <div>
            <h1>Meus Projetos</h1>
            <Message msg={message} type="success"/>
        </div>
    )
}
export default Projects