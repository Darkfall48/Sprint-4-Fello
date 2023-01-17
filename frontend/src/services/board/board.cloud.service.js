import { userService } from '../user/user.service'
import { httpService } from '../connection/http.service'

const BASE_URL = 'toy/'

export const boardService = {
  query,
  get,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
  getDefaultSort,
  getDefaultPage,
  getFromSearchParams,
  getLabels,
}

async function query({
  filter = getDefaultFilter(),
  sort = getDefaultSort(),
  page = getDefaultPage(),
} = {}) {
  // console.log('Filter:', filter)
  // console.log('Sort:', sort)
  // console.log('Page', page)
  // Getting the values
  const { name, maxPrice, inStock, labels } = filter
  const { sortBy, sortValue } = sort
  const { pageSize, pageIdx } = page

  // Preparing the query params string
  const filterParams = `name=${name}&maxPrice=${maxPrice}&inStock=${inStock}&labels=${labels}`
  const sortParams = `sortBy=${sortBy}&sortValue=${sortValue}`
  const pageParams = `pageSize=${pageSize}&pageIdx=${pageIdx}`

  const queryParams = '?' + filterParams + '&' + sortParams + '&' + pageParams
  try {
    return await httpService.get(BASE_URL + queryParams).then((res) => res)
  } catch (err) {
    throw err
  }
}

async function get(toyId) {
  try {
    return await httpService.get(BASE_URL + toyId)
  } catch (err) {
    throw err
  }
}

async function getRandomToy() {
  try {
    return await httpService.post(BASE_URL)
  } catch (err) {
    throw err
  }
}

async function remove(toyId) {
  try {
    return await httpService.delete(BASE_URL + toyId)
  } catch (err) {
    throw err
  }
}

async function save(toy) {
  const { _id: toyId } = toy
  try {
    if (toyId) return await httpService.put(BASE_URL + toyId, toy)
    return await httpService.post(BASE_URL, toy)
  } catch (err) {
    throw err
  }
}

function getDefaultFilter() {
  return { name: '', maxPrice: '', inStock: '', labels: '' }
}

function getDefaultSort() {
  return { sortBy: '', sortValue: '' }
}

function getDefaultPage() {
  return { pageSize: '', pageIdx: '' }
}

function getEmptyToy() {
  return { name: '', price: '', labels: [], createdAt: null }
}

function getFromSearchParams(searchParams) {
  const filter = { ...getDefaultFilter() }
  const sort = { ...getDefaultSort() }
  const page = { ...getDefaultPage() }

  for (const field in filter) {
    filter[field] = searchParams.get(field) || ''
  }
  for (const field in sort) {
    sort[field] = searchParams.get(field) || ''
  }
  for (const field in page) {
    page[field] = searchParams.get(field) || ''
  }
  return { filter, sort, page }
}

function getLabels() {
  return [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
  ]
}
