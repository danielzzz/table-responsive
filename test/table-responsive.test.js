const fs = require ('fs');
const adaptTableToMobile = require('../index');

const page = fs.readFileSync('./example/index.html');
const css = fs.readFileSync('./example/style.css');

const dom = require('@testing-library/dom');
require('@testing-library/jest-dom');


beforeEach(() => {
    document.body.innerHTML = page;
    window.adaptTableToMobile = adaptTableToMobile;

    var head = document.getElementsByTagName('head')[0];
    style = document.createElement("style");
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    
    const header1 = document.querySelector('#header1');
    const header2 = document.querySelector('#header2');
});

it('should add the tag to the table', () => {    
    const config = {};
    window.adaptTableToMobile(config);

    let el;
    el = document.querySelector('#td1-1>span');
    expect(el).not.toBe(null);
    expect(el.innerText).toEqual(header1.innerText);

    el = document.querySelector('#td1-2>span');
    expect(el).not.toBe(null);
    expect(el.innerText).toEqual(header2.innerText);

    // other table element should not be applied as it doesn't have the default class
    el = document.querySelector('#td1-1a>span');
    expect(el).toBe(null);
    

});

it('should add a custom class', () => {
    const config = {classes:['hideOnBiggerScreen']};

    // load css
    const style = document.createElement('style');
    style.innerText = css;
    document.body.appendChild(style);

    // jdom does not support this yet
    window.adaptTableToMobile(config);
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    let el;
    el = document.querySelector('#td1-1>span');
    expect(el).not.toBe(null);
    expect(el.innerText).toEqual(header1.innerText);
    expect(el.classList.contains('hideOnBiggerScreen')).toBe(true);
    
    // expect(el).not.toBeVisible(); // jsdom not suppor resizing

    // jdom does not support this yet
    window.adaptTableToMobile(config);
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
    // expect(el).toBeVisible();
});

it('should add the tag to the table from custom collection', () => {    
    const tables = document.querySelectorAll('table.someOtherTable');
    
    const config = {tables};
    window.adaptTableToMobile(config);

    let el;
    el = document.querySelector('#td1-1a>span');
    expect(el).not.toBe(null);
    expect(el.innerText).toEqual(header1.innerText);

    el = document.querySelector('#td1-2a>span');
    expect(el).not.toBe(null);
    expect(el.innerText).toEqual(header2.innerText);

    // other table element should not be applied as it doesn't have the default class
    el = document.querySelector('#td1-1>span');
    expect(el).toBe(null);
    

});