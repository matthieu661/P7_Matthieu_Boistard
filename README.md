# P7_Matthieu_Boistard_backEnd
Projet Groupomania Openclassrooms

prérequis :
Node -v : v14.16.0
Npm -v : 6.14.11
mysql 

npm install -g
npm install --global yarn

// 
#### 1 #### demarage du server SQL :

##lancer l'invite de commande ou un terminal ;
##Pointer dans le repertoir Mysql (par default) : 

cmd> C:\Users\**user**>set PATH=%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin

##Se connecter avec son compte mysql

cmd>mysql -u root -p
		>**password

si tout est ok vous devriez recevoir :
#####
"Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 16
Server version: 8.0.25 MySQL Community Server - GPL " 
####

## Création de la Database :

#### 2 #### demarage du Backend :
-->Ouvrir le fichier "P7_Matthieu_Boistard_backEnd" avec vs.code et entrer dans powershell : 

ps> sequelize db:create

si tout est ok vous devriez recevoir : 
####
Sequelize CLI [Node: 14.16.0, CLI: 6.2.0, ORM: 6.6.2]

Loaded configuration file "config\config.json".
Using environment "development".
Database P7_dev created.
####


## Initialisation de la Database :
ps> sequelize db:migrate

si tout est ok vous devriez recevoir : 
####
Sequelize CLI [Node: 14.16.0, CLI: 6.2.0, ORM: 6.6.2]

Loaded configuration file "config\config.json".
Using environment "development".
== 20210625121722-create-user: migrating =======
== 20210625121722-create-user: migrated (0.035s)

== 20210625122008-create-post: migrating =======
== 20210625122008-create-post: migrated (0.030s)

== 20210627095726-create-like: migrated (0.042s)

== 20210627103857-create-comment: migrating =======
== 20210627103857-create-comment: migrated (0.038s)

== 20210627184440-create-dislike: migrating =======
== 20210627184440-create-dislike: migrated (0.040s)
###

### lancer le server du backEnd

>nodemon serve
ou
>npm start serve


si tout est ok vous devriez recevoir : 
####
PS C:\Users\**user\Desktop\Projet7_matthieu_boistard\P7_Matthieu_Boistard_backEnd> nodemon serve
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node serve server.js`
####



#### 3 #### demarage du FrontEnd :

-->Ouvrir le fichier "P7_Matthieu_Boistard_backEnd" avec vs.code et entrer dans powershell :

ps> cd frontend-p7-vue-cli-app
ps> yarn run serve

connectez vous au http://localhost:8080/.


