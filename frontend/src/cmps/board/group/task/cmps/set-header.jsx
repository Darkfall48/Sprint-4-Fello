//? Icons
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { MdOutlineLaptop } from 'react-icons/md'
import { FastAverageColor } from 'fast-average-color'
//? Components
import { SetCloseBtn } from './set-close-btn'
import { MainModal } from '../../../../app/main-modal'

export function SetHeader({ task, group }) {
  const { style } = task
  const [modalOpen, setModalOpen] = useState(false)
  const [averageColor, setAverageColor] = useState('')
  const buttonRef = useRef()

  useEffect(() => {
    getAverageColor()
  }, [])

  async function getAverageColor() {
    try {
      const fac = new FastAverageColor()
      const color = await fac.getColorAsync(style?.bgImg)
      setAverageColor(color.rgba)
    } catch (err) {
      console.warn('Cannot get an average color on a solid color', err)
      // throw err
    }
  }

  function onCloseModal() {
    setModalOpen(false)
  }
  // console.log('style', style)
  if (!style?.bgColor && !style?.bgImg)
    return (
      <div className="task-details-header-cover">
        <SetCloseBtn />
      </div>
    )
  return (
    <div
      className="task-details-header-cover"
      style={
        style?.bgImg
          ? {
              background: `url(${style?.bgImg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: averageColor,
            }
          : { background: style?.bgColor }
      }
    >
      {/* <img src={style.bgImg} alt="" /> */}
      <button
        title="Change cover"
        onClick={() => setModalOpen(true)}
        ref={buttonRef}
      >
        <MdOutlineLaptop /> Cover
      </button>
      {modalOpen && (
        <MainModal
          type={'task-cover'}
          modalTitle={'Cover'}
          task={task}
          onCloseModal={onCloseModal}
          group={group}
          buttonRef={buttonRef}
        />
      )}
    </div>
  )
}
