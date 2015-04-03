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

        var _aRoute = [], _sQuery = '', _fCallBackDefault, _oPublic, _oParam;


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
            var oParamSend = oParam || {};

            oParam = _mergeParam( oParamSend);

            oParamSend.getQuery = _getQuery;
            fCallBack.call( oParamSend);

            return _oPublic;
        }

        /**
         * [_treatParam description]
         * @param  {[type]} sParam [description]
         * @return {[type]}        [description]
         */
        function _treatParam( sParam){
            var oParam = {};
            var aParam = ( sParam.indexOf('&') > -1)? sParam.split('&') : [sParam];

            for(var i = 0 ; i < aParam.length; i++){
                var sKey = '' , sValue = '' ;

                if(  sParam.indexOf('=') > -1){
                   var aSubParam = sParam.split('=');
                   sKey   = aSubParam[0];
                   sValue = aSubParam[1];
                }else{
                    sKey = sParam;
                }

                oParam[sKey] = sValue;
            }

            return oParam;
        }

        /**
         * [_mergeParam description]
         * @return {[type]} [description]
         */
        function _mergeParam( oParam){

            for( sKey in _oParam){
                oParam[sKey] = _oParam[sKey];
            }

            return oParam;
        }

        /**
         * [_compareAndCompute description]
         * @param  {[type]} aRoute [description]
         * @param  {[type]} oRoute [description]
         * @return {[type]}        [description]
         */
        function _compareAndCompute( aRoute, oRoute){

            var oParam = {};

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
        * [add description]
        * @param {[type]} sPattern  [description]
        * @param {[type]} fCallBack [description]
        */
        function add( sPattern, fCallBack){

            var oRoute          = {};

                oRoute.callBack = fCallBack;
                oRoute.pattern  = sPattern;
                oRoute.route    = sPattern.split('/');

            _aRoute.push( oRoute);
            return _oPublic;

        }


        /**
         * [default description]
         * @param  {[type]} fCallBack [description]
         * @return {[type]}           [description]
         */
        function otherwise( fCallBack){
            _fCallBackDefault = fCallBack;
            return _oPublic;
        }

        /**
        * [run description]
        * @param  {[type]} sQuery [description]
        * @return {[type]}        [description]
        */
        function run( sQuery){
            var sParam = '';
             _oParam = {};

            if( sQuery.indexOf('?') > -1){

                var aQuery = sQuery.split('?');
                sQuery     = aQuery[0];
                sParam     = aQuery[1];
                _oParam    = _treatParam( sParam);

            }


            var aRoute = sQuery.split('/');
            _sQuery    = sQuery;

            // find match
            for( var i = 0 ; i < _aRoute.length; i++){
                var oRoute   = _aRoute[i];

                if( aRoute.length == oRoute.route.length){

                    if( _compareAndCompute( aRoute, oRoute)){
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

        _oPublic = {
            add       : add,
            run       : run,
            otherwise : otherwise
        };


        return _oPublic;

    })();

    _global.RouteParser = RouteParser;

})( window);