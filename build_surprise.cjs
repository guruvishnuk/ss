const fs = require('fs');

const photos = [
    "20241015_181346.jpg", "20250126_144306.jpg", "20250803_144932.jpg", "20260207_143855.jpg", 
    "20260207_152631.jpg", "20260207_152709.jpg", "20260301_204341.jpg", "20260418_191945.jpg", 
    "20260418_192131.jpg", "20260418_192136.jpg", "IMG-20230928-WA0009.jpg", "IMG-20240910-WA0002.jpg", 
    "IMG-20240928-WA0001 (1).jpg", "IMG-20240928-WA0005 (1).jpg", "IMG-20260221-WA0005.jpg", 
    "IMG-20260221-WA0021.jpg", "IMG-20260221-WA0023.jpg", "IMG-20260512-WA0063.jpg", "Snapchat-1795217538.jpg"
];

const quotes = [
    { en: "From the moment I saw you, my heart knew.", kn: "ನಾನು ನಿನ್ನನ್ನು ನೋಡಿದ ಕ್ಷಣದಿಂದ, ನನ್ನ ಹೃದಯಕ್ಕೆ ಗೊತ್ತಿತ್ತು." },
    { en: "Your smile is my favorite view in the whole world.", kn: "ನಿನ್ನ ನಗುವೇ ಈ ಪ್ರಪಂಚದಲ್ಲಿ ನನ್ನ ಅಚ್ಚುಮೆಚ್ಚಿನ ದೃಶ್ಯ." },
    { en: "Every adventure is magical when you are with me.", kn: "ನೀನು ಜೊತೆಯಲ್ಲಿದ್ದಾಗ ಪ್ರತಿಯೊಂದು ಪಯಣವೂ ಅದ್ಭುತ." },
    { en: "Lost in your eyes, where my forever begins.", kn: "ನಿನ್ನ ಕಣ್ಣುಗಳಲ್ಲಿ ಕಳೆದುಹೋಗಿರುವೆ, ಅಲ್ಲಿಂದಲೇ ನನ್ನ ಶಾಶ್ವತ ಶುರು." },
    { en: "Your laugh is the sweetest melody to my ears.", kn: "ನಿನ್ನ ನಗು ನನ್ನ ಕಿವಿಗೆ ಅತ್ಯಂತ ಸಿಹಿಯಾದ ಸಂಗೀತ." },
    { en: "Holding you feels like holding my entire world.", kn: "ನಿನ್ನನ್ನು ಅಪ್ಪಿಕೊಂಡಾಗ ಇಡೀ ಪ್ರಪಂಚವೇ ನನ್ನ ಕೈಯಲ್ಲಿದ್ದಂತೆ ಭಾಸವಾಗುತ್ತದೆ." },
    { en: "You make ordinary moments feel extraordinary.", kn: "ಸಾಮಾನ್ಯ ಕ್ಷಣಗಳನ್ನು ನೀನು ಅಸಾಮಾನ್ಯವಾಗಿಸುತ್ತೀಯ." },
    { en: "I still get butterflies every time I see you.", kn: "ನಿನ್ನನ್ನು ನೋಡಿದಾಗಲೆಲ್ಲಾ ನನ್ನೊಳಗೆ ಇಂದಿಗೂ ಅದೇ ರೋಮಾಂಚನ." },
    { en: "You are my peace, my home, and my everything.", kn: "ನೀನೇ ನನ್ನ ನೆಮ್ಮದಿ, ನನ್ನ ಮನೆ ಮತ್ತು ನನ್ನೆಲ್ಲವೂ." },
    { en: "Every memory with you is a treasure I hold dear.", kn: "ನಿನ್ನೊಂದಿಗಿನ ಪ್ರತಿಯೊಂದು ನೆನಪೂ ನನಗೆ ಅಮೂಲ್ಯವಾದ ಸಂಪತ್ತು." },
    { en: "Falling deeper in love with you every single day.", kn: "ಪ್ರತಿದಿನ ನಿನ್ನ ಮೇಲೆ ಪ್ರೀತಿ ಇನ್ನಷ್ಟು ಹೆಚ್ಚಾಗುತ್ತಿದೆ." },
    { en: "A beautiful moment frozen in time, just for us.", kn: "ನಮಗಾಗಿ ಕಾಲವೇ ನಿಂತಂತಹ ಒಂದು ಸುಂದರ ಕ್ಷಣ." },
    { en: "No matter where we are, together is my favorite place.", kn: "ನಾವು ಎಲ್ಲೇ ಇದ್ದರೂ, ನಿನ್ನ ಜೊತೆಯಲ್ಲಿರುವುದೇ ನನ್ನ ಅಚ್ಚುಮೆಚ್ಚಿನ ಜಾಗ." },
    { en: "You are the missing piece to my soul.", kn: "ನನ್ನ ಆತ್ಮಕ್ಕೆ ನೀನೇ ಆ ಕೊರತೆಯಾಗಿದ್ದ ತುಣುಕು." },
    { en: "My heart belongs completely and entirely to you.", kn: "ನನ್ನ ಹೃದಯ ಸಂಪೂರ್ಣವಾಗಿ ನಿನಗೆ ಮಾತ್ರ ಸೇರಿದೆ." },
    { en: "Through every joy and laugh, I love you more.", kn: "ಪ್ರತಿ ಸಂತೋಷ ಮತ್ತು ನಗುವಿನಲ್ಲೂ, ನಾನು ನಿನ್ನನ್ನು ಹೆಚ್ಚು ಪ್ರೀತಿಸುತ್ತೇನೆ." },
    { en: "You are my today and all of my tomorrows.", kn: "ನೀನೇ ನನ್ನ ಇವತ್ತು ಮತ್ತು ನನ್ನೆಲ್ಲಾ ನಾಳೆಗಳು." },
    { en: "Life is just a beautiful dream when you're by my side.", kn: "ನೀನು ನನ್ನ ಪಕ್ಕದಲ್ಲಿದ್ದಾಗ ಜೀವನವು ಒಂದು ಸುಂದರ ಕನಸಾಗುತ್ತದೆ." },
    { en: "To endless more memories together. Happy Birthday, Gouri!", kn: "ಇದೇ ರೀತಿ ಇನ್ನಷ್ಟು ನೆನಪುಗಳು ಜೊತೆಯಾಗಲಿ. ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು, ಗೌರಿ!" }
];

