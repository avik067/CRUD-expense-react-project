import { Component } from "react";
import './index.css'

class Edit extends Component {
   
   
     
    constructor (props) {
        super(props)
         const {details} = props
         const {_id,name,date_of_expense ,category,amount  } = details
        this.state = {formData:{},nm:name,cat:category,dt:date_of_expense,amt:amount}
        
    }
    submitData = (event) => {
      event.preventDefault()

    }

    changeName= () =>{

    }

    changeCategory = () => {

    }
    changeDate =() => {

    }

    changeAmount = () =>{

    }

    render() {
         const {nm,cat,dt,amt} =this.state
        return (
            <form  className="form" onSubmit={this.submitData}>
                <h1>Edit Expense</h1>
             <p>Name</p>
             <input type="text" onChange={this.changeName} value={nm}/>
             <p>Category</p>
             <input type="text" onChange={this.changeCategory} value={cat}/>
             <p>Date of Expense</p>
             <input type="date" onChange={this.changeDate} value={dt}/>
             <p>Expense Amount</p>
             <input type="text" onChange={this.changeAmount} value={amt}/>
             <br />
             <button>Cancle</button>
             <button type="submit" className="green-but">Create Expense</button>
    </form>
        );
    }
}


export default Edit