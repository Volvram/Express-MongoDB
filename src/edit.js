let sendingObject = [];

function displayAll(){
    // Получаем таблицу со страницы
    const table = document.querySelector('.edit-notes');

    // Запрашиваем данные из БД
    async function req(){
        let response = await fetch('http://localhost:8000/notes');
        response = await response.json();

        // Отображаем данные
        response.forEach(note => {
            let string = document.createElement('tr');

            string.innerHTML = `<td style="max-width:500px;"><textarea type='text' style='width: 200px;' name='_id' readonly>${note._id}</textarea></td>
            <td style="max-width:500px;"><input type='text' style='border: 0px;' name='title' value='${note.title}'></td>
            <td style="max-width:500px;"><textarea type='text' style='width: fit-content;' name='text'>${note.text}</textarea></td>`;

            table.append(string);
        });
    }

    req();
}

displayAll();