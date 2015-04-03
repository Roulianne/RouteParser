

/*****************************************************
 * VARIABLE FUNCTION
 ****************************************************/
function debug( sMsg){

    var oElement       = document.getElementById("debug");
    oElement.innerHTML += '- ' + sMsg + '<br/>';
}

function eventListener( sHash){

    RouteParser.run( sHash);

}


/*****************************************************
 * Definition des router / controler
 ****************************************************/

RouteParser.add( 'user/maurice/dupond/:file', function(){

    debug( 'controler -> 1 : ficher de nom '+this.file);

}).add( 'user/:prenom/:nom', function(){

    debug( 'controler -> 2 : '+this.nom+' '+this.prenom);

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

LocationListener.setConfig({
                    separateur : '#',
                    listener   : eventListener
                }).launch();

linkConverter.setConfig({
                separateur : '#',
                rootDomain : 'javascript/plugin/routeparser/',
                element    : document.querySelectorAll("a.js--ajax")
            }).launch();


