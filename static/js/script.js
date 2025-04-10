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
      const add = document.createElement("div");
      const audio = document.createElement("audio");

      audio.controls = true; // Показывает плеер
      audio.src = data.response; // путь, пришедший от сервера, например /static/generated/response1.mp3
      audio.style.width = "300px";

      add.appendChild(audio);
      document.querySelector(".response:last-of-type").appendChild(add);
    }
  }

  const recordButton = document.getElementById("record-button")
let mediaRecorder
let audioChunks = []

recordButton.addEventListener("click", async () => {
  if (!mediaRecorder || mediaRecorder.state === "inactive") {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" })
      audioChunks = []
    
      // 🎧 Создаём аудиоплеер
      const audioURL = URL.createObjectURL(audioBlob)
      const audioPlayer = document.createElement("audio")
      audioPlayer.controls = true
      audioPlayer.src = audioURL
      audioPlayer.style.display = "block"
      audioPlayer.style.margin = "10px 0"
    
      // 💬 Добавляем плеер в диалог до запроса
      const requestDiv = document.createElement("div")
      requestDiv.className = "request-value"
      requestDiv.style.border = "1px solid grey"
      requestDiv.style.borderRadius = "20px"
      requestDiv.style.backgroundColor = "#fff"
      requestDiv.style.padding = "10px"
      requestDiv.appendChild(audioPlayer)
    
      const responseDiv = document.createElement("div")
      responseDiv.className = "response"
      responseDiv.style.border = "1px solid grey"
      responseDiv.style.borderRadius = "20px"
      responseDiv.style.backgroundColor = "#fff"
      responseDiv.style.padding = "10px"
    
      dialogWrap.append(requestDiv, responseDiv)
    
      // 🎯 Отправка аудио на сервер
      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.webm")
    
      const response = await fetch("/api/audio_query", {
        method: "POST",
        body: formData,
      })
    
      const data = await response.json()
    
      if (data.text) {
        requestInput.value = data.text
        processRequest(data.text)
    
        // вставка текста под плеером
        const textP = document.createElement("p")
        textP.innerHTML = marked.parse(data.text)
        requestDiv.appendChild(textP)
      }
    }
    

    mediaRecorder.start()
    recordButton.textContent = "🛑"
  } else if (mediaRecorder.state === "recording") {
    mediaRecorder.stop()
    recordButton.textContent = "🎤"
  }
})
})
