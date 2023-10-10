function renderHeader() {
    const header = document.getElementById('header');
    
        fetch('./src/views/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el header');
            }
            return response.text();
        })
        .then(html => {
            const headerContent = document.createElement('div');
            headerContent.innerHTML = html;
            header.appendChild(headerContent);
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
        });
}

function renderFlexbox() {
    const flexbox = document.getElementById('main');
    
        fetch('./src/views/flexbox.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el flexbox');
            }
            return response.text();
        })
        .then(html => {
            const mainFlex = document.createElement('div');
            mainFlex.innerHTML = html;
            flexbox.appendChild(mainFlex);
        })
        .catch(error => {
            console.error('Error al cargar el flexbox:', error);
        });
}

function renderFooter() {
    const footer = document.getElementById('footer');
    
        fetch('./src/views/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el footer');
            }
            return response.text();
        })
        .then(html => {
            const footerDiv = document.createElement('div');
            footerDiv.innerHTML = html;
            footer.appendChild(footerDiv);
        })
        .catch(error => {
            console.error('Error al cargar el footer:', error);
        });
}



// Call the renders
renderHeader();
renderFlexbox();



