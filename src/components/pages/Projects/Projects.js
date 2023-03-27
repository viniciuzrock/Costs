import { useLocation } from "react-router-dom"
import Container from "../../layout/Container/Container"
import Message from "../../layout/Message/Message"
import LinkButton from "../../layout/LinkButton/LinkButton"
import styles from "./Projects.module.css"
import ProjectCard from "../../Project/ProjectCard/ProjectCard"
import { useState, useEffect } from "react"


function Projects(){

    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ""
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        fetch("http://localhost:5000/projects",{
            method: "GET",
            headers: {
                "Content-type": "Application/json",
            }
        }).then((resp) => resp.json()).then((data=>{
            setProjects(data)
        })).catch((e)=>{
            console.log(e)
        })
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
            </Container>

        </div>
    )
}
export default Projects