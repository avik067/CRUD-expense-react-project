import { Component } from "react";
import { ColorRing } from 'react-loader-spinner'
import ListItem from  "../ListItem"
import Edit from "../Edit"

import './index.css'


class MainPage extends Component {

    state = {arrayList:[],startIndedx:0 ,putOb:{} ,postOb:{}, endIndex:10,isLoading:true,showEdit:true,showPost:false}

    componentDidMount () {
        this.getData()
    }  
    
    getData = async () => {
      try {
        const rowData = await fetch("https://expense-api-roan.vercel.app/expenses")
        const jsonData = await rowData.json()
        console.log(jsonData)
        this.setState({arrayList:jsonData,isLoading:false})
      }
      catch (e) {
        console.log(e)
      }
    }
   
    delFromDb  = (id) => {
       this.delData(id)
       this.setState({isLoading:true})
    }

    delData = async (id) => {
      const option = {
            method:"DELETE"  
      }
     try {
      const rowData = await fetch(`https://expense-api-roan.vercel.app/expense/${id}/`,option)   
      const jsonData = await rowData.json()
      console.log("deleted",jsonData)
      this.getData()
     }catch(e) {
      console.log(e)
     }     
  }
    
    putInDb = (id) =>{
      const  {arrayList} = this.state

      const editOb= arrayList.find(each => each._id === id )
      console.log(editOb)
      this.setState({showEdit:true,putOb:editOb})
    }
   
    refreshPut = () =>{
       this.getData()
    }


    render () {
              const {arrayList,isLoading,showEdit,putOb} = this.state
        return (
          <>
            <div className="main">
                <h1>MY EXPENSE MANEGER </h1>

                <ul className="table"> 
                    <li className="header-list row-nor"> 
                       <p className="p">Name </p>
                       <p className="p">Category</p>
                       <p className="p">Date of Expense</p>
                       <p className="p">Amount</p>
                       <p className="p">Updated At</p>
                       <p className="p">Created by</p>
                       <p className="button-gap">{}</p>
                    </li>
                    
                    {isLoading && <div className="row-nor center"><ColorRing
                    
                                height="40"
                                width="40"
                                radius="9"
                                color="red"
                                ariaLabel="loading"
                                
                    /></div>}
                    {arrayList.map(each=> <ListItem details={each} key={each._id} triggerDel={this.delFromDb} triggerPut={this.putInDb}/>)}

                </ul>
            </div>
            {showEdit && <Edit refreshPut={this.putInDb} details={putOb} />}
            </>
        )
    }
}

export default MainPage
