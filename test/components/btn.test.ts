import { VBtn } from '@v-ui/components';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from "vitest";

describe("button component", () => {
  test("basic", () => {
    const wrapper = mount(VBtn, {
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