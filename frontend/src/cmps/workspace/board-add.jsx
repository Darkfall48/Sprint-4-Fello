import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../../services/connection/event-bus.service"

import React from 'react';
import { boardService } from "../../services/board/board.service.local"
import { addBoard } from "../../store/actions/board.actions"


export function BoardAdd() {

    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())
    console.log('boardToAdd', boardToAdd);
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, name: field } = target
        setBoardToAdd((prevBoard) => ({ ...prevBoard, [field]: value }))
    }

    async function onSaveBoard(ev) {
        ev.preventDefault()
        try {
            await addBoard(boardToAdd)
            console.log('board saved', boardToAdd);
            showSuccessMsg('Board saved!')
            navigate('/board/:id')
        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save board')
        }

    }

    return <section className="board-add">

        <div onClick={() => navigate('/board')} className="black-screen"></div>

        <section className="todo-add">
            <div className="modal">
                <div className="modal-content">
                    <div className="form-container">

                        <h2>Create board</h2>

                        <p>Background</p>

                        <form onSubmit={onSaveBoard}>
                            <label htmlFor="name">Board title</label>
                            <input type="text"
                                name="name"
                                id="name"
                                placeholder="Enter name..."
                                value={boardToAdd.name}
                                onChange={handleChange}
                                required
                            />

                            <div className="add-save-btns">
                                <button className="btn"> Create </button>
                            </div>

                        </form>

                        {/* <button className="modal-button-close" onClick={onCloseModal}>Close</button> */}
                    </div>
                </div>
            </div>
        </section>
    </section>
}