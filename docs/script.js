// Client-side QR Code Generation Script
// Handles form submission, QR generation, and download functionality

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Form and element references
    const form = document.getElementById('qr-form');
    const stringInput = document.getElementById('string');
    const errorLevelSelect = document.getElementById('errorCorrectionLevel');
    const widthInput = document.getElementById('width');
    const marginInput = document.getElementById('margin');
    const resultImage = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const clearButton = document.getElementById('clear');
    const downloadButton = document.getElementById('download');
    const openTabButton = document.getElementById('open-tab');
    const buttonsContainer = document.getElementById('buttons');

    // Handle form submission for QR generation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const text = stringInput.value.trim();
        if (!text) {
            alert('Please enter some text or URL');
            return;
        }

        // Get form values
        const width = parseInt(widthInput.value) || 800;
        const margin = parseInt(marginInput.value) || 1;
        const errorCorrectionLevel = errorLevelSelect.value || 'M';

        try {
            // Use qrcode-generator library for precise margin control
            const qr = qrcode(0, errorCorrectionLevel);
            qr.addData(text);
            qr.make();
            
            // Create canvas manually for precise margin control
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const moduleCount = qr.getModuleCount();
            const cellSize = Math.floor(width / moduleCount);
            const actualSize = cellSize * moduleCount;
            const marginPx = margin * cellSize; // Precise pixel margin
            
            canvas.width = actualSize + (2 * marginPx);
            canvas.height = actualSize + (2 * marginPx);
            
            // Fill background
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw QR modules
            ctx.fillStyle = '#000000';
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillRect(
                            marginPx + col * cellSize, 
                            marginPx + row * cellSize, 
                            cellSize, 
                            cellSize
                        );
                    }
                }
            }
            
            // Convert to data URL and update image
            const dataUrl = canvas.toDataURL();
            resultImage.src = dataUrl;
            
            // Reset any CSS styling
            resultImage.style.padding = '';
            resultImage.style.backgroundColor = '';
            resultImage.style.boxSizing = '';
            
            submitButton.textContent = 'Regenerate QR code';
            buttonsContainer.style.visibility = 'visible';
            
            console.log('QR Generated - Modules:', moduleCount, 'Cell size:', cellSize, 'Margin:', marginPx + 'px');
            
        } catch (err) {
            console.error('Error generating QR code:', err);
            alert('Error generating QR code: ' + err.message);
        }
    });

    // Handle clear button
    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset form
        form.reset();
        
        // Reset image to placeholder and clear custom styling
        resultImage.src = 'images/turtle.jpg';
        resultImage.style.padding = '';
        resultImage.style.backgroundColor = '';
        resultImage.style.boxSizing = '';
        
        // Reset button text and hide download buttons
        submitButton.textContent = 'Generate QR code';
        buttonsContainer.style.visibility = 'hidden';
    });

    // Handle download button
    downloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const imageSrc = resultImage.src;
        
        // Check if it's a QR code (data URL) and not the placeholder
        if (imageSrc.startsWith('data:')) {
            // Create a temporary download link
            const downloadLink = document.createElement('a');
            downloadLink.href = imageSrc;
            downloadLink.download = 'qr-code.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            alert('Please generate a QR code first');
        }
    });

    // Handle open in new tab button
    openTabButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const imageSrc = resultImage.src;
        
        // Check if it's a QR code (data URL) and not the placeholder
        if (imageSrc.startsWith('data:')) {
            // Open the image in a new tab
            const newWindow = window.open();
            newWindow.document.write('<img src="' + imageSrc + '" style="max-width: 100%; height: auto;">');
            newWindow.document.title = 'QR Code';
        } else {
            alert('Please generate a QR code first');
        }
    });

    // Set all links to open in new tab
    document.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank');
    });

    // Handle image load event to show/hide buttons
    resultImage.addEventListener('load', function() {
        if (stringInput.value.trim().length > 0 && resultImage.src.startsWith('data:')) {
            submitButton.textContent = 'Regenerate QR code';
            buttonsContainer.style.visibility = 'visible';
        }
    });

    // Optional: Real-time validation
    stringInput.addEventListener('input', function() {
        if (this.value.trim().length === 0) {
            submitButton.textContent = 'Generate QR code';
            buttonsContainer.style.visibility = 'hidden';
        }
    });

    // Initialize: Hide buttons on page load
    buttonsContainer.style.visibility = 'hidden';
});