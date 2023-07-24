/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/types/index.ts
var EngineStatus;
(function (EngineStatus) {
    EngineStatus["Start"] = "started";
    EngineStatus["Stop"] = "stopped";
    EngineStatus["Drive"] = "drive";
})(EngineStatus || (EngineStatus = {}));
var FetchMethods;
(function (FetchMethods) {
    FetchMethods["Post"] = "POST";
    FetchMethods["Put"] = "PUT";
    FetchMethods["Patch"] = "PATCH";
    FetchMethods["Delete"] = "DELETE";
})(FetchMethods || (FetchMethods = {}));

;// CONCATENATED MODULE: ./src/constants/index.ts
const BASE_URL = 'http://127.0.0.1:3000';
const PATHS = {
    GARAGE: '/garage',
    ENGINE: '/engine',
    WINNERS: '/winners',
};

;// CONCATENATED MODULE: ./src/utils/get-url.ts

const getUrl = (path = '', params) => {
    const url = new URL(`${BASE_URL}${path}`);
    if (params) {
        params.forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    }
    return url;
};

;// CONCATENATED MODULE: ./src/utils/shuffleArray.ts
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

;// CONCATENATED MODULE: ./src/utils/get-random-color.ts
const getRandomHexValue = () => Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
const getRandomColor = () => {
    const r = getRandomHexValue();
    const g = getRandomHexValue();
    const b = getRandomHexValue();
    return `#${r}${g}${b}`;
};

;// CONCATENATED MODULE: ./src/utils/getRandomCars.ts


const brands = [
    'Tesla',
    'Porsche',
    'Toyota',
    'Mazda',
    'Mercedes',
    'Lamborghini',
    'Ford',
    'Nissan',
    'Audi',
    'Dodge',
];
const models = [
    'Model S',
    '911',
    'Supra',
    'CX-9',
    'AMG GT',
    'Huracan',
    'Raptor',
    'Skyline',
    'R8',
    'Challenger',
];
const getRandomCars = () => {
    const shuffledBrands = shuffleArray(Array(100)
        .fill(null)
        .map(() => brands[Math.floor(Math.random() * brands.length)]));
    const shuffledModels = shuffleArray(Array(100)
        .fill(null)
        .map(() => models[Math.floor(Math.random() * models.length)]));
    const initial = [];
    return shuffledBrands.reduce((acc, curr, index) => {
        const car = {
            name: `${curr} ${shuffledModels[index]}`,
            color: getRandomColor(),
        };
        return [...acc, car];
    }, initial);
};

;// CONCATENATED MODULE: ./src/utils/index.ts



;// CONCATENATED MODULE: ./src/services/garage.service.ts



