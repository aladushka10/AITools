document.addEventListener("DOMContentLoaded", async () => {
  const requestInput = document.getElementById("request-input")
  const requestButton = document.getElementById("request-button")
  const form = document.getElementById("form-request")

  const processRequest = (input) => {
    sendG4FRequest(input)
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    processRequest(requestInput.value)
    requestInput.value = ""
  })
})
