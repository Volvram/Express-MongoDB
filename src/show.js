function displayAll(){
    let table = document.querySelector('.notes');

    async function req() {
        let response = await fetch("http://localhost:8000/notes");
        response = await response.json();

        response.forEach((note, index) => {
            let string = document.createElement('tr');

            string.innerHTML = `<td style="max-width:500px;">${note._id}</td>
            <td style="max-width:500px;">${note.title}</td>
            <td style="max-width:500px;">${note.text}</td>`;

            table.append(string);
        });
    };

    req();
};

displayAll();