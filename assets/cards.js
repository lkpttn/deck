// Intersection Observer
// Wrap all this up in a querySelectorAll
// How can we programmatically detect unique cards?

// TODO:
// Add the codemirror creation to the creation function for each element

// Create the listeners for these ids
createListener(bergdorf);
createListener(vertigo);
createListener(varsarely);

function createListener(name) {
  var cardElement;
  window.addEventListener(
    'load',
    function(event) {
      cardElement = document.querySelector(`#${name.id}`);
      createObserver(cardElement);
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
