import React from 'react';
import { Typography } from '@mui/material';

const Detail = ({ title, detail }) => (
    <Typography>
        <Typography fontWeight="bold" variant="span">
            {title}
        </Typography>
        {detail}
    </Typography>
);

// TODO: You can use this to display/update project details
//       change anything you see fit
const ProjectDetails = () => {
    const p = { id: 1, name: "Project 1", startDate: '01-01-2024', completionDate: '01-10-2024', status: "In Progress", };
    return (
        <div>
            <Typography variant="h3">Project Details</Typography>
            <Detail title={"Project Name:"} detail={p.name} />
            <Detail title={"Start Date:"} detail={p.startDate} />
            <Detail title={"Estimated Completion Date:"} detail={p.completionDate} />
            <Detail title={"Current Status:"} detail={p.status} />
            {/* TODO: Add missing fields and functionality*/}
        </div>
    )
}

export default ProjectDetails;