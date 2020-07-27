
console.log('Client side javacript file is loaded!')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm=document.querySelector('form')

const search=document.querySelector('input')

const msgOne=document.getElementById('message-1')
const msgtwo=document.getElementById('message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    msgOne.textContent='Loading...'
    msgtwo.textContent=''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    // console.log(response.json())
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent=(data.error)
        }
        else{
            msgOne.textContent=(data.location)
            msgtwo.textContent=(data.forecast)
        }
    })
})
})




