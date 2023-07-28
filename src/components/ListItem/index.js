
import './index.css'

const ListItem = ({details,triggerDel,triggerPut}) => {
   
    const {_id,updatedAt,name,date_of_expense,created_by,category,amount} = details
 
    const  editList = () =>{
        triggerPut(_id)
    }
    
    const delList =() =>{
        triggerDel(_id)
    }
    

    return <li className='row-nor'>
    <p className="p">{name}</p>
    <p className="p">{category}</p>
    <p className="p">{date_of_expense}</p>
    <p className="p">{amount}</p>
    <p className="p">{updatedAt}</p>
    <p className="p">{created_by}</p>
    <div>
    <button type="button" onClick={editList}>Edit</button>
    <button type="button" onClick ={delList}>Del</button>
    </div> 
    </li>
}


export default ListItem