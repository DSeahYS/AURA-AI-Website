// AURA AI Website JavaScript
// Handles demo interactions, API calls, and UI functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo functionality
    initializeDemo();

    // Add smooth scrolling for navigation
    initializeSmoothScrolling();

    // Add scroll animations
    initializeScrollAnimations();
});

// Demo functionality
function initializeDemo() {
    const demoQuery = document.getElementById('demo-query');
    const demoSubmit = document.getElementById('demo-submit');
    const responseDisplay = document.getElementById('response-display');
    const responseTiming = document.getElementById('response-timing');

    demoSubmit.addEventListener('click', async () => {
        const query = demoQuery.value.trim();

        if (!query) {
            showError('Please enter a question about EVA procedures.');
            return;
        }

        // Show loading state
        setLoadingState(true);

        const startTime = Date.now();

        try {
            // Call AURA API (replace with your actual API endpoint)
            const response = await callAuraAPI(query);

            const endTime = Date.now();
            const responseTime = endTime - startTime;

            // Update UI
            updateResponse(response, responseTime);

        } catch (error) {
            console.error('API Error:', error);
            showError('Unable to get response from AURA AI. Please try again later.');
            responseTiming.textContent = '-- ms';
        } finally {
            setLoadingState(false);
        }
    });

    // Allow Enter key to submit (Ctrl+Enter for multi-line)
    demoQuery.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            demoSubmit.click();
        }
    });
}

// API call function (replace with your actual API endpoint)
async function callAuraAPI(query) {
    // For demo purposes, return a mock response
    // Replace this with actual API call to your backend
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

    // Mock responses based on query content
    const responses = {
        'suit pressure': `EMERGENCY SUIT PRESSURE PROTOCOL:

1. IMMEDIATE ACTIONS:
   - Freeze all movement
   - Announce "MAYDAY, MAYDAY - Suit pressure emergency"
   - Check wrist readout for exact pressure value

2. CRITICAL THRESHOLDS:
   - Below 3.0 psi: TREAT AS CRITICAL
   - Below 2.5 psi: ABORT EVA immediately

3. EMERGENCY PROCEDURES:
   - Activate suit emergency oxygen
   - Prepare for emergency airlock repressurization
   - Contact mission control with pressure readings

4. PREVENTION MEASURES:
   - Regular suit integrity checks
   - Monitor pressure gauges continuously
   - Report any anomalies immediately`,

        'airlock': `AIRLOCK DEPRESSURIZATION CHECKLIST:

PRE-EVA AIRLOCK DEPRESSURIZATION SEQUENCE:

1. INNER HATCH VERIFICATION:
   - Close and dog inner hatch (3 full rotations)
   - Verify 4 green indicators on inner seal
   - Confirm pressure equalization

2. DEPRESSURIZATION INITIATION:
   - Announce "Depressurization sequence starting"
   - Activate depressurization pump
   - Monitor pressure drop to 3.8 psi

3. OUTER HATCH OPERATIONS:
   - Verify outer hatch indicators (all green)
   - Equalize pressure with EVA environment
   - Prepare for hatch opening

4. FINAL CHECKS:
   - Confirm suit pressure stability
   - Verify communications systems
   - Complete pre-EVA safety checklist`,

        'communication': `COMMUNICATION FAILURE PROTOCOLS:

PRIMARY COMMUNICATION LOSS RESPONSE:

1. IMMEDIATE ASSESSMENT:
   - Attempt primary channel reconnection (30 seconds)
   - Switch to backup communication system
   - Verify antenna positioning and power

2. EMERGENCY COMMUNICATION:
   - Activate emergency beacon if available
   - Use suit-to-suit direct communication
   - Establish line-of-sight visual signals

3. MISSION CONTROL COORDINATION:
   - Use satellite relay if available
   - Implement pre-established emergency protocols
   - Maintain position for rescue operations

4. PREVENTION AND RECOVERY:
   - Regular communication system checks
   - Maintain emergency frequency monitoring
   - Document all communication anomalies`
    };

    // Find matching response or provide default
    const queryLower = query.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (queryLower.includes(key)) {
            return response;
        }
    }

    // Default response for unrecognized queries
    return `AURA EVA ASSISTANT RESPONSE:

Based on your query: "${query}"

While I don't have specific protocol information for this exact scenario, here are the general EVA safety guidelines:

1. MAINTAIN CONSTANT AWARENESS of your environment
2. MONITOR all suit systems continuously
3. COMMUNICATE regularly with mission control
4. FOLLOW established safety protocols
5. REPORT any anomalies immediately

For specific procedures, please provide more details about the EVA operation or emergency situation.`;
}

// UI state management
function setLoadingState(isLoading) {
    const submitBtn = document.getElementById('demo-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function updateResponse(response, responseTime) {
    const responseDisplay = document.getElementById('response-display');
    const responseTiming = document.getElementById('response-timing');

    responseDisplay.innerHTML = `<div class="response-content">${response.replace(/\n/g, '<br>')}</div>`;
    responseTiming.textContent = `${responseTime} ms`;
}

function showError(message) {
    const responseDisplay = document.getElementById('response-display');
    responseDisplay.innerHTML = `<div class="error-message">${message}</div>`;
}

// Example query setter
function setExampleQuery(query) {
    document.getElementById('demo-query').value = query;
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Utility functions
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToAbout() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Performance monitoring (for demo purposes)
function trackPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;

            console.log(`Page load time: ${loadTime.toFixed(2)} ms`);
        });
    }
}

// Initialize performance tracking
trackPerformance();