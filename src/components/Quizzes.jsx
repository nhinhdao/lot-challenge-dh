import axios                                        from "axios";
import { Button, Divider, Loader, Rating, Segment } from 'semantic-ui-react';
import React, { useEffect, useState }               from "react";
import ysnp from '../assets/ysnp.gif';
import happy from '../assets/happy.gif';
import notbad from '../assets/notbad.gif';
import disappointed from '../assets/disappointed.png';
import { APIHEADER, BASEURL } from "./Constant";

function Quizzes(){
    const initialButtonState = {
        showQuiz: false,
        showPass: false,
        showResult: false,
        showAnswers: false
    }

    const [quotes, setQuotes] = useState([]);
    const [page, setPage] = useState(1);
    const [quoteAnswers, setQuoteAnwers] = useState([]);
    const [numAnswers, setNumAnwers] = useState(0);
    const [buttonState, setButtonState] = useState(initialButtonState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getQuotesAandCharacters();
    }, [page]);

    // get all characters and quotes to prepare for the quiz
    async function getQuotesAandCharacters(){
        setLoading(true);
        const characterUrl = `${BASEURL}/character`;
        const quoteUrl = `${BASEURL}/quote?sort=dialog&page=${page}&limit=5`;
        const charactersResponse = await axios.get(characterUrl, APIHEADER);
        const quotesResponse = await axios.get(quoteUrl, APIHEADER);

        const allCharacters = charactersResponse?.data?.docs ?? [];

        // set up quote with character's name and answers
        const allQuotes = quotesResponse?.data?.docs.map((quote, i) => {
            const arbitraryCharacter = [];

            // find the quote character, then find 3 random characters to populate the answer
            const quoteCharacter = allCharacters.find((character) => character._id === quote.character);
            const otherCharacters = allCharacters.filter((character) => character._id !== quote.character);
            for (let x = 1; x <= 3; x++){
                const randomIndex = Math.floor(Math.random() * otherCharacters.length);
                arbitraryCharacter.push(otherCharacters[randomIndex])
            }

            // sort the answer by name so the order is different for each question
            const answers = arbitraryCharacter.concat(quoteCharacter).sort((a, b) => {
                if (a.name < b.name) return -1
                return a.name > b.name ? 1 : 0
            });

            return {
                ...quote,
                characterName: quoteCharacter.name,
                answers: answers,
                index: i + 1
            };
        });

        setLoading(false);
        setQuotes(allQuotes)
    }

    function populateQuestion(quote){
        const { answers } = quote;

        return (
            <div className="quiz-card">
                <p className="sub-title header-font">"{ quote.dialog.trim() }"</p>
                <div className="btn-group">
                    <Button.Group widths='2' basic>
                        <Button
                            className={`quote-${quote.index}`}
                            basic
                            onClick={(e) => handleButtonClick(e, quote, answers[0].name)}>
                            { answers[0].name }
                        </Button>
                        <Button
                            className={`quote-${quote.index}`}
                            basic
                            onClick={(e) => handleButtonClick(e, quote, answers[1].name)}>
                            { answers[1].name }
                        </Button>
                    </Button.Group>
                    <Button.Group widths='2' basic>
                        <Button
                            className={`quote-${quote.index}`}
                            basic
                            onClick={(e) => handleButtonClick(e, quote, answers[2].name)}>
                            { answers[2].name }
                        </Button>
                        <Button
                            className={`quote-${quote.index}`}
                            basic
                            onClick={(e) => handleButtonClick(e, quote, answers[3].name)}>
                            { answers[3].name }
                        </Button>
                    </Button.Group>
                </div>
            </div>
        )
    }

    function populateQuizzes(){
        return quotes.map((quote) => {
            return (
                <div key={ quote._id }>
                    { populateQuestion(quote) }
                    <Divider hidden />
                </div>
            )
        });
    }

    function handleButtonClick(e, quote, userAnswer){
        const activeButton = document.querySelector(`.quote-${quote.index}.grey`);
        activeButton?.classList.remove("grey");
        e.target.classList.add("grey");

        const isAnswerCorrect =  quote.characterName === userAnswer;
        const answers = {...quoteAnswers, [`Quote-${quote.index}`]: isAnswerCorrect};
        const numAnswers = Object.values(answers).length;

        setNumAnwers(numAnswers);
        setQuoteAnwers(answers);

        if (numAnswers === 5) {
            setButtonState({...initialButtonState, showResult: true});
        }
    }

    function toggleBeginQuiz(){
        setButtonState({...initialButtonState, showQuiz: true});
    }

    function togglePass(){
        setButtonState({...initialButtonState, showPass: true});
    }

    function toggleShowAnswer(){
        setButtonState({...buttonState, showAnswers: !buttonState.showAnswers})
    }

    function toggleNewQuiz(){
        setQuoteAnwers([]);
        setPage(page + 1);
        setButtonState({...initialButtonState, showQuiz: true});
    }

    function renderResult(){
        const correctAnswers = Object.values(quoteAnswers).filter(answer => answer === true).length;
        let image;
        switch (correctAnswers){
            case 5:
                image = <img src={happy} alt="Happy"/>;
                break;
            case 4:
            case 3:
                image = <img src={notbad} width="400" alt="Not Bad" />;
                break;
            default:
                image = <img src={disappointed} alt="Disappointed"/>;
        }

        return (
            <div>
                <div>
                    <p className="sub-title header-font">Your score:</p>
                    <Rating maxRating={5} defaultRating={correctAnswers} icon='heart' size='massive' disabled/>
                </div>
                <Divider hidden />
                { image }
                <Divider hidden/>
            </div>
        )
    }

    function renderAnswers(){
        return quotes.map((quote, index) => {
            return (
                <div key={quote._id}>
                    <span className="sub-title header-font">{index + 1}: "{quote.dialog}"</span>
                    <p className="sub-description header-font">-{quote.characterName}</p>
                    <Divider hidden/>
                </div>
            )
        })
    }

    function renderLoading(){
        return (
            <div className="component-content">
                <Loader active inline />
                <p className="sub-title header-font">Loading quizzes...</p>
            </div>
        )
    }

    function renderPass(){
        return (
            <div className="component-content">
                <Divider hidden />
                <img src={ysnp} alt="You shall not pass"/>
                <Divider hidden />
            </div>
        )
    }

    return (
        <div className="quiz">
            <div className="component-title header-font">THE LORD OF THE RINGS QUOTES QUIZ</div>
            <div className="component-content">
                <h3>Think you know the Lord of the Rings by heart? Guess who spoke these lines!</h3>
                <Divider hidden />
                {
                    !buttonState.showQuiz && !buttonState.showResult && !buttonState.showAnswers &&
                    <Button primary onClick={toggleBeginQuiz}>
                        Begin
                    </Button>
                }
                {
                    (buttonState.showResult || buttonState.showAnswers ) &&
                    <Button color="teal" onClick={toggleNewQuiz}>
                        New Quiz
                    </Button>
                }
                {
                    !buttonState.showPass && !buttonState.showResult && !buttonState.showAnswers &&
                    <Button color="grey" onClick={togglePass}>
                        Pass
                    </Button>
                }
                {
                    buttonState.showResult && !buttonState.showAnswers &&
                    <Button basic color="grey" onClick={toggleShowAnswer}>
                        Show Answers
                    </Button>
                }
                {
                    buttonState.showAnswers &&
                    <Button color="grey" onClick={toggleShowAnswer}>
                        Hide Answers
                    </Button>
                }
                {
                    loading && buttonState.showQuiz &&
                    renderLoading()
                }
            </div>
            {
                buttonState.showPass &&
                renderPass()
            }
            {
                !loading && buttonState.showQuiz &&
                <div className="quiz-section">
                    { populateQuizzes() }
                </div>
            }
            {
                buttonState.showResult && !buttonState.showPass &&
                <div className="component-content">
                    { renderResult() }
                </div>
            }
            {
                buttonState.showAnswers &&
                <Segment>
                    { renderAnswers() }
                </Segment>
            }
        </div>
    )
};

export default Quizzes;