let ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db){
    // GET-запросы
    app.get('/', (req, res) => {
        let base = db.db('bobrovich');
        res.sendFile(`src/index.html`, null, (error) => {
            if (error) throw error;
        });
    });

    app.get('/notes', (req, res) => {
        let base = db.db('bobrovich');
        base.collection('notes').find({}).toArray((err, result) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            }else{
                res.send(result);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {
        let base = db.db('bobrovich');
        const id = req.params.id;
        const details = {'_id': ObjectId(id)};
        base.collection('notes').findOne(details, (err, item) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            }else{
                console.log(`Note with ID: ${details._id} have been found`);
                res.send(item);
            }
        });
    });

    // POST-запросы
    app.post('/notes', (req, res) => {
        let base = db.db('bobrovich');
        const note = {title: req.body.title, text: req.body.text};
        base.collection('notes').insertOne(note, (err, result) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            }else{
                console.log(`Added note: ${JSON.stringify(note)}`);
                res.send(`Добавлена заметка с ID: ${result.insertedId}.<br><br><a href='../index.html'><button>Вернуться на гланую страницу</button></a>`);
            }
        });

    });
    app.post('/notes/edit', (req, res) => {
        let base = db.db('bobrovich');
        let details = [];
        // Обрабатываем запрос
        let notes = [];

        for (let i = 0; i < req.body._id.length; i++){
            notes.push({});
            details.push({'_id': ObjectId(req.body._id[i])});
        }

        for (let key of Object.keys(req.body)){
            for (let i = 0; i < req.body[key].length; i++){
                if (key == '_id'){
                    notes[i][key] = ObjectId(req.body[key][i]);
                }
                else{
                    notes[i][key] = req.body[key][i];
                }
            }
        }

        // console.log(JSON.stringify(notes));

        notes.forEach((note, index) => {
            base.collection('notes').updateOne(details[index], {$set: note}, (err, result) => {
                if (err){
                    res.send({'error': 'An error has occurred'});
                }else{
                    
                }
            });
        });

        res.send("Данные успешно обновлены.<br><br><a href='../index.html'><button>Вернуться на гланую страницу</button></a>");
    });


    // PUT-запросы
    app.put('/notes/:id', (req, res) => {
        let base = db.db('bobrovich');
        const id = req.params.id;
        const details = {'_id': ObjectId(id)};
        const note = {title: req.body.title, text: req.body.text};

        base.collection('notes').updateOne(details, {$set: note}, (err, result) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            }else{
                console.log(`Note with ID: ${details._id} have been updated`);
                res.send(note);
            }
        });
    });

    // DELETE-запросы
    app.delete('/notes/:id', (req, res) => {
        let base = db.db('bobrovich');
        const id = req.params.id;
        const details = {'_id': ObjectId(id)};
        base.collection('notes').remove(details, (err, item) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            }else{
                console.log(`Note with ID: ${details._id} have been deleted`);
                res.send(`Note with ID: ${details._id} have been deleted`);
            }
        });
    });
};