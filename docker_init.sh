#!/bin/bash

RED=$'\e[1;31m'
GREEN=$'\e[1;32m'
YELLOW=$'\e[1;33m'
BLUE=$'\e[1;34m'
NC=$'\e[0m'

if user_env=$(grep -Po 'DB_USER\s*=\s*\K.+' .env) 2> /dev/null
then
	user_docker=$(grep -Po 'MYSQL_USER\s*:\s*\K.+' docker-compose.yml)

	if [ $user_env != $user_docker ]
	then
		echo "${RED}MySQL usernames in '.env' and 'docker-compose.yml' do not match.${NC}"
		exit 1
	fi

	pass_env=$(grep -Po 'DB_PASSWORD\s*=\s*\K.+' .env)
	pass_docker=$(grep -Po 'MYSQL_PASSWORD\s*:\s*\K.+' docker-compose.yml)

	if [ $pass_env != $pass_docker ]
	then
		echo "${RED}MySQL passwords in '.env' and 'docker-compose.yml' do not match.${NC}"
		exit 1
	fi
else
	echo "${YELLOW}Cannot check config files, errors may occure.${NC}"
fi

echo "${BLUE}Building docker images and composing...${NC}"
if docker-compose build && docker-compose up -d
then
	echo "${BLUE}Initializing database...${NC}"
	until docker exec -i vfadm-mysql_server sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" vfadm' < init_db.sql 2> /dev/null
	do
		sleep 1
	done
	until docker exec -i vfadm-node_server sh -c 'node init_db.js' 2> /dev/null
	do
		sleep 1
	done
	echo "${GREEN}Success!${NC}"
else
	echo "${RED}docker-compose failed.${NC}"
	docker-compose down
	exit 1
fi
