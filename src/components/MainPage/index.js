import { Component } from "react";

import { Grid } from 'react-loader-spinner'
import ListItem from  "../ListItem"

import './index.css'


class MainPage extends Component {

    state = {arrayList:[],startIndedx:0 , endIndex:10,isLoading:true}

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
   

    render () {
              const {arrayList,isLoading} = this.state
        return (
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
                    {isLoading && <Grid
                    
                                height="80"
                                width="80"
                                radius="9"
                                color="green"
                                ariaLabel="loading"
                                wrapperStyle
                                wrapperClass
                    />}
                    {arrayList.map(each=> <ListItem details={each} key={each.id}/>)}

                </ul>
            </div>
        )
    }
}

export default MainPage
