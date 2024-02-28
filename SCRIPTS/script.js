document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.querySelector('.button-add-task');
    const input = document.querySelector('.input-task');
    const taskList = document.querySelector('.list-tasks');

    let minhaListaDeItens = [];

    function adicionarNovaTarefa() {
        const novaTarefa = {
            id: Date.now(),
            tarefa: input.value,
            concluida: false,
        };

        minhaListaDeItens.push(novaTarefa);
        input.value = '';
        mostrarTarefas();
    }

    function mostrarTarefas() {
        taskList.innerHTML = '';

        minhaListaDeItens.forEach(item => {
            const tarefaItem = document.createElement('li');
            tarefaItem.classList.add('task');
            if (item.concluida) {
                tarefaItem.classList.add('done');
            }
            tarefaItem.setAttribute('data-id', item.id);

            const checkImg = document.createElement('img');
            checkImg.src = "/TO-DO-List_Jessica_ADA/IMG/check-up-medico.png"; // Corrigindo o caminho da imagem
            checkImg.alt = "check-na-tarefa";
            checkImg.addEventListener('click', () => concluirTarefa(item.id));

            const tarefaTexto = document.createElement('p');
            tarefaTexto.textContent = item.tarefa;

            const trashImg = document.createElement('img');
            trashImg.src = "/TO-DO-List_Jessica_ADA/IMG/bin.png"; 
            trashImg.alt = "tarefa-para-o-lixo";
            trashImg.addEventListener('click', () => deletarItem(item.id));

            tarefaItem.appendChild(checkImg);
            tarefaItem.appendChild(tarefaTexto);
            tarefaItem.appendChild(trashImg);

            taskList.appendChild(tarefaItem);
        });

        salvarListaNoLocalStorage();
    }

    function concluirTarefa(id) {
        const tarefaIndex = minhaListaDeItens.findIndex(item => item.id === id);
        minhaListaDeItens[tarefaIndex].concluida = !minhaListaDeItens[tarefaIndex].concluida;
        mostrarTarefas();
    }

    function deletarItem(id) {
        minhaListaDeItens = minhaListaDeItens.filter(item => item.id !== id);
        mostrarTarefas();
    }

    function salvarListaNoLocalStorage() {
        localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
    }

    function recarregarTarefas() {
        const tarefasDoLocalStorage = localStorage.getItem('lista');
        if (tarefasDoLocalStorage) {
            minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
            mostrarTarefas();
        }
    }

    addButton.addEventListener('click', adicionarNovaTarefa);

    recarregarTarefas();
});
