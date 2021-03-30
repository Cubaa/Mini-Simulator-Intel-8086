// Pobieramy z DOM elementy, które są potrzebne do interakcji z JavaScriptem
const registersValueInputs = document.querySelectorAll('.registersValue input')
const registersValueView = document.querySelectorAll('.registersValueView div')  
const btnSetValues =document.querySelector('button.setValues')
const btnUse = document.querySelector("div.btnUse button")
const method = document.getElementById('method-select')
const registersSour = document.getElementById('registersSour-select')
const registersDest = document.getElementById('registersDest-select')
//----------------------------------------------------------------------

const valuesArr = [] // tworzymy tablicę do której będą dodawane wartości nasztch rejestrów

//Funkcja która pobiera wartości rejestrów od użytkownika i wpisuje je do tabelki poglądowej dla odpowiednich rejestrów,
//ponadto sprawdza czy użykownik wpisał wartości, czy nie wpisał pustego stringa i czyści inputy oraz tablicę
const setValues = (e)=>{
    const isEmptyString = valuesArr.some((value)=>{
            return value===""
    })
  
    if(valuesArr.length<4 || isEmptyString)      
        return alert("Set All Values")
    registersValueView.forEach((div, index)=>{
        div.textContent=valuesArr[index]
    })
    valuesArr.length=0
    registersValueInputs.forEach((input, index)=>{
        input.value=""
      })       
}
//--------------------------------------------------
btnSetValues.addEventListener("click", (e)=>setValues(e)) // Ustawienie nasłuchiwania na przycisk i wywołanie funkcji setValues

//Ustawienie dla każdego inputu nasłuchiwania za pomocą pętli forEach, następnie pobranie wartości z każdego inputa i przypisanie odpowiedniemu indeksowi w tablicy tej wartości
registersValueInputs.forEach((input, index)=>{
    
    input.addEventListener("input", (e)=>{
        input.setAttribute('value', e.target.value)
        valuesArr[index]=input.getAttribute('value')
    })
  })   

  //Fukcja MOV przyjmuje w argumentach wartości rejestru źródłowego i docelowego, i za pomocą dwóch instrukcji warunkowych jest sprawdzane czy wartość atrybutu będąca jednym z 4 rejestrów w tabelce poglądowej jest taka sama jak wartość argumentów sour i dest, jeśli tak, to kopiowana jest wartośc z rejestru źródłowego do docelowego
const mov = (sour, dest)=>{
    let sourValue
    registersValueView.forEach((value)=>{
      
        if(value.dataset.name===sour)
            sourValue=value.textContent
    })
    registersValueView.forEach((value)=>{
      
        if(value.dataset.name===dest)
            value.textContent=sourValue
     })
}
//Zadeklarowanie zmiennych
let selectOption
let selectRegisterSour
let selectRegisterDest

//Ustawienie nałuchiwania na klik na przycisk, dzięki któremu jest wykonywana funkcja MOV oraz są pobierane wartości z selectów z tzw rozwijanych list z polami opcji a te wartości to metoda czyli MOV i rejestry żródłowe, i docelowe. Użyłem switcha do wyboru odpwiedniej metody czyli MOV, która jest pobierana z selecta.

  btnUse.addEventListener("click", (e)=>{
    const selectOption = method.options[method.selectedIndex].value  
    const selectRegisterSour = registersSour.options[registersSour.selectedIndex].value  
    const selectRegisterDest = registersDest.options[registersDest.selectedIndex].value
     
    switch(selectOption){
        case 'mov':
            mov(selectRegisterSour, selectRegisterDest)
      }
  })


  