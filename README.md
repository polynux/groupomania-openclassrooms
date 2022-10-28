# Groupomania

## Instructions

1. Clonez le dépôt git en éxécutant `git clone https://github.com/polynux/groupomania-openclassrooms`.

2. Executez `cd groupomania-openclassrooms` puis `npm install`.

3. Pour compiler les fichiers, éxecutez `npm run build`.

4. Il faut ensuite générer un fichier `.env` à la racine du projet. Vous pouvez vous aider du fichier `.env.example` pour cela. Pour la base de données, vous pouvez utiliser MySQL ou MariaDB. Si vous désirez utiliser mariadb ou mondodb par exemple, alors il faut aussi modifier le 'provider' dans le fichier `prisma/schema.prisma`.

5. Puis générer la base de données en éxécutant `npm run db:build` et enfin synchroniser les tables avec `npm run db:push`.

6. Enfin, pour démarrer le serveur, éxecutez `npm start`.

7. Pour accéder à l'application, rendez-vous sur `http://localhost:5000`.

## Programme exécutable

1. Téléchargez le programme exécutable pour Windows en cliquant [ici](https://github.com/polynux/groupomania-openclassrooms/releases/download/1.0/groupomania-release-1.0.zip).

2. Décompressez le fichier `groupomania-release-1.0.zip`.

3. Lancez le programme `groupomania.exe`.

Si vous souhaitez compiler le programme exécutable, vous pouvez suivre les instructions suivantes :

Executez `cd groupomania-openclassrooms/client` puis `npm install`, puis `npm run build:neu`.

Le programme exécutable se trouve dans le dossier `groupomania-openclassrooms/client/dist`.

## TODO

- [x] Régler un problème avec prisma. Il demande un roleId pour la création de l'utilisateur mais ce n'est pas présent dans le model.
- [x] Utiliser NeutralinoJS pour faire une application desktop
