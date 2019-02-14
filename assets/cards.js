var gallery = document.querySelectorAll('.gallery-item');

initialize(gallery);

function initialize(gallery) {
  gallery.forEach(item => {
    var id = item.classList[item.classList.length - 1];
    var idObject = document.querySelector(`#${id}`);
    var description = item.children[0].children[1];

    // Create the Intersection Observer
    createListener(idObject);

    // Create the CodeMirror and buttons
    createCodeMirror(id, description);
  });

  // DECLARATIONS *************************************************

  function createListener(object) {
    console.log('The object is' + object);
    window.addEventListener(
      'load',
      function(event) {
        createObserver(object);
      },
      false,
    );
  }

  function createObserver(target) {
    var observer;
    var options = {
      root: null,
      rootMargin: '0px',
      threshhold: 0.95,
    };

    // Call handleIntersect when the threshhold is met?
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(target);
  }

  function handleIntersect(entries, observer) {
    entries.forEach(function(entry) {
      var name = entry.target.id;
      if (entry.isIntersecting) {
        console.log('Successful intersection of ' + name);
        loadScript(`./assets/cards/${name}.js`, name);
      }
    });
  }

  function loadScript(url, name) {
    var isLoaded = document.querySelectorAll(`.${name}-script`);
    if (isLoaded.length > 0) {
      return;
    }

    console.log('Adding ' + name);
    var newScript = document.createElement('script');
    newScript.src = url;
    newScript.className = name + '-script';
    document.body.appendChild(newScript);
  }

  function createCodeMirror(id, descriptionElement) {
    var mirror = CodeMirror(document.querySelector(`#${id}-js`), {
      mode: 'javascript',
    });
    fetch(`./assets/cards/${id}.js`).then(response =>
      response.text().then(text => mirror.setValue(text)),
    );

    // Create buttons
    var mirrorButton = document.createElement('button');
    mirrorButton.id = `${id}-button`;
    mirrorButton.className = 'update';
    mirrorButton.innerHTML = 'Update Preview';
    mirrorButton.onclick = function() {
      eval(mirror.getValue());
    };
    descriptionElement.appendChild(mirrorButton);
  }
}
