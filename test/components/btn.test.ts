import { VBtn } from '@/components';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from "vitest";

describe("button component", () => {
  test("basic", () => {
    const wrapper = shallowMount(VBtn, {
      slots: {
        default: () => "button"
      }
    });
    expect(wrapper.find('button').text()).toBe("button")
  })
});