class GarageService {
    static async getCars(page = 1, limit = 7) {
        const response = await fetch(getUrl(`${PATHS.GARAGE}`, [
            ['_page', page.toString()],
            ['_limit', limit.toString()],
        ]));
        return {
            total: Number(response.headers.get('X-Total-Count')) || 0,
            items: await response.json(),
        };
    }
    static async getCar(id = 1) {
        const response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`));
        const data = await response.json();
        return data;
    }
    static async createCar({ name, color }) {
        const response = await fetch(getUrl(`${PATHS.GARAGE}`), {
            method: FetchMethods.Post,
            body: JSON.stringify({ name, color }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
    static async deleteCar(id) {
        const response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
            method: FetchMethods.Delete,
        });
        const data = await response.json();
        return data;
    }
    static async updateCar(id, { name, color }) {
        const response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
            method: FetchMethods.Put,
            body: JSON.stringify({ name, color }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
}

;// CONCATENATED MODULE: ./src/services/winners.service.ts



class WinnersService {
    static async createWinner(winner) {
        await fetch(getUrl(`${PATHS.WINNERS}`), {
            method: FetchMethods.Post,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(winner),
        });
    }
    static async updateWinner({ id, time, wins }) {
        await fetch(getUrl(`${PATHS.WINNERS}/${id}`), {
            method: FetchMethods.Put,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wins, time }),
        });
    }
    static async getWinner(id) {
        const response = await fetch(getUrl(`${PATHS.WINNERS}/${id}`));
        if (response.status === 404) {
            return null;
        }
        const data = await response.json();
        return data;
    }
    static async getWinners(page, sort, order) {
        const response = await fetch(getUrl(`${PATHS.WINNERS}`, [
            ['_page', page.toString()],
            ['_limit', (10).toString()],
            ['_order', order],
            ['_sort', sort],
        ]));
        return {
            total: Number(response.headers.get('X-Total-Count')) || 0,
            items: await response.json(),
        };
    }
    static async deleteWinner(id) {
        const response = await fetch(getUrl(`${PATHS.WINNERS}/${id}`), {
            method: FetchMethods.Delete,
        });
        if (response.status === 404) {
            return null;
        }
        return {};
    }
}

;// CONCATENATED MODULE: ./src/store/index.ts


class Store {
    static garageCarsCount = 0;
    static garageCars = [];
    static garageCurrentPage = 1;
    static garagePagesCount = 1;
    static garage;
    static garageResetEmitted = false;
    static garagePaginationEmitted = false;
    static winners;
    static winnersItems = [];
    static winnersCount = 0;
    static winnersPagesCount = 1;
    static winnersCurrentPage = 1;
    static winnersOrder = 'ASC';
    static winnersSort = 'id';
    static modal;
    static async init() {
        await Store.getGarageData();
        await Store.getWinnersData();
    }
    static setModal(modal) {
        Store.modal = modal;
    }
    static async updateGarage() {
        await Store.getGarageData();
    }
    static async updateWinners() {
        await Store.getWinnersData();
    }
    static async getWinnersData() {
        return WinnersService.getWinners(Store.winnersCurrentPage, Store.winnersSort, Store.winnersOrder).then(({ total, items }) => {
            Store.winnersItems = items;
            Store.winnersCount = total;
            Store.winnersPagesCount = Math.ceil(total / 10) || 1;
        });
    }
    static async getGarageData() {
        return GarageService.getCars(Store.garageCurrentPage).then(({ total, items }) => {
            Store.garageCars = items;
            Store.garageCarsCount = total;
            Store.garagePagesCount = Math.ceil(total / 7) || 1;
        });
    }
}


;// CONCATENATED MODULE: ./src/components/component/index.ts
class Component {
    classes = [];
    element;
    parent = null;
    constructor({ tagName = 'div', classNames = [], parent = null, text, html }) {
        this.element = document.createElement(tagName);
        classNames.forEach((className) => this.addClass(className));
        if (text)
            this.setTextContent(text);
        if (html)
            this.setHtml(html);
        if (parent) {
            this.parent = parent;
            parent.appendChild(this);
        }
    }
    addClass(className) {
        if (!this.classes.includes(className))
            this.classes.push(className);
        this.element.classList.add(className);
    }
    removeClass(className) {
        this.classes = this.classes.filter((clName) => clName !== className);
        this.element.classList.remove(className);
    }
    appendChild(child) {
        this.element.appendChild(child.node);
    }
    append(children) {
        children.forEach((child) => this.appendChild(child));
    }
    get node() {
        return this.element;
    }
    delete() {
        this.element.remove();
    }
    setTextContent(text) {
        this.element.textContent = text;
    }
    setHtml(html) {
        this.element.innerHTML = html;
    }
    setAttribute(attribute, value) {
        this.element.setAttribute(attribute, value);
    }
    addEventListener(eventType, callback) {
        this.element.addEventListener(eventType, callback);
    }
}

;// CONCATENATED MODULE: ./src/components/button/index.ts

class Button extends Component {
    button;
    constructor({ parent, text, disabled, onClick, classNames = [], }) {
        super({ tagName: 'button', parent, text, classNames });
        this.button = this.node;
        if (disabled)
            this.off();
        if (onClick)
            this.addEventListener('click', onClick);
    }
    on() {
        this.button.disabled = false;
    }
    off() {
        this.button.disabled = true;
    }
}

;// CONCATENATED MODULE: ./src/components/view-changers/index.ts



class ViewChangers extends Component {
    toGarageBtn;
    toWinnersBtn;
    constructor(parent) {
        super({ tagName: 'div', classNames: ['view-changers'], parent });
        this.toGarageBtn = new Button({
            parent: this,
            text: 'Garage',
            classNames: ['active'],
            onClick: () => {
                this.toWinnersBtn.removeClass('active');
                Store.winners.addClass('hidden');
                Store.garage.removeClass('hidden');
                this.toGarageBtn.addClass('active');
            },
        });
        this.toWinnersBtn = new Button({
            parent: this,
            text: 'Winners',
            onClick: () => {
                this.toGarageBtn.removeClass('active');
                Store.garage.addClass('hidden');
                Store.winners.removeClass('hidden');
                this.toWinnersBtn.addClass('active');
            },
        });
    }
}

;// CONCATENATED MODULE: ./src/components/input/index.ts

class Input extends Component {
    input;
    constructor({ parent, type = 'text', disabled, placeholder = '', }) {
        super({ tagName: 'input', parent });
        this.input = this.node;
        this.setAttribute('type', type);
        this.setAttribute('placeholder', placeholder);
        if (disabled)
            this.off();
    }
    get value() {
        return this.input.value;
    }
    set value(newValue) {
        this.input.value = newValue;
    }
    on() {
        this.input.disabled = false;
    }
    off() {
        this.input.disabled = true;
    }
}

;// CONCATENATED MODULE: ./src/components/garage/controls/controls-create/index.ts





class ControlsCreate extends Component {
    textInput;
    colorInput;
    submitBtn;
    constructor(parent) {
        super({ classNames: ['garage-controls__row'], parent });
        this.textInput = new Input({ parent: this, placeholder: 'Enter car name' });
        this.colorInput = new Input({ parent: this, type: 'color' });
        this.submitBtn = new Button({
            parent: this,
            text: 'Create',
            onClick: () => this.onCreate(),
        });
    }
    disable() {
        this.reset();
        this.textInput.off();
        this.colorInput.off();
        this.submitBtn.off();
    }
    enable() {
        this.textInput.on();
        this.colorInput.on();
        this.submitBtn.on();
    }
    reset() {
        this.textInput.value = '';
        this.colorInput.value = '#000000';
    }
    onCreate() {
        const name = this.textInput.value;
        const color = this.colorInput.value;
        this.disable();
        GarageService.createCar({ name, color }).then((car) => {
            Store.updateGarage().then(() => {
                Store.garage.carTracks.onCreate(car);
                Store.garage.update(true);
                this.enable();
            });
        });
    }
}

;// CONCATENATED MODULE: ./src/components/garage/controls/controls-update/index.ts




class ControlsUpdate extends Component {
    textInput;
    colorInput;
    submitBtn;
    car = null;
    constructor(parent) {
        super({ tagName: 'div', classNames: ['garage-controls__row'], parent });
        this.textInput = new Input({ parent: this, disabled: true });
        this.colorInput = new Input({ parent: this, type: 'color', disabled: true });
        this.submitBtn = new Button({
            parent: this,
            text: 'Update',
            disabled: true,
            onClick: () => {
                if (this.car) {
                    const name = this.textInput.value;
                    const color = this.colorInput.value;
                    this.car.updateCar(name, color);
                    GarageService.updateCar(this.car.id, { name, color }).then(() => this.disable());
                }
            },
        });
    }
    focusWith(car) {
        this.enableInputs();
        this.car = car;
        this.textInput.value = car.name;
        this.colorInput.value = car.color;
    }
    enableInputs() {
        this.textInput.on();
        this.colorInput.on();
        this.submitBtn.on();
    }
    reset() {
        this.textInput.value = '';
        this.colorInput.value = '#000000';
    }
    disable() {
        this.reset();
        this.textInput.off();
        this.colorInput.off();
        this.submitBtn.off();
    }
}

;// CONCATENATED MODULE: ./src/components/garage/controls/controls-race/index.ts





class ControlsRace extends Component {
    raceBtn;
    resetBtn;
    generateBtn;
    constructor(parent) {
        super({ classNames: ['garage-controls__row'], parent });
        this.raceBtn = new Button({
            parent: this,
            text: 'Race',
        });
        this.resetBtn = new Button({
            parent: this,
            text: 'Reset',
            disabled: true,
        });
        this.generateBtn = new Button({ parent: this, text: 'Generate cars' });
        this.attachListeners();
    }
    attachListeners() {
        this.generateBtn.addEventListener('click', () => {
            const cars = getRandomCars();
            Promise.all(cars.map((car) => GarageService.createCar(car))).then(() => Store.updateGarage().then(() => {
                Store.garage.carTracks.onGenerate();
                Store.garage.update(true);
            }));
        });
        this.raceBtn.addEventListener('click', () => {
            Store.garage.startRace();
        });
        this.resetBtn.addEventListener('click', () => {
            Store.garage.resetRace();
        });
    }
    handleRaceEnd() {
        this.resetBtn.on();
    }
    enable() {
        this.raceBtn.on();
        this.generateBtn.on();
    }
    disable() {
        this.raceBtn.off();
        this.resetBtn.off();
        this.generateBtn.off();
    }
}

;// CONCATENATED MODULE: ./src/components/garage/controls/index.ts





class Controls extends Component {
    controlsCreate;
    controlsUpdate;
    controlsRace;
    constructor(parent) {
        super({ tagName: 'div', classNames: ['garage__controls'], parent });
        this.controlsCreate = new ControlsCreate(this);
        this.controlsUpdate = new ControlsUpdate(this);
        this.controlsRace = new ControlsRace(this);
    }
    disable() {
        this.controlsCreate.disable();
        this.controlsUpdate.disable();
        this.controlsRace.disable();
        Store.garage.carTracks.disable();
    }
    enable() {
        this.controlsRace.enable();
        this.controlsCreate.enable();
    }
    handleRaceEnd() {
        this.controlsRace.handleRaceEnd();
    }
    update() {
        this.controlsUpdate.disable();
    }
}

;// CONCATENATED MODULE: ./src/components/garage/cars-count/index.ts


class CarsCount extends Component {
    constructor(parent) {
        super({ tagName: 'h1', classNames: ['garage__cars-count'], parent });
        this.update();
    }
    update() {
        this.setTextContent(`Garage (${Store.garageCarsCount})`);
    }
}

;// CONCATENATED MODULE: ./src/components/garage/pagination/index.ts



class Pagination extends Component {
    currentPage;
    prevBtn;
    nextBtn;
    constructor(parent) {
        super({ classNames: ['garage__pagination'], parent });
        this.prevBtn = new Button({ parent: this, text: 'Prev', disabled: true, onClick: () => this.handlePrevClick() });
        this.currentPage = new Component({
            tagName: 'h2',
            classNames: ['garage__current-page'],
            text: `Page #${Store.garageCurrentPage}`,
            parent: this,
        });
        this.nextBtn = new Button({
            parent: this,
            text: 'Next',
            disabled: Store.garageCurrentPage === Store.garagePagesCount,
            onClick: () => this.handleNextClick(),
        });
    }
    update() {
        if (Store.garageCurrentPage < Store.garagePagesCount) {
            this.nextBtn.on();
        }
        else {
            this.nextBtn.off();
        }
        if (Store.garageCurrentPage === 1)
            this.prevBtn.off();
        this.currentPage.setTextContent(`Page #${Store.garageCurrentPage}`);
    }
    handlePrevClick() {
        Store.garageCurrentPage -= 1;
        if (Store.garageCurrentPage === 1) {
            this.prevBtn.off();
        }
        this.handleClickWithStartedCars();
    }
    handleClickWithStartedCars() {
        const startedCars = Store.garage.carTracks.tracks.filter((track) => track.car.started);
        Store.garagePaginationEmitted = true;
        if (startedCars.length) {
            this.disable();
            Store.garage.disableControls();
            Promise.all(startedCars.map((track) => track.car.stop())).then(() => Store.updateGarage().then(() => {
                Store.garage.update();
                Store.garage.enableControls();
                this.enable();
                Store.garagePaginationEmitted = false;
            }));
        }
        else {
            Store.updateGarage().then(() => {
                Store.garage.update();
                this.enable();
                Store.garagePaginationEmitted = false;
            });
        }
    }
    handleNextClick() {
        Store.garageCurrentPage += 1;
        this.prevBtn.on();
        if (Store.garageCurrentPage === Store.garagePagesCount) {
            this.nextBtn.off();
        }
        this.handleClickWithStartedCars();
    }
    disable() {
        this.prevBtn.off();
        this.nextBtn.off();
    }
    enable() {
        if (Store.garageCurrentPage === 1) {
            this.prevBtn.off();
        }
        else {
            this.prevBtn.on();
        }
        if (Store.garageCurrentPage === Store.garagePagesCount) {
            this.nextBtn.off();
        }
        else {
            this.nextBtn.on();
        }
    }
}

