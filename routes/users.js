const { Router} = require('express');
const router = Router();


router.get('/', async (req,res) => {
    const response = await fetch ('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log(users);
    res.json(users);
});

module.exports = router;