import { useHistory } from "react-router-dom"
import ProjectForm from "../../project/ProjectForm"
import styles from "./NewProject.module.css"

function NewProject(){

    // const history = useHistory()

    function createPost(project){
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects",{
            method:"POST",
            headers:{
                "Content-type":"application-json"
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json()).then((data)=>{
            console.log(data)

        }).catch((e)=>{
            console.log(e)
        })
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicioanr os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject;