import { ref, nextTick, onUnmounted, type Ref } from "vue";
import type { MainBanner } from "~/types/mainBanner";

const RANGE = 3;
const transitionDuration = 500;
const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 60;

interface CarouselSlot {
  slotId: number;
  item: MainBanner;
  position: number;
}

export function useBannerCarousel(banners: Ref<MainBanner[]>) {
  const currentIndex = ref(0);
  const slots = ref<CarouselSlot[]>([]);
  const isAnimating = ref(false);
  const isDragging = ref(false);
  const dragOffset = ref(0);
  const startX = ref(0);
  const currentX = ref(0);

  let slideInterval: ReturnType<typeof setInterval> | null = null;

  const getBannerIndex = (index: number) => {
    const length = banners.value.length;

    if (!length) {
      return 0;
    }

    return ((index % length) + length) % length;
  };

  const createSlots = () => {
    if (!banners.value.length) {
      slots.value = [];
      return;
    }

    const result: CarouselSlot[] = [];

    for (let position = -RANGE; position <= RANGE; position++) {
      const index = getBannerIndex(currentIndex.value + position);

      result.push({
        slotId: position + RANGE,
        item: banners.value[index]!,
        position,
      });
    }

    slots.value = result;
  };

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  const stopAutoSlide = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();

    if (banners.value.length <= 1) {
      return;
    }

    slideInterval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_MS);
  };

  const nextSlide = async () => {
    if (banners.value.length <= 1 || isAnimating.value) {
      return;
    }

    stopAutoSlide();

    isAnimating.value = true;

    currentIndex.value = getBannerIndex(currentIndex.value + 1);

    slots.value.forEach((slot) => {
      slot.position--;
    });

    await wait(transitionDuration);

    const firstSlot = slots.value.shift();

    if (firstSlot) {
      const newIndex = getBannerIndex(currentIndex.value + RANGE);

      firstSlot.item = banners.value[newIndex]!;
      firstSlot.position = RANGE;

      slots.value.push(firstSlot);
    }

    await nextTick();

    isAnimating.value = false;

    startAutoSlide();
  };

  const previousSlide = async () => {
    if (banners.value.length <= 1 || isAnimating.value) {
      return;
    }

    stopAutoSlide();

    isAnimating.value = true;

    currentIndex.value = getBannerIndex(currentIndex.value - 1);

    slots.value.forEach((slot) => {
      slot.position++;
    });

    await wait(transitionDuration);

    const lastSlot = slots.value.pop();

    if (lastSlot) {
      const newIndex = getBannerIndex(currentIndex.value - RANGE);

      lastSlot.item = banners.value[newIndex]!;
      lastSlot.position = -RANGE;

      slots.value.unshift(lastSlot);
    }

    await nextTick();

    isAnimating.value = false;

    startAutoSlide();
  };

  const goToSlide = async (index: number) => {
    if (
      banners.value.length <= 1 ||
      isAnimating.value ||
      index === currentIndex.value
    ) {
      return;
    }

    stopAutoSlide();

    const direction = index > currentIndex.value ? 1 : -1;
    const distance = Math.abs(index - currentIndex.value);

    if (distance > RANGE) {
      currentIndex.value = index;

      createSlots();

      startAutoSlide();

      return;
    }

    if (direction > 0) {
      for (let i = 0; i < distance; i++) {
        await nextSlide();
      }
    } else {
      for (let i = 0; i < distance; i++) {
        await previousSlide();
      }
    }

    startAutoSlide();
  };

  const startDrag = (event: PointerEvent) => {
    if (banners.value.length <= 1 || isAnimating.value) {
      return;
    }

    isDragging.value = true;

    startX.value = event.clientX;
    currentX.value = event.clientX;

    dragOffset.value = 0;

    stopAutoSlide();
  };

  const onDrag = (event: PointerEvent) => {
    if (!isDragging.value) {
      return;
    }

    currentX.value = event.clientX;

    dragOffset.value = currentX.value - startX.value;
  };

  const endDrag = async () => {
    if (!isDragging.value) {
      return;
    }

    const distance = currentX.value - startX.value;

    isDragging.value = false;
    dragOffset.value = 0;

    if (distance < -SWIPE_THRESHOLD) {
      await nextSlide();
      return;
    }

    if (distance > SWIPE_THRESHOLD) {
      await previousSlide();
      return;
    }

    startAutoSlide();
  };

  const cancelDrag = () => {
    if (!isDragging.value) {
      return;
    }

    isDragging.value = false;
    dragOffset.value = 0;

    startAutoSlide();
  };

  const init = () => {
    currentIndex.value = 0;

    createSlots();

    if (banners.value.length > 1) {
      startAutoSlide();
    }
  };

  onUnmounted(stopAutoSlide);

  return {
    currentIndex,
    slots,
    transitionDuration,
    isAnimating,
    isDragging,
    dragOffset,
    init,
    nextSlide,
    previousSlide,
    goToSlide,
    startDrag,
    onDrag,
    endDrag,
    cancelDrag,
    startAutoSlide,
    stopAutoSlide,
  };
}
