import React,{useReducer} from 'react';
import questions from './data/gk.json'
import './App.css';



const initialState = {
  attempts:[],
  currentQuestion: 0 ,
  score: 0,
  showResult: false,
  
 };
function reducer(state, action) {
  switch (action.type) {
    case 'nextQuestion': 
          return {...state, currentQuestion: state.currentQuestion +1 };
    case 'scoreIncr': 
      return {...state, score: state.score +1  };
      case 'ADD_ATTEMPT':
        return {
          ...state,
          attempts: [...state.attempts, action.payload],
        };
    case 'showResult':
     return{...state, showResult: true  };
     case 'reset':
      return {attempts:[],currentQuestion:0,score: 0, showResult: false}
    
    }
    throw Error('Unknown action: ' + action.type);
}


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
const {currentQuestion,score, attempts, showResult}= state;

const handleNextQuestion =(qid, op)=>{ 
  let attempt = {qid: qid, op: op}
// console.log(attempt)
// attempts.push(attempt)
  dispatch({  type: 'ADD_ATTEMPT',
  payload: attempt, });
  // console.log(attempts)
  console.log(op)
  const correct = op === questions[currentQuestion].answerIndex;
  console.log(correct)
  if(correct){
    dispatch({
      type: "scoreIncr",
      score: score + 1
    })
  }
  if (currentQuestion + 1 < questions.length) {
    dispatch({
        type: "nextQuestion",
        currentQuestion: currentQuestion + 1
    });
    return 
}if(currentQuestion +1 === questions.length){
  dispatch({
    type: "showResult",
    showResult: true
  })
  console.log(attempts)

}
}
  // function handleOptionSelection() {
  //   // const nextQuestion = currentQuestion +1;
  //   if(currentQuestion<questions.length){
  //     return     dispatch({ type: 'nextQuestion' });

  //   }
  // }

  // function handleInputChange(e) {
  //   dispatch({
  //     type: 'changed_name',
  //     nextName: e.target.value
  //   }); 
  // }

  return (
    <>
    {!showResult ?(
    <>
     <div>
     <h1>{questions[currentQuestion].statement}</h1>
     </div>
     <div>
     <div>
   {questions[currentQuestion].options.map((op) =>(
   <ul>
     <li key={op}>
       <button onClick={()=>handleNextQuestion(questions[currentQuestion].id, op)} className='btn btn-primary'>{op}</button>

     </li>

   </ul>
    ) )}
     </div>
     <h1> state - {state.currentQuestion}</h1>
     <h1> score - {state.score}</h1>
     <button onClick={()=>handleNextQuestion()}>Next Question</button>
     <button onClick={()=>dispatch({type: 'reset'})}>Reset</button>
   </div>
   </>
   ):
  <div>
   <h1>
    You Scored  {score} / {questions.length}
 </h1>
 <div>
        <h2>Attempts:</h2>
      
        <ul>
          {attempts.map((attempt, index) => (
            
            <li key={index}>
              Attempt {index + 1}:  ID: {attempt.qid}, Option: {attempt.op}
            </li>
          ))}
        
        </ul>
      </div>
      
  </div> }
   </>
  
    // <>
    //   {!showResult ? (
    //     <div className="container">
    //       <div
    //         style={{ width: "100%", display: "flex", justifyContent: "center" }}
    //       >
    //         <h1>Quiz</h1>
    //       </div>
    //       {questions[currentQuestion] && (
    //         <div>
    //           <div className="answerSection">
    //             <div
    //               style={{
    //                 // display: "flex",
    //                 flexWrap: "wrap",
    //                 background: "red",
    //                 borderRadius: "4px",
    //                 margin: "5px",
    //                 color: "white",
    //                 padding: "5px",
    //               }}
    //             >
    //               <div>

    //               <h5> Question {currentQuestion + 1}/{questions.length}{" "}
    //               </h5>
    //               </div>
    //               <div>
    //                 <h5>{questions[currentQuestion].statement}</h5>
    //               </div>
    //             </div>
    //             <ul className="list-group">
    //               {questions[currentQuestion].options.map((op) => (
    //                 <li key={op}>
    //                   <button
    //                     className="list-group-item"
    //                     // className={getOptionClass(questions[currentQuestion].id, op, attempts)}
    //                     onClick={() =>
    //                       handleOptionSelection(
    //                         questions[currentQuestion].id, op )  }
    //                   >
    //                     {op}
    //                   </button>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //       )}
    //       {/* <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button> */}
    //       {/* <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length }>Next</button> */}
    //     </div>
    //   ) : (
    //     <>
    //       <div className="resultDev">
    //         <h1>
    //           {" "}
    //           You scored {score} / out of {questions.length}
    //         </h1>
    //         <div>
    //           <button onClick={() => handleRestButton()}>Try Again</button>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </>
  );
}
