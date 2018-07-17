/**
 * Created by lzugis on 2018/3/28.
 */

import leafletAdaptor from './adaptor/leafletAdaptor';
import openlayerAdaptor from './adaptor/openlayerAdaptor';
import jsondata from '../data/capital.json';

let mapUtil = {
    adaptors: {
        'leaflet': leafletAdaptor,
        'ol': openlayerAdaptor
    },

    adaptorType: '',

    init (domId, type){
        domId = domId ? domId : 'map';
        this.adaptorType = type ? type : 'ol';
        this.adaptors[this.adaptorType].init(domId);
    },
    /**
     * addWmsLayer
     * @param url
     * @param layers
     */
    addWmsLayer (url, layers){
        this.adaptors[this.adaptorType].addWmsLayer(url, layers);
    },

    addGeojsonLayer (){
        let self = this;
        let style = self.adaptors[self.adaptorType].getVecStyle;
        setTimeout(function () {
            self.adaptors[self.adaptorType].addGeojsonLayer(jsondata, style);
        },1000)

    },

    changeBaseLayer(type) {
        this.adaptors[this.adaptorType].changeBaseLayer(type);
    }

};

export default mapUtil;