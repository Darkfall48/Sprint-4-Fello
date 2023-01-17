import { utilService } from '../util.service'
import { storageService } from '../connection/async-storage.service'

const pageSize = 5
const TOY_KEY = 'toyDB'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]
_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getRandomToy,
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  console.log(filterBy)
  return storageService.query(TOY_KEY).then((toys) => {
    let filteredToys = toys
    if (filterBy.name) {
      const regex = new RegExp(filterBy.name, 'i')
      filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
    }
    if (sortBy.name > 0) {
      filteredToys = filteredToys.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortBy.name < 0) {
      filteredToys = filteredToys.sort((a, b) => a.name.localeCompare(b.name))
    }
    // Paging
    // const totalPages = Math.ceil(toys.length / pageSize)
    if (filterBy.pageIdx !== undefined) {
      const startIdx = filterBy.pageIdx * pageSize
      filteredToys = filteredToys.slice(startIdx, pageSize + startIdx)
    }
    return Promise.resolve(filteredToys)
  })
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOY_KEY, toy)
  } else {
    return storageService.post(TOY_KEY, toy)
  }
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = []
    toys.push(_createToy('toy1'))
    toys.push(_createToy('toy2'))
    toys.push(_createToy('toy3'))
    utilService.saveToStorage(TOY_KEY, toys)
  }
}

function _createToy(name) {
  const toy = getRandomToy()
  toy._id = utilService.makeId()
  toy.name = name
  console.log('Toy Created:', toy)
  return toy
}

function getEmptyToy() {
  return { name: '', price: '', labels: [], createdAt: null }
}

function getDefaultFilter() {
  return { name: '', price: '', pageIdx: '' }
}

function getDefaultSort() {
  return { name: '' }
}

function getRandomToy() {
  const toy = getEmptyToy()
  toy.name = 'Random ' + utilService.getRandomIntInclusive(4000, 8000)
  toy.price = utilService.getRandomIntInclusive(1, 500)
  toy.labels = labels
  toy.createdAt = Date.now()
  toy.inStock = utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false
  return toy
}
