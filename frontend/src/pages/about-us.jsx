

// import styled from "@emotion/styled"
// import { tasksFromBackend } from "./KanbanData"
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { boardService } from "../services/board/board.service.local"

import React from "react"


export function AboutUs() {
    const [tasks, setTasks] = useState(boardService.getDemoGroups())
    console.log('tasks', tasks);

    const onDragEnd = (result, tasks, setColumns) => {
        if (!result.destination) return
        const { source, destination } = result
        console.log('source', source);
        console.log('destination', destination);
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = tasks[source.droppableId]
            console.log('sourceColumn', sourceColumn);
            const destColumn = tasks[destination.droppableId]
            const sourceItems = [...sourceColumn.tasks]
            const destItems = [...destColumn.tasks]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...tasks,
                [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    tasks: destItems,
                },
            })
        } else {
            const column = tasks[source.droppableId]
            const copiedItems = [...column.tasks]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...tasks,
                [source.droppableId]: {
                    ...column,
                    tasks: copiedItems,
                },
            })
        }
    }
    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, tasks, setTasks)}
        >
            <div>
                <div>
                    {Object.entries(tasks).map(([taskId, task], index) => {
                        return (
                            <Droppable key={index} droppableId={task.id}>
                                {provided => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h1>{task.title}</h1>
                                        {task.tasks.map((task, index) => (
                                            <TaskCard key={task.id} item={task} index={index} />
                                        ))}
                                        {provided.placeholder}
                                    </li>
                                )}
                            </Droppable>
                        )
                    })}
                </div>
            </div>
        </DragDropContext>
    )
}

const TaskCard = ({ item, index }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <p>{item.title}</p>
                        <div className="secondary-details">
                            <p>
                                <span>
                                    {/* {new Date(item.Due_Date).toLocaleDateString("en-us", {
                      month: "short",
                      day: "2-digit",
                    })} */}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default TaskCard