import React, { useRef, useState } from 'react'
import { data } from '../assets/data';
import './Quize.css'
const Quize = () => {

    let [score, setScore] = useState(0);
    let [index, setindex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setlock] = useState(false);
    let [result, setResult] = useState(false);

    const [answerSelected, setAnswerSelected] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];//to access the dom element of each option

    const checkAns = (e, ans) => {
        if (lock == false) {
            setAnswerSelected(true);
            if (question.ans == ans) {
                e.target.classList.add("correct");
                setlock(true);
                setScore(prev => prev + 1)//increament score
            } else {
                e.target.classList.add("incorrect");
                setlock(true);
                option_array[question.ans - 1].current.classList.add("correct");//to display correct option when user chhosen wrong
            }

        }

    }

    const next = () => {
        if (lock == true) {
            if (index == data.length - 1) {
                setResult(true);
                return 0;

            } setAnswerSelected(false);

            setindex(++index);
            setQuestion(data[index]);
            setlock(false);
            option_array.map((option) => {
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
                return null;
            })
        } else {

        }

    }


    const reset = () => {
        setindex(0);
        setQuestion(data[0]);
        setScore(0);
        setlock(false);
        setResult(false);

    }


    return (
        <div className='container'>

            <h1>Quize App</h1>
            <hr />
            {result ? <><h2>You Scored {score} out of {data.length}</h2>
                <button onClick={reset}>Reset</button> </> : <>     <h2>{index + 1}.{question.question}</h2>

                <ul>
                    <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3} </li>
                    <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                </ul>
                <button onClick={next} disabled={!answerSelected} className={!answerSelected ? 'disabled' : ''} >Next</button>
                <div className='index'>{index + 1} of {data.length} questions</div></>}

        </div>
    )
}

export default Quize
