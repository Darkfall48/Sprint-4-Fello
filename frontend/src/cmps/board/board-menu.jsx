import { useRef, useState } from "react"
import { MdArrowBackIosNew } from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { BoardHeader } from "./board-header"

export function BoardMenu({ board, onCloseModal , isModalOpen, setIsModalOpen}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // const [isModalOpen, setIsModalOpen] = useState('')
    const navRef = useRef()
    const mainRef = useRef()

    function onCloseMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function onSetIsMenuOpen(){
        setIsMenuOpen(!isMenuOpen)
        // navRef.style.width = 250 + "px";
        // mainRef.style.marginLeft = 250 +"px";
    }

    // async function onChangeBackground(imgUrl, color) {
    //     boardToAdd.style.backgroundImg = imgUrl
    //     boardToAdd.style.bgColor = color
    
    //     if (!boardToAdd.style.bgColor) {
    //       try {
    //         const color = await fac.getColorAsync(imgUrl)
    //         boardToAdd.style.backgroundImg = imgUrl
    //         boardToAdd.style.bgColor = color.rgba
    //         setBoardToAdd((prevBoard) => ({
    //           ...prevBoard,
    //           style: { backgroundImg: imgUrl, bgColor: boardToAdd.style.bgColor },
    //         }))
    //       } catch (err) {
    //         console.log(err)
    //       }
    //     }
    
    //     if (!boardToAdd.style.backgroundImg) {
    //       boardToAdd.style.bgColor = color
    //       setBoardToAdd((prevBoard) => ({
    //         ...prevBoard,
    //         style: { backgroundImg: '', bgColor: color },
    //       }))
    //     }
    //   }


    return <section className='board-menu-section'>
    {/* return <section className={isMenuOpen ? 'board-menu-section-open' : 'board-menu-section'}> */}
        {/* style={{background: board.style.backgroundImg? board.style.backgroundImg : board.style.bgColor}} */}
        {!isMenuOpen && <button onClick={() => { onSetIsMenuOpen() }}> Change background</button>}

        {isMenuOpen && <div className="board-menu-header-content">
            <button onClick={() => { setIsMenuOpen(!isMenuOpen) }} title="Go back."><MdArrowBackIosNew /></button>
            <h3>Change Background</h3>
            <button onClick={() => { setIsModalOpen(!isModalOpen) }} title="Close the board menu."><GrClose /></button>
        </div>}

        {isMenuOpen && <div className="btns-container">
            <div className="background-color-btns">
                <button onClick={()=> setIsModalOpen('colors')} className="colors-btn"></button>
                <p>Color</p>
            </div>


            <div className="background-img-btns">
                <button className="imgs-btn"></button>
                <p>Photos</p>
            </div>
        </div>}

    </section>
}