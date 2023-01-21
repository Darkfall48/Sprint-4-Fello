import { useRef, useState } from "react"
import { MdArrowBackIosNew } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { BoardHeader } from "./board-header"

export function BoardMenu({ board, onCloseModal, isModalOpen }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navRef = useRef()
    const mainRef = useRef()

    function onCloseMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function onSetIsMenuOpen(){
        setIsMenuOpen(!isMenuOpen)
        navRef.style.width = "250px";
        mainRef.style.marginLeft = "250px";
    }



    return <section className='board-menu-section'>
    {/* return <section className={isMenuOpen ? 'board-menu-section-open' : 'board-menu-section'}> */}
        {/* style={{background: board.style.backgroundImg? board.style.backgroundImg : board.style.bgColor}} */}
        {!isMenuOpen && <button onClick={() => { onSetIsMenuOpen() }}> Change background</button>}

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