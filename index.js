const gridContainer = document.querySelector(".grid-container");

let resizable = document.createElement("div");
let resizerbutton = document.createElement("button");

for (let i = 1; i <= 100; i++) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");
  gridItem.setAttribute("draggable", true);
  gridItem.id = i;

  if (i === 1) {
    resizable.classList.add("resizable");
    resizerbutton.classList.add("resizers");
    resizerbutton.textContent = "Click Me";
    for (let j = 1; j <= 4; j++) {
      let resizer = document.createElement("div");
      if (j === 1) {
        resizer.classList.add("resizer");
        resizer.classList.add("top-left");
      }
      if (j === 2) {
        resizer.classList.add("resizer");
        resizer.classList.add("top-right");
      }
      if (j === 3) {
        resizer.classList.add("resizer");
        resizer.classList.add("bottom-left");
      }
      if (j === 4) {
        resizer.classList.add("resizer");
        resizer.classList.add("bottom-right");
      }
      resizerbutton.appendChild(resizer);
    }

    resizable.appendChild(resizerbutton);
    gridItem.appendChild(resizable);
  }
  gridContainer.appendChild(gridItem);
}


const gridItem = document.querySelector(".grid-item");

gridContainer.addEventListener("dragover", function (e) {
  e.preventDefault();
});

gridContainer.addEventListener("drop", function (e) {
  e.preventDefault();

  const targetGridItem = e.target.closest(".grid-item");

  if (targetGridItem) {
    resizable.classList.add("resizable");
    resizerbutton.classList.add("resizers");
    resizerbutton.textContent = "Click Me";
    for (let j = 1; j <= 4; j++) {
      let resizer = document.createElement("div");
      if (j === 1) {
        resizer.classList.add("resizer");
        resizer.classList.add("top-left");
      }
      if (j === 2) {
        resizer.classList.add("resizer");
        resizer.classList.add("top-right");
      }
      if (j === 3) {
        resizer.classList.add("resizer");
        resizer.classList.add("bottom-left");
      }
      if (j === 4) {
        resizer.classList.add("resizer");
        resizer.classList.add("bottom-right");
      }
      resizerbutton.appendChild(resizer);
    }

    resizable.appendChild(resizerbutton);
    targetGridItem.appendChild(resizable);
  }
  function makeResizableDiv(resizerbutton) {
    const element = document.querySelector(resizerbutton);
    const resizers = document.querySelectorAll(resizerbutton + ' .resizer')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      })
      
      function resize(e) {
        if (currentResizer.classList.contains('bottom-right')) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px'
          }
          if (height > minimum_size) {
            element.style.height = height + 'px'
          }
        }
        else if (currentResizer.classList.contains('bottom-left')) {
          const height = original_height + (e.pageY - original_mouse_y)
          const width = original_width - (e.pageX - original_mouse_x)
          if (height > minimum_size) {
            element.style.height = height + 'px'
          }
          if (width > minimum_size) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
        }
        else if (currentResizer.classList.contains('top-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px'
          }
          if (height > minimum_size) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
        }
        else {
          const width = original_width - (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
          if (height > minimum_size) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
        }
      }
      
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
  makeResizableDiv('.resizable')
});



// resizing

function makeResizableDiv(resizerbutton) {
  const element = document.querySelector(resizerbutton);
  const resizers = document.querySelectorAll(resizerbutton + ' .resizer')
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      } else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}

makeResizableDiv('.resizable')

