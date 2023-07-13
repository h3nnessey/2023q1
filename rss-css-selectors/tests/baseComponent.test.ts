import { describe, expect, test } from '@jest/globals';
import { BaseComponent } from '../src/components/base-component/base-component';

describe('BaseComponent: checking correct tagName after instance creation', () => {
  const { div, p, h1, ul }: Record<string, string> = {
    div: 'div',
    p: 'p',
    h1: 'h1',
    ul: 'ul',
  };

  test(`Should be "${div}"`, () => {
    expect(new BaseComponent({}).tagName).toBe(div);
  });

  test(`Should be "${p}"`, () => {
    expect(new BaseComponent({ tagName: p }).tagName).toBe(p);
  });

  test(`Should be "${h1}"`, () => {
    expect(new BaseComponent({ tagName: h1 }).tagName).toBe(h1);
  });

  test(`Should be "${ul}"`, () => {
    expect(new BaseComponent({ tagName: ul }).tagName).toBe(ul);
  });
});

describe('BaseComponent: checking "hasClass" method after instance creation with className passed into constructor', () => {
  const { main, container, active }: Record<string, string> = {
    main: 'main',
    container: 'container',
    active: 'active',
  };

  test(`Should includes "${main}"`, () => {
    const component = new BaseComponent({ classNames: [main] });
    expect(component.hasClass(main)).toBe(true);
  });

  test(`Should includes "${container}"`, () => {
    const component = new BaseComponent({ classNames: [container] });
    expect(component.hasClass(container)).toBe(true);
  });

  test(`Should includes "${active}"`, () => {
    const component = new BaseComponent({ classNames: [active] });
    expect(component.hasClass(active)).toBe(true);
  });
});

describe('BaseComponent: checking "removeClass" method after instance creation with className passed into constructor', () => {
  const { main, container, active }: Record<string, string> = {
    main: 'main',
    container: 'container',
    active: 'active',
  };

  test(`Should remove "${main}"`, () => {
    const component = new BaseComponent({ classNames: [main] });
    component.removeClass(main);
    expect(component.hasClass(main)).toBe(false);
  });

  test(`Should remove "${container}"`, () => {
    const component = new BaseComponent({ classNames: [container] });
    component.removeClass(container);
    expect(component.hasClass(container)).toBe(false);
  });

  test(`Should remove "${active}"`, () => {
    const component = new BaseComponent({ classNames: [active] });
    component.removeClass(active);
    expect(component.hasClass(active)).toBe(false);
  });
});

describe('BaseComponent: checking "getAttribute" and "setAttribute" methods', () => {
  const attrs: Record<string, string> = {
    id: 'main',
    'data-type': 'switch',
  };

  test(`Should correct set id attribute and return it`, () => {
    const component = new BaseComponent({});
    component.setAttribute('id', attrs.id);
    expect(component.getAttribute('id')).toBe(attrs.id);
  });

  test(`Should correct set data-type attribute and return it`, () => {
    const component = new BaseComponent({});
    component.setAttribute('data-type', attrs['data-type']);
    expect(component.getAttribute('data-type')).toBe(attrs['data-type']);
  });
});
