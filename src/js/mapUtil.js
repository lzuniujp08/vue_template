/**
 * Created by lzugis on 2018/3/28.
 */

import proj from 'ol/proj';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OsmSource from 'ol/source/OSM';
import $ from 'jquery';

let mapUtil = {};

mapUtil.init = initMap;

function initMap() {
    mapUtil.map = new Map({
        layers: [
            new TileLayer({
                source: new OsmSource()
            })
        ],
        target: 'map',
        view: new View({
            center: proj.transform([116.397428, 39.90923], 'EPSG:4326', 'EPSG:3857'),
            maxZoom: 19,
            zoom: 7
        })
    });

    mapUtil.map.on("pointermove", function (evt) {
        const _coord = proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        $("#lonlat").html(_coord[0].toFixed(3) + ',' + _coord[1].toFixed(3))
    });
}

export default mapUtil;