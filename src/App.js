import axios                            from "axios";
import React, { useEffect, useState }   from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { APIHEADER, BASEURL }           from "./components/Constant";
import FrontPage                        from './components/FrontPage';
import MainPage                         from "./components/MainPage";
import './styles/App.scss';

function App() {
    const [allChapters, setAllChapters] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getChapters();
        getBooks();
    }, []);


    async function getChapters(){
        const url = `${BASEURL}/chapter`;
        const chaptersResponse = await axios.get(url, APIHEADER);
        const chaptersResult = await chaptersResponse;
        const chapters = chaptersResult?.data?.docs ?? [];

        setAllChapters(chapters);
    }

    async function getBooks(){
        const url = `${BASEURL}/book`;
        const booksResponse = await axios.get(url, APIHEADER);
        const booksResult = await booksResponse;
        const books = booksResult?.data?.docs?.map((book, i) => {
            return {...book, index: i + 1};
        });

        setBooks(books ?? []);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/home"
                        render={() => (
                            <MainPage books={books} chapters={allChapters}/>
                        )}/>
                    <Route exact path="/" component={FrontPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
