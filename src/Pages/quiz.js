import { useEffect, useState } from "react";

const Quiz=(props)=>{
    const {quizQuestion,questionValidate} = props;
    const [option,setOption]=useState([]);
   
    const generateOptions=async()=>{
        const tempArray = [];
        quizQuestion.incorrect_answers.map((obj)=>{
            tempArray.push(obj);
        })
        tempArray.push(quizQuestion.correct_answer);
        setOption(tempArray.sort());
    }
    const validation=async(event)=>{
        questionValidate(quizQuestion.id,event.target.value);
    }
    
    useEffect(()=>{
        generateOptions();
    },[quizQuestion])
    return(
        <>
            <form>
        <div className="quiz-block container border rounded mt-5 shadow-lg p-3 mb-5 rounded" id={quizQuestion.id} >
            <p className="question text-left shadow p-3 mb-5 bg-body rounded mt-1"><div dangerouslySetInnerHTML={{__html:quizQuestion.question}}></div></p>
            {option.map((opt,index)=>(
                <div className="form-check "key={index}>
                <input className="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={validation} value={opt}/>
                    <label className="form-check-label" for="flexRadioDefault1"> 
                    <div dangerouslySetInnerHTML={{__html:opt}}></div>
                    </label>
                </div>
            )
            )
            }

        </div>
        </form>
 
        </>            
    )
}

export default Quiz;