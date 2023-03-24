import { useState, useEffect } from "react"
// import { useEffect } from "react"
import Input from "../form/Input/Input"
import Select from "../form/Select/Select"
import SubmitButton from "../form/SubmitButton/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm({btnText, handleSubmit, projectData}){

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState([ projectData || {} ]);

    useEffect(()=>{
        fetch("http://localhost:5000/categories",{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        }).then((resp)=> resp.json()).then((data)=>{
            setCategories(data)
        }).catch((e)=>{
            console.log(e)
        })
    }, []);

    //Na hora do submit do form, irá disparar o Post no elemento pai
    const submit = (e)=>{
        e.preventDefault()
        // console.log(project);
        handleSubmit(project)
    }

    function handleChange(e){
        //1                2            3               4
        setProject({ ...project, [e.target.name]: e.target.value});
        // console.log(project);
    }
    /*
    * 1 - Novo valor de 'project'
    * 2 - project 'no momento'
    * 3 - nome do campo que foi digitado
    * 4 - valor digitado
    */
    //Pega o ID e o nome da categoria
    function handleCategory(e){
        setProject({
            ...project,
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }
    return(

        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name: ""}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o valor do projeto"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ""}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange = {handleCategory}
                value={project.category ? project.category.id : ""}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm