
import React, {Component} from 'react'
import ReactJson from '../React.json';
let inputRef=React.createRef();
let inputrating=React.createRef();
export class NavBar extends Component {
    constructor(){
        super();
        this.state={
            data:null,
            stars:5
        };
    }

    async componentDidMount() {
      try {
         await fetch('../React.json'); 
        this.setState({ data:ReactJson });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    inputname=()=>{
        console.log(inputRef.current.value);
        let Data=this.state.data;
        console.log(Data);
       let NewData= Data.filter((d)=>{
          return d.name===inputRef.current.value;
        })
        
        this.setState({
          data:NewData
        })  
    }
 DeSsorting=()=>{
          let sort1=this.state.data.sort((a,b)=>{
            if(a.name>b.name){
              return -1;
            }
            return 1
          })

          this.setState({
            data:sort1
          })
  }

AcScorting=()=>{
        let sort1=this.state.data.sort((a,b)=>{
          if(a.name>b.name){
            return 1;
          }
          return -1
        })

        this.setState({
          data:sort1
        })
       }   
    
  
  // json=()=>{
  //  
  //      updatedData=updatedData.map((m,index)=>{
  //       if(index<10){
  //         m.stars=this.state.stars;
  //       }
  //       return m;
  //      })
  //      console.log("this is updated data:",updatedData);
  //      this.setState({
  //       data:updatedData
  //      })
  // }

  Details=(ind)=>{
    console.log("value of ind: ",ind)
    console.log("this is value of input rating: ",inputrating);
    let updatedData=[...this.state.data];
    updatedData=updatedData.map((m,index)=>{
          if(index===ind){
            let updateobj={...m,stars:4}
            return updateobj
          //   this.setState({
          //     stars:this.state.stars+1
          //   })
           }
          return m
    })
    this.setState({
      data:updatedData
    })
    
  }
    render() {
      const { data } = this.state;
      console.log(data);
    
      return (
        <div>
          <h1>POI Details</h1>
          <label for="input"></label>
          <input id="input" type="text" ref={inputRef} />
          <button onClick={this.inputname} >Submit</button>
          <lable for="1star"/>
          <input for="1star" type="checkbox"/>1star
          <lable for="2star"/>
          <input for="2star" type="checkbox"/>2star
          <lable for="3star"/>
          <input for="3star" type="checkbox"/>3star
          <lable for="4star"/>
          <input for="4star" type="checkbox"/>4star
          <lable for="5star"/>
          <input for="5star" type="checkbox"/>5star
          
          <button onClick={this.DeSsorting}>DESC</button>
          <button onClick={this.AcScorting}>ASC</button>
         
          {/* <button onClick={this.json}>AddNewJson</button> */}
          {data ? (
            <ul>
              
              {data.map((item, index) => (
                
                <li key={index}>
                  <strong>{item.name}</strong><br />
                  Description: {item.description}<br />
                  Latitude: {item.latitude}<br />
                  Longitude: {item.longitude}<br/>
                  {index<10 ?(<div>
                    Rating:{item.stars=Math.ceil(Math.random()*5)}<br/>
                    Free:{item.free=Math.random()<0.5?"Yes":"No"}<br/>
                    Tags:{item.tags}<br/>
                    <button onClick={()=>this.Details(index)}>Details</button>
                    
             </div>):
               <div>

               </div>

             }
                       
              
              
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      );
    }
}
export default NavBar