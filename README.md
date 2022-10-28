# Groupomania

## Instructions

1. Clonez le dépôt git en éxécutant `git clone https://github.com/polynux/groupomania-openclassrooms`.

2. Executez `cd groupomania-openclassrooms` puis `npm install`.

3. Pour compiler les fichiers, éxecutez `npm run build`.

4. Enfin, pour démarrer le serveur, éxecutez `npm start`.

5. Pour accéder à l'application, rendez-vous sur `http://localhost:5173`.

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
