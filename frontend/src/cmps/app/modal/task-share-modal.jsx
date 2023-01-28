import { useLocation } from "react-router-dom"

export function TaskShareModal({url}) {
    // [url, setUrl] = useState('')
    // const location = useLocation()

    // async function getUrl() {
    //     try {
    //         const { pathname } = location
    //         const websiteUrl = 'https://team-fello.onrender.com'
    //         const url = websiteUrl + pathname
    //         setUrl(url)
    //         await navigator.clipboard.writeText(url)
    //         console.log('URL was copied to clipboard:', url)
    //     } catch (err) {
    //         console.error('Failed to copy text: ', err)
    //     }
    // }


    return <div>
        <p>Link to this card </p>
        <input type="text" value={'https://team-fello.onrender.com/board'} placeholder={'https://team-fello.onrender.com/board'} 
         autofocusValue={'https://team-fello.onrender.com/board'} 
        />
    </div>
}