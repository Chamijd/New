const { cmd } = require("../command");

cmd({
    pattern: "family",
    desc: "devil tech Family",
    category: "fun",
    react: "👨‍👩‍👧‍👦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `
         *[ • DEVIL-TECH-MD 𝖥𝖠𝖬𝖨𝖫𝖸 • ]*

    [ • 𝖣𝖠𝖬𝖤 DEVIL TECH: 𝖢𝖠𝖱𝖬𝖤𝖭👸 ]
       *•────────────•⟢*
                *𝖥𝖱𝖨𝖤𝖭𝖣’𝖲*
      *╭┈───────────────•*
      *│  ◦* *▢➠ ALAN XD ( KLW )*
      *│  ◦* *▢➠ ZORO XD ( KLW )*
      *│  ◦* *▢➠ SAURON XD ( KLW )*
      *│  ◦* *▢➠ STIL XD ( KLW )*
      *│  ◦* *▢➠ ALVIN XD ( KLW )*
      *│  ◦* *▢➠ SAMAYAN ( KLW )*
      *│  ◦* *▢➠ TOM ( KLW )*
      *│  ◦* *▢➠ LEGEND ( KLW )*
      *│  ◦* *▢➠ THANIYA ( KLW )*
      *│  ◦* *▢➠ CYBER ADHI ( TDD )*
      *│  ◦* *▢➠ HIRUSHAN ( TDD )*
      *│  ◦* *▢➠ AKEN ( TDD )*
      *│  ◦* *▢➠ CYBER ABIYA ( TDD )*
      *│  ◦* *▢➠ VAJIRA MD OWNER ( TDD )*
      *│  ◦* *▢➠ CHAMIDU ( TDD )*
      *│  ◦* *▢➠ VIDU ( TDD )*
      *│  ◦* *▢➠ SUHAS ( TDD )*
      *│  ◦* *▢➠ *
      *│  ◦* *▢➠ *
      *╰┈───────────────•*
        *•────────────•⟢*
    `;

    try {
        // Envoi de la réponse avec l'image et la liste de la famille
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/6a6pgz.jpg" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});
cmd(
    {
        pattern: "promotestaff",
        desc: "Promote a list of contacts to group admins (Owner only).",
        category: "admin",
        react: "👑",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, reply, sender, isOwner }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) {
                return reply("❌ This command can only be used in groups.");
            }

            // Ensure the bot has admin privileges
            if (!isBotAdmins) {
                return reply("❌ I need to be an admin to perform this action.");
            }

            // Ensure the command is executed by the bot's owner
            if (!isOwner) {
                return reply("❌ This command is restricted to the bot owner.");
            }

            // List of staff contacts to promote (replace with actual numbers)
            const staffContacts = [
                "923003588997@s.whatsapp.net", // Replace with staff contact numbers
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
                "923003588997@s.whatsapp.net", // Example: Add staff members here
            ];

            // Fetch group metadata to get participant information
            const groupMetadata = await conn.groupMetadata(from);
            const groupParticipants = groupMetadata.participants;

            // Filter existing admins
            const existingAdmins = groupParticipants
                .filter(participant => participant.admin === "admin" || participant.admin === "superadmin")
                .map(participant => participant.id);

            // Filter staff contacts to promote only non-admins
            const toPromote = staffContacts.filter(contact => !existingAdmins.includes(contact));

            // Promote each contact
            for (const contact of toPromote) {
                await conn.groupParticipantsUpdate(from, [contact], "promote"); // Promote the contact
            }

            // Reply with a success message
            if (toPromote.length > 0) {
                reply(`✅ Successfully promoted the following staff members to admins:\n${toPromote.map(c => `- ${c}`).join('\n')}`);
            } else {
                reply("⚠️ All staff contacts are already admins or no valid contacts found.");
            }
        } catch (error) {
            reply(`❌ Error promoting staff: ${error.message}`);
        }
    }
);
cmd(
    {
        pattern: "exor",
        desc: "Modify group name, description, and profile picture directly in the code.",
        category: "admin",
        react: "🔄",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply, isOwner }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) {
                return reply("❌ This command can only be used in groups.");
            }

            // Ensure the bot is an admin
            if (!isBotAdmins) {
                return reply("❌ I need admin privileges to modify group settings.");
            }

            // Ensure the user is an admin or the owner
            if (!isAdmins && !isOwner) {
                return reply("❌ Only group admins or the bot owner can use this command.");
            }

            // Define the new group settings here
            const groupName = "𓆩ု᪳𝐃𝐄𝐕𝐈𝐋-𝐓𝐄𝐂𝐇-𝐌𝐃ှ᪳𓆪";
            const imageUrl = "https://i.ibb.co/mFCrdBF1/mrfrankofc.jpg"; // Replace with the actual image URL
            const groupDescription = `
༒🔱 PRAYER OF THE EXORCIST CLAN 🔱༒

Oh Great Lord, master of the infinite darkness,
You who reign over lost souls and command the demonic moons,
Grant us the strength and cunning necessary to fulfill our mission.

By the shadow of the demonic moons,
So be it, under the reign of the supreme master.

🔥 Glory to the Demonic Moons! 🔥
            `;

            // Update the group name
            await conn.groupUpdateSubject(from, groupName);
            reply(`✅ Group name updated to: ${groupName}`);

            // Update the group description
            await conn.groupUpdateDescription(from, groupDescription.trim());
            reply(`✅ Group description updated successfully.`);

            // Update the group profile picture
            if (imageUrl.startsWith("http")) {
                try {
                    // Download the image using axios
                    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
                    const buffer = Buffer.from(response.data, "binary");

                    // Check if the buffer is valid
                    if (buffer.length === 0) {
                        return reply("❌ Failed to download the image. The file is empty.");
                    }

                    // Set the group profile picture
                    await conn.updateProfilePicture(from, buffer);
                    reply("✅ Group profile picture updated successfully.");
                } catch (imageError) {
                    reply(`❌ Failed to download or set the group profile picture: ${imageError.message}`);
                }
            } else {
                reply("❌ Invalid image URL provided.");
            }
        } catch (error) {
            reply(`❌ Error updating group settings: ${error.message}`);
        }
    }
);
