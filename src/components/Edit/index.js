import { Component } from "react";
import './index.css'

class Edit extends Component {
   
   
     
    constructor (props) {
        super(props)
         const {putDetails} =props
         const {_id='',name='',date_of_expense='' ,category='',amount=0  } = putDetails
        this.state = {nm:name,id:_id,cat:category,dt:date_of_expense,amt:amount,sendDt:''}
        
    }

    cancleEdit = () => {
        const {refreshPut} = this.props
        refreshPut()
    }


    submitData = async (event) => {
      event.preventDefault()
      const {refreshPut} = this.props
       const {nm,cat,sendDt,amt,id} = this.state
      const jsonOb= {
        name:nm ,
        category:cat,
        amount:amt ,
        date_of_expense:sendDt,
      }

      const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonOb),
      }
     try{
      const response = await fetch(`https://expense-api-roan.vercel.app/expense/${id}/`,options)
      const data = await response.json()
      console.log(data)
      console.log(data.status())
     }
     catch(e) {
        console.log(e)
     }
     refreshPut()

    }

    changeName= (event) =>{
        const nameVal = event.target.value
        console.log(nameVal)
        this.setState({nm:nameVal})
    }

    changeCategory = (event) => {
        const catVal = event.target.value
        console.log(catVal)
        this.setState({cat:catVal})
    }
    changeDate =(event) => {
        const date = event.target.value
        console.log(date)
        const  dateIso = new Date(date)
        const dateVal=dateIso.toISOString()
        const showDate= dateIso.toISOString().slice(0,10)
        console.log(dateVal)
        this.setState({dt:showDate,sendDt:dateVal})
    } 

    changeAmount = (event) =>{
        const amtVal = event.target.value
        console.log(amtVal)
        this.setState({amt:amtVal})
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
             <input type="text"  onFocus={(e) => e.target.type = 'date'} onBlur={(e)=> e.target.type='text'} onChange={this.changeDate} value={dt}/>
             <p>Expense Amount</p>
             <input type="text" onChange={this.changeAmount} value={amt}/>
             <br />
             <button type="button" onClick={this.cancleEdit}>Cancle</button>
             <button type="submit" className="green-but">Create Expense</button>
    </form>
        );
    }
}


export default Edit