;// CONCATENATED MODULE: ./src/services/engine.service.ts



class EngineService {
    static async start(id) {
        const response = await fetch(getUrl(`${PATHS.ENGINE}`, [
            ['id', `${id}`],
            ['status', EngineStatus.Start],
        ]), {
            method: FetchMethods.Patch,
        });
        const data = await response.json();
        return data;
    }
    static async stop(id) {
        const response = await fetch(getUrl(`${PATHS.ENGINE}`, [
            ['id', `${id}`],
            ['status', EngineStatus.Stop],
        ]), {
            method: FetchMethods.Patch,
        });
        const data = await response.json();
        return data;
    }
    static async drive(id) {
        const response = await fetch(getUrl(`${PATHS.ENGINE}`, [
            ['id', `${id}`],
            ['status', EngineStatus.Drive],
        ]), {
            method: FetchMethods.Patch,
        });
        const data = await response.json();
        return data;
    }
}

;// CONCATENATED MODULE: ./src/data/svg-content.ts
const svgContent = `
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="-33.544 201.1074 1986.5848 677.5975"
    enable-background="new -33.544 201.1074 1986.5848 677.5975"
    xml:space="preserve"
  >
    <g>
      <path d="M875.28,280.84c62.64-21.98,129.64-29.03,195.73-27.32c96.17,2.61,190.83,22.7,283.5699,47.08
      c84.11,22.08,167.4601,47.05,249.88,74.8c20.05,6.79,40.0801,13.66,59.9601,20.97c3.0399,1.04,6.21,2.79,9.5299,1.84
      c9.3201-2.07,18.7101-3.79,28.0601-5.71c-0.28,7.82-0.35,15.65-0.5,23.47c12.5-1.44,24.99-2.98,37.49-4.47
      c-0.26,5.99-0.33,11.99-0.52,17.99c12.5,0.26,25,0.75,37.51,1.03c-0.49,4.98-0.95,9.96-1.54,14.93
      c24.5,6.13,49.1901,11.63,73.38,18.96c0.7301,8.14,5.15,15.3,10.36,21.37c10.9501,12.77,24.6001,22.86,35.9701,35.22
      c6,6.52,9.8199,15,10.5299,23.85c1.52,13.9301-2.34,27.58-4.1599,41.27c-2.14,15.52-4.37,31.19-3.52,46.89
      c0,7.97,4.77,15.03,4.4299,23.04c-0.3199,7.34-3.71,14.32-8.4299,19.85c-7.79,9.2599-16.5701,17.61-24.71,26.55
      c-6.55,7.4-13.78,15.79-24.12,17.33c-59.87,8.4-119.67,17.3799-179.6101,25.2c-0.21-3.9,0.1101-8.15-1.97-11.61
      c-1.4299-2.37-4.46-1.12-6.65-1.25c-11.3099,0.26-22.6499,1.12-33.95,0.51c-13.27,30.97-36.29,58.03-65.6,74.85
      c-32.8,18.89-72.72,23.04-109.4601,15.5c-29.0199-5.93-55.95-21.05-76.4299-42.41c-13.5701-14.08-24.85-30.48-32.51-48.49
      c-6.66,0.18-13.3199,0.11-19.97-0.03c-2.29,0-5.72-0.08-6.14,2.88c-0.1901,4.74,1.4299,9.37,1.17,14.12
      c-0.13,2.57-2.54,4.28-5.01,3.89c-178.03-0.82-356.05-1.99-534.0701-2.83c-65.12-0.63-130.25-0.52-195.37-1.18
      c0.24-5.68,1.59-11.29,1.56-16.98c0-2.46-1.91-4.67-4.42-4.74c-7.24-0.5-14.44,0.94-21.66,1.32
      c-3.9301,12.97-11.38,24.56-19.35,35.4c-21.96,29.4-54.06,51.75-90.23,59.27c-37.06,7.64-77.09,2.19-110.07-16.64
      c-26.15-15-47.74-37.77-61.63-64.49c-2.66-4.61-3.1-10.86-7.96-13.91c-4.83-2.7-10.6-1.09-15.83-1.0699
      c-2.77-0.34-4.96,2.2-4.73,4.86c0.27,8-0.18,16,0.18,24c-49.84-0.58-99.79-4.85-148.6-15.24c-27.88-6.21-55.79-13.8-81.41-26.67
      c4.97-7.63,9.9-15.34,16.05-22.09c-3.21-30.57-4.75-61.29-6.02-91.99c32.99-39.44,79.27-66.52,128.45-80.45
      c3.9-1.41,8.48-1.21,11.9-3.7c13.93-12.74,29.21-24.09,45.82-33.13c19.8-10.65,41.76-18.22,64.41-18.71
      c2.35-0.12,4.77,0.12,7.07-0.54c18.03-5.75,36.67-9.35,55.26-12.81c45.61-8.2,91.59-14.2,137.59-19.82
      c33.6-3.91,67.21-7.86,100.93-10.64c12.81,10.68,28.99,16.38,45.22,19.3c20.24,3.57,40.97,3.25,61.34,1.01
      c10.02-9.84,21.5-17.99,32.87-26.16c32.38-22.73,66.02-43.57,99.7401-64.23c24.09-14.65,48.3-29.09,72.69-43.21
      c2.34-1.52,5.35-2.36,6.91-4.83c0.56-2.22-1.37-3.63-2.69-5.03C886.41,291.64,880.93,286.15,875.28,280.84 M958.73,305.91
      c-19.54,4.12-38.51,10.75-56.62,19.13c-30.3,14.19-58.82,31.87-86.53,50.55c-32.22,21.42-64.42,42.88-96.57,64.41
      c-2.01,1.53-4.53,3.07-5.02,5.76c0.83,1.92,3.16,1.9,4.93,2.13c6.66,0.46,13.35-0.04,19.98-0.76c8.22-13.11,18.46-25,30.39-34.86
      c12.43-10.15,27.42-18.08,43.66-19.24c8.69-0.51,16.39,4.93,21.6,11.43c8.89,11.32,13.55,25.73,14.01,40.05
      c105.31-3.71,210.65-6.95,315.97-10.56c12.3199-39.7,24.8099-79.35,37.09-119.06c1.23-3.27-1.14-6.8-4.62-6.87
      c-49.53-7.95-99.75-12.5-149.9399-11.17C1017.5,298.27,987.77,299.83,958.73,305.91 M1240.35,318.56
      c-1.25,0.54-2.34,1.6-2.6799,2.94c-2.38,33.49-5.4401,66.96-7.7201,100.48c-0.1899,2.93-0.0399,7.95,4.03,7.87
      c17.01-0.03,33.99-1.62,50.97-2.48c51.39-3.39,102.8-6.67,154.0701-11.59c9.4199-0.92,19.47-1.76,27.47-7.36
      c3.15-2.05,4.89-6.38,2.72-9.77c-3.83-6.51-10.88-10.06-17.14-13.81c-21.63-11.94-44.9399-20.42-68.23-28.48
      c-43.58-14.68-88.0399-26.62-132.76-37.28C1247.59,318.35,1243.83,317.16,1240.35,318.56 M1168.62,437.48
      c3.65,4.03,7.95,7.49,11.01,12.05c12,16.35,14.77,37.87,11.26,57.48c-3.24,20.44-12.96,38.93-21.15,57.69
      c-13.14,29.14-27.79,58.5-50.84,81.19c-12.77,12.59-27.38,23.22-42.85,32.22c-10.62,5.26-21.67,9.77-33.1101,12.92
      c-20.7999,5.67-42.5399,5.53-63.9299,5.48c-44.02,0.34-88.03,1.32-132.04,2.06c-64,1.26-128,2.52-191.99,3.94
      c-3.86,0.7-5.18-3.69-5.39-6.67c-2.94-37.6-5.75-75.22-8.65-112.83c-0.71-7.72-0.81-15.51-2.19-23.15
      c-5.79-36.83,6.41-75.94,32.19-102.89c3.6-4.21,8.39-7.34,11.34-12.1c-1.61-0.77-3.3101-2.58-5.13-1.26
      c-3.38,2.02-5.87,5.14-8.59,7.92c-16.59,17.76-29.66,39.44-34.53,63.45c-3.08,14.51-2.02,29.41-1.55,44.11
      c0.53,11.33,1.55,22.62,2.54,33.92c2.59,37.63,5.68,75.23,8.58,112.85c0.08,3.24,3.67,4.42,6.41,4.07
      c88.98-1.81,177.94-4.41,266.93-5.68c34.02-0.69,68.05-1.16,102.07-1.84c18.87-1.22,37.24-6.94,54.23-15.09
      c31.42-15.31,57.52-40.22,76.89-69.1c12.59-20.84,23.89-42.5099,33.08-65.0699c7.1001-17.7401,13.03-36.15,15.13-55.21
      c1.2201-13.34,0.7101-27.52-5.84-39.53c-4.1-7.3-8.41-14.54-13.78-20.98c-2.08-2.31-4.22-4.81-7.1699-5.97
      C1168.41,430.42,1166.0699,435.49,1168.62,437.48 M265.43,467.6c-18.59,4.32-36.49,11.41-53.2,20.62
      c-24.89,13.7-47.71,31.12-67.81,51.19c-4.26,4.39-8.74,8.73-11.91,14.02c-0.79,1.43-1.67,3.22-0.76,4.82
      c3.32,1.89,7.3,0.65,10.84,0.18c21.84-4.86,42.73-13.58,62.09-24.74c26.5-15.47,50.64-35.22,70.43-58.71
      c1.54-2.15,5-5.84,1.82-8.02C273.17,465.77,269.17,466.8,265.43,467.6 M1827.15,483.7c-24.9,2.68-49.78,5.63-74.65,8.54
      c-23.24,2.56-46.4301,5.78-69.72,7.59c-1.02,0.51-1.9,1.2-2.64,2.05c2.86,4.15,7.89,5.67,12.13,7.98
      c15.85,7.42,33.02,13.44,50.76,12.88c38.01,0.15,76-1.26,114-1.69c1.84-0.12,4.37,0.04,5.23-2.06c0.67-2.14-0.23-4.34-0.7-6.41
      c-3.01-10.82-8.0701-20.93-13.88-30.48C1840.8,482.12,1833.98,483.06,1827.15,483.7 M393.48,545.79
      c-26.58,3.51-51.35,16.65-70.63,35.06c-9.46,9.13-18.16,19.42-23.49,31.56c-8.3,17.7401-13.86,36.95-14.6,56.6
      c-0.67,17.8,2.9,35.73,10.31,51.93c8.25,18.14,20.89,34.11,35.87,47.17c6.26,5.21,12.54,10.79,20.27,13.69
      c20.14,8.53,41.77,14.57,63.8,14.13c19.32-0.09,38.37-5.63,55.33-14.74c7.67-4.36,15.79-8.47,21.72-15.18
      c22.27-22.42,39.86-51.08,43.29-83c2.72-23.92-2.68-48.38-13.84-69.6c-6.37-12.02-14.31-23.37-24.31-32.66
      c-12.84-10.71-27.17-19.73-42.58-26.25C435.44,546.46,414.17,542.93,393.48,545.79 M1472.15,545.17
      c-17.7001,2.06-35.25,6.65-51.15,14.82c-14.03,7.21-26.6801,17.21-36.65,29.46c-21.9399,27.01-32.0399,62.85-29.6899,97.37
      c2.2,21.28,11.1699,41.47,23.8099,58.59c17.78,23.92,43.2101,42.94,72.4501,49.98c10.14,2.56,20.6899,2.92,31.09,2.28
      c28.9399-1.52,57.96-11.45,79.97-30.65c24.46-21.01,39.2001-52.04,42.49-83.9c4.1901-36.07-9.65-73.03-34.2-99.39
      C1545.66,556.99,1508.5,541.59,1472.15,545.17 M39.42,609.45c-4.94,4.3-6.99,11.43-5.65,17.77c0.79,4.07,5.45,5.33,7.1,8.8701
      c1.7,3.3199,1.19,7.22,2.3,10.7c1.46,2.28,4.57,1.6,6.86,1.69c9.31-0.47,18.64,0.13,27.94-0.1c4.47-0.44,2.55-5.78,2.58-8.71
      c2.05-0.68,4.17-1.23,6.36-1.17c13.4-0.16,26.82,0.02,40.23-0.04c-3.14-12.19-11.12-23.05-21.97-29.48
      c-12.55-7.55-27.71-9.49-42.1-8.36C54.65,601.43,45.83,603.61,39.42,609.45 M47.27,653.37c-1.34,0.55-2.24,2.03-1.82,3.48
      c0.87,4.2401,1.45,8.52,2.19,12.79c0.4,2.17,1.65,5.01,4.31,4.83c9.03,0.05,18.06-0.11,27.09,0.02c1.78,0.19,3.99-0.56,4.32-2.56
      c0.34-4.66-0.01-9.38-0.61-14.01c-0.28-2.4-2.11-4.8-4.69-4.83c-7.35-0.4901-14.73-0.28-22.09-0.55
      C53.08,652.58,49.99,652.14,47.27,653.37 M50.23,681.06c1.23,7.71,3.15,15.31,4.74,22.96c5.78-0.26,11.65-2,16.05-5.89
      c5.57-4.64,8.7-11.5,10.27-18.44c-8.22-2.49-16.93-0.67-25.35-0.79C54.02,679.22,50.74,678.5,50.23,681.06z"
      />
      <path d="M761.74,333.74c35.99-17.26,71.59-35.4,108.32-51.06c3.55,5.28,6.76,10.78,10.49,15.95c1.52,1.61,1.09,4.13-1,4.97
      c-27.6,15.25-54.19,32.25-80.81,49.13c-39.55,25.29-78.8,51.04-117.77,77.2c-2.5699,1.51-4.79,4.07-7.9399,4.22
      c-20.32,1.18-40.91,0.29-60.77-4.41c-9.66-2.31-19.2-5.44-27.92-10.25c17.43-7.26,34.29-15.8,51.33-23.91
      C677.74,375.06,719.72,354.36,761.74,333.74z"
      />
      <path d="M400.52,554.77c16.11-2.07,32.43,1.17,47.76,6.04c16.88,5.65,32.73,14.83,45.27,27.56c13.46,13.39,22.88,30.48,28.4,48.57
      c4.27,14.58,7.38,29.86,5.87,45.12c-2.82,33.36-20.55,65.52-48.26,84.58c-17.46,12.21-38.37,18.86-59.47,20.77
      c-14.34,1.58-28.78-0.85-42.54-4.81c-19.26-5.61-37.61-15.12-52.29-28.91c-11.58-10.83-20.57-24.47-25.64-39.51
      c-6.29-18.35-6.98-38.24-4.18-57.32c2.85-19.74,9.07-39.34,20.43-55.88c8.57-12.65,20.2-23.16,33.53-30.6
      C365.08,561.58,382.75,556.89,400.52,554.77z"
      />
      <path d="M1473.52,554.78c20.64-2.54,41.58,2.73,60.15,11.58c28.09,13.52,49.2799,39.48,58.6899,69
      c5.83,19.58,6.63,40.54,3.05,60.62c-3.6801,20.53-12.51,40.37-26.61,55.87c-15.74,17.52-37.7301,28.52-60.6101,33.26
      c-11.5199,2.74-23.47,2.68-35.22,2.02c-20.73-1.38-41.4399-7.45-58.5499-19.46c-18.0601-12.48-31.4-30.83-40.2201-50.75
      c-4.37-10.06-8.58-20.42-9.3999-31.47c-3.1801-35.78,8.34-73.89,34.7-99.02C1419.3101,567.29,1446.48,557.54,1473.52,554.78z"
      />
    </g>
  </svg>
`;

