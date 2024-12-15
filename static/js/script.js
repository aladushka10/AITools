document.addEventListener("DOMContentLoaded", () => {
  const requestInput = document.getElementById("request-input")
  const requestButton = document.getElementById("request-button")
  const form = document.getElementById("form-request")
  const greeting = document.getElementById("greeting")
  const dialogWrap = document.getElementById("dialogWrap")

  const createRequest = () => {
    const responseDiv = document.createElement("div")
    responseDiv.className = "response"

    const requestValue = document.createElement("div")
    requestValue.id = "request-value"
    requestValue.className = "request-value"
    requestValue.style.border = "1px solid grey"
    requestValue.style.backgroundColor = "#fff"
    requestValue.style.borderRadius = "20px"

    requestValue.innerHTML = marked.parse(requestInput.value)

    responseDiv.style.border = "1px solid grey"
    responseDiv.style.borderRadius = "20px"
    responseDiv.style.backgroundColor = "#fff"

    dialogWrap.append(requestValue, responseDiv)
  }

  const processRequest = (input) => {
    sendG4FRequest(input)
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    processRequest(requestInput.value)
    greeting.style.display = "none"
    createRequest()
    requestInput.value = ""
  })

  async function sendG4FRequest(input) {
    const response = await fetch("/api/g4f_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    })

    const data = await response.json()
    let toInsert = ""
    for (const symb of data.response) {
      if (symb === "\n") {
        const add = document.createElement("p")
        add.innerHTML = marked.parse(toInsert.trim())
        document.querySelector(".response:last-of-type").append(add)
        toInsert = ""
      } else {
        toInsert += symb
      }
    }
    if (toInsert !== "") {
      const add = document.createElement("p")
      add.innerHTML = marked.parse(toInsert.trim())
      document.querySelector(".response:last-of-type").append(add)
    }
  }
})

// async function sendG4FRequest(input) {
//   const response = await fetch("/api/g4f_query", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ prompt: input }),
//   })

//   const data = await response.json()
//   let toInsert = ""
//   for (const symb of data.response) {
//     if (symb === "\n") {
//       const add = document.createElement("p")
//       add.innerHTML = marked.parse(toInsert.trim())
//       document.querySelector(".response:last-of-type").append(add)
//       toInsert = ""
//     } else {
//       toInsert += symb
//     }
//   }
//   if (toInsert !== "") {
//     const add = document.createElement("p")
//     add.innerHTML = marked.parse(toInsert.trim())
//     document.querySelector(".response:last-of-type").append(add)
//   }
// }

// async function sendG4FRequest(input) {
//   const response = await fetch("/api/g4f_query", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ prompt: input }),
//   })

//   console.log(input)
//   const data = await response.json()
//   console.log(data)
//   let toInsert = ""
//   for (symb of data.response) {
//     if (symb == "\n") {
//       let add = document.createElement("p")
//       let finalToInsert = ""
//       let i = 0
//       for (i; i < toInsert.length; ++i) {
//         if (toInsert[i] == " ") {
//           finalToInsert += "&nbsp"
//         } else {
//           break
//         }
//       }
//       for (i; i < toInsert.length; ++i) finalToInsert += toInsert[i]
//       add.innerHTML = marked.parse(finalToInsert)
//       document.querySelector(".response:last-of-type").append(add)
//       toInsert = ""
//     } else {
//       toInsert += symb
//     }
//   }
//   if (toInsert != "") {
//     let add = document.createElement("p")
//     let finalToInsert = ""
//     let i = 0
//     for (i; i < toInsert.length; ++i) {
//       if (toInsert[i] == " ") {
//         finalToInsert += "&nbsp"
//       } else {
//         break
//       }
//     }
//     for (i; i < toInsert.length; ++i) finalToInsert += toInsert[i]
//     add.innerHTML = marked.parse(finalToInsert)
//     document.querySelector(".response:last-of-type").append(add)
//     toInsert = ""
//   }
// }
