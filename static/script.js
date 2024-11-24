
async function sendG4FRequest(input) {
  const response = await fetch("/api/g4f_query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: input }),
  })

  console.log(input)
  const data = await response.json()
  console.log(data)
  let toInsert = ""
  for (symb of data.response) {
    if (symb == '\n') {
        let add = document.createElement("p")
        add.innerHTML = toInsert
        document.getElementById("response").append(add)
        toInsert = ""
    }
    else if (symb == ' ') {
        toInsert += '&nbsp;'
    }
    else {
        toInsert += symb
    }
  }
  if (toInsert != "") {
    let add = document.createElement("p")
    add.innerHTML = toInsert
    document.getElementById("response").append(add)
    toInsert = ""
  }
}
