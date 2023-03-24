import { useState } from "react"
import { useEffect } from "react"
import Input from "../form/Input/Input"
import Select from "../form/Select/Select"
import SubmitButton from "../form/SubmitButton/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm({btnText}){

    const [categories, setCategories] = useState([])

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

    return(

        <form className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o valor do projeto"
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm