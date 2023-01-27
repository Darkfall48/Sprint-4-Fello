import { useEffect, useState } from "react"

import { AiOutlineSearch } from 'react-icons/ai'
import { unsplashService } from "../../../services/unsplash.service"
import { Loader } from "../../helpers/loader"

export function SideMenuPhotos({ changeBoard }) {
    const [photos, setPhotos] = useState(null)
    const [search, setSearch] = useState('')

    async function getPhotos() {
        try {
            const photos = await unsplashService.getPhotos(search)
            console.log('photos', photos);
            setPhotos(photos)
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        try {
            getPhotos()
        } catch (err) {
            console.log('Cant get photos', err)
        }
    }, [])

    const onSearchPhotos = (ev) => {
        ev.preventDefault()
        if (!search) return
        setPhotos(null)
        getPhotos(search)
    }

    const handleChange = ({ target }) => {
        setSearch(target.value)
    }

    return <section className="side-menu-photos">
        <form onSubmit={onSearchPhotos}>
            <div className="input-container">
                <input placeholder="Photos" type="text" value={search} onChange={handleChange} />
                <AiOutlineSearch className="search-icon" />
            </div>
        </form>
        {
            photos ?
                <section className="btns-container-change">
                    {photos.map(photo => {
                        return <div
                            key={photo.background}
                            className="btn-change"
                            style={{ background: `url('${photo.thumbnail}') center center / cover` }}
                            onClick={() => changeBoard(photo.background, '')}>
                        </div>
                    })}
                </section>
                : <Loader />
        }

        {/* { photos ? photos.map(photo => {
           return  <div
             key={photo.background}
             className="display hover-darker"
             style={{ background: `url('${photo.thumbnail}') center center / cover` , width: 50 + 'px'}}>
         </div>

        }) : <Loader />} */}

    </section>

}