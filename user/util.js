
module.exports.checkUser = function(message, isUser, member, operator,  arg, i){
	
	if(/(username( \([0-9]\))?)$/g.test(i)) {
	
								if(operator === "!"){
								if (member.user.username !== arg) isUser.push(true);
								else isUser.push(false);
								}else{
							if (member.user.username === arg) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(username\.includes( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.username.includes(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.username.includes(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(username\.startsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.username.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
								if (member.user.username.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(username\.endsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.username.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
						if (member.user.username.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(isBot( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (member.user.bot.toString() !== arg) isUser.push(true);
								else isUser.push(false);
								}else{
						  	if (member.user.bot.toString() === arg) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(avatar( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (member.user.avatar !== arg) isUser.push(true);
								else isUser.push(false);
								}else{
							if (member.user.avatar === arg) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(avatar\.includes( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.avatar.includes(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
								if (member.user.avatar.includes(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(avatar\.startsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.avatar.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.avatar.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(avatar\.endsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.avatar.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.avatar.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(nickname( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (member.nickname !== arg) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.nickname === arg) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(nickname\.includes( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (member.nickname && !member.nickname.includes(arg))
									isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.nickname && member.nickname.includes(arg))
									isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(nickname\.startsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (member.nickname && !member.nickname.startsWith(arg))
									isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.nickname && member.nickname.startsWith(arg))
									isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(nickname\.endsWith( \([0-9]\))?)$/g.test(i)){
								if(operator === "!"){
								if (member.nickname && !member.nickname.endsWith(arg))
									isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.nickname && member.nickname.endsWith(arg))
									isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(tag( \([0-9]\))?)$/g.test(i)){
								if (member.user.tag === arg) isUser.push(true);
								else isUser.push(false);
							} else if(/(discriminator( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (member.user.discriminator !== arg) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.discriminator === arg) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(discriminator\.includes( \([0-9]\))?)$/g.test(i)){
								if(operator === "!"){
								if (!member.user.discriminator.includes(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.discriminator.includes(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(discriminator\.startsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.discriminator.startsWith(arg))
									isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.discriminator.startsWith(arg))
									isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(discriminator\.endsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.discriminator.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
									if (member.user.discriminator.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(id( \([0-9]\))?)$/g.test(i)){
								if(operator === "!"){
									if (member.user.id !== arg) isUser.push(true);
							  	else isUser.push(false);
								}else{
								if (member.user.id === arg) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(id\.includes( \([0-9]\))?)$/g.test(i)) {
        	if(operator === "!"){
        		if (!member.user.id.includes(arg)) isUser.push(true);
								else isUser.push(false);
        	}else{
								if (member.user.id.includes(arg)) isUser.push(true);
								else isUser.push(false);
        	}
							} else if(/(id\.startsWith( \([0-9]\))?)$/g.test(i)) {
								if(operator === "!"){
								if (!member.user.id.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}else{
						if (member.user.id.startsWith(arg)) isUser.push(true);
								else isUser.push(false);
								}
							} else if(/(id\.endsWith( \([0-9]\))?)$/g.test(i)) {
							if(operator === "!"){
								if (!member.user.id.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
							}else{
								if (member.user.id.endsWith(arg)) isUser.push(true);
								else isUser.push(false);
							}
							} else if(/(joinedDate\.hours( \([0-9]\))?)$/g.test(i)){
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
							} else if(/(joinedDate\.months( \([0-9]\))?)$/g.test(i)){
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
							} else if(/(joinedDate\.days( \([0-9]\))?)$/g.test(i)){
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
							} else if(/(createdDate\.days( \([0-9]\))?)$/g.test(i)) {
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
							} else if(/(createdDate\.hours( \([0-9]\))?)$/g.test(i)){
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
							} else if(/(createdDate\.months( \([0-9]\))?)$/g.test(i)){
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
							}else if(/(role\.has( \([0-9]\))?)$/g.test(i)){
								let role;
								
								if(!isNaN(arg))
								role = message.guild.roles.cache.get(arg);
								else
                role = message.guild.roles.cache.find(r => r.name === arg);
                
                
						    if(!role){
						    	isUser.push(false);
						    	return;
						    }
						    
						    if(operator === "!"){
						    	if(!member._roles.includes(role.id))
						    isUser.push(true);
								else isUser.push(false);
						    }else{
						    if(member._roles.includes(role.id))
						    isUser.push(true);
								else isUser.push(false);
						    }
							}
								
								return isUser;
}
