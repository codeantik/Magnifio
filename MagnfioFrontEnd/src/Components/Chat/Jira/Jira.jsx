import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import './jiraDark.css';
// import './jira.css';

export default function Jira() {

    const [jiraData, setJiraData] = useState([]);


    const fetchJiraData = async () => {
        const response = await axios.get('http://54.174.147.70:8080/api/v1/jiraIssues');
        // console.log(response.data.data);
        setJiraData(response.data.data);
    }

    useEffect(() => {
        fetchJiraData();
    }, [])

    return (
        <div className="jiraContainer">
            <h1>JIRA</h1>
            {jiraData?.map((jira, index) => 
                <ExpandableComponentWrapper 
                    key={jira._id}
                    uniqueKey={index}
                    summary={jira.summary}
                    description={jira.description}
                    issueId={jira.issue_id}
                    storyPoint={jira.story_point}
                />
            )}
        </div>
    );
}

const ExpandableComponentWrapper = (props) => {

    const { uniqueKey, summary, description, issueId, storyPoint = 1 } = props;
    const [comments, setComments] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const fetchComments = async () => {
        const response = await axios.get(`http://54.174.147.70:8080/api/v1/jira/${issueId}`);
        console.log(response.data);
        setComments(response.data.data?.comment);
        console.log(comments);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion expanded={expanded === `panel${uniqueKey}`} onChange={handleChange(`panel${uniqueKey}`)} sx={{ marginY: 5}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${uniqueKey}bh-content`}
                id={`panel${uniqueKey}-header`}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{summary}</Typography>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{description}</Typography>
                <Typography sx={{ marginLeft: 20 }}>{storyPoint}</Typography>
            </AccordionSummary>
            <AccordionDetails
                aria-controls={`panel${uniqueKey + 1}a-content`}
                id={`panel${uniqueKey + 1}a-header`}
            >
                {comments?.map((comment, index) =>
                    <ExpandableComponent 
                        key={comment.comment_id}
                        commentBody={comment?.body}
                        index={index + 1}
                    />
                )}
            </AccordionDetails>
        </Accordion>
    );
}


const ExpandableComponent = ({ commentBody, index }) => {
    return (
        <div>
            <h1>{index}</h1>
            <p>{commentBody}</p>
        </div>
    );
            
}