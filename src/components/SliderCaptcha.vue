<template>
  <div class="slider-captcha-container" ref="containerRef">
    <div class="captcha-modal" :style="{ display: visible ? 'flex' : 'none' }">
      <div class="captcha-content">
        <div class="captcha-header">
          <h3>请完成安全验证</h3>
          <el-icon class="close-icon" @click="close"><CircleClose /></el-icon>
        </div>
        
        <div class="captcha-body">
          <div class="puzzle-container" ref="puzzleContainerRef">
            <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight"></canvas>
            <div 
              class="slider-block" 
              ref="sliderBlockRef"
              :style="{
                left: sliderPosition + 'px',
                top: puzzleY + 'px',
                width: puzzleWidth + 'px',
                height: puzzleHeight + 'px'
              }"
            >
              <div class="slider-block-inner"></div>
            </div>
          </div>
          
          <div class="slider-bar" ref="sliderBarRef" @mousedown="startDrag" @touchstart="startDrag">
            <div 
              class="slider-btn" 
              ref="sliderBtnRef"
              :style="{ left: sliderPosition + 'px' }"
            >
              <el-icon class="slider-icon"><ArrowRight /></el-icon>
            </div>
            <div class="slider-track">
              <div class="slider-track-fill" :style="{ width: sliderPosition + 'px' }"></div>
            </div>
          </div>
          
          <div class="captcha-tips" :class="{ 'success':验证成功, 'error':验证失败 }">
            {{ tipsText }}
          </div>
        </div>
        
        <div class="captcha-footer">
          <el-button type="primary" :disabled="!验证成功" @click="confirm">确认</el-button>
          <el-button @click="refresh">刷新</el-button>
        </div>
      </div>
    </div>
    
    <div class="captcha-mask" :style="{ display: visible ? 'block' : 'none' }" @click="close"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CircleClose, ArrowRight } from '@element-plus/icons-vue';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
  (e: 'update:visible', value: boolean): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const puzzleContainerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const sliderBlockRef = ref<HTMLElement | null>(null);
const sliderBarRef = ref<HTMLElement | null>(null);
const sliderBtnRef = ref<HTMLElement | null>(null);

const canvasWidth = 320;
const canvasHeight = 160;
const puzzleWidth = 40;
const puzzleHeight = 40;

const sliderPosition = ref(0);
const puzzleX = ref(0);
const puzzleY = ref(0);
const isDragging = ref(false);
const 验证成功 = ref(false);
const 验证失败 = ref(false);
const tipsText = ref('拖动滑块完成拼图');

const backgroundImage = ref('');

const backgroundImages = [
  'https://picsum.photos/320/160?random=1',
  'https://picsum.photos/320/160?random=2',
  'https://picsum.photos/320/160?random=3',
  'https://picsum.photos/320/160?random=4',
  'https://picsum.photos/320/160?random=5',
  'https://picsum.photos/320/160?random=6',
  'https://picsum.photos/320/160?random=7',
  'https://picsum.photos/320/160?random=8',
  'https://picsum.photos/320/160?random=9',
  'https://picsum.photos/320/160?random=10'
];

const close = () => {
  emit('update:visible', false);
  emit('close');
  reset();
};

const confirm = () => {
  if (验证成功.value) {
    emit('confirm');
    close();
  }
};

const refresh = () => {
  reset();
  init();
};

const reset = () => {
  sliderPosition.value = 0;
  验证成功.value = false;
  验证失败.value = false;
  tipsText.value = '拖动滑块完成拼图';
};

const init = () => {
  if (!canvasRef.value) return;
  
  // 随机选择背景图
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  backgroundImage.value = backgroundImages[randomIndex];
  
  // 随机生成拼图位置
  puzzleX.value = Math.floor(Math.random() * (canvasWidth - puzzleWidth * 2)) + puzzleWidth;
  puzzleY.value = Math.floor(Math.random() * (canvasHeight - puzzleHeight));
  
  // 绘制背景图和拼图
  drawCaptcha();
};

const drawCaptcha = () => {
  if (!canvasRef.value) return;
  
  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = backgroundImage.value;
  
  img.onload = () => {
    // 绘制背景图
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    
    // 绘制拼图缺口
    drawPuzzleGap(ctx);
    
    // 绘制滑块
    drawSliderBlock();
  };
};

const drawPuzzleGap = (ctx: CanvasRenderingContext2D) => {
  // 绘制拼图形状
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(puzzleX.value, puzzleY.value);
  ctx.lineTo(puzzleX.value + puzzleWidth, puzzleY.value);
  ctx.lineTo(puzzleX.value + puzzleWidth, puzzleY.value + puzzleHeight);
  ctx.lineTo(puzzleX.value, puzzleY.value + puzzleHeight);
  ctx.closePath();
  
  // 创建阴影效果
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // 绘制缺口边框
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // 填充缺口
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fill();
  ctx.restore();
};

const drawSliderBlock = () => {
  if (!sliderBlockRef.value || !canvasRef.value) return;
  
  const blockCanvas = document.createElement('canvas');
  blockCanvas.width = puzzleWidth;
  blockCanvas.height = puzzleHeight;
  const blockCtx = blockCanvas.getContext('2d');
  
  if (!blockCtx) return;
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = backgroundImage.value;
  
  img.onload = () => {
    // 绘制滑块图像
    blockCtx.drawImage(
      img,
      puzzleX.value,
      puzzleY.value,
      puzzleWidth,
      puzzleHeight,
      0,
      0,
      puzzleWidth,
      puzzleHeight
    );
    
    // 添加边框效果
    blockCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    blockCtx.lineWidth = 2;
    blockCtx.strokeRect(0, 0, puzzleWidth, puzzleHeight);
    
    // 设置滑块背景
    const blockInner = sliderBlockRef.value.querySelector('.slider-block-inner');
    if (blockInner) {
      blockInner.style.backgroundImage = `url(${blockCanvas.toDataURL()})`;
    }
  };
};

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (验证成功.value) return;
  
  isDragging.value = true;
  e.preventDefault();
  
  const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !sliderBarRef.value || !sliderBtnRef.value) return;
    
    const barRect = sliderBarRef.value.getBoundingClientRect();
    const btnWidth = sliderBtnRef.value.offsetWidth;
    
    let clientX: number;
    if (moveEvent instanceof MouseEvent) {
      clientX = moveEvent.clientX;
    } else {
      clientX = moveEvent.touches[0].clientX;
    }
    
    let newPosition = clientX - barRect.left;
    newPosition = Math.max(0, Math.min(newPosition, barRect.width - btnWidth));
    
    sliderPosition.value = newPosition;
  };
  
  const handleUp = () => {
    if (!isDragging.value) return;
    
    isDragging.value = false;
    
    // 验证拼图是否对齐
    const tolerance = 5;
    if (Math.abs(sliderPosition.value - puzzleX.value) <= tolerance) {
      验证成功.value = true;
      验证失败.value = false;
      tipsText.value = '验证成功';
      
      // 移动滑块到正确位置
      sliderPosition.value = puzzleX.value;
    } else {
      验证成功.value = false;
      验证失败.value = true;
      tipsText.value = '验证失败，请重试';
      
      // 滑块复位
      setTimeout(() => {
        sliderPosition.value = 0;
        验证失败.value = false;
        tipsText.value = '拖动滑块完成拼图';
      }, 1000);
    }
    
    document.removeEventListener('mousemove', handleMove as EventListener);
    document.removeEventListener('touchmove', handleMove as EventListener);
    document.removeEventListener('mouseup', handleUp);
    document.removeEventListener('touchend', handleUp);
  };
  
  document.addEventListener('mousemove', handleMove as EventListener);
  document.addEventListener('touchmove', handleMove as EventListener);
  document.addEventListener('mouseup', handleUp);
  document.addEventListener('touchend', handleUp);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  reset();
});
</script>

<style scoped>
.slider-captcha-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}

.captcha-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  width: 360px;
  max-width: 90vw;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
}

.captcha-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
}

.captcha-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.close-icon {
  cursor: pointer;
  color: #999;
  font-size: 20px;
  transition: color 0.3s;
}

.close-icon:hover {
  color: #666;
}

.captcha-body {
  padding: 20px;
}

.puzzle-container {
  position: relative;
  width: 320px;
  height: 160px;
  margin: 0 auto 20px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
  background: #f5f5f5;
}

.puzzle-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.slider-block {
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
  z-index: 10;
}

.slider-block-inner {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.slider-bar {
  position: relative;
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  z-index: 10;
  transition: box-shadow 0.3s;
}

.slider-btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slider-icon {
  color: #666;
  font-size: 18px;
}

.slider-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e8e8e8;
  border-radius: 20px;
}

.slider-track-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  transition: width 0.1s ease;
}

.captcha-tips {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  color: #999;
  transition: color 0.3s;
}

.captcha-tips.success {
  color: #67c23a;
}

.captcha-tips.error {
  color: #f56c6c;
}

.captcha-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e8e8e8;
}

.captcha-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
</style>