/*
 * created by lzugis 2018/7/11
 */

import {Map, View} from 'ol';
import {createStringXY} from 'ol/coordinate'
import {toEPSG4326, fromEPSG4326} from 'ol/proj/epsg3857.js';

import {Tile, Image} from 'ol/layer';

import {ImageWMS, XYZ} from 'ol/source';

import {defaults as defaultControls, ScaleLine, OverviewMap} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition'

let openlayerAdaptor = {
    baseLayer: null,
    labelLayer: null,

    init (domId){
        domId = domId ? domId : 'map';
        this.baseLayer = this.getTdtLayer('vec_w');
        this.labelLayer = this.getTdtLayer('cva_w');

        const scaleLine = new ScaleLine({
            target: document.getElementById('scaleline')
        });
        const overViewmap = new OverviewMap({
            target: document.getElementById('overview'),
            collapsible: false,
            collapsed: false
        });
        const mousePosition = new MousePosition({
            target: document.getElementById('lonlat'),
            projection:'EPSG:4326',
            coordinateFormat: createStringXY(4),
            undefinedHTML: '&nbsp;'
        });
        let controls = [scaleLine, mousePosition];

        window.map = new Map({
            controls: defaultControls({
                attributionOptions: {
                    collapsible: false
                }
            }).extend(controls),
            layers: [
                this.baseLayer,
                this.labelLayer
            ],
            target: domId,
            view: new View({
                center: fromEPSG4326([116.397428, 39.90923]),
                maxZoom: 19,
                zoom: 7
            })
        });

        // window.map.on('pointermove', function (evt) {
        //     const _coord = toEPSG4326(evt.coordinate);
        //     $('#lonlat').html(_coord[0].toFixed(3) + ',' + _coord[1].toFixed(3))
        // });
    },
    /**
     * getTdtLayer
     * @param lyr
     * @returns {Tile}
     */
    getTdtLayer (lyr){
        return new Tile({
            source: this.getTdtSource(lyr),
        })
    },
    /**
     * getTdtSource
     * @param lyr
     * @returns {XYZ}
     */
    getTdtSource (lyr){
        const url = "http://t{0-7}.tianditu.com/DataServer?T="+lyr+"&X={x}&Y={y}&L={z}";
        return new XYZ({
            url:url
        });
    },
    /**
     * addWmsLayer
     * @param url
     * @param layers
     */
    addWmsLayer (url, layers){
        const wmsLayer = new Image({
            source: new ImageWMS({
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
        window.map.addLayer(wmsLayer);
    },

    changeBaseLayer(type) {
        let self = this;
        let baseSource, labelSouce;
        switch (type){
            case '影像':{
                baseSource = self.getTdtSource('img_w');
                labelSouce = self.getTdtSource('cia_w');
                break;
            }
            case '地形':{
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

export default openlayerAdaptor;