import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import {Navigate,useNavigate} from "react-router-dom";

import Register from './Components/register'
import Quiz from './Pages/quiz';
import Score from './Pages/score';

import './App.css';
import  './Styles/register.css';
import './Styles/quiz.css'


function App() {
  const[loggedIn,setLoggedIn]=useState(false);
  const[currentQuestion,setcurrentQuestion]=useState([]);
  const[questionData,setquestionData]=useState([]);
  const[questionNumber,setquestionNumber]=useState(1);
  const[lastPage,setlastPage]=useState(true);
  const[pageCount,setpageCount]=useState(0);
  const[score,setScore]=useState(0);
  const[miniMark,setMiniMark]=useState(0);
  const nav=useNavigate(); 

  const pageNavigate=()=>{
    const tempPage=pageCount;//0
    setpageCount(pageCount+1);//1
    const startIndex=(tempPage+1)*10;//0+1 *10 = 10
    const endIndex=(tempPage+2)*10;//0+2 *10 = 20
    setcurrentQuestion(questionData.slice(startIndex,endIndex)); 
    window.scrollTo(0,0);
    if(questionData.length===(tempPage+2)*10){
      setlastPage(false);
    }
  
}
  const viewScore=()=>{
    nav('/score');
  }
  const questionValidate=async(questionID,selectedAnswer)=>{
    const quesObj=questionData.filter((obj)=>{
      return obj.id===questionID;
    });
    const correctAnswer=quesObj[0].correct_answer;
    const element = document.getElementById(questionID);

    if(correctAnswer===selectedAnswer){
      element.classList.add("correct");
      setScore(score+10);
  
    }
    
    else{
      element.classList.add("incorrect");
    }
    element.classList.add("pointer-event-none");
  }

  const generateId=async (question)=>{
    var finalQuestionList=[];
    question.map(async(obj,index)=>{
      var newId={};
      const id=index+1;
      newId={id:id,...obj};
      finalQuestionList.push(newId);
    });
    setquestionData(finalQuestionList);
    const totalQuestionNo = finalQuestionList.length;
    setMiniMark(totalQuestionNo);
    setcurrentQuestion(finalQuestionList.slice(0,10));
  }
  const fetchQuestionData=async()=>{
    const quesRes = await axios.get('https://opentdb.com/api.php?amount=20').then(res=>{
      return (res.data.results);
    });
    await generateId(quesRes);
  }

  useEffect(()=>{
  if(loggedIn){
    fetchQuestionData();
  }
  },[loggedIn]
  );

  return (
    <div>
        
        <Routes>
        <Route index element={<Register 
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}/>
                                }/>
        <Route path='/quiz' element={loggedIn ?
          <>
            {currentQuestion.map((question)=>(
               <Quiz
               quizQuestion={question}
               questionValidate={questionValidate}
               key={question.id}/>
            ))}
            {
              lastPage &&
              <div className='next text-center'>
              <button type="button" class="btn btn-success" onClick={pageNavigate}>Next</button>
              </div>
            }
            
            <br></br>
            <div className='score col-md-12 text-center'>
              <button type="button" class="btn btn-success" onClick={viewScore}>View Score</button>
            </div>
          </>:<Navigate to='/' />}/>
        <Route path='/score' element={<Score score={score} miniMark={miniMark} />}/>
        </Routes>
       
       
    </div>
  );
}

export default App;

