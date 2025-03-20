const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "download",
    desc: "To download song or video.",
    react: "🎶",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // If user replied to the previous message to select type of download
        if (!q) {
            return reply(
                "Please reply with the option for download.\n\nFor song: `!song <song_name>` \nFor video: `!video <video_name>`."
            );
        }
        
        if (command === 'song') {
            // Process song download
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

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ* 
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
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*" }, { quoted: mek });
        } else if (command === 'video') {
            // Process video download
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
        }
    } catch (e) {
        console.log(e);
        reply(`_Hi ${pushname}, retry later_`);
    }
});
