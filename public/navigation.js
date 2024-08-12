const tools = Array.from(document.querySelectorAll('.tool'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showTool(index, direction) {
    const currentTool = tools[currentIndex];
    const nextTool = tools[index];

    // Reset previous tool's state
    currentTool.classList.remove('show', 'hide', 'out-left', 'out-right');
    nextTool.classList.remove('show', 'hide', 'in-left', 'in-right');

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

    // Ensure the next tool is visible before transitioning
    nextTool.classList.add('show');
    nextTool.classList.remove('hide');

    setTimeout(() => {
        // Complete the transition for the current tool
        currentTool.classList.add('hide');
        currentTool.classList.remove('show', 'out-left', 'out-right');

        // Finish the transition for the next tool
        nextTool.classList.remove('in-right', 'in-left');
        nextTool.classList.add('show');
    }, 400); // Ensure this matches the CSS transition duration

    currentIndex = index;
}

function showNextTool() {
    const nextIndex = (currentIndex + 1) % tools.length;
    showTool(nextIndex, 'next');
}

function showPrevTool() {
    const prevIndex = (currentIndex - 1 + tools.length) % tools.length;
    showTool(prevIndex, 'prev');
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
