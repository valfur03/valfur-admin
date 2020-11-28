#!/bin/bash

RED='\033[0;31m'
NC='\033[0m'

user_env=$(grep -Po 'DB_USER\s*=\s*\K.+' .env)
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

docker exec -i vfadm-mysql_server sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" vfadm' < init_db.sql
docker exec -i vfadm-node_server sh -c 'node init_db.js'
