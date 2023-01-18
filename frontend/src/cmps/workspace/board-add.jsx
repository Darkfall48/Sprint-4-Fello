import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../../services/connection/event-bus.service"

import React from 'react';
import { boardService } from "../../services/board/board.service.local"
import { addBoard } from "../../store/actions/board.actions"


export function BoardAdd({ onCloseModal }) {

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
        // navigate(`/board/${boardToAdd._id}`)

    }

    function changeBoard(imgUrl, color) {

        boardToAdd.style.backgroundImg = imgUrl
        boardToAdd.style.bgColor = color
        console.log('boardToAdd', boardToAdd);
        if (!boardToAdd.style.bgColor) {
            boardToAdd.style.backgroundImg = imgUrl
            setBoardToAdd((prevBoard) => ({ ...prevBoard, style: { backgroundImg: imgUrl, bgColor: '' } }))
        }

        if (!boardToAdd.style.backgroundImg) {
            boardToAdd.style.bgColor = color
            setBoardToAdd((prevBoard) => ({ ...prevBoard, style: { backgroundImg: '', bgColor: color } }))
        }

    }


    return <section className="board-add">

        {/* <div onClick={() => navigate('/')} className="black-screen"></div> */}

        <section className="todo-add">
            <div className="modal">
                <div className="modal-content">
                    <div className="form-container">

                        <div className="modal-header">
                            <h2>Create board</h2>
                            <button onClick={onCloseModal}>X</button>

                        </div>

                        <div className="board-preview">
                            <div className="img-container" style={boardToAdd?.style?.backgroundImg && { background: `url(${boardToAdd.style.backgroundImg}) center center / cover` } || boardToAdd?.style?.bgColor && { background: boardToAdd.style.bgColor }}>
                                <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="" />
                            </div>
                        </div>

                        <p>Background</p>
                        <div className="btns-cover-img">
                            <button onClick={() => changeBoard('https://images.unsplash.com/photo-1673768501816-6a565f620309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', '')} className="btn-cover-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1673768501816-6a565f620309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjc0MDQ4NDQw&ixlib=rb-4.0.3&q=80&w=400")' }}></button>
                            <button onClick={() => changeBoard('https://images.unsplash.com/photo-1673605124954-132c332de83f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', '')} className="btn-cover-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1673605124954-132c332de83f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjc0MDU1NjQw&ixlib=rb-4.0.3&q=80&w=400")' }}></button>
                            <button onClick={() => changeBoard('https://images.unsplash.com/photo-1673660199123-b793cdee4980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', '')} className="btn-cover-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1673660199123-b793cdee4980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjc0MDU1NjQw&ixlib=rb-4.0.3&q=80&w=400")' }}></button>
                            <button onClick={() => changeBoard('https://images.unsplash.com/photo-1673715852601-987ac8f3b9ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', '')} className="btn-cover-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1673715852601-987ac8f3b9ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjc0MDU1NjQw&ixlib=rb-4.0.3&q=80&w=400")' }}></button>
                        </div>

                        <div className="btns-cover-color">
                            <button onClick={() => changeBoard('', '#5ba4cf')} className="btn-cover-color" style={{ backgroundColor: '#5ba4cf' }}></button>
                            <button onClick={() => changeBoard('', '#f5dd29')} className="btn-cover-color" style={{ backgroundColor: '#f5dd29' }}></button>
                            <button onClick={() => changeBoard('', '#7bc86c')} className="btn-cover-color" style={{ backgroundColor: '#7bc86c' }}></button>
                            <button onClick={() => changeBoard('', '#ef7564')} className="btn-cover-color" style={{ backgroundColor: '#ef7564' }}></button>
                            <button onClick={() => changeBoard('', '#cd8de5')} className="btn-cover-color" style={{ backgroundColor: '#cd8de5' }}></button>
                        </div>


                        <form onSubmit={onSaveBoard}>
                            <label htmlFor="title">Board title<span> *</span></label>
                            <input type="text"
                                name="title"
                                id="title"
                                placeholder="Enter title..."
                                value={boardToAdd.title}
                                onChange={handleChange}
                                required
                            />

                            <div className="add-save-btns" >
                                {boardToAdd.title && <button className="allowed" style={{ cursor: 'pointer' }}> Create </button>}
                                {!boardToAdd.title && <button style={{ cursor: 'not-allowed' }}> Create </button>}
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    </section >
}