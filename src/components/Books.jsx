import React from "react";
import {
    Feed,
    Header,
    Icon,
    Grid,
} from "semantic-ui-react";

// Render book details
export function RenderBook({ book, chapters }) {
    return (
        <Grid>
            <Header className="br-header" textAlign="center">
                {book.name}
            </Header>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Feed className="br-des">
                        { chapters.map((chapter) => {
                            <Feed.Extra text key={chapter.id}>
                                <Icon name="tag" /> {chapter.chapterName}
                            </Feed.Extra>
                        })}
                    </Feed>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
