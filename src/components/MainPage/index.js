import { Component } from "react";
import { ColorRing } from 'react-loader-spinner'
import ListItem from  "../ListItem"
import Edit from "../Edit"
import PostData from "../PostData"
import './index.css'


class MainPage extends Component {

    state = {arrayList:[],startIndedx:0 ,putOb:{} ,postOb:{}, endIndex:5,isLoading:true,showEdit:false,showPost:false}

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
      
      this.setState(pre => ({...pre,showEdit:true,putOb:editOb}))
    }
    
    refreshPage = () =>{
      console.log("Hi refresh")
      this.setState({isLoading:true,showEdit:false,showPost:false})
      this.getData()
    }
    showAdd = () =>{
      this.setState({showPost:true})
    }

    nextPage = () => {
      const  {arrayList,endIndex} = this.state
      const a  = (arrayList.length >  endIndex  ) ? this.setState( pre => ({...pre, startIndedx:(pre.startIndedx + 5 ), endIndex:(pre.endIndex + 5)})) : ''
      console.log("next")
   
  }
  
  prePage = () => {
        const {startIndedx} = this.state
        const a  = (startIndedx >=5) ? this.setState( pre => ({...pre, startIndedx:(pre.startIndedx - 5 ), endIndex:(pre.endIndex - 5)})) : ''
        console.log("next")
    }


    render () {
          const {arrayList,isLoading,showEdit,putOb,showPost,startIndedx,endIndex} = this.state
              const onlyShow = arrayList.slice(startIndedx,endIndex)
        return (
          <>
            <div className="main">
                <div className="row-nor apart">
                  <h1>MY EXPENSE MANEGER </h1> 
                  <button type="button" className="add" onClick={this.showAdd}>+ New Expense</button>
                </div>
              
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
                    {onlyShow.map(each=> <ListItem details={each} key={each._id} triggerDel={this.delFromDb} triggerPut={this.putInDb}/>)}

                </ul>
                <button type="button" className="next" onClick={this.prePage}>Pre</button>
                <button type="button" className="pre" onClick={this.nextPage}>Next </button>
            </div>
            {showEdit && <Edit putDetails={putOb} refreshPut={this.refreshPage} key={putOb._id} />}
            {showPost && <PostData  refreshPost={this.refreshPage} key="eferf456" />}
            </>
        )
    }
}

export default MainPage
