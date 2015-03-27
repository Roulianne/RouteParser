/*************************************************************
 * This script is developed by JAMET julien, http://www.bac-a-sable.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * RouteParser class provides a way to find the good controler (or action) .
 * You can define your own pattern, by function and path pattern.
**************************************************************/
(function( _global){

    // VERSION 0.1
    var RouteParser = ( function construct(){

        var _aRoute = [];
        var _sQuery = '';
        var _fCallBackDefault;

        /**
         * [_addslashes description]
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         */
        function _addAntiSlashes( str) {
          return (str + '')
            .replace(/\//g, '\\/');
        }

        /**
         * [_getQuery description]
         * @return {[type]} [description]
         */
        function _getQuery(){
            return _sQuery;
        }

         /**
         * [_execFunction description]
         * @param  {[type]} fCallBack [description]
         * @param  {[type]} oParam    [description]
         * @return {[type]}           [description]
         */
        function _execFunction( fCallBack, oParam){
            var oParamSend      = oParam || {};


            oParamSend.getQuery = _getQuery;
            fCallBack.call( oParamSend);
        }

        /**
        * [add description]
        * @param {[type]} sPattern  [description]
        * @param {[type]} fCallBack [description]
        */
        function add( sPattern, fCallBack){

            var oRoute         = {};

                oRoute.callBack = fCallBack;
                oRoute.pattern  = sPattern;
                oRoute.route    = sPattern.split('/');
                oRoute.param    = {};

            _aRoute.push( oRoute);

        }

        /**
         * [_compare description]
         * @param  {[type]} aRoute [description]
         * @param  {[type]} oRoute [description]
         * @return {[type]}        [description]
         */
        function _compare( aRoute, oRoute){

            var oParam = oRoute.param;

            for( var y = 0 ; y < aRoute.length;y++){

                if( aRoute[y] == oRoute.route[y] ){
                    // it's ok
                }else if( oRoute.route[y].charAt(0) == ':'){

                    var sAttr     = oRoute.route[y].substr(1);
                    oParam[sAttr] = aRoute[y];

                }else{

                    return false;
                }

            }

            _execFunction( oRoute.callBack, oParam);
            return true;
        }

        /**
         * [default description]
         * @param  {[type]} fCallBack [description]
         * @return {[type]}           [description]
         */
        function otherwise( fCallBack){
            _fCallBackDefault = fCallBack;
        }

        /**
        * [run description]
        * @param  {[type]} sQuery [description]
        * @return {[type]}        [description]
        */
        function run( sQuery){

            var aRoute = sQuery.split('/');
            _sQuery    = sQuery

            // find match
            for( var i = 0 ; i < _aRoute.length; i++){
                var oRoute = _aRoute[i];

                if( aRoute.length == oRoute.route.length){

                    if( _compare( aRoute, oRoute)){
                        return true;
                    }
                }

            }

            // nothing match
            if( _fCallBackDefault){
                _execFunction( _fCallBackDefault);
                return true;
            }

            return false;

        }

        /**
         * RETURN PUBLIC
         */
        return {
            add       : add,
            run       : run,
            otherwise : otherwise
        };

    })();

    _global.RouteParser = RouteParser;

})( window);