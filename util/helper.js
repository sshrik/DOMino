function initDominoStorage() {
  if(!window.Domino) {
    window.Domino = {
      definedCallback : {},
      definedState : {},
      definedComponent: {}
    }
  }
}

function setCallback(key, callback) {
  try {
    window.Domino.definedCallback[key] = callback;
    return key;
  }
  catch {
    throw new Error('Domino : SetCallbackError')
  }
}

function getCallback(key) {
  if(window.Domino.definedCallback[key]) {
    return Function(window.definedCallback[key]);
  }
  else {
    return () => { throw new Error('Domino : NotDefinedCallbackError')};
  }
}

function registerComponent(key, $class) {
  window.Domino.definedComponent[key] = $class;
  customElements.define(key, $class);
}

function upgradeComponent() {
  Object.keys(window.Domino.definedComponent).forEach((componentName, index) => {
    const $class = window.Domino.definedComponent[index];
    customElements.define(componentName, Function($class));
  });
}

function initDomino() {
  initDominoStorage();
  upgradeComponent();
}

export {initDominoStorage, setCallback, getCallback, registerComponent, initDomino, upgradeComponent}