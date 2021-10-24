import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function FrontPage(){
    return (
        <div className="frontpage">
            <div className="headline">
                <p className="quote header-font">"NOT ALL THOSE WHO WANDER ARE LOST"</p>
                <p className="quote-author header-font"><i>- BILBO BAGGINS</i></p>
                <div>
                    <Link to="/home">
                        <Button id="btn-header">ENTER MORDOR</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

