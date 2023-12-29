const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['0', '2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])



const flowComprar = addKeyword(['1', 'si', 'promo']).addAnswer(['📄 Aquí tenemos el flujo de COMPRAR'])





const flowTratamientoBajarPeso = addKeyword(['1', 'control', 'peso']).addAnswer('Este es un Tratamiento Inicial ', {
    media: 'https://mazsaludmx.com/img/reto30dias.jpeg'},{delay: 1000})
    .addAnswer('Precio Normal $3,300.00',{delay: 2000})
    .addAnswer('🔥 *PROMOCION NAVIDEÑA!!!* hasta el 31 de Diciembre',{delay: 2000})
    .addAnswer('👉 *$2,000.00* 👈',{delay: 2000})
    .addAnswer(
        [
            '👉 *Desea Adquirir la PROMO???* 👈',
            'Elige una de las opciones',
            '\n👉 [ *1* ] - Si, Deseo la PROMO.',
            '👉 [ *2* ] - No, Regresar al Menu Inicial'
        ],
        null,
        null,
        [flowComprar, flowSecundario],{delay: 2000}

    )



const flowBajarPeso = addKeyword(['bajar', 'peso', '1']).addAnswer('Conoce a *Marisol Apellido* que bajo 29Kg en 2 meses 😎😎😎', 
    'ya estaba a punto de operarse 😨(manga gástrica) y tomo la decisión de iniciar un tratamiento de control de peso.')
    .addAnswer('Te voy a compartir la foto de ella del Antes de iniciar con nuestro Tratamiento',{delay: 2000})
    .addAnswer('*Marisol antes de Iniciar*', {
    media: 'https://mazsaludmx.com/img/BPMarisol1.jpeg'},{delay: 1000})
    .addAnswer('📹 Te invito a conocer el video de *Marisol*, despues de 2 meses, te sorprenderan los resultados',{delay: 1000})
    .addAnswer('Marisol despues de 2 meses, Sin Operaciones!!!', {
    media: 'https://mazsaludmx.com/img/videoBajarPesoMarisol.mp4'},{delay: 1000})
    .addAnswer(
        [
            'Baja de Peso como Marisol lo hizo, adquire tu tratamiento',
            '*Elige una de las opciones*',
            '\n👉 [ *1* ] - Conocer tratamientos de Control de Peso.',
            '👉 [ *2* ] - Regresar al Menu Inicial',
        ],
        null,
        null,
        [flowTratamientoBajarPeso, flowSecundario],{delay: 5000}

    )

const flowImagen1 = addKeyword(['bajar', 'peso']).addAnswer('Este mensaje envia una imagen', {
    media: 'https://mazsaludmx.com/img/BPMarisol1.jpeg',
})

const flowCafes = addKeyword(['cafe', 'cafes','3']).addAnswer('☕ Cafes Gourmet Saludables', {
    media: 'https://mazsaludmx.com/img/imagenMazCafe.jpg'},{delay: 1000})

    .addAnswer(
    [
        '🙌 Conoce nuestros riquisimos Cafes!!!',
        'Haz click aqui 👇👇👇',
        'https://mazsaludmx.com/mazcafe.php',
        '\n*0* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario],{delay: 2000}
)

const flowPadecimientos = addKeyword(['otros', 'padecimientos','4']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiabetes = addKeyword(['2', 'diabetes', 'azucar','insulina']).addAnswer(
    [
        'Conoces personas que están buscando tener resultados e bajar de peso sin rebote???',

        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowEscaneo = addKeyword(['escanear','escaneo','4']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowBotones = addKeyword(['botones', 'boton', 'buttons']).addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
})

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola que tal!!!',
    'Mucho gusto…')

    .addAnswer(
        [
            'Compártenos como te podemos ayudar???',
            'Aquí tenemos unas opciones para que sea mas fácil para ti.',
            'Escríbenos o selecciona una opción  👇👇👇',
            '👉 [ *1* ] - Bajar de Peso',
            '👉 [ *2* ] - 💉 Adios al Diabetes en menos de 6 meses',
            '👉 [ *3* ] - ☕ Conoce Nuestros Cafes Saludables',
            '👉 [ *4* ] - 👨‍⚕️ Otros Padecimientos',
            '👉 [ *5* ] - Deseo escanear mi cuerpo',
        ],
        null,
        null,
        [flowBajarPeso, flowDiabetes, flowCafes, flowPadecimientos, flowEscaneo,flowImagen1]
    )


    const main = async () => {
        const BOTNAME = 'bot-1'
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal])
        const adapterProvider = createProvider(BaileysProvider,{name:BOTNAME})
    
        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })
    
        QRPortalWeb({name:BOTNAME, port:4000})
    }
    const main2 = async () => {
        const BOTNAME = 'bot-2'
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal])
        const adapterProvider = createProvider(BaileysProvider,{name:BOTNAME})
    
        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })
    
        QRPortalWeb({name:BOTNAME, port:4001})
    }

    main()
    main2()
