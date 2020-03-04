var express = require('express')
var jwt = require('jsonwebtoken');

var router = express.Router()

var Hero = require("../models/model");
const SECRET_KEY = '123456';

let heroesArry = [
    {
        id: 1,
        name: "Rumesh",
        likeCount : 10,
        movie:"AAAAA",
        imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.marvel.com%2Fcomics%2Fcharacters&psig=AOvVaw1Tmyx9khV_FmexN410h12I&ust=1582454022279000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIju3uP65OcCFQAAAAAdAAAAABAD",
        superPower: ["Fighting"],
        age: 24
    },

    {
        id: 2,
        name: "Kamal",
        likeCount : 20,
        movie:"BBBB",
        imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoywiz.com%2Flego-marvel-super-heroes-loose-captain-america-minifigure-version-2-loose%2F&psig=AOvVaw1Tmyx9khV_FmexN410h12I&ust=1582454022279000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIju3uP65OcCFQAAAAAdAAAAABAJ",
        superPower: ["Running"],
        age: 24
    },
    {
        id: 3,
        name: "Nimal",
        likeCount : 300,
        movie:"CCCC",
        imageUrl:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.clipart.email%2Fclipart%2Fmarvel-super-hero-clipart-73996.html&psig=AOvVaw1Tmyx9khV_FmexN410h12I&ust=1582454022279000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIju3uP65OcCFQAAAAAdAAAAABAP",
        superPower: ["Flying"],
        age: 24
    },
    {
        id: 4,
        name: "Sunil",
        likeCount : 100,
        movie:"DDDD",
        imageUrl:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FNova-Marvel-Super-Hero-24046599220%2Fphotos%2F&psig=AOvVaw1Tmyx9khV_FmexN410h12I&ust=1582454022279000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIju3uP65OcCFQAAAAAdAAAAABAW",
        superPower: ["Fishing"],
        age: 24
    }
];



router.get('/', (req, res) => {

    res.send(heroesArry);


});

router.get('/:heroId', (req, res) => {

    let heroId = req.params.heroId;

    let hero = heroesArry.find(h => h.id == heroId);

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

    return res.status(200).send(hero);

});


router.put('/:heroId', (req, res) => {

    let heroId = req.params.heroId;

    let hero = heroesArry.find(h => h.id == heroId);

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPower = req.body.superPower;
    if (!NewSuperPower)
        return res.status(422).send({ InvalidInput: "superPower Not Found in Request Body" });

    let NewAge = req.body.age;
    if (!NewAge)
        return res.status(422).send({ InvalidInput: "age Not Found in Request Body" });


    heroesArry.find(h => h.id == heroId).name = NewName;
    heroesArry.find(h => h.id == heroId).superPower = NewSuperPower;
    heroesArry.find(h => h.id == heroId).age = NewAge;

    return res.status(200).send(heroesArry);

});

router.post('/', async (req, res) => {

    // check token in request header and see if the token is valide or not
    const token = req.header("x-jwt-token");
    if(!token){
        return res.status(401).send("Access denied");
    }

    try{        
        jwt.verify(token,SECRET_KEY);
    }
    catch{
        res.status(400).send("Invalide token");
    }


    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPower = req.body.superPower;
    if (!NewSuperPower)
        return res.status(422).send({ InvalidInput: "superPower Not Found in Request Body" });

    let NewAge = req.body.age;
    if (!NewAge)
        return res.status(422).send({ InvalidInput: "age Not Found in Request Body" });

    // let heroToAdd = new Hero ({
    //     name: req.body.name,
    //     birthName: req.body.NewName,
    //     superPowers: req.body.superPowers,
    //     deceased: false, 
    //     likeCount: req.body.likeCount,
    //     movies: req.body.movies
    // });

    let heroToAdd = new Hero ({
        name: NewName,
        birthName: NewAge,
        superPowers: [NewSuperPower],
        deceased: false, 
        likeCount: 50,
        movies: ["Moives"]
    });

    heroToAdd = await heroToAdd.save()

    heroToAdd.save()
    //heroesArry.push(newHero);

    return res.status(200).send(heroToAdd);

});


router.delete('/:heroId', (req, res) => {

    let heroId = req.params.heroId;

    let hero = heroesArry.find(h => h.id == heroId);

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

    let index = heroesArry.indexOf(hero);
    heroesArry.splice(index, 1);

    return res.status(200).send(hero);

});

module.exports = router;