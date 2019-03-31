<template>
  <el-radio-group v-model="measure" size="small" @change="startMeasure" class="measure-tool">
    <el-radio-button label="distance">距离</el-radio-button>
    <el-radio-button label="area">面积</el-radio-button>
  </el-radio-group>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';

  import {Vector as vectorLayer} from 'ol/layer';
  import {Vector as vectorSource} from 'ol/source.js';
  import Draw from 'ol/interaction/Draw.js';
  import Point from 'ol/geom/Point.js';
  import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
  import Overlay from 'ol/Overlay.js';
  import {getArea, getLength} from 'ol/sphere.js';
  import {unByKey} from 'ol/Observable.js';

  export default {
    name: 'Measure',
    props: {},
    components: {},
    data () {
      return {
        measure: '',
        type: '',

        draw: null,
        listener: null,
        sketch: null,
        isMeasure: false,

        helpTooltipElement: null,
        helpTooltip: null,
        measureTooltipElement: null,
        measureTooltip: null,

        source: null,
        vector: null
      };
    },
    updated () {},
    mounted () {
      const self = this;
      setTimeout(function () {
        self.source = new vectorSource();
        self.vector = new vectorLayer({
          source: self.source,
          style: self.styleFunction,
          zIndex: 15
        });
        window.map.addLayer(self.vector);
        self.createHelpTooltip();

        window.map.on('pointermove', function (evt) {
          self.pointerMoveHandler(evt, self);
        });
        window.map.getViewport().addEventListener('mouseout', function () {
          self.helpTooltipElement.classList.add('hidden');
        });
      }, 1000);
    },
    methods: {
      startMeasure () {
        const self = this;
        self.isMeasure = true;
        self.clearMeasure();
        self.type = self.measure;

        const type = (self.measure === 'area' ? 'Polygon' : 'LineString');
        self.draw = new Draw({
          source: this.source,
          type: type,
          style: this.styleFunction,
          stopClick: true
        });
        window.map.addInteraction(this.draw);

        self.createMeasureTooltip();

        self.draw.on('drawstart', function (evt) {
          self.sketch = evt.feature;

          self.listener = self.sketch.getGeometry().on('change', function (evt) {
            const geom = evt.target;
            let output;
            let tooltipCoord = evt.coordinate;

            if (geom.getType().toLowerCase()==='polygon') {
              output = self.formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else {
              output = self.formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }

            self.measureTooltipElement.innerHTML = output;
            self.measureTooltip.setPosition(tooltipCoord);
          });
        });
        self.draw.on('drawend', function (evt) {
          self.sketch = null;
          self.isMeasure = false;
          self.measure = '';

          unByKey(self.listener);
          window.map.removeInteraction(self.draw);
          self.helpTooltip.setPosition(null);

          self.measureTooltipElement.className = 'tooltip tooltip-static measure-result';
          const close = document.createElement('span');
          close.setAttribute('title', '关闭');
          close.className = 'close';
          close.innerHTML = '×';
          close.onclick = function () {
            self.clearMeasure();
          };
          self.measureTooltipElement.appendChild(close);
          self.measureTooltip.setOffset([0, -7]);
          self.measureTooltipElement = null;

          self.createMeasureTooltip();
        });
      },
      clearMeasure () {
        this.source.clear();
        let measureResult = document.querySelector('.measure-result');
        if (measureResult) measureResult.parentNode.remove();
        if (this.draw) window.map.removeInteraction(this.draw);
      },
      formatLength (line) {
        const length = getLength(line);
        let output;
        if (length > 1000) {
          output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + '千米';
        } else {
          output = (Math.round(length * 100) / 100) +
            ' ' + '米';
        }
        return output;
      },
      formatArea (polygon) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
          output = (Math.round(area / 1000000 * 100) / 100) +
            '平方千米';
        } else {
          output = (Math.round(area * 100) / 100) +
            ' ' + '平方米';
        }
        return output;
      },
      createMeasureTooltip () {
        if (this.measureTooltipElement) {
          this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new Overlay({
          element: this.measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        window.map.addOverlay(this.measureTooltip);
      },
      pointerMoveHandler (evt, self) {
        if (evt.dragging) {
          return;
        }
        let helpMsg = '点击开始测量';
        if (self.sketch) {
          helpMsg = '点击继续测量，双击结束测量';
        }
        self.helpTooltipElement.innerHTML = helpMsg;

        if (self.isMeasure) {
          self.helpTooltip.setPosition(evt.coordinate);
        }
        self.helpTooltipElement.classList.remove('hidden');
      },
      createHelpTooltip () {
        const self = this;
        if (self.helpTooltipElement) {
          self.helpTooltipElement.parentNode.removeChild(self.helpTooltipElement);
        }
        self.helpTooltipElement = document.createElement('div');
        self.helpTooltipElement.className = 'tooltip hidden';
        self.helpTooltip = new Overlay({
          element: self.helpTooltipElement,
          offset: [15, 0],
          positioning: 'center-left'
        });
        window.map.addOverlay(self.helpTooltip);
      },
      styleFunction (feature) {
        let styles = [new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, 0.5)',
            width: 4
          })
        })];
        if (this.type === 'distance') {
          const geometry = feature.getGeometry();
          let coords = geometry.getCoordinates();
          coords = coords.length > 1 ? coords : coords[0];
          for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            styles.push(new Style({
              geometry: new Point(coord),
              image: new CircleStyle({
                radius: 3,
                fill: new Fill({
                  color: '#ffffff'
                }),
                stroke: new Stroke({
                  color: '#ff0000',
                  width: 1
                })
              })
            }));
          }
        }
        return styles;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .measure-tool{
    position: absolute;
    top: 10px;
    background-color: white;
    right: 185px;
    z-index: 99;
    .is-active{
      background-color: #5885fe;
      font-weight: bold;
    }
  }
</style>
