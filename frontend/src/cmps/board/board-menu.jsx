import { useState } from "react"
import { MdArrowBackIosNew } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'

export function BoardMenu({ board, onCloseModal }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onCloseMenu() {
        setIsMenuOpen(!isMenuOpen)
    }


    return <section className='board-menu-section'>
    {/* return <section className={isMenuOpen ? 'board-menu-section-open' : 'board-menu-section'}> */}
        {/* style={{background: board.style.backgroundImg? board.style.backgroundImg : board.style.bgColor}} */}
        {!isMenuOpen && <button onClick={() => { setIsMenuOpen(!isMenuOpen) }}> Change background</button>}

        {isMenuOpen && <div className="board-menu-header-content">
            <button onClick={() => { setIsMenuOpen(!isMenuOpen) }} title="Go back."><MdArrowBackIosNew /></button>
            <h3>Change Background</h3>
            <button title="Close the board menu."><GrClose /></button>
        </div>}

        {isMenuOpen && <div className="btns-container">
            <div className="background-color-btns">
                <button className="colors-btn"></button>
                <p>Color</p>
            </div>
            <div className="background-img-btns">
                <button className="imgs-btn"></button>
                <p>Photos</p>
            </div>
        </div>}
    </section>
}