;// CONCATENATED MODULE: ./src/components/garage/car-tracks/car-track/car/index.ts



class Car extends Component {
    id;
    name;
    color;
    started = false;
    constructor(parent, { id, name, color }) {
        super({ classNames: ['car'], parent, html: svgContent });
        this.id = id;
        this.name = name;
        this.color = color;
        this.node.style.fill = color;
    }
    async start() {
        return new Promise((resolve) => {
            EngineService.start(this.id).then((specs) => {
                this.reset();
                this.started = true;
                const startTime = Date.now();
                this.setAnimation(specs.distance / specs.velocity);
                resolve(startTime);
            });
        });
    }
    setAnimation(time) {
        this.node.style.animationName = 'start';
        this.node.style.animationDuration = `${time}ms`;
        this.node.style.animationFillMode = 'forwards';
        this.node.style.animationPlayState = 'running';
        this.node.style.animationTimingFunction = 'linear';
    }
    updateCar(name, color) {
        this.color = color;
        this.name = name;
        this.node.style.fill = color;
    }
    stop() {
        return EngineService.stop(this.id).then(() => {
            this.started = false;
            this.reset();
        });
    }
    pause() {
        this.addClass('broken');
        this.node.style.animationPlayState = 'paused';
    }
    drive(startTime) {
        return new Promise((resolve, reject) => {
            EngineService.drive(this.id)
                .then(() => {
                let time = startTime ? +((Date.now() - startTime) / 1000).toFixed(2) : 0;
                if (time.toString().length >= 5)
                    time = Math.floor(time);
                resolve({
                    id: this.id,
                    name: this.name,
                    color: this.color,
                    time,
                });
            })
                .catch(() => {
                this.pause();
                reject();
            });
        });
    }
    reset() {
        this.removeClass('broken');
        this.node.style.animation = '';
        this.started = false;
    }
}

