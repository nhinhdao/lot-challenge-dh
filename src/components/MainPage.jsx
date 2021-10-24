import React, { useState } from 'react';
import { Link }                       from 'react-router-dom';
import { Container, Grid, Menu }      from 'semantic-ui-react';
import BookChapters                   from './BookChapters';
import Quizzes                        from "./Quizzes";
import { NAVBAR } from "./Constant";


// Component hosts tab bars
function MainPage({ books, chapters }){
    const [activeTab, setActiveTab] = useState(NAVBAR.CHAPTERS);

    // hide component on when props is loading
    if (books?.length === 0 || chapters?.length === 0){
        return null;
    }

    return (
        <div id='outer-container'>
            <Menu pointing secondary className={"header-font"}>
                <Link to='/'>
                    <Menu.Item
                        className="sub-title header-font"
                        name={ NAVBAR.HOME }
                        active={ activeTab === NAVBAR.HOME }
                        onClick={ () => setActiveTab(NAVBAR.HOME) }/>
                </Link>
                <Menu.Item
                    className="sub-title header-font"
                    name={ NAVBAR.CHAPTERS }
                    active={ activeTab === NAVBAR.CHAPTERS }
                    onClick={ () => setActiveTab(NAVBAR.CHAPTERS) }/>
                <Menu.Item
                    className="sub-title header-font"
                    name={ NAVBAR.QUIZZES }
                    active={ activeTab === NAVBAR.QUIZZES }
                    onClick={ () => setActiveTab(NAVBAR.QUIZZES) }/>
            </Menu>
            <Container id='wrapper'>
                <Grid>
                    <Grid.Row className='searchPage' >
                        <Grid.Column className='btns'>
                            {
                                activeTab === NAVBAR.CHAPTERS &&
                                <BookChapters
                                    books={ books }
                                    chapters={ chapters }
                                />
                            }
                            {
                                activeTab === NAVBAR.QUIZZES &&
                                <Quizzes />
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

export default MainPage;
