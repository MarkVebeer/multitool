const tools = Array.from(document.querySelectorAll('.tool'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showTool(index, direction) {
    const currentTool = tools[currentIndex];
    const nextTool = tools[index];

    // Reset previous tool's state
    currentTool.classList.remove('show', 'out-left', 'out-right', 'in-left', 'in-right');
    nextTool.classList.remove('show', 'in-left', 'in-right', 'out-left', 'out-right');

    if (direction === 'next') {
        // Animate current tool out to the left
        currentTool.classList.add('out-left');
        // Animate next tool in from the right
        nextTool.classList.add('in-right');
    } else {
        // Animate current tool out to the right
        currentTool.classList.add('out-right');
        // Animate next tool in from the left
        nextTool.classList.add('in-left');
    }
    nextTool.classList.add('show');

    currentIndex = index;
}

function showNextTool() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < tools.length) {
        showTool(nextIndex, 'next');
    }
    console.log(` index: ${nextIndex}`)
}

function showPrevTool() {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
        showTool(prevIndex, 'prev');
    }
    console.log(` index: ${prevIndex}`)

}

nextBtn.addEventListener('click', showNextTool);
prevBtn.addEventListener('click', showPrevTool);

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const targetToolId = this.getAttribute('data-tool');
        const targetIndex = tools.findIndex(tool => tool.id === targetToolId);

        if (targetIndex !== -1 && currentIndex !== targetIndex) {
            showTool(targetIndex, targetIndex > currentIndex ? 'next' : 'prev');
        }
    });
});