;// CONCATENATED MODULE: ./src/components/garage/car-tracks/car-track/car-controls/index.ts





class CarControls extends Component {
    car;
    selectBtn;
    deleteBtn;
    startBtn;
    resetBtn;
    constructor(car) {
        super({});
        this.car = car;
        this.selectBtn = new Button({
            parent: this,
            text: 'Select',
            onClick: () => this.onSelect(),
        });
        this.deleteBtn = new Button({
            parent: this,
            text: 'Delete',
            onClick: () => this.onDelete(),
        });
        this.startBtn = new Button({
            parent: this,
            text: 'A',
            onClick: () => this.onStart(),
        });
        this.resetBtn = new Button({
            parent: this,
            text: 'B',
            onClick: () => this.onReset(),
            disabled: true,
        });
    }
    onReset() {
        this.resetBtn.off();
        Store.garage.controls.controlsRace.resetBtn.off();
        this.car.stop().then(() => {
            this.enable();
            if (Store.garage.carTracks.tracks.filter((track) => track.car.started).length) {
                Store.garage.controls.controlsRace.resetBtn.on();
            }
            else {
                Store.garage.controls.controlsRace.resetBtn.off();
                Store.garage.controls.controlsRace.raceBtn.on();
            }
        });
    }
    async onStart() {
        this.selectBtn.off();
        this.deleteBtn.off();
        this.startBtn.off();
        Store.garage.controls.controlsUpdate.disable();
        Store.garage.pagination.disable();
        Store.garage.controls.controlsRace.raceBtn.off();
        Store.garage.controls.controlsRace.resetBtn.off();
        this.car.start().then(() => {
            if (!Store.garageResetEmitted && !Store.garagePaginationEmitted) {
                this.resetBtn.on();
                Store.garage.controls.controlsRace.resetBtn.on();
                Store.garage.pagination.enable();
            }
            else {
                Store.garage.controls.controlsRace.resetBtn.off();
                Store.garage.pagination.disable();
            }
            this.car.drive().catch(() => null);
        });
    }
    onSelect() {
        return Store.garage.controls.controlsUpdate.focusWith(this.car);
    }
    onDelete() {
        GarageService.deleteCar(this.car.id).then(() => {
            Store.updateGarage().then(() => {
                Store.garage.carTracks.onDelete(this.car.id);
                Store.garage.update(true);
            });
        });
        WinnersService.deleteWinner(this.car.id).then((success) => {
            if (success) {
                Store.updateWinners().then(() => Store.winners.update());
            }
        });
    }
    disable() {
        this.selectBtn.off();
        this.startBtn.off();
        this.deleteBtn.off();
        this.resetBtn.off();
    }
    enable() {
        this.resetBtn.off();
        this.startBtn.on();
        this.selectBtn.on();
        this.deleteBtn.on();
    }
}

