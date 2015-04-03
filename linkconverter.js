(function( _global){

    var LinkConverter = ( function _construct(){

            var _oConfig = {
                otherDomain : '',
                rootDomain  : '',
                element     : [],
                separateur  : '#'
            }, _oPublic;


            function _getDomain(){
                var sPort = window.location.port;

                if( sPort !== '' && sPort !== 0){
                    sPort = ':'+sPort;
                }else{
                    sPort = '';
                }

               return window.location.protocol + '//' + window.location.hostname + sPort + '/';
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
             * [getSeparateur description]
             * @return {[type]} [description]
             */
            function getSeparateur(){
                return _oConfig.separateur;
            }

            /**
             * [getUrlRoot description]
             * @return {[type]} [description]
             */
            function getUrlRoot(){

                var sUrlRoot = _getDomain();
                sUrlRoot     += _oConfig.rootDomain;

                return sUrlRoot;
            }

            /**
             * [_cleanUpdateUrl description]
             * @return {[type]} [description]
             */
            function _cleanUpdateUrl( sUrl, sRootUrl){

                if( sUrl.indexOf("http") == -1){
                    sUrl = _oConfig.separateur+sUrl;
                }

                var sNewUrl = sUrl.replace( sRootUrl, _oConfig.separateur);

                return sNewUrl;
            }

            /**
             * [launch description]
             * @return {[type]} [description]
             */
            function launch(){
                var sRootUrl =  getUrlRoot();

                if( _oConfig.element.length){
                    for( var i = 0 ; i < _oConfig.element.length; i++){

                       var sLink    = _oConfig.element[i].getAttribute('href');
                       _oConfig.element[i].setAttribute( "href", _cleanUpdateUrl( sLink, sRootUrl));

                    }
                }

                return _oPublic;
            }



            /**
             * RETURN PUBLIC
             */

            _oPublic = {
                getSeparateur : getSeparateur,
                setConfig     : setConfig,
                getUrlRoot    : getUrlRoot,
                launch        : launch
            };

            return _oPublic;

        })();

    _global.LinkConverter = LinkConverter;

})( window);