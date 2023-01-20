

// import styled from "@emotion/styled"
// import { groupsFromBackend } from "./KanbanData"
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { boardService } from "../services/board/board.service.local"

import React from "react"
import { loadBoards, updateBoard } from "../store/actions/board.actions";
import { useSelector } from "react-redux";


export function AboutUs() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    console.log('boards', boards);
    // const [groups, setGroups] = useState(boardService.getDemoGroups())
    const [groups, setGroups] = useState(boards[0].groups)

    useEffect(() => {
        onLoadBoards()
    }, [])


    async function onLoadBoards() {
        try {
            await loadBoards()
            console.log('loaded boards');

        } catch (err) {
            console.log('err', err);
        }
    }

    console.log('groups', groups);

    const onDragEnd = (result, groups, setColumns) => {
        // console.log('result', result);
        // console.log('groups', groups);
        // console.log('setColumns', setColumns);
        if (!result.destination) return
        const { source, destination } = result
        console.log('source', source);
        console.log('destination', destination);
        if (source.droppableId !== destination.droppableId) {
            // const sourceColumn = groups[source.droppableId]
            const sourceColumn = groups.find(group => group.id === source.droppableId)
            console.log('sourceColumn', sourceColumn);
            // const destColumn = groups[destination.droppableId]
            const destColumn = groups.find(group => group.id === destination.droppableId)
            console.log('destColumn', destColumn);
            const sourceItems = [...sourceColumn.tasks]
            console.log('sourceItems', sourceItems);
            const destItems = [...destColumn.tasks]
            console.log('destItems', destItems);
            const [removed] = sourceItems.splice(source.index, 1)
            console.log('removed', [removed]);
            destItems.splice(destination.index, 0, removed)
            console.log('...groups,[source.droppableId]', ...groups);
            setColumns({
                ...groups, [source.index]: {
                    ...sourceColumn,
                    tasks: sourceItems,
                },
                [destination.index]: {
                    ...destColumn,
                    tasks: destItems,
                },
            })
            updateBoard(boards[0])
            console.log('groups', groups);
        } else {
            const column = groups[source.index]
            console.log('column', column);
            const copiedItems = [...column.tasks]
            console.log('copiedItems', copiedItems);
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...groups,
                [source.index]: {
                    ...column,
                    tasks: copiedItems,
                },
            })
            updateBoard(boards[0])
        }
    }
    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, groups, setGroups)}
        >
            <div>
                <div>
                    {Object.entries(groups).map(([groupId, group], index) => {
                        return (
                            <Droppable key={index} droppableId={group.id}>
                                {provided => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h1>{group.title}</h1>
                                        {group.tasks.map((task, index) => (
                                            <Tasks key={task.id} task={task} index={index} />
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

const Tasks = ({ task, index }) => {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div>
                        <p>{task.title}</p>
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

export default Tasks

