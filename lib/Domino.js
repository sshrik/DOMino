import { setCallback } from "../util/helper";

export default class Component extends HTMLElement {
  constructor() {
    super();
    this._props = JSON.parse(this.getAttribute("props"));
  }

  get props() {
    // Immutable Object
    return this._props;
  }

  useCallback(key, callback) {
    setCallback(key, callback);
  }

  setState(newState) {
    this._state = {...this._state, ...newState};
  }

  injectToDOM() {
    this.innerHTML = this.render();
  }

  render() {
    return '';
  }

  connectedCallback() { 
    this.injectToDOM(); 
  }

  adoptCallback() {} 
  attributeChangedCallback(attrName, oldVal, newVal) {}
}

function useProps(props) {
  return JSON.stringify(props);
}

export {useProps};