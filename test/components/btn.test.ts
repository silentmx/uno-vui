import { VBtn } from '@silentmx/v-ui';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from "vitest";

describe("button component", () => {
  test("basic", () => {
    const wrapper = shallowMount(VBtn, {
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