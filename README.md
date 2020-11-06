GUIA PARA INSTALACION DEL PROYECTO

PASO 1
Abrir el Visual Studio Code, crearse una carpeta donde trabajar y arrastrarla al Visual Studio Code
ya dentro presionar "Ctrl+Shift+ñ" (o crear una nueva terminal desde la barra Terminal en el Visual Studio)

con la terminal creada ingresar el siguiente comando

    git clone https://github.com/SupraSystems/SupraSystems.git


PASO 2

Despues de clonar abrir una segunda terminal con (Ctrl+Shift+ñ) la terminal se creara abajo a la derecha, y ejecutar el siguiente comando para posicionarse en el Backend

    cd .\SupraSystems\BackEnd\

luego instalar las dependecias con 

    npm install

y correr el Backend

    npm run dev

PASO 3

Cambiar a la terminal 1 desde el combobox que muestra el visual studio abajo a la derecha

Posicionarse en la carpeta del front end con el siguiente comando

    cd .\SupraSystems\FrontEndv2\
    
luego instalar las dependecias con 

    npm install

y correr la aplicacion con

    ng serve

Abrir el navegador e ingresar para ver el proyecto

    http://localhost:4200


