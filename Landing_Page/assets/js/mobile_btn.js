document.addEventListener('DOMContentLoaded', () => {
  // Enhanced counter function with better performance
  function counter(element, start, end, duration, suffix = '', prefix = '') {
    let current = start
    const range = Math.abs(end - start)
    const increment = end > start ? 1 : -1
    const stepTime = Math.max(16, Math.floor(duration / range)) // Minimum 16ms for smooth animation

    const timer = setInterval(() => {
      current += increment
      const formattedNumber = current.toLocaleString()
      element.textContent = prefix + formattedNumber + suffix

      if (current === end) {
        clearInterval(timer)
      }
    }, stepTime)
  }

  // Global observer for all counter sections
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target
          const dataset = section.dataset

          // Get counter configuration from data attributes
          const targetId = dataset.counterTarget
          const start = parseInt(dataset.counterStart) || 0
          const end = parseInt(dataset.counterEnd) || 100
          const duration = parseInt(dataset.counterDuration) || 2000
          const suffix = dataset.counterSuffix || ''
          const prefix = dataset.counterPrefix || ''

          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            counter(targetElement, start, end, duration, suffix, prefix)
            observer.unobserve(section) // Stop observing this specific section
          } else {
            console.error(`Counter element with id '${targetId}' not found!`)
          }
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before coming into view
    }
  )

  // Automatically find and observe all counter sections
  const counterSections = document.querySelectorAll('[data-counter-target]')

  if (counterSections.length === 0) {
    console.warn('No counter sections found! Make sure elements have data-counter-target attribute.')
  }

  counterSections.forEach(section => {
    observer.observe(section)
  })

  // Alternative: Class-based detection
  // If you prefer using classes instead of data attributes
  const classBasedCounters = document.querySelectorAll('.counter-section')
  classBasedCounters.forEach(section => {
    // You can still use data attributes or define configs here
    observer.observe(section)
  })
})

/* Marquee animation */
const clone = document.querySelectorAll('.clone')
clone.forEach(item => {
  const content = item.innerHTML
  item.innerHTML = content + content + content
})

/* Scroll Active */
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-link')

window.addEventListener('scroll', () => {
  let current = ''

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80 // Adjust for fixed navbar height
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('text-primary')
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-primary')
    }
  })
})
// Initialize arrow animation
function initArrowAnimation() {
  const arrowPath = document.getElementById('arrowPath')
  if (!arrowPath) return

  const pathLength = arrowPath.getTotalLength()

  arrowPath.style.strokeDasharray = pathLength
  arrowPath.style.strokeDashoffset = pathLength

  // Apply animation
  arrowPath.style.animation = `draw 3s ease-in-out forwards, fadeIn 3s ease-in-out forwards`
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initArrowAnimation)

// Header scroll effect
window.addEventListener('load', function () {
  const header = document.getElementById('header')

  // Function to check and apply styles based on scroll position
  function checkScroll() {
    if (window.scrollY > 0) {
      header.classList.add('bg-base-100', 'shadow-sm', 'shadow-base-300/20')
    } else {
      header.classList.remove('bg-base-100', 'shadow-sm', 'shadow-base-300/20')
    }
  }

  // Check on page load
  checkScroll()

  // Listen for scroll events
  window.addEventListener('scroll', checkScroll)
})

// Scroll to top button
document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn')
  scrollToTopBtn.classList.add('hidden')
})

window.onscroll = function () {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn')

  // Show button only after scrolling 100px
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.classList.remove('hidden')
  } else {
    scrollToTopBtn.classList.add('hidden')
  }
}

// Keep the click handler the same
document.getElementById('scrollToTopBtn').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})