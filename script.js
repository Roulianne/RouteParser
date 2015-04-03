

/*****************************************************
 * VARIABLE FUNCTION
 ****************************************************/

// juste fucntion d'affichage
function debug( sMsg){

    var oElement       = document.getElementById("debug");
    oElement.innerHTML += '- ' + sMsg + '<br/>';
}

// function lancer a chaque changemet de hash
function eventListener( sHash){

    RouteParser.run( sHash);

}


/*****************************************************
 * Definition des router / controler
 ****************************************************/

RouteParser.add( 'user/maurice/dupond/:file', function(){

    debug( 'controler -> 1 : ficher de nom '+this.file);

}).add( 'user/:prenom/:nom', function(){

    debug( 'controler -> 2 : nom = '+this.nom+' & prenom = '+this.prenom);

}).add( 'lien/:type', function(){

    debug( 'controler -> 3 : (on parle de lien là, non?) '+this.type);

}).add( '', function(){

    debug( 'controler vide');

}).otherwise(function(){

    debug( 'controler default : ' + this.getQuery());

});

/*****************************************************
 * INITIALISATION
 ****************************************************/

//configuration du module LocationListerner (qui gere le changement d'url)
LocationListener.setConfig({
                    separateur : '#',
                    listener   : eventListener
                }).launch();

//configuration du module LinkConverter (qui change les lien en ancre)
LinkConverter.setConfig({
                separateur : '#',
                rootDomain : 'javascript/plugin/routeparser/',
                element    : document.querySelectorAll("a.js--ajax")
            }).launch();