;// CONCATENATED MODULE: ./src/components/garage/car-tracks/car-track/index.ts



class CarTrack extends Component {
    car;
    carControls;
    firstRow;
    secondRow;
    constructor({ parent, carInfo }) {
        super({ classNames: ['garage__car-track'], parent });
        this.firstRow = new Component({ classNames: ['car-track__row'], parent: this });
        this.secondRow = new Component({ classNames: ['car-track__row'], parent: this });
        this.car = new Car(this, carInfo);
        this.carControls = new CarControls(this.car);
        this.firstRow.append([
            this.carControls.selectBtn,
            this.carControls.deleteBtn,
            new Component({
                tagName: 'h3',
                classNames: ['car__title'],
                parent: this.firstRow,
                text: carInfo.name,
            }),
        ]);
        this.secondRow.append([this.carControls.startBtn, this.carControls.resetBtn]);
    }
    disable() {
        this.carControls.disable();
    }
    enable() {
        this.carControls.enable();
    }
}

;// CONCATENATED MODULE: ./src/components/garage/car-tracks/index.ts




class CarTracks extends Component {
    tracks = [];
    constructor(parent) {
        super({ classNames: ['garage__car-tracks'], parent });
        this.createCarTracks();
    }
    resetRace() {
        Store.garageResetEmitted = true;
        Store.modal.hide();
        return Promise.all(this.tracks.filter((track) => track.car.started).map(({ car }) => car.stop())).then(() => this.tracks.forEach((track) => track.carControls.enable()));
    }
    startRace() {
        return Promise.any(this.tracks.map(({ car }) => car.start().then((startTime) => car.drive(startTime)))).then((winner) => {
            Store.modal.show(winner.name, winner.time);
            this.handleWin(winner);
        });
    }
    update() {
        this.tracks.forEach((track) => track.delete());
        this.tracks = [];
        this.node.innerHTML = '';
        this.createCarTracks();
    }
    handleWin(winner) {
        WinnersService.getWinner(winner.id).then((data) => {
            if (data) {
                const payload = { id: winner.id, time: winner.time < data.time ? winner.time : data.time, wins: data.wins + 1 };
                WinnersService.updateWinner(payload).then(() => {
                    Store.updateWinners().then(() => Store.winners.update());
                });
            }
            else {
                WinnersService.createWinner({ id: winner.id, time: winner.time, wins: 1 }).then(() => {
                    Store.updateWinners().then(() => Store.winners.update());
                });
            }
        });
    }
    onDelete(id) {
        const toDelete = this.tracks.find((track) => track.car.id === id);
        if (toDelete)
            toDelete.delete();
        this.tracks = this.tracks.filter((track) => track.car.id !== id);
        if (Store.garageCars.length > 6) {
            this.tracks.push(new CarTrack({
                parent: this,
                carInfo: Store.garageCars[Store.garageCars.length - 1],
            }));
        }
    }
    onCreate(car) {
        if (this.tracks.length < 7) {
            this.tracks.push(new CarTrack({
                parent: this,
                carInfo: car,
            }));
        }
    }
    onGenerate() {
        const cars = [...Store.garageCars];
        cars.reverse().forEach((car) => {
            this.onCreate(car);
        });
    }
    createCarTracks() {
        this.tracks = Store.garageCars.map((car) => new CarTrack({
            parent: this,
            carInfo: car,
        }));
    }
    disable() {
        this.tracks.forEach((track) => track.disable());
    }
    enable() {
        this.tracks.forEach((track) => track.enable());
    }
}

