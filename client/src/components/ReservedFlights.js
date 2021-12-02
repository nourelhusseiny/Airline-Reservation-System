import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReservedFlightSummary from './ReservedFlightSummary';
import jwt from 'jsonwebtoken';

var nums=[]; 
class ReservedFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {

        
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].username === this.state.LoggedInUser.username){
            nums.push(res.data[i].flight_number);
            
        }
      }

      axios.get('http://localhost:8082/api/flights').then(
      res =>{
        var data = [];
        
        for (var i = 0; i < res.data.length; i++) {
          for(var j=0 ; j<nums.length;j++){
          if(res.data[i].flight_number === nums[j]){
            data.push(res.data[i]);
            
          }
        }
      } 
      this.setState({
        flights: data
      })

      }

    ).catch(err =>{
      console.log('Error from ReservedFlights2');
    })

      })
      .catch(err =>{
        console.log('Error from ReservedFlights');
      })
    

  };


  render() {
    const flights = this.state.flights;
    
    let flightList;

    if(!flights) {
      flightList = "there is no flight record!";
    } else {
      flightList = flights.map((flight, k) =>
        <ReservedFlightSummary flight={flight} key={k} />
      );
      nums=[];
    }

    return (
      <div className="ShowFlightList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center">Flight List</h2>
              <Link to="/profile" className="btn btn-outline-warning float-left">
                Profile
              </Link>

            </div>

            <div className="col-md-11">
              <hr />
            </div>

          </div>

          <div className="list">
                {flightList}
          </div>
        </div>
      </div>
    );
  }
}

export default ReservedFlights;