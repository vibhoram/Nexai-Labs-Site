// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotModal = document.getElementById('chatbotModal');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotQuickQuestions = document.getElementById('chatbotQuickQuestions');

// Pre-determined questions and responses
const chatbotData = {
    questions: [
        "What is Nexai Labs?",
        "Tell me about Focus or Fall",
        "Tell me about ApxFlow",
        "How can I contact you?",
        "What services do you offer?",
        "Is sign in available?",
        "What features are coming soon?",
        "Where are you located?",
        "How do I get started?",
        "What makes Nexai Labs different?",
        "I have a custom question."
    ],
    responses: {
        "what is nexai labs": {
            text: "Nexai Labs is a forward-thinking parent company dedicated to building innovative solutions that address real-world challenges. We foster a culture of excellence, creativity, and technological advancement. Our mission is to create transformative products that empower businesses and individuals through cutting-edge technology.",
            quickReplies: ["Tell me about your projects", "What services do you offer?"]
        },
        "tell me about focus or fall": {
            text: "Focus or Fall is one of our flagship projects located at fof.nexailabs.tech. It's a revolutionary platform designed to enhance productivity and focus through innovative methodologies and cutting-edge technology. The platform helps users maintain focus and achieve their goals through advanced tracking and analytics.",
            quickReplies: ["Tell me about ApxFlow", "What is Nexai Labs?"]
        },
        "tell me about apxflow": {
            text: "ApxFlow is an advanced workflow automation platform available at apxflow.nexailabs.tech. It streamlines business processes and maximizes efficiency through intelligent automation. ApxFlow helps organizations optimize their workflows and reduce manual tasks, allowing teams to focus on what matters most.",
            quickReplies: ["Tell me about Focus or Fall", "How can I get started?"]
        },
        "how can i contact you": {
            text: "You can reach us via email at support@nexailabs.tech. We're here to help answer any questions you might have about our products and services. Feel free to get in touch, and we'll get back to you as soon as possible!",
            quickReplies: ["What services do you offer?", "Where are you located?"]
        },
        "what services do you offer": {
            text: "Nexai Labs offers innovative solutions through our projects like Focus or Fall (productivity and focus enhancement) and ApxFlow (workflow automation). We specialize in creating transformative technology products that help businesses and individuals achieve their goals. More features and services are coming soon!",
            quickReplies: ["Tell me about your projects", "How can I get started?"]
        },
        "is sign in available": {
            text: "Sign in functionality is currently coming soon! We're working hard to implement this feature and many others. Stay tuned for updates as we continue to enhance our platform with new features and capabilities.",
            quickReplies: ["What features are coming soon?", "How can I contact you?"]
        },
        "what features are coming soon": {
            text: "We have many exciting features in development, including sign-in functionality, enhanced project features, and new capabilities across our platforms. We're constantly innovating and expanding our offerings. Keep an eye out for updates!",
            quickReplies: ["Is sign in available?", "What is Nexai Labs?"]
        },
        "where are you located": {
            text: "Nexai Labs operates primarily online through our digital platforms. You can visit our main website at nexailabs.tech, or explore our projects at fof.nexailabs.tech and apxflow.nexailabs.tech. For direct contact, email us at support@nexailabs.tech.",
            quickReplies: ["How can I contact you?", "What is Nexai Labs?"]
        },
        "how do i get started": {
            text: "To get started, you can explore our projects: Focus or Fall at fof.nexailabs.tech and ApxFlow at apxflow.nexailabs.tech. Visit these platforms to learn more about what we offer. If you have questions, feel free to contact us at support@nexailabs.tech. Sign-in functionality is coming soon!",
            quickReplies: ["Tell me about your projects", "How can I contact you?"]
        },
        "what makes nexai labs different": {
            text: "Nexai Labs stands out through our commitment to innovation-first solutions, user-centric design, and scalable technology. We focus on creating transformative products that address real-world challenges. Our combination of cutting-edge technology and innovative thinking sets us apart in the industry.",
            quickReplies: ["What services do you offer?", "Tell me about your projects"]
        },
        "custom question": {
            text: "Please fill out the form below, and we'll get back to you as soon as possible!",
            action: "show_contact_form"
        },
        "default": {
            text: "I'm here to help! You can ask me about Nexai Labs, our projects (Focus or Fall and ApxFlow), our services, or how to contact us. Feel free to use the quick questions below or type your own question! If I can't answer, I'll provide a contact form.",
            quickReplies: ["What is Nexai Labs?", "Tell me about your projects", "How can I contact you?", "I have a custom question."]
        }
    }
};

