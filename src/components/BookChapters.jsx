import React, { useState } from "react";
import { Accordion, Button, Divider, Icon, Input } from "semantic-ui-react";

function BookChapters({ books, chapters }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [chapterItems, setChapterItems] = useState(chapters);

    function searchChapters(searchTerm){
        const searchText = searchTerm.toLowerCase();
        const chapterResults = chapters.filter((chapter) => chapter.chapterName.toLowerCase().includes(searchText));
        setChapterItems(chapterResults);
    }

    function renderBookAccordion(){
        if (searchTerm !== "" && chapterItems.length === 0){
            return (
                <div>
                    <p className="sub-title header-font">No chapters found for "<i>{searchTerm}</i>"</p>
                    <Divider />
                    <p className="sub-title header-font">"Who knows? Have patience. Go where you must go, and hope!"</p>
                    <p className="sub-description header-font">-Gandalf</p>
                </div>
            );
        }

        const panels = [];

        books.forEach((book) => {
            const chaptersByBook = chapterItems.filter((chapter) => chapter.book === book._id);

            if (chaptersByBook.length !== 0) {
                panels.push(renderAccordionItem(book, chaptersByBook));
            }
        })

        return (
            <Accordion
                defaultActiveIndex={[0]}
                panels={panels}
                exclusive={false}
                fluid
            />
        )
    }

    function renderAccordionItem(book, chapters){
        const bookChapters = (
            <ul className="sub-description">
                { chapters.map((chapter) => (
                    <li key={ chapter._id }>{ chapter.chapterName }</li>
                ))}
            </ul>
        );
        return ({
            key: book._id,
            title: {
                content: (<span className="sub-title header-font">Book {book.index}: { book.name }</span>)
            },
            content: {
                content: bookChapters
            },
        });
    }

    function handleSearchTermChange(e){
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        if (searchTerm === ""){
            setChapterItems(chapters);
        }
    }

    // allow searching on enter
    function handleOnKeyPress(e){
        if(e.keyCode === 13){
            searchChapters(searchTerm);
        }
    }

    return (
        <div className="book-chapters">
            <div className="component-title header-font">THE LORD OF THE RINGS BOOKS AND CHAPTERS</div>
            <div className="component-content">
                <Input id="search-input" type='text' placeholder='Search for a chapter' action>
                    <input
                        value={ searchTerm }
                        onChange={ handleSearchTermChange }
                        onKeyDown={handleOnKeyPress}/>
                    <Button onClick={() => searchChapters(searchTerm)}><Icon name="search"/></Button>
                </Input>
            </div>
            <div className="list">
                { renderBookAccordion() }
            </div>
        </div>
    );
};

export default BookChapters;
