import { useState } from "react"
import { boardService } from "../../../services/board/board.service"
import { removeBoard, updateBoard } from "../../../store/actions/board.actions"
import { FastAverageColor } from "fast-average-color"
import { CgClose } from "react-icons/cg"
import { IoIosArrowBack } from "react-icons/io"
import { SideMenuPhotos } from "./side-menu-photos"
import { useNavigate } from "react-router-dom"

const fac = new FastAverageColor()

export function BoardMenu({ board, isModalOpen, setIsModalOpen }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isBgMenuOpen, setIsBgMenuOpen] = useState(false)
    const [open, isOpen] = useState(false)
    const [setBackground, onSetBackground] = useState('')
    const navigate = useNavigate()

    function onSetIsMenuOpen() {
        setIsMenuOpen(!isMenuOpen)
    }

    async function onRemoveBoard(boardId) {
        const isSure = window.confirm('are you sure?')
        if (isSure) {
            try {
                await removeBoard(boardId)
                navigate('/board')
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function changeBoard(imgUrl, color) {
        board.style.backgroundImg = imgUrl
        board.style.bgColor = color

        if (!board.style.bgColor) {
            try {
                const color = await fac.getColorAsync(imgUrl)
                board.style.backgroundImg = imgUrl
                board.style.bgColor = color.rgba
                board.style.isLight = color.isLight
                updateBoard(board)
            } catch (err) {
                console.log(err)
            }
        }

        if (!board.style.backgroundImg) {
            board.style.bgColor = color
            updateBoard(board)
        }
    }

    return <section className='board-menu-section'>
        <div className="side-menu-header">
            {!open && !isMenuOpen && !isBgMenuOpen && <button className='side-menu-return-btn 1' onClick={() => { setIsModalOpen(!isModalOpen) }} ><IoIosArrowBack /></button>}
            {!open && isMenuOpen && !isBgMenuOpen && !setBackground && <button className='side-menu-return-btn 2' onClick={() => { setIsMenuOpen(!isMenuOpen) }} ><IoIosArrowBack /></button>}
            {/* {open && <button className='side-menu-return-btn 3' onClick={() => { onSetBackground('') }} ><IoIosArrowBack /></button>} */}
            {!isMenuOpen && <h6>Menu </h6>}
            {setBackground === 'change-bg' && <h6>Change Background </h6>}
            {setBackground === 'colors' && <h6 style={{ marginLeft: 140 + 'px' }}>Colors </h6>}
            {setBackground === 'imgs' && <h6 style={{ marginLeft: 140 + 'px' }}>Photos </h6>}
            <button className='side-menu-close-btn' onClick={() => { setIsModalOpen(!isModalOpen) }}><CgClose /></button>
        </div>
        <hr />

        <div className="content-section">
            {!isMenuOpen && <button onClick={() => { onSetIsMenuOpen() }}> Change background</button>}
            {!isMenuOpen && <hr />}
            {!isMenuOpen && <button onClick={() => { onRemoveBoard(board._id) }}>Remove Board</button>}

            {isMenuOpen && <div className="btns-container" style={setBackground ? { display: 'none' } : { display: 'grid' }}>
                {!setBackground && <div className="background-color-btns">
                    <button onClick={() => onSetBackground('colors')} className="colors-btn"></button>
                    <p>Color</p>
                </div>}

                {!setBackground && <div className="background-img-btns">
                    <button onClick={() => onSetBackground('imgs')} className="imgs-btn"></button>
                    <p>Photos</p>
                </div>}
            </div>}

            {setBackground === 'colors' && <div className="btns-container-change">
                {boardService.getColors().map((color, idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={() => changeBoard('', color)}
                            className="btn-change"
                            style={{ backgroundColor: color }}
                        ></button>
                    )
                })}
            </div>}
            {setBackground === 'imgs' && <SideMenuPhotos changeBoard={changeBoard} />}
        </div>
    </section>
}