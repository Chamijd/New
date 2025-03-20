const { cmd, commands } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and scary 'Hacking' message with images.",
    category: "fun",
    react: "👨‍💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // ➡️ Check if the user is the Owner
        if (!isOwner) return reply("❌ Only the owner can use this command.");

        const steps = [
            '💻 *CHAMA-MD HACK STARTING...* 💻',
            '',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '',
            '```[▰▱▱▱▱▱▱▱▱▱] 10%``` ⏳',
            '```[▰▰▱▱▱▱▱▱▱▱] 20%``` ⏳',
            '```[▰▰▰▱▱▱▱▱▱▱] 30%``` ⏳',
            '```[▰▰▰▰▱▱▱▱▱▱] 40%``` ⏳',
            '```[▰▰▰▰▰▱▱▱▱▱] 50%``` ⏳',
            '```[▰▰▰▰▰▰▱▱▱▱] 60%``` ⏳',
            '```[▰▰▰▰▰▰▰▱▱▱] 70%``` ⏳',
            '```[▰▰▰▰▰▰▰▰▱▱] 80%``` ⏳',
            '```[▰▰▰▰▰▰▰▰▰▱] 90%``` ⏳',
            '```[▰▰▰▰▰▰▰▰▰▰] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '',
            '*📡 Transmitting data...* 📤',
            '*🕵️‍♂️ Ensuring stealth...* 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '*🔧 ali Get Your All Data...* 🎁',
            '',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '⚠️ *Reminder:* Strong hacking is the only way to ensure security.',
            '',
            ' *👨‍💻 YOUR DATA HACK SUCCESSFULLY 👩‍💻☣*',
            '',
            '⚠️ *Warning:* Unauthorized access detected! 🔴',
            '⚠️ *Warning:* System integrity compromised! 🔴',
            '',
            '💥 *Critical vulnerability discovered!* 💥',
            '*🔐 Encryption bypassed!* 🔓',
            '*🧩 Gathering sensitive information...* 🕵️‍♂️',
            '',
            '💀 *Warning: Do not attempt to hack systems without authorization!* 💀',
            '⚡ *Please be aware of the consequences of illegal actions.* ⚡',
            '',
            '🔔 *Beep beep...* A new alert has been triggered! 🚨',
            '👁️ *Monitor the situation closely!* 👁️',
            '🛑 *System alert: Possible danger detected!* 🛑',
            '',
            '*⚡ You have been warned...* ⚡',
            '*💀 Your data may have been exposed...* 💀',
            '',
            '*🖤 System at risk...* 🖤'
        ];

        // Adding scary images and messages
        const images = [
            'https://example.com/scary_image_1.jpg', // Replace with your own scary image URLs
            'https://example.com/scary_image_2.jpg', // Replace with your own scary image URLs
            'https://example.com/scary_image_3.jpg', // Replace with your own scary image URLs
            'https://example.com/scary_image_4.jpg'  // Replace with your own scary image URLs
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed

            // Adding scary image after some steps
            if (Math.random() > 0.7) {
                const image = images[Math.floor(Math.random() * images.length)];
                await conn.sendMessage(from, { image: { url: image }, caption: "⚠️ SYSTEM BREACH!" }, { quoted: mek });
                await new Promise(resolve => setTimeout(resolve, 2000)); // Pause after sending image
            }
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
