// // import { sendG4FRequest } from "./script"
// const requestInput = document.getElementById("request-input")
// const requestButton = document.getElementById("request-button")
// const form = document.getElementById("form-request")
// // const requestValue = document.getElementById("request-value")
// const greeting = document.getElementById("greeting")
// // const response = document.getElementById("response")
// const dialogWrap = document.getElementById("dialogWrap")
// const createRequest = () => {
//   // const responseWrap = document.createElement("div")
//   // responseWrap.id = "responseWrap"
//   // responseWrap.className = "responseWrap"
//   const responseDiv = document.createElement("div")
//   responseDiv.className = "response"
//   const requestValue = document.createElement("div")
//   requestValue.id = "request-value"
//   requestValue.className = "request-value"
//   requestValue.textContent = requestInput.value
//   requestValue.style.border = "1px solid grey"
//   requestValue.style.backgroundColor = "#fff"
//   requestValue.style.borderRadius = "20px"
//   responseDiv.style.border = "1px solid grey"
//   responseDiv.style.borderRadius = "20px"
//   responseDiv.style.backgroundColor = "#fff"
//   requestValue.textContent = requestInput.value

//   // responseWrap.append(responseDiv)
//   dialogWrap.append(requestValue, responseDiv)
// }

// // document.addEventListener("DOMContentLoaded", async () => {})
// const processRequest = (input) => {
//   sendG4FRequest(input)
// }

// form.addEventListener("submit", (event) => {
//   event.preventDefault()
//   processRequest(requestInput.value)
//   // responseWrap.append(responseDiv)
//   greeting.style.display = "none"
//   createRequest()
//   requestInput.value = ""
// })

// // const requestInput = document.getElementById("request-input")
// // const requestButton = document.getElementById("request-button")
// // const form = document.getElementById("form-request")
// // const greeting = document.getElementById("greeting")
// // const dialogWrap = document.getElementById("dialogWrap")

// // const createRequest = () => {
// //   const responseDiv = document.createElement("div")
// //   responseDiv.className = "response"

// //   const requestValue = document.createElement("div")
// //   requestValue.id = "request-value"
// //   requestValue.className = "request-value"
// //   requestValue.style.border = "1px solid grey"
// //   requestValue.style.backgroundColor = "#fff"
// //   requestValue.style.borderRadius = "20px"

// //   // Преобразование ввода в Markdown
// //   // requestValue.innerHTML = marked.parse(requestInput.value)
// //   requestValue.innerHTML = requestInput.value

// //   responseDiv.style.border = "1px solid grey"
// //   responseDiv.style.borderRadius = "20px"
// //   responseDiv.style.backgroundColor = "#fff"

// //   dialogWrap.append(requestValue, responseDiv)
// // }

// // const processRequest = (input) => {
// //   sendG4FRequest(input)
// // }

// // form.addEventListener("submit", (event) => {
// //   event.preventDefault()
// //   processRequest(requestInput.value)
// //   greeting.style.display = "none"
// //   createRequest()
// //   requestInput.value = ""
// // })
