const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a url or title");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*⫷⦁DEVIL-TECH-MD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSⵊC FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *ENJOY THE MUSIC BROUGHT TO YOU!*

> *DEVIL-TECH-MD WHATSAPP BOT* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜰᴄ* 
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio
        let down = await fg.yta(url);
        if (!down || !down.dl_url) {
            return reply(`_Error: Unable to fetch the download link. Try again later._`);
        }

        let downloadUrl = down.dl_url;

        // Send audio message
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*"}, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`_Hi ${pushname}, retry later_`);
    }
});

// ==================== video_dl =======================
cmd({
    pattern: "video",
    alias: ["v"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a url or title");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*⫷⦁DEVIL-TECH-MD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VⵊDEO FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *ENJOY THE VIDEO BROUGHT TO YOU!*

> *DEVIL-TECH-MD WHATSAPP BOT* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video
        let down = await fg.ytv(url);
        if (!down || !down.dl_url) {
            return reply(`_Error: Unable to fetch the download link. Try again later._`);
        }

        let downloadUrl = down.dl_url;

        // Send video message
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`_Hi ${pushname}, retry later_`);
    }
});
