import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe,expect,test  } from "vitest";
import { useProducts} from '../store/products'

describe ('Product Store ', () =>{
    beforeEach( ()=>{
        setActivePinia(createPinia( ))
    })
    
    test('that the Products starts at array', ()=>{
      const products = useProducts()
      expect(products.counter).toBe(0)
    })
    test('that the Counter Increments by 1 ',()=>{
      const products = useProducts()
      products.increment()
      expect(products.counter).toBe(1)
    })
    test('that the percentage  is returned',()=>{
      const products = useProducts()
      products.$patch({
            max: 10 ,
            counter: 5
      })
      expect(products.getIncrement).toBe(50)
    })
})