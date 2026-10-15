/* ============================================
   ORÇAMENTO VIOLET WAVE
   - Adiciona itens numa lista
   - Remove itens
   - Calcula subtotal, desconto e total final
   ============================================ */

/* Array que guarda os itens do orçamento */
var itens = []

/* ---------- FUNÇÃO: MOSTRAR ITENS NA TELA ---------- */
function mostrarItens() {
    var lista = document.getElementById('lista-itens')
    lista.innerHTML = ''

    /* Se não tem itens, mostra mensagem */
    if (itens.length === 0) {
        lista.innerHTML = '<li class="lista-vazia">Nenhum item adicionado ainda...</li>'
        return
    }

    /* Cria um <li> para cada item */
    for (var i = 0; i < itens.length; i++) {
        var li = document.createElement('li')
        li.innerHTML =
            '<span class="item-nome">' + itens[i].nome + '</span>' +
            '<span class="item-valor">R$ ' + itens[i].valor.toFixed(2) + '</span>' +
            '<button class="btn-remover" onclick="removerItem(' + i + ')">🗑️</button>'
        lista.appendChild(li)
    }
}

/* ---------- FUNÇÃO: ADICIONAR ITEM ---------- */
function adicionarItem() {
    var nome = document.getElementById('produto').value
    var valor = parseFloat(document.getElementById('valor').value)

    /* Validação simples */
    if (nome === '' || isNaN(valor) || valor <= 0) {
        alert('Preencha o nome e um valor válido!')
        return
    }

    /* Adiciona no array */
    itens.push({ nome: nome, valor: valor })

    /* Limpa os campos */
    document.getElementById('produto').value = ''
    document.getElementById('valor').value = ''

    /* Atualiza a lista na tela */
    mostrarItens()

    console.log('Item adicionado:', nome, valor)
}

/* ---------- FUNÇÃO: REMOVER ITEM ---------- */
function removerItem(indice) {
    itens.splice(indice, 1)
    mostrarItens()
    console.log('Item removido. Itens restantes:', itens.length)
}

/* ---------- FUNÇÃO: CALCULAR TOTAL ---------- */
function calcularTotal() {
    /* Soma todos os itens */
    var subtotal = 0
    for (var i = 0; i < itens.length; i++) {
        subtotal = subtotal + itens[i].valor
    }

    /* Pega o desconto digitado */
    var desconto = parseFloat(document.getElementById('desconto').value) || 0

    /* Calcula o valor do desconto e o total final */
    var valorDesconto = 0
    var totalFinal = 0

    if (desconto > 0) {
        valorDesconto = subtotal * (desconto / 100)
        totalFinal = subtotal - valorDesconto
        console.log('Subtotal:', subtotal, 'Desconto:', valorDesconto, 'Total:', totalFinal)
    }
    else {
        valorDesconto = 0
        totalFinal = subtotal
        console.log('Sem desconto. Total:', totalFinal)
    }

    /* Mostra na tela */
    document.getElementById('result-subtotal').textContent = subtotal.toFixed(2)
    document.getElementById('result-desconto').textContent = valorDesconto.toFixed(2)
    document.getElementById('result-total').textContent = totalFinal.toFixed(2)
}

/* ---------- EVENTOS DOS BOTÕES ---------- */
document.getElementById('add-btn').addEventListener('click', adicionarItem)
document.getElementById('calc-btn').addEventListener('click', calcularTotal)

/* Permite apertar Enter no campo de valor para adicionar */
document.getElementById('valor').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarItem()
    }
})

/* Mostra mensagem inicial */
mostrarItens()