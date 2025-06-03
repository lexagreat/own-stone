push:
	 sshpass -p '69wxrypEjRWQ2c57' ssh root@89.104.71.129 "cd /var/www/fastuser/data/www/ownstone-frontend/; git reset --hard; git pull origin main; yarn install; yarn build;sudo service front_own restart"



