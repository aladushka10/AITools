const requestInput = document.getElementById("request-input")
const requestButton = document.getElementById("request-button")

requestInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log(requestInput.value)
    requestInput.value = ""
  }
})
requestButton.addEventListener("click", () => {
  console.log(requestInput.value)
  requestInput.value = ""
})
const requestInputValue = requestInput.value
if (requestInputValue !== "") console.log(requestInputValue)
