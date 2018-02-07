$("#btn_test").click(function(){

  $.ajax({
    method: "get",
    url: "http://localhost:3000/auth/book",
    headers: {"Content-Type": "application/json", "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3Q3IiwicGFzc3dvcmQiOiIkMmEkMTAkV1pnRC5CdDdVMkcwWUdFS2NrR0YwLndrM3R4N3gwZFN5UkdpRjZFZzBZbW9EREpQZmEzcjYiLCJfaWQiOiI1YTc4NGQ2MzQzYWZmNjQ5NGNlODRjMjUiLCJfX3YiOjAsImlhdCI6MTUxNzg5NjM2NCwiZXhwIjoxNTE3ODk2OTY0fQ.2LeYT0ghfJZeYFjw5alqHcRGNo_q0UdZvTa0oS1LuRE"},
    success: function (result) {
      console.log(result)
    },
    error: function (error) {
      console.log(error)
    }
  })

});