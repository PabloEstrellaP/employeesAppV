import { mount } from "@vue/test-utils";
import EmployeeAddCard from "../components/EmployeeAddCard.vue"; // ../my-component.vue file

describe("MyComponent", () => {
  it("Render correctly", () => {
    const wrapper = mount(EmployeeAddCard);
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
