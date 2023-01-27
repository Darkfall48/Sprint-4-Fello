import { useState } from "react"
import { MdArrowBackIosNew } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { BoardHeader } from "../board-header"
import { boardService } from "../../../services/board/board.service"
import { updateBoard } from "../../../store/actions/board.actions"
import { FastAverageColor } from "fast-average-color"
import { CgClose } from "react-icons/cg"
import { IoIosArrowBack } from "react-icons/io"

const fac = new FastAverageColor()

export function BoardMenu({ board, onCloseModal, isModalOpen, setIsModalOpen }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isBgMenuOpen, setIsBgMenuOpen] = useState(false)
    // const [isModalOpen, setIsModalOpen] = useState('')
    const [setBackground, onSetBackground] = useState('')

    function onCloseMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function onSetIsMenuOpen() {
        setIsMenuOpen(!isMenuOpen)
    }

    async function changeBoard(imgUrl, color) {
        board.style.backgroundImg = imgUrl
        board.style.bgColor = color

        if (!board.style.bgColor) {
            try {
                const color = await fac.getColorAsync(imgUrl)
                board.style.backgroundImg = imgUrl
                board.style.bgColor = color.rgba
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
                { <button className='side-menu-return-btn' onClick={() => { setIsModalOpen(!isModalOpen) }} ><IoIosArrowBack/></button> }
                {!isMenuOpen && <h6>Menu </h6>}
               { setBackground === 'change-bg' && <h6>Change Background </h6>}
               {setBackground === 'colors' && <h6>Colors </h6>}
               {setBackground === 'imgs' && <h6>Photos </h6>}
                <button className='side-menu-close-btn' onClick={() => { setIsModalOpen(!isModalOpen) }}><CgClose /></button>
            </div>
            <hr />
        {!isMenuOpen && <button onClick={() => { onSetIsMenuOpen(); }}> Change background</button>}

        {/* {isMenuOpen && <div className="board-menu-header-content">
            <button onClick={() => { setIsMenuOpen(!isMenuOpen); onSetBackground(!setBackground) }} title="Go back."><MdArrowBackIosNew /></button>
            <h3>Change Background</h3>
            <button onClick={() => { setIsModalOpen(!isModalOpen) }} title="Close the board menu."><GrClose /></button>
        </div>} */}

        {isMenuOpen && <div className="btns-container" style={setBackground ? { display: 'none' }:{ display: 'grid' } }>
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

        {setBackground === 'imgs' &&
            <div className="btns-container-change">
                {boardService.getImages().map((image, idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={() => changeBoard(image, '')}
                            className="btn-change"
                            style={{ backgroundImage: `url(${image})` }}
                        ></button>
                    )
                })}
            </div>}

    </section>
}