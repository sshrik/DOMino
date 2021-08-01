import Dobee from "./Dobee";

function getProps(propsText) {
  if(!propsText) return {};

  const props = JSON.parse(propsText);
  Object.keys(props).forEach((key) => {
    if(key.startsWith("on")) {
      props[key] = Dobee.getCallback(key);
    }
  });
  return props;
}

export default class Component extends HTMLElement {
  constructor() {
    super();
    this._props = getProps(this.getAttribute("props"));
    this.eventList = {};
  }

  get props() {
    // Immutable Object
    return this._props;
  }

  useCallback(key, callback) {
    return Dobee.setCallback(key, callback);
  }

  useEvent(query, type, callback) {
    if(!this.eventList[query]) {
      this.eventList[query] = {};
    }
    this.eventList[query][type] = callback;
  }

  setEvent() {
    Object.keys(this.eventList).forEach((query) => {
      const setEventTarget = this.eventList[query];
      Object.keys(setEventTarget).forEach((type) => {
        const callback = setEventTarget[type];
        this.querySelector(query).addEventListener(type, callback);
      })
    })
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
    this.setEvent();
  }

  useProps(props) {
    return JSON.stringify(props);
  }

  adoptCallback() {} 
  attributeChangedCallback(attrName, oldVal, newVal) {}
}