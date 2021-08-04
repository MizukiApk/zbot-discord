//Jangan di hapus
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
        if (message.author.id !== "778139021271629864") { //Masukan id kalian (tag akun kalian dan beri simbol \ di depan lalu kirim)
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
	
    //Hapus pesan satu channel
	//Note: Pesan yang lebih dari 14 hari tidak dapat di hapus
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        } else {
            message.reply('Kamu tidak dapat mengakses command ini')
        }
    })

    //Random command biar bot penuh lol (boleh di hapus)
    command(client, 'gamingkeyboard', (message) => {
        const contohkeyboard = 'https://m.media-amazon.com/images/I/71nRfZNacyL._AC_SL1500_.jpg'
		
		//salah satu pesan embed
        const keyboardembed = new Discord.MessageEmbed()
            .setTitle('List mechanical keyboard gaming')
            .setColor("RANDOM")
            .setFooter(`Ketik 'keyboard <nama keyboard>' untuk detail produk`)
            .addFields({
                name: 'Layout 60%',
                value: `
                \`\`vortexseriesvx5\`\`
                \`\`razerhuntsmanmini\`\`
                \`\`annepro2\`\`
                \`\`royalkludgerk61\`\``,
				inline: true,
            }, {
                name: 'Layout TKL',
                value: `
                \`\`rexuslegionaremx9\`\`
                \`\`vortexseriesvx7\`\`
                \`\`fantechoptilitemk872\`\`
                \`\`steelseriesapexprotkl\`\``,
				inline: true,
            }, {
                name: 'Layout Full Size',
                value: `
                \`\`fantechmaxcoremk852\`\`
                \`\`vortexseriesvx10pro\`\`
                \`\`rexuslegionaremx10\`\`
				\`\`fantechmaxpowermk853\`\``,
				inline: true,
            })
            .setImage(contohkeyboard)
        message.channel.send(keyboardembed)
    })
	command(client, 'keyboard vortexseriesvx5', (message) => {
		const vx5img = 'https://www.uji-dulu.com/wp-content/uploads/2019/01/VortexseriesVX5-5.jpg'
		
		const vx5detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Vortex Series Vx5')
			.setImage(vx5img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Vortex Series vx5
						Layout: 60% (61 Keys)
						Tipe Switch: Outhemu Blue, Red, Brown
						Warna Keyboard: Hitam/Putih
						Removeable Outhemu Switch
						Full RGB 16,8 Juta Warna
						Harga resmi: Rp 350.000`
				})
		message.channel.send(vx5detail)
	})
	command(client, 'keyboard razerhuntsmanmini', (message) => {
		const huntsmanminiimg = 'https://d3fa68hw0m2vcc.cloudfront.net/427/234132248.jpeg'
		
		const huntsmanminidetail = new Discord.MessageEmbed()
			.setTitle('Keyboard Razer Huntsman Mini')
			.setImage(huntsmanminiimg)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Razer Huntsman Mini
						Layout: 60% (61 Keys)
						Tipe Switch: Purple (Clicky), Red (Linear)
						Full RGB 16,8 Juta Warna
						Harga resmi: 119,9$ (Rp 1.731.302)`
			})
		message.channel.send(huntsmanminidetail)
	})
	command(client, 'keyboard annepro2', (message) => {
		const pro2img = 'https://m.media-amazon.com/images/I/61ET53wJ9-L._AC_SL1500_.jpg'
		
		const pro2detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Anne Pro 2')
			.setImage(pro2img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Anne Pro 2
						Layout: 60% (61 Keys)
						Tipe Switch: Gateron/Cherry/Kailh Red, Blue, Brown
						Warna Keyboard: Hitam/Putih
						Full RGB 16,8 Juta Warna
						Kapasitas Baterai: 1900mAh
						Koneksi: Bluetooth/Wired
						Harga resmi: 97$ (Rp 1.400.000)`
			})
		message.channel.send(pro2detail)
	})
	command(client, 'keyboard royalkludgerk61', (message) => {
		const rk61img = 'https://www.ubuy.co.id/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjE5RjEycTExdVMuX0FDX1NMMTUwMF8uanBn.jpg'
		
		const rk61detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Royal Kludge rk61')
			.setImage(rk61img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Royal Kludge rk61
						Layout: 60% (61 Keys)
						Tipe Switch: Blue, Red, Brown
						Warna Keyboard: Hitam/Putih
						RGB 1 Warna Biru
						Kapasitas Baterai: 1450mAh
						Koneksi: Bluetooth/Wired
						Harga resmi: 54,99$ (Rp 795.000)`
			})
		message.channel.send(rk61detail)
	})
	command(client, 'keyboard rexuslegionaremx9', (message) => {
		const mx9img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThk3wn3PSr5zUG0q_Vei92YR4gqXOjchLpanzbH3Uz9vxUXemCfs_q4-hjs5KHqoQfAxc&usqp=CAU'
		
		const mx9detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Rexus Legionare MX9')
			.setImage(mx9img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Rexus Legionare MX9
						Layout: TKL/Ten Key Less (87 Keys)
						Tipe Switch: Outhemu Red/Blue
						Warna Keyboard: Cloud White, Rose Pink, Steel Blue, Asphalt Black
						Full RGB 16,8 Warna
						Removeable Outhemu Switch
						Harga resmi: Rp 399.000 - Rp 409.000`
			})
		message.channel.send(mx9detail)
	})
	command(client, 'keyboard rexuslegionaremx10', (message) => {
		const mx10img = 'https://rexus.id/wp-content/uploads/2019/10/MX10_02-1080x430.jpg'
		
		const mx10detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Rexus Legionare MX10')
			.setImage(mx10img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Rexus Legionare MX10
						Layout: Full Size (104 Keys)
						Tipe Switch: Outhemu Blue, Red, Brown
						Full RGB 16,8 Warna
						Removeable Outhemu Switch
						Harga Resmi: Rp 499.000`
			})
		message.channel.send(mx10detail)
	})
	command(client, 'keyboard vortexseriesvx7', (message) => {
		const vx7img = 'https://s0.bukalapak.com/img/5977749773/large/888073_d58b2241_63d4_4217_aa53_e999bbd5a9d0_700_525.jpg'
		
		const vx7detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Vortex Series VX7')
			.setImage(vx7img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Vortex Series VX7
						Layout: TKL/Ten Key Less (87 Keys)
						Tipe Switch: Outhemu Blue, Red, Brown
						Full RGB 16,8 Juta Warna
						Removeable Outhemu Switch
						Harga Resmi: Rp 390.000`
			})
		message.channel.send(vx7detail)
	})
	command(client, 'keyboard vortexseriesvx10pro', (message) => {
		const vx10img = 'https://images.tokopedia.net/img/cache/700/product-1/2019/5/14/56219301/56219301_92944c19-360a-4896-bf43-9fa86c8a444d_754_428.jpg'
		
		const vx10detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Vortex Series VX10 PRO')
			.setImage(vx10img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Vortex Series VX10 Pro
						Layout: Full Size (104 Keys)
						Tipe Switch: Gateron Blue, Red, Brown
						Full RGB 16,8 Warna
						Harga Resmi: Rp 500.000`
			})
		message.channel.send(vx10detail)
	})
	command(client, 'keyboard fantechoptilitemk872', (message) => {
		const mk872img = 'https://www.fantechworld.com/wp-content/uploads/2020/09/4-16.png'
		
		const mk872detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Fantech Optilite MK872')
			.setImage(mk872img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Fantech Optilite MK872
						Layout: TKL/Ten Key Less (87 Keys)
						Tipe Switch: Blue, Brown
						Full RGB 16,8 Juta Warna
						Waterproof & Dust Proof
						Harga Resmi: Rp 549.000`
			})
		message.channel.send(mk872detail)
	})
	command(client, 'keyboard fantechmaxcoremk852', (message) => {
		const mk852img = 'https://donedeal.com.bd/images/listings/2020-09/bigThmb/fantech_mk852_max_core_space_edition_mec-1599140059-303-e.png'
		
		const mk852detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Fantech Maxcore MK852')
			.setImage(mk852img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Fantech Maxcore MK852
						Layout: Full Size (104 Keys)
						Tipe Switch: Outhemu Blue/Brown
						RGB Gradient (Ga full RGB)
						4 Tombol Media Key
						Harga Resmi: Rp 369.000`
			})
		message.channel.send(mk852detail)
	})
	command(client, 'keyboard fantechmaxpowermk853', (message) => {
		const mk853img = 'https://www.fantechworld.com/wp-content/uploads/2021/01/MK853-11.png'
		
		const mk853detail = new Discord.MessageEmbed()
			.setTitle('Keyboard Fantech Maxpower MK853')
			.setImage(mk853img)
			.setFooter('Bot ini masih belum stabil karena belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Fantech Maxpower Mk853
						Layout: Full Size (104 Keys)
						Tipe Switch: Outhemu Red/Blue
						RGB Gradient (Ga full RGB)
						4 Tombol Media Key
						Harga Resmi: Rp 379.000`
			})
		message.channel.send(mk853detail)
	})
	command(client, 'keyboard steelseriesapexprotkl', (message) => {
		const apexprotklimg = 'https://p.kindpng.com/picc/s/763-7637532_best-gaming-keyboard-steelseries-m750-tkl-uk-hd.png'
		
		const apexprotkldetail = new Discord.MessageEmbed()
			.setTitle('Keyboard Steel Series Apex Pro Tkl')
			.setImage(apexprotklimg)
			.setFooter('Bot ini masih beluk stabil karena masih belum full release')
			.setColor("RANDOM")
			.addFields({
				name: 'Detail Produk',
				value: `Nama Produk: Steel Series Apex Pro Tkl
						Layout: TKL/Ten Key Less (87 Keys)
						Tipe Switch: OmniPoint Switch
						Full RGB 16,8 Juta Warna
						Magnetic Wrist Rest
						Harga Resmi: 189,9$ (Rp 2.729.000)`
			})
		message.channel.send(apexprotkldetail)
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
\`\`gamingkeyboard\`\`
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