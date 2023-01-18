import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../../services/connection/event-bus.service"

import React from 'react';
import { boardService } from "../../services/board/board.service.local"
import { addBoard } from "../../store/actions/board.actions"


export function BoardAdd({onCloseModal}) {

    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())

    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, name: field } = target
        setBoardToAdd((prevBoard) => ({ ...prevBoard, [field]: value }))
    }

    async function onSaveBoard(ev) {
        ev.preventDefault()
        onCloseModal()
        try {
            await addBoard(boardToAdd)
            console.log('board saved', boardToAdd);
            showSuccessMsg('Board saved!')

        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save board')
        }
        navigate(`/board/${boardToAdd._id}`)

    }

    return <section className="board-add">

        <div onClick={() => navigate('/')} className="black-screen"></div>

        <section className="todo-add">
            <div className="modal">
                <div className="modal-content">
                    <div className="form-container">

                        <h2>Create board</h2>

                        <div className="board-preview">
                            <div className="img-container">
                                <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="" />
                            </div>
                        </div>

                        <p>Background</p>

                        <form onSubmit={onSaveBoard}>
                            <label htmlFor="title">Board title</label>
                            <input type="text"
                                name="title"
                                id="title"
                                placeholder="Enter title..."
                                value={boardToAdd.title}
                                onChange={handleChange}
                                required
                            />

                            <div className="add-save-btns">
                                <button className=""> Create </button>
                            </div>

                        </form>

                        <button onClick={onCloseModal}>X</button>

                    </div>
                </div>
            </div>
        </section>
    </section>
}