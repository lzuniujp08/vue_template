/*
 * created by lzugis 2018/7/11
 */


let leafletAdaptor = {
    baseLayer: null,
    labelLayer: null,

    init (domId) {
        domId = domId ? domId : 'map';
        this.baseLayer = this.getTdtLayer('vec_w');
        this.labelLayer = this.getTdtLayer('cva_w');

        window.map = L.map(domId, {
            center: {lon:103.847 , lat:36.0473},
            zoom: 4,
            maxZoom: 18,
            minZoom: 0,
            zoomControl: true,
            attributionControl: false,
            maxBounds: [[-90, -180], [90, 360]],
            renderer: L.svg()
        });

        window.map.addLayer(this.baseLayer);
        window.map.addLayer(this.labelLayer);

        L.control.scale({
            imperial: false
        }).addTo(window.map);

        window.map.on('mousemove', function (evt) {
            const latlng = evt.latlng;
            document.querySelector('#lonlat').innerHTML = latlng.lng.toFixed(4) + ',' + latlng.lat.toFixed(4);
        });
    },

    addWmsLayer (url, layers){
        const wms = L.tileLayer.wms(url, {
            layers: layers,
            format: 'image/png',
            transparent: true,
            version:'1.1.1'
        });
        window.map.addLayer(wms);
    },
    /**
     * 
     * @param type
     */
    changeBaseLayer (type) {
        let self = this;
        let baseLayer,
            labelLayer = 'cva_w';
        switch (type){
            case '影像':{
                baseLayer = 'img_w';
                labelLayer = 'cia_w';
                break;
            }
            case '地形':{
                baseLayer = 'ter_w';
                break;
            }
            default:{
                baseLayer = 'vec_w';
                break;
            }
        }
        self.baseLayer.setUrl(this.getTdtUrl(baseLayer));
        self.labelLayer.setUrl(this.getTdtUrl(labelLayer));
    },

    getTdtUrl (lyr) {
        return 'http://t0.tianditu.com/DataServer?T=' + lyr + '&X={x}&Y={y}&L={z}';
    },

    getTdtLayer (lyr) {
        return L.tileLayer(this.getTdtUrl(lyr), { attribution: this.attribution });
    }
};

export default leafletAdaptor;