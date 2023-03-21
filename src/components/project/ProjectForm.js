import Input from "../form/Input/Input"
import Select from "../form/Select/Select"
import SubmitButton from "../form/SubmitButton/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm({btnText}){
    return(
        <form>
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
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm