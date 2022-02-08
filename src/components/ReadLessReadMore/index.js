import ReactReadMoreReadLess from "react-read-more-read-less";

const ReadLessReadMore = ({ limit, text }) => {
    return (
        <ReactReadMoreReadLess
            charLimit={limit}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
            readMoreClassName={'text'}
            readLessClassName={'text'}
        >
            {text}
        </ReactReadMoreReadLess>
    );
}

export default ReadLessReadMore;