const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",  // 'song' command for downloading music
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or title of the song.");
        
        const search = await yts(q);  // Search for the song
        const data = search.videos[0];  // Get the first video result
        const url = data.url;  // Get the URL for downloading the song
        
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
        let down = await fg.yta(url);  // Get the audio download URL
        let downloadUrl = down.dl_url;  // Get the download URL

        // Send audio message
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟᴄ*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`_Hi ${pushname}, please retry later._`);
    }
});
