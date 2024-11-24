document.addEventListener("DOMContentLoaded", async () => {
  const requestInput = document.getElementById("request-input")
  const requestButton = document.getElementById("request-button")
  const form = document.getElementById("form-request")

  const processRequest = (input) => {
    sendG4FRequest(input)
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()

    requestInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        processRequest(requestInput.value)
        requestInput.value = ""
      }
    })
    requestButton.addEventListener("click", () => {
      processRequest(requestInput.value)
      requestInput.value = ""
    })
  })
})