;// CONCATENATED MODULE: ./src/components/modal/index.ts


class Modal extends Component {
    constructor(parent) {
        super({ classNames: ['modal', 'modal-hidden'], parent });
        Store.modal = this;
    }
    show(name, time) {
        this.setTextContent(`${name} finished first in ${time} seconds!`);
        this.removeClass('modal-hidden');
    }
    hide() {
        this.addClass('modal-hidden');
        this.setTextContent('');
    }
}

;// CONCATENATED MODULE: ./src/components/garage/index.ts







class Garage extends Component {
    controls;
    carsCount;
    pagination;
    carTracks;
    modal;
    constructor(parent) {
        super({ tagName: 'div', parent, classNames: ['garage'] });
        Store.garage = this;
        this.controls = new Controls(this);
        this.carsCount = new CarsCount(this);
        this.pagination = new Pagination(this);
        this.carTracks = new CarTracks(this);
        this.modal = new Modal(this);
    }
    startRace() {
        this.disableControls();
        this.carTracks
            .startRace()
            .then(() => this.handleRaceEnd())
            .catch(() => this.handleRaceEnd());
    }
    resetRace() {
        this.controls.disable();
        Store.garage.pagination.disable();
        this.carTracks.resetRace().then(() => {
            this.enableControls();
            Store.garageResetEmitted = false;
        });
    }
    disableControls() {
        this.controls.disable();
        this.pagination.disable();
        this.carTracks.disable();
    }
    handleRaceEnd() {
        this.controls.handleRaceEnd();
    }
    enableControls() {
        this.controls.enable();
        this.pagination.enable();
        this.carTracks.enable();
    }
    update(isDelete) {
        if (Store.garageCurrentPage > 1 && !Store.garageCars.length) {
            Store.garageCurrentPage -= 1;
            Store.updateGarage().then(() => this.update());
        }
        else {
            if (!isDelete)
                this.carTracks.update();
            this.pagination.update();
            this.carsCount.update();
            this.controls.update();
        }
    }
}

;// CONCATENATED MODULE: ./src/components/winners/winners-count/index.ts


class WinnersCount extends Component {
    constructor(parent) {
        super({ tagName: 'h2', classNames: ['winners__count'], parent });
        this.update();
    }
    update() {
        this.setTextContent(`Winners (${Store.winnersCount})`);
    }
}

;// CONCATENATED MODULE: ./src/components/winners/table/thead/index.ts



