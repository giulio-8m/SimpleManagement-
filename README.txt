# SimpleManagement-
" A simple management  system for  bars &amp; restaurants "

##### Istruzioni  per l'avvio dell'applicazione

Prerequisiti : 
	1. Essere connessi ad internet.
	2. Aver installato node.js ed il gestore di pacchetti npm.
	3. Aver installato angular (npm install -g @angular/cli)
	4. Aver installato apache cordova  (npm install -g cordova)
	5. Avere i relativi skd per l'emulatore android di cordova reperibili dall'installazione di android studio
	6. Aver installato electron (npm install -g electron)
	
Il database è online quindi non è necessario caricare dei dati in esso visto che sono già presenti.

1. Aprire il terminale nella cartella back-end

2. Eseguire nel terminale il comando : npm install

3. Eseguire nel terminale il comando : npm start

4. In base al tipo di applicazione front-end che volete utilizzare aprite il terminale :

   1. Nella cartella cordova-app per avviare l'app mobile

      1. Eseguire nel terminale il comando : npm install
      2. Eseguire nel terminale il comando : npm start

   2. Nella cartella electron-app per avviare l'app desktop

      1. Eseguire nel terminale il comando : npm install
      2. Eseguire nel terminale il comando : npm start

   3. Nella cartella front-end per avviare l'app browser

      1. Eseguire nel terminale il comando : npm install
      2. Eseguire nel terminale il comando : npm start

Per buildare i file dell'applicazione cordova : nella cartella di front-end aprire il terminale ed eseguire il comando ng build --base-href ./ --configuration=cordova
In seguito è sufficiente spostare i file presenti nella cartella ./front-end/dist/front-end alla cartella ./cordova-app/www

Per buildare i file dell'applicazione electron : nella cartella di front-end aprire il terminale ed 
eseguire il comando ng build --base-href ./
In seguito è sufficiente spostare i file presenti nella cartella ./front-end/dist/front-end alla cartella ./electron-app/src/dist/front-end

Per avere una lista di tutti gli endpoints disponibili inserire nel browser http://localhost:3000/API

Per utilizzare le varie funzionalità sono gia registrati  alcuni utenti.

​	Ruolo Cassa:

​		Username : cassa1 Password : cassa1

​		Username : cassa2 Password : cassa2

​	Ruolo Cameriere:

​		Username : cameriere1 Password : cameriere1

​		Username : cameriere2 Password : cameriere2	

​	Ruolo Barista :

​		Username : barista1 Password : barista1

​		Username : barista2 Password : barista2	

​	Rolo Cuoco :

​		Username : cuoco1 Password : cuoco1

​		Username : cuoco2 Password : cuoco2

	
