(function( _global){

    var LocationListener = ( function construct(){

        var _oldUrl,
        _oConfig = {
            separateur: '#',
            listener  : function( sHash){
                console.log( sHash);
            }
        },
        _oPublic;

        /**
         * [_setOldUrl description]
         * @param {[type]} sUrl [description]
         */
        function _setOldUrl( sUrl){
            _oldUrl = sUrl;
        }

        /**
         * [_getQueryInfo description]
         * @return {[type]} [description]
         */
        function  _getQueryInfo(){

            return {
                old  : _oldUrl,
                time : new Date() * 1
            };

        }

        /**
         * [_getCurrentUrl description]
         * @return {[type]} [description]
         */
        function _getCurrentUrl(){
            var oRegex = new RegExp("^" + _oConfig.separateur , "g");
            return location.hash.replace( oRegex, '');
        }

        /**
         * [init description]
         * @return {[type]} [description]
         */
        function init(){
            _oldUrl = _getCurrentUrl();
            return _oPublic;
        }


         /**
         * [setConfig description]
         * @param {[type]} oJson [description]
         */
        function setConfig( oJson){

            for( var sKey in oJson){
                _oConfig[sKey] = oJson[sKey];
            }

            return _oPublic;
        }

        /**
         * [getListerner description]
         * @return {[type]} [description]
         */
        function launchListener(){

            var sValue = _getCurrentUrl();

            if( _oConfig.listener){

                _oConfig.listener.call( _getQueryInfo(), sValue);
            }else{

                LocationListener.init();
            }

            _setOldUrl( sValue);
            return _oPublic;
        }

        /**
         * RETURN PUBLIC
         */
        _oPublic = {
            init           : init,
            setConfig      : setConfig,
            launch         : launchListener
        };


        return _oPublic;

    })();


    _global.addEventListener( 'hashchange', function( e){
        LocationListener.launch();
    });

    _global.LocationListener = LocationListener;

})(window);