var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id": "001",
        "text": "Eggs"
    },
    {
        "id": "002",
        "text": "Milk"
    },
    {
        "id": "003",
        "text": "Bacon"
    },
    {
        "id": "004",
        "text": "Frogs Legs"
    }
]

app.get('/ingredients', function(request, response) {
    response.send(ingredients);   
});

app.post('/ingredients', function(req, res) {
   var ingredient = req.body;
    if (!ingredient || ingredient.text === "") {
        res.status(500).send({error: "Your ingredient must have a text"});
    } else {
        ingredients.push(ingredient);
        res.status(200).send(ingredient);
    }
});

app.put('/ingredients/:ingredientId', function(req, res) {
    
//    var ingredientId = req.params.ingredientId;
    var newText = req.body.text;
    
    if (!newText || newText === "") {
        res.status(500).send({error:"You must provide ingredient text"});  
        
    } else {
        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            
            if (ing.id === req.params.ingredientId) {
                ing.text = newText;
                objectFound = true;
                break;
            }        
        }
        
        if (!objectFound) {
            res.status(500).send({error:"Ingredient Id not found"});
            
        } else {
            res.send(ingredients);
        }
    }    
});

app.delete('/ingredients/:ingredientId', function(req,res) {

        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            
            if (ing.id === req.params.ingredientId) {
                ingredients.splice(ingredients.findIndex(v => v.id === ing.id), 1);
                objectFound = true;
                break;
            }        
        }
        
        if (!objectFound) {
            res.status(500).send({error:"Ingredient Id not found"});
            
        } else {
            res.send(ingredients);
        }   
});

app.listen(3000, function() {
    console.log('First API running on port 3000!');
});
