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
    initDominoStorage();
    window.Domino.definedCallback[key] = callback;
    return key;
  }
  catch {
    throw new Error('Domino : SetCallbackError')
  }
}

function getCallback(key) {
  if(window.Domino.definedCallback[key]) {
    return window.Domino.definedCallback[key];
  }
  else {
    return () => { throw new Error('Domino : NotDefinedCallbackError')};
  }
}

function registerComponent(key, $class) {
  initDominoStorage();
  window.Domino.definedComponent[key] = $class;
}

function upgradeComponent() {
  Object.keys(window.Domino.definedComponent).forEach((componentName) => {
    const $class = window.Domino.definedComponent[componentName];
    customElements.define(componentName, $class);
  });
}

function initDomino() {
  initDominoStorage();
  upgradeComponent();
}

function generateProps(propsText) {
  if(!propsText) return {};

  const props = JSON.parse(propsText);
  Object.keys(props).forEach((key) => {
    if(key.startsWith("on")) {
      props[key] = getCallback(key);
    }
  });
  return props;
}

export {initDominoStorage, setCallback, getCallback, registerComponent, initDomino, upgradeComponent, generateProps}