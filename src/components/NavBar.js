import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react'
import ReactJson from '../React.json';
import { Image, Modal, Placeholder } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faY, faN } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot ,faIdBadge,faL,faA,faO} from '@fortawesome/free-solid-svg-icons';

let inputRef = React.createRef();
let starsRef = React.createRef();
let free = React.createRef();
let inputtags = React.createRef();
let addname=React.createRef();
let addstar=React.createRef();
let addfree=React.createRef();
let addtags=React.createRef();
let addid=React.createRef();
let addlang=React.createRef();
let addlong=React.createRef();
let p = [];
let inputrating = React.createRef();
let checkboxselect = false
let originaldata = []
let tags = ["Hotel", "Resuaulant", "Museum", "Cafe", "Bakery", "Spa", "Hotel", "Musuem", "Cafe", "Resuaulant"]
let show = false
let currentDetails
export class NavBar extends Component {

  constructor(props) {
    super(props); //
    this.state = {
      originalData: null,
      data: null,
      openModal: false,
      openaddmodal:false,
      selectedStars: [],
      selectedfree: [],//
      sortType: "",
    };
  }

  async componentDidMount() {
    try {
      await fetch('../React.json');
      console.log("Reactjson", ReactJson);
      ReactJson.forEach((x) => {
        x.stars = Math.ceil(Math.random() * 5)
        x.free = Math.random() < 0.5 ? "Yes" : "No"
        x.tags = tags
      })
      console.log("Reactjson2", ReactJson);
      this.setState({ data: ReactJson });
      this.setState({ originalData: ReactJson });
      this.originaldata = [...ReactJson];
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  inputname = (e) => {

    e.preventDefault();

    const query = inputRef.current.value.replace(/\s/g, '');

    let Data = this.state.data;

    let originalData = this.state.originalData;

    if (this.state.selectedStars.length > 0 || this.state.sortType.length != "") { // 1elemnt Data array 

      let NewData = Data.filter((item) => {

        const nameWithoutSpace = item.name.replace(/\s/g, '');

        return nameWithoutSpace.toLowerCase().includes(query.toLowerCase());

      })

      this.setState({
        data: NewData
      })

    } else {

      let NewData = originalData.filter((item) => {

        const nameWithoutSpace = item.name.replace(/\s/g, '');

        return nameWithoutSpace.toLowerCase().includes(query.toLowerCase());

      })

      this.setState({
        data: NewData
      })

    }

  }

  DeSsorting = () => {
    let sort1 = this.state.data.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      return 1
    })

    this.setState({
      data: sort1,
      sortType: "deSort"
    })
  }

