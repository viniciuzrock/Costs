import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../layout/Loading/Loading"
import Container from "../../layout/Container/Container"
import styles from "./Project.module.css"
import ProjectForm from "../../Project/ProjectForm"
import Message from "../../layout/Message/Message"
import ServiceForm from "../../service/ServiceForm"
import {parse, v4 as uuidv4} from "uuid" //cria um id único

function Project({}){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setshowProjectForm] = useState(false)
    const [message, setMessage] = useState(false)
    const [type, setType] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            }).then((resp)=> resp.json()).then((data)=>{
                setProject(data)
            }).catch((e)=>{
                console.log(e);
            })
        }, 1000)
    })

    function toggleProjectFrom(){
        setshowProjectForm(!showProjectForm)
    }

    function editPost(project){

        setMessage('')

        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json()).then((data)=>{
            setProject(data)
            setshowProjectForm(false)
            setMessage("Projeto atualizado!")
            setType("success")
        }).catch((e)=>{
            console.log(e);
        })
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function createService(project){
        setMessage("")
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado!")
            setType("error")
            project.services.pop()
            return false
        }

        //add cost
        project.cost = newCost

        //update
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json()).then((data)=>{
            console.log(data);
        }).catch((e)=>{
            console.log(e);
        })

    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        { message && <Message type={type} msg={message}/>}
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
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir Edição"
                                            projectData={project}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button
                                className={styles.btn}
                                onClick={toggleServiceForm}>
                                {!showServiceForm? "Adicionar serviço":"Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm &&(
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText="Adicionar serviço"
                                            projectData={project}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de serviços</p>
                        </Container>
                    </Container>
                </div>
            ) : (
            <Loading/>
            )}
        </>
    )
}

export default Project