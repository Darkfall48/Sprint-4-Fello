import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
import { getActionRemoveReview, getActionAddReview } from '../store/review.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service';

(() => {
    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
        console.log('GOT from socket', review)
        store.dispatch(getActionAddReview(review))
    })
    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
        showSuccessMsg(`New review about me ${review.txt}`)
    })
})()


export const reviewService = {
    add,
    query,
    remove
}

function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return httpService.get(`review${queryStr}`)
    // return storageService.query('review')
}

async function remove(reviewId) {
    await httpService.delete(`review/${reviewId}`)
    // await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {

    const addedReview = await httpService.post(`review`, { txt, aboutUserId })
    userService.saveLocalUser(addedReview.byUser)
    return addedReview
}