  AcScorting = () => {
    let sort1 = this.state.data.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1
    })

    this.setState({
      data: sort1,
      sortType: "acSort"
    })
  }

  filterData = (selectedStars) => {
    if (selectedStars.length === 0) {
      this.setState({
        data: ReactJson,
      }); // If no stars are selected, return the original data
    } else {
      const data = ReactJson.filter((item) => selectedStars.includes(item.stars));
      this.setState({
        data: data,
      });
    }
  };


  toggleSelectedStar = (value) => {

    this.setState((prevState) => {

      const updatedSelectedStars = [...prevState.selectedStars];

      const index = updatedSelectedStars.indexOf(value);

      if (index !== -1) {
        // If the value is already in the array, remove it
        updatedSelectedStars.splice(index, 1);
      } else {
        // If the value is not in the array, add it
        updatedSelectedStars.push(value);
      }

      // Filter the data based on selected stars
      const updatedData = this.filterData(updatedSelectedStars);

      return {
        selectedStars: updatedSelectedStars,
        data: updatedData,
      };
    });
  };




  delete = (id) => {
    this.setState((prevState) => {
      const filteredData = prevState.data.filter((item) => item.poiID !== id);
      console.log("data after deletion:", filteredData);
  
      return {
        data: filteredData,
      };
    });
  };

  reset = () => {
    this.setState({
      data: ReactJson,
    })
  }

  opendetails = (item) => {
    this.setState({
      openModal: true
    })
    this.currentDetails = item
    console.log("this.curren valure", this.currentDetails);
  }
  saveDetails = (saveDetails) => {
    let DATA = [...this.state.data]
    console.log("data", DATA);
    console.log("ref", starsRef);
    DATA = DATA.map((usr) => {
      if (saveDetails.poiID === usr.poiID) {
        usr.stars = starsRef.current.value
        usr.free = free.current.value
        p.push(inputtags.current.value);
        usr.tags = p
      }
      this.setState({
        openModal: false,
        data: DATA
      })

    })
  }
   add=()=>{
       this.setState({
        openaddmodal:true,
       })
   }
   ok = () => {
    const { data } = this.state;
  
    const newObj = {
      name: addname.current.value,
      poiID: addid.current.value,
      stars: addstar.current.value,
      free: addfree.current.value,
      latitude:addlang.current.value,
      longitude:addlong.current.value,
    };
  
    const newData = [...data, newObj];
  
    console.log("Data after pushing:", newData);
  
    this.setState({
      data: newData,
      openaddmodal: false,
    });
  };
  
  render() {
    const { data } = this.state;
    //console.log(data);
    return (
      <div>

        <Container>



          <h1 className='heading'>DUBLIN TOURIST PLACES</h1>


          <Form>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <div className='wrapper'>
                    <Form.Control id="input" type="text" ref={inputRef} placeholder='Enter full name to search' />&nbsp;
                    <Button variant="primary" onClick={this.inputname} >Submit</Button>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <div className='wrapper'>
                    <label className='wrapper'>
                      <i className='fa fa-star' aria-hidden='true'></i>
                    </label>
                    <Form.Control type="checkbox" checked={this.state.selectedStars.includes(1)} onChange={() => this.toggleSelectedStar(1)} />
                    <label className='wrapper' >
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                    </label>
                    <Form.Control type="checkbox" checked={this.state.selectedStars.includes(2)} onChange={() => this.toggleSelectedStar(2)} />
                    <label className='wrapper' >
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                    </label>
                    <Form.Control type="checkbox" checked={this.state.selectedStars.includes(3)} onChange={() => this.toggleSelectedStar(3)} />
                    <label className='wrapper'>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                    </label>
                    <Form.Control type="checkbox" checked={this.state.selectedStars.includes(4)} onChange={() => this.toggleSelectedStar(4)} />
                    <label className='wrapper'>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                      <i className='fa fa-star' aria-hidden='true'></i>
                    </label>
                    <Form.Control type="checkbox" checked={this.state.selectedStars.includes(5)} onChange={() => this.toggleSelectedStar(5)} />
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <div className='wrapper'>
                    <Button variant='success' onClick={this.DeSsorting}>DESC</Button >&nbsp;
                    <Button variant='success' onClick={this.AcScorting}>ASC</Button>&nbsp;
                    <Button variant='success' onClick={this.reset}>Reset</Button >&nbsp;
                    <Button variant='success' onClick={this.add}>ADD</Button>
                  </div>

                </Form.Group>
              </Col>
            </Row>



          </Form>





         
          {data ? (
            <div >
              <Table striped bordered hover variant="dark" >
                <thead >
                  <tr >
                    <th className='wrapper2' >Name</th>
                    <th className='wrapper2'  > Description</th>
                    <th className='wrapper2' >Latitude</th>
                    <th className='wrapper2' >Longitude</th>
                    <th className='wrapper2' >Rating</th>
                    <th className='wrapper2' >Free</th>
                    <th className='wrapper2' >Tags</th>
                    <th className='wrapper2' >Details</th>
                    <th className='wrapper2' >Delete</th>

                  </tr>
                </thead>
                <tbody>
                  {data.map((item,index) => (
                    <tr key={item.poiID}>
                      <td className='wrapper3' ><strong>{item.name}</strong></td>
                      <td className='wrapper3' > {item.description}</td>
                      <td className='wrapper3' > {item.latitude}</td>
                      <td className='wrapper3' > {item.longitude}</td>
                      {item.poiID < 10 || item.poiID==26 ? (<td className='wrapper3'>{item.stars}</td>) : <td></td>}
                      {item.poiID < 10 || item.poiID==26 ? (<td className='wrapper3'>{item.free}</td>) : <td></td>}
                      {item.poiID < 10 || item.poiID==26 ? (<td className='wrapper3'>{item.tags.map((usr) => usr + ", ")}</td>) : <td ></td>}
                      {item.poiID < 10 || item.poiID==26 ? (<td><Button variant='warning' onClick={() => this.opendetails(item)}>Details</Button></td>) : <td></td>}
                      <td><Button variant='danger' onClick={() => this.delete(item.poiID)}>Delete</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal show={this.state.openaddmodal}>
                <Modal.Header><Modal.Title>ADD DETAILS</Modal.Title></Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label for="name" /><FontAwesomeIcon icon={faLocationDot} />
                    <input id="name" type="text" ref={addname} placeholder='Location' />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label for="latitude" /><FontAwesomeIcon icon={faL} /><FontAwesomeIcon icon={faA} />
                    <input id="latitude" type="text" ref={addlang} placeholder='Latitute' />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label for="logitude" /><FontAwesomeIcon icon={faL} /><FontAwesomeIcon icon={faO} />
                    <input id="logitude" type="text" ref={addlong}  placeholder='Lognitude'/>
                  </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label for="stars" /><i className='fa fa-star' aria-hidden='true'></i>
                    <input id="stars" type="number"  ref={addstar} placeholder='Stars'/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <label for="free" /><FontAwesomeIcon icon={faY}  />
                    <input id="free" type="text" ref={addfree} Placeholder="YES/NO"/>
                  </Form.Group>
                 
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <label for="PoiID" /><FontAwesomeIcon icon={faIdBadge} />
                    <input id="PoiID" type="text" ref={addid} placeholder='PoiID' />
                  </Form.Group>

                  <Button variant='info' onClick={this.ok}>OK</Button>&nbsp;
                  <Button variant='danger' onClick={()=>this.setState({openaddmodal:false})}>Cancel</Button>
                </Modal.Body>
              </Modal>

              <Modal show={this.state.openModal}>
                <Modal.Header><Modal.Title>Product details</Modal.Title></Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label for="stars" /><i className='fa fa-star' aria-hidden='true'></i>
                    <input id="stars" type="number" defaultValue={this.state.openModal ? this.currentDetails.stars : 0} ref={starsRef} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <label for="free" /><FontAwesomeIcon icon={faY} />
                    <input id="free" type="text" defaultValue={this.state.openModal ? this.currentDetails.free : ""} placeholder='Yes or No' ref={free} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label for="tags" /><FontAwesomeIcon icon={faPen} />
                    <input id="tags" type="textbox" ref={inputtags} defaultValue={this.state.openModal ? this.currentDetails.tags.map((m) => m) : ""} />
                  </Form.Group>
                  <Button variant='success' onClick={() => this.saveDetails(this.currentDetails)}>SAVE</Button>&nbsp;
                  <Button variant='danger' onClick={() => this.setState({ openModal: false })}>Cancel</Button>
                </Modal.Body>
              </Modal>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </Container>
      </div>
    );
  }
}
export default NavBar


