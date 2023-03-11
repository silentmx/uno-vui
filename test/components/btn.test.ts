import { UnoBtn } from '@uno-vui';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from "vitest";

describe("button component", () => {
  test("basic", () => {
    const wrapper = shallowMount(UnoBtn, {
      props: {
        loading: false,
      },
      slots: {
        default: () => "button"
      }
    });
    expect(wrapper.find('button').text()).toBe("button")
  })
});