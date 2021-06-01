const utils = require('./query.js');
const { checkUser } = require("./util.js");

Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1;
	var dd = this.getDate();

	return [
		this.getFullYear(),
		(mm > 9 ? '' : '0') + mm,
		(dd > 9 ? '' : '0') + dd
	].join('/');
};


function rejoin(array, separator) {
	if (!array.length) return;

	let newArr = [];

	array.forEach(item => {
		newArr.push(item.join(separator));
	 
	});

	return newArr;
}

module.exports.run = async (message, msg) => {
	const isValid = utils.isValid(msg);
  msg = msg.replace(/^\s+/g, "").replace(/\s+$/g, "");
	
	if (!isValid) {
		message.channel.send('Invalid Query');
		return;
	}

	let data = await utils.parse(msg);
	const guild = message.guild;
  
  let ordby = data.params.filter(v => v.type === "OrderBy")[0];
  let isWhere = data.params.filter(v => v.type === "where")[0];
  
  if(isWhere && Array.isArray(isWhere.items)) return message.channel.send("Invalid query.");
  
  ordby = ordby ? ordby.items : ordby;

   console.log(JSON.stringify(data));
 
	try {
		if (utils.isMention(data.target)) {
			let sid = utils.getSid(data.target);
			if (data.method.toLowerCase() === 'select') {
				let resData = [];
				let separator = '|';
	
				let member = guild.members.cache.get(sid);

				if (!member) return message.channel.send('User not found.');

				data.params.forEach(async items => {
					await new Promise(resolve => {
						
						if (items.type === 'info') {
							let item = items.items;

							for (let arg of item) {
								if (arg === '*') {
									resData.push((ordby ? (ordby["details"] === "true" ? "username: " : ""):"")+member.user.username);

									resData.push((ordby ? (ordby["details"] === "true" ? "tag: " : ""):"")+member.user.tag);

									resData.push((ordby ? (ordby["details"] === "true" ? "nickname: " : ""):"")+(member.nickname ? member.nickname : 'null'));

									resData.push((ordby ? (ordby["details"] === "true" ? "id: " : ""):"")+member.user.id);

									resData.push((ordby ? (ordby["details"] === "true" ? "avatar: " : ""):"")+member.user.displayAvatarURL());

									resData.push((ordby ? (ordby["details"] === "true" ? "discriminator: " : ""):"")+member.user.discriminator);

									resData.push((ordby ? (ordby["details"] === "true" ? "isBot: " : ""):"")+member.user.bot);

									resData.push((ordby ? (ordby["details"] === "true" ? "joinedDate: " : ""):"")+
										member.joinedAt.yyyymmdd() +
											' ' +
											member.joinedAt.getUTCHours() +
											':' +
											member.joinedAt.getUTCMinutes() +
											':' +
											member.joinedAt.getUTCSeconds()
									);

									resData.push((ordby ? (ordby["details"] === "true" ? "createdDate: " : ""):"")+
										member.user.createdAt.yyyymmdd() +
											' ' +
											member.user.createdAt.getUTCHours() +
											':' +
											member.user.createdAt.getUTCMinutes() +
											':' +
											member.user.createdAt.getUTCSeconds()
									);
									
									
									  let roles = member._roles;
									  
									  roles = roles.map(r =>{
									  	let role = message.guild.roles.cache.get(r);
									  	return role.name;
									  });
									  
									  resData.push((ordby ? (ordby["details"] === "true" ? "roles: " : ""):"")+roles.join(", "));
									
								} else if (arg === 'username')
									resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.username);
								else if (arg === 'tag') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.tag);
								else if (arg === 'nickname')
									resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.nickname ? member.nickname : 'null');
								else if (arg === 'id') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.id);
								else if (arg === 'avatar')
									resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.displayAvatarURL());
								else if (arg === 'discriminator')
									resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.discriminator);
								else if (arg === 'isBot') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.bot);
								else if (arg === 'joinedDate')
									resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+
										member.joinedAt.yyyymmdd() +
											' ' +
											member.joinedAt.getUTCHours() +
											':' +
											member.joinedAt.getUTCMinutes() +
											':' +
											member.joinedAt.getUTCSeconds()
									);
								else if (arg === 'createdDate')
									resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+
										member.user.createdAt.yyyymmdd() +
											' ' +
											member.user.createdAt.getUTCHours() +
											':' +
											member.user.createdAt.getUTCMinutes() +
											':' +
											member.user.createdAt.getUTCSeconds()
									);
									else if(arg === "roles"){
									  let roles = member._roles;
									  
									  roles = roles.map(r =>{
									  	let role = message.guild.roles.cache.get(r);
									  	return role.name;
									  });
									  
									  resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+roles.join(", "));
									}
							}

							resolve();
						} else if (items.type === 'OrderBy') {
							let item = items.items;
							if (typeof item !== 'object') return;

							for (let arg in item) {
								if (arg === 'separator') {
									separator = item[arg];
								}
							}
						}
					});
				});

				if (resData.length > 0) message.channel.send(resData.join(separator));
				else message.channel.send('Please specify.');
			}
			else if(data.method.toLowerCase() === "update")
			{
				let member = guild.members.cache.get(sid);

				if (!member) return message.channel.send('User not found.');
				
				message.channel.send(`Trying update data from user`);

				data.params.forEach(async items => {
					await new Promise(async resolve => {
						if (items.type === 'set') {
							let item = items.items;
							if(typeof item !== "object") return;
		         
							for (let arg in item){
					  		if (arg.toLowerCase() === 'nickname')
							  	member.setNickname(item[arg]);
						    else
						    if(arg.toLowerCase() === "role.add"){
						    	let role = message.guild.roles.cache.find(r => r.name === item[arg]);
						    	
						    	if(role)
						    	await member.roles.add(role);
						    	else return message.channel.send("Role doesn't exists.");
						    }
						    else
						    if(arg.toLowerCase() === "role.remove"){
						    	let role = message.guild.roles.cache.find(r => r.name === item[arg]);
						    	
						    	if(role)
						    	await member.roles.remove(role);
						    	else return message.channel.send("Role doesn't exists.");
						    }
							}

							resolve();
						}
					});
				});
			}
		} else {
			if (data.target === '*') {
				if(data.method.toLowerCase() === "select"){
				let separator = '|';
				let line = `\n`;
				let count = null;
				let membersFiltered = [];
				let members = await guild.members.fetch();
				
				
				let where = data.params.filter(it => {
					if (it.type === 'where') return it.items;
				})[0];
				
		   if(!members) return message.channel.send("It was not possible to fetch all members.");
		   
		  
				if (typeof where !== 'object') where = null;

				if (where) {
		
					members = members.filter(member => {
						let isUser = [];
			
						for (let i in where.items) {
							let arg = where.items[i];
							let operator = i.match(/(<|!|=|>)$/g);
							operator = operator ? operator[0] : '=';
							i = i.replace(/(<|!|=|>)$/g, '');

						//	console.log(i, /(role\.has( \([0-9]\))?)$/g.test(i));

					    isUser = checkUser(message, isUser, member, operator, arg, i);
				      
						}

						let can = utils.condition(where.separator.all, isUser);
						
						if (can === true) {
							return member;
						}
					});
				}
			
			  
				if(members.size === 0) return message.channel.send("no users were found with these filters.");

				members.forEach(async member => {
					await new Promise(async resolver => {
						data.params.forEach(async items => {
							await new Promise(async resolve => {
								if (items.type === 'info') {
									let item = items.items;
									let resData = [];

									for (let arg of item) {
										if (arg === '*') {
											resData.push((ordby ? (ordby["details"] === "true" ? "username: " : ""):"")+member.user.username);

									resData.push((ordby ? (ordby["details"] === "true" ? "tag: " : ""):"")+member.user.tag);

									resData.push((ordby ? (ordby["details"] === "true" ? "nickname: " : ""):"")+(member.nickname ? member.nickname : 'null'));

									resData.push((ordby ? (ordby["details"] === "true" ? "id: " : ""):"")+member.user.id);

									resData.push((ordby ? (ordby["details"] === "true" ? "avatar: " : ""):"")+member.user.displayAvatarURL());

									resData.push((ordby ? (ordby["details"] === "true" ? "discriminator: " : ""):"")+member.user.discriminator);

									resData.push((ordby ? (ordby["details"] === "true" ? "isBot: " : ""):"")+member.user.bot);

									resData.push((ordby ? (ordby["details"] === "true" ? "joinedDate: " : ""):"")+
										member.joinedAt.yyyymmdd() +
											' ' +
											member.joinedAt.getUTCHours() +
											':' +
											member.joinedAt.getUTCMinutes() +
											':' +
											member.joinedAt.getUTCSeconds()
									);

									resData.push((ordby ? (ordby["details"] === "true" ? "createdDate: " : ""):"")+
										member.user.createdAt.yyyymmdd() +
											' ' +
											member.user.createdAt.getUTCHours() +
											':' +
											member.user.createdAt.getUTCMinutes() +
											':' +
											member.user.createdAt.getUTCSeconds()
									);
									
									
									  let roles = member._roles;
									  
									  roles = roles.map(r =>{
									  	let role = message.guild.roles.cache.get(r);
									  	return role.name;
									  });
									  
									  resData.push((ordby ? (ordby["details"] === "true" ? "roles: " : ""):"")+roles.join(", "));
									
										} else if (arg === 'username')
											resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.username);
										else if (arg === 'tag') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.tag);
										else if (arg === 'nickname')
											resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.nickname ? member.nickname : 'null');
										else if (arg === 'id') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.id);
										else if (arg === 'avatar')
											resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.displayAvatarURL());
										else if (arg === 'discriminator')
											resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.discriminator);
										else if (arg === 'isBot') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.bot);
										else if (arg === 'joinedDate')
											resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+
												member.joinedAt.yyyymmdd() +
													' ' +
													member.joinedAt.getUTCHours() +
													':' +
													member.joinedAt.getUTCMinutes() +
													':' +
													member.joinedAt.getUTCSeconds()
											);
										else if (arg === 'createdDate')
											resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+
												member.user.createdAt.yyyymmdd() +
													' ' +
													member.user.createdAt.getUTCHours() +
													':' +
													member.user.createdAt.getUTCMinutes() +
													':' +
													member.user.createdAt.getUTCSeconds()
											);
									else if(arg === "roles"){
									  let roles = member._roles;
									  
									  roles = roles.map(r =>{
									  	let role = message.guild.roles.cache.get(r);
									  	return role.name;
									  });
									  
									  resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+roles.join(", "));
									}
									}
									membersFiltered.push(resData);

									resolve();
								} else if (items.type === 'OrderBy') {
									let item = items.items;
									if (typeof item !== 'object') return;

									for (let arg in item) {
										if (arg === 'separator') {
											separator = item[arg];
										} 
										else if (arg === 'count')
										{
											if (isNaN(item[arg])) return;

											count = Number(item[arg]);
										}
										else if(arg === "line")
										line = item[arg].replace(/\\n/g, "\n").replace(/\\s/g, "\s");
									}
								}
							});
						});
						resolver();
					});
				});
				
				let compress = rejoin(membersFiltered, separator);
		   
				if (count) compress = compress.slice(0, count);
				
				try{
				if (membersFiltered.length > 0)
					message.channel.send(compress.join(line), {split:true});
				else message.channel.send('Please specify.');
				}catch{message.channel.send("the length of the message is too much")};
				
				
				}else if(data.method.toLowerCase() === "update"){
					console.log("is")
				}
			} else {
				let sid = utils.getSid(data.target);
				if (data.method.toLowerCase() === 'select') {
					let resData = [];
					let separator = '|';
					let member;

					if (/[0-9]+/g.test(data.target))
						member = guild.members.cache.get(sid);
					else
						member = guild.members.cache.find(
							u => u.user.username === data.target
						);

					if (!member) return message.channel.send('User not found.');

					data.params.forEach(async items => {
						await new Promise(resolve => {
							if (items.type === 'info') {
								let item = items.items;

								for (let arg of item) {
									if (arg === '*') {
										resData.push((ordby ? (ordby["details"] === "true" ? "username: " : ""):"")+member.user.username);

									resData.push((ordby ? (ordby["details"] === "true" ? "tag: " : ""):"")+member.user.tag);

									resData.push((ordby ? (ordby["details"] === "true" ? "nickname: " : ""):"")+(member.nickname ? member.nickname : 'null'));

									resData.push((ordby ? (ordby["details"] === "true" ? "id: " : ""):"")+member.user.id);

									resData.push((ordby ? (ordby["details"] === "true" ? "avatar: " : ""):"")+member.user.displayAvatarURL());

									resData.push((ordby ? (ordby["details"] === "true" ? "discriminator: " : ""):"")+member.user.discriminator);

									resData.push((ordby ? (ordby["details"] === "true" ? "isBot: " : ""):"")+member.user.bot);

									resData.push((ordby ? (ordby["details"] === "true" ? "joinedDate: " : ""):"")+
										member.joinedAt.yyyymmdd() +
											' ' +
											member.joinedAt.getUTCHours() +
											':' +
											member.joinedAt.getUTCMinutes() +
											':' +
											member.joinedAt.getUTCSeconds()
									);

									resData.push((ordby ? (ordby["details"] === "true" ? "createdDate: " : ""):"")+
										member.user.createdAt.yyyymmdd() +
											' ' +
											member.user.createdAt.getUTCHours() +
											':' +
											member.user.createdAt.getUTCMinutes() +
											':' +
											member.user.createdAt.getUTCSeconds()
									);
									
									
									  let roles = member._roles;
									  
									  roles = roles.map(r =>{
									  	let role = message.guild.roles.cache.get(r);
									  	return role.name;
									  });
									  
									  resData.push((ordby ? (ordby["details"] === "true" ? "roles: " : ""):"")+roles.join(", "));
									
									} else if (arg === 'username')
										resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.username);
									else if (arg === 'tag') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.tag);
									else if (arg === 'nickname')
										resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.nickname ? member.nickname : 'null');
									else if (arg === 'id') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.id);
									else if (arg === 'avatar')
										resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.displayAvatarURL());
									else if (arg === 'discriminator')
										resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.discriminator);
									else if (arg === 'isBot') resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+member.user.bot);
									else if (arg === 'joinedDate')
										resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+
											member.joinedAt.yyyymmdd() +
												' ' +
												member.joinedAt.getUTCHours() +
												':' +
												member.joinedAt.getUTCMinutes() +
												':' +
												member.joinedAt.getUTCSeconds()
										);
									else if (arg === 'createdDate')
										resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+
											member.user.createdAt.yyyymmdd() +
												' ' +
												member.user.createdAt.getUTCHours() +
												':' +
												member.user.createdAt.getUTCMinutes() +
												':' +
												member.user.createdAt.getUTCSeconds()
										);
										else if(arg === "roles"){
									  let roles = member._roles;
									  
									  roles = roles.map(r =>{
									  	let role = message.guild.roles.cache.get(r);
									  	return role.name;
									  });
									  
									  resData.push((ordby ? (ordby["details"] === "true" ? arg+": " : ""):"")+roles.join(", "));
									}
								}

								resolve();
							} else if (items.type === 'OrderBy') {
								let item = items.items;
								if (typeof item !== 'object') return;

								for (let arg in item) {
									if (arg === 'separator') {
										separator = item[arg];
									}
								}
							}
						});
					});

					if (resData.length > 0) message.channel.send(resData.join(separator));
					else message.channel.send('Please specify.');
				}
			}
		}
	} catch (err) {
		console.log(err);
		message.channel.send('invalid query.');
	}
};
