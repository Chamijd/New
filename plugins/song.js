/* 
Plugin Author: *@DarkYasiya* 
Follow Us: *https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27* 
*/

const config = require('../config');
const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd({
    pattern: "song",
    alias: ["ytmp3", "ytmp3dl"],
    react: "🎵",
    desc: "Download YouTube MP3",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a song name or YouTube URL!");

        let id = q.startsWith("https://") ? extractYouTubeID(q) : null;

        if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("❌ No results found!");
            id = searchResults.results[0].videoId;
        }

        const videoData = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
        if (!videoData?.results?.length) return await reply("❌ Failed to fetch video!");

        const { url, title, image, timestamp, ago, views, author } = videoData.results[0];

        let info = `🎵 *Song Downloader* 🎵\n\n` +
            `📌 *Title:* ${title || "Unknown"}\n` +
            `⏳ *Duration:* ${timestamp || "Unknown"}\n` +
            `👀 *Views:* ${views || "Unknown"}\n` +
            `📅 *Released:* ${ago || "Unknown"}\n` +
            `🎤 *Artist:* ${author?.name || "Unknown"}\n` +
            `🔗 *URL:* ${url || "Unknown"}\n\n` +
            `✅ *Reply with:* \n` +
            `1️⃣.1️⃣ *Audio* 🎵\n` +
            `1️⃣.2️⃣ *Document* 📁\n\n` +
            `${config.FOOTER || "Powered by YOUR BOT NAME"}`;

        const sentMsg = await conn.sendMessage(from, { image: { url: image }, caption: info }, { quoted: mek });
        const messageID = sentMsg.key.id;

        await conn.sendMessage(from, { react: { text: '🎶', key: sentMsg.key } });

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            try {
                const mekInfo = messageUpdate?.messages[0];
                if (!mekInfo?.message) return;

                const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
                const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToSentMsg) return;

                let userReply = messageType.trim();
                let msg, type, response;

                if (userReply === "1.1") {
                    msg = await conn.sendMessage(from, { text: "⏳ Processing..." }, { quoted: mek });
                    response = await dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
                    let downloadUrl = response?.result?.download?.url;
                    if (!downloadUrl) return await reply("❌ Download link not found!");
                    type = { audio: { url: downloadUrl }, mimetype: "audio/mpeg" };

                } else if (userReply === "1.2") {
                    msg = await conn.sendMessage(from, { text: "⏳ Processing..." }, { quoted: mek });
                    response = await dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
                    let downloadUrl = response?.result?.download?.url;
                    if (!downloadUrl) return await reply("❌ Download link not found!");
                    type = { document: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: "audio/mpeg", caption: title };

                } else {
                    return await reply("❌ Invalid choice! Reply with 1️⃣.1️⃣ or 1️⃣.2️⃣.");
                }

                await conn.sendMessage(from, type, { quoted: mek });
                await conn.sendMessage(from, { text: '✅ Download Complete ✅', edit: msg.key });

            } catch (error) {
                console.error(error);
                await reply(`❌ Error processing request: ${error.message || "Unknown Error"}`);
            }
        });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ Error occurred: ${error.message || "Unknown Error"}`);
    }
});
