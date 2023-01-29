import { useEffect, useState } from 'react'
import { FiCopy, FiDownload, FiPrinter, FiShare } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

export function TaskShareModal() {
  const [url, setUrl] = useState('')
  const location = useLocation()
  const type = 'Task' // TODO: Change to board or task correspondingly

  useEffect(() => {
    getUrl()
  }, [])

  async function getUrl() {
    try {
      const { pathname } = location
      const websiteUrl = 'https://team-fello.onrender.com'
      const currUrl = websiteUrl + pathname
      setUrl(currUrl)
      await navigator.clipboard.writeText(currUrl)
      console.log('URL copied to clipboard:', currUrl)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Share this ${type}`,
          url: url,
        })
        console.log(`${type} shared successfully`)
      } catch (error) {
        console.error(`Error sharing ${type}:`, error)
      }
    } else {
      console.log('Web Share API not supported')
    }
  }

  function handlePrint() {
    window.print()
  }

  //   function handleExport() {
  //     const jsonData = JSON.stringify(data)
  //     const blob = new Blob([jsonData], { type: 'application/json' })
  //     const url = URL.createObjectURL(blob)
  //     const link = document.createElement('a')
  //     link.download = `${type}.json`
  //     link.href = url
  //     link.click()
  //   }

  return (
    <div>
      <p>Link to this card </p>
      <input
        type="text"
        title={url}
        defaultValue={url}
        placeholder={url}
        autofocusvalue={url}
      />
      <FiCopy title="Copy url to clipboard" onClick={getUrl} />
      <FiShare title={`Share this ${type}`} onClick={handleShare} />
      <FiPrinter title={`Print this ${type}`} onClick={handlePrint} />
      {/* <FiDownload title={'Export as JSON'} onClick={handleExport} /> */}
    </div>
  )
}
