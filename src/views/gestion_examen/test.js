import React, { useState } from 'react'
import 'src/views/gestion_examen/gestion_examen.css'
import gestion_examen from './gestion_examen'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown, cilAvTimer, cilExternalLink, cilList } from '@coreui/icons'

function Quizz() {
  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false },
      ],
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    {
      questionText: 'The iPhone was created by which company?',
      answerOptions: [
        { answerText: 'Apple', isCorrect: true },
        { answerText: 'Intel', isCorrect: false },
        { answerText: 'Amazon', isCorrect: false },
        { answerText: 'Microsoft', isCorrect: false },
      ],
    },
    {
      questionText: 'How many Harry Potter books are there?',
      answerOptions: [
        { answerText: '1', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '6', isCorrect: false },
        { answerText: '7', isCorrect: true },
      ],
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }
  return (
    <div className="examen" style={{ float: 'center', align: 'center' }}>
      <div className="app">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentQuestion].questionText}</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <div key={index}>
                  <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                    {answerOption.answerText}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
function DisplayComponent(s) {
  const h = () => {
    if (s.time.h === 0) {
      return ''
    } else {
      return <span>{s.time.h >= 10 ? s.time.h : '0' + s.time.h}</span>
    }
  }
  return (
    <div
      style={{
        color: 'black',
        border: 'solid black 2px',
        width: '160px',
        height: '70px',
        'border-radius': '5px',
        'text-align': 'center',
        paddingTop: '15px',
        align: 'right',
        float: 'right',
      }}
    >
      <CIcon
        icon={cilAvTimer}
        customClassName="nav-icon"
        style={{
          width: 28,
          height: 28,
          'margin-right': 5,
          'padding-buttom': 15,
        }}
      />
      {h()}&nbsp;&nbsp;
      <span style={{ color: 'black', 'font-weight': 'bold', 'font-size': '1.4em' }}>
        {s.time.m >= 10 ? s.time.m : '0' + s.time.m}
      </span>
      &nbsp;:&nbsp;
      <span style={{ color: 'black', 'font-weight': 'bold', 'font-size': '1.4em' }}>
        {s.time.s >= 10 ? s.time.s : '0' + s.time.s}
      </span>
      &nbsp;:&nbsp;
      <span style={{ color: 'black', 'font-weight': 'bold', 'font-size': '1.4em' }}>
        {s.time.ms >= 10 ? s.time.ms : '0' + s.time.ms}
      </span>
    </div>
  )
}

function BtnComponent(s) {
  return (
    <div>
      {s.status === 0 ? (
        <button className="stopwatch-btn stopwatch-btn-gre" onClick={s.start}>
          Start
        </button>
      ) : (
        ''
      )}

      {s.status === 1 ? (
        <div>
          <button className="stopwatch-btn stopwatch-btn-yel" onClick={s.reset}>
            Reset
          </button>
          {/*  <button className="stopwatch-btn stopwatch-btn-red" onClick={s.stop}>
            Stop
          </button> */}
          <Quizz />
        </div>
      ) : (
        ''
      )}

      {s.status === 2 ? (
        <div>
          <button className="stopwatch-btn stopwatch-btn-gre" onClick={s.resume}>
            Resume
          </button>
          <button className="stopwatch-btn stopwatch-btn-yel" onClick={s.reset}>
            Reset
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [interv, setInterv] = useState()
  const [status, setStatus] = useState(0)
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run()
    setStatus(1)
    setInterv(setInterval(run, 10))
  }

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h

  const run = () => {
    if (updatedM === 60) {
      updatedH++
      updatedM = 0
    }
    if (updatedS === 60) {
      updatedM++
      updatedS = 0
    }
    if (updatedMs === 100) {
      updatedS++
      updatedMs = 0
    }
    updatedMs++
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH })
  }

  const stop = () => {
    clearInterval(interv)
    setStatus(2)
  }

  const reset = () => {
    clearInterval(interv)
    setStatus(0)
    setTime({ ms: 0, s: 0, m: 0, h: 0 })
  }

  const resume = () => start()

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <div style={{}}>
            <DisplayComponent time={time} />
          </div>
          <div
            style={{
              margin: '0 auto',
              'max-width': '1000px',
            }}
          >
            {time.s === 0 && time.m === 0 && time.ms === 0 ? (
              <button onClick={() => start()}>Commencer</button>
            ) : (
              <div>{time.m >= 1 ? <p>kamalna</p> : <Quizz />}</div>
            )}
            {/*             <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start} />
             */}{' '}
            {/*             {time.m >= 1 ? <p>kamalna</p> : <Quizz />}
             */}{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
