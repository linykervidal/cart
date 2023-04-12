// captura de elementos do DOM
let quantidadeSubtotal = document.getElementById("quantidade-subtotal");
let valorSubtotal = document.getElementById("valor-subtotal");
const btnAdd = document.getElementById('btn-adicionar-produto-01')
const inputProduct = document.getElementById('quantidade-produto-01')
const btnSubtract = document.getElementById('btn-subtrair-produto-01')

// variável usada para a interação dos resultados
let subtotalInfo = {
  quantidade: 1,
  valor: 11.66,
};

// manipulando os elementos capturados (funções)
quantidadeSubtotal.innerText = subtotalInfo.quantidade + " item";
valorSubtotal.innerText = subtotalInfo.valor.toLocaleString('pt-br');

// criando funções para automatizar o resultado dos eventos
function attCalcs(element) {
  if (element.target != inputProduct) {
    inputProduct.value = subtotalInfo.quantidade
  }
  valorSubtotal.innerText = subtotalInfo.valor.toFixed(2).toString().replace('.', ',')
  if (subtotalInfo.quantidade == 1) {
    quantidadeSubtotal.innerText = '1 item'
    return
  } else if (inputProduct.value == '') {
    quantidadeSubtotal.innerText = '0 itens'
    return
  }
  quantidadeSubtotal.innerText = subtotalInfo.quantidade + ' itens'
}

function attInput() {
  subtotalInfo.quantidade = inputProduct.value
  subtotalInfo.valor = 11.66 * subtotalInfo.quantidade
  attCalcs(inputProduct)
}

// definir quando devem ser manipulados os elementos (eventos)
btnAdd.addEventListener('click', () => {
  subtotalInfo.quantidade++
  subtotalInfo.valor += 11.66
  attCalcs(btnAdd)
})

btnSubtract.addEventListener('click', () => {
  if (subtotalInfo.quantidade > 0) {
    subtotalInfo.quantidade--
    subtotalInfo.valor -= 11.66
    attCalcs(btnSubtract)
  }
})

inputProduct.addEventListener('keydown', e => {
  if (e.key == ',' || e.key == '.' || e.key == '-') {
    e.preventDefault()
  }
})

inputProduct.addEventListener('keyup', e => {
  if (e.ctrlKey || e.key == 'v') {
    inputProduct.value = inputProduct.value.replace('.', '')
    attInput()
  }
})

inputProduct.addEventListener('paste', e => {
  e.preventDefault()
  const clipboardData = e.clipboardData
  const pastedData = clipboardData.getData('text')
  inputProduct.value = ''
  for (const element of pastedData) {
    if (!isNaN(element)) {
      inputProduct.value += element
    }
  }
  attInput()
})

inputProduct.addEventListener('input', attInput)