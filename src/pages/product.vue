<template>
    <div>
        <div id="percentage">{{counter}} %</div>
    </div>
</template> 

<script>
import {mapState} from 'pinia'
import {useProducts} from '../store/products'

export default {
    computed:{
        ...mapState(useProducts,["counter"])
    }
}
</script>