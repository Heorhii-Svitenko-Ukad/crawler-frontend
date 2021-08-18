<template>
    <div>        
        <h2 class="mx-auto p-5" style="width: fit-content">{{ title }}</h2>
        <div v-if="links.length === 0"><h4>Collection is empty</h4></div>
        <b-table v-else class="table" :items="links">
            <template #cell(uri)="data">
                <a :href="data.item.uri" target="_blank">{{ data.item.uri }}</a>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    props: ['links', 'title'] 
}
</script>