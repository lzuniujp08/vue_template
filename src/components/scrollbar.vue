<template>
  <div 
    ref="scrollWindow"
    class="vue-scroll-window"
    @touchstart.stop = "startMove"
  >
    <div 
      ref="scrollContent"
      :class="{'vue-scroll-animation': animation}"
      :style="{marginTop: scrollTop + 'px', marginLeft: scrollLeft + 'px'}"
      class="vue-scroll-body">
      <slot/>
    </div>
    <resize-observer @notify="handleResize" />
    <transition name="vue-scroll">
      <div 
        v-show="showScrollY"
        :style="[scrollTrackYStyle || scrollTrackStyle]"
        class="vue-scroll-track left-track"
        @click.stop="(e) => {clickTo(e, 'y');}"
      >
        <button 
          :class="{'vue-scroll-animation': !moveY}"
          :style="[{
            marginTop: top + 'px',
            height: height + 'px'
          }, scrollBarYStyle || scrollBarStyle]"
          class="vue-scroll-bar left-bar"
          @mousedown.stop="startMoveY"
        />
      </div>
    </transition>
    <transition name="vue-scroll">
      <div 
        v-show="showScrollX"
        :style="[scrollTrackXStyle || scrollTrackStyle]"
        class="vue-scroll-track bottom-track"
        @click.stop="(e) => {clickTo(e, 'x');}"
      >
        <button 
          :class="{'vue-scroll-animation': !moveX}"
          :style="[{
            marginLeft: left + 'px',
            width: width + 'px'
          }, scrollBarXStyle || scrollBarStyle]"
          class="vue-scroll-bar bottom-bar"
          @mousedown.stop="startMoveX"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { ResizeObserver } from 'vue-resize';
