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

	
	try {
		let data = await utils.parse(msg);
	const guild = message.guild;

	console.log(JSON.stringify(data));

		if (data.method.toLowerCase() === 'delete') {
			let limit = 100;
			
			let desc = data.params.filter(it => {
						if (it.type === 'desc') return it.items;
					})[0];

			if (typeof desc !== 'object') desc = null;

			if(desc){
				for(let i in desc.items){
					let arg = desc.items[i];
					
					if(i === "limit"){
					if(!isNaN(arg))
					arg = Number(arg);
					else return;
					
					limit = arg;
					}
				}
			}
			
			if(limit > 100){
			limit = 100;
			}else if(limit <= 0){
				limit = 1;
			}
			
			
			message.channel.messages
				.fetch({ limit: limit })
				.then(fetchedMessages => {
					let messagesToDelete = fetchedMessages;

					let where = data.params.filter(it => {
						if (it.type === 'where') return it.items;
					})[0];

					if (typeof where !== 'object') where = null;

					if (where) {
						
						messagesToDelete = fetchedMessages.filter(msg => {
							let isUser = [];

							for (let i in where.items) {
								let arg = where.items[i];
								let operator = i.match(/(<|!|=|>)$/g);
								operator = operator ? operator[0] : '=';
								i = i.replace(/(<|!|=|>)$/g, '');

								if (/(content( \([0-9]\))?)$/g.test(i)) {
									if(msg.content === arg)
									isUser.push(true);
							  	else isUser.push(false);
								}
								else if (/(content\.includes( \([0-9]\))?)$/g.test(i)) {
									if(operator === "!"){
									if(!msg.content.includes(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}else{
									if(msg.content.includes(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}
								}
								else if (/(content\.toLowerCase\.includes( \([0-9]\))?)$/g.test(i)) {
									if(operator === "!"){
									if(!msg.content.toLowerCase().includes(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}else{
									if(msg.content.toLowerCase().includes(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}
								}
								else if (/(content\.startsWith( \([0-9]\))?)$/g.test(i)) {
									if(operator === "!"){
									if(!msg.content.startsWith(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}else{
									if(msg.content.startsWith(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}
								}
								else if (/(content\.endsWith( \([0-9]\))?)$/g.test(i)) {
									if(operator === "!"){
									if(!msg.content.endsWith(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}else{
									if(msg.content.endsWith(arg))
									isUser.push(true);
							  	else isUser.push(false);
									}
								}
								else if (/(author( \([0-9]\))?)$/g.test(i)) {
									if(utils.isMention(arg)){
									 let sid = utils.getSid(arg);
										 
									if(msg.author.id === sid)
									isUser.push(true);
							  	else isUser.push(false);
									}else{
									if(isNaN(arg)){
									if(msg.author.username === arg)
									isUser.push(true);
							  	else isUser.push(false);
									}else{
					    		if(msg.author.id === arg)
									isUser.push(true);
							  	else isUser.push(false);
									}
									}
								}
								
						
						let can = utils.condition(where.separator.all, isUser);
						
						if (can === true) {
							return msg;
						}
							}
						});
					}

					return message.channel.bulkDelete(messagesToDelete, true);
				})
				.then(deletedMessages =>{
				if(deletedMessages.size)
					message.channel.send(
						`Deleted **${deletedMessages.size}/${limit}** messages.`
					)
				}).catch(() => message.channel.send("Invalid query or failed to delete messages."));
		}
	} catch (err) {
		console.log(err);
		message.channel.send('Invalid query.');
	}
};
