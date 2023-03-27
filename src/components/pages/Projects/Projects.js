import { useLocation } from "react-router-dom"
import Container from "../../layout/Container/Container"
import Message from "../../layout/Message/Message"
import LinkButton from "../../layout/LinkButton/LinkButton"
import styles from "./Projects.module.css"
import ProjectCard from "../../Project/ProjectCard/ProjectCard"
import { useState, useEffect } from "react"
import Loading from "../../layout/Loading/Loading"


function Projects(){

    const [projects, setProjects] = useState([])
    const location = useLocation()
    const [removeLoading, setremoveLoading] = useState(false)
    let message = ""
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(()=>{

            fetch("http://localhost:5000/projects",{
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                }
            }).then((resp) => resp.json()).then((data=>{
                setProjects(data)
                setremoveLoading(true)
            })).catch((e)=>{
                console.log(e)
            })
        }, 1000)
    },[])

    return(

        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            { message && <Message msg={message} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project)=>(
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category?.name}
                            key={project.id}
                            // handleRemove
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados!</p>
                }
            </Container>

        </div>
    )
}
export default Projects