let css = fs.readFileSync('surprise.html', 'utf8').split('<style>')[1].split('</style>')[0];

// Inject new CSS for overlays
css += `
.photo-container {
    border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    display: flex; flex-direction: column;
}
.quote-overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
    padding: 3rem 1.5rem 1.5rem 1.5rem; text-align: center; display: flex; flex-direction: column; gap: 0.5rem; z-index: 10;
}
.quote-eng { font-family: 'Great Vibes', cursive; font-size: clamp(2rem, 6vw, 2.8rem); color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.8); line-height: 1.1; }
.quote-kan { font-family: 'Poppins', sans-serif; font-size: clamp(0.9rem, 3vw, 1.2rem); color: #ffd1dc; font-weight: 500; opacity: 0.9; text-shadow: 0 2px 5px rgba(0,0,0,1); line-height: 1.4; }
`;

let html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n    <title>Happy Birthday Shruti ❤️</title>\n    <style>\n" + css + "\n    </style>\n</head>\n<body>\n    <div id=\"intro\">\n        <button class=\"intro-btn\" onclick=\"startSurprise()\">Tap to open your surprise 💌</button>\n    </div>\n\n    <main id=\"story\">\n        <div class=\"progress-bar\"></div>\n";

photos.forEach((photo, i) => {
    html += "        <section class=\"scene fx-" + (i + 1) + "\">\n            <div class=\"photo-container\">\n                <img src=\"./src/assets/" + photo + "\" alt=\"Memory " + (i + 1) + "\" loading=\"lazy\">\n                <div class=\"quote-overlay\">\n                    <span class=\"quote-eng\">" + quotes[i].en + "</span>\n                    <span class=\"quote-kan\">" + quotes[i].kn + "</span>\n                </div>\n            </div>\n        </section>\n";
});

html += "        <section class=\"finale\">\n            <h1>Happy Birthday, Shruti 🎂❤️</h1>\n            <div class=\"counter\">Days we've been together: <span id=\"days\"></span></div>\n            <p class=\"note\">To my amazing Gouri, thank you for every single beautiful memory we've made so far. You mean everything to me, and I can't wait to make a million more. I love you!</p>\n            <button class=\"replay-btn\" onclick=\"location.reload()\">Replay Our Story 🔄</button>\n        </section>\n    </main>\n\n    <script>\n        function startSurprise() {\n            if (document.startViewTransition) {\n                document.startViewTransition(() => {\n                    document.getElementById('intro').style.display = 'none';\n                    document.getElementById('story').style.display = 'block';\n                    document.body.style.overflow = 'hidden';\n                });\n            } else {\n                document.getElementById('intro').style.display = 'none';\n                document.getElementById('story').style.display = 'block';\n            }\n        }\n\n        const startDate = new Date('2023-09-28');\n        const today = new Date();\n        const diffTime = Math.abs(today - startDate);\n        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));\n        document.getElementById('days').innerText = diffDays;\n\n        if (!CSS.supports('animation-timeline: view()')) {\n            const observer = new IntersectionObserver((entries) => {\n                entries.forEach(entry => {\n                    if (entry.isIntersecting) {\n                        entry.target.style.opacity = 1;\n                        entry.target.style.transform = 'translateY(0)';\n                    }\n                });\n            }, { threshold: 0.3 });\n\n            document.querySelectorAll('.scene').forEach(scene => {\n                scene.style.opacity = 0;\n                scene.style.transform = 'translateY(50px)';\n                scene.style.transition = 'all 1s ease-out';\n                observer.observe(scene);\n            });\n        }\n    </script>\n</body>\n</html>";

fs.writeFileSync('surprise.html', html, 'utf8');
console.log('Built surprise.html successfully!');
