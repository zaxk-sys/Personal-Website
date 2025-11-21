// ============================================
// 3D FLIP CARD AI ASSISTANT
// ============================================

(function() {
    'use strict';

    // Ensure AI assistant is moved to body if needed (fix for Lenis)
    const aiContainer = document.getElementById('aiAssistant');
    if (aiContainer && aiContainer.parentElement !== document.body) {
        document.body.appendChild(aiContainer);
    }

    // Force fixed positioning workaround for Lenis
    if (aiContainer) {
        // Reset any transforms that Lenis might apply (but don't touch flip-card transforms)
        const resetPosition = () => {
            // Only reset container, not the flip-card inside
            if (!aiContainer.classList.contains('flipping')) {
                aiContainer.style.position = 'fixed';
                aiContainer.style.bottom = '2rem';
                aiContainer.style.right = '2rem';
                aiContainer.style.transform = 'translate3d(0, 0, 0)';
                aiContainer.style.zIndex = '99999';
            }
        };
        
        // Reset on scroll and resize (throttled)
        let resetTimeout;
        const throttledReset = () => {
            clearTimeout(resetTimeout);
            resetTimeout = setTimeout(resetPosition, 50);
        };
        
        window.addEventListener('scroll', throttledReset, { passive: true });
        window.addEventListener('resize', throttledReset);
        
        // Initial reset
        resetPosition();
    }

    // DOM Elements
    const flipCard = document.querySelector('.flip-card');
    const flipCardFront = document.querySelector('.flip-card-front');
    const flipBackBtn = document.querySelector('.flip-back-btn');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    // State
    let isFlipped = false;
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    let isMinimized = true; // Start minimized by default

    // ============================================
    // MINIMIZE/EXPAND FUNCTIONALITY
    // ============================================

    function minimizeWidget() {
        if (aiContainer) {
            aiContainer.classList.add('minimized');
            isMinimized = true;
            // Reset flip state when minimizing
            if (isFlipped) {
                flipCardToFront();
            }
        }
    }

    function expandWidget() {
        if (aiContainer) {
            aiContainer.classList.remove('minimized');
            isMinimized = false;
        }
    }

    // Initialize as minimized
    if (aiContainer) {
        minimizeWidget();
    }

    // ============================================
    // DRAG FUNCTIONALITY
    // ============================================

    if (aiContainer && flipCardFront) {
        // Only allow dragging on the front card when not flipped and not minimized
        flipCardFront.addEventListener('mousedown', (e) => {
            if (!isFlipped && !isMinimized && e.target.closest('.flip-card-front')) {
                isDragging = true;
                const rect = aiContainer.getBoundingClientRect();
                dragOffset.x = e.clientX - rect.left;
                dragOffset.y = e.clientY - rect.top;
                flipCard.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging && !isFlipped) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;
                
                // Keep within viewport bounds
                const maxX = window.innerWidth - aiContainer.offsetWidth;
                const maxY = window.innerHeight - aiContainer.offsetHeight;
                
                const clampedX = Math.max(0, Math.min(newX, maxX));
                const clampedY = Math.max(0, Math.min(newY, maxY));
                
                aiContainer.style.left = 'auto';
                aiContainer.style.right = 'auto';
                aiContainer.style.bottom = 'auto';
                aiContainer.style.top = 'auto';
                aiContainer.style.left = clampedX + 'px';
                aiContainer.style.top = clampedY + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                flipCard.style.cursor = 'grab';
            }
        });

        // Touch support for mobile
        flipCardFront.addEventListener('touchstart', (e) => {
            if (!isFlipped && !isMinimized && e.target.closest('.flip-card-front')) {
                isDragging = true;
                const touch = e.touches[0];
                const rect = aiContainer.getBoundingClientRect();
                dragOffset.x = touch.clientX - rect.left;
                dragOffset.y = touch.clientY - rect.top;
                e.preventDefault();
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging && !isFlipped) {
                const touch = e.touches[0];
                const newX = touch.clientX - dragOffset.x;
                const newY = touch.clientY - dragOffset.y;
                
                const maxX = window.innerWidth - aiContainer.offsetWidth;
                const maxY = window.innerHeight - aiContainer.offsetHeight;
                
                const clampedX = Math.max(0, Math.min(newX, maxX));
                const clampedY = Math.max(0, Math.min(newY, maxY));
                
                aiContainer.style.left = 'auto';
                aiContainer.style.right = 'auto';
                aiContainer.style.bottom = 'auto';
                aiContainer.style.top = 'auto';
                aiContainer.style.left = clampedX + 'px';
                aiContainer.style.top = clampedY + 'px';
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
            }
        });
    }
    let messageHistory = [
        {
            role: 'assistant',
            content: "Hello! I'm Zak's AI assistant. How can I help you today?"
        }
    ];

    // ============================================
    // FLIP CARD FUNCTIONALITY
    // ============================================

    function flipCardToBack() {
        if (!isFlipped && flipCard) {
            const container = document.getElementById('aiAssistant');
            if (container) {
                container.classList.add('flipping');
            }
            
            // Make avatar look excited when clicked
            if (window.avatarElements && window.avatarElements.head) {
                window.avatarElements.head.style.animation = 'headBob 0.3s ease-in-out 3';
            }
            
            flipCard.classList.add('flipped');
            isFlipped = true;
            // Focus input after flip animation
            setTimeout(() => {
                if (chatInput) chatInput.focus();
                if (container) {
                    container.classList.remove('flipping');
                }
            }, 800);
        }
    }

    function flipCardToFront() {
        if (isFlipped && flipCard) {
            const container = document.getElementById('aiAssistant');
            if (container) {
                container.classList.add('flipping');
            }
            flipCard.classList.remove('flipped');
            isFlipped = false;
            setTimeout(() => {
                if (container) {
                    container.classList.remove('flipping');
                }
            }, 800);
        }
    }

    // Click front card to expand (when minimized) or flip (when expanded)
    if (flipCardFront) {
        flipCardFront.addEventListener('click', (e) => {
            // Don't flip if we just finished dragging
            if (isDragging) {
                return;
            }
            
            // If minimized, expand first
            if (isMinimized) {
                e.preventDefault();
                expandWidget();
                return;
            }
            
            // If expanded, flip to chat
            if (e.target === flipCardFront || e.target.closest('.flip-card-front')) {
                // Small delay to check if it was a drag
                setTimeout(() => {
                    if (!isDragging) {
                        flipCardToBack();
                    }
                }, 100);
            }
        });
    }

    // Click back button to flip back
    if (flipBackBtn) {
        flipBackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCardToFront();
        });
    }

    // Add close button handlers
    const closeBtn = document.querySelector('.chat-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            minimizeWidget();
        });
    }

    // Add front-side close button handler
    const frontCloseBtn = document.querySelector('.flip-card-front-close');
    if (frontCloseBtn) {
        frontCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            minimizeWidget();
        });
    }

    // ============================================
    // CHAT FUNCTIONALITY
    // ============================================

    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = content;
        
        contentDiv.appendChild(p);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to history
        messageHistory.push({ role, content });
    }

    function showTypingIndicator() {
        typingIndicator.classList.add('active');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        typingIndicator.classList.remove('active');
    }

    // ============================================
    // API HANDLER (Mock for now)
    // ============================================

    async function sendMessageToAPI(message) {
        // TODO: Replace with your actual API endpoint
        // Example: OpenAI, Anthropic, or your backend
        
        // Mock response for demonstration
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate different responses based on message
                const lowerMessage = message.toLowerCase();
                let response = "I'm a mock AI assistant. This is a placeholder response.";
                
                if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                    response = "Hello! How can I help you today?";
                } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
                    response = "I'd be happy to discuss projects! Zak specializes in cloud infrastructure, Azure, Kubernetes, and AI security. What would you like to know?";
                } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
                    response = "You can reach Zak at itszakariya0@gmail.com or connect on LinkedIn. Would you like me to help you with something specific?";
                } else if (lowerMessage.includes('azure') || lowerMessage.includes('cloud')) {
                    response = "Zak is an expert in Azure cloud infrastructure, Kubernetes orchestration, and DevOps practices. He builds scalable, resilient systems. What would you like to know more about?";
                } else {
                    response = "That's interesting! I'm here to help answer questions about Zak's work, projects, or expertise. What would you like to know?";
                }
                
                resolve(response);
            }, 1500); // Simulate API delay
        });
    }

    // ============================================
    // SEND MESSAGE HANDLER
    // ============================================

    async function handleSendMessage() {
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Disable input and button
        chatInput.disabled = true;
        sendBtn.disabled = true;
        
        // Add user message
        addMessage('user', message);
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Send to API
            const response = await sendMessageToAPI(message);
            
            // Hide typing indicator
            hideTypingIndicator();
            
            // Add assistant response
            addMessage('assistant', response);
            
        } catch (error) {
            hideTypingIndicator();
            addMessage('assistant', "Sorry, I encountered an error. Please try again later.");
            console.error('AI Assistant Error:', error);
        } finally {
            // Re-enable input and button
            chatInput.disabled = false;
            sendBtn.disabled = false;
            chatInput.focus();
        }
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    // ============================================
    // EXPOSE API FOR EXTERNAL INTEGRATION
    // ============================================

    window.aiAssistant = {
        flipToBack: flipCardToBack,
        flipToFront: flipCardToFront,
        minimize: minimizeWidget,
        expand: expandWidget,
        sendMessage: handleSendMessage,
        addMessage: addMessage,
        // For API integration - replace sendMessageToAPI function
        setAPIHandler: (handler) => {
            window.aiAssistant.sendMessageToAPI = handler;
        }
    };

    // ============================================
    // ANIMATED AVATAR - EYE TRACKING
    // ============================================

    const avatarContainer = document.getElementById('animatedAvatar');
    const leftIris = document.querySelector('.left-eye .iris');
    const rightIris = document.querySelector('.right-eye .iris');
    const leftPupil = document.querySelector('.left-eye .pupil');
    const rightPupil = document.querySelector('.right-eye .pupil');
    const avatarHead = document.querySelector('.avatar-head');
    const avatarFace = document.querySelector('.avatar-face-shape');

        if (avatarContainer && leftIris && rightIris && leftPupil && rightPupil) {
            let mouseX = 0;
            let mouseY = 0;
            let avatarX = 0;
            let avatarY = 0;

            // Get avatar center position
            const updateAvatarPosition = () => {
                const rect = avatarContainer.getBoundingClientRect();
                avatarX = rect.left + rect.width / 2;
                avatarY = rect.top + rect.height / 2;
            };

            updateAvatarPosition();
            window.addEventListener('resize', updateAvatarPosition);
            window.addEventListener('scroll', updateAvatarPosition, { passive: true });

            // Track mouse movement
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                updateAvatarPosition();

                // Calculate distance and angle from avatar to mouse
                const deltaX = mouseX - avatarX;
                const deltaY = mouseY - avatarY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = 250; // Maximum distance for eye movement
                const maxPupilMove = 2.5; // Maximum pixels the pupil can move within eyeball

                // Normalize and limit movement
                const normalizedDistance = Math.min(distance / maxDistance, 1);
                const moveX = (deltaX / distance) * maxPupilMove * normalizedDistance;
                const moveY = (deltaY / distance) * maxPupilMove * normalizedDistance;

                // Apply to both irises and pupils (clamp within eyeball bounds)
                if (leftIris && rightIris && leftPupil && rightPupil) {
                    const clampedX = Math.max(-2.5, Math.min(2.5, moveX));
                    const clampedY = Math.max(-2.5, Math.min(2.5, moveY));
                    leftIris.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
                    rightIris.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
                    leftPupil.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
                    rightPupil.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
                }

                // Subtle head and face movement towards cursor
                if (avatarHead && avatarFace) {
                    const headRotateX = (deltaY / distance) * 3 * normalizedDistance;
                    const headRotateY = (deltaX / distance) * 3 * normalizedDistance;
                    avatarHead.style.transform = `translateY(0) rotateX(${headRotateX}deg) rotateY(${headRotateY}deg)`;
                }
            });

            // Reset when mouse leaves viewport
            document.addEventListener('mouseleave', () => {
                if (leftIris && rightIris && leftPupil && rightPupil) {
                    leftIris.style.transform = 'translate(-50%, -50%)';
                    rightIris.style.transform = 'translate(-50%, -50%)';
                    leftPupil.style.transform = 'translate(-50%, -50%)';
                    rightPupil.style.transform = 'translate(-50%, -50%)';
                }
                if (avatarHead) {
                    avatarHead.style.transform = 'translateY(0) rotate(0deg)';
                }
            });

        // Store reference to avatar elements for use in flip function
        window.avatarElements = {
            head: avatarHead,
            face: avatarFace,
            leftPupil: leftPupil,
            rightPupil: rightPupil
        };
    }

    console.log('AI Assistant initialized');
})();

