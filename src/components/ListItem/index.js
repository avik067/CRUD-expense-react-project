
import './index.css'

const ListItem = ({details}) => {
   
    const {updatedAt,name,date_of_expense,created_by,category,amount} = details

   console.log("this is list of data")

    return <li className='row-nor'>
    <p className="p">{name}</p>
    <p className="p">{category}</p>
    <p className="p">{date_of_expense}</p>
    <p className="p">{amount}</p>
    <p className="p">{updatedAt}</p>
    <p className="p">{created_by}</p>
    <div><button>Del</button><button>Edit</button></div> </li>
}


export default ListItem