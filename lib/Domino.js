import { setCallback, generateProps } from "../util/helper";

export default class Component extends HTMLElement {
  constructor() {
    super();
    this._props = generateProps(this.getAttribute("props"));
    this.eventList = {};
  }

  get props() {
    // Immutable Object
    return this._props;
  }

  useCallback(key, callback) {
    return setCallback(key, callback);
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

  adoptCallback() {} 
  attributeChangedCallback(attrName, oldVal, newVal) {}
}

function useProps(props) {
  return JSON.stringify(props);
}

export {useProps};