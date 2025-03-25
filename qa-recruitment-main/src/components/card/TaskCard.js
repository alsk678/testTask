import React from 'react';
import { Card, ProgressBar, Button, Badge } from 'react-bootstrap';
import { getProgressBarValue, getProgressBarVariant, getPriorityBadgeVariant } from "../utils/utils"

const TaskCard = ({ task, onComplete, onRemove }) => {
    return (
        <Card className={`mb-3 custom-card ${task.isCompleted ? 'completed-task' : ''}`}>
            <Card.Img variant="top" src={task.imageUrl} className="card-img-top"/>
            <Card.Body className="card-body-fixed-height">
                <Card.Title>
                    <span className="me-2">{task.title}</span>
                    <Badge pill bg={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                </Card.Title>
                <ProgressBar striped animated
                             variant={getProgressBarVariant(getProgressBarValue(task.estimate))}
                             now={getProgressBarValue(task.estimate)}
                             label={`Hours: ${task.estimate}`}
                             style={{ backgroundColor: 'dark' }}  />
                <div className="small-font">{task.description}</div>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-success" onClick={onComplete} disabled={task.isCompleted}>Done</Button>
                <Button variant="outline-danger" className="ms-2" onClick={onRemove} disabled={task.isCompleted}>Remove</Button>
            </Card.Footer>
        </Card>
    );
};

export default TaskCard;
