const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')

const sumaWynik = document.querySelector('#suma')
const sredniaWynik = document.querySelector('#srednia')
const minWynik = document.querySelector('#min')
const maxWynik = document.querySelector('#max')

const przeliczBtn = document.querySelector('#przelicz')

przeliczBtn.addEventListener('click', () => {
    sumaWynik.innerHTML = 'Suma: '+ (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value))
    sredniaWynik.innerHTML = 'Srednia: ' + (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value))/3
    minWynik.innerHTML = 'Min: ' + Math.min(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value))
    maxWynik.innerHTML = 'Max: ' + Math.max(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value))
})