export const utilService = {
  animateCSS,
  makeId,
  makeLorem,
  getRandomMembers,
  getRandomLabels,
  getRandomColor,
  getRandomChosenColor,
  getRandomChosenColors,
  getRandomIntInclusive,
  getDate,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getRandomChosenImg,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomMembers() {
  const Members = ['u101', 'u102', 'u103']

  const num = getRandomIntInclusive(1, Members.length)
  return Members.slice(0, num)
}
function getRandomLabels() {
  const labels = ['l101', 'l102', 'l103', 'l104', 'l105', 'l106']

  const num = getRandomIntInclusive(1, labels.length)
  return labels.slice(0, num)
}

function getRandomColor() {
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 15)]
  }
  return `#${code}`
}

function getRandomChosenColor() {
  const colorArray = [
    '#cd8de5',
    '#ff8ed4',
    '#ef7564',
    '#ffaf3f',
    '#f5dd29',
    '#6deca9',
    '#7bc86c',
    '#29cce5',
    '#5ba4cf',
    '#172b4d',
  ]

  const randomIndex = getRandomIntInclusive(0, colorArray.length - 1)
  return colorArray[randomIndex]
}
function getRandomChosenImg() {
  const imgs = [
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/315d250bcd06a5f6dd93dae1bd19318f/photo-1461896836934-ffe607ba8211.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/129d40831a510981958f7d9a775f8180/photo-1564341505027-b410c159e1b6.jpg',
    'https://images.unsplash.com/photo-1662125208190-b21030e953ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1857&q=80',
    'https://images.unsplash.com/photo-1610886420404-7f72bc3d57d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    'https://images.unsplash.com/photo-1660578570016-d1ad0176e24f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
  ]

  const randomIndex = getRandomIntInclusive(0, colorArray.length - 1)
  return colorArray[randomIndex]
}

function getRandomChosenColors() {
  const colorArray = [
    '#cd8de5',
    '#ff8ed4',
    '#ef7564',
    '#ffaf3f',
    '#f5dd29',
    '#6deca9',
    '#7bc86c',
    '#29cce5',
    '#5ba4cf',
    '#172b4d',
  ]
  const randomLength = getRandomIntInclusive(0, colorArray.length - 1)
  const randomColors = []

  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * colorArray.length)
    randomColors.push(colorArray[randomIndex])
  }

  return randomColors
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function getDate(timeInStamp) {
  var time = new Date(+timeInStamp)
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  var year = time.getFullYear()
  var month = months[time.getMonth()]
  var date = time.getDate()
  //   var hour = a.getHours()
  //   var min = a.getMinutes()
  //   var sec = a.getSeconds()
  var time = date + ' ' + month + ' ' + year
  return time
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function animateCSS(el, animation) {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`

    el.classList.add(`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation()
      el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
    el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}
