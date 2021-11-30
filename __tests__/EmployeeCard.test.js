

import { mount } from '@vue/test-utils'
import EmployeeCard from '../components/EmployeesCard.vue' // ../my-component.vue file
import 'regenerator-runtime'

it('Render correctly', async() => {
  const wrapper = mount( EmployeeCard )
  // console.log(wrapper.findAll('pruebabotton'))
  const btnPrintE = wrapper.findAll('button')
  // await btnPrintE.trigger('click')
  const value = wrapper.find('#isTrue').text()
  expect( value ).toBe('false')
})
