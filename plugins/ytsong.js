const command = {
  pattern: "song",
  alias: ["ytsong"],
  use: ".song <song_name>",
  react: '🎧',
  desc: descs,
  category: "download",
  filename: __filename
};

cmd(command, async (bot, message, args, context) => {
  const { 
    from, prefix, quoted, body, command, q, 
    isGroup, sender, senderNumber, botNumber, 
    pushname, isMe, isOwner, groupMetadata, 
    groupName, participants, groupAdmins, 
    isBotAdmins, isAdmins, reply 
  } = context;

  try {
    if (!q) {
      return await reply(imgmsg);
    }

    if (isUrl(q) && !ytreg(q)) {
      return await reply(imgmsg);
    }

    let youtubeLink = convertYouTubeLink(q);
    const searchResults = await yts(youtubeLink);
    const video = searchResults.videos[0];

    if (isUrl(q) && q.includes("/shorts")) {
      const options = [{
        title: '',
        rows: [
          { title: '1', rowId: `${prefix}ytmp3 ${q}|${video.title}`, description: "Normal type song 🎶" },
          { title: '2', rowId: `${prefix}ytdocs ${q}|${video.title}`, description: "Document type song 📂" }
        ]
      }];
      
      const response = {
        text: "[👨‍💻 VAJIRA - MD 👨‍💻]\n\n   *SELECT SONG TYPE*",
        footer: "*Powered by Technical Cybers*",
        buttonText: "```🔢 Reply with the number corresponding to the song type you need.```",
        sections: options
      };

      return await bot.replyList(from, response, { quoted: message });
    }

    if (ytreg(q)) {
      const options = [{
        title: '',
        rows: [
          { title: '1', rowId: `${prefix}ytmp3 ${q}`, description: "Normal type song 🎶" },
          { title: '2', rowId: `${prefix}ytdocs ${q}`, description: "Document type song 📂" }
        ]
      }];
      
      const response = {
        text: "[👨‍💻 VAJIRA - MD 👨‍💻]\n\n   *SELECT SONG TYPE*",
        footer: "*Powered by Technical Cybers*",
        buttonText: "```🔢 Reply with the number corresponding to the song type you need.```",
        sections: options
      };

      return await bot.replyList(from, response, { quoted: message });
    }

    const songDetails = `📽️ *VAJIRA-MD SONG-DOWNLOADER* 📽️\n\n`
      + `*Title:* ${video.title}\n`
      + `*Views:* ${video.views}\n`
      + `*Duration:* ${video.timestamp}\n`
      + `*Uploaded:* ${video.ago}\n`
      + `*URL:* ${video.url}\n\n`;

    const options = [{
      title: '',
      rows: [
        { title: '1', rowId: `${prefix}ytmp3 ${video.url}`, description: "Normal type song 🎶" },
        { title: '2', rowId: `${prefix}ytdocs ${video.url}`, description: "Document type song 📂" }
      ]
    }];

    const response = {
      image: { url: video.thumbnail },
      caption: songDetails,
      footer: config.FOOTER,
      buttonText: "*🔢 Reply with the number corresponding to your choice.*",
      sections: options
    };

    return await bot.replyList(from, response, { quoted: message });

  } catch (error) {
    reply("*ERROR !!*");
    console.error(error);
  }
});
