/**
 * Testimonials Carousel Enhancement
 * 
 * This script improves the testimonials carousel by:
 * 1. Creating a perfect loop by cloning items for smooth infinite scrolling
 * 2. Pausing animation on hover or touch
 * 3. Setting a slower animation speed
 * 4. Ensuring there are no spacing issues between slides
 */

document.addEventListener('DOMContentLoaded', function() {
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialContainer = document.querySelector('.testimonial-container');
  
  if (!testimonialTrack || !testimonialContainer) return;
  
  // Get all original testimonial items
  const testimonialItems = Array.from(testimonialTrack.querySelectorAll('.testimonial-item'));
  
  if (testimonialItems.length === 0) return;
  
  // Clone items for perfect loop
  const clonedItems = testimonialItems.map(item => item.cloneNode(true));
  
  // Append clones to create seamless loop
  clonedItems.forEach(item => {
    testimonialTrack.appendChild(item);
  });
  
  // Calculate the exact width needed for proper spacing
  const itemWidth = testimonialItems[0].offsetWidth;
  const itemMargin = parseInt(window.getComputedStyle(testimonialItems[0]).marginRight) || 0;
  const totalItemWidth = itemWidth + itemMargin;
  
  // Set the track width to ensure proper spacing
  const totalWidth = totalItemWidth * (testimonialItems.length * 2); // Original + cloned items
  testimonialTrack.style.width = `${totalWidth}px`;
  
  // Set consistent gap between items
  testimonialItems.forEach(item => {
    item.style.marginRight = '1.5rem';
  });
  
  clonedItems.forEach(item => {
    item.style.marginRight = '1.5rem';
  });
  
  // Set animation duration based on number of items (slower animation)
  const animationDuration = testimonialItems.length * 8; // 8 seconds per item
  testimonialTrack.style.animationDuration = `${animationDuration}s`;
  
  // Ensure the animation resets smoothly
  testimonialTrack.addEventListener('animationiteration', () => {
    // No jump when animation restarts
    testimonialTrack.style.transform = 'translateX(0)';
  });
  
  // Pause animation on hover or touch
  testimonialContainer.addEventListener('mouseenter', () => {
    testimonialTrack.style.animationPlayState = 'paused';
  });
  
  testimonialContainer.addEventListener('mouseleave', () => {
    testimonialTrack.style.animationPlayState = 'running';
  });
  
  // For touch devices
  testimonialContainer.addEventListener('touchstart', () => {
    testimonialTrack.style.animationPlayState = 'paused';
  }, { passive: true });
  
  testimonialContainer.addEventListener('touchend', () => {
    testimonialTrack.style.animationPlayState = 'running';
  }, { passive: true });
});
