const utils = require('./query.js');

Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
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
	if (!isValid) {
		message.channel.send('Invalid Query');
		return;
	}

	let data = await utils.parse(msg);
	const guild = message.guild;

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
									resData.push(member.user.username);

									resData.push(member.user.tag);

									resData.push(member.nickname ? member.nickname : 'null');

									resData.push(member.user.id);

									resData.push(member.user.displayAvatarURL());

									resData.push(member.user.discriminator);

									resData.push(member.user.bot);

									resData.push(
										member.joinedAt.yyyymmdd() +
											' ' +
											member.joinedAt.getUTCHours() +
											':' +
											member.joinedAt.getUTCMinutes() +
											':' +
											member.joinedAt.getUTCSeconds()
									);

									resData.push(
										member.user.createdAt.yyyymmdd() +
											' ' +
											member.user.createdAt.getUTCHours() +
											':' +
											member.user.createdAt.getUTCMinutes() +
											':' +
											member.user.createdAt.getUTCSeconds()
									);
								} else if (arg === 'username')
									resData.push(member.user.username);
								else if (arg === 'tag') resData.push(member.user.tag);
								else if (arg === 'nickname')
									resData.push(member.nickname ? member.nickname : 'null');
								else if (arg === 'id') resData.push(member.user.id);
								else if (arg === 'avatar')
									resData.push(member.user.displayAvatarURL());
								else if (arg === 'discriminator')
									resData.push(member.user.discriminator);
								else if (arg === 'isBot') resData.push(member.user.bot);
								else if (arg === 'joinedDate')
									resData.push(
										member.joinedAt.yyyymmdd() +
											' ' +
											member.joinedAt.getUTCHours() +
											':' +
											member.joinedAt.getUTCMinutes() +
											':' +
											member.joinedAt.getUTCSeconds()
									);
								else if (arg === 'createdDate')
									resData.push(
										member.user.createdAt.yyyymmdd() +
											' ' +
											member.user.createdAt.getUTCHours() +
											':' +
											member.user.createdAt.getUTCMinutes() +
											':' +
											member.user.createdAt.getUTCSeconds()
									);
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
		} else {
			if (data.target === '*') {
				let separator = '|';
				let count = null;
				let membersFiltered = [];
				let members = await guild.members.fetch();
				let where = data.params.filter(it => {
					if (it.type === 'where') return it.items;
				})[0];
				if (typeof where !== 'object') where = null;

				if (where) {
					members = members.filter(member => {
						let isUser = [];
						for (let i in where.items) {
							let arg = where.items[i];
							let operator = i.match(/(<|=|>)$/g);
							operator = operator ? operator[0] : '=';
							i = i.replace(/(<|=|>)$/g, '');

							//console.log(separator, i, arg);

							if (i === 'username') {
								if (member.user.username === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'username.includes') {
								if (member.user.username.includes(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'username.startsWith') {
								if (member.user.username.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'username.endsWith') {
								if (member.user.username.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'isBot') {
								if (member.user.bot === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'avatar') {
								if (member.user.avatar === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'avatar.includes') {
								if (member.user.avatar.includes(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'avatar.startsWith') {
								if (member.user.avatar.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'avatar.endsWith') {
								if (member.user.avatar.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'nickname') {
								if (member.nickname === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'nickname.includes') {
								if (member.nickname && member.nickname.includes(arg))
									isUser.push(true);
								else isUser.push(false);
							} else if (i === 'nickname.startsWith') {
								if (member.nickname && member.nickname.startsWith(arg))
									isUser.push(true);
								else isUser.push(false);
							} else if (i === 'nickname.endsWith') {
								if (member.nickname && member.nickname.endsWith(arg))
									isUser.push(true);
								else isUser.push(false);
							} else if (i === 'tag') {
								if (member.user.tag === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'discriminator') {
								if (member.user.discriminator === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'discriminator.includes') {
								if (member.user.discriminator.includes(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'discriminator.startsWith') {
								if (member.user.discriminator.startsWith(arg))
									isUser.push(true);
								else isUser.push(false);
							} else if (i === 'discriminator.endsWith') {
								if (member.user.discriminator.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'id') {
								if (member.user.id === arg) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'id.includes') {
								if (member.user.id.includes(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'id.startsWith') {
								if (member.user.id.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'id.endsWith') {
								if (member.user.id.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
							} else if (i === 'joinedDate.hours') {
								if (isNaN(arg)) {
									isUser.push(false);
									return;
								}

								if (operator === '<') {
									if (
										Date.now() - member.joinedAt <=
										1000 * 60 * 60 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else if (operator === '>') {
									if (
										Date.now() - member.joinedAt >=
										1000 * 60 * 60 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else {
									if (
										Date.now() - member.joinedAt ===
										1000 * 60 * 60 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								}
							} else if (i === 'joinedDate.months') {
								if (isNaN(arg)) {
									isUser.push(false);
									return;
								}

								if (operator === '<') {
									if (
										Date.now() - member.joinedAt <=
										1000 * 60 * 60 * 24 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else if (operator === '>') {
									if (
										Date.now() - member.joinedAt >=
										1000 * 60 * 60 * 24 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else {
									if (
										Date.now() - member.joinedAt ===
										1000 * 60 * 60 * 24 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								}
							} else if (i === 'joinedDate.days') {
								if (isNaN(arg)) {
									isUser.push(false);
									return;
								}

								if (operator === '<') {
									if (
										Date.now() - member.joinedAt <=
										1000 * 60 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else if (operator === '>') {
									if (
										Date.now() - member.joinedAt >=
										1000 * 60 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else {
									if (
										Date.now() - member.joinedAt ===
										1000 * 60 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								}
							} else if (i === 'createdDate.days') {
								if (isNaN(arg)) {
									isUser.push(false);
									return;
								}

								if (operator === '<') {
									if (
										Date.now() - member.user.createdAt <=
										1000 * 60 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else if (operator === '>') {
									if (
										Date.now() - member.user.createdAt >=
										1000 * 60 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else {
									if (
										Date.now() - member.user.createdAt ===
										1000 * 60 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								}
							} else if (i === 'createdDate.hours') {
								if (isNaN(arg)) {
									isUser.push(false);
									return;
								}

								if (operator === '<') {
									if (
										Date.now() - member.user.createdAt <=
										1000 * 60 * 60 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else if (operator === '>') {
									if (
										Date.now() - member.user.createdAt >=
										1000 * 60 * 60 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else {
									if (
										Date.now() - member.user.createdAt ===
										1000 * 60 * 60 * 28 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								}
							} else if (i === 'createdDate.months') {
								if (isNaN(arg)) {
									isUser.push(false);
									return;
								}

								if (operator === '<') {
									if (
										Date.now() - member.user.createdAt <=
										1000 * 60 * 60 * 28 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else if (operator === '>') {
									if (
										Date.now() - member.user.createdAt >=
										1000 * 60 * 60 * 28 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								} else {
									if (
										Date.now() - member.user.createdAt ===
										1000 * 60 * 28 * 60 * 24 * Number(arg)
									)
										isUser.push(true);
									else isUser.push(false);
								}
							}
						}

						let can = utils.condition(where.separator.all, isUser);

						if (can) {
							return member;
						}
					});
				}

				members.forEach(async member => {
					await new Promise(async resolver => {
						data.params.forEach(async items => {
							await new Promise(async resolve => {
								if (items.type === 'info') {
									let item = items.items;
									let resData = [];

									for (let arg of item) {
										if (arg === '*') {
											resData.push(member.user.username);

											resData.push(member.user.tag);

											resData.push(member.nickname ? member.nickname : 'null');

											resData.push(member.user.id);

											resData.push(member.user.displayAvatarURL());

											resData.push(member.user.discriminator);

											resData.push(member.user.bot);

											resData.push(
												member.joinedAt.yyyymmdd() +
													' ' +
													member.joinedAt.getUTCHours() +
													':' +
													member.joinedAt.getUTCMinutes() +
													':' +
													member.joinedAt.getUTCSeconds()
											);

											resData.push(
												member.user.createdAt.yyyymmdd() +
													' ' +
													member.user.createdAt.getUTCHours() +
													':' +
													member.user.createdAt.getUTCMinutes() +
													':' +
													member.user.createdAt.getUTCSeconds()
											);
										} else if (arg === 'username')
											resData.push(member.user.username);
										else if (arg === 'tag') resData.push(member.user.tag);
										else if (arg === 'nickname')
											resData.push(member.nickname ? member.nickname : 'null');
										else if (arg === 'id') resData.push(member.user.id);
										else if (arg === 'avatar')
											resData.push(member.user.displayAvatarURL());
										else if (arg === 'discriminator')
											resData.push(member.user.discriminator);
										else if (arg === 'isBot') resData.push(member.user.bot);
										else if (arg === 'joinedDate')
											resData.push(
												member.joinedAt.yyyymmdd() +
													' ' +
													member.joinedAt.getUTCHours() +
													':' +
													member.joinedAt.getUTCMinutes() +
													':' +
													member.joinedAt.getUTCSeconds()
											);
										else if (arg === 'createdDate')
											resData.push(
												member.user.createdAt.yyyymmdd() +
													' ' +
													member.user.createdAt.getUTCHours() +
													':' +
													member.user.createdAt.getUTCMinutes() +
													':' +
													member.user.createdAt.getUTCSeconds()
											);
									}
									membersFiltered.push(resData);

									resolve();
								} else if (items.type === 'OrderBy') {
									let item = items.items;
									if (typeof item !== 'object') return;

									for (let arg in item) {
										if (arg === 'separator') {
											separator = item[arg];
										} else if (arg === 'count') {
											if (isNaN(item[arg])) return;

											count = Number(item[arg]);
										}
									}
								}
							});
						});
						resolver();
					});
				});

				let compress = rejoin(membersFiltered, separator);

				if (count) compress = compress.slice(0, count);

				if (membersFiltered.length > 0)
					message.channel.send(compress.join('\n'));
				else message.channel.send('Please specify.');
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
										resData.push(member.user.username);

										resData.push(member.user.tag);

										resData.push(member.nickname ? member.nickname : 'null');

										resData.push(member.user.id);

										resData.push(member.user.displayAvatarURL());

										resData.push(member.user.discriminator);

										resData.push(member.user.bot);

										resData.push(
											member.joinedAt.yyyymmdd() +
												' ' +
												member.joinedAt.getUTCHours() +
												':' +
												member.joinedAt.getUTCMinutes() +
												':' +
												member.joinedAt.getUTCSeconds()
										);

										resData.push(
											member.user.createdAt.yyyymmdd() +
												' ' +
												member.user.createdAt.getUTCHours() +
												':' +
												member.user.createdAt.getUTCMinutes() +
												':' +
												member.user.createdAt.getUTCSeconds()
										);
									} else if (arg === 'username')
										resData.push(member.user.username);
									else if (arg === 'tag') resData.push(member.user.tag);
									else if (arg === 'nickname')
										resData.push(member.nickname ? member.nickname : 'null');
									else if (arg === 'id') resData.push(member.user.id);
									else if (arg === 'avatar')
										resData.push(member.user.displayAvatarURL());
									else if (arg === 'discriminator')
										resData.push(member.user.discriminator);
									else if (arg === 'isBot') resData.push(member.user.bot);
									else if (arg === 'joinedDate')
										resData.push(
											member.joinedAt.yyyymmdd() +
												' ' +
												member.joinedAt.getUTCHours() +
												':' +
												member.joinedAt.getUTCMinutes() +
												':' +
												member.joinedAt.getUTCSeconds()
										);
									else if (arg === 'createdDate')
										resData.push(
											member.user.createdAt.yyyymmdd() +
												' ' +
												member.user.createdAt.getUTCHours() +
												':' +
												member.user.createdAt.getUTCMinutes() +
												':' +
												member.user.createdAt.getUTCSeconds()
										);
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
