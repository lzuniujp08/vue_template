/**
 * Created by lzugis on 2018/3/28.
 */

import proj from 'ol/proj';
import Map from 'ol/map';
import View from 'ol/view';

import TileLayer from 'ol/layer/tile';
import ImageLayer from 'ol/layer/Image';

import ImgWmsSource from 'ol/source/ImageWMS';
import OsmSource from 'ol/source/OSM';

import $ from 'jquery';

let mapUtil = {};

mapUtil.init = initMap;

mapUtil.addWmsLayer = function(url, layers){
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
};

function initMap(domId) {
    window.map = new Map({
        layers: [
            new TileLayer({
                source: new OsmSource()
            })
        ],
        target: domId ? domId : 'map',
        view: new View({
            center: proj.transform([116.397428, 39.90923], 'EPSG:4326', 'EPSG:3857'),
            maxZoom: 19,
            zoom: 7
        })
    });

    window.map.on("pointermove", function (evt) {
        const _coord = proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        $("#lonlat").html(_coord[0].toFixed(3) + ',' + _coord[1].toFixed(3))
    });
}

export default mapUtil;