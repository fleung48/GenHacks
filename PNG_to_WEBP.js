let imagemin = require("imagemin"),    // The imagemin module.
    webp = require("imagemin-webp"),   // imagemin's WebP plugin.
    outputFolder = "./public/res/portraits",            // Output folder
    PNGImages = "./public/res/portraits/*.png",         // PNG images
    JPEGImages = "./public/res/portraits/*.jpg";        // JPEG images

imagemin([PNGImages], outputFolder, {
    plugins: [webp({
        lossless: true // Losslessly encode images
    })]
});

imagemin([JPEGImages], outputFolder, {
    plugins: [webp({
        quality: 80 // Quality setting from 0 to 100
    })]
});