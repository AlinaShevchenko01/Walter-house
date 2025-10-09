function circleRange () {
  const sliderWrapper = document.querySelector('.screen4__circle-container');
  const circlePath = document.getElementById('circle-screen4');
  const circleTrack = document.querySelector('.screen4__slider-track');
  const sliderHandle = document.querySelector('.screen4__big-dot');
  const valueFootage = document.querySelector('.screen4__footage');
  const svgElement = document.querySelector('.screen4__circle-svg');

  const maxAreaValue = 340;
  const strokeWidth = 2;

  if (!sliderWrapper || !circlePath|| !circleTrack || !sliderHandle || !valueFootage) return;

  let isDragging = false;
  let currentValue = -1;
  let svgCentre;
  let svgRadius;
  let circumference;

  function initSlider () {
    const wrapperSize = sliderWrapper.offsetHeight;
    if (wrapperSize === 0) return;
    svgCentre = wrapperSize / 2;
    svgRadius = svgCentre - (strokeWidth / 2);
    circumference = 2 * Math.PI * svgRadius;

    svgElement.setAttribute('viewBox', `0 0 ${wrapperSize} ${wrapperSize}`)
    circleTrack.setAttribute('cx', svgCentre);
    circleTrack.setAttribute('cy', svgCentre);
    circleTrack.setAttribute('r', svgRadius);
    circlePath.setAttribute('cx', svgCentre);
    circlePath.setAttribute('cy', svgCentre);
    circlePath.setAttribute('r', svgRadius);
    circlePath.style.strokeDasharray  = `${circumference}`;
  }

  function updateCircle(progress) {
    progress = Math.max(0, Math.min(1, progress));

    const handleSize = sliderHandle.offsetHeight;
    const angle = progress * 2 * Math.PI - Math.PI / 2;
    const centreX = svgCentre + svgRadius * Math.cos(angle);
    const centreY = svgCentre + svgRadius * Math.sin(angle);

    const x = centreX - (handleSize / 2);
    const y = centreY - (handleSize / 2);

    sliderHandle.style.left = `${x}px`;
    sliderHandle.style.top = `${y}px`;
    circlePath.style.strokeDashoffset = `${circumference * (1 - progress)}`;

    const newValue = Math.round(progress * maxAreaValue);

    if (newValue !== currentValue) {
      currentValue = newValue;
      valueFootage.textContent = `${newValue}`;
    }
  }

  function handleMove (e) {
    if (!isDragging) return
    e.stopPropagation()
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = sliderWrapper.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centreY, clientX - centreX) + Math.PI / 2;
    let progress = angle / (2 * Math.PI);
    if (progress < 0) progress += 1;

    updateCircle(progress);
  }

  function startDrag (e) {
    e.stopPropagation();
    isDragging = true;
    handleMove(e);
  }

  function stopDrag (e) {
    isDragging = false;
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      currentValue = -1;
      initSlider();
      updateCircle(0);
    }, 150)
  });

  setTimeout(() => {
    initSlider();
    updateCircle(0);
  }, 150)

  sliderWrapper.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', stopDrag);
  sliderWrapper.addEventListener('touchstart', startDrag, {passive: false});
  document.addEventListener('touchmove', handleMove, {passive: false});
  document.addEventListener('touchend', stopDrag);
}

circleRange();