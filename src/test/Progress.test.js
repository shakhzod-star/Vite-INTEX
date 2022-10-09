import Products from '../pages/product.vue'
import {createTestingPinia } from '@pinia/testing'
import {mount } from '@vue/test-utils';
import {beforeEach , describe ,test, expect ,vitest} from 'vitest';



describe( 'product.vue', ()=>{
    let wrapper = null
    
    beforeEach( ()=>{
        wrapper  = mount(Products, {
            global:{
                plugins :[createTestingPinia({
                    createSpy : vitest.fn
                })]
                
            }
        })
    })
    test('that  it displays the percentage', ()=>{
        expect(wrapper.find('#percentage').text()).toBe('0 %')
    })
})