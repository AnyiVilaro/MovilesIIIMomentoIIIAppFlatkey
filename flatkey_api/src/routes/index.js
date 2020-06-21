const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "name": "App",
        "area": "Moviles III"
    };
	res.send(data);
});

router.post('/', (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;
    if (username && password){
        const response = res.json("Guardado");
    }else{
        const response = res.status(500).json({ error: "There was an error. " });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    res.send('actualizar');
});

router.delete('/:id', (req, res) => {
    console.log(req.params);
    res.send('delete');
});

module.exports = router;