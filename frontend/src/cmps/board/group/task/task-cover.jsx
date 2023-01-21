import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import React from 'react';

import { boardService } from "../../../../services/board/board.service.local";
import { addBoard, updateBoard } from "../../../../store/actions/board.actions";
import { useSelector } from "react-redux";

// export function BoardAdd({ onCloseModal }) {
export function TaskCover({task}) {

    const board = useSelector((storeState) => storeState.boardModule.board)

    const [coverToEdit, setCoverToEdit] = useState(task)

    function handleChange({ target }) {
        let { value, name: field } = target
        setCoverToEdit((prevBoard) => ({ ...prevBoard, [field]: value }))
    }

    async function onSaveBoard() {
        // ev.preventDefault()
        try {
            await updateBoard(board)
            console.log('board saved', board);

        } catch (err) {
            console.log('err', err)
        }

    }

    function changeCover(imgUrl, color) {

        coverToEdit.style.backgroundImg = imgUrl
        coverToEdit.style.bgColor = color

        if (!coverToEdit.style.bgColor) {
            coverToEdit.style.backgroundImg = imgUrl
            setCoverToEdit((prevBoard) => ({ ...prevBoard, style: { backgroundImg: imgUrl, bgColor: '' } }))
            onSaveBoard()
        }

        if (!coverToEdit.style.backgroundImg) {
            coverToEdit.style.bgColor = color
            setCoverToEdit((prevBoard) => ({ ...prevBoard, style: { backgroundImg: '', bgColor: color } }))
            onSaveBoard()
        }

    }

    function onRemoveCover(){
        coverToEdit.style.bgColor = ''
        coverToEdit.style.backgroundImg = ''
        onSaveBoard()
    }

    console.log('coverToEdit', coverToEdit);
    return <section className="board-add">

        <section className="todo-add">
            {/* <div className="modal" onClick={onCloseModal}> */}
            <div className="modal">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="form-container">

                        <div className="modal-header">
                            <h2>Cover</h2>
                            {/* <button onClick={onCloseModal}>X</button> */}

                        </div>

                        <div className="size-container">
                            <div>one</div>
                            <div>one</div>
                        </div>

                        <div className="remove-container">
                            <button onClick={onRemoveCover}>Remove cover</button>
                        </div>

                        <div className="board-preview">
                            <div className="img-container" style={coverToEdit?.style?.backgroundImg && { background: `url(${coverToEdit.style.backgroundImg}) center center / cover` } || coverToEdit?.style?.bgColor && { background: coverToEdit.style.bgColor }}>
                                <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="" />
                            </div>
                        </div>

                        <p>Background</p>
                        <div className="btns-cover-img">
                            {boardService.getImages().map((image, idx) => {
                                return <button key={idx} onClick={() => changeCover(image, '')} className="btn-cover-img" style={{ backgroundImage: `url(${image})` }}></button>
                            })}
                        </div>

                        <div className="btns-cover-color">
                            {boardService.getColors().map((color, idx) => {
                                return <button key={idx} onClick={() => changeCover('', color)} className="btn-cover-color" style={{ backgroundColor: color }}></button>
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </section >
}