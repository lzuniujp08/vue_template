/**
 * Created by lzugis on 2018/3/28.
 */

import {Map, View} from 'ol';

import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';

import ImgWmsSource from 'ol/source/ImageWMS';
import XYZSource from 'ol/source/XYZ';

import {toEPSG4326, fromEPSG4326} from 'ol/proj/epsg3857.js';

import $ from 'jquery';

let mapUtil = {
    baseLayer: null,
    labelLayer: null,

    init (domId){
        this.baseLayer = this.getTdtLayer('vec_w');
        this.labelLayer = this.getTdtLayer('cva_w');
        window.map = new Map({
            layers: [
                this.baseLayer,
                this.labelLayer
            ],
            target: domId ? domId : 'map',
            view: new View({
                center: fromEPSG4326([116.397428, 39.90923]),
                maxZoom: 19,
                zoom: 7
            })
        });

        window.map.on("pointermove", function (evt) {
            const _coord = toEPSG4326(evt.coordinate);
            $("#lonlat").html(_coord[0].toFixed(3) + ',' + _coord[1].toFixed(3))
        });
    },
    /**
     * getTdtLayer
     * @param lyr
     * @returns {TileLayer}
     */
    getTdtLayer (lyr){
        return new TileLayer({
            source: this.getTdtSource(lyr),
        })
    },
    /**
     * getTdtSource
     * @param lyr
     * @returns {XYZ}
     */
    getTdtSource (lyr){
        const url = "http://t{0-8}.tianditu.com/DataServer?T="+lyr+"&X={x}&Y={y}&L={z}";
        return new XYZSource({
            url:url
        });
    },
    /**
     * addWmsLayer
     * @param url
     * @param layers
     */
    addWmsLayer (url, layers){
        const wmsLayer = new ImageLayer({
            source: new ImgWmsSource({
                ratio: 1,
                url: url,
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    LAYERS: layers,
                    STYLES: ''
                },
                serverType: 'geoserver'
            })
        });
        this.map.addLayer(wmsLayer);
    },

    changeBaseLayer(type) {
        let self = this;
        let baseSource, labelSouce;
        switch (type){
            case 'img':{
                baseSource = self.getTdtSource('img_w');
                labelSouce = self.getTdtSource('cia_w');
                break;
            }
            case 'ter':{
                baseSource = self.getTdtSource('ter_w');
                labelSouce = self.getTdtSource('cva_w');
                break;
            }
            default:{
                baseSource = self.getTdtSource('vec_w');
                labelSouce = self.getTdtSource('cva_w');
                break;
            }
        }
        self.baseLayer.setSource(baseSource);
        self.labelLayer.setSource(labelSouce);
    }
};

export default mapUtil;