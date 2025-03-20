// Audio download command
cmd({
    pattern: "so",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a title or URL of the song.");

        // Search for the song
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        // Send initial message
        let desc = `
*⫷⦁DEVIL-TECH-MD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSⵊC FOUND!*

➥ *Title:* ${data.title}
➥ *Duration:* ${data.timestamp}
➥ *Views:* ${data.views}
➥ *Uploaded On:* ${data.ago}
➥ *Link:* ${data.url}

🎧 *ENJOY THE MUSIC!*

> *DEVIL-TECH-MD WHATSAPP BOT*
> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*
`;

        // Send thumbnail and description of the song
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download song audio
        let down = await fg.yta(url);
        
        // Log the entire response
        console.log("Download response:", down);

        if (down && down.dl_url) {
            let downloadUrl = down.dl_url;

            // Send audio message
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

            // Send audio as document
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*" }, { quoted: mek });
        } else {
            reply(`_Hi ${pushname}, no valid download link found. Please try again._`);
        }

    } catch (e) {
        console.log(e);
        reply(`_Hi ${pushname}, please try again later._`);
    }
});

// Video download command
cmd({
    pattern: "video",
    alias: ["v"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a title or URL of the video.");

        // Search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        // Send initial message
        let desc = `
*⫷⦁DEVIL-TECH-MD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VⵊDEO FOUND!*

➥ *Title:* ${data.title}
➥ *Duration:* ${data.timestamp}
➥ *Views:* ${data.views}
➥ *Uploaded On:* ${data.ago}
➥ *Link:* ${data.url}

🎬 *ENJOY THE VIDEO!*

> *DEVIL-TECH-MD WHATSAPP BOT*
> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*
`;

        // Send thumbnail and description of the video
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video
        let down = await fg.ytv(url);
        
        // Log the entire response
        console.log("Download response:", down);

        if (down && down.dl_url) {
            let downloadUrl = down.dl_url;

            // Send video message
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });

            // Send video as document
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴄʏʙᴇʀ ʟᴏᴋᴜ ᴀꜱʜᴜᴜ ᴏꜟ*" }, { quoted: mek });
        } else {
            reply(`_Hi ${pushname}, no valid download link found. Please try again._`);
        }

    } catch (e) {
        console.log(e);
        reply(`_Hi ${pushname}, please try again later._`);
    }
});
