/* ==========================================================================
   SAKR MAKES — ADVANCED OFFLINE CHATBOT
   Rule-based Bot with Search Engine & Voice Input
   ========================================================================== */

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────────────────
  const QUICK_CHIPS = [
    { label: '👋 من هو محمد؟', text: 'من هو محمد صقر؟' },
    { label: '🚀 مشاريعك', text: 'ما هي مشاريعك؟' },
    { label: '🧠 مهارات وتقنيات', text: 'ما هي مهاراتك؟' },
    { label: '🏆 شهادات', text: 'اعرض لي شهاداتك' },
    { label: '💼 خبرات العمل', text: 'حدثني عن خبراتك' },
    { label: '📬 تواصل معي', text: 'كيف يمكنني التواصل معك؟' },
    { label: '🔍 ابحث عن روبوت', text: 'ابحث عن روبوت' }
  ];

  // ── State ──────────────────────────────────────────────────────────────────
  let conversationHistory = [];
  let portfolioData = null;
  let isOpen = false;
  let isSpeaking = false;
  let isTyping = false;
  let isListening = false;
  let currentUtterance = null;
  let voiceEnabled = false;
  let recognition = null;

  // ── DOM References ─────────────────────────────────────────────────────────
  let fab, chatPanel, chatMessages, chatInput, sendBtn, micBtn,
    closeBtn, chipsContainer, typingIndicator, voiceToggleBtn;

  // ── Initialize Speech Recognition ──────────────────────────────────────────
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ar-EG'; // Default to Arabic, handles English fairly well too

      recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('chatbot-mic-btn--listening');
        chatInput.placeholder = "Listening... تحدث الآن...";
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
        sendMessage(); // Auto-send after speaking
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error', event.error);
        stopListening();
      };

      recognition.onend = () => {
        stopListening();
      };
    }
  }

  function toggleListening() {
    if (!recognition) {
      alert("عذراً، متصفحك لا يدعم ميزة التحدث بالصوت. (Speech Recognition is not supported in this browser)");
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  }

  function stopListening() {
    isListening = false;
    if (micBtn) micBtn.classList.remove('chatbot-mic-btn--listening');
    if (chatInput) chatInput.placeholder = "Ask me anything about Mohamed Sakr…";
  }

  // ── Search Engine ──────────────────────────────────────────────────────────
  function searchPortfolio(query) {
    if (!portfolioData) return null;
    const q = query.toLowerCase().trim();
    let results = [];

    // Search Projects
    if (portfolioData.projects) {
      portfolioData.projects.forEach(p => {
        if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q))) {
          results.push(`- 🚀 **[Project] ${p.title}**: ${p.description}`);
        }
      });
    }

    // Search Certifications
    if (portfolioData.certifications) {
      portfolioData.certifications.forEach(c => {
        if (c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)) {
          results.push(`- 🏆 **[Cert] ${c.title}** by ${c.issuer}`);
        }
      });
    }

    // Search Experience
    if (portfolioData.experience) {
      portfolioData.experience.forEach(e => {
        if (e.title.toLowerCase().includes(q) || e.organization.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) {
          results.push(`- 💼 **[Exp] ${e.title}** at ${e.organization}`);
        }
      });
    }

    // Search Skills
    if (portfolioData.skills && portfolioData.skills.ai_ml) {
      portfolioData.skills.ai_ml.forEach(s => {
        if (s.name.toLowerCase().includes(q)) {
           results.push(`- 🧠 **[Skill] ${s.name}** (${s.status})`);
        }
      });
    }

    if (results.length > 0) {
      return `I found ${results.length} matches for "**${query}**":\n\n` + results.join('\n');
    }
    return `لم أجد أي شيء يطابق "**${query}**". حاول البحث بكلمة أخرى مثل "روبوت" أو "AI".`;
  }

  // ── Local Response Logic ───────────────────────────────────────────────────
  function generateLocalResponse(message) {
    let text = message.toLowerCase();
    
    // Normalize Arabic text to handle common typos and variations (أ/إ/ا, ة/ه, etc)
    text = text.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ي$/g, 'ى');
    
    if (!portfolioData) {
      return "أنا أحاول تحميل البيانات، يرجى المحاولة بعد قليل. (I'm still loading data, please try again).";
    }

    // Intent: Explicit Search (ابحث عن, search for)
    const searchMatch = text.match(/(?:ابحث عن|دور على|ابحث|search for|find)\s+(.+)/);
    if (searchMatch && searchMatch[1]) {
      return searchPortfolio(searchMatch[1]);
    }

    // Intent: Contact
    if (/(contact|email|تواصل|ايميل|رقم|whatsapp|واتس|تليفون|هاتف)/.test(text)) {
      return `You can contact Mohamed Sakr here:\n\n📧 Email: **mo.sakr1400@gmail.com**\n📱 WhatsApp: **+20 100 925 2592**\n\nHe is always open to new opportunities and interesting projects!`;
    }

    // Intent: Projects
    if (/(project|مشروع|مشاريع|اعمال|portfolio)/.test(text)) {
      let response = `Here are some of Mohamed's awesome projects:\n\n`;
      const projects = portfolioData.projects || [];
      projects.slice(0, 3).forEach(p => {
        response += `- **${p.title}**: ${p.description}\n`;
      });
      response += `\nCheck out the Projects section on the website for more details, live demos, and GitHub links!`;
      return response;
    }

    // Intent: Skills
    if (/(skill|tool|مهار|تقني|برمج|لغات|لغه|language)/.test(text)) {
      const skills = portfolioData.skills || {};
      let response = `Mohamed is highly skilled in AI and Hardware! Here is a summary:\n\n`;
      response += `**AI & ML:** ${(skills.ai_ml || []).map(s => s.name).join(', ')}\n`;
      response += `**Languages:** ${(skills.languages || []).map(s => s.name).join(', ')}\n`;
      response += `**Strengths:** ${(skills.strengths || []).join(', ')}`;
      return response;
    }

    // Intent: Experience
    if (/(experience|work|خبر|عمل|شغل|وظي|سي في|cv)/.test(text)) {
      const exp = portfolioData.experience || [];
      let response = `Here is Mohamed's experience:\n\n`;
      exp.forEach(e => {
        response += `- **${e.title}** at ${e.organization} (${e.duration})\n`;
      });
      return response;
    }

    // Intent: Certifications
    if (/(certif|شهاد|course|كورس|دبلوم)/.test(text)) {
      const certs = portfolioData.certifications || [];
      let response = `Mohamed has several certifications. Here are a few:\n\n`;
      certs.slice(0, 3).forEach(c => {
        response += `- **${c.title}** by ${c.issuer}\n`;
      });
      return response;
    }

    // Intent: Social Links
    if (/(social|link|github|linkedin|رابط|روابط|مواقع)/.test(text)) {
      const socials = portfolioData.socials || [];
      let response = `You can find Mohamed online at:\n\n`;
      socials.forEach(s => {
        response += `- [${s.platform}](${s.url})\n`;
      });
      return response;
    }

    // Intent: YouTube / Videos
    if (/(youtube|يوتيوب|يوتوب|فيديو|قناه|video|channel)/.test(text)) {
      return `📺 **Sakr Makes Channel**\n\nمحمد لديه قناة رائعة على اليوتيوب باسم **Sakr Makes** يشارك فيها أحدث اختراعاته، الروبوتات، وتطبيقات الذكاء الاصطناعي بشكل عملي وممتع!\n\nيمكنك البحث عنها في يوتيوب لمشاهدة كل المشاريع التي يعمل عليها، ولا تنسَ دعم القناة بالاشتراك! 😉`;
    }

    // Intent: Who is / About
    if (/(who|about|من هو|عن|sakr|محمد صقر|مين)/.test(text)) {
      const profile = portfolioData.profile || {};
      return `**Mohamed Sakr (محمد صقر)** is a ${profile.title || 'Computer Engineering student, AI & ML Engineer, and Founder of Sakr Makes'}. \n\n${profile.bio || ''}\n\nHe specializes in blending Artificial Intelligence with Hardware engineering to solve real-world problems.`;
    }

    // Intent: Greetings
    if (/(hi|hello|مرحبا|اهلا|سلام|hey)/.test(text)) {
      return `Hello! 👋 I'm SakrBot. I can tell you about Mohamed's projects, skills, experience, and contact info. Or you can ask me to search for something specific like "ابحث عن روبوت"!`;
    }

    // Fuzzy Fallback Search
    // If no specific intent matched, we try to see if the whole word is a keyword in the portfolio.
    const fuzzyResult = searchPortfolio(text);
    if (!fuzzyResult.includes("لم أجد أي شيء")) {
      return `I wasn't sure what you meant, but I searched for it and found this:\n\n` + fuzzyResult;
    }

    // Absolute Fallback
    return `I'm currently running offline. 😊 I can't chat normally, but I *can* quickly find info for you.\n\nTry asking me about Mohamed's **skills**, **projects**, **experience**, **certifications**, or **contact info**.\nOr type **"ابحث عن [كلمة]"** to search his portfolio!`;
  }

  // ── Message Rendering ──────────────────────────────────────────────────────
  function renderMessage(text, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message chatbot-message--${role}`;

    if (role === 'bot') {
      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'chatbot-avatar';
      avatarDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';
      messageDiv.appendChild(avatarDiv);
    }

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chatbot-bubble';
    bubbleDiv.innerHTML = formatMessage(text);
    messageDiv.appendChild(bubbleDiv);

    if (role === 'bot') {
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'chatbot-bubble-actions';
      actionsDiv.innerHTML = `
        <button class="chatbot-action-btn chatbot-copy-btn" title="Copy" aria-label="Copy message">
          <i class="fa-solid fa-copy"></i>
        </button>
        <button class="chatbot-action-btn chatbot-speak-btn" title="Read aloud" aria-label="Read aloud">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      `;
      actionsDiv.querySelector('.chatbot-copy-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
          const btn = actionsDiv.querySelector('.chatbot-copy-btn i');
          btn.className = 'fa-solid fa-check';
          setTimeout(() => { btn.className = 'fa-solid fa-copy'; }, 2000);
        });
      });
      actionsDiv.querySelector('.chatbot-speak-btn').addEventListener('click', () => {
        speakText(text, actionsDiv.querySelector('.chatbot-speak-btn'));
      });
      messageDiv.appendChild(actionsDiv);
    }

    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    // Entrance animation
    requestAnimationFrame(() => {
      messageDiv.classList.add('chatbot-message--visible');
    });

    return messageDiv;
  }

  function formatMessage(text) {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.+)/, '<p>$1</p>');
  }

  // ── Typing Indicator ───────────────────────────────────────────────────────
  function showTypingIndicator() {
    if (typingIndicator) return;
    const div = document.createElement('div');
    div.className = 'chatbot-message chatbot-message--bot chatbot-typing-row';
    div.id = 'chatbot-typing-indicator';
    div.innerHTML = `
      <div class="chatbot-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="chatbot-bubble chatbot-typing">
        <span class="chatbot-dot"></span>
        <span class="chatbot-dot"></span>
        <span class="chatbot-dot"></span>
      </div>
    `;
    chatMessages.appendChild(div);
    typingIndicator = div;
    scrollToBottom();
    requestAnimationFrame(() => div.classList.add('chatbot-message--visible'));
  }

  function hideTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.remove();
      typingIndicator = null;
    }
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ── Send Message ───────────────────────────────────────────────────────────
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isTyping) return;

    // Render user message
    renderMessage(text, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatInput.focus();

    // Hide quick chips after first message
    if (chipsContainer) {
      chipsContainer.style.display = 'none';
    }

    // Show typing indicator
    isTyping = true;
    updateSendBtn();
    showTypingIndicator();

    // Calculate dynamic delay based on intent to feel natural (600ms - 1500ms)
    const delay = 600 + Math.random() * 900;

    // Simulate network delay for better UX
    setTimeout(() => {
      const botResponse = generateLocalResponse(text);
      hideTypingIndicator();
      if (botResponse) {
        renderMessage(botResponse, 'bot');
        // Auto-speak if voice is enabled
        if (voiceEnabled && 'speechSynthesis' in window) {
          speakText(botResponse, null);
        }
      }
      isTyping = false;
      updateSendBtn();
    }, delay);
  }

  function updateSendBtn() {
    if (!sendBtn) return;
    sendBtn.disabled = isTyping;
    sendBtn.querySelector('i').className = isTyping
      ? 'fa-solid fa-circle-notch fa-spin'
      : 'fa-solid fa-paper-plane';
    if (micBtn) {
      micBtn.disabled = isTyping;
    }
  }

  // ── Voice / Speech Synthesis ───────────────────────────────────────────────
  function speakText(text, btn) {
    if (!('speechSynthesis' in window)) return;

    // Stop current speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      if (btn) {
        btn.querySelector('i').className = 'fa-solid fa-volume-high';
        btn.classList.remove('chatbot-action-btn--active');
      }
      if (currentUtterance === text) {
        currentUtterance = null;
        return; // Toggle off
      }
    }

    // Strip HTML and markdown
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick a good voice (Prefer Arabic or English Premium)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('ar')) || 
                           voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))) || 
                           voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
      isSpeaking = true;
      currentUtterance = text;
      if (btn) {
        btn.querySelector('i').className = 'fa-solid fa-volume-xmark';
        btn.classList.add('chatbot-action-btn--active');
      }
    };

    utterance.onend = utterance.onerror = () => {
      isSpeaking = false;
      currentUtterance = null;
      if (btn) {
        btn.querySelector('i').className = 'fa-solid fa-volume-high';
        btn.classList.remove('chatbot-action-btn--active');
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  // ── Welcome Message ────────────────────────────────────────────────────────
  function renderWelcomeMessage() {
    const welcome = `👋 Hi! I'm **SakrBot** — Mohamed Sakr's Advanced Assistant.\n\nI can quickly search through his **projects**, **skills**, **experience**, and **contact info**.\n\n💡 *Tip: Try clicking the Mic button and say "ابحث عن روبوت" (Search for robot)!*`;
    renderMessage(welcome, 'bot');
  }

  // ── Panel Open / Close ─────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    chatPanel.classList.add('chatbot-panel--open');
    fab.classList.add('chatbot-fab--open');
    fab.setAttribute('aria-expanded', 'true');

    // Show welcome + chips on first open
    if (conversationHistory.length === 0 && chatMessages.children.length === 0) {
      renderWelcomeMessage();
    }

    setTimeout(() => chatInput?.focus(), 300);
  }

  function closeChat() {
    isOpen = false;
    chatPanel.classList.remove('chatbot-panel--open');
    fab.classList.remove('chatbot-fab--open');
    fab.setAttribute('aria-expanded', 'false');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    isSpeaking = false;
    stopListening();
  }

  // ── Inject HTML ────────────────────────────────────────────────────────────
  function injectHTML() {
    const hasVoice = 'speechSynthesis' in window;
    const hasSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    const chipsHTML = QUICK_CHIPS.map(c =>
      `<button class="chatbot-chip" data-text="${c.text}">${c.label}</button>`
    ).join('');

    const voiceToggleHTML = hasVoice ? `
      <button id="chatbot-voice-toggle" class="chatbot-voice-toggle" title="Toggle auto voice" aria-label="Toggle auto voice response" aria-pressed="false">
        <i class="fa-solid fa-microphone-slash"></i>
      </button>` : '';

    const micBtnHTML = hasSpeechRecognition ? `
      <button id="chatbot-mic" class="chatbot-send-btn chatbot-mic-btn" aria-label="Speak" title="Voice Input (Arabic/English)">
        <i class="fa-solid fa-microphone"></i>
      </button>` : '';

    const html = `
    <!-- ── Chatbot FAB ── -->
    <button id="chatbot-fab" class="chatbot-fab" aria-label="Open AI Chat" aria-expanded="false" aria-haspopup="dialog">
      <div class="chatbot-fab-ring"></div>
      <div class="chatbot-fab-icon">
        <i class="fa-solid fa-robot chatbot-fab-open-icon"></i>
        <i class="fa-solid fa-xmark chatbot-fab-close-icon"></i>
      </div>
    </button>

    <!-- ── Chat Panel ── -->
    <div id="chatbot-panel" class="chatbot-panel" role="dialog" aria-label="SakrBot AI Chat" aria-modal="true">
      <!-- Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-header-avatar">
            <i class="fa-solid fa-robot"></i>
            <span class="chatbot-header-status-dot"></span>
          </div>
          <div class="chatbot-header-text">
            <span class="chatbot-header-name">SakrBot</span>
            <span class="chatbot-header-sub">Advanced Assistant · Sakr Makes</span>
          </div>
        </div>
        <div class="chatbot-header-actions">
          ${voiceToggleHTML}
          <button id="chatbot-clear" class="chatbot-icon-btn" title="Clear chat" aria-label="Clear conversation">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <button id="chatbot-close" class="chatbot-icon-btn" title="Close chat" aria-label="Close chat">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div id="chatbot-messages" class="chatbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
        <!-- Messages injected here -->
      </div>

      <!-- Quick Chips -->
      <div id="chatbot-chips" class="chatbot-chips-container">
        <div class="chatbot-chips-scroll">
          ${chipsHTML}
        </div>
      </div>

      <!-- Input Row -->
      <div class="chatbot-input-row">
        <textarea
          id="chatbot-input"
          class="chatbot-textarea"
          placeholder="Ask me anything about Mohamed Sakr…"
          rows="1"
          maxlength="1000"
          aria-label="Type your message"
        ></textarea>
        ${micBtnHTML}
        <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send message" title="Send">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
      <div class="chatbot-footer-note">SakrBot Advanced Offline Mode · Powered by Local Search Engine</div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ── Bind Event Listeners ───────────────────────────────────────────────────
  function bindEvents() {
    fab = document.getElementById('chatbot-fab');
    chatPanel = document.getElementById('chatbot-panel');
    chatMessages = document.getElementById('chatbot-messages');
    chatInput = document.getElementById('chatbot-input');
    sendBtn = document.getElementById('chatbot-send');
    micBtn = document.getElementById('chatbot-mic');
    closeBtn = document.getElementById('chatbot-close');
    chipsContainer = document.getElementById('chatbot-chips');
    voiceToggleBtn = document.getElementById('chatbot-voice-toggle');

    // FAB toggle
    fab.addEventListener('click', () => {
      isOpen ? closeChat() : openChat();
    });

    // Close button
    closeBtn.addEventListener('click', closeChat);

    // Clear button
    document.getElementById('chatbot-clear').addEventListener('click', () => {
      conversationHistory = [];
      chatMessages.innerHTML = '';
      if (chipsContainer) chipsContainer.style.display = '';
      renderWelcomeMessage();
    });

    // Send button
    sendBtn.addEventListener('click', sendMessage);

    // Mic button
    if (micBtn) {
      micBtn.addEventListener('click', toggleListening);
    }

    // Input key handler
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });

    // Quick chips
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chatbot-chip');
      if (!chip) return;
      chatInput.value = chip.dataset.text;
      sendMessage();
    });

    // Voice toggle
    if (voiceToggleBtn) {
      voiceToggleBtn.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        voiceToggleBtn.setAttribute('aria-pressed', voiceEnabled);
        const icon = voiceToggleBtn.querySelector('i');
        if (voiceEnabled) {
          icon.className = 'fa-solid fa-microphone';
          voiceToggleBtn.classList.add('chatbot-voice-toggle--active');
          voiceToggleBtn.title = 'Auto-voice ON — click to turn off';
        } else {
          icon.className = 'fa-solid fa-microphone-slash';
          voiceToggleBtn.classList.remove('chatbot-voice-toggle--active');
          voiceToggleBtn.title = 'Auto-voice OFF — click to turn on';
          if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          isSpeaking = false;
        }
      });
    }

    // Close on backdrop click for mobile (outside panel)
    document.addEventListener('click', (e) => {
      if (isOpen && !chatPanel.contains(e.target) && !fab.contains(e.target)) {
        closeChat();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });
  }

  // ── Load Portfolio Data ────────────────────────────────────────────────────
  async function loadPortfolioData() {
    try {
      const response = await fetch('data.json');
      if (response.ok) {
        portfolioData = await response.json();
      }
    } catch (e) {
      console.warn('[SakrBot] Could not load data.json, using minimal knowledge.');
    }
  }

  // ── Initialize ─────────────────────────────────────────────────────────────
  async function init() {
    // Load portfolio data in background
    await loadPortfolioData();

    // Inject HTML
    injectHTML();

    // Initialize Web Speech API for voice input
    initSpeechRecognition();

    // Preload voices for speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        window.speechSynthesis.getVoices();
      });
    }

    // Bind all events
    bindEvents();

    // Show FAB with a subtle entrance delay
    setTimeout(() => {
      const f = document.getElementById('chatbot-fab');
      if (f) f.classList.add('chatbot-fab--visible');
    }, 1500);
  }

  // ── Boot on DOM Ready ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
