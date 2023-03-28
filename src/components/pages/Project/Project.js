import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../layout/Loading/Loading"
import Container from "../../layout/Container/Container"
import styles from "./Project.module.css"

function Project({}){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setshowProjectForm] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{

            fetch(`http://localhost:5000/projects/${id}`, {
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            }).then((resp)=> resp.json()).then((data)=>{
                console.log(data);
                setProject(data)
            }).catch((e)=>{
                console.log(e);
            })
        }, 1000)
    })

    function toggleProjectFrom(){
        setshowProjectForm(!showProjectForm)
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectFrom}>
                               {!showProjectForm ? "Editar Projeto":"Fechar" }
                            </button>
                            {!showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria: </span>{project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de orçamento: </span>{project.budget}
                                        </p>
                                        <p>
                                            <span>Total utilizado: </span>{project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={styles.project_info}>
                                        <p>detalhes</p>
                                    </div>
                                )
                            }
                        </div>
                    </Container>
                </div>
            ) : (
            <Loading/>
            )}
        </>
    )
}

export default Project