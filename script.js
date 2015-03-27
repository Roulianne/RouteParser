

RouteParser.add('user/tibo/dupond/:file', function(){
    alert( this.file);
});

RouteParser.add('user/:prenom/:nom', function(){
    alert( this.nom+' '+this.prenom);
});

RouteParser.add('user/:prenom/', function(){
    alert( this.num);
});

RouteParser.otherwise(function(){
    alert( 'rien vu : ' + this.getQuery());
});

RouteParser.run('user/marice');