import mouseWheel from 'mouse-wheel';
const isPhone = /android|iphone/gi.test(window.navigator.appVersion);
const dpr = Math.floor(window.devicePixelRatio + 1 || 1);
const fastTime = 0.4;
export default {
  name: 'VueScrollBar',
  props: {
    barXMinHeight: {
      type: Number,
      default: 20
    },
    barYMinWidth: {
      type: Number,
      default: 40
    },
    scrollTrackStyle: {
      type: Object,
      default: () => {}
    },
    scrollTrackYStyle: {
      type: Object,
      default: null
    },
    scrollTrackXStyle: {
      type: Object,
      default: null
    },
    scrollBarStyle: {
      type: Object,
      default: () => {}
    },
    scrollBarXStyle: {
      type: Object,
      default: null
    },
    scrollBarYStyle: {
      type: Object,
      default: null
    },
    overflow: {
      type: String,
      default: 'none'
    },
    watchValue: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showScrollY: false,
      showScrollX: false,
      scrollTop: 0,
      scrollLeft: 0,
      trackScrollW: 0,
      top: 0,
      height: 0,
      left: 0,
      width: 0,
      scrollWinH: 0,
      scrollH: 0,
      trackScrollH: 0,
      contentH: 0,
      contentW: 0,
      startY: 0,
      startTop: 0,
      startX: 0,
      startLeft: 0,
      touchStartTime: 0,
      moveX: false,
      moveY: false,
      bottomMove: false,
      animation: false,
      isPhone: isPhone
    };
  },
  watch: {
    watchValue() {
      if (this.watchValue) {
        this.$nextTick(() => {
          this.recalculate();
        });
      }
    }
  },
  methods: {
    getElementCoordinate(elem) {
      let x = 0;
      let y = 0;
      while (elem.offsetParent) {
        x += elem.offsetLeft;
        y += elem.offsetTop;
        elem = elem.offsetParent;
      }
      return { x, y };
    },
    isCanMovedX() {
      return (
        this.scrollW > 0 &&
        this.overflow !== 'hidden' &&
        this.overflow !== 'hidden-x'
      );
    },
    isCanMovedY() {
      return (
        this.scrollH > 0 &&
        this.overflow !== 'hidden' &&
        this.overflow !== 'hidden-y'
      );
    },
    scroll(dx, dy, dz, ev) {
      dy && dy > 0 ? this.moveDown(dy) : this.moveUp(-dy);
      dx && dx > 0 ? this.moveRight(dx) : this.moveLeft(-dx);
      if (!this.isCanMovedY() && !dx) {
        dy && dy > 0 ? this.moveRight(dy) : this.moveLeft(-dy);
      }
      ev.preventDefault();
    },
    clickTo(e, type) {
      this.animation = true;
      let dis;
      if (type === 'y') {
        const y =
          e.pageY - this.getElementCoordinate(this.$refs.scrollWindow).y;
        let disY = this.top - y;
        if (disY > 0) {
          dis = (disY / this.trackScrollH) * this.scrollH;
        } else {
          dis = ((-disY - this.height) / this.trackScrollH) * this.scrollH;
        }
        if (y > 0 && y < this.top) {
          this.moveUp(dis);
        } else if (y > this.top + this.height) {
          this.moveDown(dis);
        }
      } else {
        const x =
          e.pageX - this.getElementCoordinate(this.$refs.scrollWindow).x;
        let disX = this.left - x;
        if (disX > 0) {
          dis = (disX / this.trackScrollW) * this.scrollW;
        } else {
          dis = ((-disX - this.width) / this.trackScrollW) * this.scrollW;
        }
        if (x > 0 && x < this.left) {
          this.moveLeft(dis);
        } else if (x > this.left + this.width) {
          this.moveRight(dis);
        }
      }
    },
    moveToY(y, clientY) {
      if (this.isCanMovedY() && this.moveY) {
        if (this.startTop + y < 0) {
          this.startTop = this.top = 0;
          this.scrollTop = 0;
          this.startY = clientY;
        } else if (this.startTop + y > this.trackScrollH) {
          this.startTop = this.top = this.trackScrollH;
          this.scrollTop = -this.scrollH;
          this.startY = clientY;
        } else {
          this.top = this.startTop + y;
          this.scrollTop = -this.scrollH * (this.top / this.trackScrollH);
        }
      }
    },
    moveToX(x, clientX) {
      if (this.isCanMovedX()) {
        if (this.startLeft + x < 0) {
          this.startLeft = this.left = 0;
          this.scrollLeft = 0;
          this.startX = clientX;
        } else if (this.startLeft + x > this.trackScrollW) {
          this.startLeft = this.left = this.trackScrollW;
          this.scrollLeft = -this.scrollW;
          this.startX = clientX;
        } else {
          this.left = this.startLeft + x;
          this.scrollLeft = -1 * this.scrollW * (this.left / this.trackScrollW);
        }
      }
    },
    moveDown(dis) {
      if (this.isCanMovedY()) {
        if (Math.abs(this.scrollTop - dis) > this.scrollH) {
          this.scrollTop = -this.scrollH;
          this.top = this.trackScrollH;
        } else {
          this.scrollTop = this.scrollTop - dis;
          this.top =
            (Math.abs(this.scrollTop) / this.scrollH) * this.trackScrollH;
        }
      }
    },
    moveUp(dis) {
      if (this.isCanMovedY()) {
        if (this.scrollTop + dis > 0) {
          this.top = 0;
          this.scrollTop = 0;
        } else {
          this.scrollTop = this.scrollTop + dis;
          this.top =
            (Math.abs(this.scrollTop) / this.scrollH) * this.trackScrollH;
        }
      }
    },
    moveLeft(dis) {
      if (this.isCanMovedX()) {
        if (this.scrollLeft + dis > 0) {
          this.scrollLeft = 0;
          this.left = 0;
        } else {
          this.scrollLeft = this.scrollLeft + dis;
          this.left =
            (Math.abs(this.scrollLeft) / this.scrollW) * this.trackScrollW;
        }
      }
    },
    moveRight(dis) {
      if (this.isCanMovedX()) {
        if (Math.abs(this.scrollLeft - dis) > this.scrollW) {
          this.scrollLeft = -this.scrollW;
          this.left = this.trackScrollW;
        } else {
          this.scrollLeft = this.scrollLeft - dis;
          this.left =
            (Math.abs(this.scrollLeft) / this.scrollW) * this.trackScrollW;
        }
      }
    },
    startMoveX(e) {
      if (this.isCanMovedX()) {
        this.animation = false;
        this.moveX = true;
        this.startX = e.touches ? e.touches[0].clientX : e.clientX;
        this.startLeft = this.left;
      }
    },
    startMoveY(e) {
      if (this.isCanMovedY()) {
        this.animation = false;
        this.moveY = true;
        this.startY = e.touches ? e.touches[0].clientY : e.clientY;
        this.startTop = this.top;
      }
    },
    startMove(e) {
      const overflow = this.overflow;
      this.touchStartTime = +new Date();
      overflow !== 'hidden-y' && overflow !== 'hidden' && this.startMoveY(e);
      overflow !== 'hidden-x' && overflow !== 'hidden' && this.startMoveX(e);
    },
    recalculate() {
      let { scrollWindow, scrollContent } = this.$refs;
      scrollContent = scrollContent.firstElementChild || scrollContent;
      const {
        offsetHeight: scrollWinH,
        offsetWidth: scrollWinW
      } = scrollWindow;
      const { offsetHeight: contentH, offsetWidth: contentW } = scrollContent;
      const minHeight = this.barXMinHeight;
      const minWidth = this.barYMinWidth;
      const overflow = this.overflow;
      let scrollH = contentH - scrollWinH > 0 ? contentH - scrollWinH : 0;
      let scrollW = contentW - scrollWinW > 0 ? contentW - scrollWinW : 0;
      let preScrollXPercent = this.left / this.scrollW;
      let preScrollYPercent = this.top / this.scrollH;
      this.scrollH = scrollH;
      this.scrollW = scrollW;
      this.contentW = contentW;
      this.contentH = contentH;
      this.scrollWinH = scrollWinH;
      this.scrollWinW = scrollWinW;
      this.showScrollY =
        !isPhone &&
        scrollH > 0 &&
        (overflow !== 'hidden-y' && overflow !== 'hidden');
      this.showScrollX =
        !isPhone &&
        scrollW > 0 &&
        (overflow !== 'hidden-x' && overflow !== 'hidden');
      this.width =
        scrollWinW / (scrollW / scrollWinW + 1) < minWidth
          ? minWidth
          : scrollWinW / (scrollW / scrollWinW + 1);
      this.height =
        scrollWinH / (scrollH / scrollWinH + 1) < minHeight
          ? minHeight
          : scrollWinH / (scrollH / scrollWinH + 1);
      this.trackScrollH =
        this.scrollWinH - this.height - (this.showScrollX ? 5 : 0);
      this.trackScrollW = this.scrollWinW - this.width;
      this.left = Math.abs(preScrollXPercent) * this.trackScrollW || 0;
      this.top = Math.abs(preScrollYPercent) * this.trackScrollH || 0;
      this.scrollLeft =
        -1 * this.scrollW * (this.left / this.trackScrollW) || 0;
      this.scrollTop = -1 * this.scrollH * (this.top / this.trackScrollH) || 0;
    },
    isTargetScrollWindow(target) {
      while (target !== null) {
        if (target.offsetParent === this.$refs.scrollWindow) {
          return true;
        } else {
          target = target.offsetParent;
        }
      }
    },
    bindEvents() {
      let { scrollWindow } = this.$refs;
      !isPhone &&
        window.addEventListener('mouseup', () => {
          // prevent triggering events on other scroll components
          if (this.moveX || this.moveY) {
            this.moveY = false;
            this.moveX = false;
          }
        });
      window.addEventListener('touchend', e => {
        // prevent triggering events on other vue-scroll-scroll components
        if (this.moveX || this.moveY) {
          this.moveY = false;
          this.moveX = false;
          let moveTime = (+new Date() - this.touchStartTime) / 1000;
          let moveXDis = this.startX - e.changedTouches[0].clientX;
          let moveYDis = this.startY - e.changedTouches[0].clientY;
          let speedX = moveXDis / moveTime;
          let speedY = moveYDis / moveTime;
          if (Math.abs(speedY) > this.scrollWinH && moveTime < fastTime) {
            // when scroll distance is too much,add transition css for scrollContent
            this.animation = true;
            if (speedY > 0) {
              this.moveDown(speedY / 2);
            } else {
              this.moveUp(-speedY / 2);
            }
          }
          if (Math.abs(speedX) > this.scrollWinW && moveTime < fastTime) {
            this.animation = true;
            if (speedX > 0) {
              this.moveRight(speedX);
            } else {
              this.moveLeft(-speedX);
            }
          }
          if (isPhone) {
            this.showScrollY = false;
            this.showScrollX = false;
          }
        }
      });
      !isPhone &&
        window.addEventListener('mousemove', e => {
          if (this.moveY) {
            let dis = e.clientY - this.startY;
            this.moveToY(dis, e.clientY);
          }
          if (this.moveX) {
            this.moveToX(e.clientX - this.startX, e.clientX);
          }
        });
      isPhone &&
        window.addEventListener(
          'touchmove',
          e => {
            if (this.moveY) {
              let clientY = e.touches ? e.touches[0].clientY : e.clientY;
              this.showScrollY = true;
              this.moveToY((this.startY - clientY) / dpr, clientY);
            }
            if (this.moveX) {
              let clientX = e.touches ? e.touches[0].clientX : e.clientX;
              this.showScrollX = true;
              this.moveToX((this.startX - clientX) / dpr, clientX);
            }
            if (
              this.isTargetScrollWindow(e.target) &&
              (this.scrollH > 0 || this.scrollW > 0)
            ) {
              e.preventDefault();
            }
          },
          { passive: false }
        );
      mouseWheel(scrollWindow, this.scroll);
    },
    handleResize(e) {
      this.recalculate();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.recalculate();
      this.bindEvents();
    });
  },
  destroy() {
    window.removeEventListener('mouseup');
    window.removeEventListener('touchend');
    window.removeEventListener('touchmove');
    window.removeEventListener('mousemove');
  },
  components: {
    ResizeObserver
  }
};
</script>

<style lang="css" scoped>
.vue-scroll-window{
  overflow: hidden;
  position: relative;
}
.vue-scroll-track{
  background: #EFF6FA;
}
.left-track{
  position: absolute;
  z-index:1;
  width:5px;
  right: 0;
  top:0;
  bottom: 0;
}
.bottom-track {
  position: absolute;
  z-index:1;
  left: 0;
  bottom:0;
  right: 0;
  height: 5px;
}
.vue-scroll-bar{
  padding: 0;
  border: none;
  display: block;
  border-radius: 2px;
  outline: none;
  margin: 0;
}
.left-bar{
  width:100%;
  background: #C0C0C0;
}
.bottom-bar {
  height: 100%;
  background: #C0C0C0;
}
.vue-scroll-animation{
  transform:translateZ(0);
  transition:margin-top 0.1s ease, margin-left 0.1s ease;
}
.vue-scroll-leave-active {
  transform:translateZ(0);
  transition: opacity 1.2s ease;
}
.vue-scroll-leave-to{
  opacity: 0;
}
</style>
