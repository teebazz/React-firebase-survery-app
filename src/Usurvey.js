import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');
var firebaseConfig = {
    apiKey: "AIzaSyAMts8CfSiXnjqVeJ_KNjM1GOdN-TKUObw",
    authDomain: "u-servey-56523.firebaseapp.com",
    databaseURL: "https://u-servey-56523.firebaseio.com",
    projectId: "u-servey-56523",
    storageBucket: "u-servey-56523.appspot.com",
    messagingSenderId: "534110364386",
    appId: "1:534110364386:web:1c266009de476e0bbe34bb",
    measurementId: "G-3V5XYCT6TF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export class Usurvey extends Component {
    constructor(props){
        super(props);
        this.state = {
            uuid : uuid.v1(),
            studentName : '',
            answers : {
                answer1 : '',
                answer2 : '',
                answer3 : '',
            },
            isSubmitted : false
        }
    }

    nameSubmit = (e) =>{   
        e.preventDefault();           
        var studentName = this.refs.name.value;
        this.setState({studentName : studentName}, function () {
            console.log(this.state);
        });                     
    }
    answerSelected = (e)=>{
        console.log(e.target.name);
        var answers = this.state.answers;
        if(e.target.name === 'anwser1'){
            // console.log('1');
            answers.answer1 = e.target.value
        } else  if(e.target.name === 'anwser2'){
            answers.answer2 = e.target.value
        }   else  if(e.target.name === 'anwser3'){
            answers.answer3 = e.target.value
        }  
        this.setState({answers : answers},() =>{
            console.log(this.state);
        }) ;
    }


    questionSubmit = (e) => {
        // console.log(this.state);
        e.preventDefault();          
        firebase.database().ref('uSurvery/'+this.state.uuid).set([{
            studentName : this.state.studentName,
            answers : this.state.answers
        }]);
        this.setState({isSubmitted : true});
    }
    reTry = () =>{
        this.setState({isSubmitted : false});
    }
    render() {
        var studentName;
        var questions;    
        var thanks;    
        if(this.state.studentName === ''  && this.state.isSubmitted ===  false){
            studentName = <div>
                <h1>Hey Student, What is your name ?</h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="namy" type="text" placeholder="Enter Your name" ref="name" />
                </form>
            </div>
            questions = ''; 
        }else if(this.state.studentName !=='' && this.state.isSubmitted ===  false ){ 
            studentName = <h2>Welcome to User {this.state.studentName}</h2>;
            questions = <div>
                <h2>Here are some Quesitons</h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What are the courses you like the most ?</label>
                        <hr />
                        <input type="radio" name="anwser1" value="Technology" onChange={this.answerSelected} />Technology
                        <input type="radio" name="anwser1" value="Design" onChange={this.answerSelected} />Design
                        <input type="radio" name="anwser1" value="Marketing" onChange={this.answerSelected} />Marketing
                    </div>
                    <div className="card">                       
                        <label>What Country won the last world cup ?</label>
                        <hr />
                        <input type="radio" name="anwser2" value="France" onChange={this.answerSelected} />France
                        <input type="radio" name="anwser2" value="Germany" onChange={this.answerSelected} />Germany
                        <input type="radio" name="anwser2" value="Nigeria" onChange={this.answerSelected} />Nigeria
                    </div>
                    <div className="card">                       
                        <label>What Currency does Ghaan use ?</label>
                        <hr />
                        <input type="radio" name="anwser3" value="Cefa" onChange={this.answerSelected} />Cefa
                        <input type="radio" name="anwser3" value="Cedi" onChange={this.answerSelected} />Cedi
                        <input type="radio" name="anwser3" value="Naira" onChange={this.answerSelected} />Naira
                    </div>
                    <input type="submit" className="feedback-button" value="Submit" />
                </form>
            </div>
        }else if(this.state.isSubmitted === true && this.state.studentName !== ''){ 
           thanks =<div>
                        <h3>Thank You {studentName}</h3>
                        <button style={{padding: "10px",backgroundColor : 'red'}} onClick={this.reTry}>Try Again</button>
                    </div>
        }
        return (
            <div>
                {studentName}
                -------------------------------------
                {questions}
                {thanks}
            </div>
        )
    }
}

export default Usurvey
