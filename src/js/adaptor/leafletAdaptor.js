/*
 * created by lzugis 2018/7/11
 */

let leafletAdaptor = {
    baseLayer: null,
    labelLayer: null,
    map: null,

    init (domId) {
        domId = domId ? domId : 'map';
        const vec_c = this.getTdtLayer('vec_w');
        const cva_c = this.getTdtLayer('cva_w');

        this.map = L.map(domId, {
            center: {lon:103.847 , lat:36.0473},
            zoom: 4,
            maxZoom: 18,
            minZoom: 0,
            zoomControl: false,
            attributionControl: false,
            maxBounds: [[-90, -180], [90, 360]],
            renderer: L.svg()
        });

        this.map.addLayer(vec_c);
        this.map.addLayer(cva_c);
    },

    changeBaseLayer (type) {
        console.log(type);
    },

    getTdtLayer (lyr) {
        const url = "http://t0.tianditu.com/DataServer?T="+lyr+"&X={x}&Y={y}&L={z}";
        const tilelayer = L.tileLayer(url, { attribution: this.attribution });
        return tilelayer;
    }
};

export default leafletAdaptor;