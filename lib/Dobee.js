class Dobee {
  // Dobee use window object as storage.
  initDominoStorage() {
    if(!window.Domino) {
      window.Domino = {
        definedCallback : {},
        definedState : {},
        definedComponent: {}
      }
    }
  }

  setCallback(key, callback) {
    try {
      this.initDominoStorage();
      window.Domino.definedCallback[key] = callback;
      return key;
    }
    catch {
      throw new Error('Domino : SetCallbackError')
    }
  }

  getCallback(key) {
    if(window.Domino.definedCallback[key]) {
      return window.Domino.definedCallback[key];
    }
    else {
      return () => { throw new Error('Domino : NotDefinedCallbackError')};
    }
  }

  registerComponent(key, $class) {
    this.initDominoStorage();
    window.Domino.definedComponent[key] = $class;
  }

  upgradeComponent() {
    Object.keys(window.Domino.definedComponent).forEach((componentName) => {
      const $class = window.Domino.definedComponent[componentName];
      customElements.define(componentName, $class);
    });
  }
}

export default new Dobee();

