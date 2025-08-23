import React, { useState, useRef, useEffect } from 'react';
import './AiBot.css';
import { useLanguage } from '../Languages/LanguageContext';

const AiBot = () => {
    const { currentLanguage } = useLanguage();
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('aibot_messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    // Questions and answers in both languages
    const questionsAndAnswers = {
        en: {
            initialQuestions: [
                '👨‍💼 How do I register as a service provider?',
                '🔄 How does the property exchange process work?',
                '📱 What are the contact options available?',
                '🏢 Tell me about available compounds'
            ],
            followUpQuestions: [
                '✨ What special services do you offer?',
                '🏘️ Show me premium compounds in my area',
                '💰 What are the current promotional offers?',
                '📋 How do I list my property for sale?'
            ],
            answers: {
                '👨‍💼 How do I register as a service provider?': 'To register as a service provider, navigate to the "Join Us" section and select "Service Provider". Complete the registration form with your professional details and credentials. Our team will review your application within 24 hours and contact you to finalize your listing.',
                '🔄 How does the property exchange process work?': 'Our property exchange process is simple and secure: 1) Submit your exchange request through the website, 2) Our specialists will evaluate both properties, 3) We\'\ll arrange viewings for both parties, 4) Once both parties agree, our legal team handles all paperwork, 5) The exchange is finalized with proper documentation and legal protection.',
                '📱 What are the contact options available?': 'You can reach our customer service team through multiple channels: Phone: 01012345678 (9AM-6PM daily), Email: support@deal.com, Live Chat: Available on our website 24/7, or visit our office locations listed in the "Contact Us" section.',
                '🏢 Tell me about available compounds': 'We feature premium residential compounds across multiple locations with various amenities including security, swimming pools, gyms, and green spaces. Browse our "Compounds" section to filter by location, price range, and available facilities.',
                '✨ What special services do you offer?': 'Our premium services include property valuation, professional photography, virtual tours, legal consultation, interior design advice, and dedicated account managers for VIP clients. Check our "Services" page for detailed information and pricing.',
                '🏘️ Show me premium compounds in my area': 'To view premium compounds in your specific area, use the search filter on our Compounds page. You can filter by location, price range, amenities, and property type to find your perfect match.',
                '💰 What are the current promotional offers?': 'We currently have several promotional offers including reduced commission rates for first-time sellers, free property valuation for premium listings, and special financing options with our partner banks. Visit our "Offers" page for complete details.',
                '📋 How do I list my property for sale?': 'To list your property, log in to your account, click on "Add New Listing", complete the property details form, upload high-quality photos, set your price, and submit for review. Our team will verify and publish your listing within 24 hours.'
            },
            greeting: 'Hello 👋 I\'m your assistant on the website, how can I help you?',
            inputPlaceholder: 'Type your question here...'
        },
        ar: {
            initialQuestions: [
                '👨‍💼 كيف أسجل كمقدم خدمة؟',
                '🔄 كيف تعمل عملية تبادل العقارات؟',
                '📱 ما هي خيارات الاتصال المتاحة؟',
                '🏢 أخبرني عن المجمعات السكنية المتاحة'
            ],
            followUpQuestions: [
                '✨ ما هي الخدمات الخاصة التي تقدمونها؟',
                '🏘️ أرني المجمعات المميزة في منطقتي',
                '💰 ما هي العروض الترويجية الحالية؟',
                '📋 كيف أعرض عقاري للبيع؟'
            ],
            answers: {
                '👨‍💼 كيف أسجل كمقدم خدمة؟': 'للتسجيل كمقدم خدمة، انتقل إلى قسم "انضم إلينا" واختر "مقدم خدمة". أكمل نموذج التسجيل بتفاصيلك المهنية وبيانات الاعتماد. سيقوم فريقنا بمراجعة طلبك خلال 24 ساعة والاتصال بك لإنهاء إدراجك.',
                '🔄 كيف تعمل عملية تبادل العقارات؟': 'عملية تبادل العقارات لدينا بسيطة وآمنة: 1) قدم طلب التبادل من خلال الموقع، 2) سيقوم متخصصونا بتقييم كلا العقارين، 3) سنرتب جلسات معاينة لكلا الطرفين، 4) بمجرد موافقة الطرفين، يتولى فريقنا القانوني جميع الأوراق، 5) يتم إنهاء التبادل بالوثائق المناسبة والحماية القانونية.',
                '📱 ما هي خيارات الاتصال المتاحة؟': 'يمكنك الوصول إلى فريق خدمة العملاء لدينا من خلال قنوات متعددة: الهاتف: 01012345678 (من 9 صباحًا إلى 6 مساءً يوميًا)، البريد الإلكتروني: support@deal.com، الدردشة المباشرة: متاحة على موقعنا على مدار الساعة، أو قم بزيارة مواقع مكاتبنا المدرجة في قسم "اتصل بنا".',
                '🏢 أخبرني عن المجمعات السكنية المتاحة': 'نحن نقدم مجمعات سكنية متميزة في مواقع متعددة مع وسائل راحة متنوعة بما في ذلك الأمن وحمامات السباحة وصالات الألعاب الرياضية والمساحات الخضراء. تصفح قسم "المجمعات" للتصفية حسب الموقع ونطاق السعر والمرافق المتاحة.',
                '✨ ما هي الخدمات الخاصة التي تقدمونها؟': 'تشمل خدماتنا المتميزة تقييم العقارات، والتصوير الاحترافي، والجولات الافتراضية، والاستشارات القانونية، ونصائح التصميم الداخلي، ومديري الحسابات المخصصين لعملاء VIP. تحقق من صفحة "الخدمات" للحصول على معلومات مفصلة والأسعار.',
                '🏘️ أرني المجمعات المميزة في منطقتي': 'لعرض المجمعات المميزة في منطقتك المحددة، استخدم فلتر البحث في صفحة المجمعات. يمكنك التصفية حسب الموقع ونطاق السعر والمرافق ونوع العقار للعثور على ما يناسبك تمامًا.',
                '💰 ما هي العروض الترويجية الحالية؟': 'لدينا حاليًا العديد من العروض الترويجية بما في ذلك معدلات عمولة مخفضة للبائعين لأول مرة، وتقييم مجاني للعقارات للإدراجات المميزة، وخيارات تمويل خاصة مع البنوك الشريكة. قم بزيارة صفحة "العروض" للحصول على التفاصيل الكاملة.',
                '📋 كيف أعرض عقاري للبيع؟': 'لعرض عقارك، قم بتسجيل الدخول إلى حسابك، وانقر على "إضافة إدراج جديد"، وأكمل نموذج تفاصيل العقار، وقم بتحميل صور عالية الجودة، وحدد السعر الخاص بك، وقدمه للمراجعة. سيقوم فريقنا بالتحقق ونشر إدراجك في غضون 24 ساعة.'
            },
            greeting: 'مرحبًا 👋 أنا مساعدك على الموقع، كيف يمكنني مساعدتك؟',
            inputPlaceholder: 'اكتب سؤالك هنا...'
        }
    };
    
    // Get the current language content
    const { initialQuestions, followUpQuestions, answers, greeting, inputPlaceholder } = questionsAndAnswers[currentLanguage];

    const handleQuestionClick = (question) => {
        const answer = answers[question];
        setMessages([
            ...messages,
            { type: 'user', text: question },
            { type: 'bot', text: answer },
        ]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('aibot_messages', JSON.stringify(messages));
        }
        scrollToBottom();
    }, [messages]);
    
    // Update messages when language changes
    useEffect(() => {
        // If there are no messages, don't do anything
        if (messages.length === 0) return;
        
        // Update the greeting message if it exists
        const updatedMessages = [...messages];
        if (updatedMessages[0]?.type === 'bot' && updatedMessages[0]?.text.includes('Hello') || updatedMessages[0]?.text.includes('مرحبًا')) {
            updatedMessages[0].text = greeting;
        }
        setMessages(updatedMessages);
    }, [currentLanguage, greeting]);

    const toggleChat = () => {
        if (!isOpen) {
            // If there are no saved messages, show the greeting
            if (messages.length === 0) {
                setMessages([
                    { type: 'bot', text: greeting }
                ]);
            }
        }
        setIsOpen(!isOpen);
    };
    
    // Function to clear chat history
    const clearChatHistory = () => {
        localStorage.removeItem('aibot_messages');
        setMessages([]);
        if (isOpen) {
            setMessages([{ type: 'bot', text: greeting }]);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        // Add user message
        setMessages([...messages, { type: 'user', text: inputText }]);

        // Simulate bot response
        setTimeout(() => {
            let botResponse = "I'm sorry, I don't have information about that yet. Please try one of the suggested questions below.";

            // Check if the input matches any known questions
            const allQuestions = [...initialQuestions, ...followUpQuestions];
            const matchedQuestion = allQuestions.find(q =>
                q.toLowerCase().includes(inputText.toLowerCase()) ||
                inputText.toLowerCase().includes(q.toLowerCase())
            );

            if (matchedQuestion && answers[matchedQuestion]) {
                botResponse = answers[matchedQuestion];
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 600);

        setInputText('');
    };

    return (
        <div className="ai-bot-container">
            <button className="chat-button" onClick={toggleChat}>
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h4>{currentLanguage === 'ar' ? 'مساعد ديل' : 'Deal Assistant'}</h4>
                        <button className="clear-chat" onClick={(e) => { e.stopPropagation(); clearChatHistory(); }}>
                            {currentLanguage === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
                                {message.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="suggested-questions">
                        {messages.length <= 1 ? (
                            initialQuestions.map((question, index) => (
                                <button key={index} onClick={() => handleQuestionClick(question)}>
                                    {question}
                                </button>
                            ))
                        ) : (
                            followUpQuestions.map((question, index) => (
                                <button key={index} onClick={() => handleQuestionClick(question)}>
                                    {question}
                                </button>
                            ))
                        )}
                    </div>

                    <form className="chat-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="input-field"
                            placeholder={inputPlaceholder}
                            value={inputText}
                            onChange={handleInputChange}
                            dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default AiBot;
