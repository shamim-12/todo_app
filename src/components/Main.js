import React,{useState} from 'react'
import { useEffect } from 'react'



const Main = () => {
    
    const[todo,setTodo]=useState(()=>{
        const savedTasks = localStorage.getItem('todo');
        if(savedTasks){
            return JSON.parse(savedTasks)
        }
        else{
            return [];
        }
    });
    const [inputV, setInputValue] = useState("")
     useEffect(() => {//takes in a callback and dependencies
         localStorage.setItem('todo',JSON.stringify(todo));
     },[todo])// we are updating the local storage any time the todo state changes

    function handleInputChange(e){
        setInputValue(e.target.value);
    
    }
    function handleSubmitChanges(e){
        e.preventDefault();
        if(inputV.length > 2){
            setTodo([
                ...todo,
                {
                    id:todo.length + 2,
                    //removes spaces from the input value.
                    text:inputV.trim()
                }
            ]);
        }
        setInputValue (" ")
    }

    function handleDeleteClick(id){ 
        //returns the filtered inputs
     const removeItem= todo.filter((inputV)=>{
         return inputV.id !== id;
     });

     setTodo(removeItem);
    }

    return (
        <div className = "mainStyle" >
            <form onSubmit = {handleSubmitChanges}>
            <input type = "text" value = {inputV} placeholder ="Enter a Todo" onChange={handleInputChange}/>
            <button className = "buttonStyle"type = "submit">ADD</button>
            </form>
             <ul className = "todolist">
                 {todo.map((inputV)=>(
                     <div className = "tasklist">
                     <li className = "tasks" key = {inputV.id}> {inputV.text}
                      </li>
                      <button onClick ={() => handleDeleteClick(inputV.id)} >Delete</button>
                      </div>
                 ))}
             </ul>
        </div>
    )
}

export default Main
