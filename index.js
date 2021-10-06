//Basic bot
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const db = require('quick.db')
const moment = require('moment')

//Kirim pesan
client.on('ready', () => {
    console.log(`${client.user.tag} Logged in!`)//Bisa di ubah jika di butuhkan

    //Ganti status bot
    command(client, 'status', (message) => {
		//Hanya owner yang bisa akses perintah ini
        if (message.author.id !== config.ownerid) { //Masukan id kalian (tag akun kalian dan beri simbol \ di depan lalu kirim)
            return message.reply('Maaf anda bukan owner bot ini')
        }
		//status bot akan berubah jika kalian mengetik pesan ini
        const content = message.content.replace('z!status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            }
        })
    })
	
    //Hapus pesan satu channel. Note: Pesan yang lebih dari 14 hari tidak dapat di hapus
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        } else {
            message.reply('Kamu tidak dapat mengakses command ini')
        }
    })

    //Command help 
    command(client, 'help', (message) => {
        const thumbnail = client.user.avatarURL()

        const helpembed = new Discord.MessageEmbed()
            .setTitle('List command')
            .setThumbnail(thumbnail)
            .setColor("RANDOM")
            .setFooter(`Bot ini masih kurang stabil karena belum full release`)
            .addFields({
                name: 'Command Berguna',
                value: `
\`\`help\`\`
\`\`botinfo\`\`
\`\`serverinfo\`\`
\`\`invite\`\`
\`\`admincommands\`\``,
                inline: true,
            }, {
				name: 'Command Economy',
				value: `
\`\`bisnisbaru\`\`
\`\`kerja\`\`
\`\`bal\`\`
\`\`lb, leaderboard\`\``,
				inline: true,
			}, {
                name: 'Command Random',
                value: `
\`\`ping\`\`
\`\`sourcecode\`\``,
                inline: true,
            })

        message.channel.send(helpembed)
    })

    //Command help admin. Hanya admin yang bisa akses command ini
    command(client, 'admincommands', (message) => {
        const thumbnail = client.user.avatarURL()

        const adminembed = new Discord.MessageEmbed()
        .setTitle("List command")
        .setThumbnail(thumbnail)
        .setColor("RANDOM")
        .setFooter(`Bot ini masih kurang stabil karena belum full release`)
        .addFields({
            name: 'Command Admin',
            value: `
\`\`Kick\`\`
\`\`Ban\`\`
\`\`clearchannel\`\``
        })

        message.channel.send(adminembed)
    })

    //Command kick
    command(client, 'kick', (message) => {
        if (message.member.permissions.has('KICK_MEMBERS')) {
            const kmember = message.mentions.users.first()
            if(kmember){
                const kmemberTarget = message.guild.members.cache.get(kmember.id)
                kmemberTarget.kick()
                message.reply('User telah berhasil di keluarkan dari server!')
            } else {
                message.reply('Tag orang yang ingin di keluarkan!')
            }
        } else {
            message.reply('Hanya admin dan moderator yang dapat akses perintah ini!')
        }
    })

    //Command Ban
    command(client, 'ban', (message) => {
        if (message.member.permissions.has('BAN_MEMBERS')) {
            const bmember = message.mentions.users.first()
            if(bmember){
                const bmemberTarget = message.guild.members.cache.get(bmember.id)
                bmemberTarget.kick()
                message.reply('User telah berhasil dibanned!')
            } else {
                message.reply('Tag orang yang ingin diban!')
            }
        } else {
            message.reply('Hanya admin dan moderator yang dapat akses perintah ini!')
        }
    })

    //Server info boleh di tambah jika di inginkan
    command(client, 'serverinfo', (message) => {
        const { guild } = message
        
        const { name, region, memberCount, owner} = guild
        const icon = guild.iconURL()

        const serverinfo = new Discord.MessageEmbed()
            .setTitle(`Info dari server "${name}"`)
            .setThumbnail(icon)
            .setColor("RANDOM")
            .addFields({
                name: 'Asal negara server',
                value: region,
            }, {
                name: 'Total member',
                value: memberCount,
            }, {
                name: 'Owner server',
                value: owner.user.tag,
            })

        message.channel.send(serverinfo)
    })

    //Bot info
    command(client, 'botinfo', (message) => {
        const thumbnail = client.user.avatarURL()

        const botinfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(thumbnail)
            .addFields({
                name: 'Bot Name:',
                value: client.user.tag,
            }, {
                name: 'Bot Version:',
                value: '1.0 (Beta)'
            }, {
                name: 'Bot Owner', //Ubah pakai id kalian untuk mengganti ownership bot kalian
                value: '<@778139021271629864>',
            }, {
                name: 'Bot Creator', //Punya partner? Masukan idnya kesini
                value: `<@778143316071809056>
<@719061887777636352>`
            })
            .setFooter('Bot ini masih kurang stabil karena belum full release')
        message.channel.send(botinfo)
    })

    //Invite bot
    command(client, 'invite', (message) => {
        const thumbnail = client.user.avatarURL()

        const inviteembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(thumbnail)
            .setTitle('Invite bot')
            .setDescription('Hey! Terima kasih telah mengajakku keserver mu! :D')
            .addFields({
                name: ('Klik link di bawah'),
				//Gunakan link invite bot kalian
                value: ('[Klik sini!](https://discord.com/api/oauth2/authorize?client_id=837201913010978847&permissions=8&scope=bot)')
            })
        message.channel.send(inviteembed)
    })
	
	//Economy bot
	//Buat profil baru
	command(client, 'bisnisbaru', (message) => {
		const profiles = new db.table('profiles')
		const userProfile = profiles.get(`profies_${message.author.id}`)

		var username = message.author.username

		if (userProfile) return message.reply("Kamu sudah memiliki bisnis sendiri")

		profiles.set(`profiles_${message.author.id}.name`, username)
		profiles.set(`profiles_${message.author.id}.money`, 0)

		return message.channel.send(`Selamat datang di bisnis kami! Nama mu adalah **${username}**`)
	})
	
	//Cek keuangan anda
	command(client, ['bal'], (message) => {
		const profiles = new db.table('profiles')
		const userProfile = profiles.get(`profiles_${message.author.id}`)
		const username = profiles.get(`profiles_${message.author.id}.name`)
		const uangpunya = profiles.get(`profiles_${message.author.id}.money`)
		
		if (userProfile === null) {
			return message.channel.send("Kamu tidak memiliki profil! ketik \`\`z!mulaibisnis\`\` untuk mulai bermain")
		}
		
		message.channel.send(`${username} Kamu memiliki uang sebanyak ${uangpunya} 💵`)
	})
	
	//Lihat siapa yang punya banyak uang disini
	command(client, ['lb', 'leaderboard'], (message) => {
		const profiles = new db.table('profiles')
		const lbUang = profiles.all().sort((a, b) => b.data.money - a.data.money)
		const thumbnail = message.author.avatarURL()
		
		if (!lbUang) {
			return message.channel.send('Tidak ada seorang pun yang memiliki profil')
		}
		
		const top10Sultan = lbUang.slice(0, 10)
		var i = 1
		
		const leaderboard = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setThumbnail(thumbnail)
			.setTitle('Leaderboard')
			.addFields(
			{
				name: 'Top 10 Sultan',
				value: top10Sultan.map(item => `${i++} - ${item.data.name} - $${item.data.money.toLocaleString()}`)
			}
		)
		message.channel.send(leaderboard)
	})
	
	//Command untuk mendapatkan uang
	command(client, ['kerja', 'KERJA', 'Kerja'], (message) => {
		const profiles = new db.table('profiles')
		const userProfile = profiles.get(`profiles_${message.author.id}`)
		
		if (userProfile === null) {
			return message.channel.send("Kamu tidak memiliki profil! ketik \`\`z!mulaibisnis\`\` untuk mulai bermain")
		}
		
		const cooldown = profiles.get(`profiles_${message.author.id}.cooldown`)
		
		if (Date.now() > cooldown || cooldown === undefined) {
			const gajiRandom = Math.floor(Math.random() * 500) + 1 //Angka bisa di ubah sesuai keinginan
			profiles.add(`profiles_${message.author.id}.money`, gajiRandom)
			profiles.set(`profiles_${message.author.id}.cooldown`, Date.now() + 60000) //1 detik = 1000milidetik. Boleh di ubah
			return message.reply(`Kamu sudah dapat gaji sebanyak ${gajiRandom.toLocaleString()} 💵`)
		} else {
			return message.reply(`Kamu baru mendapatkan gaji ${moment(cooldown).fromNow()}`)
		}
	})

	//Owner bot command
	//Perintah khusus owner untuk ngecheat
	command(client, ['gajiinstan'], (message) => {
		if (message.author.id !== "778139021271629864") {
			return message.channel.send("Perintah ini hanya bisa di akses oleh owner bot")
		}
		
		const args = message.content
			.slice()
			.trim()
			.split(/ +/g)

		const profiles = new db.table('profiles')
		const target = message.mentions.members.first() || message.member
		const memberProfile = profiles.get(`profiles_${target.id}`)

		if (memberProfile === null) {
			return message.channel.send("Kamu tidak memiliki profil! ketik \`\`z!mulaibisnis\`\` untuk mulai bermain")
		}

		if (!args[1]) return message.channel.send("Masukan jumlah uang yang ingin anda berikan")

		if (isNaN(args[1]) || args[1] < 0) return message.channel.send("Kamu tidak bisa memberikan uang sebanyak 0")

		profiles.add(`profiles_${target.id}.money`, args[1])

		return message.channel.send(`Berhasil menambahkan $${args[1].toLocaleString()} Kepada ${target}`)
	})

	//Source code
	command(client, 'sourcecode', (message) => {
		const sc = new Discord.MessageEmbed()
			.addFields({
				name: 'Klik link di bawah untuk mendapatkan source code',
				value: 'https://bit.ly/zbotsc'
			})
		message.channel.send(sc)
	})
	
	//Changelog
    command(client, 'changelog', (message) => {
        message.reply('**Fitur ini masih belum tersedia!**')
    })
})

client.login(config.token)
