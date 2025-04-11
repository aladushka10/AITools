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
    requestValue.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const processRequest = (input) => {
    sendG4FRequest(input)
  }

  requestButton.addEventListener("click", (event) => {
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
    if (data.model === "text") {
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
    } else if (data.model === "image") {
      const add = document.createElement("div")
      const img = document.createElement("img")
      img.src = data.response
      img.style.width = "400px"
      img.style.height = "400px"
      add.append(img)
      document.querySelector(".response:last-of-type").append(add)
    } else if (data.model === "audio") {
      const add = document.createElement("div")
      const audio = document.createElement("audio")

      audio.controls = true
      audio.src = data.response
      audio.style.width = "300px"

      add.append(audio)
      document.querySelector(".response:last-of-type").append(add)
    }
  }

  const recordButton = document.getElementById("record-button")
  let mediaRecorder
  let audioChunks = []

  recordButton.addEventListener("click", async (event) => {
    greeting.style.display = "none"
    event.preventDefault()
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        console.log("On stop activated")
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" })
        audioChunks = []

        const audioURL = URL.createObjectURL(audioBlob)
        const audioPlayer = document.createElement("audio")
        audioPlayer.controls = true
        audioPlayer.src = audioURL
        audioPlayer.style.display = "block"
        audioPlayer.style.margin = "10px 0"

        const requestDiv = document.createElement("div")
        requestDiv.className = "request-value"
        requestDiv.style.border = "1px solid grey"
        requestDiv.style.borderRadius = "20px"
        requestDiv.style.backgroundColor = "#fff"
        requestDiv.style.padding = "10px"
        requestDiv.append(audioPlayer)

        const responseDiv = document.createElement("div")
        responseDiv.className = "response"
        responseDiv.style.border = "1px solid grey"
        responseDiv.style.borderRadius = "20px"
        responseDiv.style.backgroundColor = "#fff"
        responseDiv.style.padding = "10px"

        dialogWrap.append(requestDiv, responseDiv)
        dialogWrap.scrollTop = dialogWrap.scrollHeight

        const formData = new FormData()
        formData.append("audio", audioBlob, "recording.webm")

        const response = await fetch("/api/audio_query", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (data.text) {
          processRequest(data.text)

          const textP = document.createElement("p")
          textP.innerHTML = marked.parse(data.text)
          requestDiv.append(textP)
        }
      }

      mediaRecorder.start()
      recordButton.style.color = "red"
    } else if (mediaRecorder.state === "recording") {
      mediaRecorder.stop()
      recordButton.style.color = "black"
    }
  })
})
