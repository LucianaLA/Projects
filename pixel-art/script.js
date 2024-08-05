document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const colorPicker = document.getElementById('color-picker');

    // random pastel color for background
    function getRandomPastelColor() {
        const r = Math.floor((Math.random() * 127) + 127);
        const g = Math.floor((Math.random() * 127) + 127);
        const b = Math.floor((Math.random() * 127) + 127);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // set colour to background
    document.body.style.backgroundColor = getRandomPastelColor();

    // 16x16 grid
    for (let i = 0; i < 16 * 16; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        canvas.appendChild(pixel);

        // Add event listener to change pixel color on click
        pixel.addEventListener('click', () => {
            pixel.style.backgroundColor = colorPicker.value;
        });
    }
});
