import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const Survey = () => {
    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState('');
    const [questionThree, setQuestionThree] = useState('');
    const [questionFour, setQuestionFour]= useState('');
    const [questionFive, setQuestionFive] = useState('');
    const [questionSix, setQuestionSix] = useState('');
    const [questionSeven, setQuestionSeven]= useState('');
    const [questionEight, setQuestionEight] = useState('');
    const [surveyError, setSurveyError] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email;

    const onSurveyClick = () => {
        setSurveyError('');
        let valid = true;
        var quesSet = [questionOne,
                       questionTwo,
                       questionThree,
                       questionFour,
                       questionFive,
                       questionSix,
                       questionSeven,
                       questionEight]
        for (let i = 1; i < quesSet.length; i++) {
            if (quesSet[i].length == 0) {
                window.alert('Answer #' + i + ' is empty!')
                valid = false
                break;
            }
        }
        if (valid) {
                window.alert('Form Submitted!');
                navigate( '/profile', { state: { email } })
            }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Personal Survey</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>What is your first name?</label>
                <input
                    placeholder="Enter Response"
                    value={questionOne}
                    onChange={(ev) => setQuestionOne(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>What is your last name?</label>
                <input
                    placeholder="Enter Response"
                    value={questionTwo}
                    onChange={(ev) => setQuestionTwo(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>What is your occupation?</label>
                <input
                    placeholder="Enter Response"
                    value={questionThree}
                    onChange={(ev) => setQuestionThree(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Where is your hometown?</label>
                <input
                    placeholder="Enter Response"
                    value={questionFour}
                    onChange={(ev) => setQuestionFour(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>What is your major?</label>
                <input
                    placeholder="Enter Response"
                    value={questionFive}
                    onChange={(ev) => setQuestionFive(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>What is your track?</label>
                <input
                    placeholder="Enter Response"
                    value={questionSix}
                    onChange={(ev) => setQuestionSix(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Where is your dream vacation?</label>
                <input
                    placeholder="Enter Response"
                    value={questionSeven}
                    onChange={(ev) => setQuestionSeven(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>What is your favorite food?</label>
                <input
                    placeholder="Enter Response"
                    value={questionEight}
                    onChange={(ev) => setQuestionEight(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{surveyError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onSurveyClick}
                    value={'Submit Responses'}
                />
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={() => navigate( '/profile', { state: { email } })}
                    value={'Back to Profile'}
                />
            </div>
        </div>
    );
};

export default Survey;