class Thead extends Component {
    number;
    car;
    name;
    winsBtn;
    bestTimeBtn;
    constructor(parent) {
        super({ classNames: ['winners-table__head'], parent });
        this.winsBtn = new Button({
            text: 'Wins',
            classNames: ['winners-table__wins-sort'],
            onClick: () => this.handleWinsClick(),
        });
        this.bestTimeBtn = new Button({
            text: 'Best Time',
            classNames: ['winners-table__time-sort'],
            onClick: () => this.handleTimeClick(),
        });
        this.number = new Component({ text: 'Number', classNames: ['winners-table__number'] });
        this.car = new Component({ text: 'Car', classNames: ['winners-table__car'] });
        this.name = new Component({ text: 'Name', classNames: ['winners-table__name'] });
        this.append([this.number, this.car, this.name, this.winsBtn, this.bestTimeBtn]);
    }
    handleWinsClick() {
        Store.winnersSort = 'wins';
        this.bestTimeBtn.setTextContent('Best Time');
        if (Store.winnersOrder === 'ASC') {
            Store.winnersOrder = 'DESC';
            this.winsBtn.setTextContent('Wins ↓');
        }
        else {
            Store.winnersOrder = 'ASC';
            this.winsBtn.setTextContent('Wins ↑');
        }
        Store.updateWinners().then(() => {
            Store.winners.update();
        });
    }
    handleTimeClick() {
        Store.winnersSort = 'time';
        this.winsBtn.setTextContent('Wins');
        if (Store.winnersOrder === 'ASC') {
            Store.winnersOrder = 'DESC';
            this.bestTimeBtn.setTextContent('Best Time ↓');
        }
        else {
            Store.winnersOrder = 'ASC';
            this.bestTimeBtn.setTextContent('Best Time ↑');
        }
        Store.updateWinners().then(() => {
            Store.winners.update();
        });
    }
}

;// CONCATENATED MODULE: ./src/components/winners/table/trow/index.ts



class Trow extends Component {
    index;
    number;
    car;
    name;
    wins;
    bestTime;
    constructor(index, winner, parent) {
        super({ classNames: ['winners-table__row'], parent });
        this.index = index;
        this.number = new Component({ text: index.toString(), classNames: ['winners-table__number'], parent: this });
        this.car = new Component({ html: svgContent, classNames: ['winners-table__car-img'], parent: this });
        this.name = new Component({ text: '-', parent: this, classNames: ['winners-table__name'] });
        this.wins = new Component({ text: `${winner.wins}`, classNames: ['winners-table__wins'], parent: this });
        this.bestTime = new Component({ text: `${winner.time}s`, classNames: ['winners-table__time'], parent: this });
        GarageService.getCar(winner.id).then((car) => {
            this.car.node.style.fill = car.color;
            this.name.setTextContent(car.name);
        });
    }
}

;// CONCATENATED MODULE: ./src/components/winners/table/index.ts




class Table extends Component {
    tableHead;
    trows = [];
    constructor(parent) {
        super({ classNames: ['winners__table'], parent });
        this.tableHead = new Thead(this);
        this.createTable();
    }
    createTable() {
        Store.winnersItems.forEach((winner, index) => {
            this.trows.push(new Trow(index + 1, winner, this));
        });
    }
    update() {
        this.trows.forEach((row) => row.delete());
        this.trows = [];
        this.createTable();
    }
}

;// CONCATENATED MODULE: ./src/components/winners/pagination/index.ts



class pagination_Pagination extends Component {
    currentPage;
    prevBtn;
    nextBtn;
    constructor(parent) {
        super({ classNames: ['winners__pagination'], parent });
        this.prevBtn = new Button({ parent: this, text: 'Prev', disabled: true, onClick: () => this.handlePrevClick() });
        this.currentPage = new Component({
            tagName: 'h2',
            classNames: ['garage__current-page'],
            text: `Page #${Store.winnersCurrentPage}`,
            parent: this,
        });
        this.nextBtn = new Button({
            parent: this,
            text: 'Next',
            disabled: Store.winnersCurrentPage === Store.winnersPagesCount,
            onClick: () => this.handleNextClick(),
        });
    }
    handlePrevClick() {
        Store.winnersCurrentPage -= 1;
        if (Store.winnersCurrentPage === 1) {
            this.prevBtn.off();
        }
        this.updateOnClick();
    }
    updateOnClick() {
        Store.updateWinners().then(() => {
            Store.winners.update();
        });
    }
    handleNextClick() {
        Store.winnersCurrentPage += 1;
        this.prevBtn.on();
        if (Store.winnersCurrentPage === Store.winnersPagesCount) {
            this.nextBtn.off();
        }
        this.updateOnClick();
    }
    update() {
        if (Store.winnersCurrentPage < Store.winnersPagesCount) {
            this.nextBtn.on();
        }
        else {
            this.nextBtn.off();
        }
        if (Store.winnersCurrentPage === 1)
            this.prevBtn.off();
        this.currentPage.setTextContent(`Page #${Store.winnersCurrentPage}`);
    }
}

;// CONCATENATED MODULE: ./src/components/winners/index.ts





class Winners extends Component {
    winnersCount;
    table;
    pagination;
    constructor(parent) {
        super({ parent, classNames: ['winners', 'hidden'] });
        Store.winners = this;
        this.winnersCount = new WinnersCount(this);
        this.pagination = new pagination_Pagination(this);
        this.table = new Table(this);
    }
    update() {
        if (Store.winnersCurrentPage > 1 && !Store.winnersItems.length) {
            Store.winnersCurrentPage -= 1;
            Store.updateWinners().then(() => this.update());
        }
        this.winnersCount.update();
        this.table.update();
        this.pagination.update();
    }
}

;// CONCATENATED MODULE: ./src/components/app/index.ts




class App extends Component {
    container;
    viewChangers;
    garage;
    winners;
    constructor(container) {
        super({ tagName: 'main', classNames: ['app'] });
        this.container = container;
        this.viewChangers = new ViewChangers(this);
        this.garage = new Garage(this);
        this.winners = new Winners(this);
    }
    render() {
        this.container.appendChild(this.node);
    }
}

;// CONCATENATED MODULE: ./src/components/error-message/index.ts

class ErrorMessage extends Component {
    constructor() {
        super({ tagName: 'h1', classNames: ['error'], text: 'START THE MOCK SERVER FIRST 🐱‍👤' });
    }
}

;// CONCATENATED MODULE: ./src/index.ts




Store.init()
    .then(() => {
    const app = new App(document.body);
    app.render();
})
    .catch(() => {
    document.body.append(new ErrorMessage().node);
});

/******/ })()
;