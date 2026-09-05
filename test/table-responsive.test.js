const fs = require('fs');
const adaptTableToMobile = require('../index');

require('@testing-library/jest-dom');

const page = fs.readFileSync('./example/index.html', 'utf8');

let header1;
let header2;

beforeEach(() => {
    document.body.innerHTML = page;
    window.adaptTableToMobile = adaptTableToMobile;
    header1 = document.querySelector('#header1');
    header2 = document.querySelector('#header2');
});

it('should add a label span from each column header', () => {
    window.adaptTableToMobile();

    let el = document.querySelector('#td1-1 > span');
    expect(el).not.toBe(null);
    expect(el.textContent).toEqual(`${header1.textContent}:`);

    el = document.querySelector('#td1-2 > span');
    expect(el).not.toBe(null);
    expect(el.textContent).toEqual(`${header2.textContent}:`);

    expect(document.querySelector('#td1-1a > span')).toBe(null);
});

it('should hide labels from assistive tech', () => {
    window.adaptTableToMobile();

    const el = document.querySelector('#td1-1 > span');
    expect(el.getAttribute('aria-hidden')).toBe('true');
});

it('should not duplicate labels when called twice', () => {
    window.adaptTableToMobile();
    window.adaptTableToMobile();

    expect(document.querySelectorAll('#td1-1 > span').length).toBe(1);
    expect(document.querySelector('#td1-1 > span').textContent).toEqual(`${header1.textContent}:`);
});

it('should add a default label class', () => {
    window.adaptTableToMobile();

    const el = document.querySelector('#td1-1 > span');
    expect(el.classList.contains('adaptToMobile-label')).toBe(true);
});

it('should add a custom class', () => {
    window.adaptTableToMobile({ classes: ['hideOnBiggerScreen'] });

    const el = document.querySelector('#td1-1 > span');
    expect(el).not.toBe(null);
    expect(el.textContent).toEqual(`${header1.textContent}:`);
    expect(el.classList.contains('hideOnBiggerScreen')).toBe(true);
});

it('should add labels to a custom table collection', () => {
    const tables = document.querySelectorAll('table.someOtherTable');
    window.adaptTableToMobile({ tables });

    let el = document.querySelector('#td1-1a > span');
    expect(el).not.toBe(null);
    expect(el.textContent).toEqual(`${document.querySelector('#header1a').textContent}:`);

    el = document.querySelector('#td1-2a > span');
    expect(el).not.toBe(null);
    expect(el.textContent).toEqual(`${document.querySelector('#header2a').textContent}:`);

    expect(document.querySelector('#td1-1 > span')).toBe(null);
});

it('should set scope on column headers', () => {
    window.adaptTableToMobile();

    expect(header1.getAttribute('scope')).toBe('col');
    expect(header2.getAttribute('scope')).toBe('col');
});
