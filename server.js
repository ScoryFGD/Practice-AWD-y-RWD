const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const app = express();

// Configurar motor de vistas EJS y archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());

// Función para simular los productos del catálogo de hardware
function getMockProducts() {
    return Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `Componente de Servidor ${index + 1}`,
        spec: 'Especificaciones técnicas detalladas del componente...',
        thumbnail: `/img/prod${index + 1}.jpg`
    }));
}

// Ruta Versión A: Responsive (RWD) - Sirve el HTML estático
app.get('/responsive', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'responsive.html'));
});

// Ruta Versión B: Adaptativo (AWD) - Renderiza condicionalmente según el dispositivo
app.get('/adaptive', (req, res) => {
    // Forzar detección móvil si el usuario usa simulación en DevTools o useragent
    const isMobile = req.useragent.isMobile || req.headers['user-agent'].includes('Mobile');

    if (isMobile) {
        res.render('mobile', { products: getMockProducts() });
    } else {
        res.render('desktop', { products: getMockProducts(), showChart: true });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('----------------------------------------------------');
    console.log('🚀 SERVIDOR INICIADO Y CORRIENDO');
    console.log('----------------------------------------------------');
    console.log(`🔗 Ruta Responsive (RWD): http://localhost:${PORT}/responsive`);
    console.log(`🔗 Ruta Adaptativa (AWD): http://localhost:${PORT}/adaptive`);
    console.log('----------------------------------------------------');
});