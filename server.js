var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send({
        'title':'My First API',
        'message': 'Hello!'
    });
    
});
app.get('/funions', function(req, res) {
    res.send('Yo give me some funions foo!');
    
})

app.listen(3000, function() {
    console.log('First API running on port 3000!');
});
