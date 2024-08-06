document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const colorPicker = document.getElementById('color-picker');
    const editBtn = document.getElementById('edit-btn');
    const editMenu = document.getElementById('edit-menu');
    const gridSizeSelector = document.getElementById('grid-size');

    // Function to generate a random pastel color
    function getRandomPastelColor() {
        const r = Math.floor((Math.random() * 127) + 127);
        const g = Math.floor((Math.random() * 127) + 127);
        const b = Math.floor((Math.random() * 127) + 127);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Set random pastel background color for the page
    document.body.style.backgroundColor = getRandomPastelColor();

    // Toggle edit menu visibility
    editBtn.addEventListener('click', () => {
        editMenu.classList.toggle('hidden');
    });

    // Function to create the grid
    function createGrid(size) {
        canvas.innerHTML = '';
        canvas.style.gridTemplateColumns = `repeat(${size}, 20px)`;
        canvas.style.gridTemplateRows = `repeat(${size}, 20px)`;
        
        for (let i = 0; i < size * size; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            canvas.appendChild(pixel);

            // Add event listener to change pixel color on click
            pixel.addEventListener('click', () => {
                pixel.style.backgroundColor = colorPicker.value;
            });
        }
    }

    // Initialize grid with default size
    createGrid(16);

    // Change grid size based on selection
    gridSizeSelector.addEventListener('change', (e) => {
        createGrid(parseInt(e.target.value, 10));
    });
});
