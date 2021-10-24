
export const APIHEADER = {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    }
};

export const BASEURL = "https://the-one-api.dev/v2";

export const NAVBAR = {
    HOME: "HOME",
    CHAPTERS: "CHAPTERS",
    QUIZZES: "QUIZZES"
}