// Initialize chatbot
function initChatbot() {
    // Add welcome message
    addBotMessage("Hello! I'm the Nexai Labs Assistant. How can I help you today?");
    
    // Add quick questions
    renderQuickQuestions();
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'chatbot-avatar';
    avatar.textContent = isUser ? 'You' : 'NL';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'chatbot-text';
    textDiv.innerHTML = text; // Use innerHTML to allow for form
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(textDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(text) {
    addMessage(text, false);
}

function addUserMessage(text) {
    addMessage(text, true);
}

// Render contact form
function renderContactForm() {
    const formHtml = `
        <form id="chatbotContactForm" class="chatbot-contact-form">
            <input type="text" id="contactName" placeholder="Your Name" required>
            <input type="email" id="contactEmail" placeholder="Your Email" required>
            <textarea id="contactQuestion" placeholder="Your Question" rows="4" required></textarea>
            <button type="submit" class="btn-primary">Send Message</button>
        </form>
    `;
    addBotMessage(formHtml);

    document.getElementById('chatbotContactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const question = document.getElementById('contactQuestion').value;

        const subject = encodeURIComponent(`Inquiry from ${name} via Chatbot`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nQuestion: ${question}`);
        
        window.location.href = `mailto:support@nexailabs.tech?subject=${subject}&body=${body}`;
        
        addBotMessage("Thanks for your message! We've opened your email client with a pre-filled message. We'll get back to you soon.");
        renderQuickQuestions(); // Reset quick questions
    });
}

// Process user input
function processUserInput(input) {
    const normalizedInput = input.toLowerCase().trim();
    
    // Find matching response
    let response = chatbotData.responses.default;
    
    // Check for exact or partial matches
    let matched = false;
    for (const [key, value] of Object.entries(chatbotData.responses)) {
        if (key !== 'default' && normalizedInput.includes(key)) {
            response = value;
            matched = true;
            break;
        }
    }

    // If no specific match and the input contains "question" or "ask", or if explicitly asking for custom question
    if ((!matched && (normalizedInput.includes("question") || normalizedInput.includes("ask"))) || normalizedInput.includes("custom question")) {
        response = chatbotData.responses["custom question"];
    }
    
    // Add bot response
    setTimeout(() => {
        addBotMessage(response.text);
        
        if (response.action === "show_contact_form") {
            renderContactForm();
            // Clear input and quick questions for the form
            chatbotInput.value = '';
            chatbotQuickQuestions.innerHTML = '';
        } else if (response.quickReplies && response.quickReplies.length > 0) {
            renderQuickQuestions(response.quickReplies);
        } else {
            renderQuickQuestions();
        }
    }, 500);
}

// Render quick questions
function renderQuickQuestions(questions = null) {
    chatbotQuickQuestions.innerHTML = '';
    const questionsToShow = questions || chatbotData.questions.slice(0, 6);
    
    questionsToShow.forEach(question => {
        const button = document.createElement('button');
        button.className = 'quick-question';
        button.textContent = question;
        button.addEventListener('click', () => {
            addUserMessage(question);
            processUserInput(question);
        });
        chatbotQuickQuestions.appendChild(button);
    });
}

// Event listeners
chatbotToggle.addEventListener('click', () => {
    chatbotModal.classList.add('active');
    chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
    chatbotModal.classList.remove('active');
});

chatbotSend.addEventListener('click', () => {
    const input = chatbotInput.value.trim();
    if (input) {
        addUserMessage(input);
        processUserInput(input);
        chatbotInput.value = '';
    }
});

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatbotSend.click();
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (chatbotModal.classList.contains('active') && 
        !chatbotModal.contains(e.target) && 
        !chatbotToggle.contains(e.target)) {
        chatbotModal.classList.remove('active');
    }
});

// Smooth scroll for anchor links
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

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation to improve performance
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
    
    // Hide preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }

    // Observe scroll-triggered animations
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Marquee hover pause effect (handled in CSS, but we can enhance it)
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        marqueeTrack.addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }

    // Back-to-Top Button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Feedback functionality
    const feedbackToggle = document.getElementById('feedbackToggle');
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackClose = document.getElementById('feedbackClose');
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackToggle.addEventListener('click', () => {
        feedbackModal.classList.add('active');
    });

    feedbackClose.addEventListener('click', () => {
        feedbackModal.classList.remove('active');
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('feedbackName').value;
        const email = document.getElementById('feedbackEmail').value;
        const feedbackText = document.getElementById('feedbackText').value;

        const subject = encodeURIComponent(`Feedback from ${name || 'Anonymous'} via Website`);
        const body = encodeURIComponent(`Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nFeedback: ${feedbackText}`);
        
        window.location.href = `mailto:support@nexailabs.tech?subject=${subject}&body=${body}`;
        
        alert("Thank you for your feedback! Your email client should open with a pre-filled message.");
        feedbackModal.classList.remove('active'); // Close modal after submission
        feedbackForm.reset(); // Clear the form
    });
});

